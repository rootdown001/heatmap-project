
 
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
//     svg.append('text')
//         .attr("x", svg_w/2)
//         .attr("y", 20)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "1.7rem")
//         .attr("id", "title")
//         .text('Title');

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

