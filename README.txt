SMALL ISLAND — itch.io build
============================

WHAT'S IN HERE
  index.html   the page itch loads
  app.js       everything else, bundled (React + the whole game)
  README.txt   this

UPLOADING TO ITCH
  1. New project -> Kind of project: HTML
  2. Upload small-island-itch.zip and tick "This file will be played in the browser"
  3. Embed options:
       Viewport dimensions: 420 x 860
       Tick "Mobile friendly" (orientation: default)
       Tick "Fullscreen button"
       Leave "Click to launch in fullscreen" off
  4. Save & view page.

  index.html must stay at the top level of the zip. Don't nest it in a folder.

HOW THE REPLIES WORK
  Out of the box, each man replies from a written script — his own voice, his own
  lore, and he picks the right answer for what you actually typed (food, tired,
  sad, flirting, jokes, questions about his childhood or his NS). He'll also text
  you first if you go quiet. No key, no server, no cost. This is what anyone who
  finds your itch page will get.

  In the "You" tab you can switch on live, fully-written replies with an API key.
  There are two options:

    CLAUDE — paste an Anthropic key and it just works. Anthropic's API is built
    to accept requests straight from a browser page like this one.

    CHATGPT — this is the one to know about before you rely on it. OpenAI's API
    does not allow a static page to call it directly: there's no browser access
    header like Anthropic's, so the request gets blocked by the browser itself
    (a CORS error) before it ever reaches OpenAI. This isn't a bug in this app —
    every browser-based app hits the same wall with OpenAI's key. If you paste a
    ChatGPT key here on itch, the game will notice the call failed, tell you why
    in a small toast, and quietly fall back to the scripted lines instead of
    breaking. To actually get live ChatGPT replies you'd need a small server or
    proxy of your own sitting between the page and OpenAI (a Cloudflare Worker
    or similar, a few lines long) that holds the key and forwards the request —
    ask if you want one written for you. The endpoint field in the ChatGPT panel
    is there for exactly that: point it at your proxy instead of OpenAI directly.

  Either way, keys are stored in that browser only and are never sent anywhere
  except the provider you chose.

SAVING
  Progress (matches, chats, photos, your daily super like, and your key/provider
  settings) is saved in the browser's local storage, per device. Clearing site
  data resets the island. "Clear all chats and start over" in the You tab does
  the same thing on purpose.

CREDITS / NOTES
  Fonts load from Google Fonts (Fraunces, Karla, DM Mono). If a player is offline
  the game still runs, just with system fonts.


PUTER + OPENAI TEST BUILD
-------------------------
This build loads Puter.js and routes live character replies to OpenAI model openai/gpt-5.6-sol through Puter. No OpenAI API key is stored in the game. The first live reply may trigger Puter sign-in/consent. If Puter is unavailable or usage is exhausted, the existing scripted fallback remains.
