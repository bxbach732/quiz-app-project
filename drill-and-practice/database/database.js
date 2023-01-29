import { Pool } from "../deps.js";


const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: Deno.env.get("hostname"),
  database: Deno.env.get("database"),
  user: Deno.env.get("user"),
  password: Deno.env.get("password"),
  port: Deno.env.get("port")
}, CONCURRENT_CONNECTIONS
);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
