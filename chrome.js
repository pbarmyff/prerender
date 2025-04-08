const puppeteer = require('puppeteer');

async function launchChrome() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--remote-debugging-port=9222',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  console.log('✅ Chrome launched at ws://localhost:9222');
}

launchChrome();
