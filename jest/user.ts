import request from "supertest";
import { Express } from "express";
import { accessToken, refreshToken } from "./auth";

const userTest = (app: Express) => {
  describe("Get user info", () => {
    const endpoint = "/api/user/info";
    it("GET /user/info -> 200 get user's info", async () => {
      const response = await request(app)
        .get(endpoint)
        .set({ Authorization: accessToken })
        .expect("Content-Type", /json/)
        .expect(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          _id: expect.any(String),
          email: expect.any(String),
        })
      );
    });
  });

  describe("PUT change user info", () => {
    const endPoint = "/api/user/info";
    const newName = "newName";
    const repeatName = "name"; // need to change new name every test
    it("PUT /user/info -> 200 get new user info", async () => {
      const response = await request(app)
        .put(endPoint)
        .set({ Authorization: accessToken })
        .send({ name: newName })
        .expect("Content-Type", /json/)
        .expect(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
        })
      );
    });

    it("PUT /user/info -> 400 invalids body properties", async () => {
      const response = await request(app)
        .put(endPoint)
        .set({ Authorization: accessToken })
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

    it("PUT /user/info -> 409 this name has already used", async () => {
      const response = await request(app)
        .put(endPoint)
        .set({ Authorization: accessToken })
        .send({ name: repeatName })
        .expect("Content-Type", /json/)
        .expect(409);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });

  describe("PUT change user's password", () => {
    const endpoint = "/api/user/password";
    const data = {
      oldPassword: "123456",
      password: "123456",
    };
    it("PUT /user/password -> 200 password is changed", async () => {
      await request(app)
        .put(endpoint)
        .set({ Authorization: accessToken })
        .send(data)
        .expect(200);
    });

    it("PUT /user/password -> 400 incorrect new password", async () => {
      const response = await request(app)
        .put(endpoint)
        .set({ Authorization: accessToken })
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

    const dataIncorrect = {
      oldPassword: "123456123",
      password: "123456",
    };
    it("PUT /user/password -> 404 old password is incorrect", async () => {
      const response = await request(app)
        .put(endpoint)
        .set({ Authorization: accessToken })
        .send(dataIncorrect)
        .expect(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });
};

export default userTest;
