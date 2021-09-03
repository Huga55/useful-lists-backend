import { check, validationResult } from "express-validator";

const emailSchema = check("email")
  .isEmail()
  .withMessage((value, { req }) => req.t("validate.email"))
  .isLength({ max: 70 })
  .withMessage((value, { req }) =>
    req.t("validate.maxLength", { length: 70, input: req.t("inputs.email") })
  );

const nameSchema = check("name")
  .matches(/^[a-zA-Z0-9]+$/)
  .withMessage((value, { req }) => req.t("validate.nameMatch"))
  .isLength({ max: 15 })
  .withMessage((value, { req }) =>
    req.t("validate.maxLength", { length: 15, input: req.t("inputs.name") })
  );

const passwordSchema = check("password")
  .isLength({ min: 6 })
  .withMessage((value, { req }) =>
    req.t("validate.minLength", { length: 6, input: req.t("inputs.password") })
  )
  .isLength({ max: 15 })
  .withMessage((value, { req }) =>
    req.t("validate.maxLength", { length: 15, input: req.t("inputs.password") })
  )
  .matches(/^[a-zA-Z0-9]+$/)
  .withMessage((value, { req }) => req.t("validate.passwordMatch"));

export const createUserSchema = [emailSchema, passwordSchema];

export const createUserSessionSchema = [emailSchema, passwordSchema];

export const changeUserInfoSchema = [nameSchema];

export const changeUserPasswordSchema = [passwordSchema];
