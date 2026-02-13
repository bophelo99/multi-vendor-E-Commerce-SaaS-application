import express, {Router} from "express";
import { forgotPassword, getUser, refreshToken, resetPassword, userLogin, userRegistration, verifyForgotPassword, verifyUser } from "../controller/auth.controller";
import isAuthenticated from "@packages/middleware/isAuthenticated";

const router:Router = express.Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/user-login", userLogin);
router.post("/refresh-token-user", refreshToken);
router.get("/logged-in-user", isAuthenticated, getUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-forgot-password", verifyForgotPassword);

export default router;