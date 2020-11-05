const fs = require("fs");
const promisify = require("util").promisify;
const path = require("path");
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const cfg = require("../config/defaultConfig");
const Handlebars = require("handlebars");
const source = fs.readFileSync(path.join(__dirname, "../template/dir.tpl"));
const template = Handlebars.compile(source.toString());
const mime = require("../helper/mime");
const compress = require("../helper/compress");
const range = require("../helper/range");
const cache = require("../helper/cache");

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      res.statusCode = 200;
      const mimeType = mime(filePath)
      res.setHeader("Content-Type", mimeType);
      if (cache(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }
      const { code, start, end } = range(stats.size, req, res);
      let rs;
      if (code === 200) {
        rs = fs.createReadStream(filePath);
      } else if (code === 206) {
        rs = fs.createReadStream(filePath, { start, end });
      }
      if (filePath.match(cfg.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      const files = await readdir(filePath);
      const dir = path.relative(cfg.root, filePath);
      const data = {
        title: path.basename(filePath),
        files,
        dir: dir ? `/${dir}` : ''  //??
      }
      res.end(template(data));
    }
  }
  catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end(`${filePath} is not file or directory`);
  }
}