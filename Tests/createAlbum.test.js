
const request = require("supertest");

test("Create Album should return ok status", async () => {
    const api = "http://localhost:3030";
    const email = `test${Date.now()}@email.com`;

    await request(api)
        .post("/users/register")
        .send({
            email,
            password: "pass1234"
        });

    const loginResponse = await request(api)
        .post("/users/login")
        .send({
            email,
            password: "pass1234"
        });

    const token = loginResponse.body.accessToken;

    const response = await request(api)
        .post("/data/albums")
        .set("X-Authorization", token)
        .send({
            singer: "Pink Floyd",
            album: "The Wall",
            imageUrl: "https://example.com/wall.jpg",
            label: "Harvest",
            sales: "30 million"
        });

    expect(response.status).toBe(200);
});

test("Create Album without authentication should return unauthorized status", async () => {
    const api = "http://localhost:3030";

    const response = await request(api)
        .post("/data/albums")
        .send({
            singer: "Pink Floyd",
            album: "The Wall",
            imageUrl: "https://example.com/wall.jpg",
            label: "Harvest",
            sales: "30 million"
        });

    expect(response.status).toBe(401);
});
