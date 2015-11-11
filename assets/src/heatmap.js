// Generated by CoffeeScript 1.10.0
var heatmap;

heatmap = function() {
  var axispos, cellSelect, celltip, chart, colors, dataByCell, height, margin, nullcolor, nxticks, nyticks, rectcolor, rotate_ylab, svg, tipclass, title, titlepos, width, xlab, xlim, xscale, xticks, ylab, ylim, yscale, yticks, zlim, zscale, zthresh;
  width = 400;
  height = 500;
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
  xlim = null;
  nxticks = 5;
  xticks = null;
  ylim = null;
  nyticks = 5;
  yticks = null;
  rectcolor = "#e6e6e6";
  nullcolor = "#e6e6e6";
  colors = ["slateblue", "white", "crimson"];
  title = "";
  xlab = "X";
  ylab = "Y";
  rotate_ylab = null;
  zlim = null;
  zthresh = null;
  xscale = d3.scale.linear();
  yscale = d3.scale.linear();
  zscale = d3.scale.linear();
  cellSelect = null;
  dataByCell = false;
  svg = null;
  celltip = null;
  tipclass = "";
  chart = function(selection) {
    return selection.each(function(data) {
      var cell, cells, g, gEnter, i, j, k, len, nx, ny, ref, titlegrp, xLR, xaxis, xrange, yLR, yaxis, yrange, zmax, zmin;
      if (dataByCell) {
        data.x = (function() {
          var k, len, ref, results;
          ref = data.cells;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            cell = ref[k];
            results.push(cell.x);
          }
          return results;
        })();
        data.y = (function() {
          var k, len, ref, results;
          ref = data.cells;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            cell = ref[k];
            results.push(cell.y);
          }
          return results;
        })();
        data.allz = (function() {
          var k, len, ref, results;
          ref = data.cells;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            cell = ref[k];
            results.push(cell.z);
          }
          return results;
        })();
      } else {
        nx = data.x.length;
        ny = data.y.length;
        if (nx !== data.z.length) {
          displayError("data.x.length (" + data.x.length + ") != data.z.length (" + data.z.length + ")");
        }
        if (ny !== data.z[0].length) {
          displayError("data.y.length (" + data.y.length + ") != data.z[0].length (" + data.z[0].length + ")");
        }
        data.cells = [];
        for (i in data.z) {
          for (j in data.z[i]) {
            data.cells.push({
              x: data.x[i],
              y: data.y[j],
              z: data.z[i][j],
              i: i,
              j: j
            });
          }
        }
        data.allz = (function() {
          var k, len, ref, results;
          ref = data.cells;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            cell = ref[k];
            results.push(cell.z);
          }
          return results;
        })();
      }
      data.x.sort(function(a, b) {
        return a - b;
      });
      data.y.sort(function(a, b) {
        return a - b;
      });
      xLR = getLeftRight(data.x);
      yLR = getLeftRight(data.y);
      xlim = xlim != null ? xlim : xLR.extent;
      ylim = ylim != null ? ylim : yLR.extent;
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
        var k, len, ref, results;
        ref = data.cells;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          cell = ref[k];
          if (cell.z >= zthresh || cell.z <= -zthresh) {
            results.push(cell);
          }
        }
        return results;
      })();
      ref = data.cells;
      for (k = 0, len = ref.length; k < len; k++) {
        cell = ref[k];
        cell.recLeft = (xLR[cell.x].left + cell.x) / 2;
        cell.recRight = (xLR[cell.x].right + cell.x) / 2;
        cell.recTop = (yLR[cell.y].right + cell.y) / 2;
        cell.recBottom = (yLR[cell.y].left + cell.y) / 2;
      }
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").attr("class", "d3panels").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", rectcolor).attr("stroke", "none");
      xrange = [margin.left, margin.left + width];
      xscale.domain(xlim).range(xrange);
      yrange = [margin.top + height, margin.top];
      yscale.domain(ylim).range(yrange);
      xticks = xticks != null ? xticks : xscale.ticks(nxticks);
      yticks = yticks != null ? yticks : yscale.ticks(nyticks);
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(xticks).enter().append("line").attr("x1", function(d) {
        return xscale(d);
      }).attr("x2", function(d) {
        return xscale(d);
      }).attr("y1", margin.top).attr("y2", margin.top + height).attr("class", "y axis grid");
      xaxis.selectAll("empty").data(xticks).enter().append("text").attr("x", function(d) {
        return xscale(d);
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d) {
        return formatAxis(xticks)(d);
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
      celltip = d3.tip().attr('class', "d3-tip " + tipclass).html(function(d) {
        var x, y, z;
        x = formatAxis(data.x)(d.x);
        y = formatAxis(data.y)(d.y);
        z = formatAxis(data.allz)(d.z);
        return "(" + x + ", " + y + ") &rarr; " + z;
      }).direction('e').offset([0, 10]);
      svg.call(celltip);
      cells = g.append("g").attr("id", "cells");
      cellSelect = cells.selectAll("empty").data(data.cells).enter().append("rect").attr("x", function(d) {
        return xscale(d.recLeft);
      }).attr("y", function(d) {
        return yscale(d.recTop);
      }).attr("width", function(d) {
        return xscale(d.recRight) - xscale(d.recLeft);
      }).attr("height", function(d) {
        return yscale(d.recBottom) - yscale(d.recTop);
      }).attr("class", function(d, i) {
        return "cell" + i;
      }).attr("fill", function(d) {
        if (d.z != null) {
          return zscale(d.z);
        } else {
          return nullcolor;
        }
      }).attr("stroke", "none").attr("stroke-width", "1").on("mouseover.paneltip", function(d) {
        d3.select(this).attr("stroke", "black");
        return celltip.show(d);
      }).on("mouseout.paneltip", function() {
        d3.select(this).attr("stroke", "none");
        return celltip.hide();
      });
      return g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
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
  chart.xlim = function(value) {
    if (!arguments.length) {
      return xlim;
    }
    xlim = value;
    return chart;
  };
  chart.nxticks = function(value) {
    if (!arguments.length) {
      return nxticks;
    }
    nxticks = value;
    return chart;
  };
  chart.xticks = function(value) {
    if (!arguments.length) {
      return xticks;
    }
    xticks = value;
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
  chart.nullcolor = function(value) {
    if (!arguments.length) {
      return nullcolor;
    }
    nullcolor = value;
    return chart;
  };
  chart.colors = function(value) {
    if (!arguments.length) {
      return colors;
    }
    colors = value;
    return chart;
  };
  chart.dataByCell = function(value) {
    if (!arguments.length) {
      return dataByCell;
    }
    dataByCell = value;
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
  chart.tipclass = function(value) {
    if (!arguments.length) {
      return tipclass;
    }
    tipclass = value;
    return chart;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.zscale = function() {
    return zscale;
  };
  chart.cellSelect = function() {
    return cellSelect;
  };
  chart.remove = function() {
    svg.remove();
    celltip.destroy();
    return null;
  };
  return chart;
};
