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
  await page.waitForTimeout(2000);
  await page.pdf({ path: "chart.pdf" });
  await browser.close();
}

// generating the html by passing template name and dynamic data
const html = generateHtml("weeklyReport", {
  scanGraphLabels: ["W1", "W2", "W3", "W4"],
  scanData: [300, 450, 600, 400],
  weeklyIncidentLabels: ['W1', 'W2', 'W3', 'W4'],
  weeklyIncidentData: [{
    label: 'Resolved',
    data: [50, 60, 70, 180]
    }, {
      label: 'Open Issues',
      data: [100, 200, 300, 400]
    }, 
    {
      label: "Pending",
      data: [50, 22, 33, 122]
    }]
});

generatePDF(html);
