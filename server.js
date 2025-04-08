#!/usr/bin/env node
const prerender = require('./lib');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222'],
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium'
  });

  const server = prerender({
    chromeLocation: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    chromeFlags: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222']
  });

  server.use(prerender.sendPrerenderHeader());
  server.use(prerender.browserForceRestart());
  server.use(prerender.addMetaTags());
  server.use(prerender.removeScriptTags());
  server.use(prerender.httpHeaders());

  server.start();
})();
