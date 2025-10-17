import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAuthController } from "../core/interfaces/controllers/IAuth.Controller";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { TYPES } from "../core/types";
import { messages } from "../const/messages";
import { StatusCode } from "../enums/statusCode";
import {
  handleControllerError,
  sendResponse,
  throwError,
} from "../utils/response";
import { validateBodyFields } from "../utils/validateRequest";
import { setTokensInCookies } from "../utils/jwtToken";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.IAuthServices) private  _authServices: IAuthService
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    
    try {
      validateBodyFields(req, ["email", "password"])
      const { email, password } = req.body;
      if (!email || !password) throwError(messages.common.missingFields);

      const result = await this._authServices.login(email, password);
      setTokensInCookies(res,result.tocken,result.refreshToken)
      sendResponse(
        res,
        StatusCode.OK,
        messages.auth.loginSuccess,
        true,
        result
      );
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, confirmPassword } = req.body;
       validateBodyFields(req, ["name","email", "password","confirmPassword"])
      if (password !== confirmPassword) throwError(messages.auth.passwordNotMatch);
      const result = await this._authServices.signup({
        name,
        email,
        password,
      });

      sendResponse(
        res,
        StatusCode.CREATED,
        messages.auth.registrationSuccess,
        true,
        result
      );
    } catch (error) {
      handleControllerError(res, error);
    }
  }
}
