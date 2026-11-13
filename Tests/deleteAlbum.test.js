
const request = require("supertest");

test("Delete Album should return ok status", async () => {
    const api = "http://localhost:3030";
    const email = `testOne${Date.now()}@email.com`;

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

    const createdAlbum = await request(api)
        .post("/data/albums")
        .set("X-Authorization", token)
        .send({
            singer: "Pink Floyd",
            album: "The Wall",
            imageUrl: "https://example.com/wall.jpg",
            label: "Harvest",
            sales: "30 million"
        });

    const albumId = createdAlbum.body._id;

    const response = await request(api)
        .delete(`/data/albums/${albumId}`)
        .set("X-Authorization", token);

    expect(response.status).toBe(200);
});

test("Delete Album by another user should return forbidden status", async () => {
    const api = "http://localhost:3030";

    const emailOne = `testOne${Date.now()}@email.com`;
    const emailTwo = `testTwo${Date.now()}@email.com`;

    await request(api)
        .post("/users/register")
        .send({ email: emailOne, password: "pass1234" });

    const loginOne = await request(api)
        .post("/users/login")
        .send({ email: emailOne, password: "pass1234" });

    const tokenOne = loginOne.body.accessToken;

    const createdAlbum = await request(api)
        .post("/data/albums")
        .set("X-Authorization", tokenOne)
        .send({
            singer: "Pink Floyd",
            album: "The Wall",
            imageUrl: "https://example.com/wall.jpg",
            label: "Harvest",
            sales: "30 million"
        });

    await request(api)
        .post("/users/register")
        .send({ email: emailTwo, password: "pass12345" });

    const loginTwo = await request(api)
        .post("/users/login")
        .send({ email: emailTwo, password: "pass12345" });

    const tokenTwo = loginTwo.body.accessToken;

    const albumId = createdAlbum.body._id;

    const response = await request(api)
        .delete(`/data/albums/${albumId}`)
        .set("X-Authorization", tokenTwo);

    expect(response.status).toBe(403);
});

test("Delete Album without authentication should return unauthorized status", async () => {
    const api = "http://localhost:3030";

    const response = await request(api)
        .delete("/data/albums/album-not-existent");

    expect(response.status).toBe(401);
});

test("Delete non-existing Album should return not found status", async () => {
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
        .delete("/data/albums/album-not-existent")
        .set("X-Authorization", token);

    expect(response.status).toBe(404);
});
