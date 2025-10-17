import bcrypt from "bcrypt";
import { ISignup } from "../../types/authTypes";

export class UserForwardMapper {
    static async toUserEntity(dto: ISignup) {
     const hashedPassword =await  bcrypt.hash(dto?.password, 10);
      return {
      username: dto.name.trim(),
      email: dto.email.toLowerCase().trim(),
      password: hashedPassword,
    };
  }
}