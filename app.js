const api = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json`
      fetch(api)
           .then(response => {
             return response.json()
            })
            // Shows the tempperature rounded down in degreess
             .then(data => {
               console.log(data)})

  const w = 1400;
    const h = 800;
    
    const padding = 50;
    
   // Create an x and y scale
   const xScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset, (d) => d)])
                   .range([50, 1.54*h]);

   const yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset, (d) => d[1])])
                   .range([h-padding,padding]);

   const yAxis = d3.axisLeft(yScale);
   const xAxis = d3.axisBottom(xScale)

  // adjust properties of the body
const svg = d3.select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .attr("class", "this")
          
          
  // each of the rect elements
  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", (d, i) => {return 50 + i * 4.3}) 
     .attr("y", (d, i) => {return  h-d[1]/28 -30 })
     .attr("width", 3)
     .attr("height", (d, i) => {return d[1]/28})
     .attr("fill", "blue")
     .attr("class"," bar ")
     .append("title")
     .attr("class", "tooltip tooltiptext") 
     .text(((d, i ) => "$"+ d[1] + " "+"," + d[0]) )
     .attr("class" , "title")     
  // the text above each of the bars     
  svg.selectAll("text")  
     .data(dataset)
     .enter()
     .append("text")
     .attr("x", (d, i) =>  (i *100))
     .attr("y", (d, i) =>  h )
     .text(  ) 
     
     
  // yAxis label 
  svg.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("y", 60)
     .attr("dy", ".75em")
     .attr("transform", "rotate(-90)")
     .attr("x", -320)
     .attr("dx", ".75em")
     .attr("transform", "rotate(-90)")
     .text("Gross Domestic Product (Billions)");   
  
  svg.append("text")
     .attr("class", "xlabel")
     .attr("text-anchor", "end")
     .attr("y", 800)
     .attr("dy", "0em")
     .attr("transform", "rotate(-180)")
     .attr("x", 700)
     .attr("dx", "0em")
     .attr("transform", "rotate(0)")
     .text("Years (1945 - 2015)");   


  svg.append("g")
    .attr("transform", "translate("+ (padding  ) + ",20)")
    .call(yAxis);

  svg.append("g")
     .attr("transform", "translate(0,"+ (h-30) + ")")
     .call(xAxis) 