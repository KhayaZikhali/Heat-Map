var dataset = []

const req = new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',true);
req.send();
req.onload = function(){
const json = JSON.parse(req.responseText);
var link = document.getElementById("message").innerHTML
link = JSON.stringify(json);
console.log(link)
dataset.push(link);
};

console.log(dataset.length)
const w = 1200;
const h = 600;
const padding = 80;
var parseTime = d3.timeParse("%Y");

var dates = [];
for (let obj of dataset) {
dates.push(parseTime(obj["year"]));
}
var domain = d3.extent(dates)

// scale for the yAxis
const yScale = d3.scalePoint()
             .domain(["January", "February", "March", "April", "May", "June", "July", "August" , "September", "October", " November", "December"])
             .range([h, padding])

// scale for the xAxis
const xScale = d3.scaleTime()
             .domain(domain)
             .range([padding, w])

const yAxis = d3.axisLeft(yScale);  
const xAxis = d3.axisBottom(xScale)

// select the body                  
const svg = d3.select("body")
          .append("svg")

// properties of the 
// xAxis
svg.append("g")
.attr("class", "xAxis")
.attr("transform", "translate(0," + (h) + ")")
.call(xAxis);

// yAxis 
svg.append("g")
.attr("transform", "translate( " + (padding) + ",0)")
.call(yAxis);

//yAxis label
svg.append("text")
.attr("class", "ylabel")
.attr("text-anchor", "end")
.attr("y", 20)
.attr("dy", ".75em")
.attr("transform", "rotate(-90)")
.attr("x", -300)
.attr("dx", ".75em")
.attr("transform", "rotate(-90)")
.text("Months")      

// xAxis Label
svg.append("text")
.attr("class", "xlabel")
.attr("text-anchor", "end")
.attr("y", h + 50)
.attr("dy", "0em")
.attr("transform", "rotate(-180)")
.attr("x", "60vw")
.attr("dx", "0em")
.attr("transform", "rotate(0)")
.text("Years (" + d3.min(dataset, (d) => d["year"] + " - " + d3.max(dataset, (d) => d["year"] ) + " )"))
