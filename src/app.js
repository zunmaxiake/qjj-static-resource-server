const http = require("http");
const cfg = require("./config/defaultConfig");
const path = require("path");
const route = require("./helper/route");
const openUrl = require("./helper/openUrl");

class Server {
  constructor(conf) {
    this.config = Object.assign({}, cfg, conf);
  }
  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.config.root, req.url);
      route(req, res, filePath);
    })

    server.listen(this.config.port, this.config.hostname, () => {
      const addr = `http://${this.config.hostname}:${this.config.port}`;
      console.log(`server start on ${addr}`);
      openUrl(addr);
    })
  }
}

module.exports = Server;