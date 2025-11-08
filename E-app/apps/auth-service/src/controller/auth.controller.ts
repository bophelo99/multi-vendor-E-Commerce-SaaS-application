import { NextFunction, Request, Response } from "express";
import { validateRegistrationData, checkOtpRestrictions, verifyOtp, trackOtpRequests, sendOtp } from "../utils/auth.helper";
import prisma from "@packages/libs/prisma";
import { AuthError, ValidationError } from "@packages/error-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register a new user (seller or buyer)
export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
    //validate registration data form 
    validateRegistrationData(req.body, "user");

    //take name and email from request body
    const {name, email} = req.body;

    //check for existing users in database
    const existingUser = await prisma.users.findUnique({ where: { email } });

    try{
        if(existingUser) {
        return next(new ValidationError("user with this email already exists"));
    }

    //check our OTP restrictions
    await checkOtpRestrictions(email, next);
    //track OTP requests
    await trackOtpRequests(email, next);
    // send OTP, email and template
    await sendOtp(name, email, "user-activation-mail");

    //send response back to client
    res.status(200).json({ 
        message: "Please verify email account. Check your email for the OTP code to verify your account."
    });
    } catch (error) {
        return next(error);
    }
};

//verify user OTP and activate account after user received verification email with OTP code and succefful entered
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, otp, password, name} = req.body;
        if(!email || !otp || !password || !name){
            throw new ValidationError("Missing required fields");
        }

        const existingUser = await prisma.users.findUnique({where: { email }});
        if(existingUser){
            return next (new ValidationError("User with this email already exists, try again using a different email."));
        }

        await verifyOtp(email, otp, next);
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.users.create({
            data: {name, email, password: hashedPassword},
        });

        res.status(200).json({
            success: true,
            messge: "User registered successfully"
        });
    } catch(error){
        return next(error);
    }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw new ValidationError("Missing required fields");
        }

        const existingUser = await prisma.users.findUnique({where: { email }});
        if(!existingUser){
            return next (new AuthError("User with email does not exist"));
        }
        //verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password!);
        if(!isPasswordValid){
            return next (new AuthError("Invalid email or password"));
        }
        


    } catch(error){
        return next(error);
    }
};