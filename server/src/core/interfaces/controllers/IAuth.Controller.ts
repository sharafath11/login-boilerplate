import { Request, Response } from "express";

export interface IAuthController {
    login(req: Request, res: Response): Promise<void>
    signup(req: Request, res: Response): Promise<void>
    getUser(req: Request, res: Response): Promise<void>
    refeshToken(req: Request, res: Response): Promise<void>
}