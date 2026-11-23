import http from "node:http";

export function message() {
  return "Hello from GitHub → Actions → Dokploy!";
}

export function createServer() {
  return http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ status: "ok" }));
    }
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><html><head><title>Dokploy CI/CD</title><style>body{font-family:system-ui;display:grid;place-items:center;min-height:100vh;background:#101827;color:#fff}main{text-align:center}code{color:#67e8f9}</style></head><body><main><h1>${message()}</h1><p>Commit <code>${process.env.GIT_SHA ?? "local"}</code></p><p>Tests → build → deployment → live health verification</p></main></body></html>`);
  });
}

if (process.env.NODE_ENV !== "test") {
  createServer().listen(Number(process.env.PORT ?? 3000), "0.0.0.0");
}
