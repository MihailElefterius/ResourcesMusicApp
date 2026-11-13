
const request = require("supertest");

test("Login should return ok status", async () => {
    const api = "http://localhost:3030";
    const email = `test${Date.now()}@email.com`;

    await request(api)
        .post("/users/register")
        .send({
            email,
            password: "pass1234"
        });

    const response = await request(api)
        .post("/users/login")
        .send({
            email,
            password: "pass1234"
        });

    expect(response.status).toBe(200);
});

test("Login with wrong password should return forbidden status", async () => {
    const api = "http://localhost:3030";
    const email = `test${Date.now()}@email.com`;

    await request(api)
        .post("/users/register")
        .send({
            email,
            password: "pass1234"
        });

    const response = await request(api)
        .post("/users/login")
        .send({
            email,
            password: "wrongPassword"
        });

    expect(response.status).toBe(403);
});
