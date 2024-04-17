import { ValidationError } from "class-validator";
import { Response } from "express";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  if (error instanceof Array && error[0] instanceof ValidationError) {
    const errors: unknown[] | undefined = [];
    error.forEach((e: ValidationError) => {
      errors.push(e.constraints);
    });
    return res.status(400).json({ error: errors });
  }
}
