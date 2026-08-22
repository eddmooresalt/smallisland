const { spawn, spawnSync } = require("child_process");
const path = require("path");

const POLL_MS = Number(process.env.SMALL_ISLAND_POLL_MS || 10000);
let syncing = false;

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: __dirname,
    encoding: "utf8",
    ...options,
  });
}

function gitText(args) {
  const result = run("git", args, { stdio: ["ignore", "pipe", "pipe"] });
  if (result.status !== 0) return null;
  return String(result.stdout || "").trim();
}

function build() {
  console.log("\n🏝️  Rebuilding Small Island...");
  const result = run(process.execPath, [path.join(__dirname, "build.js")], {
    stdio: "inherit",
  });

  if (result.status === 0) {
    console.log("✅ Game updated. Refresh your phone.\n");
    return true;
  }

  console.error("❌ Build failed. Keeping the previous build.\n");
  return false;
}

function syncFromGitHub() {
  if (syncing) return;
  syncing = true;

  try {
    const fetch = run("git", ["fetch", "origin", "main"], {
      stdio: ["ignore", "ignore", "pipe"],
    });

    if (fetch.status !== 0) {
      console.error("⚠️  Couldn't check GitHub. Trying again automatically.");
      return;
    }

    const local = gitText(["rev-parse", "HEAD"]);
    const remote = gitText(["rev-parse", "origin/main"]);

    if (!local || !remote || local === remote) return;

    console.log("\n📥 New GitHub upload found. Updating automatically...");

    const pull = run("git", ["pull", "--ff-only", "origin", "main"], {
      stdio: "inherit",
    });

    if (pull.status !== 0) {
      console.error(
        "⚠️  Auto-update couldn't pull because this PC has local Git changes. " +
        "Commit/stash them and the watcher will try again."
      );
      return;
    }

    build();
  } finally {
    syncing = false;
  }
}

console.log("🏝️  Small Island AUTO mode");
console.log(`👀 Checking GitHub every ${Math.round(POLL_MS / 1000)} seconds.`);
console.log("📱 Upload to GitHub → wait a few seconds → refresh phone.\n");

build();

const server = spawn("npx", ["serve", "dist"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: process.platform === "win32",
});

server.on("exit", (code) => {
  if (code && code !== 0) {
    console.error(`Static server exited with code ${code}.`);
  }
});

const timer = setInterval(syncFromGitHub, POLL_MS);
setTimeout(syncFromGitHub, 1000);

function stop() {
  clearInterval(timer);
  if (!server.killed) server.kill();
  process.exit(0);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
