const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs");

// this helper helps in removing escaped characters in html <script> tag
handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

// generating the html based on template and dynamic data
function generateHtml(templateName, data) {
  const templateSource = fs.readFileSync(
    `templates/${templateName}.hbs`,
    "utf8"
  );
  const template = handlebars.compile(templateSource);
  const html = template(data);
  return html;
}

// converts html to pdf
async function generatePDF(html) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setContent(html, {
    waitUntil: ["load", "networkidle0", "domcontentloaded","networkidle2"],
  });
  await page.pdf({ path: "chart.pdf" });
  // await browser.close();
}

const html = generateHtml("weeklyReport", {
  dataLabels: ["W1", "W2", "W3", "W4"],
  seriesName: "Scans",
  seriesData: [300, 450, 600, 400],
});

// const source = fs.readFileSync("weeklyReport.hbs", "utf8");
// const template = handlebars.compile(source);
// const myArray = { data: [1, 2, 3, 4, 5] };
// const html = template({ myArray });

generatePDF(html);
