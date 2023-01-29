import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../app.js";

Deno.test({
    name: `GET request to /topics should be restricted by showing a text/plain 
        instead of a text/html`,
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/topics")
            .expect("Content-Type", new RegExp("text/plain; charset=utf-8"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: `GET request to /topics should be restricted by giving a redirection
        status 302`,
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/topics")
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
