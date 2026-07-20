let currentScene = 0;

async function init() {
    const data = await d3.csv("nba_rookie.csv");
    currentScene = 0;
    drawScene(data);
}

function drawScene(data) {
    d3.select("svg").selectAll("*").remove();
    drawScatterplot(data);
    drawLegend();
    if (currentScene === 0) {
        drawAnnotation0();
    } else if (currentScene === 1) {
        console.log("Do something else");
    } else if (currentScene === 2) {
        console.log("Do something else entirely");
    }
}

function drawScatterplot(data) {
    var x = d3.scaleLinear().domain([0, 45]).range([400, 900]);
    var y = d3.scaleLinear().domain([0, 32]).range([600, 0]);
    if (currentScene !== 2) {
        d3.select("svg")
            .append("g")
            .attr("transform", "translate(150, 150)")
            .selectAll("circle").data(data).enter()
            .append("circle")
            .attr("cx", function(d) { return x(d.MIN); })
            .attr("cy", function(d) { return y(d.PTS); })
            .attr("r", "7")
            .attr("fill", function(d) { 
                return d.TARGET_5Yrs === '0' ? "lightcoral" : "lightblue"; 
            })
        // d3.select("svg")
        //     .selectAll("circle")
        //     .filter(function(d) {
        //         return Number(d.GP) <= 70;
        //     })
        //     .attr("opacity", "0");
    }
    d3.select("svg")
        .append("g")
        .attr("transform", "translate(550, 150)")
        .call(d3.axisLeft(y)
            .tickFormat(d3.format("~s"))
        );
    d3.select("svg")
        .append("g")
        .attr("transform", "translate(150, 750)")
        .call(d3.axisBottom(x)
            .tickFormat(d3.format("~s"))
        );
    d3.select("svg")
        .append("text")
        .attr("x", 725)
        .attr("y", 800)
        .text("Minutes Played Per Game")
        .attr("font-size", "18px");
    d3.select("svg")
        .append("text")
        .attr("x", 330)
        .attr("y", 475)
        .text("Points Scored Per Game")
        .attr("font-size", "18px");
}

function drawLegend() {
    d3.select("svg")
        .append("text")
        .attr("x", 1090)
        .attr("y", 150)
        .text("Legend: ")
        .attr("font-size", "20px");
    d3.select("svg")
        .append("circle")
        .attr("cx", 1105)
        .attr("cy", 170)
        .attr("r", "7")
        .attr("fill", "lightblue");
    d3.select("svg")
        .append("circle")
        .attr("cx", 1105)
        .attr("cy", 200)
        .attr("r", "7")
        .attr("fill", "lightcoral");
    d3.select("svg")
        .append("text")
        .attr("x", 1120)
        .attr("y", 175)
        .text(" = Stayed in NBA for 5+ years");
    d3.select("svg")
        .append("text")
        .attr("x", 1120)
        .attr("y", 205)
        .text(" = Out of NBA in less than 5 years");
}

function drawAnnotation0() {
    d3.select("svg")
        .append("text")
        .attr("x", 600)
        .attr("y", 350)
        .text("Notice the upward trend: ")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 575)
        .attr("y", 370)
        .text("Scoring generally increases with playing time")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 750)
        .attr("y", 450)
        .text("⇗")
        .attr("font-size", "65px");
}