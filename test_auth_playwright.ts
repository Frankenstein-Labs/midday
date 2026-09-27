import { chromium } from "playwright";
import * as fs from "fs";

async function runAuthFlowTest() {
  fs.mkdirSync("./playwright-artifacts", { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("--- 1. Navigating to Login Page ---");
  await page.goto("https://midday-dashboard-demo.onrender.com/login");
  await page.waitForTimeout(3000);

  await page.screenshot({ path: "./playwright-artifacts/01-login-page.png" });
  console.log("Current URL:", page.url());

  // Check buttons / accordion
  const pageTitle = await page.title();
  console.log("Page Title:", pageTitle);

  const googleButton = page.locator("button:has-text('Continue with Google')");
  console.log("Google button visible:", await googleButton.isVisible());

  // Expand "or" accordion if needed to see OTP email form
  const accordionTrigger = page.locator("button:has-text('or')").first();
  if (await accordionTrigger.isVisible()) {
    console.log("Clicking accordion trigger to show OTP input...");
    await accordionTrigger.click();
    await page.waitForTimeout(1000);
  }

  await page.screenshot({ path: "./playwright-artifacts/02-accordion-expanded.png" });

  const emailInput = page.locator("input[placeholder='Enter email address']");
  const inputVisible = await emailInput.isVisible();
  console.log("Email input visible:", inputVisible);

  if (inputVisible) {
    console.log("--- 2. Submitting Test Email for OTP ---");
    await emailInput.fill("test-user-human@example.com");
    await page.screenshot({ path: "./playwright-artifacts/03-email-filled.png" });

    const submitBtn = page.locator("button[type='submit']:has-text('Continue')");
    await submitBtn.click();
    await page.waitForTimeout(3000);

    await page.screenshot({ path: "./playwright-artifacts/04-otp-sent.png" });

    const otpSlots = page.locator("input[data-input-otp]");
    console.log("OTP slot input area visible:", await otpSlots.isVisible());
  }

  const cookies = await context.cookies();
  console.log("Cookies captured:", cookies.map(c => ({ name: c.name, domain: c.domain })));

  await browser.close();
  console.log("--- Test completed successfully ---");
}

runAuthFlowTest().catch((err) => {
  console.error("Playwright Test Error:", err);
  process.exit(1);
});
