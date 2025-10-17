import { IUser } from "../../types/userTypes";
import { IUserDto } from "./IUserDto";

export class UserResponseMapper {
    static toLoginUserResponse(user:IUser): IUserDto {
        return {
            userId:user._id.toString(), 
            name: user.username,
            email: user.email
        }
    }
} 