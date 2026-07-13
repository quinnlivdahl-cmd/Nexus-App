import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Nexus project dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Nexus Game · Project Control<\/title>/i);
  assert.match(html, /Nexus Project Control/);
  assert.match(html, /Project Snapshot/);
  assert.match(html, /Roadmap/);
  assert.match(html, /Tickets/);
  assert.match(html, /Worktrees/);
  assert.match(html, /Vision/);
  assert.match(html, /Launch/);
  assert.match(html, /PLAYER LOOP ROADMAP/);
  assert.match(html, /<header\b/i);
  assert.match(html, /<nav\b/i);
  assert.match(html, /<main\b/i);
  assert.match(html, /<footer\b/i);
});

test("ships finished metadata, social art, and no starter preview", async () => {
  const response = await render();
  const html = await response.text();
  const [page, layout, packageJson, socialCard] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    stat(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(html, /property="og:image"/i);
  assert.match(html, /\/og\.png/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
  assert.match(page, /^"use client";/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /assembleLaunchPacket/);
  assert.match(page, /CODEX LAUNCH PACKET/);
  assert.match(page, /Open Codex instructions/);
  assert.doesNotMatch(page, /Local Playable Alpha/);
  assert.match(layout, /generateMetadata/);
  assert.match(packageJson, /"name": "nexus-project-dashboard"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|starter/i);
  assert.ok(socialCard.size > 100_000);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("public/_sites-preview", projectRoot)));
});
