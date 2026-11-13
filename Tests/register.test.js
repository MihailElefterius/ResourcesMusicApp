
const request = require("supertest");

test("Register should return ok status", async () => {
    const api = "http://localhost:3030";

    const response = await request(api)
        .post("/users/register")
        .send({
            email: `test${Date.now()}@email.com`,
            password: "pass1234"
        });

    expect(response.status).toBe(200);
});

test("Register with empty email and password should return bad request status", async () => {
    const api = "http://localhost:3030";

    const response = await request(api)
        .post("/users/register")
        .send({
            email: "",
            password: ""
        });

    expect(response.status).toBe(400);
});

test("Register existing user should return conflict status", async () => {
    const api = "http://localhost:3030";
    const email = `test${Date.now()}@email.com`;

    await request(api)
        .post("/users/register")
        .send({
            email,
            password: "pass1234"
        });

    const response = await request(api)
        .post("/users/register")
        .send({
            email,
            password: "pass1234"
        });

    expect(response.status).toBe(409);
});
