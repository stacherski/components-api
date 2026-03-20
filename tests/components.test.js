require("dotenv").config();
const request = require("supertest");

const API =
  "http://localhost:8080/api/components?=api_key=" + process.env.API_KEY;

describe("Components API (live server)", () => {
  let createdId;

  const validComponent = {
    name: "as-button-test",
    description: "Button component",
    properties: [
      {
        name: "variant",
        default: "primary",
        description: "Visual style",
        propertyType: "string",
        optional: "true",
      },
    ],
    events: [
      {
        name: "onClick",
        exampleValue: "handleClick()",
        description: "Triggered on click",
      },
    ],
    examples: [
      {
        example: "Basic usage",
        code: "<as-button>Click</as-button>",
      },
    ],
  };

  it("POST creates component", async () => {
    const res = await request(API).post("/").send(validComponent);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();

    createdId = res.body._id;
  });

  it("GET list", async () => {
    const res = await request(API).get("/");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET single", async () => {
    const res = await request(API).get(`/${createdId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it("PATCH update", async () => {
    const res = await request(API)
      .patch(`/${createdId}`)
      .send({ description: "Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe("Updated");
  });

  it("DELETE removes component", async () => {
    const res = await request(API).delete(`/${createdId}`);

    expect(res.statusCode).toBe(200);
  });

  it("GET deleted returns 404", async () => {
    const res = await request(API).get(`/${createdId}`);

    expect(res.statusCode).toBe(404);
  });

  it("validation fails without required fields", async () => {
    const res = await request(API).post("/").send({});

    expect(res.statusCode).toBe(400);
  });
});
