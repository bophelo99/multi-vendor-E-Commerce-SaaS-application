import express, {Router} from "express";
import { forgotPassword, refreshToken, resetPassword, userLogin, userRegistration, verifyForgotPassword, verifyUser } from "../controller/auth.controller";

const router:Router = express.Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/user-login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/refresh-token", refreshToken);
router.post("/reset-password", resetPassword);
router.post("/verify-forgot-password", verifyForgotPassword);

export default router;