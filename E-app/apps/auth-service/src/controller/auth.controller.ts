import { NextFunction, Request, response, Response } from "express";
import { validateRegistrationData, checkOtpRestrictions, verifyOtp, trackOtpRequests, sendOtp, handleForgotPassword, verifyForgotPasswordOtp } from "../utils/auth.helper";
import prisma from "@packages/libs/prisma";
import { AuthError, ValidationError } from "@packages/error-handler";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { setCookie } from "../utils/cookies/setCookie";
import { decode } from "punycode";

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

//user login controller
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
        //Generate session or token logic would go here
        const accessToken = jwt.sign(
            { id: existingUser.id, role: "user" }, 
            process.env.ACCESS_TOKEN_SECRET as string, 
            { expiresIn: "15m", }
        );

        const arefreshToken = jwt.sign(
            { id: existingUser.id, role: "user" }, 
            process.env.REFRESH_TOKEN_SECRET as string, 
            { expiresIn: "7d", }
        );
        //store refresh and access token into database in an httponly secure cookie
        setCookie(res, "refreshToken", arefreshToken);
        setCookie(res, "accessToken", accessToken);

        res.status(200).json({
            message: "User logged in successfully",
            existingUser: { id: existingUser.id, name: existingUser.name, email: existingUser.email },
        });
    } catch(error){
        return next(error);
    }
};

//refresh user token

/*
    
*/
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const refreshToken = req.cookies.refresh_token;
        if(!refreshToken){
            throw new ValidationError("Unauthorized! No refresh token.");
        }
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string
        ) as {id: string; role: string}
        if(!decoded || !decoded.id || !decoded.role){
            return new JsonWebTokenError("Forbidden! Invalid refresh token.")
        }
            // let account;
            // if(decoded.role == "user")
        const user = await prisma.users.findUnique({ where: {id: decoded.id }});
        if(!user){
            return new AuthError("Forbidden! User/Seller not found")
        }
        const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "15m" }
        );
        setCookie(res, "access_token", newAccessToken);
        return  res.status(201).json({ success: true });
    } catch (error){ 
        return next(error);
    }
}

//forgot password controller (send OTP to email to reset password)
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    await handleForgotPassword(req, res, next, `user`);
};

//verify OTP controller (for forgot password)
export const verifyForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    await verifyForgotPasswordOtp(req, res, next);
};

//reset password controller (after verifying OTP, allow user to reset password)
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, newPassword } = req.body;
        if(!email || !newPassword){
            return next (new ValidationError("Missing required fields"));
        }
        //check user existence in DB
        const existingUser = await prisma.users.findUnique({where: { email }});
        if(!existingUser){
            return next (new ValidationError("User with email does not exist"));
        }
        //verify OTP

        //compare passwords
        const isSamePassword = await bcrypt.compare(newPassword, existingUser.password!);
        if(isSamePassword){
            return next (new ValidationError("New password must be different from the old password"));
        }

        //hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //update password in database
        await prisma.users.update({
            where: { email },
            data: { password: hashedPassword },
        });
        res.status(200).json({
            message: "Password reset successfully",
        });

    } catch(error){
        return next(error);
    }
};
