require("dotenv").config({ path: "../.env" });

const template = require("./config/template");
const { Courier } = require("./courier");
const { getWeeklyData } = require("./data");

const courier = new Courier(process.env.COURIER_AUTH_TOKEN);

const templateId = template.weekly;

async function sendMail() {
  const { data: graph1Data } = getWeeklyData();
  const { requestId } = await courier.sendMail(
    "harishscrut@gmail.com",
    templateId,
    {
      weekStart: "May 17th, 2023",
      weekEnd: "May 22nd, 2023",
      graph1: `https://quickchart.io/chart?c={type:'bar',data:{labels:['Sun','Mon','Tue','Wed','Thur','Fri','Sat'],datasets:[{label:'IssuesFound',data:[${graph1Data}]}]},scales:{y:{grid:{display:false}}}}`,
      graph2:
        "https://quickchart.io/chart?c={type:'radialGauge',data:{datasets:[{data:[70],backgroundColor:'green'}]}}",
    }
  );
  console.log(requestId);
}

sendMail();
