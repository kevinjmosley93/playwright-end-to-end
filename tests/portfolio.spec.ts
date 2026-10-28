import { test, expect } from "@playwright/test";

test("Check if portfolio has SEO Title/Description; Then check to see if the header contains my name, GitHub link, LinkedIn link, and see if the hero contains subheading text, heading text, and a visible button with text.", async ({
  page,
}) => {
  await page.goto("https://kevinjmosley.com/");
  // Check for SEO Info (Title & Description )

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Kevin J Mosley/);
  // Expect 4th child to be met description.
  await expect(page.locator("head > meta:nth-child(4)")).toHaveAttribute(
    "name",
    "description",
  );
  // Expect to See Name Linked in header
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Kevin J Mosley" }),
  ).toBeVisible();
  // Expect to have Linkedin & Github Links in header
  await expect(
    page.locator("#main-nav").getByRole("link", { name: "LinkedIn" }),
  ).toBeVisible();
  await expect(
    page.locator("#main-nav").getByRole("link", { name: "GitHub" }),
  ).toBeVisible();
  // Expect Hero to contain subheading text
  await expect(page.locator("#hero")).toContainText(
    "Jest, Playwright, Postman | CI/CD (GitHub Actions) | JavaScript/TypeScript | Shopify & E-Commerce | U.S. Navy Veteran",
  );
  // Expect Hero to contain heading text
  await expect(page.locator("h1")).toContainText(
    "SDET / QA Automation Engineer",
  );
  // Expect Hero to contain visible button
  await expect(page.getByRole("link", { name: "Get In Touch" })).toBeVisible();
  // Expect Hero button to have text
  await expect(page.locator("#hero")).toContainText("Get In Touch");
});

test("Check that the contact form at the bottom of the page has name, email and message inputs and a Send Message button; Then submit it and see the Netlify confirmation.", async ({
  page,
}) => {
  await page.goto("https://kevinjmosley.com/");

  const form = page.locator("#contact form[name='contact']");
  await form.scrollIntoViewIfNeeded();

  // Expect form to have name, email and message inputs
  const nameInput = form.getByLabel("Name");
  const emailInput = form.getByLabel("Email");
  const messageInput = form.getByLabel("Message");
  await expect(nameInput).toBeVisible();
  await expect(emailInput).toBeVisible();
  await expect(messageInput).toBeVisible();

  // Expect form to have a button with the text "Send Message"
  const sendButton = form.getByRole("button", { name: "Send Message" });
  await expect(sendButton).toBeVisible();

  // Fill in each field
  await nameInput.fill("Playwright Test");
  await emailInput.fill("playwright-test@example.com");
  await messageInput.fill(
    "Automated Playwright test submission. Please ignore.",
  );

  // Submit the form and expect the Netlify confirmation page
  await sendButton.click();
  await expect(page.getByRole("heading", { name: "Thank you!" })).toBeVisible();
  await expect(
    page.getByText("Your form submission has been received."),
  ).toBeVisible();
});
