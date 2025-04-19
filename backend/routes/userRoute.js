import express from "express";
import {
  adminLogin,
  loginUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", getUserProfile);

export default userRouter;