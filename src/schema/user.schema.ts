import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short...")
      .matches(/^[\w.-]*$/, "Message error"),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Password must match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

export const createUsersSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short...")
      .matches(/^[\w.-]*$/, "Message error"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
