import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { omit } from "lodash";

const validateCheck = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response
      .status(400)
      .send({ errors: errors.array().map((err) => omit(err, "value")) });

  return next();
};

const validate = (validateSchema: ValidationChain[]) => {
  return [...validateSchema, validateCheck];
};

export default validate;
