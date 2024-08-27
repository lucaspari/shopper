import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("should return a greeting message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("Hello from the server!!!");
  });
});
