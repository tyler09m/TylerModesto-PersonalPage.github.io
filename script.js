let responsecount = 0
const Supersector_Code = {
  "00": 'Total nonfarm',
  "05": 'Total private',
  "06": 'Goods-producing',
  "07": 'Service-providing',
  "08": 'Private service-providing',
  "10": 'Mining and logging',
  "20": 'Construction',
  "30": 'Manufacturing',
  "31": 'Durable Goods',
  "32": 'Nondurable Goods',
  "40": 'Trade, transportation, and utilities',
  "41": 'Wholesale trade',
  "42": 'Retail trade',
  "43": 'Transportation and warehousing',
  "44": 'Utilities',
  "50": 'Information',
  "55": 'Financial activities',
  "60": 'Professional and business services',
  "65": 'Education and health services',
  "70": 'Leisure and hospitality',
  "80": 'Other services',
  "90": 'Government'
};
let Supersector_Keys = Object.keys(Supersector_Code)

let Supersector_Values = Object.values(Supersector_Code);



console.log(Supersector_Keys);
console.log(Supersector_Values);
    const CHART_COLORS = {
      Red: 'rgba(255, 99, 132, 0.5)',
      Orange: 'rgba(255, 159, 64, 0.5)',
      Yellow: 'rgba(255, 205, 86, 0.5)',
      Green: 'rgba(75, 192, 192, 0.5)',
      Blue: 'rgba(54, 162, 235, 0.5)',
      Purple: 'rgba(153, 102, 255, 0.5)',
      Grey: 'rgba(201, 203, 207, 0.5)',
      Black: 'rgb(0,0,0)',
      Cyan: 'rgb((0,255,255)',
      Silver: 'rgb(192,192,192)',
      Gray: 'rgb(128,128,128)',
      Maroon: 'rgb(128,0,0)',
      Olive: 'rgb(128,128,0)',
      Green2: 'rgb(0,128,0)',
      Purple: 'rgb((0,128,0)',
      Gold: 'rgb(255,215,0)',
      Green2: 'rgb(46,139,87)',
      Cyan2: 'rgb(224,255,255)',
      Pink: 'rgb(255,218,225)',
      Brown1: 'rgb(188,143,143)',
      Brown2: 'rgb(210,105,30)',
      Orange2: 'rgb(160,82,45)',
      brown3: 'rgb(139,69,19)',
      Tan:'rgb(245,222,179)'
    };
let CHART_COLORS_Keys = Object.keys(CHART_COLORS)

    const CHART_COLORS_50_Percent = {
      Red: 'rgba(255, 99, 132, 0.5)',
      Orange: 'rgba(255, 159, 64, 0.5)',
      Yellow: 'rgba(255, 205, 86, 0.5)',
      Green: 'rgba(75, 192, 192, 0.5)',
      Blue: 'rgba(54, 162, 235, 0.5)',
      Purple: 'rgba(153, 102, 255, 0.5)',
      Grey: 'rgba(201, 203, 207, 0.5)',
      Black: 'rgb(0,0,0)',
      Cyan: 'rgb((0,255,255)',
      Silver: 'rgb(192,192,192)',
      Gray: 'rgb(128,128,128)',
      Maroon: 'rgb(128,0,0)',
      Olive: 'rgb(128,128,0)',
      Green2: 'rgb(0,128,0)',
      Purple: 'rgb((0,128,0)',
      Gold: 'rgb(255,215,0)',
      Green2: 'rgb(46,139,87)',
      Cyan2: 'rgb(224,255,255)',
      Pink: 'rgb(255,218,225)',
      Brown1: 'rgb(188,143,143)',
      Brown2: 'rgb(210,105,30)',
      Orange2: 'rgb(160,82,45)',
      brown3: 'rgb(139,69,19)',
      Tan:'rgb(245,222,179)'
    };

    let CHART_COLORS_50_Percent_Keys = Object.keys(CHART_COLORS_50_Percent);


console.log("hello")
    const data = {
      labels: [],
      datasets: []
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'BLS.gov cannot vouch for the data or analyses derived from these data after the data have been retrieved from BLS.gov.'
          }
        }
      }
    };


let j = 0;
function responseReceivedHandler() {
    if (this.status == 200) {
      console.log(this.response);
      //let i = 0;
      let gridline = {
        label: 'Supersector name',
        data: [],
        borderColor: CHART_COLORS_Keys,
        backgroundColor: CHART_COLORS_50_Percent_Keys,
        hidden: true
      }
        j++;
      let dataArray = this.response.Results.series[0].data;
      console.log(dataArray);

    let seriesID = this.response.Results.series[0].seriesID;

    console.log(seriesID);
      for (let i = dataArray.length - 1; i >= 0; i--) {
        gridline.data.push(dataArray[i].value)

          if (responsecount === 0)
          {
        data.labels.push(dataArray[i].periodName + " " + dataArray[i].year)
      }
      }

      gridline.label = Supersector_Code[seriesID.substring(3,5)]

      console.log(gridline.label);
      responsecount++;


data.datasets.push(gridline);
if (responsecount == Supersector_Keys.length) {
const myChart = new Chart(
  document.getElementById('myChart'),
    config);
    } else {
}
}
}
for (let i = 0; i < 22; i++) {

let xhr = new XMLHttpRequest();
xhr.addEventListener("load", responseReceivedHandler);
xhr.responseType = "json";
//xhr.open("GET", "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU4100000001?registrationkey=");
xhr.open("GET", "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU" + Supersector_Keys[i].toString() + "00000001?registrationkey=294401e570944dad946831abef5973c8");
xhr.send();

}
