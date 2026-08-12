import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const dist = new URL("../dist-static/", import.meta.url);

test("builds the yumi static site shell", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  const jsFiles = await readFile(new URL("index.html", dist), "utf8");
  assert.match(html, /yumi — tools for lighter work/);
  assert.match(html, /meta name="description"/);
  assert.match(html, /og:image/);
  assert.match(jsFiles, /<script type="module"/);
});

test("ships the expected static assets", async () => {
  await Promise.all([
    access(new URL("index.html", dist)),
    access(new URL("assets", dist)),
  ]);
  const [source, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);
  assert.match(source, /把复杂的工作/);
  assert.match(source, /灵犀交付助手/);
  assert.match(source, /Observe/);
  assert.match(css, /prefers-reduced-motion/);
});
