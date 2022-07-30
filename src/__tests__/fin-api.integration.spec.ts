import request from "supertest";
import { app } from "../app";

describe("FinAPI", () => {
  const token = process.env.JWT_SECRET as string;

  it("should be able to create a user", async () => {
    await request(app)
      .post("api/v1/users")
      .send({
        name: "Test Name",
        email: "test@email.com",
        password: "1234",
      })
      .expect(201);
  });

  it("should be able to get a token with valid email and password", async () => {
    await request(app).post("api/v1/users").send({
      name: "Test Name",
      email: "test@email.com",
      password: "1234",
    });

    const response = await request(app).post("api/v1/sessions").send({
      email: "test@email.com",
      password: "1234",
    });

    expect(response.body.token).toBeTruthy();
  });

  it("should be able to create an deposit", async () => {
    const response = await request(app)
      .post("api/v1/statement")
      .send({
        amount: 5000,
        description: "test deposit",
      })
      .set("Authentication", token)
      .expect(201);

    expect(response.body.id).toBeTruthy();
  });

  it("should be able to make an withdraw", async () => {
    const response = await request(app)
      .post("api/v1/withdraw")
      .send({
        amount: 5000,
        description: "test withdraw",
      })
      .set("Authentication", token)
      .expect(201);

    expect(response.body.id).toBeTruthy();
  });
});
