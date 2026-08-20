const fs = require("fs");
const path = require("path");

const outdir = path.join(__dirname, "dist");
fs.rmSync(outdir, { recursive: true, force: true });
fs.mkdirSync(outdir, { recursive: true });

fs.copyFileSync(
  path.join(__dirname, "prebuilt", "index.html"),
  path.join(outdir, "index.html")
);

fs.copyFileSync(
  path.join(__dirname, "prebuilt", "app.js"),
  path.join(outdir, "app.js")
);

console.log("Built latest Small Island");
