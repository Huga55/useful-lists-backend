import request from "supertest";
import { Express } from "express";
import { accessToken } from "./auth";

const sectionTest = (app: Express) => {
  let idOfNewSection = null;

  describe.skip("GET sections of user", () => {
    const endpoint = "/api/section";
    it("GET /section -> to get all sections of user", async () => {
      const response = await request(app)
        .get(endpoint)
        .set({ Authorization: accessToken })
        .expect("Content-Type", /json/)
        .expect(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            isDefault: expect.any(Boolean),
          }),
        ])
      );
    });
  });

  describe.skip("POST create new section", () => {
    const endpoint = "/api/section";
    const dataCreate = {
      name: "new section",
    };
    const dataCreateError = {
      name: "too long name, too long name, too long name, too long name, too long name, too long name, too long name, too long name",
    };
    it("POST /section -> 200, to create new section", async () => {
      const response = await request(app)
        .post(endpoint)
        .set({ Authorization: accessToken })
        .send(dataCreate)
        .expect("Content-Type", /json/)
        .expect(200);

      idOfNewSection = response.body._id;

      expect(response.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: dataCreate.name,
          isDefault: false,
        })
      );
    });

    it.skip("POST /section -> 400, error with param", async () => {
      const response = await request(app)
        .post(endpoint)
        .set({ Authorization: accessToken })
        .send(dataCreateError)
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

    it.skip("POST /section -> 409, section with this name is already exist", async () => {
      const response = await request(app)
        .post(endpoint)
        .set({ Authorization: accessToken })
        .send(dataCreate)
        .expect("Content-Type", /json/)
        .expect(409);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });

  describe.skip("PUT change name of section", () => {
    const endpoint = "/api/section";
    const data = {
      name: "other name",
    };
    it("PUT /section -> 200, change name of section", async () => {
      await request(app)
        .put(endpoint)
        .set({ Authorization: accessToken })
        .send({ _id: idOfNewSection, name: data.name })
        .expect(200);
    });

    it("PUT /section -> 400, error with params", async () => {
      const response = await request(app)
        .put(endpoint)
        .set({ Authorization: accessToken })
        .send({ _id: idOfNewSection, name: "" })
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

    it("PUT /section -> 404, section was not defined", async () => {
      const response = await request(app)
        .put(endpoint)
        .set({ Authorization: accessToken })
        .send({ _id: "615031dc8a8e3e2f3885632d", name: "404 error" })
        .expect("Content-Type", /json/)
        .expect(404);
      console.log("404 error", response.body);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });

    it("PUT /section -> 409, section with this name is already exist", async () => {
      const response = await request(app)
        .put(endpoint)
        .set({ Authorization: accessToken })
        .send({ _id: idOfNewSection, name: data.name })
        .expect("Content-Type", /json/)
        .expect(409);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });

  describe.skip("DELETE delete section", () => {
    const endpoint = "/api/section";
    it("DELETE /section -> 200, section was deleted", async () => {
      await request(app)
        .delete(`${endpoint}/${idOfNewSection}`)
        .set({ Authorization: accessToken })
        .expect(200);
    });

    it("DELETE /section -> 404, section was not found", async () => {
      const response = await request(app)
        .delete(`${endpoint}/${idOfNewSection}`)
        .set({ Authorization: accessToken })
        .expect("Content-Type", /json/)
        .expect(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });
};

export default sectionTest;
