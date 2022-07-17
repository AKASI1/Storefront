import supertest from "supertest";
import app from "../../server";
import "dotenv/config";
import jwt from "jsonwebtoken";

const userInstance = {
  firstname: "test",
  lastname: "test2",
  password: "CpsodK3918",
};

const token = jwt.sign(userInstance, process.env.JWT_SECRET as string);
const request = supertest(app);

describe("User Handler", () => {
  it("should return success for CREATE user", async () => {
    const response = await request.post("/register").send(userInstance);

    expect(response.status).toBe(200);
  });

  it("should return success for READ all users", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ user by id", async () => {
    const response = await request
      .get("/users/1")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for LOGIN user", async () => {
    const response = await request.post("/login").send({
      id: 1,
      password: userInstance.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE user by id", async () => {
    const response = await request
      .delete("/users/1")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
  });
});
