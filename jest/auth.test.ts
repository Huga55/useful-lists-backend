import request from "supertest";
import app from "../src/app";

describe.skip("Register Part", () => {
  const data = {
    name: "test name",
    email: "email@mail.ru",
    password: "123456",
  };
  it("POST /auth/register -> create new user, tokens in response", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });
  it("POST /auth/register -> 409 error, user with this email is already exist", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(409);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
  it("POST /auth/register -> 400 error, email and password are invalids", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: expect.any(String),
            param: expect.any(String),
            location: expect.any(String),
          }),
        ]),
      })
    );
  });
});

describe("Login Part", () => {
  it("POST /auth/login -> 200, tokens in response", async () => {
    const data = {
      email: "email@mail.ru",
      password: "123456",
    };
    const response = await request(app)
      .post("/api/auth/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });
});
