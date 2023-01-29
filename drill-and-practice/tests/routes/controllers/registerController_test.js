import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";
import { executeQuery } from "../../../database/database.js";

Deno.test({
    name: "GET request to /auth/register should show a text/html document",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/register")
            .expect("Content-Type", new RegExp("text/html; charset=utf-8"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to /auth/register with valid input should redirect the user",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/register")
            .send("email=validUser@validUser.com&password=123456")
            .expect(302);

        await executeQuery("DELETE FROM users WHERE email='validUser@validUser.com'")
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to /auth/register with invalid input should not redirect the user",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/register")
            .send("email=invalidUser@invalidUser&password=1")
            .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});