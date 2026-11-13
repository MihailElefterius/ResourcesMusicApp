
const request = require("supertest");

test("Get Albums should return ok status", async () => {
    const api = "http://localhost:3030";

    const response = await request(api)
        .get("/data/albums");

    expect(response.status).toBe(200);
});
