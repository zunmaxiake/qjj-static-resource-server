const { cache } = require("../config/defaultConfig");

function refresh(stats, res) {
  if (cache.expires) {
    res.setHeader("Expires", new Date(Date.now() + cache.maxAge * 1000).toUTCString());
  }
  if (cache.cacheControl) {
    res.setHeader("Cache-Control", `public max-age=${cache.maxAge}`);
  }
  if (cache.lastModified) {
    res.setHeader("Last-Modified", stats.mtime.toUTCString());
  }
  if (cache.etag) {
    res.setHeader("ETag", `${stats.size}-${stats.mtime}`);
  }
}

module.exports = function fresh(stats, req, res) {
  refresh(stats, res);
  const lastModified = req.headers["if-modified-since"];
  const etag = req.headers["if-none-match"];
  if (!lastModified && !etag) {
    return false;
  }
  if (lastModified && lastModified !== res.getHeader("Last-Modified")) {
    return false;
  }
  if (etag && etag !== res.getHeader("ETag")) {
    return false;
  }
  return true;
}