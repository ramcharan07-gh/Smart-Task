const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 4173;
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };
http.createServer((req, res) => {
  const requested = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const file = path.join(__dirname, requested);
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "text/plain" });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => console.log(`Smart Task running at http://127.0.0.1:${port}`));
