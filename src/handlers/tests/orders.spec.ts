import supertest from "supertest";
import "dotenv/config";
import app from "../../server";
import jwt from "jsonwebtoken";

const token = jwt.sign("AhmedKASI", process.env.JWT_SECRET as string);
const request = supertest(app);

describe("Order Handler", () => {
  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({
        quantity: 1,
        user_id: 1,
        product_id: 1,
        status: "active",
      });

    expect(response.status).toBe(200);
  });

  it("should return success for READ orders by user id", async () => {
    const response = await request
      .get("/orders1")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE order by order id", async () => {
    const response = await request
      .delete("/orders")
      .auth(token, { type: "bearer" })
      .send({ orderId: "1" });

    expect(response.status).toBe(200);
  });
});
