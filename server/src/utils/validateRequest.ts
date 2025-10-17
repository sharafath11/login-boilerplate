import { Request } from "express";
import { throwError } from "./response";
import { messages } from "../const/messages";

export function validateBodyFields(req: Request, fields: string[]): void {
  if (!req.body) throwError(messages.common.missingFields);
  const missingFields = fields.filter(field => !req.body[field]);
  if (missingFields.length > 0) throwError(messages.common.missingFields);
}
