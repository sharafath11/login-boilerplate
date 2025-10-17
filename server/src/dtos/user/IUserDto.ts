export interface IUserDto {
    userId: string
    name: string
    email: string
    password ? :string
}
export interface IUserLoginDTO {
    userId: string
    name: string
    email: string
    tocken: string,
    refreshToken : string
}
