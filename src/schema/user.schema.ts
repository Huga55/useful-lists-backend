import { check, validationResult } from "express-validator";

const emailSchema = check("email", "Неверный формат email").isEmail();
const passwordSchema = check(
  "password",
  "Пароль должен быть не менее 6 символов"
).isLength({
  min: 6,
});

export const createUserSchema = [emailSchema, passwordSchema];

export const createUserSessionSchema = [emailSchema, passwordSchema];
