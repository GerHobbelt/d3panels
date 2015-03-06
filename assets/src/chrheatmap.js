// Generated by CoffeeScript 1.9.1
var chrheatmap;

chrheatmap = function() {
  var axispos, bordercolor, cellSelect, chart, chrGap, colors, hover, margin, nullcolor, oneAtTop, pixelPerCell, rectcolor, rotate_ylab, title, titlepos, xlab, ylab, zlim, zscale, zthresh;
  pixelPerCell = 3;
  chrGap = 4;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = 20;
  rectcolor = "#e6e6e6";
  nullcolor = "#e6e6e6";
  bordercolor = "black";
  colors = ["slateblue", "white", "crimson"];
  title = "";
  xlab = "";
  ylab = "";
  rotate_ylab = null;
  zlim = null;
  zthresh = null;
  zscale = d3.scale.linear();
  oneAtTop = false;
  hover = true;
  cellSelect = null;
  chart = function(selection) {
    return selection.each(function(data) {
      var cell, cells, celltip, chrborders, cur, g, gEnter, height, i, j, k, l, len, nchr, nm, nx, ny, ref, ref1, svg, titlegrp, totmar, val, width, x, xCellStart, xChrBorder, xaxis, yCellStart, yChrBorder, yaxis, zmax, zmin;
      ny = data.z.length;
      nx = (function() {
        var k, len, ref, results;
        ref = data.z;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          x = ref[k];
          results.push(x.length);
        }
        return results;
      })();
      for (i in nx) {
        if (nx[i] !== ny) {
          displayError("Row " + (i + 1) + " of data.z is not the right length: " + nx[i] + " != " + ny);
        }
      }
      nchr = data.nmar.length;
      totmar = sumArray(data.nmar);
      if (totmar !== ny) {
        displayError("sum(data.nmar) [" + (sumArray(data.nmar)) + "] != data.z.length [" + data.z.length + "]");
      }
      if (data.chrnames.length !== nchr) {
        displayError.log("data.nmar.length [" + data.nmar.length + "] != data.chrnames.length [" + data.chrnames.length + "]");
      }
      if (data.labels.length !== totmar) {
        displayError("data.labels.length [" + data.labels.length + "] != sum(data.nmar) [" + (sum(data.nmar)) + "]");
      }
      if (chrGap < 1) {
        displayError("chrGap should be >= 2 (was " + chrGap + ")");
        chrGap = 2;
      }
      xChrBorder = [0];
      xCellStart = [];
      cur = chrGap / 2;
      ref = data.nmar;
      for (k = 0, len = ref.length; k < len; k++) {
        nm = ref[k];
        for (j = l = 0, ref1 = nm; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
          xCellStart.push(cur + 1);
          cur = cur + pixelPerCell;
        }
        xChrBorder.push(cur + 1 + chrGap / 2);
        cur = cur + chrGap;
      }
      width = cur - chrGap / 2;
      height = width;
      if (oneAtTop) {
        yChrBorder = (function() {
          var len1, m, results;
          results = [];
          for (m = 0, len1 = xChrBorder.length; m < len1; m++) {
            val = xChrBorder[m];
            results.push(val);
          }
          return results;
        })();
        yCellStart = (function() {
          var len1, m, results;
          results = [];
          for (m = 0, len1 = xCellStart.length; m < len1; m++) {
            val = xCellStart[m];
            results.push(val);
          }
          return results;
        })();
      } else {
        yChrBorder = (function() {
          var len1, m, results;
          results = [];
          for (m = 0, len1 = xChrBorder.length; m < len1; m++) {
            val = xChrBorder[m];
            results.push(height - val + 1);
          }
          return results;
        })();
        yCellStart = (function() {
          var len1, m, results;
          results = [];
          for (m = 0, len1 = xCellStart.length; m < len1; m++) {
            val = xCellStart[m];
            results.push(height - val - pixelPerCell);
          }
          return results;
        })();
      }
      data.cells = [];
      for (i in data.z) {
        for (j in data.z[i]) {
          data.cells.push({
            i: i,
            j: j,
            z: data.z[i][j],
            x: xCellStart[i] + margin.left,
            y: yCellStart[j] + margin.top
          });
        }
      }
      data.allz = (function() {
        var len1, m, ref2, results;
        ref2 = data.cells;
        results = [];
        for (m = 0, len1 = ref2.length; m < len1; m++) {
          cell = ref2[m];
          results.push(cell.z);
        }
        return results;
      })();
      zmin = d3.min(data.allz);
      zmax = d3.max(data.allz);
      if (-zmin > zmax) {
        zmax = -zmin;
      }
      zlim = zlim != null ? zlim : [-zmax, 0, zmax];
      if (zlim.length !== colors.length) {
        displayError("zlim.length (" + zlim.length + ") != colors.length (" + colors.length + ")");
      }
      zscale.domain(zlim).range(colors);
      zthresh = zthresh != null ? zthresh : zmin - 1;
      data.cells = (function() {
        var len1, m, ref2, results;
        ref2 = data.cells;
        results = [];
        for (m = 0, len1 = ref2.length; m < len1; m++) {
          cell = ref2[m];
          if (cell.z >= zthresh || cell.z <= -zthresh) {
            results.push(cell);
          }
        }
        return results;
      })();
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").attr("class", "d3panels").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", rectcolor).attr("stroke", null).attr("stroke-width", "0");
      chrborders = g.append("g").attr("id", "chrBorders");
      chrborders.selectAll("empty").data(xChrBorder).enter().append("line").attr("x1", function(d) {
        return d + margin.left;
      }).attr("x2", function(d) {
        return d + margin.left;
      }).attr("y1", margin.top).attr("y2", margin.top + height).attr("stroke", bordercolor).attr("stroke-width", "1");
      chrborders.selectAll("empty").data(yChrBorder).enter().append("line").attr("y1", function(d) {
        return d + margin.top;
      }).attr("y2", function(d) {
        return d + margin.top;
      }).attr("x1", margin.left).attr("x2", margin.left + width).attr("stroke", bordercolor).attr("stroke-width", "1");
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      xaxis.selectAll("empty").data(data.chrnames).enter().append("text").attr("x", function(d, i) {
        return margin.left + (xChrBorder[i] + xChrBorder[i + 1]) / 2;
      }).attr("y", oneAtTop ? margin.top - 2 * axispos.xlabel : margin.top + height + axispos.xlabel).text(function(d) {
        return d;
      }).style("dominant-baseline", oneAtTop ? "middle" : "hanging");
      rotate_ylab = rotate_ylab != null ? rotate_ylab : ylab.length > 1;
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", rotate_ylab ? "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")" : "");
      yaxis.selectAll("empty").data(data.chrnames).enter().append("text").attr("y", function(d, i) {
        return margin.top + (yChrBorder[i] + yChrBorder[i + 1]) / 2;
      }).attr("x", margin.left - axispos.ylabel).text(function(d) {
        return d;
      });
      celltip = d3.tip().attr('class', 'd3-tip').html(function(d) {
        return data.labels[d.i] + ", " + data.labels[d.j] + " &rarr; " + (formatAxis(data.allz)(d.z));
      }).direction('e').offset([0, 10]);
      svg.call(celltip);
      cells = g.append("g").attr("id", "cells");
      cellSelect = cells.selectAll("empty").data(data.cells).enter().append("rect").attr("x", function(d) {
        return d.x;
      }).attr("y", function(d) {
        return d.y;
      }).attr("width", pixelPerCell).attr("height", pixelPerCell).attr("class", function(d, i) {
        return "cell" + i;
      }).attr("fill", function(d) {
        if (d.z != null) {
          return zscale(d.z);
        } else {
          return nullcolor;
        }
      }).attr("stroke", "none").attr("stroke-width", "1").on("mouseover.paneltip", function(d) {
        d3.select(this).attr("stroke", "black");
        if (hover) {
          return celltip.show(d);
        }
      }).on("mouseout.paneltip", function() {
        d3.select(this).attr("stroke", "none");
        if (hover) {
          return celltip.hide();
        }
      });
      return g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
    });
  };
  chart.pixelPerCell = function(value) {
    if (!arguments.length) {
      return pixelPerCell;
    }
    pixelPerCell = value;
    return chart;
  };
  chart.chrGap = function(value) {
    if (!arguments.length) {
      return chrGap;
    }
    chrGap = value;
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
  chart.rectcolor = function(value) {
    if (!arguments.length) {
      return rectcolor;
    }
    rectcolor = value;
    return chart;
  };
  chart.nullcolor = function(value) {
    if (!arguments.length) {
      return nullcolor;
    }
    nullcolor = value;
    return chart;
  };
  chart.bordercolor = function(value) {
    if (!arguments.length) {
      return bordercolor;
    }
    bordercolor = value;
    return chart;
  };
  chart.colors = function(value) {
    if (!arguments.length) {
      return colors;
    }
    colors = value;
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
  chart.zthresh = function(value) {
    if (!arguments.length) {
      return zthresh;
    }
    zthresh = value;
    return chart;
  };
  chart.zlim = function(value) {
    if (!arguments.length) {
      return zlim;
    }
    zlim = value;
    return chart;
  };
  chart.oneAtTop = function(value) {
    if (!arguments.length) {
      return oneAtTop;
    }
    oneAtTop = value;
    return chart;
  };
  chart.hover = function(value) {
    if (!arguments.length) {
      return hover;
    }
    hover = value;
    return chart;
  };
  chart.zscale = function() {
    return zscale;
  };
  chart.cellSelect = function() {
    return cellSelect;
  };
  return chart;
};
