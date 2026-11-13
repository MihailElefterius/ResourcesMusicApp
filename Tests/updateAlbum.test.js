
const request = require("supertest");

test("Update Album should return ok status", async () => {
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

    const createAlbumResponse = await request(api)
        .post("/data/albums")
        .set("X-Authorization", token)
        .send({
            singer: "Pink Floyd",
            album: "The Wall",
            imageUrl: "https://example.com/wall.jpg",
            label: "Harvest",
            sales: "30 million"
        });

    const albumId = createAlbumResponse.body._id;

    const response = await request(api)
        .put(`/data/albums/${albumId}`)
        .set("X-Authorization", token)
        .send({
            singer: "Pink Floyd",
            album: "Animals",
            imageUrl: "https://example.com/animals.jpg",
            label: "Harvest",
            sales: "12 million"
        });

    expect(response.status).toBe(200);
});

test("Update non-existing Album should return not found status", async () => {
    const api = "http://localhost:3030";

    const response = await request(api)
        .put("/data/albums/1")
        .send({
            singer: "Pink Floyd",
            album: "Animals",
            imageUrl: "https://example.com/animals.jpg",
            label: "Harvest",
            sales: "12 million"
        });

    expect(response.status).toBe(404);
});

test("Update Album by another user should return forbidden status", async () => {
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
        .put(`/data/albums/${albumId}`)
        .set("X-Authorization", tokenTwo)
        .send({
            singer: "Pink Floyd",
            album: "Animals",
            imageUrl: "https://example.com/animals.jpg",
            label: "Harvest",
            sales: "12 million"
        });

    expect(response.status).toBe(403);
});
