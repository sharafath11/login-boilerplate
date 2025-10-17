import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { IAuthRepository } from "../core/interfaces/repository/IAuthRepository";
import { TYPES } from "../core/types";
import { throwError } from "../utils/response";
import { messages } from "../const/messages";
import { UserResponseMapper } from "../dtos/user/userResponseMapper";
import { IUserDto } from "../dtos/user/IUserDto";
import { UserForwardMapper } from "../dtos/user/userForwardMapper";
import { ISignup } from "../types/authTypes";
 

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IAuthRepository)
    private  _authRepo: IAuthRepository
  ) {}

  async login(email: string, password: string): Promise<IUserDto> {
    const user = await this._authRepo.findOne({ email });
    if (!user) throwError(messages.auth.accountNotFound);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throwError(messages.auth.invalidCredentials);

    return UserResponseMapper.toLoginUserResponse(user);
  }

    async signup(data: ISignup): Promise<IUserDto> {
    const existingUser = await this._authRepo.findOne({ email: data.email });
    if (existingUser) throwError(messages.auth.emailAlreadyExists);
    const userData = await UserForwardMapper.toUserEntity(data);
    const createdUser = await this._authRepo.create(userData);
    return UserResponseMapper.toLoginUserResponse(createdUser);
  }
}
