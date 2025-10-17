import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { IAuthRepository } from "../core/interfaces/repository/IAuthRepository";
import { TYPES } from "../core/types";
import { throwError } from "../utils/response";
import { messages } from "../const/messages";
import { UserResponseMapper } from "../dtos/user/userResponseMapper";
import { IUserDto, IUserLoginDTO } from "../dtos/user/IUserDto";
import { UserForwardMapper } from "../dtos/user/userForwardMapper";
import { ISignup } from "../types/authTypes";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";
 

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IAuthRepository)
    private  _authRepo: IAuthRepository
  ) {}

  async login(email: string, password: string): Promise<IUserLoginDTO> {
    const user = await this._authRepo.findOne({ email });
    if (!user) throwError(messages.auth.accountNotFound);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throwError(messages.auth.invalidCredentials);
    const token = generateAccessToken(user._id as unknown as string,"user");
    const refreshToken = generateRefreshToken(user._id as unknown as string,"user");
    return UserResponseMapper.toLoginUserResponse(user,token,refreshToken);
  }

    async signup(data: ISignup): Promise<void> {
    const existingUser = await this._authRepo.findOne({ email: data.email });
    if (existingUser) throwError(messages.auth.emailAlreadyExists);
    const userData = await UserForwardMapper.toUserEntity(data);
    await this._authRepo.create(userData);
  }
}
