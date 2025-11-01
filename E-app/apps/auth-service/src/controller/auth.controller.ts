import { NextFunction, Request, Response } from "express";
import { validateRegistrationData } from "../utils/auth.helper";
import prisma from "../../../../packages/libs/prisma";
import { ValidationError } from "../../../../packages/error-handler";
import { checkOtpRestrictions } from "../utils/auth.helper";
import { trackOtpRequests } from "../utils/auth.helper";
import { sendOtp } from "../utils/auth.helper";


//register a new user (seller or buyer)
export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    //validate registration data form 
    validateRegistrationData(req.body, "user");

    //take name and email from request body
    const {name, email} = req.body;

    //check for existing users in database
    const existingUser = await prisma.users.findUnique({ where: email });

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
}