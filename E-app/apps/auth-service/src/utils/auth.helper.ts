import crypto from "crypto";
import { ValidationError } from "@packages/error-handler";
import redis from "@packages/libs/redis";
import { sendEmail } from "../utils/sendMail";
import { NextFunction } from "express";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistrationData = (data: any, userType: "user" | "seller") => {
    const {name, email, password, phone_number, country} = data;

    //only need phone number and country for seller, not user 
    if(!name || !email || !password || (userType === "seller" && (!phone_number || !country ))){
        throw new ValidationError("Missing required fields for registration");
    }

    //if email is not valid
    if(!emailRegex.test(email)){
        throw new ValidationError("Invalid email format");
    }
        
};

export const checkOtpRestrictions = async (email: string, next: NextFunction) => {
    //use radius to store short term data in memory
    //if entering otp wrong three time, then assume youre hacking the account, and we lock otp
    if(await redis.get(`otp_lock: ${email}`)){
        return next(new ValidationError("Too many incorrect OTP attempts. Account locked. Please request a new OTP after 30 minutes."));
        }
    //if user is requesting otp too many times in a short period
    if(await redis.get(`otp_spam_lock: ${email}`)){
        return next(new ValidationError("Too many OTP requests. Please try again after 60 minutes."));
    }
    //OTP sent will stay in database for 1 minutes, before user can request another OTP
    if(await redis.get(`otp_cooldown: ${email}`)){
        return next(new ValidationError("OTP already sent. Please wait for 1 minute before requesting another OTP."));
    }
};

export const trackOtpRequests = async (email: string, next:NextFunction) => {
    //add otp request counts, check if otp key already in database  
    const otpRequestkey = `otp_request_count: ${email}`;
    let otpRequests = parseInt((await redis.get(otpRequestkey)) || "0");
    if(otpRequests >= 2){
        await redis.set(`otp_spam_lock: ${email}`, "locked", "EX", 3600); //lock for 60 minutes
    }

    //tracking requests for 1 hour
    await redis.set(otpRequestkey, otpRequests + 1, "EX", 3600); //expire in 60 minutes
};

export const sendOtp = async (name: String, email: string, template: string) => {
    //generate 4 digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    await sendEmail(email, "Verify Your Email", template, {name, otp});
    //set OTP in our redis database with the email we are sending the OTP and expiry time of 5 minutes
    //after 5 minutes OTP will be invalid/ deleted from radius db
    await redis.set(`otp: ${email}`, otp, "EX", 300); //300 seconds = 5 minutes
    //how many times user is sending the OTP requests, so you have to wait for 1 minute before sending another OTP
    await redis.set(`otp_cooldown: ${email}`, "true", "EX", 60); //track otp attempts for this email
   

};

export const verifyOtp = async (email: string, otp: string, next: NextFunction ) => {
    // get already stored otp from rdis database
    const storedOtp = await redis.get(`otp: ${email}`);

    if(!storedOtp){
        return next (new ValidationError("OTP has expired or is invalid. Please request a new OTP."));
    }

    const failedAttemptsKey = `otp_attempts: ${email}`;
    let failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || "0");
    if(storedOtp !== otp){
        if(failedAttempts>=2){
            await redis.set(`otp_lock: ${email}`, "locked", "EX", 1800); //lock for 30 minutes
            await redis.del(`otp: ${email}`, failedAttemptsKey); //delete existing otp
            return next (new ValidationError("Too many failed attempts. Please try again after an hour."));
        }
        await redis.set(failedAttemptsKey, failedAttempts + 1, "EX", 300 );
        return next (new ValidationError(`Invalid OTP. You have ${2 - failedAttempts} attempts left.`));
    }
    await redis.del(`otp: ${email}`, failedAttemptsKey); //delete existing otp and failed attempts if otp is correct
};
