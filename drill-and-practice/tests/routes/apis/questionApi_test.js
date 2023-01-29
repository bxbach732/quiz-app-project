import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
    name: "GET request to /api/questions/random should be successful",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/questions/random")
            .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });


Deno.test({
    name: "GET request to /api/questions/random should return a json document",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/questions/random")
            .expect("Content-Type", new RegExp("application/json"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "API should allow cross-origin requests",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/questions/random")
            .expect("access-control-allow-origin", new RegExp(""));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});