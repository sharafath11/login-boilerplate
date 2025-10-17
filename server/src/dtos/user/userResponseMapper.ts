import { IUser } from "../../types/userTypes";
import {IUserLoginDTO } from "./IUserDto";

export class UserResponseMapper {
    static toLoginUserResponse(user:IUser,tocken:string,refreshToken:string): IUserLoginDTO {
        return {
            userId:user._id.toString(), 
            name: user.username,
            email: user.email,
            tocken,
            refreshToken
        }
    }
} 