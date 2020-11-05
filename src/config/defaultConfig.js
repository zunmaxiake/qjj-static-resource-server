module.exports = {
  port: 3000,
  hostname: "127.0.0.1",
  root: process.cwd(),
  compress: /\.(js|jpg|json)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}