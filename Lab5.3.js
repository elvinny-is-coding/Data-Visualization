// Initial dataset
var dataset = [14, 5, 25, 23, 9, 5, 23];

// Chart dimensions and padding
var w = 500;
var h = 300;
var padding = 30;

// Create SVG container
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", w)
  .attr("height", h);

// Define scales
var xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([padding, w - padding])
  .paddingInner(0.05);

var yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([h - padding, padding]);

// Render the initial bars
var bars = svg.selectAll("rect").data(dataset);

bars
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return yScale(d);
  })
  .attr("width", xScale.bandwidth())
  .attr("height", function (d) {
    return h - padding - yScale(d);
  })
  .attr("fill", "teal");

// Button functionality

// Add new data with btn1
d3.select(".btn1").on("click", function () {
  var maxValue = 25;
  var newNumber = Math.floor(Math.random() * maxValue);

  dataset.push(newNumber); // Add a new random number to the dataset

  updateBars();
});

// Remove the last data with btn2
d3.select(".btn2").on("click", function () {
  dataset.pop(); // Remove the last element from the dataset
  updateBars();
});

// Function to update bars after adding/removing data
function updateBars() {
  // Update scales
  xScale.domain(d3.range(dataset.length));
  yScale.domain([0, d3.max(dataset)]);

  // Bind data to bars
  var bars = svg.selectAll("rect").data(dataset);

  // Enter new bars
  bars
    .enter()
    .append("rect")
    .attr("x", w) // Start off-screen to the right
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return h - padding - yScale(d);
    })
    .attr("fill", "teal")
    .merge(bars) // Update existing bars
    .transition()
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return h - padding - yScale(d);
    });

  // Remove old bars
  bars
    .exit()
    .transition()
    .duration(500)
    .attr("x", -xScale.bandwidth()) // Move off-screen to the left
    .remove();
}
