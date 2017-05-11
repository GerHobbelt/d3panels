// Generated by CoffeeScript 1.12.5
(function() {
  var h, w;

  h = 600;

  w = 600;

  d3.json("data.json", function(data) {
    var mychart;
    mychart = d3panels.heatmap({
      height: h,
      width: w,
      zthresh: 0.5
    });
    return mychart(d3.select("div#chart1"), data);
  });

  d3.json("data_unequal.json", function(data) {
    var mychart2;
    mychart2 = d3panels.heatmap({
      height: h / 2,
      width: w,
      zthresh: 0.5
    });
    return mychart2(d3.select("div#chart2"), data);
  });

  d3.json("data_categorical.json", function(data) {
    var mychart3;
    mychart3 = d3panels.heatmap({
      height: h,
      width: w
    });
    return mychart3(d3.select("div#chart3"), data);
  });

}).call(this);
