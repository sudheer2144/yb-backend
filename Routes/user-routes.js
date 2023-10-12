import express from "express";
import { userLogin, userSignUp } from "../Controllers/user-controller.js";

export const userRouter = express.Router();

// userRouter.get("/getall", getAllUsers);

userRouter.post("/signup", userSignUp);

userRouter.post("/login", userLogin);
