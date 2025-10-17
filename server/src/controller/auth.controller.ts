import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAuthController } from "../core/interfaces/controllers/IAuth.Controller";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { TYPES } from "../core/types";
import { MESSAGES } from "../const/messages";
import { StatusCode } from "../enums/statusCode";
import {
  handleControllerError,
  sendResponse,
  throwError,
} from "../utils/response";
import { validateBodyFields } from "../utils/validateRequest";
import { decodeToken, refreshAccessToken, setTokensInCookies } from "../utils/jwtToken";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.IAuthServices) private  _authServices: IAuthService
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    
    try {
      validateBodyFields(req, ["email", "password"])
      const { email, password } = req.body;
      if (!email || !password) throwError(MESSAGES.COMMON.MISSING_FIELDS);

      const result = await this._authServices.login(email, password);
      setTokensInCookies(res,result.tocken,result.refreshToken)
      sendResponse(
        res,
        StatusCode.OK,
        MESSAGES.AUTH.LOGIN_SUCCESS,
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
      if (password !== confirmPassword) throwError(MESSAGES.AUTH.PASSWORD_NOT_MATCH);
      const result = await this._authServices.signup({
        name,
        email,
        password,
      });

      sendResponse(
        res,
        StatusCode.CREATED,
        MESSAGES.AUTH.REGISTRATION_SUCCESS,
        true,
        result
      );
    } catch (error) {
      handleControllerError(res, error);
    }
  }
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies.token;
      const decode = decodeToken(token);
      console.log("deoded",decode)
      if(!decode)throwError(MESSAGES.AUTH.AUTH_REQUIRED)
      const result = await this._authServices.getUser(decode?.id);
      sendResponse(res,StatusCode.OK,MESSAGES.COMMON.SUCCESS,true,result)
    } catch (error) {
      handleControllerError(res,error)
    }
  }
  async refeshToken(req: Request, res: Response): Promise<void> {
    try {
      const tokens = refreshAccessToken(req.cookies.refreshToken);

      if (!tokens) {
        sendResponse(
          res,
          StatusCode.UNAUTHORIZED,
          MESSAGES.AUTH.INVALID_TOKEN,
          false
        );
        return;
      }
      setTokensInCookies(res, tokens.accessToken, tokens.refreshToken);
      sendResponse(res, StatusCode.OK, "", true);
      return;
    } catch (error) {
      handleControllerError(res, error, StatusCode.UNAUTHORIZED);
      
    }
  }
}
