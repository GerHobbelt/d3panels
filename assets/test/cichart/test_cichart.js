// Generated by CoffeeScript 1.12.5
(function() {
  var axispos, height, margin, width;

  height = 400;

  width = 300;

  margin = {
    left: 80,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };

  axispos = {
    xtitle: 25,
    ytitle: 50,
    xlabel: 5,
    ylabel: 5
  };

  d3.json("data.json", function(data) {
    var mychart;
    mychart = d3panels.cichart({
      height: height,
      width: width,
      margin: margin,
      axispos: axispos,
      xcatlabels: ["A", "B", "C"]
    });
    return mychart(d3.select("div#chart1"), data);
  });

  d3.json("data.json", function(data) {
    var mychart;
    mychart = d3panels.cichart({
      height: width,
      width: height,
      margin: margin,
      axispos: axispos,
      horizontal: true,
      xcatlabels: ["A", "B", "C"]
    });
    return mychart(d3.select("div#chart2"), data);
  });

  d3.json("data.json", function(data) {
    var mychart;
    data.low[1] = data.high[1] = null;
    mychart = d3panels.cichart({
      height: height,
      width: width,
      margin: margin,
      axispos: axispos,
      xcatlabels: ["A", "B", "C"]
    });
    return mychart(d3.select("div#chart3"), data);
  });

  d3.json("data.json", function(data) {
    var mychart;
    data.mean = [data.mean[0], null, null, data.mean[2]];
    data.low = [data.low[0], data.low[1], null, data.low[2]];
    data.high = [data.high[0], data.high[1], null, data.high[2]];
    mychart = d3panels.cichart({
      height: height,
      width: width,
      margin: margin,
      axispos: axispos,
      xcatlabels: ["A", "B", "C", "D"]
    });
    return mychart(d3.select("div#chart4"), data);
  });

}).call(this);
