import { IUserDto } from "../../../dtos/user/IUserDto";

export interface IAuthService {
    login(email: string, password: string):Promise<IUserDto>,
    signup(data:ISignup):Promise<IUserDto>
}