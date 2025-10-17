import express from "express";
import { container } from "tsyringe";
import { TYPES } from "../core/types";
import { IAuthController } from "../core/interfaces/controllers/IAuth.Controller";

const router = express.Router();

const authController = container.resolve<IAuthController>(TYPES.IAuthController);

router.post("/login", authController.login.bind(authController));
router.post("/signup", authController.signup.bind(authController));

export default router;
