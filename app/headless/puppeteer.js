import puppeteer from "puppeteer";

const browser = await puppeteer.launch();
const page = await browser.newPage();
const url = "https://www.douyin.com/?recommend=1";
await page.goto(url);
await page.setViewport({ width: 1080, height: 1024 });
// Type into search box.
// const inputDom = await page.locator("input");
// console.log(inputDom);

await page.screenshot({ path: "baidu.png", fullPage: true });
await browser.close();
