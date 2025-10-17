import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../types/authTypes";

dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET || "yourAccessSecret";
const REFRESH_KEY = process.env.REFRESH_SECRET || "yourRefreshSecret";
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";


const cookieOptions = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: (process.env.COOKIE_SAMESITE as "lax" | "strict" | "none") || "lax",
  domain: process.env.COOKIE_DOMAIN || undefined,
  path: "/",
};

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production", 
//   sameSite: "none" as const,                    
//   domain: ".sharafathabi.cloud", 
//   path: "/",                                     
// };

export const generateAccessToken = (id: string, role: string): string => {
  const payload: TokenPayload = { id, role };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_EXPIRES_IN });
};
export const generateRefreshToken = (id: string, role: string): string => {
  const payload: TokenPayload = { id, role };
  return jwt.sign(payload, REFRESH_KEY, { expiresIn: REFRESH_EXPIRES_IN });
};
export const verifyAccessToken = (token: string): TokenPayload | null => {
  return jwt.verify(token, SECRET_KEY) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  return jwt.verify(token, REFRESH_KEY) as TokenPayload;
};
export const decodeToken = (token: string): TokenPayload | null => {
  const decoded = jwt.decode(token) as TokenPayload | null;
  return decoded;
};
export const refreshAccessToken = (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) return null;

  const newAccessToken = generateAccessToken(decoded.id, decoded.role);
  const newRefreshToken = generateRefreshToken(decoded.id, decoded.role);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
export const setTokensInCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("token", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
};

export const clearTokens = (res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
};



