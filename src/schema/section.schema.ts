import { check } from "express-validator";

const nameSchema = check("name")
  .matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/)
  .withMessage((value, { req }) => req.t("validate.nameSectionMatch"))
  .isLength({ max: 30 })
  .withMessage((value, { req }) =>
    req.t("validate.maxLength", {
      length: 15,
      input: req.t("inputs.nameSection"),
    })
  );

export const createSectionSchema = [nameSchema];

export const changeSectionSchema = [nameSchema];
