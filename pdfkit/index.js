const PDFDocument = require("pdfkit");
const fs = require("fs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

async function genDoc() {
  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream("output.pdf"));

  // Add another page
  doc.addPage().fontSize(16).text("Here is some vector graphics...", 100, 100);

  // Draw a triangle
  doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, -380)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // Add some text with annotations
  doc
    .addPage()
    .fontSize(16)
    .fillColor("blue")
    .text("Here is a link!", 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, "http://google.com/");

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    type: "png",
    width: 800,
    height: 600,
  });
  const configuration = {
    type: "bar",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Users",
          data: [50, 60, 70, 180],
        },
      ],
    },
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  const tempImg = tmp.fileSync({ postfix: ".png" });
  fs.writeFileSync(tempImg.name, imageBuffer);
  doc
    .image(tempImg.name, 0, 15, { width: 300 })
    .text("Proportional to width", 0, 0);

  // Finalize PDF file
  doc.end();
}

genDoc();
