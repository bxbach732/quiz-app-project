import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
    name: "GET request to /auth/login should show a text/html document",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/login")
            .expect("Content-Type", new RegExp("text/html; charset=utf-8"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    //You can change the email and password value to fit the value of the registered user.
    //Here I'm using the default account of the admin that was given in the project
    name: "POST request to /auth/login with a valid credential should redirect the user",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .send("email=admin@admin.com&password=123456") 
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to /auth/login with invalid input should redirect the user",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .send("email=invalidUser@invalidUser&password=abcdef")
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});