// User Story #1: My heat map should have a title with a corresponding id="title".
// PASS

// User Story #2: My heat map should have a description with a corresponding id="description".

// User Story #3: My heat map should have an x-axis with a corresponding id="x-axis".

// User Story #4: My heat map should have a y-axis with a corresponding id="y-axis".

// User Story #5: My heat map should have rect elements with a class="cell" that represent the data.

// User Story #6: There should be at least 4 different fill colors used for the cells.

// User Story #7: Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.

// User Story #8: The data-month, data-year of each cell should be within the range of the data.

// User Story #9: My heat map should have cells that align with the corresponding month on the y-axis.

// User Story #10: My heat map should have cells that align with the corresponding year on the x-axis.

// User Story #11: My heat map should have multiple tick labels on the y-axis with the full month name.

// User Story #12: My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.

// User Story #13: My heat map should have a legend with a corresponding id="legend".

// User Story #14: My legend should contain rect elements.

// User Story #15: The rect elements in the legend should use at least 4 different fill colors.

// User Story #16: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

// User Story #17: My tooltip should have a data-year property that corresponds to the data-year of the active area.
 
// -CREATE VARIABLES-
// margins of svg
const margin = {
    top: 30,
    right: 100,
    bottom: 30,
    left: 30
}

// define w & h of svg
const svg_w = 1200 - margin.left - margin.right;
const svg_h = 620 - margin.top - margin.bottom;

// define padding variable
const paddingHor = 30;
const paddingVert = 30;
const adj = 30;


// define colors for circle fill - colors picked using "i want hue"
const colorOne = "#963B00";
const colorTwo = "#6874FF";
 
// enter d3.json api
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then(dataObj => {

// set base temp
    const baseTemp = dataObj.baseTemperature    
        
// create x Scale
    const xScale = d3.scaleBand()
        .range([0, svg_w - 60])
        .domain(dataObj.monthlyVariance.map(val => val.year))
        .padding(0)


// create y scale
    const yScale = d3.scaleBand()
        .range([svg_h - 30, 0])
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reverse())
        .padding(0)

// create color scale
    const varianceArr = [];
    for (let obj of dataObj.monthlyVariance) {
        varianceArr.push(obj.variance)
    }

    const varianceExtent = d3.extent(varianceArr)

    const rectColor = d3.scaleSequential(d3.interpolateInferno)
                        .domain([varianceExtent[0], varianceExtent[1]])

    
// create xAxis
    const xAxis = d3.axisBottom()
                        .scale(xScale)
                        // use map to get array of all years from data object
                        .tickValues(xScale.domain()
                        // use filter to return an array of years by decade
                        .filter(value => value % 10 === 0))

// create y axis
    const yAxis = d3.axisLeft()
                        .scale(yScale)
                        .tickValues(yScale.domain())
                        .tickFormat(m => {
                            const date = new Date(0);
                            date.setUTCMonth(m);
                            const formatDate = d3.utcFormat("%B")
                            // console.log(formatDate(date))
                            return formatDate(date)
                        })


    const heading = d3.select(".forSvg")
                        .append("heading")

    // create svg obj - give dimensions
    const svg = d3.select(".forSvg")
                    .append("svg")
                    .attr("height", svg_h + margin.top + margin.bottom)
                    .attr("width", svg_w + margin.left + margin.right)
                    .append("g")
                    .attr("transform", "translate(" + 30 + ", " + 0 + ")");

    
    // create tooltip div in .forSvg
    const tooltip = d3.select(".forSvg")
                    .append("div")
                    .attr("id", "tooltip")
 

    // - RUN THROUGH DATA AND CREATE MAP-
    svg.selectAll("rect")
        .data(dataObj.monthlyVariance)
        .enter()
        .append("rect")
        .attr("x", (d) => {
            return xScale((d.year))})
        .attr("y", (d) => {
            return yScale(d.month - 1)})
        .attr("width", (d) => xScale.bandwidth(d.year))
        .attr("height", (d) => yScale.bandwidth((d.month - 1)))
        .attr("fill", (d) => rectColor(d.variance))
        .attr("transform", "translate(" + (margin.left + adj) + ", " + 0 + ")")
        .attr("class", "cell")
        .attr("data-month", (d) => d.month - 1)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => d.variance)
        .on("mouseover", function(event, d) {
            const date = new Date(d.year, (d.month - 1))
            tooltip.html(d3.utcFormat("%B, %Y")(date) + "<br>" + "Variance: " + d.variance)
                .style("display", "block")
                .attr("data-year", d.year)
                .style("left", event.pageX + 20 + "px")
                .style("top", event.pageY - 80 + "px")
                .style("background-color", "lightgray")
        })
        .on("mouseout", function() {
            tooltip.style("display", "none")
        })

    // -AXIS-
    // add x axis
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(60, " + (560 - adj) + ")")
        .call(xAxis)

    // add y axis
    svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + (60) + ", " + (0) + ")")
        .call(yAxis)


    // - TITLES-
    // create title
    heading.append('h2')
        .attr("id", "title")
        .text('Monthly Global Land to Surface Temperature');

    // create subtitle
    heading.append('h3')
        .attr("id", "description")
        .text('Variation from Base Temperature: 1753 - 2015');

    // title fo y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -280)
        .attr("y", 1)
        .attr("font-size", "1rem")
        .text("Months")

    // create legend
    const legend = d3.legendColor()
                    .scale(rectColor)
                    .cells(8)

    // add g element and call legend obj
    svg.append("g")
        .attr("id", "legend")
        .attr("transform", "translate(" + (svg_w + 20) + "," + (svg_h - 350) + ")")
        .call(legend);
    

    // -EXIT-
    // exit d3.json().then     
    }) 

    // -CATCH ERRORS-
    // catch error & send to console
    .catch(error => console.log(error));

