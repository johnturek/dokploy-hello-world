import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";
import { createServer, message } from "./server.js";

test("hello message", () => assert.match(message(), /GitHub.*Dokploy/));

test("health endpoint", async () => {
  const server = createServer().listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  try {
    const { port } = server.address();
    const { status, body } = await new Promise((resolve, reject) => {
      const request = http.get({ host: "127.0.0.1", port, path: "/health", agent: false }, response => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", chunk => { body += chunk; });
        response.on("end", () => resolve({ status: response.statusCode, body }));
      });
      request.on("error", reject);
    });
    assert.equal(status, 200);
    assert.deepEqual(JSON.parse(body), { status: "ok" });
  } finally {
    const closed = new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    server.closeAllConnections();
    await closed;
  }
});
