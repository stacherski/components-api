const express = require("express");
const request = require("supertest");
const apiKeyMiddleware = require("../middleware/apiKey");

const TEST_KEY = "test-secret-key";

function buildApp() {
  const app = express();
  app.use(apiKeyMiddleware);
  app.get("/ping", (_req, res) => res.status(200).json({ ok: true }));
  return app;
}

describe("API Key Middleware", () => {
  describe("when API_KEY is not configured", () => {
    beforeEach(() => {
      delete process.env.API_KEY;
    });

    it("allows requests through without any key", async () => {
      const app = buildApp();
      await request(app).get("/ping").expect(200);
    });
  });

  describe("when API_KEY is configured", () => {
    beforeEach(() => {
      process.env.API_KEY = TEST_KEY;
    });
    afterEach(() => {
      delete process.env.API_KEY;
    });

    it("allows requests with a valid X-Api-Key header", async () => {
      const app = buildApp();
      await request(app).get("/ping").set("x-api-key", TEST_KEY).expect(200);
    });

    it("allows requests with a valid api_key query param", async () => {
      const app = buildApp();
      await request(app).get(`/ping?api_key=${TEST_KEY}`).expect(200);
    });

    it("rejects requests with a wrong header value", async () => {
      const app = buildApp();
      const res = await request(app)
        .get("/ping")
        .set("x-api-key", "wrong-key")
        .expect(401);
      expect(res.body.error).toMatch(/unauthorized/i);
    });

    it("rejects requests with a wrong query param value", async () => {
      const app = buildApp();
      const res = await request(app).get(`/ping?api_key=wrong-key`).expect(401);
      expect(res.body.error).toMatch(/unauthorized/i);
    });

    it("rejects requests with no key provided at all", async () => {
      const app = buildApp();
      const res = await request(app).get("/ping").expect(401);
      expect(res.body.error).toMatch(/unauthorized/i);
    });

    it("prefers the header over the query param when both are present", async () => {
      const app = buildApp();
      // valid header + wrong param → should still pass (header wins)
      await request(app)
        .get(`/ping?api_key=wrong-key`)
        .set("x-api-key", TEST_KEY)
        .expect(200);
    });
  });
});
