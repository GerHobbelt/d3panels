// Generated by CoffeeScript 1.10.0
var dotchart,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

dotchart = function() {
  var axispos, chart, dataByInd, height, indtip, margin, nyticks, pointcolor, pointsSelect, pointsize, pointstroke, rectcolor, rotate_ylab, svg, title, titlepos, width, xcategories, xcatlabels, xjitter, xlab, xscale, xvar, yNA, ylab, ylim, yscale, yticks, yvar;
  width = 400;
  height = 500;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = 20;
  xcategories = null;
  xcatlabels = null;
  xjitter = null;
  yNA = {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  ylim = null;
  nyticks = 5;
  yticks = null;
  rectcolor = "#e6e6e6";
  pointcolor = "slateblue";
  pointstroke = "black";
  pointsize = 3;
  title = "";
  xlab = "Group";
  ylab = "Response";
  rotate_ylab = null;
  xscale = d3.scale.ordinal();
  yscale = d3.scale.linear();
  xvar = 0;
  yvar = 1;
  pointsSelect = null;
  dataByInd = true;
  svg = null;
  indtip = null;
  chart = function(selection) {
    return selection.each(function(data) {
      var g, gEnter, indID, j, na_value, panelheight, points, ref, ref1, results, titlegrp, v, w, x, xaxis, xrange, xv, y, yaxis, yrange, ys;
      if (dataByInd) {
        x = data.map(function(d) {
          return d[xvar];
        });
        y = data.map(function(d) {
          return d[yvar];
        });
      } else {
        x = data[xvar];
        y = data[yvar];
      }
      indID = (ref = data != null ? data.indID : void 0) != null ? ref : null;
      indID = indID != null ? indID : (function() {
        results = [];
        for (var j = 1, ref1 = x.length; 1 <= ref1 ? j <= ref1 : j >= ref1; 1 <= ref1 ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this);
      if (x.length !== y.length) {
        displayError("length(x) [" + x.length + "] != length(y) [" + y.length + "]");
      }
      if (indID.length !== x.length) {
        displayError("length(indID) [" + indID.length + "] != length(x) [" + x.length + "]");
      }
      if (y.every(function(v) {
        return (v != null) && !yNA.force;
      })) {
        yNA.handle = false;
      }
      if (yNA.handle) {
        panelheight = height - (yNA.width + yNA.gap);
      } else {
        panelheight = height;
      }
      xcategories = xcategories != null ? xcategories : unique(x);
      xcatlabels = xcatlabels != null ? xcatlabels : xcategories;
      if (xcatlabels.length !== xcategories.length) {
        displayError("xcatlabels.length [" + xcatlabels.length + "] != xcategories.length [" + xcategories.length + "]");
      }
      if (sumArray((function() {
        var k, len, results1;
        results1 = [];
        for (k = 0, len = x.length; k < len; k++) {
          xv = x[k];
          results1.push((xv != null) && !(indexOf.call(xcategories, xv) >= 0));
        }
        return results1;
      })()) > 0) {
        displayError("Some x values not in xcategories");
        console.log("xcategories:");
        console.log(xcategories);
        console.log("x:");
        console.log(x);
      }
      ylim = ylim != null ? ylim : d3.extent(y);
      na_value = d3.min(y) - 100;
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").attr("class", "d3panels").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", panelheight).attr("width", width).attr("fill", rectcolor).attr("stroke", "none");
      if (yNA.handle) {
        g.append("rect").attr("x", margin.left).attr("y", margin.top + height - yNA.width).attr("height", yNA.width).attr("width", width).attr("fill", rectcolor).attr("stroke", "none");
      }
      xrange = [margin.left + margin.inner, margin.left + width - margin.inner];
      xscale.domain(xcategories).rangePoints(xrange, 1);
      if (xjitter === null) {
        w = (xrange[1] - xrange[0]) / xcategories.length;
        xjitter = (function() {
          var k, len, ref2, results1;
          ref2 = d3.range(x.length);
          results1 = [];
          for (k = 0, len = ref2.length; k < len; k++) {
            v = ref2[k];
            results1.push((Math.random() - 0.5) * w * 0.2);
          }
          return results1;
        })();
      } else {
        if (typeof xjitter === 'number') {
          xjitter = [xjitter];
        }
        if (xjitter.length === 1) {
          xjitter = (function() {
            var k, len, ref2, results1;
            ref2 = d3.range(x.length);
            results1 = [];
            for (k = 0, len = ref2.length; k < len; k++) {
              v = ref2[k];
              results1.push(xjitter[0]);
            }
            return results1;
          })();
        }
      }
      if (xjitter.length !== x.length) {
        displayError("xjitter.length [" + xjitter.length + "] != x.length [" + x.length + "]");
      }
      yrange = [margin.top + panelheight - margin.inner, margin.top + margin.inner];
      yscale.domain(ylim).range(yrange);
      ys = d3.scale.linear().domain(ylim).range(yrange);
      if (yNA.handle) {
        yscale.domain([na_value].concat(ylim)).range([height + margin.top - yNA.width / 2].concat(yrange));
        y = y.map(function(e) {
          if (e != null) {
            return e;
          } else {
            return na_value;
          }
        });
      }
      yticks = yticks != null ? yticks : ys.ticks(nyticks);
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(xcategories).enter().append("line").attr("x1", function(d) {
        return xscale(d);
      }).attr("x2", function(d) {
        return xscale(d);
      }).attr("y1", margin.top).attr("y2", margin.top + height).attr("class", "x axis grid");
      xaxis.selectAll("empty").data(xcategories).enter().append("text").attr("x", function(d) {
        return xscale(d);
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d, i) {
        return xcatlabels[i];
      });
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      rotate_ylab = rotate_ylab != null ? rotate_ylab : ylab.length > 1;
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.selectAll("empty").data(yticks).enter().append("line").attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d) {
        return yscale(d);
      }).attr("x1", margin.left).attr("x2", margin.left + width).attr("class", "y axis grid");
      yaxis.selectAll("empty").data(yticks).enter().append("text").attr("y", function(d) {
        return yscale(d);
      }).attr("x", margin.left - axispos.ylabel).text(function(d) {
        return formatAxis(yticks)(d);
      });
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", rotate_ylab ? "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")" : "");
      if (yNA.handle) {
        yaxis.append("text").attr("x", margin.left - axispos.ylabel).attr("y", margin.top + height - yNA.width / 2).text("N/A");
      }
      indtip = d3.tip().attr('class', 'd3-tip').html(function(d, i) {
        return indID[i];
      }).direction('e').offset([0, 10]);
      svg.call(indtip);
      points = g.append("g").attr("id", "points");
      pointsSelect = points.selectAll("empty").data(x).enter().append("circle").attr("cx", function(d, i) {
        return xscale(x[i]) + xjitter[i];
      }).attr("cy", function(d, i) {
        return yscale(y[i]);
      }).attr("class", function(d, i) {
        return "pt" + i;
      }).attr("r", pointsize).attr("fill", pointcolor).attr("stroke", pointstroke).attr("stroke-width", "1").attr("opacity", function(d, i) {
        var ref2;
        if (((y[i] != null) || yNA.handle) && (x[i] != null) && (ref2 = x[i], indexOf.call(xcategories, ref2) >= 0)) {
          return 1;
        }
        return 0;
      }).on("mouseover.paneltip", indtip.show).on("mouseout.paneltip", indtip.hide);
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", panelheight).attr("width", width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
      if (yNA.handle) {
        return g.append("rect").attr("x", margin.left).attr("y", margin.top + height - yNA.width).attr("height", yNA.width).attr("width", width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
      }
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;
    return chart;
  };
  chart.axispos = function(value) {
    if (!arguments.length) {
      return axispos;
    }
    axispos = value;
    return chart;
  };
  chart.titlepos = function(value) {
    if (!arguments.length) {
      return titlepos;
    }
    titlepos = value;
    return chart;
  };
  chart.xcategories = function(value) {
    if (!arguments.length) {
      return xcategories;
    }
    xcategories = value;
    return chart;
  };
  chart.xcatlabels = function(value) {
    if (!arguments.length) {
      return xcatlabels;
    }
    xcatlabels = value;
    return chart;
  };
  chart.xjitter = function(value) {
    if (!arguments.length) {
      return xjitter;
    }
    xjitter = value;
    return chart;
  };
  chart.ylim = function(value) {
    if (!arguments.length) {
      return ylim;
    }
    ylim = value;
    return chart;
  };
  chart.nyticks = function(value) {
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    if (!arguments.length) {
      return yticks;
    }
    yticks = value;
    return chart;
  };
  chart.rectcolor = function(value) {
    if (!arguments.length) {
      return rectcolor;
    }
    rectcolor = value;
    return chart;
  };
  chart.pointcolor = function(value) {
    if (!arguments.length) {
      return pointcolor;
    }
    pointcolor = value;
    return chart;
  };
  chart.pointsize = function(value) {
    if (!arguments.length) {
      return pointsize;
    }
    pointsize = value;
    return chart;
  };
  chart.pointstroke = function(value) {
    if (!arguments.length) {
      return pointstroke;
    }
    pointstroke = value;
    return chart;
  };
  chart.dataByInd = function(value) {
    if (!arguments.length) {
      return dataByInd;
    }
    dataByInd = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.xlab = function(value) {
    if (!arguments.length) {
      return xlab;
    }
    xlab = value;
    return chart;
  };
  chart.ylab = function(value) {
    if (!arguments.length) {
      return ylab;
    }
    ylab = value;
    return chart;
  };
  chart.rotate_ylab = function(value) {
    if (!arguments.length) {
      return rotate_ylab;
    }
    rotate_ylab = value;
    return chart;
  };
  chart.xvar = function(value) {
    if (!arguments.length) {
      return xvar;
    }
    xvar = value;
    return chart;
  };
  chart.yvar = function(value) {
    if (!arguments.length) {
      return yvar;
    }
    yvar = value;
    return chart;
  };
  chart.yNA = function(value) {
    if (!arguments.length) {
      return yNA;
    }
    yNA = value;
    return chart;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.pointsSelect = function() {
    return pointsSelect;
  };
  chart.remove = function() {
    svg.remove();
    indtip.destroy();
    return null;
  };
  return chart;
};
