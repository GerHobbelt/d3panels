// Generated by CoffeeScript 1.12.5
(function() {
  var g, group, i, j, k, l, labels, len, len1, len2, len3, m, mychart1, mychart2, n, o, p, pts, q, r, ref, ref1, ref2, ref3, x, xv;

  pts = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0.25, 0.5, 0.25], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5], [1 / 3, 1 / 3, 1 / 3]];

  group = [1, 1, 1, 2, 3, 3, 3, 4];

  labels = (function() {
    var k, len, results;
    results = [];
    for (k = 0, len = pts.length; k < len; k++) {
      p = pts[k];
      results.push("(" + p[0] + "," + p[1] + "," + p[2] + ")");
    }
    return results;
  })();

  labels[labels.length - 1] = "(1/3,1/3,1/3)";

  mychart1 = d3panels.trichart();

  mychart1(d3.select("div#chart1"), {
    p: pts,
    group: group,
    indID: labels
  });

  n = 100;

  m = 300;

  p = [];

  g = [];

  ref = d3.range(n);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    x = [0, 0, 0];
    ref1 = d3.range(m);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      r = Math.random();
      if (r < 0.25) {
        x[0] += 1;
      }
      if (r >= 0.25 && r < 0.75) {
        x[1] += 1;
      }
      if (r >= 0.75) {
        x[2] += 1;
      }
    }
    x = (function() {
      var len2, o, results;
      results = [];
      for (o = 0, len2 = x.length; o < len2; o++) {
        xv = x[o];
        results.push(xv / m);
      }
      return results;
    })();
    p.push(x);
    g.push(1);
  }

  ref2 = d3.range(n);
  for (o = 0, len2 = ref2.length; o < len2; o++) {
    i = ref2[o];
    x = [0, 0, 0];
    ref3 = d3.range(m);
    for (q = 0, len3 = ref3.length; q < len3; q++) {
      j = ref3[q];
      r = Math.random();
      if (r < 1 / 3) {
        x[0] += 1;
      }
      if (r >= 1 / 3 && r < 2 / 3) {
        x[1] += 1;
      }
      if (r >= 2 / 3) {
        x[2] += 1;
      }
    }
    x = (function() {
      var len4, results, s;
      results = [];
      for (s = 0, len4 = x.length; s < len4; s++) {
        xv = x[s];
        results.push(xv / m);
      }
      return results;
    })();
    p.push(x);
    g.push(2);
  }

  mychart2 = d3panels.trichart();

  mychart2(d3.select("div#chart2"), {
    p: p,
    group: g
  });

}).call(this);
