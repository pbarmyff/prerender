#!/usr/bin/env node
const prerender = require('./lib');

const server = prerender({
  chromeLocation: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium'
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
