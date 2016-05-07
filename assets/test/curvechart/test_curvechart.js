// Generated by CoffeeScript 1.10.0
(function() {
  var h, halfh, halfw, margin, totalh, totalw, w;

  h = 600;

  w = 900;

  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };

  halfh = h + margin.top + margin.bottom;

  totalh = halfh * 2;

  halfw = w + margin.left + margin.right;

  totalw = halfw * 2;

  d3.json("data.json", function(data) {
    var mychart, textbox;
    mychart = d3panels.curvechart({
      xlab: "Age (weeks)",
      ylab: "Body weight",
      height: h,
      width: w,
      margin: margin,
      strokewidthhilit: 4
    });
    mychart(d3.select("div#chart1"), data);
    textbox = mychart.svg().append("text").attr("class", "title").text("").attr("y", margin.top / 2).attr("x", margin.left).style("text-anchor", "start");
    return mychart.curvesSelect().on("mouseover.text", function(d, i) {
      return textbox.text("ind " + (i + 1));
    }).on("mouseout.text", function() {
      return textbox.text("");
    });
  });

  d3.json("data.json", function(data) {
    var i, mychart, ref;
    mychart = d3panels.curvechart({
      xlab: "Age (weeks)",
      ylab: "Body weight",
      height: w,
      width: h,
      margin: margin,
      strokewidthhilit: 4
    });
    data.x = (function() {
      var results;
      results = [];
      for (i in data.y) {
        results.push(data.x[0]);
      }
      return results;
    })();
    ref = [data.y, data.x], data.x = ref[0], data.y = ref[1];
    return mychart(d3.select("div#chart2"), data);
  });

}).call(this);
