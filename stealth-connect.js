// stealth-connect.js
const { firefox } = require('playwright'); // Use firefox, not chromium!

(async () => {
  console.log("Connecting to Camoufox via WebSocket Server...");
  
  try {
    const browser = await firefox.connect('ws://127.0.0.1:9222');
    console.log("Successfully connected to stealth browser context.");
    
    const page = await browser.newPage();

    console.log("Navigating to target footprint checker...");
    await page.goto('https://sannysoft.com', { waitUntil: 'networkidle' });
    
    await page.screenshot({ path: 'fingerprint_result.png', fullPage: true });
    console.log("Fingerprint screenshot successfully captured.");

    await browser.close();
  } catch (error) {
    console.error("Automation Connection Failed:", error.message);
    process.exit(1);
  }
})();
