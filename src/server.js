import http from "node:http";

export function message() {
  return "Hello from GitHub → Actions → Dokploy!";
}

export function renderPage(commit = "local") {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dokploy CI/CD — Windows 95</title>
  <style>
    :root { --silver:#c0c0c0; --navy:#000080; --teal:#008080; }
    * { box-sizing: border-box; }
    html, body { height: 100%; margin: 0; }
    body {
      overflow: hidden;
      color: #000;
      background: var(--teal);
      font-family: "MS Sans Serif", Tahoma, Geneva, sans-serif;
      font-size: 13px;
      user-select: none;
    }
    button, .window, .taskbar, .start-menu {
      background: var(--silver);
      border-top: 2px solid #fff;
      border-left: 2px solid #fff;
      border-right: 2px solid #000;
      border-bottom: 2px solid #000;
      box-shadow: inset 1px 1px #dfdfdf, inset -1px -1px #808080;
    }
    .desktop { min-height: calc(100vh - 40px); padding: 18px; position: relative; }
    .icon { width: 78px; color: #fff; text-align: center; margin-bottom: 18px; text-shadow: 1px 1px #000; }
    .icon-art { font-size: 36px; line-height: 42px; filter: drop-shadow(2px 2px #004040); }
    .window {
      width: min(660px, calc(100vw - 130px));
      position: absolute;
      left: 50%; top: 46%; transform: translate(-50%, -50%);
      padding: 3px;
    }
    .titlebar {
      height: 26px; padding: 4px 4px 4px 7px;
      display: flex; align-items: center; justify-content: space-between;
      color: #fff; font-weight: bold;
      background: linear-gradient(90deg, #000080, #1084d0);
    }
    .controls { display: flex; gap: 3px; }
    .controls button { width: 20px; height: 18px; padding: 0; font-weight: bold; line-height: 12px; }
    .menubar { padding: 6px 8px; border-bottom: 1px solid #808080; }
    .menubar span { margin-right: 18px; } .menubar u { text-underline-offset: 2px; }
    .content { margin: 8px; padding: 16px; background: #fff; border: 2px inset #fff; user-select: text; }
    .hero { display: flex; align-items: center; gap: 18px; }
    .computer { font-size: 58px; }
    h1 { font-size: 19px; margin: 0 0 8px; }
    .pipeline { margin: 18px 0; padding: 12px; background: #ffffe1; border: 1px solid #808080; }
    .step { display: inline-block; margin: 4px 2px; padding: 5px 8px; background: var(--silver); border: 1px outset #fff; }
    .ok { color: #006400; font-weight: bold; }
    code { background: #000; color: #00ff00; padding: 3px 6px; font-family: "Courier New", monospace; }
    .statusbar { display: flex; gap: 4px; margin: 6px 8px 8px; }
    .statusbar span { flex: 1; padding: 4px 6px; border: 2px inset #fff; }
    .taskbar {
      height: 40px; position: fixed; left: 0; right: 0; bottom: 0;
      display: flex; align-items: center; gap: 6px; padding: 3px;
    }
    .start { height: 31px; padding: 3px 10px 3px 6px; font-weight: bold; font-size: 14px; }
    .start-logo { display:inline-grid; place-items:center; width:20px; height:20px; margin-right:5px; background:#fff; color:#000080; }
    .task { height: 31px; min-width: 190px; text-align: left; padding: 5px 10px; font-weight: bold; border: 2px inset #fff; }
    .clock { margin-left: auto; min-width: 90px; padding: 7px 10px; text-align: center; border: 2px inset #fff; }
    .start-menu { display:none; position:fixed; left:3px; bottom:40px; width:220px; padding:4px; z-index:5; }
    .start-menu.open { display:flex; }
    .rail { writing-mode:vertical-rl; transform:rotate(180deg); background:#808080; color:#c0c0c0; padding:8px 5px; font-size:20px; font-weight:bold; }
    .menu-items { flex:1; } .menu-item { padding:12px; font-size:14px; } .menu-item:hover { color:#fff; background:#000080; }
    @media (max-width: 650px) { .window { width: calc(100vw - 24px); top: 45%; } .desktop>.icon { display:none; } .hero { align-items:flex-start; } .computer { font-size:40px; } }
  </style>
</head>
<body data-theme="windows-95">
  <div class="desktop">
    <div class="icon"><div class="icon-art">🖥️</div>My Computer</div>
    <div class="icon"><div class="icon-art">🌐</div>Network Neighborhood</div>
    <main class="window" aria-label="Dokploy deployment status">
      <div class="titlebar"><span>🌐 Dokploy CI/CD Status</span><div class="controls"><button>_</button><button>□</button><button>×</button></div></div>
      <div class="menubar"><span><u>F</u>ile</span><span><u>V</u>iew</span><span><u>H</u>elp</span></div>
      <section class="content">
        <div class="hero"><div class="computer">🖥️</div><div><h1>${message()}</h1><div class="ok">✓ Production deployment successful</div></div></div>
        <div class="pipeline"><strong>Automated pipeline:</strong><br><span class="step">✓ Tests</span> ➜ <span class="step">✓ Docker Build</span> ➜ <span class="step">✓ Dokploy</span> ➜ <span class="step">✓ Health Check</span></div>
        <p>Running commit: <code>${commit}</code></p>
      </section>
      <div class="statusbar"><span>Internet zone</span><span>Ready</span></div>
    </main>
  </div>
  <div id="start-menu" class="start-menu"><div class="rail">Windows 95</div><div class="menu-items"><div class="menu-item">📁 Programs</div><div class="menu-item">⚙️ Settings</div><div class="menu-item">🔍 Find</div><div class="menu-item">❓ Help</div></div></div>
  <footer class="taskbar"><button class="start" onclick="document.getElementById('start-menu').classList.toggle('open')"><span class="start-logo">▦</span>Start</button><button class="task">🌐 Dokploy CI/CD Status</button><div class="clock" id="clock">11:95 PM</div></footer>
  <script>const clock=document.getElementById('clock');function tick(){clock.textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}tick();setInterval(tick,1000);</script>
</body>
</html>`;
}

export function createServer() {
  return http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ status: "ok" }));
    }
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(renderPage(process.env.GIT_SHA ?? "local"));
  });
}

if (process.env.NODE_ENV !== "test") {
  createServer().listen(Number(process.env.PORT ?? 3000), "0.0.0.0");
}
