#!/usr/bin/env node
const { exec } = require('child_process');
const prerender = require('./lib');

exec('node chrome.js', (err, stdout, stderr) => {
  if (err) {
    console.error('🚫 Failed to launch Chrome:', err);
    return;
  }

  console.log(stdout);

  const server = prerender();

  server.use(prerender.sendPrerenderHeader());
  server.use(prerender.browserForceRestart());
  server.use(prerender.addMetaTags());
  server.use(prerender.removeScriptTags());
  server.use(prerender.httpHeaders());

  server.start();
});
