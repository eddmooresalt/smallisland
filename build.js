const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const outdir = path.join(__dirname, "dist");
fs.rmSync(outdir, { recursive: true, force: true });
fs.mkdirSync(outdir, { recursive: true });

esbuild.buildSync({
  entryPoints: [path.join(__dirname, "src", "main.jsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2019",
  loader: { ".jsx": "jsx" },
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: path.join(outdir, "app.js"),
});

fs.copyFileSync(path.join(__dirname, "public", "index.html"), path.join(outdir, "index.html"));

console.log("Built to /dist —", fs.statSync(path.join(outdir, "app.js")).size, "bytes");
