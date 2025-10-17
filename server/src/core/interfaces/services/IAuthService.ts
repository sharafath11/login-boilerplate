import {IUserLoginDTO } from "../../../dtos/user/IUserDto";
import { ISignup } from "../../../types/authTypes";

export interface IAuthService {
    login(email: string, password: string):Promise<IUserLoginDTO>,
    signup(data:ISignup):Promise<void>
}