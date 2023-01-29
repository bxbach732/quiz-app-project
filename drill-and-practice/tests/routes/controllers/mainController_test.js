import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
    name: "GET request to / should be successful",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/")
            .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });


Deno.test({
    name: "GET request to / should return a text/html document",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/")
            .expect("Content-Type", new RegExp("text/html; charset=utf-8"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});