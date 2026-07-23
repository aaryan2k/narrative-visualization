var currentScene = 1;
var onlyBlue = false;

async function init() {
    onlyBlue = false;
    goToScene(1);
}

async function goToScene(scene) {
    const data = await d3.csv("nba_rookie.csv");
    currentScene = scene;
    drawScene(data);
}

function drawScene(data) {
    d3.select("svg").selectAll("*").remove();
    drawScatterplot(data);
    drawLegend();
    if (currentScene === 1) {
        drawAnnotation1();
        hideButton();
    } else if (currentScene === 2) {
        drawAnnotation2();
        hideButton();
    } else {
        showButton();
    }
}

function drawScatterplot(data) {
    var x = d3.scaleLinear().domain([0, 45]).range([400, 900]);
    var y = d3.scaleLinear().domain([0, 32]).range([600, 0]);
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
        .style("stroke", "black");
    if (currentScene === 3) {
        var tooltip = d3.select("#tooltip");
        d3.select("svg")
            .append("g")
            .attr("transform", "translate(150, 150)")
            .selectAll("circle").data(data).enter()
            .append("circle")
            .attr("cx", function(d) { return x(d.MIN); })
            .attr("cy", function(d) { return y(d.PTS); })
            .attr("r", "10")
            .attr("fill", "transparent")
            .on("mouseover", function(d) {
                tooltip
                    .interrupt()
                    .style("opacity", 1)
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY + 5) + "px")
                    .html(d.Name + "<br>PPG: " + d.PTS + "<br>MPG: " + d.MIN + "<br>5+ YRs: " + numToBool(d.TARGET_5Yrs));
            })
            .on("mouseout", function() {
                tooltip
                    .transition().duration(2000)
                    .style("opacity", 0);
            });
        d3.select("svg")
            .append("text")
            .attr("x", 805)
            .attr("y", 120)
            .text("Hover over points for more info")
            .attr("font-size", "18px");
        if (onlyBlue) {
            d3.select("svg")
                .selectAll("circle")
                .filter(function(d) {
                    return Number(d.TARGET_5Yrs) === 0;
                })
                .attr("opacity", "0");
        }
        
    }
    drawAxes(x, y);
}

function drawAxes(x, y) {
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
        .attr("fill", "lightblue")
        .style("stroke", "black");
    d3.select("svg")
        .append("circle")
        .attr("cx", 1105)
        .attr("cy", 200)
        .attr("r", "7")
        .attr("fill", "lightcoral")
        .style("stroke", "black");
    d3.select("svg")
        .append("text")
        .attr("x", 1120)
        .attr("y", 175)
        .text(" = Played in NBA for 5+ years");
    d3.select("svg")
        .append("text")
        .attr("x", 1120)
        .attr("y", 205)
        .text(" = Out of NBA in less than 5 years");

    d3.select("svg")
        .append("text")
        .attr("x", 645)
        .attr("y", 35)
        .text("Do Productive NBA Rookies Last Longer?")
        .attr("font-size", "30px");

    if (currentScene === 3) {
        d3.select("svg")
            .append("text")
            .attr("x", 1099)
            .attr("y", 240)
            .text("*")
            .attr("font-size", "20px");
        d3.select("svg")
            .append("text")
            .attr("x", 1120)
            .attr("y", 235)
            .text(" = Hall of Famer")
    }
}

function drawAnnotation1() {
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
        .attr("y", 470)
        .text("↗")
        .attr("font-size", "65px");
}

function drawAnnotation2() {
    d3.select("svg")
        .append("text")
        .attr("x", 630)
        .attr("y", 205)
        .text("This player played similar minutes to others,")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 630)
        .attr("y", 225)
        .text("but stands out with much higher scoring")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 905)
        .attr("y", 235)
        .text("→")
        .attr("font-size", "60px");

    d3.select("svg")
        .append("text")
        .attr("x", 1020)
        .attr("y", 380)
        .text("This player scored well & had a good opportunity,")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 1030)
        .attr("y", 400)
        .text("but couldn't last in the NBA very long")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 950)
        .attr("y", 390)
        .text("←")
        .attr("font-size", "60px");

    d3.select("svg")
        .append("text")
        .attr("x", 430)
        .attr("y", 690)
        .text("He overcame the")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 430)
        .attr("y", 710)
        .text("odds & had a")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 430)
        .attr("y", 730)
        .text("long career")
        .attr("font-size", "17px");
    d3.select("svg")
        .append("text")
        .attr("x", 537)
        .attr("y", 730)
        .text("→")
        .attr("font-size", "60px"); 
}

function numToBool(target) {
    if (target === "0") {
        return "No";
    } else {
        return "Yes";
    }
}

function toggleBlue() {
    onlyBlue = !onlyBlue;
    goToScene(3);
}

function hideButton() {
    d3.select("#blue")
        .style("opacity", "0");
}

function showButton() {
    d3.select("#blue")
        .style("opacity", "1");
}