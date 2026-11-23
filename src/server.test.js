import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";
import { createServer, message, renderPage } from "./server.js";

test("hello message", () => assert.match(message(), /GitHub.*Dokploy/));

test("renders Windows 95 theme and commit", () => {
  const page = renderPage("abc123");
  assert.match(page, /data-theme="windows-95"/);
  assert.match(page, /Windows 95/);
  assert.match(page, /abc123/);
});

test("health endpoint", async () => {
  const server = createServer().listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  try {
    const { port } = server.address();
    const { status, headers, body } = await new Promise((resolve, reject) => {
      const request = http.get({ host: "127.0.0.1", port, path: "/health", agent: false }, response => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", chunk => { body += chunk; });
        response.on("end", () => resolve({ status: response.statusCode, headers: response.headers, body }));
      });
      request.on("error", reject);
    });
    assert.equal(status, 200);
    assert.deepEqual(JSON.parse(body), { status: "ok" });
    assert.equal(headers["x-content-type-options"], "nosniff");
    assert.equal(headers["x-frame-options"], "DENY");
    assert.match(headers["content-security-policy"], /frame-ancestors 'none'/);
  } finally {
    const closed = new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    server.closeAllConnections();
    await closed;
  }
});
