import request from "supertest";
import express from "express";
import authRoutes from "../authRoutes.js";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

jest.mock("../../models/User.js");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user and return a token", async () => {
      const mockUser = { _id: "123", email: "test@example.com" };
      User.create.mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(User.create).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should return 400 if email already exists", async () => {
      User.create.mockRejectedValue(new Error("Email already exists"));

      const res = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login user and return a token", async () => {
      const mockUser = {
        _id: "123",
        email: "test@example.com",
        comparePassword: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should return 401 if user not found", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid credentials");
    });

    it("should return 400 if password not provided", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email and password required");
    });
  });
});
