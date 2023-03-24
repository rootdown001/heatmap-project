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
    right: 30,
    bottom: 30,
    left: 30
}

// define w & h of svg
const svg_w = 1100 - margin.left - margin.right;
const svg_h = 700 - margin.top - margin.bottom;

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
    console.log("🚀 ~ file: index.js:55 ~ dataObj:", dataObj)


        
// create x Scale
    const xScale = d3.scaleBand()
        .range([0, svg_w - 60])
        .domain(dataObj.monthlyVariance.map(val => val.year))
        .padding(0.01)


// create y scale
    const yScale = d3.scaleBand()
        .range([svg_h - 30, 0])
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reverse())
        .padding(0.01)


// create xAxis
    const xAxis = d3.axisBottom()
                        .scale(xScale)
                        // use map to get array of all years from data object
                        .tickValues(dataObj.monthlyVariance.map(val => val.year)
                        // use filter to return an array of years by decade
                                                        .filter(value => value % 10 == 0))



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
 

    // - RUN THROUGH DATA AND CREATE PLOT-
    //svg.selectAll("circle")

 
//     // -AXIS-
//     // add x axis
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(60, " + (640 - adj) + ")")
        .call(xAxis)

//     // add y axis
    svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + (60) + ", " + (0) + ")")
        .call(yAxis)


//     // - TITLES-
//     // create title
    heading.append('h2')
        .text('Monthly Global Land to Surface Temperature');

    // create subtitle
    heading.append('h3')
        .attr("id", "description")
        .text('Variation from Base Temperature: 1753 - 2015');

//     // title fo y axis
//     svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("x", -390)
//         .attr("y", 14)
//         .attr("font-size", "1.1rem")
//         .text("Y Title")


    // -LEGEND-
    // legend (i linked to additional script in HTML head for this. it doesn't come with d3)
    // create color scale for legend
//     const colorScale = d3.scaleOrdinal()
//         .domain(["colorOne", "colorTwo"])
//         .range([colorOne, colorTwo]);

//     // add legend
//     const legend = d3.legendColor()
//         //.title("Legend")
//         .scale(colorScale);

//     // add g element and call legend obj
//     svg.append("g")
//         .attr("id", "legend")
//         .attr("transform", "translate(" + (svg_w - 300) + "," + (svg_h - 500) + ")")
//         .call(legend);
    

    // -EXIT-
    // exit d3.json().then     
    }) 

    // -CATCH ERRORS-
    // catch error & send to console
    .catch(error => console.log(error));

