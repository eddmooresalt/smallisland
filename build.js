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

// Always give app.js a fresh URL so the phone cannot keep an old cached bundle.
const sourceIndex = fs.readFileSync(
  path.join(__dirname, "public", "index.html"),
  "utf8"
);
const buildTag = `auto-${Date.now()}`;
const builtIndex = sourceIndex.replace(
  /\/app\.js(?:\?v=[^"'<> ]*)?/,
  `/app.js?v=${buildTag}`
);
fs.writeFileSync(path.join(outdir, "index.html"), builtIndex);

console.log(
  "Built Small Island vNext to /dist —",
  fs.statSync(path.join(outdir, "app.js")).size,
  "bytes —",
  buildTag
);
