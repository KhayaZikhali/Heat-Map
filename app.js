const dataset = [{
    "year": 1753,
    "month": 1,
    "variance": -1.366
  },
  {
    "year": 1753,
    "month": 2,
    "variance": -2.223
  },
  {
    "year": 1753,
    "month": 3,
    "variance": 0.211
  },
  {
    "year": 1753,
    "month": 4,
    "variance": -0.958
  },
  {
    "year": 1753,
    "month": 5,
    "variance": 0.175
  },
  {
    "year": 1753,
    "month": 6,
    "variance": 1.049
  },
  {
    "year": 1753,
    "month": 7,
    "variance": 0.464
  },
  {
    "year": 1753,
    "month": 8,
    "variance": -0.526
  },
  {
    "year": 1753,
    "month": 9,
    "variance": 0.470
  },
  {
    "year": 1753,
    "month": 10,
    "variance": -0.610
  },
  {
    "year": 1753,
    "month": 11,
    "variance": -1.452
  },
  {
    "year": 1753,
    "month": 12,
    "variance": -4.256
  },
]


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
const yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([h, padding])

// scale for the xAxis
const xScale = d3.scaleTime()
                 .domain(domain)
                 .range([padding, w ])



const yAxis = d3.axisLeft(yScale);  
const xAxis = d3.axisBottom(xScale)



// select the body                  
const svg = d3.select("body")
              .append("svg")

// properties of the cirlce dots             
  
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
   .text(" Add yAxis label here" );      
   
// xAxis Label
svg.append("text")
   .attr("class", "xlabel")
   .attr("text-anchor", "end")
   .attr("y", h+ 50)
   .attr("dy", "0em")
   .attr("transform", "rotate(-180)")
   .attr("x", 700)
   .attr("dx", "0em")
   .attr("Add xAxis label here")