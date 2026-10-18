// stealth-connect.js
const { chromium } = require('playwright');

(async () => {
  console.log("Connecting to Camoufox via CDP...");
  // Connect to the background Camoufox instance running on port 9222
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  
  const contexts = browser.contexts();
  const page = contexts.length > 0 ? await contexts[0].newPage() : await browser.newPage();

  console.log("Navigating to target...");
  await page.goto('https://sannysoft.com', { waitUntil: 'networkidle' });
  
  // Save the result so you can download it from GitHub Actions Artifacts
  await page.screenshot({ path: 'fingerprint_result.png', fullPage: true });
  console.log("Screenshot successfully saved to fingerprint_result.png");

  await browser.close();
})();
