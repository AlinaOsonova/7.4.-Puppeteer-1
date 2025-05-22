let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    await page.waitForTimeout(3000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Build and ship software on a single, collaborative platform · GitHub",
      { timeout: 10000 }
    );
  });

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(3000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(3000);
    const btnSelector = ".btn-large-mktg.btn-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  });
});

describe("Main page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com");
  });

  test("Check the presence of Pricing link", async () => {
    await page.setDefaultTimeout(2000);
    const pricingLinkSelector = 'a[href="/pricing"]';
    await page.waitForSelector(pricingLinkSelector);
    const pricingText = await page.$eval(
      pricingLinkSelector,
      (link) => link.textContent
    );
    expect(pricingText).toContain("Pricing");
  });
  test("Check the main page footer", async () => {
    await page.setDefaultTimeout(2000);
    const footer = await page.$("footer");
    const actual = await page.evaluate((footer) => footer.textContent, footer);
    expect(actual).toContain("Product");
  });
  test("Check the presence of Sign in button", async () => {
    await page.setDefaultTimeout(2000);
    const signInButtonSelector = 'a[href="/login"]';
    await page.waitForSelector(signInButtonSelector);
    const actual = await page.$eval(
      signInButtonSelector,
      (link) => link.textContent
    );
    expect(actual).toContain("Sign in");
  });
});
