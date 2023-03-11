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
// define w & h of svg
const svg_w = 1100;
const svg_h = 670;

// define padding variable
const paddingHor = 30;
const paddingVert = 30;
const adj = 34;


// define colors for circle fill - colors picked using "i want hue"
const colorOne = "#963B00";
const colorTwo = "#6874FF";

// enter d3.json api
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
    .then(dataObj => {



//     // create x axis
//     const xAxis = d3.axisBottom(xScale)

//     const timeFormat = d3.timeFormat("%M:%S")
//     // create y axis
//     const yAxis = d3.axisLeft(yScaleA).tickFormat(timeFormat)

    // create svg obj - give dimensions
    const svg = d3.select(".forSvg")
                    .append("svg")
                    .attr("height", svg_h)
                    .attr("width", svg_w)
    
    // create tooltip div in .forSvg
    const tooltip = d3.select(".forSvg")
                    .append("div")
                    .attr("id", "tooltip")
 

    // - RUN THROUGH DATA AND CREATE PLOT-
    // add circles with x, y values
    //svg.selectAll("circle")

 
//     // -AXIS-
//     // add x axis
//     svg.append("g")
//         .attr("id", "x-axis")
//         .attr("transform", "translate(0, " + (svg_h-(paddingVert)) + ")")
//         .call(xAxis)

//     // add y axis
//     svg.append("g")
//         .attr("id", "y-axis")
//         .attr("transform", "translate(" + (paddingHor + 8 + adj) + ", " + (0) + ")")
//         .call(yAxis)


//     // - TITLES-
//     // create title
    svg.append('text')
        .attr("x", svg_w/2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "1.7rem")
        .attr("id", "title")
        .text('Monthly Global Land to Surface Temperature');

    // create subtitle
    svg.append('text')
        .attr("x", svg_w/2)
        .attr("y", 58)
        .attr("text-anchor", "middle")
        .attr("font-size", "1.4rem")
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

