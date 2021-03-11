var height = 500;
var width = 1000;
var margin  = {
    left:120,
    right:20,
    top:20,
    bottom:70,
},
url = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json`,
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" ,"December"],
color = ["#ef5350", "#EC407A", "#AB47BC", " #7E57C2", "#5C6BC0", "#42A5F5" , "#26C6DA", "#26A690" , "#D4E157", "#FFEE58", "#FFA726"]

// the main canvas 
var canvas = d3.select("svg").attr({
    height: height + margin.top + margin.bottom,
    width : width + margin.left + margin.right
});

var title = document.querySelector(".title").textContent = "Temperature Variations from the year 1753 to 2015"

var group = canvas.append("g")
        .attr({
          transform: "translate(" + margin.left +","+ margin.top + " )" 
         })

var div = d3.select(".tooltip");
var xScale = d3.time.scale().range([0, width])
var yScale = d3.scale.ordinal().domain(months).rangeBands([0, height]);
var colorScale = d3.scale.quantize().range(color);


d3.json(url , (data) => {
    data = data.monthlyVariance;
    // map the data to the div
    data.map((d)=>{
        d.month = months[d.month-1]
        //for the y axis 
        d.year = d3.time.format("%Y").parse(d.year.toString());
    })


// declaring the Xscale 
xScale.domain(d3.extent(data, (data)=> {
        return data.year;
}));
// Colors for the bars 

colorScale.domain(d3.extent(data, (d) => {
    return d.variance
}));

// declaring the  width of the bars
var barWidth = width/ (data.length/12);
var barHeight = height/ (12);

// declaring the x and y axis 
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(12);

// rendering the xAxis 
  group.append('g')
    .attr({
      class: 'xAxis',
      transform: 'translate(0' + (height) + ')'
    })
    .call(xAxis)

// rendering the yAxis 
  group.append('g')
    .attr({
      class: 'yAxis',
      transform: 'translate(0 , 0)'
    })
    .call(yAxis)

 //append g to the svg
  group.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr({
        transform: (data)=> {
        return "translate(" + xScale(data.year) + " ," + yScale(data.month) + ")";
        }

    // adding the rectangle 
    })
    .append("rect")
    .attr({
        width: barWidth,
        height: yScale.rangeBand()
    })
    .style({
        fill: (data) => {
            return colorScale(data.variance)
        }
    })

    //append the tooltip on mouse hover 
    .on("mouseover", (d) => {
        div.transition().duration(10)
        .style("opacity", 0.8)
        .style({
            left: d3.event.pageX + "px",
            top : d3.event.pageY + "px"
        })
       div.html("<p>Year:" + d3.time.format("%Y")(d.year) + " </p> <p>value : " +  (8.66 + d.variance.toFixed(2)) + " </p><p> " + d.month +"</p>")
    })

    .on("mouseout" , (d)=>{
        div.transition().duration(100)
        .style("opacity", 0);
    })

})