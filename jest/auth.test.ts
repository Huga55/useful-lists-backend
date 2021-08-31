import request from "supertest";
import app from "../src/app";

let accessToken = "";
let refreshToken = "";

describe.skip("Register", () => {
  const endpoint = "/api/auth/register";
  const data = {
    name: "test name",
    email: "email@mail.ru",
    password: "123456",
  };
  it("POST /auth/register -> create new user, tokens in response", async () => {
    const response = await request(app)
      .post(endpoint)
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
      .post(endpoint)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(409);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
  it("POST /auth/register -> 400 error, body parameters are invalids", async () => {
    const response = await request(app)
      .post(endpoint)
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

describe.skip("Login", () => {
  const endpoint = "/api/auth/login";
  it("POST /auth/login -> 200, tokens in response", async () => {
    const data = {
      email: "email@mail.ru",
      password: "123456",
    };
    const response = await request(app)
      .post(endpoint)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200);

    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;

    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });
  it("POST /auth/login -> 401, email or password are invalids", async () => {
    const data = {
      email: "email@mail.ru",
      password: "123456789",
    };
    const response = await request(app)
      .post(endpoint)
      .expect("Content-Type", /json/)
      .send(data)
      .expect(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
  it("POST /auth/login -> 400, body parameters are invalids", async () => {
    const response = await request(app)
      .post(endpoint)
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

describe.skip("Logout", () => {
  const endpoint = "/api/auth/logout";
  it("DELETE /auth/logout -> 200 logout user with accessToken", async () => {
    await request(app)
      .delete(endpoint)
      .set({ Authorization: accessToken })
      .expect(200);
  });
  it("DELETE /auth/logout -> 403 access is denied", async () => {
    await request(app).delete(endpoint).expect(403);
  });
});
