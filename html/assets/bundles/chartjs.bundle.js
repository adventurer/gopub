! function (a, b) {
    "function" == typeof define && define.amd ? define("Chartist", [], function () {
        return a.Chartist = b()
    }) : "object" == typeof module && module.exports ? module.exports = b() : a.Chartist = b()
}(this, function () {
    var a = {
        version: "0.11.0"
    };
    return function (a, b, c) {
            "use strict";
            c.namespaces = {
                svg: "http://www.w3.org/2000/svg",
                xmlns: "http://www.w3.org/2000/xmlns/",
                xhtml: "http://www.w3.org/1999/xhtml",
                xlink: "http://www.w3.org/1999/xlink",
                ct: "http://gionkunz.github.com/chartist-js/ct"
            }, c.noop = function (a) {
                return a
            }, c.alphaNumerate = function (a) {
                return String.fromCharCode(97 + a % 26)
            }, c.extend = function (a) {
                var b, d, e;
                for (a = a || {}, b = 1; b < arguments.length; b++) {
                    d = arguments[b];
                    for (var f in d) e = d[f], "object" != typeof e || null === e || e instanceof Array ? a[f] = e : a[f] = c.extend(a[f], e)
                }
                return a
            }, c.replaceAll = function (a, b, c) {
                return a.replace(new RegExp(b, "g"), c)
            }, c.ensureUnit = function (a, b) {
                return "number" == typeof a && (a += b), a
            }, c.quantity = function (a) {
                if ("string" == typeof a) {
                    var b = /^(\d+)\s*(.*)$/g.exec(a);
                    return {
                        value: +b[1],
                        unit: b[2] || void 0
                    }
                }
                return {
                    value: a
                }
            }, c.querySelector = function (a) {
                return a instanceof Node ? a : b.querySelector(a)
            }, c.times = function (a) {
                return Array.apply(null, new Array(a))
            }, c.sum = function (a, b) {
                return a + (b || 0)
            }, c.mapMultiply = function (a) {
                return function (b) {
                    return b * a
                }
            }, c.mapAdd = function (a) {
                return function (b) {
                    return b + a
                }
            }, c.serialMap = function (a, b) {
                var d = [],
                    e = Math.max.apply(null, a.map(function (a) {
                        return a.length
                    }));
                return c.times(e).forEach(function (c, e) {
                    var f = a.map(function (a) {
                        return a[e]
                    });
                    d[e] = b.apply(null, f)
                }), d
            }, c.roundWithPrecision = function (a, b) {
                var d = Math.pow(10, b || c.precision);
                return Math.round(a * d) / d
            }, c.precision = 8, c.escapingMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }, c.serialize = function (a) {
                return null === a || void 0 === a ? a : ("number" == typeof a ? a = "" + a : "object" == typeof a && (a = JSON.stringify({
                    data: a
                })), Object.keys(c.escapingMap).reduce(function (a, b) {
                    return c.replaceAll(a, b, c.escapingMap[b])
                }, a))
            }, c.deserialize = function (a) {
                if ("string" != typeof a) return a;
                a = Object.keys(c.escapingMap).reduce(function (a, b) {
                    return c.replaceAll(a, c.escapingMap[b], b)
                }, a);
                try {
                    a = JSON.parse(a), a = void 0 !== a.data ? a.data : a
                } catch (a) {}
                return a
            }, c.createSvg = function (a, b, d, e) {
                var f;
                return b = b || "100%", d = d || "100%", Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function (a) {
                    return a.getAttributeNS(c.namespaces.xmlns, "ct")
                }).forEach(function (b) {
                    a.removeChild(b)
                }), f = new c.Svg("svg").attr({
                    width: b,
                    height: d
                }).addClass(e), f._node.style.width = b, f._node.style.height = d, a.appendChild(f._node), f
            }, c.normalizeData = function (a, b, d) {
                var e, f = {
                    raw: a,
                    normalized: {}
                };
                return f.normalized.series = c.getDataArray({
                    series: a.series || []
                }, b, d), e = f.normalized.series.every(function (a) {
                    return a instanceof Array
                }) ? Math.max.apply(null, f.normalized.series.map(function (a) {
                    return a.length
                })) : f.normalized.series.length, f.normalized.labels = (a.labels || []).slice(), Array.prototype.push.apply(f.normalized.labels, c.times(Math.max(0, e - f.normalized.labels.length)).map(function () {
                    return ""
                })), b && c.reverseData(f.normalized), f
            }, c.safeHasProperty = function (a, b) {
                return null !== a && "object" == typeof a && a.hasOwnProperty(b)
            }, c.isDataHoleValue = function (a) {
                return null === a || void 0 === a || "number" == typeof a && isNaN(a)
            }, c.reverseData = function (a) {
                a.labels.reverse(), a.series.reverse();
                for (var b = 0; b < a.series.length; b++) "object" == typeof a.series[b] && void 0 !== a.series[b].data ? a.series[b].data.reverse() : a.series[b] instanceof Array && a.series[b].reverse()
            }, c.getDataArray = function (a, b, d) {
                function e(a) {
                    if (c.safeHasProperty(a, "value")) return e(a.value);
                    if (c.safeHasProperty(a, "data")) return e(a.data);
                    if (a instanceof Array) return a.map(e);
                    if (!c.isDataHoleValue(a)) {
                        if (d) {
                            var b = {};
                            return "string" == typeof d ? b[d] = c.getNumberOrUndefined(a) : b.y = c.getNumberOrUndefined(a), b.x = a.hasOwnProperty("x") ? c.getNumberOrUndefined(a.x) : b.x, b.y = a.hasOwnProperty("y") ? c.getNumberOrUndefined(a.y) : b.y, b
                        }
                        return c.getNumberOrUndefined(a)
                    }
                }
                return a.series.map(e)
            }, c.normalizePadding = function (a, b) {
                return b = b || 0, "number" == typeof a ? {
                    top: a,
                    right: a,
                    bottom: a,
                    left: a
                } : {
                    top: "number" == typeof a.top ? a.top : b,
                    right: "number" == typeof a.right ? a.right : b,
                    bottom: "number" == typeof a.bottom ? a.bottom : b,
                    left: "number" == typeof a.left ? a.left : b
                }
            }, c.getMetaData = function (a, b) {
                var c = a.data ? a.data[b] : a[b];
                return c ? c.meta : void 0
            }, c.orderOfMagnitude = function (a) {
                return Math.floor(Math.log(Math.abs(a)) / Math.LN10)
            }, c.projectLength = function (a, b, c) {
                return b / c.range * a
            }, c.getAvailableHeight = function (a, b) {
                return Math.max((c.quantity(b.height).value || a.height()) - (b.chartPadding.top + b.chartPadding.bottom) - b.axisX.offset, 0)
            }, c.getHighLow = function (a, b, d) {
                function e(a) {
                    if (void 0 !== a)
                        if (a instanceof Array)
                            for (var b = 0; b < a.length; b++) e(a[b]);
                        else {
                            var c = d ? +a[d] : +a;
                            g && c > f.high && (f.high = c), h && c < f.low && (f.low = c)
                        }
                }
                b = c.extend({}, b, d ? b["axis" + d.toUpperCase()] : {});
                var f = {
                        high: void 0 === b.high ? -Number.MAX_VALUE : +b.high,
                        low: void 0 === b.low ? Number.MAX_VALUE : +b.low
                    },
                    g = void 0 === b.high,
                    h = void 0 === b.low;
                return (g || h) && e(a), (b.referenceValue || 0 === b.referenceValue) && (f.high = Math.max(b.referenceValue, f.high), f.low = Math.min(b.referenceValue, f.low)), f.high <= f.low && (0 === f.low ? f.high = 1 : f.low < 0 ? f.high = 0 : f.high > 0 ? f.low = 0 : (f.high = 1, f.low = 0)), f
            }, c.isNumeric = function (a) {
                return null !== a && isFinite(a)
            }, c.isFalseyButZero = function (a) {
                return !a && 0 !== a
            }, c.getNumberOrUndefined = function (a) {
                return c.isNumeric(a) ? +a : void 0
            }, c.isMultiValue = function (a) {
                return "object" == typeof a && ("x" in a || "y" in a)
            }, c.getMultiValue = function (a, b) {
                return c.isMultiValue(a) ? c.getNumberOrUndefined(a[b || "y"]) : c.getNumberOrUndefined(a)
            }, c.rho = function (a) {
                function b(a, c) {
                    return a % c == 0 ? c : b(c, a % c)
                }

                function c(a) {
                    return a * a + 1
                }
                if (1 === a) return a;
                var d, e = 2,
                    f = 2;
                if (a % 2 == 0) return 2;
                do {
                    e = c(e) % a, f = c(c(f)) % a, d = b(Math.abs(e - f), a)
                } while (1 === d);
                return d
            }, c.getBounds = function (a, b, d, e) {
                function f(a, b) {
                    return a === (a += b) && (a *= 1 + (b > 0 ? o : -o)), a
                }
                var g, h, i, j = 0,
                    k = {
                        high: b.high,
                        low: b.low
                    };
                k.valueRange = k.high - k.low, k.oom = c.orderOfMagnitude(k.valueRange), k.step = Math.pow(10, k.oom), k.min = Math.floor(k.low / k.step) * k.step, k.max = Math.ceil(k.high / k.step) * k.step, k.range = k.max - k.min, k.numberOfSteps = Math.round(k.range / k.step);
                var l = c.projectLength(a, k.step, k),
                    m = l < d,
                    n = e ? c.rho(k.range) : 0;
                if (e && c.projectLength(a, 1, k) >= d) k.step = 1;
                else if (e && n < k.step && c.projectLength(a, n, k) >= d) k.step = n;
                else
                    for (;;) {
                        if (m && c.projectLength(a, k.step, k) <= d) k.step *= 2;
                        else {
                            if (m || !(c.projectLength(a, k.step / 2, k) >= d)) break;
                            if (k.step /= 2, e && k.step % 1 != 0) {
                                k.step *= 2;
                                break
                            }
                        }
                        if (j++ > 1e3) throw new Error("Exceeded maximum number of iterations while optimizing scale step!")
                    }
                var o = 2.221e-16;
                for (k.step = Math.max(k.step, o), h = k.min, i = k.max; h + k.step <= k.low;) h = f(h, k.step);
                for (; i - k.step >= k.high;) i = f(i, -k.step);
                k.min = h, k.max = i, k.range = k.max - k.min;
                var p = [];
                for (g = k.min; g <= k.max; g = f(g, k.step)) {
                    var q = c.roundWithPrecision(g);
                    q !== p[p.length - 1] && p.push(q)
                }
                return k.values = p, k
            }, c.polarToCartesian = function (a, b, c, d) {
                var e = (d - 90) * Math.PI / 180;
                return {
                    x: a + c * Math.cos(e),
                    y: b + c * Math.sin(e)
                }
            }, c.createChartRect = function (a, b, d) {
                var e = !(!b.axisX && !b.axisY),
                    f = e ? b.axisY.offset : 0,
                    g = e ? b.axisX.offset : 0,
                    h = a.width() || c.quantity(b.width).value || 0,
                    i = a.height() || c.quantity(b.height).value || 0,
                    j = c.normalizePadding(b.chartPadding, d);
                h = Math.max(h, f + j.left + j.right), i = Math.max(i, g + j.top + j.bottom);
                var k = {
                    padding: j,
                    width: function () {
                        return this.x2 - this.x1
                    },
                    height: function () {
                        return this.y1 - this.y2
                    }
                };
                return e ? ("start" === b.axisX.position ? (k.y2 = j.top + g, k.y1 = Math.max(i - j.bottom, k.y2 + 1)) : (k.y2 = j.top, k.y1 = Math.max(i - j.bottom - g, k.y2 + 1)), "start" === b.axisY.position ? (k.x1 = j.left + f, k.x2 = Math.max(h - j.right, k.x1 + 1)) : (k.x1 = j.left, k.x2 = Math.max(h - j.right - f, k.x1 + 1))) : (k.x1 = j.left, k.x2 = Math.max(h - j.right, k.x1 + 1), k.y2 = j.top, k.y1 = Math.max(i - j.bottom, k.y2 + 1)), k
            }, c.createGrid = function (a, b, d, e, f, g, h, i) {
                var j = {};
                j[d.units.pos + "1"] = a, j[d.units.pos + "2"] = a, j[d.counterUnits.pos + "1"] = e, j[d.counterUnits.pos + "2"] = e + f;
                var k = g.elem("line", j, h.join(" "));
                i.emit("draw", c.extend({
                    type: "grid",
                    axis: d,
                    index: b,
                    group: g,
                    element: k
                }, j))
            }, c.createGridBackground = function (a, b, c, d) {
                var e = a.elem("rect", {
                    x: b.x1,
                    y: b.y2,
                    width: b.width(),
                    height: b.height()
                }, c, !0);
                d.emit("draw", {
                    type: "gridBackground",
                    group: a,
                    element: e
                })
            }, c.createLabel = function (a, d, e, f, g, h, i, j, k, l, m) {
                var n, o = {};
                if (o[g.units.pos] = a + i[g.units.pos], o[g.counterUnits.pos] = i[g.counterUnits.pos], o[g.units.len] = d, o[g.counterUnits.len] = Math.max(0, h - 10), l) {
                    var p = b.createElement("span");
                    p.className = k.join(" "), p.setAttribute("xmlns", c.namespaces.xhtml), p.innerText = f[e], p.style[g.units.len] = Math.round(o[g.units.len]) + "px", p.style[g.counterUnits.len] = Math.round(o[g.counterUnits.len]) + "px", n = j.foreignObject(p, c.extend({
                        style: "overflow: visible;"
                    }, o))
                } else n = j.elem("text", o, k.join(" ")).text(f[e]);
                m.emit("draw", c.extend({
                    type: "label",
                    axis: g,
                    index: e,
                    group: j,
                    element: n,
                    text: f[e]
                }, o))
            }, c.getSeriesOption = function (a, b, c) {
                if (a.name && b.series && b.series[a.name]) {
                    var d = b.series[a.name];
                    return d.hasOwnProperty(c) ? d[c] : b[c]
                }
                return b[c]
            }, c.optionsProvider = function (b, d, e) {
                function f(b) {
                    var f = h;
                    if (h = c.extend({}, j), d)
                        for (i = 0; i < d.length; i++) {
                            var g = a.matchMedia(d[i][0]);
                            g.matches && (h = c.extend(h, d[i][1]))
                        }
                    e && b && e.emit("optionsChanged", {
                        previousOptions: f,
                        currentOptions: h
                    })
                }

                function g() {
                    k.forEach(function (a) {
                        a.removeListener(f)
                    })
                }
                var h, i, j = c.extend({}, b),
                    k = [];
                if (!a.matchMedia) throw "window.matchMedia not found! Make sure you're using a polyfill.";
                if (d)
                    for (i = 0; i < d.length; i++) {
                        var l = a.matchMedia(d[i][0]);
                        l.addListener(f), k.push(l)
                    }
                return f(), {
                    removeMediaQueryListeners: g,
                    getCurrentOptions: function () {
                        return c.extend({}, h)
                    }
                }
            }, c.splitIntoSegments = function (a, b, d) {
                var e = {
                    increasingX: !1,
                    fillHoles: !1
                };
                d = c.extend({}, e, d);
                for (var f = [], g = !0, h = 0; h < a.length; h += 2) void 0 === c.getMultiValue(b[h / 2].value) ? d.fillHoles || (g = !0) : (d.increasingX && h >= 2 && a[h] <= a[h - 2] && (g = !0), g && (f.push({
                    pathCoordinates: [],
                    valueData: []
                }), g = !1), f[f.length - 1].pathCoordinates.push(a[h], a[h + 1]), f[f.length - 1].valueData.push(b[h / 2]));
                return f
            }
        }(window, document, a),
        function (a, b, c) {
            "use strict";
            c.Interpolation = {}, c.Interpolation.none = function (a) {
                var b = {
                    fillHoles: !1
                };
                return a = c.extend({}, b, a),
                    function (b, d) {
                        for (var e = new c.Svg.Path, f = !0, g = 0; g < b.length; g += 2) {
                            var h = b[g],
                                i = b[g + 1],
                                j = d[g / 2];
                            void 0 !== c.getMultiValue(j.value) ? (f ? e.move(h, i, !1, j) : e.line(h, i, !1, j), f = !1) : a.fillHoles || (f = !0)
                        }
                        return e
                    }
            }, c.Interpolation.simple = function (a) {
                var b = {
                    divisor: 2,
                    fillHoles: !1
                };
                a = c.extend({}, b, a);
                var d = 1 / Math.max(1, a.divisor);
                return function (b, e) {
                    for (var f, g, h, i = new c.Svg.Path, j = 0; j < b.length; j += 2) {
                        var k = b[j],
                            l = b[j + 1],
                            m = (k - f) * d,
                            n = e[j / 2];
                        void 0 !== n.value ? (void 0 === h ? i.move(k, l, !1, n) : i.curve(f + m, g, k - m, l, k, l, !1, n), f = k, g = l, h = n) : a.fillHoles || (f = k = h = void 0)
                    }
                    return i
                }
            }, c.Interpolation.cardinal = function (a) {
                var b = {
                    tension: 1,
                    fillHoles: !1
                };
                a = c.extend({}, b, a);
                var d = Math.min(1, Math.max(0, a.tension)),
                    e = 1 - d;
                return function b(f, g) {
                    var h = c.splitIntoSegments(f, g, {
                        fillHoles: a.fillHoles
                    });
                    if (h.length) {
                        if (h.length > 1) {
                            var i = [];
                            return h.forEach(function (a) {
                                i.push(b(a.pathCoordinates, a.valueData))
                            }), c.Svg.Path.join(i)
                        }
                        if (f = h[0].pathCoordinates, g = h[0].valueData, f.length <= 4) return c.Interpolation.none()(f, g);
                        for (var j = (new c.Svg.Path).move(f[0], f[1], !1, g[0]), k = 0, l = f.length; l - 2 > k; k += 2) {
                            var m = [{
                                x: +f[k - 2],
                                y: +f[k - 1]
                            }, {
                                x: +f[k],
                                y: +f[k + 1]
                            }, {
                                x: +f[k + 2],
                                y: +f[k + 3]
                            }, {
                                x: +f[k + 4],
                                y: +f[k + 5]
                            }];
                            l - 4 === k ? m[3] = m[2] : k || (m[0] = {
                                x: +f[k],
                                y: +f[k + 1]
                            }), j.curve(d * (-m[0].x + 6 * m[1].x + m[2].x) / 6 + e * m[2].x, d * (-m[0].y + 6 * m[1].y + m[2].y) / 6 + e * m[2].y, d * (m[1].x + 6 * m[2].x - m[3].x) / 6 + e * m[2].x, d * (m[1].y + 6 * m[2].y - m[3].y) / 6 + e * m[2].y, m[2].x, m[2].y, !1, g[(k + 2) / 2])
                        }
                        return j
                    }
                    return c.Interpolation.none()([])
                }
            }, c.Interpolation.monotoneCubic = function (a) {
                var b = {
                    fillHoles: !1
                };
                return a = c.extend({}, b, a),
                    function b(d, e) {
                        var f = c.splitIntoSegments(d, e, {
                            fillHoles: a.fillHoles,
                            increasingX: !0
                        });
                        if (f.length) {
                            if (f.length > 1) {
                                var g = [];
                                return f.forEach(function (a) {
                                    g.push(b(a.pathCoordinates, a.valueData))
                                }), c.Svg.Path.join(g)
                            }
                            if (d = f[0].pathCoordinates, e = f[0].valueData, d.length <= 4) return c.Interpolation.none()(d, e);
                            var h, i, j = [],
                                k = [],
                                l = d.length / 2,
                                m = [],
                                n = [],
                                o = [],
                                p = [];
                            for (h = 0; h < l; h++) j[h] = d[2 * h], k[h] = d[2 * h + 1];
                            for (h = 0; h < l - 1; h++) o[h] = k[h + 1] - k[h], p[h] = j[h + 1] - j[h], n[h] = o[h] / p[h];
                            for (m[0] = n[0], m[l - 1] = n[l - 2], h = 1; h < l - 1; h++) 0 === n[h] || 0 === n[h - 1] || n[h - 1] > 0 != n[h] > 0 ? m[h] = 0 : (m[h] = 3 * (p[h - 1] + p[h]) / ((2 * p[h] + p[h - 1]) / n[h - 1] + (p[h] + 2 * p[h - 1]) / n[h]), isFinite(m[h]) || (m[h] = 0));
                            for (i = (new c.Svg.Path).move(j[0], k[0], !1, e[0]), h = 0; h < l - 1; h++) i.curve(j[h] + p[h] / 3, k[h] + m[h] * p[h] / 3, j[h + 1] - p[h] / 3, k[h + 1] - m[h + 1] * p[h] / 3, j[h + 1], k[h + 1], !1, e[h + 1]);
                            return i
                        }
                        return c.Interpolation.none()([])
                    }
            }, c.Interpolation.step = function (a) {
                var b = {
                    postpone: !0,
                    fillHoles: !1
                };
                return a = c.extend({}, b, a),
                    function (b, d) {
                        for (var e, f, g, h = new c.Svg.Path, i = 0; i < b.length; i += 2) {
                            var j = b[i],
                                k = b[i + 1],
                                l = d[i / 2];
                            void 0 !== l.value ? (void 0 === g ? h.move(j, k, !1, l) : (a.postpone ? h.line(j, f, !1, g) : h.line(e, k, !1, l), h.line(j, k, !1, l)), e = j, f = k, g = l) : a.fillHoles || (e = f = g = void 0)
                        }
                        return h
                    }
            }
        }(window, document, a),
        function (a, b, c) {
            "use strict";
            c.EventEmitter = function () {
                function a(a, b) {
                    d[a] = d[a] || [], d[a].push(b)
                }

                function b(a, b) {
                    d[a] && (b ? (d[a].splice(d[a].indexOf(b), 1), 0 === d[a].length && delete d[a]) : delete d[a])
                }

                function c(a, b) {
                    d[a] && d[a].forEach(function (a) {
                        a(b)
                    }), d["*"] && d["*"].forEach(function (c) {
                        c(a, b)
                    })
                }
                var d = [];
                return {
                    addEventHandler: a,
                    removeEventHandler: b,
                    emit: c
                }
            }
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a) {
                var b = [];
                if (a.length)
                    for (var c = 0; c < a.length; c++) b.push(a[c]);
                return b
            }

            function e(a, b) {
                var d = b || this.prototype || c.Class,
                    e = Object.create(d);
                c.Class.cloneDefinitions(e, a);
                var f = function () {
                    var a, b = e.constructor || function () {};
                    return a = this === c ? Object.create(e) : this, b.apply(a, Array.prototype.slice.call(arguments, 0)), a
                };
                return f.prototype = e, f.super = d, f.extend = this.extend, f
            }

            function f() {
                var a = d(arguments),
                    b = a[0];
                return a.splice(1, a.length - 1).forEach(function (a) {
                    Object.getOwnPropertyNames(a).forEach(function (c) {
                        delete b[c], Object.defineProperty(b, c, Object.getOwnPropertyDescriptor(a, c))
                    })
                }), b
            }
            c.Class = {
                extend: e,
                cloneDefinitions: f
            }
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, b, d) {
                return a && (this.data = a || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.eventEmitter.emit("data", {
                    type: "update",
                    data: this.data
                })), b && (this.options = c.extend({}, d ? this.options : this.defaultOptions, b), this.initializeTimeoutId || (this.optionsProvider.removeMediaQueryListeners(), this.optionsProvider = c.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter))), this.initializeTimeoutId || this.createChart(this.optionsProvider.getCurrentOptions()), this
            }

            function e() {
                return this.initializeTimeoutId ? a.clearTimeout(this.initializeTimeoutId) : (a.removeEventListener("resize", this.resizeListener), this.optionsProvider.removeMediaQueryListeners()), this
            }

            function f(a, b) {
                return this.eventEmitter.addEventHandler(a, b), this
            }

            function g(a, b) {
                return this.eventEmitter.removeEventHandler(a, b), this
            }

            function h() {
                a.addEventListener("resize", this.resizeListener), this.optionsProvider = c.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter), this.eventEmitter.addEventHandler("optionsChanged", function () {
                    this.update()
                }.bind(this)), this.options.plugins && this.options.plugins.forEach(function (a) {
                    a instanceof Array ? a[0](this, a[1]) : a(this)
                }.bind(this)), this.eventEmitter.emit("data", {
                    type: "initial",
                    data: this.data
                }), this.createChart(this.optionsProvider.getCurrentOptions()), this.initializeTimeoutId = void 0
            }

            function i(a, b, d, e, f) {
                this.container = c.querySelector(a), this.data = b || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.defaultOptions = d, this.options = e, this.responsiveOptions = f, this.eventEmitter = c.EventEmitter(), this.supportsForeignObject = c.Svg.isSupported("Extensibility"), this.supportsAnimations = c.Svg.isSupported("AnimationEventsAttribute"), this.resizeListener = function () {
                    this.update()
                }.bind(this), this.container && (this.container.__chartist__ && this.container.__chartist__.detach(), this.container.__chartist__ = this), this.initializeTimeoutId = setTimeout(h.bind(this), 0)
            }
            c.Base = c.Class.extend({
                constructor: i,
                optionsProvider: void 0,
                container: void 0,
                svg: void 0,
                eventEmitter: void 0,
                createChart: function () {
                    throw new Error("Base chart type can't be instantiated!")
                },
                update: d,
                detach: e,
                on: f,
                off: g,
                version: c.version,
                supportsForeignObject: !1
            })
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, d, e, f, g) {
                a instanceof Element ? this._node = a : (this._node = b.createElementNS(c.namespaces.svg, a), "svg" === a && this.attr({
                    "xmlns:ct": c.namespaces.ct
                })), d && this.attr(d), e && this.addClass(e), f && (g && f._node.firstChild ? f._node.insertBefore(this._node, f._node.firstChild) : f._node.appendChild(this._node))
            }

            function e(a, b) {
                return "string" == typeof a ? b ? this._node.getAttributeNS(b, a) : this._node.getAttribute(a) : (Object.keys(a).forEach(function (b) {
                    if (void 0 !== a[b])
                        if (-1 !== b.indexOf(":")) {
                            var d = b.split(":");
                            this._node.setAttributeNS(c.namespaces[d[0]], b, a[b])
                        } else this._node.setAttribute(b, a[b])
                }.bind(this)), this)
            }

            function f(a, b, d, e) {
                return new c.Svg(a, b, d, this, e)
            }

            function g() {
                return this._node.parentNode instanceof SVGElement ? new c.Svg(this._node.parentNode) : null
            }

            function h() {
                for (var a = this._node;
                    "svg" !== a.nodeName;) a = a.parentNode;
                return new c.Svg(a)
            }

            function i(a) {
                var b = this._node.querySelector(a);
                return b ? new c.Svg(b) : null
            }

            function j(a) {
                var b = this._node.querySelectorAll(a);
                return b.length ? new c.Svg.List(b) : null
            }

            function k() {
                return this._node
            }

            function l(a, d, e, f) {
                if ("string" == typeof a) {
                    var g = b.createElement("div");
                    g.innerHTML = a, a = g.firstChild
                }
                a.setAttribute("xmlns", c.namespaces.xmlns);
                var h = this.elem("foreignObject", d, e, f);
                return h._node.appendChild(a), h
            }

            function m(a) {
                return this._node.appendChild(b.createTextNode(a)), this
            }

            function n() {
                for (; this._node.firstChild;) this._node.removeChild(this._node.firstChild);
                return this
            }

            function o() {
                return this._node.parentNode.removeChild(this._node), this.parent()
            }

            function p(a) {
                return this._node.parentNode.replaceChild(a._node, this._node), a
            }

            function q(a, b) {
                return b && this._node.firstChild ? this._node.insertBefore(a._node, this._node.firstChild) : this._node.appendChild(a._node), this
            }

            function r() {
                return this._node.getAttribute("class") ? this._node.getAttribute("class").trim().split(/\s+/) : []
            }

            function s(a) {
                return this._node.setAttribute("class", this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function (a, b, c) {
                    return c.indexOf(a) === b
                }).join(" ")), this
            }

            function t(a) {
                var b = a.trim().split(/\s+/);
                return this._node.setAttribute("class", this.classes(this._node).filter(function (a) {
                    return -1 === b.indexOf(a)
                }).join(" ")), this
            }

            function u() {
                return this._node.setAttribute("class", ""), this
            }

            function v() {
                return this._node.getBoundingClientRect().height
            }

            function w() {
                return this._node.getBoundingClientRect().width
            }

            function x(a, b, d) {
                return void 0 === b && (b = !0), Object.keys(a).forEach(function (e) {
                    function f(a, b) {
                        var f, g, h, i = {};
                        a.easing && (h = a.easing instanceof Array ? a.easing : c.Svg.Easing[a.easing], delete a.easing), a.begin = c.ensureUnit(a.begin, "ms"), a.dur = c.ensureUnit(a.dur, "ms"), h && (a.calcMode = "spline", a.keySplines = h.join(" "), a.keyTimes = "0;1"), b && (a.fill = "freeze", i[e] = a.from, this.attr(i), g = c.quantity(a.begin || 0).value, a.begin = "indefinite"), f = this.elem("animate", c.extend({
                            attributeName: e
                        }, a)), b && setTimeout(function () {
                            try {
                                f._node.beginElement()
                            } catch (b) {
                                i[e] = a.to, this.attr(i), f.remove()
                            }
                        }.bind(this), g), d && f._node.addEventListener("beginEvent", function () {
                            d.emit("animationBegin", {
                                element: this,
                                animate: f._node,
                                params: a
                            })
                        }.bind(this)), f._node.addEventListener("endEvent", function () {
                            d && d.emit("animationEnd", {
                                element: this,
                                animate: f._node,
                                params: a
                            }), b && (i[e] = a.to, this.attr(i), f.remove())
                        }.bind(this))
                    }
                    a[e] instanceof Array ? a[e].forEach(function (a) {
                        f.bind(this)(a, !1)
                    }.bind(this)) : f.bind(this)(a[e], b)
                }.bind(this)), this
            }

            function y(a) {
                var b = this;
                this.svgElements = [];
                for (var d = 0; d < a.length; d++) this.svgElements.push(new c.Svg(a[d]));
                Object.keys(c.Svg.prototype).filter(function (a) {
                    return -1 === ["constructor", "parent", "querySelector", "querySelectorAll", "replace", "append", "classes", "height", "width"].indexOf(a)
                }).forEach(function (a) {
                    b[a] = function () {
                        var d = Array.prototype.slice.call(arguments, 0);
                        return b.svgElements.forEach(function (b) {
                            c.Svg.prototype[a].apply(b, d)
                        }), b
                    }
                })
            }
            c.Svg = c.Class.extend({
                constructor: d,
                attr: e,
                elem: f,
                parent: g,
                root: h,
                querySelector: i,
                querySelectorAll: j,
                getNode: k,
                foreignObject: l,
                text: m,
                empty: n,
                remove: o,
                replace: p,
                append: q,
                classes: r,
                addClass: s,
                removeClass: t,
                removeAllClasses: u,
                height: v,
                width: w,
                animate: x
            }), c.Svg.isSupported = function (a) {
                return b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#" + a, "1.1")
            };
            var z = {
                easeInSine: [.47, 0, .745, .715],
                easeOutSine: [.39, .575, .565, 1],
                easeInOutSine: [.445, .05, .55, .95],
                easeInQuad: [.55, .085, .68, .53],
                easeOutQuad: [.25, .46, .45, .94],
                easeInOutQuad: [.455, .03, .515, .955],
                easeInCubic: [.55, .055, .675, .19],
                easeOutCubic: [.215, .61, .355, 1],
                easeInOutCubic: [.645, .045, .355, 1],
                easeInQuart: [.895, .03, .685, .22],
                easeOutQuart: [.165, .84, .44, 1],
                easeInOutQuart: [.77, 0, .175, 1],
                easeInQuint: [.755, .05, .855, .06],
                easeOutQuint: [.23, 1, .32, 1],
                easeInOutQuint: [.86, 0, .07, 1],
                easeInExpo: [.95, .05, .795, .035],
                easeOutExpo: [.19, 1, .22, 1],
                easeInOutExpo: [1, 0, 0, 1],
                easeInCirc: [.6, .04, .98, .335],
                easeOutCirc: [.075, .82, .165, 1],
                easeInOutCirc: [.785, .135, .15, .86],
                easeInBack: [.6, -.28, .735, .045],
                easeOutBack: [.175, .885, .32, 1.275],
                easeInOutBack: [.68, -.55, .265, 1.55]
            };
            c.Svg.Easing = z, c.Svg.List = c.Class.extend({
                constructor: y
            })
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, b, d, e, f, g) {
                var h = c.extend({
                    command: f ? a.toLowerCase() : a.toUpperCase()
                }, b, g ? {
                    data: g
                } : {});
                d.splice(e, 0, h)
            }

            function e(a, b) {
                a.forEach(function (c, d) {
                    u[c.command.toLowerCase()].forEach(function (e, f) {
                        b(c, e, d, f, a)
                    })
                })
            }

            function f(a, b) {
                this.pathElements = [], this.pos = 0, this.close = a, this.options = c.extend({}, v, b)
            }

            function g(a) {
                return void 0 !== a ? (this.pos = Math.max(0, Math.min(this.pathElements.length, a)), this) : this.pos
            }

            function h(a) {
                return this.pathElements.splice(this.pos, a), this
            }

            function i(a, b, c, e) {
                return d("M", {
                    x: +a,
                    y: +b
                }, this.pathElements, this.pos++, c, e), this
            }

            function j(a, b, c, e) {
                return d("L", {
                    x: +a,
                    y: +b
                }, this.pathElements, this.pos++, c, e), this
            }

            function k(a, b, c, e, f, g, h, i) {
                return d("C", {
                    x1: +a,
                    y1: +b,
                    x2: +c,
                    y2: +e,
                    x: +f,
                    y: +g
                }, this.pathElements, this.pos++, h, i), this
            }

            function l(a, b, c, e, f, g, h, i, j) {
                return d("A", {
                    rx: +a,
                    ry: +b,
                    xAr: +c,
                    lAf: +e,
                    sf: +f,
                    x: +g,
                    y: +h
                }, this.pathElements, this.pos++, i, j), this
            }

            function m(a) {
                var b = a.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce(function (a, b) {
                    return b.match(/[A-Za-z]/) && a.push([]), a[a.length - 1].push(b), a
                }, []);
                "Z" === b[b.length - 1][0].toUpperCase() && b.pop();
                var d = b.map(function (a) {
                        var b = a.shift(),
                            d = u[b.toLowerCase()];
                        return c.extend({
                            command: b
                        }, d.reduce(function (b, c, d) {
                            return b[c] = +a[d], b
                        }, {}))
                    }),
                    e = [this.pos, 0];
                return Array.prototype.push.apply(e, d), Array.prototype.splice.apply(this.pathElements, e), this.pos += d.length, this
            }

            function n() {
                var a = Math.pow(10, this.options.accuracy);
                return this.pathElements.reduce(function (b, c) {
                    var d = u[c.command.toLowerCase()].map(function (b) {
                        return this.options.accuracy ? Math.round(c[b] * a) / a : c[b]
                    }.bind(this));
                    return b + c.command + d.join(",")
                }.bind(this), "") + (this.close ? "Z" : "")
            }

            function o(a, b) {
                return e(this.pathElements, function (c, d) {
                    c[d] *= "x" === d[0] ? a : b
                }), this
            }

            function p(a, b) {
                return e(this.pathElements, function (c, d) {
                    c[d] += "x" === d[0] ? a : b
                }), this
            }

            function q(a) {
                return e(this.pathElements, function (b, c, d, e, f) {
                    var g = a(b, c, d, e, f);
                    (g || 0 === g) && (b[c] = g)
                }), this
            }

            function r(a) {
                var b = new c.Svg.Path(a || this.close);
                return b.pos = this.pos, b.pathElements = this.pathElements.slice().map(function (a) {
                    return c.extend({}, a)
                }), b.options = c.extend({}, this.options), b
            }

            function s(a) {
                var b = [new c.Svg.Path];
                return this.pathElements.forEach(function (d) {
                    d.command === a.toUpperCase() && 0 !== b[b.length - 1].pathElements.length && b.push(new c.Svg.Path), b[b.length - 1].pathElements.push(d)
                }), b
            }

            function t(a, b, d) {
                for (var e = new c.Svg.Path(b, d), f = 0; f < a.length; f++)
                    for (var g = a[f], h = 0; h < g.pathElements.length; h++) e.pathElements.push(g.pathElements[h]);
                return e
            }
            var u = {
                    m: ["x", "y"],
                    l: ["x", "y"],
                    c: ["x1", "y1", "x2", "y2", "x", "y"],
                    a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"]
                },
                v = {
                    accuracy: 3
                };
            c.Svg.Path = c.Class.extend({
                constructor: f,
                position: g,
                remove: h,
                move: i,
                line: j,
                curve: k,
                arc: l,
                scale: o,
                translate: p,
                transform: q,
                parse: m,
                stringify: n,
                clone: r,
                splitByCommand: s
            }), c.Svg.Path.elementDescriptions = u, c.Svg.Path.join = t
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, b, c, d) {
                this.units = a, this.counterUnits = a === f.x ? f.y : f.x, this.chartRect = b, this.axisLength = b[a.rectEnd] - b[a.rectStart], this.gridOffset = b[a.rectOffset], this.ticks = c, this.options = d
            }

            function e(a, b, d, e, f) {
                var g = e["axis" + this.units.pos.toUpperCase()],
                    h = this.ticks.map(this.projectValue.bind(this)),
                    i = this.ticks.map(g.labelInterpolationFnc);
                h.forEach(function (j, k) {
                    var l, m = {
                        x: 0,
                        y: 0
                    };
                    l = h[k + 1] ? h[k + 1] - j : Math.max(this.axisLength - j, 30), c.isFalseyButZero(i[k]) && "" !== i[k] || ("x" === this.units.pos ? (j = this.chartRect.x1 + j, m.x = e.axisX.labelOffset.x, "start" === e.axisX.position ? m.y = this.chartRect.padding.top + e.axisX.labelOffset.y + (d ? 5 : 20) : m.y = this.chartRect.y1 + e.axisX.labelOffset.y + (d ? 5 : 20)) : (j = this.chartRect.y1 - j, m.y = e.axisY.labelOffset.y - (d ? l : 0), "start" === e.axisY.position ? m.x = d ? this.chartRect.padding.left + e.axisY.labelOffset.x : this.chartRect.x1 - 10 : m.x = this.chartRect.x2 + e.axisY.labelOffset.x + 10), g.showGrid && c.createGrid(j, k, this, this.gridOffset, this.chartRect[this.counterUnits.len](), a, [e.classNames.grid, e.classNames[this.units.dir]], f), g.showLabel && c.createLabel(j, l, k, i, this, g.offset, m, b, [e.classNames.label, e.classNames[this.units.dir], "start" === g.position ? e.classNames[g.position] : e.classNames.end], d, f))
                }.bind(this))
            }
            var f = {
                x: {
                    pos: "x",
                    len: "width",
                    dir: "horizontal",
                    rectStart: "x1",
                    rectEnd: "x2",
                    rectOffset: "y2"
                },
                y: {
                    pos: "y",
                    len: "height",
                    dir: "vertical",
                    rectStart: "y2",
                    rectEnd: "y1",
                    rectOffset: "x1"
                }
            };
            c.Axis = c.Class.extend({
                constructor: d,
                createGridAndLabels: e,
                projectValue: function (a, b, c) {
                    throw new Error("Base axis can't be instantiated!")
                }
            }), c.Axis.units = f
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, b, d, e) {
                var f = e.highLow || c.getHighLow(b, e, a.pos);
                this.bounds = c.getBounds(d[a.rectEnd] - d[a.rectStart], f, e.scaleMinSpace || 20, e.onlyInteger), this.range = {
                    min: this.bounds.min,
                    max: this.bounds.max
                }, c.AutoScaleAxis.super.constructor.call(this, a, d, this.bounds.values, e)
            }

            function e(a) {
                return this.axisLength * (+c.getMultiValue(a, this.units.pos) - this.bounds.min) / this.bounds.range
            }
            c.AutoScaleAxis = c.Axis.extend({
                constructor: d,
                projectValue: e
            })
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, b, d, e) {
                var f = e.highLow || c.getHighLow(b, e, a.pos);
                this.divisor = e.divisor || 1, this.ticks = e.ticks || c.times(this.divisor).map(function (a, b) {
                    return f.low + (f.high - f.low) / this.divisor * b
                }.bind(this)), this.ticks.sort(function (a, b) {
                    return a - b
                }), this.range = {
                    min: f.low,
                    max: f.high
                }, c.FixedScaleAxis.super.constructor.call(this, a, d, this.ticks, e), this.stepLength = this.axisLength / this.divisor
            }

            function e(a) {
                return this.axisLength * (+c.getMultiValue(a, this.units.pos) - this.range.min) / (this.range.max - this.range.min)
            }
            c.FixedScaleAxis = c.Axis.extend({
                constructor: d,
                projectValue: e
            })
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, b, d, e) {
                c.StepAxis.super.constructor.call(this, a, d, e.ticks, e);
                var f = Math.max(1, e.ticks.length - (e.stretch ? 1 : 0));
                this.stepLength = this.axisLength / f
            }

            function e(a, b) {
                return this.stepLength * b
            }
            c.StepAxis = c.Axis.extend({
                constructor: d,
                projectValue: e
            })
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a) {
                var b = c.normalizeData(this.data, a.reverseData, !0);
                this.svg = c.createSvg(this.container, a.width, a.height, a.classNames.chart);
                var d, e, g = this.svg.elem("g").addClass(a.classNames.gridGroup),
                    h = this.svg.elem("g"),
                    i = this.svg.elem("g").addClass(a.classNames.labelGroup),
                    j = c.createChartRect(this.svg, a, f.padding);
                d = void 0 === a.axisX.type ? new c.StepAxis(c.Axis.units.x, b.normalized.series, j, c.extend({}, a.axisX, {
                    ticks: b.normalized.labels,
                    stretch: a.fullWidth
                })) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, j, a.axisX), e = void 0 === a.axisY.type ? new c.AutoScaleAxis(c.Axis.units.y, b.normalized.series, j, c.extend({}, a.axisY, {
                    high: c.isNumeric(a.high) ? a.high : a.axisY.high,
                    low: c.isNumeric(a.low) ? a.low : a.axisY.low
                })) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, j, a.axisY), d.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), e.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && c.createGridBackground(g, j, a.classNames.gridBackground, this.eventEmitter), b.raw.series.forEach(function (f, g) {
                    var i = h.elem("g");
                    i.attr({
                        "ct:series-name": f.name,
                        "ct:meta": c.serialize(f.meta)
                    }), i.addClass([a.classNames.series, f.className || a.classNames.series + "-" + c.alphaNumerate(g)].join(" "));
                    var k = [],
                        l = [];
                    b.normalized.series[g].forEach(function (a, h) {
                        var i = {
                            x: j.x1 + d.projectValue(a, h, b.normalized.series[g]),
                            y: j.y1 - e.projectValue(a, h, b.normalized.series[g])
                        };
                        k.push(i.x, i.y), l.push({
                            value: a,
                            valueIndex: h,
                            meta: c.getMetaData(f, h)
                        })
                    }.bind(this));
                    var m = {
                            lineSmooth: c.getSeriesOption(f, a, "lineSmooth"),
                            showPoint: c.getSeriesOption(f, a, "showPoint"),
                            showLine: c.getSeriesOption(f, a, "showLine"),
                            showArea: c.getSeriesOption(f, a, "showArea"),
                            areaBase: c.getSeriesOption(f, a, "areaBase")
                        },
                        n = "function" == typeof m.lineSmooth ? m.lineSmooth : m.lineSmooth ? c.Interpolation.monotoneCubic() : c.Interpolation.none(),
                        o = n(k, l);
                    if (m.showPoint && o.pathElements.forEach(function (b) {
                            var h = i.elem("line", {
                                x1: b.x,
                                y1: b.y,
                                x2: b.x + .01,
                                y2: b.y
                            }, a.classNames.point).attr({
                                "ct:value": [b.data.value.x, b.data.value.y].filter(c.isNumeric).join(","),
                                "ct:meta": c.serialize(b.data.meta)
                            });
                            this.eventEmitter.emit("draw", {
                                type: "point",
                                value: b.data.value,
                                index: b.data.valueIndex,
                                meta: b.data.meta,
                                series: f,
                                seriesIndex: g,
                                axisX: d,
                                axisY: e,
                                group: i,
                                element: h,
                                x: b.x,
                                y: b.y
                            })
                        }.bind(this)), m.showLine) {
                        var p = i.elem("path", {
                            d: o.stringify()
                        }, a.classNames.line, !0);
                        this.eventEmitter.emit("draw", {
                            type: "line",
                            values: b.normalized.series[g],
                            path: o.clone(),
                            chartRect: j,
                            index: g,
                            series: f,
                            seriesIndex: g,
                            seriesMeta: f.meta,
                            axisX: d,
                            axisY: e,
                            group: i,
                            element: p
                        })
                    }
                    if (m.showArea && e.range) {
                        var q = Math.max(Math.min(m.areaBase, e.range.max), e.range.min),
                            r = j.y1 - e.projectValue(q);
                        o.splitByCommand("M").filter(function (a) {
                            return a.pathElements.length > 1
                        }).map(function (a) {
                            var b = a.pathElements[0],
                                c = a.pathElements[a.pathElements.length - 1];
                            return a.clone(!0).position(0).remove(1).move(b.x, r).line(b.x, b.y).position(a.pathElements.length + 1).line(c.x, r)
                        }).forEach(function (c) {
                            var h = i.elem("path", {
                                d: c.stringify()
                            }, a.classNames.area, !0);
                            this.eventEmitter.emit("draw", {
                                type: "area",
                                values: b.normalized.series[g],
                                path: c.clone(),
                                series: f,
                                seriesIndex: g,
                                axisX: d,
                                axisY: e,
                                chartRect: j,
                                index: g,
                                group: i,
                                element: h
                            })
                        }.bind(this))
                    }
                }.bind(this)), this.eventEmitter.emit("created", {
                    bounds: e.bounds,
                    chartRect: j,
                    axisX: d,
                    axisY: e,
                    svg: this.svg,
                    options: a
                })
            }

            function e(a, b, d, e) {
                c.Line.super.constructor.call(this, a, b, f, c.extend({}, f, d), e)
            }
            var f = {
                axisX: {
                    offset: 30,
                    position: "end",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    type: void 0
                },
                axisY: {
                    offset: 40,
                    position: "start",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    type: void 0,
                    scaleMinSpace: 20,
                    onlyInteger: !1
                },
                width: void 0,
                height: void 0,
                showLine: !0,
                showPoint: !0,
                showArea: !1,
                areaBase: 0,
                lineSmooth: !0,
                showGridBackground: !1,
                low: void 0,
                high: void 0,
                chartPadding: {
                    top: 15,
                    right: 15,
                    bottom: 5,
                    left: 10
                },
                fullWidth: !1,
                reverseData: !1,
                classNames: {
                    chart: "ct-chart-line",
                    label: "ct-label",
                    labelGroup: "ct-labels",
                    series: "ct-series",
                    line: "ct-line",
                    point: "ct-point",
                    area: "ct-area",
                    grid: "ct-grid",
                    gridGroup: "ct-grids",
                    gridBackground: "ct-grid-background",
                    vertical: "ct-vertical",
                    horizontal: "ct-horizontal",
                    start: "ct-start",
                    end: "ct-end"
                }
            };
            c.Line = c.Base.extend({
                constructor: e,
                createChart: d
            })
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a) {
                var b, d;
                a.distributeSeries ? (b = c.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), b.normalized.series = b.normalized.series.map(function (a) {
                    return [a]
                })) : b = c.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), this.svg = c.createSvg(this.container, a.width, a.height, a.classNames.chart + (a.horizontalBars ? " " + a.classNames.horizontalBars : ""));
                var e = this.svg.elem("g").addClass(a.classNames.gridGroup),
                    g = this.svg.elem("g"),
                    h = this.svg.elem("g").addClass(a.classNames.labelGroup);
                if (a.stackBars && 0 !== b.normalized.series.length) {
                    var i = c.serialMap(b.normalized.series, function () {
                        return Array.prototype.slice.call(arguments).map(function (a) {
                            return a
                        }).reduce(function (a, b) {
                            return {
                                x: a.x + (b && b.x) || 0,
                                y: a.y + (b && b.y) || 0
                            }
                        }, {
                            x: 0,
                            y: 0
                        })
                    });
                    d = c.getHighLow([i], a, a.horizontalBars ? "x" : "y")
                } else d = c.getHighLow(b.normalized.series, a, a.horizontalBars ? "x" : "y");
                d.high = +a.high || (0 === a.high ? 0 : d.high), d.low = +a.low || (0 === a.low ? 0 : d.low);
                var j, k, l, m, n, o = c.createChartRect(this.svg, a, f.padding);
                k = a.distributeSeries && a.stackBars ? b.normalized.labels.slice(0, 1) : b.normalized.labels, a.horizontalBars ? (j = m = void 0 === a.axisX.type ? new c.AutoScaleAxis(c.Axis.units.x, b.normalized.series, o, c.extend({}, a.axisX, {
                    highLow: d,
                    referenceValue: 0
                })) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, o, c.extend({}, a.axisX, {
                    highLow: d,
                    referenceValue: 0
                })), l = n = void 0 === a.axisY.type ? new c.StepAxis(c.Axis.units.y, b.normalized.series, o, {
                    ticks: k
                }) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, o, a.axisY)) : (l = m = void 0 === a.axisX.type ? new c.StepAxis(c.Axis.units.x, b.normalized.series, o, {
                    ticks: k
                }) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, o, a.axisX), j = n = void 0 === a.axisY.type ? new c.AutoScaleAxis(c.Axis.units.y, b.normalized.series, o, c.extend({}, a.axisY, {
                    highLow: d,
                    referenceValue: 0
                })) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, o, c.extend({}, a.axisY, {
                    highLow: d,
                    referenceValue: 0
                })));
                var p = a.horizontalBars ? o.x1 + j.projectValue(0) : o.y1 - j.projectValue(0),
                    q = [];
                l.createGridAndLabels(e, h, this.supportsForeignObject, a, this.eventEmitter), j.createGridAndLabels(e, h, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && c.createGridBackground(e, o, a.classNames.gridBackground, this.eventEmitter), b.raw.series.forEach(function (d, e) {
                    var f, h, i = e - (b.raw.series.length - 1) / 2;
                    f = a.distributeSeries && !a.stackBars ? l.axisLength / b.normalized.series.length / 2 : a.distributeSeries && a.stackBars ? l.axisLength / 2 : l.axisLength / b.normalized.series[e].length / 2, h = g.elem("g"), h.attr({
                        "ct:series-name": d.name,
                        "ct:meta": c.serialize(d.meta)
                    }), h.addClass([a.classNames.series, d.className || a.classNames.series + "-" + c.alphaNumerate(e)].join(" ")), b.normalized.series[e].forEach(function (g, k) {
                        var r, s, t, u;
                        if (u = a.distributeSeries && !a.stackBars ? e : a.distributeSeries && a.stackBars ? 0 : k, r = a.horizontalBars ? {
                                x: o.x1 + j.projectValue(g && g.x ? g.x : 0, k, b.normalized.series[e]),
                                y: o.y1 - l.projectValue(g && g.y ? g.y : 0, u, b.normalized.series[e])
                            } : {
                                x: o.x1 + l.projectValue(g && g.x ? g.x : 0, u, b.normalized.series[e]),
                                y: o.y1 - j.projectValue(g && g.y ? g.y : 0, k, b.normalized.series[e])
                            }, l instanceof c.StepAxis && (l.options.stretch || (r[l.units.pos] += f * (a.horizontalBars ? -1 : 1)), r[l.units.pos] += a.stackBars || a.distributeSeries ? 0 : i * a.seriesBarDistance * (a.horizontalBars ? -1 : 1)), t = q[k] || p, q[k] = t - (p - r[l.counterUnits.pos]), void 0 !== g) {
                            var v = {};
                            v[l.units.pos + "1"] = r[l.units.pos], v[l.units.pos + "2"] = r[l.units.pos], !a.stackBars || "accumulate" !== a.stackMode && a.stackMode ? (v[l.counterUnits.pos + "1"] = p, v[l.counterUnits.pos + "2"] = r[l.counterUnits.pos]) : (v[l.counterUnits.pos + "1"] = t, v[l.counterUnits.pos + "2"] = q[k]), v.x1 = Math.min(Math.max(v.x1, o.x1), o.x2), v.x2 = Math.min(Math.max(v.x2, o.x1), o.x2), v.y1 = Math.min(Math.max(v.y1, o.y2), o.y1), v.y2 = Math.min(Math.max(v.y2, o.y2), o.y1);
                            var w = c.getMetaData(d, k);
                            s = h.elem("line", v, a.classNames.bar).attr({
                                "ct:value": [g.x, g.y].filter(c.isNumeric).join(","),
                                "ct:meta": c.serialize(w)
                            }), this.eventEmitter.emit("draw", c.extend({
                                type: "bar",
                                value: g,
                                index: k,
                                meta: w,
                                series: d,
                                seriesIndex: e,
                                axisX: m,
                                axisY: n,
                                chartRect: o,
                                group: h,
                                element: s
                            }, v))
                        }
                    }.bind(this))
                }.bind(this)), this.eventEmitter.emit("created", {
                    bounds: j.bounds,
                    chartRect: o,
                    axisX: m,
                    axisY: n,
                    svg: this.svg,
                    options: a
                })
            }

            function e(a, b, d, e) {
                c.Bar.super.constructor.call(this, a, b, f, c.extend({}, f, d), e)
            }
            var f = {
                axisX: {
                    offset: 30,
                    position: "end",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    scaleMinSpace: 30,
                    onlyInteger: !1
                },
                axisY: {
                    offset: 40,
                    position: "start",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    scaleMinSpace: 20,
                    onlyInteger: !1
                },
                width: void 0,
                height: void 0,
                high: void 0,
                low: void 0,
                referenceValue: 0,
                chartPadding: {
                    top: 15,
                    right: 15,
                    bottom: 5,
                    left: 10
                },
                seriesBarDistance: 15,
                stackBars: !1,
                stackMode: "accumulate",
                horizontalBars: !1,
                distributeSeries: !1,
                reverseData: !1,
                showGridBackground: !1,
                classNames: {
                    chart: "ct-chart-bar",
                    horizontalBars: "ct-horizontal-bars",
                    label: "ct-label",
                    labelGroup: "ct-labels",
                    series: "ct-series",
                    bar: "ct-bar",
                    grid: "ct-grid",
                    gridGroup: "ct-grids",
                    gridBackground: "ct-grid-background",
                    vertical: "ct-vertical",
                    horizontal: "ct-horizontal",
                    start: "ct-start",
                    end: "ct-end"
                }
            };
            c.Bar = c.Base.extend({
                constructor: e,
                createChart: d
            })
        }(window, document, a),
        function (a, b, c) {
            "use strict";

            function d(a, b, c) {
                var d = b.x > a.x;
                return d && "explode" === c || !d && "implode" === c ? "start" : d && "implode" === c || !d && "explode" === c ? "end" : "middle"
            }

            function e(a) {
                var b, e, f, h, i, j = c.normalizeData(this.data),
                    k = [],
                    l = a.startAngle;
                this.svg = c.createSvg(this.container, a.width, a.height, a.donut ? a.classNames.chartDonut : a.classNames.chartPie), e = c.createChartRect(this.svg, a, g.padding), f = Math.min(e.width() / 2, e.height() / 2), i = a.total || j.normalized.series.reduce(function (a, b) {
                    return a + b
                }, 0);
                var m = c.quantity(a.donutWidth);
                "%" === m.unit && (m.value *= f / 100), f -= a.donut && !a.donutSolid ? m.value / 2 : 0, h = "outside" === a.labelPosition || a.donut && !a.donutSolid ? f : "center" === a.labelPosition ? 0 : a.donutSolid ? f - m.value / 2 : f / 2, h += a.labelOffset;
                var n = {
                        x: e.x1 + e.width() / 2,
                        y: e.y2 + e.height() / 2
                    },
                    o = 1 === j.raw.series.filter(function (a) {
                        return a.hasOwnProperty("value") ? 0 !== a.value : 0 !== a
                    }).length;
                j.raw.series.forEach(function (a, b) {
                    k[b] = this.svg.elem("g", null, null)
                }.bind(this)), a.showLabel && (b = this.svg.elem("g", null, null)), j.raw.series.forEach(function (e, g) {
                    if (0 !== j.normalized.series[g] || !a.ignoreEmptyValues) {
                        k[g].attr({
                            "ct:series-name": e.name
                        }), k[g].addClass([a.classNames.series, e.className || a.classNames.series + "-" + c.alphaNumerate(g)].join(" "));
                        var p = i > 0 ? l + j.normalized.series[g] / i * 360 : 0,
                            q = Math.max(0, l - (0 === g || o ? 0 : .2));
                        p - q >= 359.99 && (p = q + 359.99);
                        var r, s, t, u = c.polarToCartesian(n.x, n.y, f, q),
                            v = c.polarToCartesian(n.x, n.y, f, p),
                            w = new c.Svg.Path(!a.donut || a.donutSolid).move(v.x, v.y).arc(f, f, 0, p - l > 180, 0, u.x, u.y);
                        a.donut ? a.donutSolid && (t = f - m.value, r = c.polarToCartesian(n.x, n.y, t, l - (0 === g || o ? 0 : .2)), s = c.polarToCartesian(n.x, n.y, t, p), w.line(r.x, r.y), w.arc(t, t, 0, p - l > 180, 1, s.x, s.y)) : w.line(n.x, n.y);
                        var x = a.classNames.slicePie;
                        a.donut && (x = a.classNames.sliceDonut, a.donutSolid && (x = a.classNames.sliceDonutSolid));
                        var y = k[g].elem("path", {
                            d: w.stringify()
                        }, x);
                        if (y.attr({
                                "ct:value": j.normalized.series[g],
                                "ct:meta": c.serialize(e.meta)
                            }), a.donut && !a.donutSolid && (y._node.style.strokeWidth = m.value + "px"), this.eventEmitter.emit("draw", {
                                type: "slice",
                                value: j.normalized.series[g],
                                totalDataSum: i,
                                index: g,
                                meta: e.meta,
                                series: e,
                                group: k[g],
                                element: y,
                                path: w.clone(),
                                center: n,
                                radius: f,
                                startAngle: l,
                                endAngle: p
                            }), a.showLabel) {
                            var z;
                            z = 1 === j.raw.series.length ? {
                                x: n.x,
                                y: n.y
                            } : c.polarToCartesian(n.x, n.y, h, l + (p - l) / 2);
                            var A;
                            A = j.normalized.labels && !c.isFalseyButZero(j.normalized.labels[g]) ? j.normalized.labels[g] : j.normalized.series[g];
                            var B = a.labelInterpolationFnc(A, g);
                            if (B || 0 === B) {
                                var C = b.elem("text", {
                                    dx: z.x,
                                    dy: z.y,
                                    "text-anchor": d(n, z, a.labelDirection)
                                }, a.classNames.label).text("" + B);
                                this.eventEmitter.emit("draw", {
                                    type: "label",
                                    index: g,
                                    group: b,
                                    element: C,
                                    text: "" + B,
                                    x: z.x,
                                    y: z.y
                                })
                            }
                        }
                        l = p
                    }
                }.bind(this)), this.eventEmitter.emit("created", {
                    chartRect: e,
                    svg: this.svg,
                    options: a
                })
            }

            function f(a, b, d, e) {
                c.Pie.super.constructor.call(this, a, b, g, c.extend({}, g, d), e)
            }
            var g = {
                width: void 0,
                height: void 0,
                chartPadding: 5,
                classNames: {
                    chartPie: "ct-chart-pie",
                    chartDonut: "ct-chart-donut",
                    series: "ct-series",
                    slicePie: "ct-slice-pie",
                    sliceDonut: "ct-slice-donut",
                    sliceDonutSolid: "ct-slice-donut-solid",
                    label: "ct-label"
                },
                startAngle: 0,
                total: void 0,
                donut: !1,
                donutSolid: !1,
                donutWidth: 60,
                showLabel: !0,
                labelOffset: 0,
                labelPosition: "inside",
                labelInterpolationFnc: c.noop,
                labelDirection: "neutral",
                reverseData: !1,
                ignoreEmptyValues: !1
            };
            c.Pie = c.Base.extend({
                constructor: f,
                createChart: e,
                determineAnchorPosition: d
            })
        }(window, document, a), a
}),
function (a, b) {
    "function" == typeof define && define.amd ? define(["chartist"], function (c) {
        return a.returnExportsGlobal = b(c)
    }) : "object" == typeof exports ? module.exports = b(require("chartist")) : a["Chartist.plugins.tooltips"] = b(Chartist)
}(this, function (a) {
    return function (a, b, c) {
        "use strict";

        function d(a) {
            f(a, "tooltip-show") || (a.className = a.className + " tooltip-show")
        }

        function e(a) {
            var b = new RegExp("tooltip-show\\s*", "gi");
            a.className = a.className.replace(b, "").trim()
        }

        function f(a, b) {
            return (" " + a.getAttribute("class") + " ").indexOf(" " + b + " ") > -1
        }

        function g(a, b) {
            do {
                a = a.nextSibling
            } while (a && !f(a, b));
            return a
        }

        function h(a) {
            return a.innerText || a.textContent
        }
        var i = {
            currency: void 0,
            currencyFormatCallback: void 0,
            tooltipOffset: {
                x: 0,
                y: -20
            },
            anchorToPoint: !1,
            appendToBody: !1,
            class: void 0,
            pointClass: "ct-point"
        };
        c.plugins = c.plugins || {}, c.plugins.tooltip = function (j) {
            return j = c.extend({}, i, j),
                function (i) {
                    function k(a, b, c) {
                        n.addEventListener(a, function (a) {
                            b && !f(a.target, b) || c(a)
                        })
                    }

                    function l(b) {
                        p = p || o.offsetHeight, q = q || o.offsetWidth;
                        var c, d, e = -q / 2 + j.tooltipOffset.x,
                            f = -p + j.tooltipOffset.y;
                        if (j.appendToBody) o.style.top = b.pageY + f + "px", o.style.left = b.pageX + e + "px";
                        else {
                            var g = n.getBoundingClientRect(),
                                h = b.pageX - g.left - a.pageXOffset,
                                i = b.pageY - g.top - a.pageYOffset;
                            !0 === j.anchorToPoint && b.target.x2 && b.target.y2 && (c = parseInt(b.target.x2.baseVal.value), d = parseInt(b.target.y2.baseVal.value)), o.style.top = (d || i) + f + "px", o.style.left = (c || h) + e + "px"
                        }
                    }
                    var m = j.pointClass;
                    i instanceof c.Bar ? m = "ct-bar" : i instanceof c.Pie && (m = i.options.donut ? "ct-slice-donut" : "ct-slice-pie");
                    var n = i.container,
                        o = n.querySelector(".chartist-tooltip");
                    o || (o = b.createElement("div"), o.className = j.class ? "chartist-tooltip " + j.class : "chartist-tooltip", j.appendToBody ? b.body.appendChild(o) : n.appendChild(o));
                    var p = o.offsetHeight,
                        q = o.offsetWidth;
                    e(o), k("mouseover", m, function (a) {
                        var e = a.target,
                            f = "",
                            k = i instanceof c.Pie ? e : e.parentNode,
                            m = k ? e.parentNode.getAttribute("ct:meta") || e.parentNode.getAttribute("ct:series-name") : "",
                            n = e.getAttribute("ct:meta") || m || "",
                            r = !!n,
                            s = e.getAttribute("ct:value");
                        if (j.transformTooltipTextFnc && "function" == typeof j.transformTooltipTextFnc && (s = j.transformTooltipTextFnc(s)), j.tooltipFnc && "function" == typeof j.tooltipFnc) f = j.tooltipFnc(n, s);
                        else {
                            if (j.metaIsHTML) {
                                var t = b.createElement("textarea");
                                t.innerHTML = n, n = t.value
                            }
                            if (n = '<span class="chartist-tooltip-meta">' + n + "</span>", r) f += n + "<br>";
                            else if (i instanceof c.Pie) {
                                var u = g(e, "ct-label");
                                u && (f += h(u) + "<br>")
                            }
                            s && (j.currency && (s = void 0 != j.currencyFormatCallback ? j.currencyFormatCallback(s, j) : j.currency + s.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")), s = '<span class="chartist-tooltip-value">' + s + "</span>", f += s)
                        }
                        f && (o.innerHTML = f, l(a), d(o), p = o.offsetHeight, q = o.offsetWidth)
                    }), k("mouseout", m, function () {
                        e(o)
                    }), k("mousemove", null, function (a) {
                        !1 === j.anchorToPoint && l(a)
                    })
                }
        }
    }(window, document, a), a.plugins.tooltips
}),
function (a, b) {
    "function" == typeof define && define.amd ? define([], function () {
        return a.returnExportsGlobal = b()
    }) : "object" == typeof exports ? module.exports = b() : a["Chartist.plugins.ctAxisTitle"] = b()
}(this, function () {
    return function (a, b, c) {
        "use strict";
        var d = {
                axisTitle: "",
                axisClass: "ct-axis-title",
                offset: {
                    x: 0,
                    y: 0
                },
                textAnchor: "middle",
                flipText: !1
            },
            e = {
                xAxis: d,
                yAxis: d
            };
        c.plugins = c.plugins || {}, c.plugins.ctAxisTitle = function (a) {
            return a = c.extend({}, e, a),
                function (b) {
                    b.on("created", function (b) {
                        if (!a.axisX.axisTitle && !a.axisY.axisTitle) throw new Error("ctAxisTitle plugin - You must provide at least one axis title");
                        if (!b.axisX && !b.axisY) throw new Error("ctAxisTitle plugin can only be used on charts that have at least one axis");
                        var d, e, f;
                        if (a.axisX.axisTitle && b.axisX && (d = b.axisX.axisLength / 2 + b.options.axisX.offset + b.options.chartPadding.left, e = b.options.chartPadding.top, "end" === b.options.axisX.position && (e += b.axisY.axisLength), f = new c.Svg("text"), f.addClass(a.axisX.axisClass), f.text(a.axisX.axisTitle), f.attr({
                                x: d + a.axisX.offset.x,
                                y: e + a.axisX.offset.y,
                                "text-anchor": a.axisX.textAnchor
                            }), b.svg.append(f, !0)), a.axisY.axisTitle && b.axisY) {
                            d = 0, e = b.axisY.axisLength / 2 + b.options.chartPadding.top, "end" === b.options.axisY.position && (d = b.axisX.axisLength);
                            var g = "rotate(" + (a.axisY.flipTitle ? -90 : 90) + ", " + d + ", " + e + ")";
                            f = new c.Svg("text"), f.addClass(a.axisY.axisClass), f.text(a.axisY.axisTitle), f.attr({
                                x: d + a.axisY.offset.x,
                                y: e + a.axisY.offset.y,
                                transform: g,
                                "text-anchor": a.axisY.textAnchor
                            }), b.svg.append(f, !0)
                        }
                    })
                }
        }
    }(window, document, Chartist), Chartist.plugins.ctAxisTitle
}),
function (a, b) {
    "function" == typeof define && define.amd ? define(["chartist"], function (c) {
        return a.returnExportsGlobal = b(c)
    }) : "object" == typeof exports ? module.exports = b(require("chartist")) : a["Chartist.plugins.legend"] = b(a.Chartist)
}(this, function (a) {
    "use strict";
    var b = {
        className: "",
        classNames: !1,
        removeAll: !1,
        legendNames: !1,
        clickable: !0,
        onClick: null,
        position: "top"
    };
    return a.plugins = a.plugins || {}, a.plugins.legend = function (c) {
        function d(a, b) {
            return a - b
        }
        if (c && c.position) {
            if (!("top" === c.position || "bottom" === c.position || c.position instanceof HTMLElement)) throw Error("The position you entered is not a valid position");
            if (c.position instanceof HTMLElement) {
                var e = c.position;
                delete c.position
            }
        }
        return c = a.extend({}, b, c), e && (c.position = e),
            function (b) {
                var e = b.container.querySelector(".ct-legend");
                if (e && e.parentNode.removeChild(e), c.clickable) {
                    var f = b.data.series.map(function (c, d) {
                        return "object" != typeof c && (c = {
                            value: c
                        }), c.className = c.className || b.options.classNames.series + "-" + a.alphaNumerate(d), c
                    });
                    b.data.series = f
                }
                var g = document.createElement("ul"),
                    h = b instanceof a.Pie;
                g.className = "ct-legend", b instanceof a.Pie && g.classList.add("ct-legend-inside"), "string" == typeof c.className && c.className.length > 0 && g.classList.add(c.className);
                var i = [],
                    j = b.data.series.slice(0),
                    k = b.data.series,
                    l = h && b.data.labels;
                if (l) {
                    var m = b.data.labels.slice(0);
                    k = b.data.labels
                }
                k = c.legendNames || k;
                var n = Array.isArray(c.classNames) && c.classNames.length === k.length;
                k.forEach(function (a, b) {
                    var d = document.createElement("li");
                    d.className = "ct-series-" + b, n && (d.className += " " + c.classNames[b]), d.setAttribute("data-legend", b), d.textContent = a.name || a, g.appendChild(d)
                }), b.on("created", function (a) {
                    if (c.position instanceof HTMLElement) c.position.insertBefore(g, null);
                    else switch (c.position) {
                        case "top":
                            b.container.insertBefore(g, b.container.childNodes[0]);
                            break;
                        case "bottom":
                            b.container.insertBefore(g, null)
                    }
                }), c.clickable && g.addEventListener("click", function (a) {
                    var e = a.target;
                    if (e.parentNode === g && e.hasAttribute("data-legend")) {
                        a.preventDefault();
                        var f = parseInt(e.getAttribute("data-legend")),
                            h = i.indexOf(f);
                        if (h > -1) i.splice(h, 1), e.classList.remove("inactive");
                        else if (c.removeAll) i.push(f), e.classList.add("inactive");
                        else if (b.data.series.length > 1) i.push(f), e.classList.add("inactive");
                        else {
                            i = [];
                            var k = Array.prototype.slice.call(g.childNodes);
                            k.forEach(function (a) {
                                a.classList.remove("inactive")
                            })
                        }
                        var n = j.slice(0);
                        if (l) var o = m.slice(0);
                        i.sort(d).reverse(), i.forEach(function (a) {
                            n.splice(a, 1), l && o.splice(a, 1)
                        }), c.onClick && c.onClick(b, a), b.data.series = n, l && (b.data.labels = o), b.update()
                    }
                })
            }
    }, a.plugins.legend
}),
function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.Chart = a()
    }
}(function () {
    var a;
    return function () {
        function a(b, c, d) {
            function e(g, h) {
                if (!c[g]) {
                    if (!b[g]) {
                        var i = "function" == typeof require && require;
                        if (!h && i) return i(g, !0);
                        if (f) return f(g, !0);
                        var j = new Error("Cannot find module '" + g + "'");
                        throw j.code = "MODULE_NOT_FOUND", j
                    }
                    var k = c[g] = {
                        exports: {}
                    };
                    b[g][0].call(k.exports, function (a) {
                        var c = b[g][1][a];
                        return e(c || a)
                    }, k, k.exports, a, b, c, d)
                }
                return c[g].exports
            }
            for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
            return e
        }
        return a
    }()({
        1: [function (a, b, c) {
            function d(a) {
                if (a) {
                    var b = /^#([a-fA-F0-9]{3})$/i,
                        c = /^#([a-fA-F0-9]{6})$/i,
                        d = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
                        e = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
                        f = /(\w+)/,
                        g = [0, 0, 0],
                        h = 1,
                        i = a.match(b);
                    if (i) {
                        i = i[1];
                        for (var j = 0; j < g.length; j++) g[j] = parseInt(i[j] + i[j], 16)
                    } else if (i = a.match(c)) {
                        i = i[1];
                        for (var j = 0; j < g.length; j++) g[j] = parseInt(i.slice(2 * j, 2 * j + 2), 16)
                    } else if (i = a.match(d)) {
                        for (var j = 0; j < g.length; j++) g[j] = parseInt(i[j + 1]);
                        h = parseFloat(i[4])
                    } else if (i = a.match(e)) {
                        for (var j = 0; j < g.length; j++) g[j] = Math.round(2.55 * parseFloat(i[j + 1]));
                        h = parseFloat(i[4])
                    } else if (i = a.match(f)) {
                        if ("transparent" == i[1]) return [0, 0, 0, 0];
                        if (!(g = u[i[1]])) return
                    }
                    for (var j = 0; j < g.length; j++) g[j] = s(g[j], 0, 255);
                    return h = h || 0 == h ? s(h, 0, 1) : 1, g[3] = h, g
                }
            }

            function e(a) {
                if (a) {
                    var b = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                        c = a.match(b);
                    if (c) {
                        var d = parseFloat(c[4]);
                        return [s(parseInt(c[1]), 0, 360), s(parseFloat(c[2]), 0, 100), s(parseFloat(c[3]), 0, 100), s(isNaN(d) ? 1 : d, 0, 1)]
                    }
                }
            }

            function f(a) {
                if (a) {
                    var b = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                        c = a.match(b);
                    if (c) {
                        var d = parseFloat(c[4]);
                        return [s(parseInt(c[1]), 0, 360), s(parseFloat(c[2]), 0, 100), s(parseFloat(c[3]), 0, 100), s(isNaN(d) ? 1 : d, 0, 1)]
                    }
                }
            }

            function g(a) {
                var b = d(a);
                return b && b.slice(0, 3)
            }

            function h(a) {
                var b = e(a);
                return b && b.slice(0, 3)
            }

            function i(a) {
                var b = d(a);
                return b ? b[3] : (b = e(a)) ? b[3] : (b = f(a)) ? b[3] : void 0
            }

            function j(a) {
                return "#" + t(a[0]) + t(a[1]) + t(a[2])
            }

            function k(a, b) {
                return b < 1 || a[3] && a[3] < 1 ? l(a, b) : "rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
            }

            function l(a, b) {
                return void 0 === b && (b = void 0 !== a[3] ? a[3] : 1), "rgba(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + b + ")"
            }

            function m(a, b) {
                return b < 1 || a[3] && a[3] < 1 ? n(a, b) : "rgb(" + Math.round(a[0] / 255 * 100) + "%, " + Math.round(a[1] / 255 * 100) + "%, " + Math.round(a[2] / 255 * 100) + "%)"
            }

            function n(a, b) {
                return "rgba(" + Math.round(a[0] / 255 * 100) + "%, " + Math.round(a[1] / 255 * 100) + "%, " + Math.round(a[2] / 255 * 100) + "%, " + (b || a[3] || 1) + ")"
            }

            function o(a, b) {
                return b < 1 || a[3] && a[3] < 1 ? p(a, b) : "hsl(" + a[0] + ", " + a[1] + "%, " + a[2] + "%)"
            }

            function p(a, b) {
                return void 0 === b && (b = void 0 !== a[3] ? a[3] : 1), "hsla(" + a[0] + ", " + a[1] + "%, " + a[2] + "%, " + b + ")"
            }

            function q(a, b) {
                return void 0 === b && (b = void 0 !== a[3] ? a[3] : 1), "hwb(" + a[0] + ", " + a[1] + "%, " + a[2] + "%" + (void 0 !== b && 1 !== b ? ", " + b : "") + ")"
            }

            function r(a) {
                return v[a.slice(0, 3)]
            }

            function s(a, b, c) {
                return Math.min(Math.max(b, a), c)
            }

            function t(a) {
                var b = a.toString(16).toUpperCase();
                return b.length < 2 ? "0" + b : b
            }
            var u = a(5);
            b.exports = {
                getRgba: d,
                getHsla: e,
                getRgb: g,
                getHsl: h,
                getHwb: f,
                getAlpha: i,
                hexString: j,
                rgbString: k,
                rgbaString: l,
                percentString: m,
                percentaString: n,
                hslString: o,
                hslaString: p,
                hwbString: q,
                keyword: r
            };
            var v = {};
            for (var w in u) v[u[w]] = w
        }, {
            5: 5
        }],
        2: [function (a, b, c) {
            var d = a(4),
                e = a(1),
                f = function (a) {
                    if (a instanceof f) return a;
                    if (!(this instanceof f)) return new f(a);
                    this.valid = !1, this.values = {
                        rgb: [0, 0, 0],
                        hsl: [0, 0, 0],
                        hsv: [0, 0, 0],
                        hwb: [0, 0, 0],
                        cmyk: [0, 0, 0, 0],
                        alpha: 1
                    };
                    var b;
                    "string" == typeof a ? (b = e.getRgba(a), b ? this.setValues("rgb", b) : (b = e.getHsla(a)) ? this.setValues("hsl", b) : (b = e.getHwb(a)) && this.setValues("hwb", b)) : "object" == typeof a && (b = a, void 0 !== b.r || void 0 !== b.red ? this.setValues("rgb", b) : void 0 !== b.l || void 0 !== b.lightness ? this.setValues("hsl", b) : void 0 !== b.v || void 0 !== b.value ? this.setValues("hsv", b) : void 0 !== b.w || void 0 !== b.whiteness ? this.setValues("hwb", b) : void 0 === b.c && void 0 === b.cyan || this.setValues("cmyk", b))
                };
            f.prototype = {
                isValid: function () {
                    return this.valid
                },
                rgb: function () {
                    return this.setSpace("rgb", arguments)
                },
                hsl: function () {
                    return this.setSpace("hsl", arguments)
                },
                hsv: function () {
                    return this.setSpace("hsv", arguments)
                },
                hwb: function () {
                    return this.setSpace("hwb", arguments)
                },
                cmyk: function () {
                    return this.setSpace("cmyk", arguments)
                },
                rgbArray: function () {
                    return this.values.rgb
                },
                hslArray: function () {
                    return this.values.hsl
                },
                hsvArray: function () {
                    return this.values.hsv
                },
                hwbArray: function () {
                    var a = this.values;
                    return 1 !== a.alpha ? a.hwb.concat([a.alpha]) : a.hwb
                },
                cmykArray: function () {
                    return this.values.cmyk
                },
                rgbaArray: function () {
                    var a = this.values;
                    return a.rgb.concat([a.alpha])
                },
                hslaArray: function () {
                    var a = this.values;
                    return a.hsl.concat([a.alpha])
                },
                alpha: function (a) {
                    return void 0 === a ? this.values.alpha : (this.setValues("alpha", a), this)
                },
                red: function (a) {
                    return this.setChannel("rgb", 0, a)
                },
                green: function (a) {
                    return this.setChannel("rgb", 1, a)
                },
                blue: function (a) {
                    return this.setChannel("rgb", 2, a)
                },
                hue: function (a) {
                    return a && (a %= 360, a = a < 0 ? 360 + a : a), this.setChannel("hsl", 0, a)
                },
                saturation: function (a) {
                    return this.setChannel("hsl", 1, a)
                },
                lightness: function (a) {
                    return this.setChannel("hsl", 2, a)
                },
                saturationv: function (a) {
                    return this.setChannel("hsv", 1, a)
                },
                whiteness: function (a) {
                    return this.setChannel("hwb", 1, a)
                },
                blackness: function (a) {
                    return this.setChannel("hwb", 2, a)
                },
                value: function (a) {
                    return this.setChannel("hsv", 2, a)
                },
                cyan: function (a) {
                    return this.setChannel("cmyk", 0, a)
                },
                magenta: function (a) {
                    return this.setChannel("cmyk", 1, a)
                },
                yellow: function (a) {
                    return this.setChannel("cmyk", 2, a)
                },
                black: function (a) {
                    return this.setChannel("cmyk", 3, a)
                },
                hexString: function () {
                    return e.hexString(this.values.rgb)
                },
                rgbString: function () {
                    return e.rgbString(this.values.rgb, this.values.alpha)
                },
                rgbaString: function () {
                    return e.rgbaString(this.values.rgb, this.values.alpha)
                },
                percentString: function () {
                    return e.percentString(this.values.rgb, this.values.alpha)
                },
                hslString: function () {
                    return e.hslString(this.values.hsl, this.values.alpha)
                },
                hslaString: function () {
                    return e.hslaString(this.values.hsl, this.values.alpha)
                },
                hwbString: function () {
                    return e.hwbString(this.values.hwb, this.values.alpha)
                },
                keyword: function () {
                    return e.keyword(this.values.rgb, this.values.alpha)
                },
                rgbNumber: function () {
                    var a = this.values.rgb;
                    return a[0] << 16 | a[1] << 8 | a[2]
                },
                luminosity: function () {
                    for (var a = this.values.rgb, b = [], c = 0; c < a.length; c++) {
                        var d = a[c] / 255;
                        b[c] = d <= .03928 ? d / 12.92 : Math.pow((d + .055) / 1.055, 2.4)
                    }
                    return .2126 * b[0] + .7152 * b[1] + .0722 * b[2]
                },
                contrast: function (a) {
                    var b = this.luminosity(),
                        c = a.luminosity();
                    return b > c ? (b + .05) / (c + .05) : (c + .05) / (b + .05)
                },
                level: function (a) {
                    var b = this.contrast(a);
                    return b >= 7.1 ? "AAA" : b >= 4.5 ? "AA" : ""
                },
                dark: function () {
                    var a = this.values.rgb;
                    return (299 * a[0] + 587 * a[1] + 114 * a[2]) / 1e3 < 128
                },
                light: function () {
                    return !this.dark()
                },
                negate: function () {
                    for (var a = [], b = 0; b < 3; b++) a[b] = 255 - this.values.rgb[b];
                    return this.setValues("rgb", a), this
                },
                lighten: function (a) {
                    var b = this.values.hsl;
                    return b[2] += b[2] * a, this.setValues("hsl", b), this
                },
                darken: function (a) {
                    var b = this.values.hsl;
                    return b[2] -= b[2] * a, this.setValues("hsl", b), this
                },
                saturate: function (a) {
                    var b = this.values.hsl;
                    return b[1] += b[1] * a, this.setValues("hsl", b), this
                },
                desaturate: function (a) {
                    var b = this.values.hsl;
                    return b[1] -= b[1] * a, this.setValues("hsl", b), this
                },
                whiten: function (a) {
                    var b = this.values.hwb;
                    return b[1] += b[1] * a, this.setValues("hwb", b), this
                },
                blacken: function (a) {
                    var b = this.values.hwb;
                    return b[2] += b[2] * a, this.setValues("hwb", b), this
                },
                greyscale: function () {
                    var a = this.values.rgb,
                        b = .3 * a[0] + .59 * a[1] + .11 * a[2];
                    return this.setValues("rgb", [b, b, b]), this
                },
                clearer: function (a) {
                    var b = this.values.alpha;
                    return this.setValues("alpha", b - b * a), this
                },
                opaquer: function (a) {
                    var b = this.values.alpha;
                    return this.setValues("alpha", b + b * a), this
                },
                rotate: function (a) {
                    var b = this.values.hsl,
                        c = (b[0] + a) % 360;
                    return b[0] = c < 0 ? 360 + c : c, this.setValues("hsl", b), this
                },
                mix: function (a, b) {
                    var c = this,
                        d = a,
                        e = void 0 === b ? .5 : b,
                        f = 2 * e - 1,
                        g = c.alpha() - d.alpha(),
                        h = ((f * g == -1 ? f : (f + g) / (1 + f * g)) + 1) / 2,
                        i = 1 - h;
                    return this.rgb(h * c.red() + i * d.red(), h * c.green() + i * d.green(), h * c.blue() + i * d.blue()).alpha(c.alpha() * e + d.alpha() * (1 - e))
                },
                toJSON: function () {
                    return this.rgb()
                },
                clone: function () {
                    var a, b, c = new f,
                        d = this.values,
                        e = c.values;
                    for (var g in d) d.hasOwnProperty(g) && (a = d[g], b = {}.toString.call(a), "[object Array]" === b ? e[g] = a.slice(0) : "[object Number]" === b ? e[g] = a : console.error("unexpected color value:", a));
                    return c
                }
            }, f.prototype.spaces = {
                rgb: ["red", "green", "blue"],
                hsl: ["hue", "saturation", "lightness"],
                hsv: ["hue", "saturation", "value"],
                hwb: ["hue", "whiteness", "blackness"],
                cmyk: ["cyan", "magenta", "yellow", "black"]
            }, f.prototype.maxes = {
                rgb: [255, 255, 255],
                hsl: [360, 100, 100],
                hsv: [360, 100, 100],
                hwb: [360, 100, 100],
                cmyk: [100, 100, 100, 100]
            }, f.prototype.getValues = function (a) {
                for (var b = this.values, c = {}, d = 0; d < a.length; d++) c[a.charAt(d)] = b[a][d];
                return 1 !== b.alpha && (c.a = b.alpha), c
            }, f.prototype.setValues = function (a, b) {
                var c, e = this.values,
                    f = this.spaces,
                    g = this.maxes,
                    h = 1;
                if (this.valid = !0, "alpha" === a) h = b;
                else if (b.length) e[a] = b.slice(0, a.length), h = b[a.length];
                else if (void 0 !== b[a.charAt(0)]) {
                    for (c = 0; c < a.length; c++) e[a][c] = b[a.charAt(c)];
                    h = b.a
                } else if (void 0 !== b[f[a][0]]) {
                    var i = f[a];
                    for (c = 0; c < a.length; c++) e[a][c] = b[i[c]];
                    h = b.alpha
                }
                if (e.alpha = Math.max(0, Math.min(1, void 0 === h ? e.alpha : h)), "alpha" === a) return !1;
                var j;
                for (c = 0; c < a.length; c++) j = Math.max(0, Math.min(g[a][c], e[a][c])), e[a][c] = Math.round(j);
                for (var k in f) k !== a && (e[k] = d[a][k](e[a]));
                return !0
            }, f.prototype.setSpace = function (a, b) {
                var c = b[0];
                return void 0 === c ? this.getValues(a) : ("number" == typeof c && (c = Array.prototype.slice.call(b)), this.setValues(a, c), this)
            }, f.prototype.setChannel = function (a, b, c) {
                var d = this.values[a];
                return void 0 === c ? d[b] : c === d[b] ? this : (d[b] = c, this.setValues(a, d), this)
            }, "undefined" != typeof window && (window.Color = f), b.exports = f
        }, {
            1: 1,
            4: 4
        }],
        3: [function (a, c, d) {
            function e(a) {
                var b, c, d, e = a[0] / 255,
                    f = a[1] / 255,
                    g = a[2] / 255,
                    h = Math.min(e, f, g),
                    i = Math.max(e, f, g),
                    j = i - h;
                return i == h ? b = 0 : e == i ? b = (f - g) / j : f == i ? b = 2 + (g - e) / j : g == i && (b = 4 + (e - f) / j), b = Math.min(60 * b, 360), b < 0 && (b += 360), d = (h + i) / 2, c = i == h ? 0 : d <= .5 ? j / (i + h) : j / (2 - i - h), [b, 100 * c, 100 * d]
            }

            function f(a) {
                var b, c, d, e = a[0],
                    f = a[1],
                    g = a[2],
                    h = Math.min(e, f, g),
                    i = Math.max(e, f, g),
                    j = i - h;
                return c = 0 == i ? 0 : j / i * 1e3 / 10, i == h ? b = 0 : e == i ? b = (f - g) / j : f == i ? b = 2 + (g - e) / j : g == i && (b = 4 + (e - f) / j), b = Math.min(60 * b, 360), b < 0 && (b += 360), d = i / 255 * 1e3 / 10, [b, c, d]
            }

            function h(a) {
                var b = a[0],
                    c = a[1],
                    d = a[2],
                    f = e(a)[0],
                    g = 1 / 255 * Math.min(b, Math.min(c, d)),
                    d = 1 - 1 / 255 * Math.max(b, Math.max(c, d));
                return [f, 100 * g, 100 * d]
            }

            function i(a) {
                var b, c, d, e, f = a[0] / 255,
                    g = a[1] / 255,
                    h = a[2] / 255;
                return e = Math.min(1 - f, 1 - g, 1 - h), b = (1 - f - e) / (1 - e) || 0, c = (1 - g - e) / (1 - e) || 0, d = (1 - h - e) / (1 - e) || 0, [100 * b, 100 * c, 100 * d, 100 * e]
            }

            function j(a) {
                return Z[JSON.stringify(a)]
            }

            function k(a) {
                var b = a[0] / 255,
                    c = a[1] / 255,
                    d = a[2] / 255;
                return b = b > .04045 ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92, c = c > .04045 ? Math.pow((c + .055) / 1.055, 2.4) : c / 12.92, d = d > .04045 ? Math.pow((d + .055) / 1.055, 2.4) : d / 12.92, [100 * (.4124 * b + .3576 * c + .1805 * d), 100 * (.2126 * b + .7152 * c + .0722 * d), 100 * (.0193 * b + .1192 * c + .9505 * d)]
            }

            function l(a) {
                var b, c, d, e = k(a),
                    f = e[0],
                    g = e[1],
                    h = e[2];
                return f /= 95.047, g /= 100, h /= 108.883, f = f > .008856 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, g = g > .008856 ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116, h = h > .008856 ? Math.pow(h, 1 / 3) : 7.787 * h + 16 / 116, b = 116 * g - 16, c = 500 * (f - g), d = 200 * (g - h), [b, c, d]
            }

            function m(a) {
                return M(l(a))
            }

            function n(a) {
                var b, c, d, e, f, g = a[0] / 360,
                    h = a[1] / 100,
                    i = a[2] / 100;
                if (0 == h) return f = 255 * i, [f, f, f];
                c = i < .5 ? i * (1 + h) : i + h - i * h, b = 2 * i - c, e = [0, 0, 0];
                for (var j = 0; j < 3; j++) d = g + 1 / 3 * -(j - 1), d < 0 && d++, d > 1 && d--, f = 6 * d < 1 ? b + 6 * (c - b) * d : 2 * d < 1 ? c : 3 * d < 2 ? b + (c - b) * (2 / 3 - d) * 6 : b, e[j] = 255 * f;
                return e
            }

            function o(a) {
                var b, c, d = a[0],
                    e = a[1] / 100,
                    f = a[2] / 100;
                return 0 === f ? [0, 0, 0] : (f *= 2, e *= f <= 1 ? f : 2 - f, c = (f + e) / 2, b = 2 * e / (f + e), [d, 100 * b, 100 * c])
            }

            function p(a) {
                return h(n(a))
            }

            function q(a) {
                return i(n(a))
            }

            function s(a) {
                return j(n(a))
            }

            function t(a) {
                var b = a[0] / 60,
                    c = a[1] / 100,
                    d = a[2] / 100,
                    e = Math.floor(b) % 6,
                    f = b - Math.floor(b),
                    g = 255 * d * (1 - c),
                    h = 255 * d * (1 - c * f),
                    i = 255 * d * (1 - c * (1 - f)),
                    d = 255 * d;
                switch (e) {
                    case 0:
                        return [d, i, g];
                    case 1:
                        return [h, d, g];
                    case 2:
                        return [g, d, i];
                    case 3:
                        return [g, h, d];
                    case 4:
                        return [i, g, d];
                    case 5:
                        return [d, g, h]
                }
            }

            function u(a) {
                var b, c, d = a[0],
                    e = a[1] / 100,
                    f = a[2] / 100;
                return c = (2 - e) * f, b = e * f, b /= c <= 1 ? c : 2 - c, b = b || 0, c /= 2, [d, 100 * b, 100 * c]
            }

            function v(a) {
                return h(t(a))
            }

            function w(a) {
                return i(t(a))
            }

            function x(a) {
                return j(t(a))
            }

            function y(a) {
                var c, d, e, f, h = a[0] / 360,
                    i = a[1] / 100,
                    j = a[2] / 100,
                    k = i + j;
                switch (k > 1 && (i /= k, j /= k), c = Math.floor(6 * h), d = 1 - j, e = 6 * h - c, 0 != (1 & c) && (e = 1 - e), f = i + e * (d - i), c) {
                    default:
                    case 6:
                    case 0:
                        r = d, g = f, b = i;
                        break;
                    case 1:
                        r = f, g = d, b = i;
                        break;
                    case 2:
                        r = i, g = d, b = f;
                        break;
                    case 3:
                        r = i, g = f, b = d;
                        break;
                    case 4:
                        r = f, g = i, b = d;
                        break;
                    case 5:
                        r = d, g = i, b = f
                }
                return [255 * r, 255 * g, 255 * b]
            }

            function z(a) {
                return e(y(a))
            }

            function A(a) {
                return f(y(a))
            }

            function B(a) {
                return i(y(a))
            }

            function C(a) {
                return j(y(a))
            }

            function D(a) {
                var b, c, d, e = a[0] / 100,
                    f = a[1] / 100,
                    g = a[2] / 100,
                    h = a[3] / 100;
                return b = 1 - Math.min(1, e * (1 - h) + h), c = 1 - Math.min(1, f * (1 - h) + h), d = 1 - Math.min(1, g * (1 - h) + h), [255 * b, 255 * c, 255 * d]
            }

            function E(a) {
                return e(D(a))
            }

            function F(a) {
                return f(D(a))
            }

            function G(a) {
                return h(D(a))
            }

            function H(a) {
                return j(D(a))
            }

            function I(a) {
                var b, c, d, e = a[0] / 100,
                    f = a[1] / 100,
                    g = a[2] / 100;
                return b = 3.2406 * e + -1.5372 * f + -.4986 * g, c = -.9689 * e + 1.8758 * f + .0415 * g, d = .0557 * e + -.204 * f + 1.057 * g, b = b > .0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : b *= 12.92, c = c > .0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - .055 : c *= 12.92, d = d > .0031308 ? 1.055 * Math.pow(d, 1 / 2.4) - .055 : d *= 12.92, b = Math.min(Math.max(0, b), 1), c = Math.min(Math.max(0, c), 1), d = Math.min(Math.max(0, d), 1), [255 * b, 255 * c, 255 * d]
            }

            function J(a) {
                var b, c, d, e = a[0],
                    f = a[1],
                    g = a[2];
                return e /= 95.047, f /= 100, g /= 108.883, e = e > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, f = f > .008856 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, g = g > .008856 ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116, b = 116 * f - 16, c = 500 * (e - f), d = 200 * (f - g), [b, c, d]
            }

            function K(a) {
                return M(J(a))
            }

            function L(a) {
                var b, c, d, e, f = a[0],
                    g = a[1],
                    h = a[2];
                return f <= 8 ? (c = 100 * f / 903.3, e = c / 100 * 7.787 + 16 / 116) : (c = 100 * Math.pow((f + 16) / 116, 3), e = Math.pow(c / 100, 1 / 3)), b = b / 95.047 <= .008856 ? b = 95.047 * (g / 500 + e - 16 / 116) / 7.787 : 95.047 * Math.pow(g / 500 + e, 3), d = d / 108.883 <= .008859 ? d = 108.883 * (e - h / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(e - h / 200, 3), [b, c, d]
            }

            function M(a) {
                var b, c, d, e = a[0],
                    f = a[1],
                    g = a[2];
                return b = Math.atan2(g, f), c = 360 * b / 2 / Math.PI, c < 0 && (c += 360), d = Math.sqrt(f * f + g * g), [e, d, c]
            }

            function N(a) {
                return I(L(a))
            }

            function O(a) {
                var b, c, d, e = a[0],
                    f = a[1],
                    g = a[2];
                return d = g / 360 * 2 * Math.PI, b = f * Math.cos(d), c = f * Math.sin(d), [e, b, c]
            }

            function P(a) {
                return L(O(a))
            }

            function Q(a) {
                return N(O(a))
            }

            function R(a) {
                return Y[a]
            }

            function S(a) {
                return e(R(a))
            }

            function T(a) {
                return f(R(a))
            }

            function U(a) {
                return h(R(a))
            }

            function V(a) {
                return i(R(a))
            }

            function W(a) {
                return l(R(a))
            }

            function X(a) {
                return k(R(a))
            }
            c.exports = {
                rgb2hsl: e,
                rgb2hsv: f,
                rgb2hwb: h,
                rgb2cmyk: i,
                rgb2keyword: j,
                rgb2xyz: k,
                rgb2lab: l,
                rgb2lch: m,
                hsl2rgb: n,
                hsl2hsv: o,
                hsl2hwb: p,
                hsl2cmyk: q,
                hsl2keyword: s,
                hsv2rgb: t,
                hsv2hsl: u,
                hsv2hwb: v,
                hsv2cmyk: w,
                hsv2keyword: x,
                hwb2rgb: y,
                hwb2hsl: z,
                hwb2hsv: A,
                hwb2cmyk: B,
                hwb2keyword: C,
                cmyk2rgb: D,
                cmyk2hsl: E,
                cmyk2hsv: F,
                cmyk2hwb: G,
                cmyk2keyword: H,
                keyword2rgb: R,
                keyword2hsl: S,
                keyword2hsv: T,
                keyword2hwb: U,
                keyword2cmyk: V,
                keyword2lab: W,
                keyword2xyz: X,
                xyz2rgb: I,
                xyz2lab: J,
                xyz2lch: K,
                lab2xyz: L,
                lab2rgb: N,
                lab2lch: M,
                lch2lab: O,
                lch2xyz: P,
                lch2rgb: Q
            };
            var Y = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                },
                Z = {};
            for (var $ in Y) Z[JSON.stringify(Y[$])] = $
        }, {}],
        4: [function (a, b, c) {
            var d = a(3),
                e = function () {
                    return new j
                };
            for (var f in d) {
                e[f + "Raw"] = function (a) {
                    return function (b) {
                        return "number" == typeof b && (b = Array.prototype.slice.call(arguments)), d[a](b)
                    }
                }(f);
                var g = /(\w+)2(\w+)/.exec(f),
                    h = g[1],
                    i = g[2];
                e[h] = e[h] || {}, e[h][i] = e[f] = function (a) {
                    return function (b) {
                        "number" == typeof b && (b = Array.prototype.slice.call(arguments));
                        var c = d[a](b);
                        if ("string" == typeof c || void 0 === c) return c;
                        for (var e = 0; e < c.length; e++) c[e] = Math.round(c[e]);
                        return c
                    }
                }(f)
            }
            var j = function () {
                this.convs = {}
            };
            j.prototype.routeSpace = function (a, b) {
                var c = b[0];
                return void 0 === c ? this.getValues(a) : ("number" == typeof c && (c = Array.prototype.slice.call(b)), this.setValues(a, c))
            }, j.prototype.setValues = function (a, b) {
                return this.space = a, this.convs = {}, this.convs[a] = b, this
            }, j.prototype.getValues = function (a) {
                var b = this.convs[a];
                if (!b) {
                    var c = this.space,
                        d = this.convs[c];
                    b = e[c][a](d), this.convs[a] = b
                }
                return b
            }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (a) {
                j.prototype[a] = function (b) {
                    return this.routeSpace(a, arguments)
                }
            }), b.exports = e
        }, {
            3: 3
        }],
        5: [function (a, b, c) {
            "use strict";
            b.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            }
        }, {}],
        6: [function (b, c, d) {
            ! function (b, e) {
                "object" == typeof d && void 0 !== c ? c.exports = e() : "function" == typeof a && a.amd ? a(e) : b.moment = e()
            }(this, function () {
                "use strict";

                function a() {
                    return Bd.apply(null, arguments)
                }

                function d(a) {
                    return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a)
                }

                function e(a) {
                    return null != a && "[object Object]" === Object.prototype.toString.call(a)
                }

                function f(a) {
                    if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(a).length;
                    var b;
                    for (b in a)
                        if (a.hasOwnProperty(b)) return !1;
                    return !0
                }

                function g(a) {
                    return void 0 === a
                }

                function h(a) {
                    return "number" == typeof a || "[object Number]" === Object.prototype.toString.call(a)
                }

                function i(a) {
                    return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
                }

                function j(a, b) {
                    var c, d = [];
                    for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
                    return d
                }

                function k(a, b) {
                    return Object.prototype.hasOwnProperty.call(a, b)
                }

                function l(a, b) {
                    for (var c in b) k(b, c) && (a[c] = b[c]);
                    return k(b, "toString") && (a.toString = b.toString), k(b, "valueOf") && (a.valueOf = b.valueOf), a
                }

                function m(a, b, c, d) {
                    return zb(a, b, c, d, !0).utc()
                }

                function n() {
                    return {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidMonth: null,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1,
                        parsedDateParts: [],
                        meridiem: null,
                        rfc2822: !1,
                        weekdayMismatch: !1
                    }
                }

                function o(a) {
                    return null == a._pf && (a._pf = n()), a._pf
                }

                function p(a) {
                    if (null == a._isValid) {
                        var b = o(a),
                            c = Cd.call(b.parsedDateParts, function (a) {
                                return null != a
                            }),
                            d = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.weekdayMismatch && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c);
                        if (a._strict && (d = d && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour), null != Object.isFrozen && Object.isFrozen(a)) return d;
                        a._isValid = d
                    }
                    return a._isValid
                }

                function q(a) {
                    var b = m(NaN);
                    return null != a ? l(o(b), a) : o(b).userInvalidated = !0, b
                }

                function r(a, b) {
                    var c, d, e;
                    if (g(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), g(b._i) || (a._i = b._i), g(b._f) || (a._f = b._f), g(b._l) || (a._l = b._l), g(b._strict) || (a._strict = b._strict), g(b._tzm) || (a._tzm = b._tzm), g(b._isUTC) || (a._isUTC = b._isUTC), g(b._offset) || (a._offset = b._offset), g(b._pf) || (a._pf = o(b)), g(b._locale) || (a._locale = b._locale), Dd.length > 0)
                        for (c = 0; c < Dd.length; c++) d = Dd[c], e = b[d], g(e) || (a[d] = e);
                    return a
                }

                function s(b) {
                    r(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === Ed && (Ed = !0, a.updateOffset(this), Ed = !1)
                }

                function t(a) {
                    return a instanceof s || null != a && null != a._isAMomentObject
                }

                function u(a) {
                    return a < 0 ? Math.ceil(a) || 0 : Math.floor(a)
                }

                function v(a) {
                    var b = +a,
                        c = 0;
                    return 0 !== b && isFinite(b) && (c = u(b)), c
                }

                function w(a, b, c) {
                    var d, e = Math.min(a.length, b.length),
                        f = Math.abs(a.length - b.length),
                        g = 0;
                    for (d = 0; d < e; d++)(c && a[d] !== b[d] || !c && v(a[d]) !== v(b[d])) && g++;
                    return g + f
                }

                function x(b) {
                    !1 === a.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b)
                }

                function y(b, c) {
                    var d = !0;
                    return l(function () {
                        if (null != a.deprecationHandler && a.deprecationHandler(null, b), d) {
                            for (var e, f = [], g = 0; g < arguments.length; g++) {
                                if (e = "", "object" == typeof arguments[g]) {
                                    e += "\n[" + g + "] ";
                                    for (var h in arguments[0]) e += h + ": " + arguments[0][h] + ", ";
                                    e = e.slice(0, -2)
                                } else e = arguments[g];
                                f.push(e)
                            }
                            x(b + "\nArguments: " + Array.prototype.slice.call(f).join("") + "\n" + (new Error).stack), d = !1
                        }
                        return c.apply(this, arguments)
                    }, c)
                }

                function z(b, c) {
                    null != a.deprecationHandler && a.deprecationHandler(b, c), Fd[b] || (x(c), Fd[b] = !0)
                }

                function A(a) {
                    return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a)
                }

                function B(a) {
                    var b, c;
                    for (c in a) b = a[c], A(b) ? this[c] = b : this["_" + c] = b;
                    this._config = a, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
                }

                function C(a, b) {
                    var c, d = l({}, a);
                    for (c in b) k(b, c) && (e(a[c]) && e(b[c]) ? (d[c] = {}, l(d[c], a[c]), l(d[c], b[c])) : null != b[c] ? d[c] = b[c] : delete d[c]);
                    for (c in a) k(a, c) && !k(b, c) && e(a[c]) && (d[c] = l({}, d[c]));
                    return d
                }

                function D(a) {
                    null != a && this.set(a)
                }

                function E(a, b, c) {
                    var d = this._calendar[a] || this._calendar.sameElse;
                    return A(d) ? d.call(b, c) : d
                }

                function F(a) {
                    var b = this._longDateFormat[a],
                        c = this._longDateFormat[a.toUpperCase()];
                    return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
                        return a.slice(1)
                    }), this._longDateFormat[a])
                }

                function G() {
                    return this._invalidDate
                }

                function H(a) {
                    return this._ordinal.replace("%d", a)
                }

                function I(a, b, c, d) {
                    var e = this._relativeTime[c];
                    return A(e) ? e(a, b, c, d) : e.replace(/%d/i, a)
                }

                function J(a, b) {
                    var c = this._relativeTime[a > 0 ? "future" : "past"];
                    return A(c) ? c(b) : c.replace(/%s/i, b)
                }

                function K(a, b) {
                    var c = a.toLowerCase();
                    Ld[c] = Ld[c + "s"] = Ld[b] = a
                }

                function L(a) {
                    return "string" == typeof a ? Ld[a] || Ld[a.toLowerCase()] : void 0
                }

                function M(a) {
                    var b, c, d = {};
                    for (c in a) k(a, c) && (b = L(c)) && (d[b] = a[c]);
                    return d
                }

                function N(a, b) {
                    Md[a] = b
                }

                function O(a) {
                    var b = [];
                    for (var c in a) b.push({
                        unit: c,
                        priority: Md[c]
                    });
                    return b.sort(function (a, b) {
                        return a.priority - b.priority
                    }), b
                }

                function P(a, b, c) {
                    var d = "" + Math.abs(a),
                        e = b - d.length;
                    return (a >= 0 ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
                }

                function Q(a, b, c, d) {
                    var e = d;
                    "string" == typeof d && (e = function () {
                        return this[d]()
                    }), a && (Qd[a] = e), b && (Qd[b[0]] = function () {
                        return P(e.apply(this, arguments), b[1], b[2])
                    }), c && (Qd[c] = function () {
                        return this.localeData().ordinal(e.apply(this, arguments), a)
                    })
                }

                function R(a) {
                    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
                }

                function S(a) {
                    var b, c, d = a.match(Nd);
                    for (b = 0, c = d.length; b < c; b++) Qd[d[b]] ? d[b] = Qd[d[b]] : d[b] = R(d[b]);
                    return function (b) {
                        var e, f = "";
                        for (e = 0; e < c; e++) f += A(d[e]) ? d[e].call(b, a) : d[e];
                        return f
                    }
                }

                function T(a, b) {
                    return a.isValid() ? (b = U(b, a.localeData()), Pd[b] = Pd[b] || S(b), Pd[b](a)) : a.localeData().invalidDate()
                }

                function U(a, b) {
                    function c(a) {
                        return b.longDateFormat(a) || a
                    }
                    var d = 5;
                    for (Od.lastIndex = 0; d >= 0 && Od.test(a);) a = a.replace(Od, c), Od.lastIndex = 0, d -= 1;
                    return a
                }

                function V(a, b, c) {
                    ge[a] = A(b) ? b : function (a, d) {
                        return a && c ? c : b
                    }
                }

                function W(a, b) {
                    return k(ge, a) ? ge[a](b._strict, b._locale) : new RegExp(X(a))
                }

                function X(a) {
                    return Y(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
                        return b || c || d || e
                    }))
                }

                function Y(a) {
                    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }

                function Z(a, b) {
                    var c, d = b;
                    for ("string" == typeof a && (a = [a]), h(b) && (d = function (a, c) {
                            c[b] = v(a)
                        }), c = 0; c < a.length; c++) he[a[c]] = d
                }

                function $(a, b) {
                    Z(a, function (a, c, d, e) {
                        d._w = d._w || {}, b(a, d._w, d, e)
                    })
                }

                function _(a, b, c) {
                    null != b && k(he, a) && he[a](b, c._a, c, a)
                }

                function aa(a) {
                    return ba(a) ? 366 : 365
                }

                function ba(a) {
                    return a % 4 == 0 && a % 100 != 0 || a % 400 == 0
                }

                function ca() {
                    return ba(this.year())
                }

                function da(b, c) {
                    return function (d) {
                        return null != d ? (fa(this, b, d), a.updateOffset(this, c), this) : ea(this, b)
                    }
                }

                function ea(a, b) {
                    return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN
                }

                function fa(a, b, c) {
                    a.isValid() && !isNaN(c) && ("FullYear" === b && ba(a.year()) && 1 === a.month() && 29 === a.date() ? a._d["set" + (a._isUTC ? "UTC" : "") + b](c, a.month(), ja(c, a.month())) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c))
                }

                function ga(a) {
                    return a = L(a), A(this[a]) ? this[a]() : this
                }

                function ha(a, b) {
                    if ("object" == typeof a) {
                        a = M(a);
                        for (var c = O(a), d = 0; d < c.length; d++) this[c[d].unit](a[c[d].unit])
                    } else if (a = L(a), A(this[a])) return this[a](b);
                    return this
                }

                function ia(a, b) {
                    return (a % b + b) % b
                }

                function ja(a, b) {
                    if (isNaN(a) || isNaN(b)) return NaN;
                    var c = ia(b, 12);
                    return a += (b - c) / 12, 1 === c ? ba(a) ? 29 : 28 : 31 - c % 7 % 2
                }

                function ka(a, b) {
                    return a ? d(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || te).test(b) ? "format" : "standalone"][a.month()] : d(this._months) ? this._months : this._months.standalone
                }

                function la(a, b) {
                    return a ? d(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[te.test(b) ? "format" : "standalone"][a.month()] : d(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
                }

                function ma(a, b, c) {
                    var d, e, f, g = a.toLocaleLowerCase();
                    if (!this._monthsParse)
                        for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; d < 12; ++d) f = m([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
                    return c ? "MMM" === b ? (e = re.call(this._shortMonthsParse, g), -1 !== e ? e : null) : (e = re.call(this._longMonthsParse, g), -1 !== e ? e : null) : "MMM" === b ? -1 !== (e = re.call(this._shortMonthsParse, g)) ? e : (e = re.call(this._longMonthsParse, g), -1 !== e ? e : null) : -1 !== (e = re.call(this._longMonthsParse, g)) ? e : (e = re.call(this._shortMonthsParse, g), -1 !== e ? e : null)
                }

                function na(a, b, c) {
                    var d, e, f;
                    if (this._monthsParseExact) return ma.call(this, a, b, c);
                    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; d < 12; d++) {
                        if (e = m([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
                        if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
                        if (!c && this._monthsParse[d].test(a)) return d
                    }
                }

                function oa(a, b) {
                    var c;
                    if (!a.isValid()) return a;
                    if ("string" == typeof b)
                        if (/^\d+$/.test(b)) b = v(b);
                        else if (b = a.localeData().monthsParse(b), !h(b)) return a;
                    return c = Math.min(a.date(), ja(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a
                }

                function pa(b) {
                    return null != b ? (oa(this, b), a.updateOffset(this, !0), this) : ea(this, "Month")
                }

                function qa() {
                    return ja(this.year(), this.month())
                }

                function ra(a) {
                    return this._monthsParseExact ? (k(this, "_monthsRegex") || ta.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (k(this, "_monthsShortRegex") || (this._monthsShortRegex = we), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex)
                }

                function sa(a) {
                    return this._monthsParseExact ? (k(this, "_monthsRegex") || ta.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (k(this, "_monthsRegex") || (this._monthsRegex = xe), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex)
                }

                function ta() {
                    function a(a, b) {
                        return b.length - a.length
                    }
                    var b, c, d = [],
                        e = [],
                        f = [];
                    for (b = 0; b < 12; b++) c = m([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, ""));
                    for (d.sort(a), e.sort(a), f.sort(a), b = 0; b < 12; b++) d[b] = Y(d[b]), e[b] = Y(e[b]);
                    for (b = 0; b < 24; b++) f[b] = Y(f[b]);
                    this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i")
                }

                function ua(a, b, c, d, e, f, g) {
                    var h = new Date(a, b, c, d, e, f, g);
                    return a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h
                }

                function va(a) {
                    var b = new Date(Date.UTC.apply(null, arguments));
                    return a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b
                }

                function wa(a, b, c) {
                    var d = 7 + b - c;
                    return -(7 + va(a, 0, d).getUTCDay() - b) % 7 + d - 1
                }

                function xa(a, b, c, d, e) {
                    var f, g, h = (7 + c - d) % 7,
                        i = wa(a, d, e),
                        j = 1 + 7 * (b - 1) + h + i;
                    return j <= 0 ? (f = a - 1, g = aa(f) + j) : j > aa(a) ? (f = a + 1, g = j - aa(a)) : (f = a, g = j), {
                        year: f,
                        dayOfYear: g
                    }
                }

                function ya(a, b, c) {
                    var d, e, f = wa(a.year(), b, c),
                        g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
                    return g < 1 ? (e = a.year() - 1, d = g + za(e, b, c)) : g > za(a.year(), b, c) ? (d = g - za(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), {
                        week: d,
                        year: e
                    }
                }

                function za(a, b, c) {
                    var d = wa(a, b, c),
                        e = wa(a + 1, b, c);
                    return (aa(a) - d + e) / 7
                }

                function Aa(a) {
                    return ya(a, this._week.dow, this._week.doy).week
                }

                function Ba() {
                    return this._week.dow
                }

                function Ca() {
                    return this._week.doy
                }

                function Da(a) {
                    var b = this.localeData().week(this);
                    return null == a ? b : this.add(7 * (a - b), "d")
                }

                function Ea(a) {
                    var b = ya(this, 1, 4).week;
                    return null == a ? b : this.add(7 * (a - b), "d")
                }

                function Fa(a, b) {
                    return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10)
                }

                function Ga(a, b) {
                    return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a
                }

                function Ha(a, b) {
                    return a ? d(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] : d(this._weekdays) ? this._weekdays : this._weekdays.standalone
                }

                function Ia(a) {
                    return a ? this._weekdaysShort[a.day()] : this._weekdaysShort
                }

                function Ja(a) {
                    return a ? this._weekdaysMin[a.day()] : this._weekdaysMin
                }

                function Ka(a, b, c) {
                    var d, e, f, g = a.toLocaleLowerCase();
                    if (!this._weekdaysParse)
                        for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; d < 7; ++d) f = m([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
                    return c ? "dddd" === b ? (e = re.call(this._weekdaysParse, g), -1 !== e ? e : null) : "ddd" === b ? (e = re.call(this._shortWeekdaysParse, g), -1 !== e ? e : null) : (e = re.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : "dddd" === b ? -1 !== (e = re.call(this._weekdaysParse, g)) ? e : -1 !== (e = re.call(this._shortWeekdaysParse, g)) ? e : (e = re.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : "ddd" === b ? -1 !== (e = re.call(this._shortWeekdaysParse, g)) ? e : -1 !== (e = re.call(this._weekdaysParse, g)) ? e : (e = re.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : -1 !== (e = re.call(this._minWeekdaysParse, g)) ? e : -1 !== (e = re.call(this._weekdaysParse, g)) ? e : (e = re.call(this._shortWeekdaysParse, g), -1 !== e ? e : null)
                }

                function La(a, b, c) {
                    var d, e, f;
                    if (this._weekdaysParseExact) return Ka.call(this, a, b, c);
                    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; d < 7; d++) {
                        if (e = m([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
                        if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
                        if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
                        if (!c && this._weekdaysParse[d].test(a)) return d
                    }
                }

                function Ma(a) {
                    if (!this.isValid()) return null != a ? this : NaN;
                    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null != a ? (a = Fa(a, this.localeData()), this.add(a - b, "d")) : b
                }

                function Na(a) {
                    if (!this.isValid()) return null != a ? this : NaN;
                    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return null == a ? b : this.add(a - b, "d")
                }

                function Oa(a) {
                    if (!this.isValid()) return null != a ? this : NaN;
                    if (null != a) {
                        var b = Ga(a, this.localeData());
                        return this.day(this.day() % 7 ? b : b - 7)
                    }
                    return this.day() || 7
                }

                function Pa(a) {
                    return this._weekdaysParseExact ? (k(this, "_weekdaysRegex") || Sa.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (k(this, "_weekdaysRegex") || (this._weekdaysRegex = Ce), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex)
                }

                function Qa(a) {
                    return this._weekdaysParseExact ? (k(this, "_weekdaysRegex") || Sa.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (k(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = De), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
                }

                function Ra(a) {
                    return this._weekdaysParseExact ? (k(this, "_weekdaysRegex") || Sa.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (k(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ee), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
                }

                function Sa() {
                    function a(a, b) {
                        return b.length - a.length
                    }
                    var b, c, d, e, f, g = [],
                        h = [],
                        i = [],
                        j = [];
                    for (b = 0; b < 7; b++) c = m([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), h.push(e), i.push(f), j.push(d), j.push(e), j.push(f);
                    for (g.sort(a), h.sort(a), i.sort(a), j.sort(a), b = 0; b < 7; b++) h[b] = Y(h[b]), i[b] = Y(i[b]), j[b] = Y(j[b]);
                    this._weekdaysRegex = new RegExp("^(" + j.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i")
                }

                function Ta() {
                    return this.hours() % 12 || 12
                }

                function Ua() {
                    return this.hours() || 24
                }

                function Va(a, b) {
                    Q(a, 0, 0, function () {
                        return this.localeData().meridiem(this.hours(), this.minutes(), b)
                    })
                }

                function Wa(a, b) {
                    return b._meridiemParse
                }

                function Xa(a) {
                    return "p" === (a + "").toLowerCase().charAt(0)
                }

                function Ya(a, b, c) {
                    return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
                }

                function Za(a) {
                    return a ? a.toLowerCase().replace("_", "-") : a
                }

                function $a(a) {
                    for (var b, c, d, e, f = 0; f < a.length;) {
                        for (e = Za(a[f]).split("-"), b = e.length, c = Za(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                            if (d = _a(e.slice(0, b).join("-"))) return d;
                            if (c && c.length >= b && w(e, c, !0) >= b - 1) break;
                            b--
                        }
                        f++
                    }
                    return null
                }

                function _a(a) {
                    var d = null;
                    if (!Je[a] && void 0 !== c && c && c.exports) try {
                        d = Fe._abbr;
                        b("./locale/" + a), ab(d)
                    } catch (a) {}
                    return Je[a]
                }

                function ab(a, b) {
                    var c;
                    return a && (c = g(b) ? db(a) : bb(a, b)) && (Fe = c), Fe._abbr
                }

                function bb(a, b) {
                    if (null !== b) {
                        var c = Ie;
                        if (b.abbr = a, null != Je[a]) z("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = Je[a]._config;
                        else if (null != b.parentLocale) {
                            if (null == Je[b.parentLocale]) return Ke[b.parentLocale] || (Ke[b.parentLocale] = []), Ke[b.parentLocale].push({
                                name: a,
                                config: b
                            }), null;
                            c = Je[b.parentLocale]._config
                        }
                        return Je[a] = new D(C(c, b)), Ke[a] && Ke[a].forEach(function (a) {
                            bb(a.name, a.config)
                        }), ab(a), Je[a]
                    }
                    return delete Je[a], null
                }

                function cb(a, b) {
                    if (null != b) {
                        var c, d, e = Ie;
                        d = _a(a), null != d && (e = d._config), b = C(e, b), c = new D(b), c.parentLocale = Je[a], Je[a] = c, ab(a)
                    } else null != Je[a] && (null != Je[a].parentLocale ? Je[a] = Je[a].parentLocale : null != Je[a] && delete Je[a]);
                    return Je[a]
                }

                function db(a) {
                    var b;
                    if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Fe;
                    if (!d(a)) {
                        if (b = _a(a)) return b;
                        a = [a]
                    }
                    return $a(a)
                }

                function eb() {
                    return Gd(Je)
                }

                function fb(a) {
                    var b, c = a._a;
                    return c && -2 === o(a).overflow && (b = c[je] < 0 || c[je] > 11 ? je : c[ke] < 1 || c[ke] > ja(c[ie], c[je]) ? ke : c[le] < 0 || c[le] > 24 || 24 === c[le] && (0 !== c[me] || 0 !== c[ne] || 0 !== c[oe]) ? le : c[me] < 0 || c[me] > 59 ? me : c[ne] < 0 || c[ne] > 59 ? ne : c[oe] < 0 || c[oe] > 999 ? oe : -1, o(a)._overflowDayOfYear && (b < ie || b > ke) && (b = ke), o(a)._overflowWeeks && -1 === b && (b = pe), o(a)._overflowWeekday && -1 === b && (b = qe), o(a).overflow = b), a
                }

                function gb(a, b, c) {
                    return null != a ? a : null != b ? b : c
                }

                function hb(b) {
                    var c = new Date(a.now());
                    return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
                }

                function ib(a) {
                    var b, c, d, e, f, g = [];
                    if (!a._d) {
                        for (d = hb(a), a._w && null == a._a[ke] && null == a._a[je] && jb(a), null != a._dayOfYear && (f = gb(a._a[ie], d[ie]), (a._dayOfYear > aa(f) || 0 === a._dayOfYear) && (o(a)._overflowDayOfYear = !0), c = va(f, 0, a._dayOfYear), a._a[je] = c.getUTCMonth(), a._a[ke] = c.getUTCDate()), b = 0; b < 3 && null == a._a[b]; ++b) a._a[b] = g[b] = d[b];
                        for (; b < 7; b++) a._a[b] = g[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
                        24 === a._a[le] && 0 === a._a[me] && 0 === a._a[ne] && 0 === a._a[oe] && (a._nextDay = !0, a._a[le] = 0), a._d = (a._useUTC ? va : ua).apply(null, g), e = a._useUTC ? a._d.getUTCDay() : a._d.getDay(), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[le] = 24), a._w && void 0 !== a._w.d && a._w.d !== e && (o(a).weekdayMismatch = !0)
                    }
                }

                function jb(a) {
                    var b, c, d, e, f, g, h, i;
                    if (b = a._w, null != b.GG || null != b.W || null != b.E) f = 1, g = 4, c = gb(b.GG, a._a[ie], ya(Ab(), 1, 4).year), d = gb(b.W, 1), ((e = gb(b.E, 1)) < 1 || e > 7) && (i = !0);
                    else {
                        f = a._locale._week.dow, g = a._locale._week.doy;
                        var j = ya(Ab(), f, g);
                        c = gb(b.gg, a._a[ie], j.year), d = gb(b.w, j.week), null != b.d ? ((e = b.d) < 0 || e > 6) && (i = !0) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f
                    }
                    d < 1 || d > za(c, f, g) ? o(a)._overflowWeeks = !0 : null != i ? o(a)._overflowWeekday = !0 : (h = xa(c, d, e, f, g), a._a[ie] = h.year, a._dayOfYear = h.dayOfYear)
                }

                function kb(a) {
                    var b, c, d, e, f, g, h = a._i,
                        i = Le.exec(h) || Me.exec(h);
                    if (i) {
                        for (o(a).iso = !0, b = 0, c = Oe.length; b < c; b++)
                            if (Oe[b][1].exec(i[1])) {
                                e = Oe[b][0], d = !1 !== Oe[b][2];
                                break
                            } if (null == e) return void(a._isValid = !1);
                        if (i[3]) {
                            for (b = 0, c = Pe.length; b < c; b++)
                                if (Pe[b][1].exec(i[3])) {
                                    f = (i[2] || " ") + Pe[b][0];
                                    break
                                } if (null == f) return void(a._isValid = !1)
                        }
                        if (!d && null != f) return void(a._isValid = !1);
                        if (i[4]) {
                            if (!Ne.exec(i[4])) return void(a._isValid = !1);
                            g = "Z"
                        }
                        a._f = e + (f || "") + (g || ""), sb(a)
                    } else a._isValid = !1
                }

                function lb(a, b, c, d, e, f) {
                    var g = [mb(a), ve.indexOf(b), parseInt(c, 10), parseInt(d, 10), parseInt(e, 10)];
                    return f && g.push(parseInt(f, 10)), g
                }

                function mb(a) {
                    var b = parseInt(a, 10);
                    return b <= 49 ? 2e3 + b : b <= 999 ? 1900 + b : b
                }

                function nb(a) {
                    return a.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim()
                }

                function ob(a, b, c) {
                    if (a) {
                        if (Ae.indexOf(a) !== new Date(b[0], b[1], b[2]).getDay()) return o(c).weekdayMismatch = !0, c._isValid = !1, !1
                    }
                    return !0
                }

                function pb(a, b, c) {
                    if (a) return Se[a];
                    if (b) return 0;
                    var d = parseInt(c, 10),
                        e = d % 100;
                    return (d - e) / 100 * 60 + e
                }

                function qb(a) {
                    var b = Re.exec(nb(a._i));
                    if (b) {
                        var c = lb(b[4], b[3], b[2], b[5], b[6], b[7]);
                        if (!ob(b[1], c, a)) return;
                        a._a = c, a._tzm = pb(b[8], b[9], b[10]), a._d = va.apply(null, a._a), a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), o(a).rfc2822 = !0
                    } else a._isValid = !1
                }

                function rb(b) {
                    var c = Qe.exec(b._i);
                    if (null !== c) return void(b._d = new Date(+c[1]));
                    kb(b), !1 === b._isValid && (delete b._isValid, qb(b), !1 === b._isValid && (delete b._isValid, a.createFromInputFallback(b)))
                }

                function sb(b) {
                    if (b._f === a.ISO_8601) return void kb(b);
                    if (b._f === a.RFC_2822) return void qb(b);
                    b._a = [], o(b).empty = !0;
                    var c, d, e, f, g, h = "" + b._i,
                        i = h.length,
                        j = 0;
                    for (e = U(b._f, b._locale).match(Nd) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match(W(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && o(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), Qd[f] ? (d ? o(b).empty = !1 : o(b).unusedTokens.push(f), _(f, d, b)) : b._strict && !d && o(b).unusedTokens.push(f);
                    o(b).charsLeftOver = i - j, h.length > 0 && o(b).unusedInput.push(h), b._a[le] <= 12 && !0 === o(b).bigHour && b._a[le] > 0 && (o(b).bigHour = void 0), o(b).parsedDateParts = b._a.slice(0), o(b).meridiem = b._meridiem, b._a[le] = tb(b._locale, b._a[le], b._meridiem), ib(b), fb(b)
                }

                function tb(a, b, c) {
                    var d;
                    return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && b < 12 && (b += 12), d || 12 !== b || (b = 0), b) : b
                }

                function ub(a) {
                    var b, c, d, e, f;
                    if (0 === a._f.length) return o(a).invalidFormat = !0, void(a._d = new Date(NaN));
                    for (e = 0; e < a._f.length; e++) f = 0, b = r({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], sb(b), p(b) && (f += o(b).charsLeftOver, f += 10 * o(b).unusedTokens.length, o(b).score = f, (null == d || f < d) && (d = f, c = b));
                    l(a, c || b)
                }

                function vb(a) {
                    if (!a._d) {
                        var b = M(a._i);
                        a._a = j([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
                            return a && parseInt(a, 10)
                        }), ib(a)
                    }
                }

                function wb(a) {
                    var b = new s(fb(xb(a)));
                    return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b
                }

                function xb(a) {
                    var b = a._i,
                        c = a._f;
                    return a._locale = a._locale || db(a._l), null === b || void 0 === c && "" === b ? q({
                        nullInput: !0
                    }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), t(b) ? new s(fb(b)) : (i(b) ? a._d = b : d(c) ? ub(a) : c ? sb(a) : yb(a), p(a) || (a._d = null), a))
                }

                function yb(b) {
                    var c = b._i;
                    g(c) ? b._d = new Date(a.now()) : i(c) ? b._d = new Date(c.valueOf()) : "string" == typeof c ? rb(b) : d(c) ? (b._a = j(c.slice(0), function (a) {
                        return parseInt(a, 10)
                    }), ib(b)) : e(c) ? vb(b) : h(c) ? b._d = new Date(c) : a.createFromInputFallback(b)
                }

                function zb(a, b, c, g, h) {
                    var i = {};
                    return !0 !== c && !1 !== c || (g = c, c = void 0), (e(a) && f(a) || d(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = c, i._i = a, i._f = b, i._strict = g, wb(i)
                }

                function Ab(a, b, c, d) {
                    return zb(a, b, c, d, !1)
                }

                function Bb(a, b) {
                    var c, e;
                    if (1 === b.length && d(b[0]) && (b = b[0]), !b.length) return Ab();
                    for (c = b[0], e = 1; e < b.length; ++e) b[e].isValid() && !b[e][a](c) || (c = b[e]);
                    return c
                }

                function Cb() {
                    return Bb("isBefore", [].slice.call(arguments, 0))
                }

                function Db() {
                    return Bb("isAfter", [].slice.call(arguments, 0))
                }

                function Eb(a) {
                    for (var b in a)
                        if (-1 === re.call(We, b) || null != a[b] && isNaN(a[b])) return !1;
                    for (var c = !1, d = 0; d < We.length; ++d)
                        if (a[We[d]]) {
                            if (c) return !1;
                            parseFloat(a[We[d]]) !== v(a[We[d]]) && (c = !0)
                        } return !0
                }

                function Fb() {
                    return this._isValid
                }

                function Gb() {
                    return Zb(NaN)
                }

                function Hb(a) {
                    var b = M(a),
                        c = b.year || 0,
                        d = b.quarter || 0,
                        e = b.month || 0,
                        f = b.week || 0,
                        g = b.day || 0,
                        h = b.hour || 0,
                        i = b.minute || 0,
                        j = b.second || 0,
                        k = b.millisecond || 0;
                    this._isValid = Eb(b), this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = db(), this._bubble()
                }

                function Ib(a) {
                    return a instanceof Hb
                }

                function Jb(a) {
                    return a < 0 ? -1 * Math.round(-1 * a) : Math.round(a)
                }

                function Kb(a, b) {
                    Q(a, 0, 0, function () {
                        var a = this.utcOffset(),
                            c = "+";
                        return a < 0 && (a = -a, c = "-"), c + P(~~(a / 60), 2) + b + P(~~a % 60, 2)
                    })
                }

                function Lb(a, b) {
                    var c = (b || "").match(a);
                    if (null === c) return null;
                    var d = c[c.length - 1] || [],
                        e = (d + "").match(Xe) || ["-", 0, 0],
                        f = 60 * e[1] + v(e[2]);
                    return 0 === f ? 0 : "+" === e[0] ? f : -f
                }

                function Mb(b, c) {
                    var d, e;
                    return c._isUTC ? (d = c.clone(), e = (t(b) || i(b) ? b.valueOf() : Ab(b).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), a.updateOffset(d, !1), d) : Ab(b).local()
                }

                function Nb(a) {
                    return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
                }

                function Ob(b, c, d) {
                    var e, f = this._offset || 0;
                    if (!this.isValid()) return null != b ? this : NaN;
                    if (null != b) {
                        if ("string" == typeof b) {
                            if (null === (b = Lb(de, b))) return this
                        } else Math.abs(b) < 16 && !d && (b *= 60);
                        return !this._isUTC && c && (e = Nb(this)), this._offset = b, this._isUTC = !0, null != e && this.add(e, "m"), f !== b && (!c || this._changeInProgress ? cc(this, Zb(b - f, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this
                    }
                    return this._isUTC ? f : Nb(this)
                }

                function Pb(a, b) {
                    return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
                }

                function Qb(a) {
                    return this.utcOffset(0, a)
                }

                function Rb(a) {
                    return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Nb(this), "m")), this
                }

                function Sb() {
                    if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
                    else if ("string" == typeof this._i) {
                        var a = Lb(ce, this._i);
                        null != a ? this.utcOffset(a) : this.utcOffset(0, !0)
                    }
                    return this
                }

                function Tb(a) {
                    return !!this.isValid() && (a = a ? Ab(a).utcOffset() : 0, (this.utcOffset() - a) % 60 == 0)
                }

                function Ub() {
                    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                }

                function Vb() {
                    if (!g(this._isDSTShifted)) return this._isDSTShifted;
                    var a = {};
                    if (r(a, this),
                        a = xb(a), a._a) {
                        var b = a._isUTC ? m(a._a) : Ab(a._a);
                        this._isDSTShifted = this.isValid() && w(a._a, b.toArray()) > 0
                    } else this._isDSTShifted = !1;
                    return this._isDSTShifted
                }

                function Wb() {
                    return !!this.isValid() && !this._isUTC
                }

                function Xb() {
                    return !!this.isValid() && this._isUTC
                }

                function Yb() {
                    return !!this.isValid() && (this._isUTC && 0 === this._offset)
                }

                function Zb(a, b) {
                    var c, d, e, f = a,
                        g = null;
                    return Ib(a) ? f = {
                        ms: a._milliseconds,
                        d: a._days,
                        M: a._months
                    } : h(a) ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (g = Ye.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
                        y: 0,
                        d: v(g[ke]) * c,
                        h: v(g[le]) * c,
                        m: v(g[me]) * c,
                        s: v(g[ne]) * c,
                        ms: v(Jb(1e3 * g[oe])) * c
                    }) : (g = Ze.exec(a)) ? (c = "-" === g[1] ? -1 : (g[1], 1), f = {
                        y: $b(g[2], c),
                        M: $b(g[3], c),
                        w: $b(g[4], c),
                        d: $b(g[5], c),
                        h: $b(g[6], c),
                        m: $b(g[7], c),
                        s: $b(g[8], c)
                    }) : null == f ? f = {} : "object" == typeof f && ("from" in f || "to" in f) && (e = ac(Ab(f.from), Ab(f.to)), f = {}, f.ms = e.milliseconds, f.M = e.months), d = new Hb(f), Ib(a) && k(a, "_locale") && (d._locale = a._locale), d
                }

                function $b(a, b) {
                    var c = a && parseFloat(a.replace(",", "."));
                    return (isNaN(c) ? 0 : c) * b
                }

                function _b(a, b) {
                    var c = {
                        milliseconds: 0,
                        months: 0
                    };
                    return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
                }

                function ac(a, b) {
                    var c;
                    return a.isValid() && b.isValid() ? (b = Mb(b, a), a.isBefore(b) ? c = _b(a, b) : (c = _b(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
                        milliseconds: 0,
                        months: 0
                    }
                }

                function bc(a, b) {
                    return function (c, d) {
                        var e, f;
                        return null === d || isNaN(+d) || (z(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Zb(c, d), cc(this, e, a), this
                    }
                }

                function cc(b, c, d, e) {
                    var f = c._milliseconds,
                        g = Jb(c._days),
                        h = Jb(c._months);
                    b.isValid() && (e = null == e || e, h && oa(b, ea(b, "Month") + h * d), g && fa(b, "Date", ea(b, "Date") + g * d), f && b._d.setTime(b._d.valueOf() + f * d), e && a.updateOffset(b, g || h))
                }

                function dc(a, b) {
                    var c = a.diff(b, "days", !0);
                    return c < -6 ? "sameElse" : c < -1 ? "lastWeek" : c < 0 ? "lastDay" : c < 1 ? "sameDay" : c < 2 ? "nextDay" : c < 7 ? "nextWeek" : "sameElse"
                }

                function ec(b, c) {
                    var d = b || Ab(),
                        e = Mb(d, this).startOf("day"),
                        f = a.calendarFormat(this, e) || "sameElse",
                        g = c && (A(c[f]) ? c[f].call(this, d) : c[f]);
                    return this.format(g || this.localeData().calendar(f, this, Ab(d)))
                }

                function fc() {
                    return new s(this)
                }

                function gc(a, b) {
                    var c = t(a) ? a : Ab(a);
                    return !(!this.isValid() || !c.isValid()) && (b = L(g(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf())
                }

                function hc(a, b) {
                    var c = t(a) ? a : Ab(a);
                    return !(!this.isValid() || !c.isValid()) && (b = L(g(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf())
                }

                function ic(a, b, c, d) {
                    return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c))
                }

                function jc(a, b) {
                    var c, d = t(a) ? a : Ab(a);
                    return !(!this.isValid() || !d.isValid()) && (b = L(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf()))
                }

                function kc(a, b) {
                    return this.isSame(a, b) || this.isAfter(a, b)
                }

                function lc(a, b) {
                    return this.isSame(a, b) || this.isBefore(a, b)
                }

                function mc(a, b, c) {
                    var d, e, f;
                    if (!this.isValid()) return NaN;
                    if (d = Mb(a, this), !d.isValid()) return NaN;
                    switch (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = L(b)) {
                        case "year":
                            f = nc(this, d) / 12;
                            break;
                        case "month":
                            f = nc(this, d);
                            break;
                        case "quarter":
                            f = nc(this, d) / 3;
                            break;
                        case "second":
                            f = (this - d) / 1e3;
                            break;
                        case "minute":
                            f = (this - d) / 6e4;
                            break;
                        case "hour":
                            f = (this - d) / 36e5;
                            break;
                        case "day":
                            f = (this - d - e) / 864e5;
                            break;
                        case "week":
                            f = (this - d - e) / 6048e5;
                            break;
                        default:
                            f = this - d
                    }
                    return c ? f : u(f)
                }

                function nc(a, b) {
                    var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
                        f = a.clone().add(e, "months");
                    return b - f < 0 ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0
                }

                function oc() {
                    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                }

                function pc(a) {
                    if (!this.isValid()) return null;
                    var b = !0 !== a,
                        c = b ? this.clone().utc() : this;
                    return c.year() < 0 || c.year() > 9999 ? T(c, b ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : A(Date.prototype.toISOString) ? b ? this.toDate().toISOString() : new Date(this._d.valueOf()).toISOString().replace("Z", T(c, "Z")) : T(c, b ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                }

                function qc() {
                    if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
                    var a = "moment",
                        b = "";
                    this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", b = "Z");
                    var c = "[" + a + '("]',
                        d = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                        e = b + '[")]';
                    return this.format(c + d + "-MM-DD[T]HH:mm:ss.SSS" + e)
                }

                function rc(b) {
                    b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
                    var c = T(this, b);
                    return this.localeData().postformat(c)
                }

                function sc(a, b) {
                    return this.isValid() && (t(a) && a.isValid() || Ab(a).isValid()) ? Zb({
                        to: this,
                        from: a
                    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
                }

                function tc(a) {
                    return this.from(Ab(), a)
                }

                function uc(a, b) {
                    return this.isValid() && (t(a) && a.isValid() || Ab(a).isValid()) ? Zb({
                        from: this,
                        to: a
                    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
                }

                function vc(a) {
                    return this.to(Ab(), a)
                }

                function wc(a) {
                    var b;
                    return void 0 === a ? this._locale._abbr : (b = db(a), null != b && (this._locale = b), this)
                }

                function xc() {
                    return this._locale
                }

                function yc(a) {
                    switch (a = L(a)) {
                        case "year":
                            this.month(0);
                        case "quarter":
                        case "month":
                            this.date(1);
                        case "week":
                        case "isoWeek":
                        case "day":
                        case "date":
                            this.hours(0);
                        case "hour":
                            this.minutes(0);
                        case "minute":
                            this.seconds(0);
                        case "second":
                            this.milliseconds(0)
                    }
                    return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
                }

                function zc(a) {
                    return void 0 === (a = L(a)) || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"))
                }

                function Ac() {
                    return this._d.valueOf() - 6e4 * (this._offset || 0)
                }

                function Bc() {
                    return Math.floor(this.valueOf() / 1e3)
                }

                function Cc() {
                    return new Date(this.valueOf())
                }

                function Dc() {
                    var a = this;
                    return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
                }

                function Ec() {
                    var a = this;
                    return {
                        years: a.year(),
                        months: a.month(),
                        date: a.date(),
                        hours: a.hours(),
                        minutes: a.minutes(),
                        seconds: a.seconds(),
                        milliseconds: a.milliseconds()
                    }
                }

                function Fc() {
                    return this.isValid() ? this.toISOString() : null
                }

                function Gc() {
                    return p(this)
                }

                function Hc() {
                    return l({}, o(this))
                }

                function Ic() {
                    return o(this).overflow
                }

                function Jc() {
                    return {
                        input: this._i,
                        format: this._f,
                        locale: this._locale,
                        isUTC: this._isUTC,
                        strict: this._strict
                    }
                }

                function Kc(a, b) {
                    Q(0, [a, a.length], 0, b)
                }

                function Lc(a) {
                    return Pc.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
                }

                function Mc(a) {
                    return Pc.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4)
                }

                function Nc() {
                    return za(this.year(), 1, 4)
                }

                function Oc() {
                    var a = this.localeData()._week;
                    return za(this.year(), a.dow, a.doy)
                }

                function Pc(a, b, c, d, e) {
                    var f;
                    return null == a ? ya(this, d, e).year : (f = za(a, d, e), b > f && (b = f), Qc.call(this, a, b, c, d, e))
                }

                function Qc(a, b, c, d, e) {
                    var f = xa(a, b, c, d, e),
                        g = va(f.year, 0, f.dayOfYear);
                    return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this
                }

                function Rc(a) {
                    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
                }

                function Sc(a) {
                    var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                    return null == a ? b : this.add(a - b, "d")
                }

                function Tc(a, b) {
                    b[oe] = v(1e3 * ("0." + a))
                }

                function Uc() {
                    return this._isUTC ? "UTC" : ""
                }

                function Vc() {
                    return this._isUTC ? "Coordinated Universal Time" : ""
                }

                function Wc(a) {
                    return Ab(1e3 * a)
                }

                function Xc() {
                    return Ab.apply(null, arguments).parseZone()
                }

                function Yc(a) {
                    return a
                }

                function Zc(a, b, c, d) {
                    var e = db(),
                        f = m().set(d, b);
                    return e[c](f, a)
                }

                function $c(a, b, c) {
                    if (h(a) && (b = a, a = void 0), a = a || "", null != b) return Zc(a, b, c, "month");
                    var d, e = [];
                    for (d = 0; d < 12; d++) e[d] = Zc(a, d, c, "month");
                    return e
                }

                function _c(a, b, c, d) {
                    "boolean" == typeof a ? (h(b) && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, h(b) && (c = b, b = void 0), b = b || "");
                    var e = db(),
                        f = a ? e._week.dow : 0;
                    if (null != c) return Zc(b, (c + f) % 7, d, "day");
                    var g, i = [];
                    for (g = 0; g < 7; g++) i[g] = Zc(b, (g + f) % 7, d, "day");
                    return i
                }

                function ad(a, b) {
                    return $c(a, b, "months")
                }

                function bd(a, b) {
                    return $c(a, b, "monthsShort")
                }

                function cd(a, b, c) {
                    return _c(a, b, c, "weekdays")
                }

                function dd(a, b, c) {
                    return _c(a, b, c, "weekdaysShort")
                }

                function ed(a, b, c) {
                    return _c(a, b, c, "weekdaysMin")
                }

                function fd() {
                    var a = this._data;
                    return this._milliseconds = jf(this._milliseconds), this._days = jf(this._days), this._months = jf(this._months), a.milliseconds = jf(a.milliseconds), a.seconds = jf(a.seconds), a.minutes = jf(a.minutes), a.hours = jf(a.hours), a.months = jf(a.months), a.years = jf(a.years), this
                }

                function gd(a, b, c, d) {
                    var e = Zb(b, c);
                    return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble()
                }

                function hd(a, b) {
                    return gd(this, a, b, 1)
                }

                function id(a, b) {
                    return gd(this, a, b, -1)
                }

                function jd(a) {
                    return a < 0 ? Math.floor(a) : Math.ceil(a)
                }

                function kd() {
                    var a, b, c, d, e, f = this._milliseconds,
                        g = this._days,
                        h = this._months,
                        i = this._data;
                    return f >= 0 && g >= 0 && h >= 0 || f <= 0 && g <= 0 && h <= 0 || (f += 864e5 * jd(md(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = u(f / 1e3), i.seconds = a % 60, b = u(a / 60), i.minutes = b % 60, c = u(b / 60), i.hours = c % 24, g += u(c / 24), e = u(ld(g)), h += e, g -= jd(md(e)), d = u(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this
                }

                function ld(a) {
                    return 4800 * a / 146097
                }

                function md(a) {
                    return 146097 * a / 4800
                }

                function nd(a) {
                    if (!this.isValid()) return NaN;
                    var b, c, d = this._milliseconds;
                    if ("month" === (a = L(a)) || "year" === a) return b = this._days + d / 864e5, c = this._months + ld(b), "month" === a ? c : c / 12;
                    switch (b = this._days + Math.round(md(this._months)), a) {
                        case "week":
                            return b / 7 + d / 6048e5;
                        case "day":
                            return b + d / 864e5;
                        case "hour":
                            return 24 * b + d / 36e5;
                        case "minute":
                            return 1440 * b + d / 6e4;
                        case "second":
                            return 86400 * b + d / 1e3;
                        case "millisecond":
                            return Math.floor(864e5 * b) + d;
                        default:
                            throw new Error("Unknown unit " + a)
                    }
                }

                function od() {
                    return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12) : NaN
                }

                function pd(a) {
                    return function () {
                        return this.as(a)
                    }
                }

                function qd() {
                    return Zb(this)
                }

                function rd(a) {
                    return a = L(a), this.isValid() ? this[a + "s"]() : NaN
                }

                function sd(a) {
                    return function () {
                        return this.isValid() ? this._data[a] : NaN
                    }
                }

                function td() {
                    return u(this.days() / 7)
                }

                function ud(a, b, c, d, e) {
                    return e.relativeTime(b || 1, !!c, a, d)
                }

                function vd(a, b, c) {
                    var d = Zb(a).abs(),
                        e = zf(d.as("s")),
                        f = zf(d.as("m")),
                        g = zf(d.as("h")),
                        h = zf(d.as("d")),
                        i = zf(d.as("M")),
                        j = zf(d.as("y")),
                        k = e <= Af.ss && ["s", e] || e < Af.s && ["ss", e] || f <= 1 && ["m"] || f < Af.m && ["mm", f] || g <= 1 && ["h"] || g < Af.h && ["hh", g] || h <= 1 && ["d"] || h < Af.d && ["dd", h] || i <= 1 && ["M"] || i < Af.M && ["MM", i] || j <= 1 && ["y"] || ["yy", j];
                    return k[2] = b, k[3] = +a > 0, k[4] = c, ud.apply(null, k)
                }

                function wd(a) {
                    return void 0 === a ? zf : "function" == typeof a && (zf = a, !0)
                }

                function xd(a, b) {
                    return void 0 !== Af[a] && (void 0 === b ? Af[a] : (Af[a] = b, "s" === a && (Af.ss = b - 1), !0))
                }

                function yd(a) {
                    if (!this.isValid()) return this.localeData().invalidDate();
                    var b = this.localeData(),
                        c = vd(this, !a, b);
                    return a && (c = b.pastFuture(+this, c)), b.postformat(c)
                }

                function zd(a) {
                    return (a > 0) - (a < 0) || +a
                }

                function Ad() {
                    if (!this.isValid()) return this.localeData().invalidDate();
                    var a, b, c, d = Bf(this._milliseconds) / 1e3,
                        e = Bf(this._days),
                        f = Bf(this._months);
                    a = u(d / 60), b = u(a / 60), d %= 60, a %= 60, c = u(f / 12), f %= 12;
                    var g = c,
                        h = f,
                        i = e,
                        j = b,
                        k = a,
                        l = d ? d.toFixed(3).replace(/\.?0+$/, "") : "",
                        m = this.asSeconds();
                    if (!m) return "P0D";
                    var n = m < 0 ? "-" : "",
                        o = zd(this._months) !== zd(m) ? "-" : "",
                        p = zd(this._days) !== zd(m) ? "-" : "",
                        q = zd(this._milliseconds) !== zd(m) ? "-" : "";
                    return n + "P" + (g ? o + g + "Y" : "") + (h ? o + h + "M" : "") + (i ? p + i + "D" : "") + (j || k || l ? "T" : "") + (j ? q + j + "H" : "") + (k ? q + k + "M" : "") + (l ? q + l + "S" : "")
                }
                var Bd, Cd;
                Cd = Array.prototype.some ? Array.prototype.some : function (a) {
                    for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++)
                        if (d in b && a.call(this, b[d], d, b)) return !0;
                    return !1
                };
                var Dd = a.momentProperties = [],
                    Ed = !1,
                    Fd = {};
                a.suppressDeprecationWarnings = !1, a.deprecationHandler = null;
                var Gd;
                Gd = Object.keys ? Object.keys : function (a) {
                    var b, c = [];
                    for (b in a) k(a, b) && c.push(b);
                    return c
                };
                var Hd = {
                        sameDay: "[Today at] LT",
                        nextDay: "[Tomorrow at] LT",
                        nextWeek: "dddd [at] LT",
                        lastDay: "[Yesterday at] LT",
                        lastWeek: "[Last] dddd [at] LT",
                        sameElse: "L"
                    },
                    Id = {
                        LTS: "h:mm:ss A",
                        LT: "h:mm A",
                        L: "MM/DD/YYYY",
                        LL: "MMMM D, YYYY",
                        LLL: "MMMM D, YYYY h:mm A",
                        LLLL: "dddd, MMMM D, YYYY h:mm A"
                    },
                    Jd = /\d{1,2}/,
                    Kd = {
                        future: "in %s",
                        past: "%s ago",
                        s: "a few seconds",
                        ss: "%d seconds",
                        m: "a minute",
                        mm: "%d minutes",
                        h: "an hour",
                        hh: "%d hours",
                        d: "a day",
                        dd: "%d days",
                        M: "a month",
                        MM: "%d months",
                        y: "a year",
                        yy: "%d years"
                    },
                    Ld = {},
                    Md = {},
                    Nd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                    Od = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                    Pd = {},
                    Qd = {},
                    Rd = /\d/,
                    Sd = /\d\d/,
                    Td = /\d{3}/,
                    Ud = /\d{4}/,
                    Vd = /[+-]?\d{6}/,
                    Wd = /\d\d?/,
                    Xd = /\d\d\d\d?/,
                    Yd = /\d\d\d\d\d\d?/,
                    Zd = /\d{1,3}/,
                    $d = /\d{1,4}/,
                    _d = /[+-]?\d{1,6}/,
                    ae = /\d+/,
                    be = /[+-]?\d+/,
                    ce = /Z|[+-]\d\d:?\d\d/gi,
                    de = /Z|[+-]\d\d(?::?\d\d)?/gi,
                    ee = /[+-]?\d+(\.\d{1,3})?/,
                    fe = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
                    ge = {},
                    he = {},
                    ie = 0,
                    je = 1,
                    ke = 2,
                    le = 3,
                    me = 4,
                    ne = 5,
                    oe = 6,
                    pe = 7,
                    qe = 8;
                Q("Y", 0, 0, function () {
                    var a = this.year();
                    return a <= 9999 ? "" + a : "+" + a
                }), Q(0, ["YY", 2], 0, function () {
                    return this.year() % 100
                }), Q(0, ["YYYY", 4], 0, "year"), Q(0, ["YYYYY", 5], 0, "year"), Q(0, ["YYYYYY", 6, !0], 0, "year"), K("year", "y"), N("year", 1), V("Y", be), V("YY", Wd, Sd), V("YYYY", $d, Ud), V("YYYYY", _d, Vd), V("YYYYYY", _d, Vd), Z(["YYYYY", "YYYYYY"], ie), Z("YYYY", function (b, c) {
                    c[ie] = 2 === b.length ? a.parseTwoDigitYear(b) : v(b)
                }), Z("YY", function (b, c) {
                    c[ie] = a.parseTwoDigitYear(b)
                }), Z("Y", function (a, b) {
                    b[ie] = parseInt(a, 10)
                }), a.parseTwoDigitYear = function (a) {
                    return v(a) + (v(a) > 68 ? 1900 : 2e3)
                };
                var re, se = da("FullYear", !0);
                re = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
                    var b;
                    for (b = 0; b < this.length; ++b)
                        if (this[b] === a) return b;
                    return -1
                }, Q("M", ["MM", 2], "Mo", function () {
                    return this.month() + 1
                }), Q("MMM", 0, 0, function (a) {
                    return this.localeData().monthsShort(this, a)
                }), Q("MMMM", 0, 0, function (a) {
                    return this.localeData().months(this, a)
                }), K("month", "M"), N("month", 8), V("M", Wd), V("MM", Wd, Sd), V("MMM", function (a, b) {
                    return b.monthsShortRegex(a)
                }), V("MMMM", function (a, b) {
                    return b.monthsRegex(a)
                }), Z(["M", "MM"], function (a, b) {
                    b[je] = v(a) - 1
                }), Z(["MMM", "MMMM"], function (a, b, c, d) {
                    var e = c._locale.monthsParse(a, d, c._strict);
                    null != e ? b[je] = e : o(c).invalidMonth = a
                });
                var te = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
                    ue = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                    ve = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
                    we = fe,
                    xe = fe;
                Q("w", ["ww", 2], "wo", "week"), Q("W", ["WW", 2], "Wo", "isoWeek"), K("week", "w"), K("isoWeek", "W"), N("week", 5), N("isoWeek", 5), V("w", Wd), V("ww", Wd, Sd), V("W", Wd), V("WW", Wd, Sd), $(["w", "ww", "W", "WW"], function (a, b, c, d) {
                    b[d.substr(0, 1)] = v(a)
                });
                var ye = {
                    dow: 0,
                    doy: 6
                };
                Q("d", 0, "do", "day"), Q("dd", 0, 0, function (a) {
                    return this.localeData().weekdaysMin(this, a)
                }), Q("ddd", 0, 0, function (a) {
                    return this.localeData().weekdaysShort(this, a)
                }), Q("dddd", 0, 0, function (a) {
                    return this.localeData().weekdays(this, a)
                }), Q("e", 0, 0, "weekday"), Q("E", 0, 0, "isoWeekday"), K("day", "d"), K("weekday", "e"), K("isoWeekday", "E"), N("day", 11), N("weekday", 11), N("isoWeekday", 11), V("d", Wd), V("e", Wd), V("E", Wd), V("dd", function (a, b) {
                    return b.weekdaysMinRegex(a)
                }), V("ddd", function (a, b) {
                    return b.weekdaysShortRegex(a)
                }), V("dddd", function (a, b) {
                    return b.weekdaysRegex(a)
                }), $(["dd", "ddd", "dddd"], function (a, b, c, d) {
                    var e = c._locale.weekdaysParse(a, d, c._strict);
                    null != e ? b.d = e : o(c).invalidWeekday = a
                }), $(["d", "e", "E"], function (a, b, c, d) {
                    b[d] = v(a)
                });
                var ze = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                    Ae = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                    Be = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
                    Ce = fe,
                    De = fe,
                    Ee = fe;
                Q("H", ["HH", 2], 0, "hour"), Q("h", ["hh", 2], 0, Ta), Q("k", ["kk", 2], 0, Ua), Q("hmm", 0, 0, function () {
                    return "" + Ta.apply(this) + P(this.minutes(), 2)
                }), Q("hmmss", 0, 0, function () {
                    return "" + Ta.apply(this) + P(this.minutes(), 2) + P(this.seconds(), 2)
                }), Q("Hmm", 0, 0, function () {
                    return "" + this.hours() + P(this.minutes(), 2)
                }), Q("Hmmss", 0, 0, function () {
                    return "" + this.hours() + P(this.minutes(), 2) + P(this.seconds(), 2)
                }), Va("a", !0), Va("A", !1), K("hour", "h"), N("hour", 13), V("a", Wa), V("A", Wa), V("H", Wd), V("h", Wd), V("k", Wd), V("HH", Wd, Sd), V("hh", Wd, Sd), V("kk", Wd, Sd), V("hmm", Xd), V("hmmss", Yd), V("Hmm", Xd), V("Hmmss", Yd), Z(["H", "HH"], le), Z(["k", "kk"], function (a, b, c) {
                    var d = v(a);
                    b[le] = 24 === d ? 0 : d
                }), Z(["a", "A"], function (a, b, c) {
                    c._isPm = c._locale.isPM(a), c._meridiem = a
                }), Z(["h", "hh"], function (a, b, c) {
                    b[le] = v(a), o(c).bigHour = !0
                }), Z("hmm", function (a, b, c) {
                    var d = a.length - 2;
                    b[le] = v(a.substr(0, d)), b[me] = v(a.substr(d)), o(c).bigHour = !0
                }), Z("hmmss", function (a, b, c) {
                    var d = a.length - 4,
                        e = a.length - 2;
                    b[le] = v(a.substr(0, d)), b[me] = v(a.substr(d, 2)), b[ne] = v(a.substr(e)), o(c).bigHour = !0
                }), Z("Hmm", function (a, b, c) {
                    var d = a.length - 2;
                    b[le] = v(a.substr(0, d)), b[me] = v(a.substr(d))
                }), Z("Hmmss", function (a, b, c) {
                    var d = a.length - 4,
                        e = a.length - 2;
                    b[le] = v(a.substr(0, d)), b[me] = v(a.substr(d, 2)), b[ne] = v(a.substr(e))
                });
                var Fe, Ge = /[ap]\.?m?\.?/i,
                    He = da("Hours", !0),
                    Ie = {
                        calendar: Hd,
                        longDateFormat: Id,
                        invalidDate: "Invalid date",
                        ordinal: "%d",
                        dayOfMonthOrdinalParse: Jd,
                        relativeTime: Kd,
                        months: ue,
                        monthsShort: ve,
                        week: ye,
                        weekdays: ze,
                        weekdaysMin: Be,
                        weekdaysShort: Ae,
                        meridiemParse: Ge
                    },
                    Je = {},
                    Ke = {},
                    Le = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    Me = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    Ne = /Z|[+-]\d\d(?::?\d\d)?/,
                    Oe = [
                        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                        ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                        ["YYYY-DDD", /\d{4}-\d{3}/],
                        ["YYYY-MM", /\d{4}-\d\d/, !1],
                        ["YYYYYYMMDD", /[+-]\d{10}/],
                        ["YYYYMMDD", /\d{8}/],
                        ["GGGG[W]WWE", /\d{4}W\d{3}/],
                        ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                        ["YYYYDDD", /\d{7}/]
                    ],
                    Pe = [
                        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                        ["HH:mm", /\d\d:\d\d/],
                        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                        ["HHmmss", /\d\d\d\d\d\d/],
                        ["HHmm", /\d\d\d\d/],
                        ["HH", /\d\d/]
                    ],
                    Qe = /^\/?Date\((\-?\d+)/i,
                    Re = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
                    Se = {
                        UT: 0,
                        GMT: 0,
                        EDT: -240,
                        EST: -300,
                        CDT: -300,
                        CST: -360,
                        MDT: -360,
                        MST: -420,
                        PDT: -420,
                        PST: -480
                    };
                a.createFromInputFallback = y("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) {
                    a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
                }), a.ISO_8601 = function () {}, a.RFC_2822 = function () {};
                var Te = y("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                        var a = Ab.apply(null, arguments);
                        return this.isValid() && a.isValid() ? a < this ? this : a : q()
                    }),
                    Ue = y("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                        var a = Ab.apply(null, arguments);
                        return this.isValid() && a.isValid() ? a > this ? this : a : q()
                    }),
                    Ve = function () {
                        return Date.now ? Date.now() : +new Date
                    },
                    We = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
                Kb("Z", ":"), Kb("ZZ", ""), V("Z", de), V("ZZ", de), Z(["Z", "ZZ"], function (a, b, c) {
                    c._useUTC = !0, c._tzm = Lb(de, a)
                });
                var Xe = /([\+\-]|\d\d)/gi;
                a.updateOffset = function () {};
                var Ye = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
                    Ze = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
                Zb.fn = Hb.prototype, Zb.invalid = Gb;
                var $e = bc(1, "add"),
                    _e = bc(-1, "subtract");
                a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
                var af = y("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
                    return void 0 === a ? this.localeData() : this.locale(a)
                });
                Q(0, ["gg", 2], 0, function () {
                    return this.weekYear() % 100
                }), Q(0, ["GG", 2], 0, function () {
                    return this.isoWeekYear() % 100
                }), Kc("gggg", "weekYear"), Kc("ggggg", "weekYear"), Kc("GGGG", "isoWeekYear"), Kc("GGGGG", "isoWeekYear"), K("weekYear", "gg"), K("isoWeekYear", "GG"), N("weekYear", 1), N("isoWeekYear", 1), V("G", be), V("g", be), V("GG", Wd, Sd), V("gg", Wd, Sd), V("GGGG", $d, Ud), V("gggg", $d, Ud), V("GGGGG", _d, Vd), V("ggggg", _d, Vd), $(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
                    b[d.substr(0, 2)] = v(a)
                }), $(["gg", "GG"], function (b, c, d, e) {
                    c[e] = a.parseTwoDigitYear(b)
                }), Q("Q", 0, "Qo", "quarter"), K("quarter", "Q"), N("quarter", 7), V("Q", Rd), Z("Q", function (a, b) {
                    b[je] = 3 * (v(a) - 1)
                }), Q("D", ["DD", 2], "Do", "date"), K("date", "D"), N("date", 9), V("D", Wd), V("DD", Wd, Sd), V("Do", function (a, b) {
                    return a ? b._dayOfMonthOrdinalParse || b._ordinalParse : b._dayOfMonthOrdinalParseLenient
                }), Z(["D", "DD"], ke), Z("Do", function (a, b) {
                    b[ke] = v(a.match(Wd)[0])
                });
                var bf = da("Date", !0);
                Q("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), K("dayOfYear", "DDD"), N("dayOfYear", 4), V("DDD", Zd), V("DDDD", Td), Z(["DDD", "DDDD"], function (a, b, c) {
                    c._dayOfYear = v(a)
                }), Q("m", ["mm", 2], 0, "minute"), K("minute", "m"), N("minute", 14), V("m", Wd), V("mm", Wd, Sd), Z(["m", "mm"], me);
                var cf = da("Minutes", !1);
                Q("s", ["ss", 2], 0, "second"), K("second", "s"), N("second", 15), V("s", Wd), V("ss", Wd, Sd), Z(["s", "ss"], ne);
                var df = da("Seconds", !1);
                Q("S", 0, 0, function () {
                    return ~~(this.millisecond() / 100)
                }), Q(0, ["SS", 2], 0, function () {
                    return ~~(this.millisecond() / 10)
                }), Q(0, ["SSS", 3], 0, "millisecond"), Q(0, ["SSSS", 4], 0, function () {
                    return 10 * this.millisecond()
                }), Q(0, ["SSSSS", 5], 0, function () {
                    return 100 * this.millisecond()
                }), Q(0, ["SSSSSS", 6], 0, function () {
                    return 1e3 * this.millisecond()
                }), Q(0, ["SSSSSSS", 7], 0, function () {
                    return 1e4 * this.millisecond()
                }), Q(0, ["SSSSSSSS", 8], 0, function () {
                    return 1e5 * this.millisecond()
                }), Q(0, ["SSSSSSSSS", 9], 0, function () {
                    return 1e6 * this.millisecond()
                }), K("millisecond", "ms"), N("millisecond", 16), V("S", Zd, Rd), V("SS", Zd, Sd), V("SSS", Zd, Td);
                var ef;
                for (ef = "SSSS"; ef.length <= 9; ef += "S") V(ef, ae);
                for (ef = "S"; ef.length <= 9; ef += "S") Z(ef, Tc);
                var ff = da("Milliseconds", !1);
                Q("z", 0, 0, "zoneAbbr"), Q("zz", 0, 0, "zoneName");
                var gf = s.prototype;
                gf.add = $e, gf.calendar = ec, gf.clone = fc, gf.diff = mc, gf.endOf = zc, gf.format = rc, gf.from = sc, gf.fromNow = tc, gf.to = uc, gf.toNow = vc, gf.get = ga, gf.invalidAt = Ic, gf.isAfter = gc, gf.isBefore = hc, gf.isBetween = ic, gf.isSame = jc, gf.isSameOrAfter = kc, gf.isSameOrBefore = lc, gf.isValid = Gc, gf.lang = af, gf.locale = wc, gf.localeData = xc, gf.max = Ue, gf.min = Te, gf.parsingFlags = Hc, gf.set = ha, gf.startOf = yc, gf.subtract = _e, gf.toArray = Dc, gf.toObject = Ec, gf.toDate = Cc, gf.toISOString = pc, gf.inspect = qc, gf.toJSON = Fc, gf.toString = oc, gf.unix = Bc, gf.valueOf = Ac, gf.creationData = Jc, gf.year = se, gf.isLeapYear = ca, gf.weekYear = Lc, gf.isoWeekYear = Mc, gf.quarter = gf.quarters = Rc, gf.month = pa, gf.daysInMonth = qa, gf.week = gf.weeks = Da, gf.isoWeek = gf.isoWeeks = Ea, gf.weeksInYear = Oc, gf.isoWeeksInYear = Nc, gf.date = bf, gf.day = gf.days = Ma, gf.weekday = Na, gf.isoWeekday = Oa, gf.dayOfYear = Sc, gf.hour = gf.hours = He, gf.minute = gf.minutes = cf, gf.second = gf.seconds = df, gf.millisecond = gf.milliseconds = ff, gf.utcOffset = Ob, gf.utc = Qb, gf.local = Rb, gf.parseZone = Sb, gf.hasAlignedHourOffset = Tb, gf.isDST = Ub, gf.isLocal = Wb, gf.isUtcOffset = Xb, gf.isUtc = Yb, gf.isUTC = Yb, gf.zoneAbbr = Uc, gf.zoneName = Vc, gf.dates = y("dates accessor is deprecated. Use date instead.", bf), gf.months = y("months accessor is deprecated. Use month instead", pa), gf.years = y("years accessor is deprecated. Use year instead", se), gf.zone = y("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Pb), gf.isDSTShifted = y("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Vb);
                var hf = D.prototype;
                hf.calendar = E, hf.longDateFormat = F, hf.invalidDate = G, hf.ordinal = H, hf.preparse = Yc, hf.postformat = Yc, hf.relativeTime = I, hf.pastFuture = J, hf.set = B, hf.months = ka, hf.monthsShort = la, hf.monthsParse = na, hf.monthsRegex = sa, hf.monthsShortRegex = ra, hf.week = Aa, hf.firstDayOfYear = Ca, hf.firstDayOfWeek = Ba, hf.weekdays = Ha, hf.weekdaysMin = Ja, hf.weekdaysShort = Ia, hf.weekdaysParse = La, hf.weekdaysRegex = Pa, hf.weekdaysShortRegex = Qa, hf.weekdaysMinRegex = Ra, hf.isPM = Xa, hf.meridiem = Ya, ab("en", {
                    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function (a) {
                        var b = a % 10;
                        return a + (1 === v(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th")
                    }
                }), a.lang = y("moment.lang is deprecated. Use moment.locale instead.", ab), a.langData = y("moment.langData is deprecated. Use moment.localeData instead.", db);
                var jf = Math.abs,
                    kf = pd("ms"),
                    lf = pd("s"),
                    mf = pd("m"),
                    nf = pd("h"),
                    of = pd("d"),
                    pf = pd("w"),
                    qf = pd("M"),
                    rf = pd("y"),
                    sf = sd("milliseconds"),
                    tf = sd("seconds"),
                    uf = sd("minutes"),
                    vf = sd("hours"),
                    wf = sd("days"),
                    xf = sd("months"),
                    yf = sd("years"),
                    zf = Math.round,
                    Af = {
                        ss: 44,
                        s: 45,
                        m: 45,
                        h: 22,
                        d: 26,
                        M: 11
                    },
                    Bf = Math.abs,
                    Cf = Hb.prototype;
                return Cf.isValid = Fb, Cf.abs = fd, Cf.add = hd, Cf.subtract = id, Cf.as = nd, Cf.asMilliseconds = kf, Cf.asSeconds = lf, Cf.asMinutes = mf, Cf.asHours = nf, Cf.asDays = of , Cf.asWeeks = pf, Cf.asMonths = qf, Cf.asYears = rf, Cf.valueOf = od, Cf._bubble = kd, Cf.clone = qd, Cf.get = rd, Cf.milliseconds = sf, Cf.seconds = tf, Cf.minutes = uf, Cf.hours = vf, Cf.days = wf, Cf.weeks = td, Cf.months = xf, Cf.years = yf, Cf.humanize = yd, Cf.toISOString = Ad, Cf.toString = Ad, Cf.toJSON = Ad, Cf.locale = wc, Cf.localeData = xc, Cf.toIsoString = y("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Ad), Cf.lang = af, Q("X", 0, 0, "unix"), Q("x", 0, 0, "valueOf"), V("x", be), V("X", ee), Z("X", function (a, b, c) {
                        c._d = new Date(1e3 * parseFloat(a, 10))
                    }), Z("x", function (a, b, c) {
                        c._d = new Date(v(a))
                    }), a.version = "2.20.1",
                    function (a) {
                        Bd = a
                    }(Ab), a.fn = gf, a.min = Cb, a.max = Db, a.now = Ve, a.utc = m, a.unix = Wc, a.months = ad, a.isDate = i, a.locale = ab, a.invalid = q, a.duration = Zb, a.isMoment = t, a.weekdays = cd, a.parseZone = Xc, a.localeData = db, a.isDuration = Ib, a.monthsShort = bd, a.weekdaysMin = ed, a.defineLocale = bb, a.updateLocale = cb, a.locales = eb, a.weekdaysShort = dd, a.normalizeUnits = L, a.relativeTimeRounding = wd, a.relativeTimeThreshold = xd, a.calendarFormat = dc, a.prototype = gf, a.HTML5_FMT = {
                        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
                        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
                        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
                        DATE: "YYYY-MM-DD",
                        TIME: "HH:mm",
                        TIME_SECONDS: "HH:mm:ss",
                        TIME_MS: "HH:mm:ss.SSS",
                        WEEK: "YYYY-[W]WW",
                        MONTH: "YYYY-MM"
                    }, a
            })
        }, {}],
        7: [function (a, b, c) {
            var d = a(29)();
            d.helpers = a(45), a(27)(d), d.defaults = a(25), d.Element = a(26), d.elements = a(40), d.Interaction = a(28), d.layouts = a(30), d.platform = a(48), d.plugins = a(31), d.Ticks = a(34), a(22)(d), a(23)(d), a(24)(d), a(33)(d), a(32)(d), a(35)(d), a(55)(d), a(53)(d), a(54)(d), a(56)(d), a(57)(d), a(58)(d), a(15)(d), a(16)(d), a(17)(d), a(18)(d), a(19)(d), a(20)(d), a(21)(d), a(8)(d), a(9)(d), a(10)(d), a(11)(d), a(12)(d), a(13)(d), a(14)(d);
            var e = a(49);
            for (var f in e) e.hasOwnProperty(f) && d.plugins.register(e[f]);
            d.platform.initialize(), b.exports = d, "undefined" != typeof window && (window.Chart = d), d.Legend = e.legend._element, d.Title = e.title._element, d.pluginService = d.plugins, d.PluginBase = d.Element.extend({}), d.canvasHelpers = d.helpers.canvas, d.layoutService = d.layouts
        }, {
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            34: 34,
            35: 35,
            40: 40,
            45: 45,
            48: 48,
            49: 49,
            53: 53,
            54: 54,
            55: 55,
            56: 56,
            57: 57,
            58: 58,
            8: 8,
            9: 9
        }],
        8: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                a.Bar = function (b, c) {
                    return c.type = "bar", new a(b, c)
                }
            }
        }, {}],
        9: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                a.Bubble = function (b, c) {
                    return c.type = "bubble", new a(b, c)
                }
            }
        }, {}],
        10: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                a.Doughnut = function (b, c) {
                    return c.type = "doughnut", new a(b, c)
                }
            }
        }, {}],
        11: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                a.Line = function (b, c) {
                    return c.type = "line", new a(b, c)
                }
            }
        }, {}],
        12: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                a.PolarArea = function (b, c) {
                    return c.type = "polarArea", new a(b, c)
                }
            }
        }, {}],
        13: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                a.Radar = function (b, c) {
                    return c.type = "radar", new a(b, c)
                }
            }
        }, {}],
        14: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                a.Scatter = function (b, c) {
                    return c.type = "scatter", new a(b, c)
                }
            }
        }, {}],
        15: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                var c, d, e, f, g = a.isHorizontal() ? a.width : a.height,
                    h = a.getTicks();
                for (e = 1, f = b.length; e < f; ++e) g = Math.min(g, b[e] - b[e - 1]);
                for (e = 0, f = h.length; e < f; ++e) d = a.getPixelForTick(e), g = e > 0 ? Math.min(g, d - c) : g, c = d;
                return g
            }

            function e(a, b, c) {
                var d, e, f = c.barThickness,
                    g = b.stackCount,
                    h = b.pixels[a];
                return i.isNullOrUndef(f) ? (d = b.min * c.categoryPercentage, e = c.barPercentage) : (d = f * g, e = 1), {
                    chunk: d / g,
                    ratio: e,
                    start: h - d / 2
                }
            }

            function f(a, b, c) {
                var d, e, f = b.pixels,
                    g = f[a],
                    h = a > 0 ? f[a - 1] : null,
                    i = a < f.length - 1 ? f[a + 1] : null,
                    j = c.categoryPercentage;
                return null === h && (h = g - (null === i ? b.end - g : i - g)), null === i && (i = g + g - h), d = g - (g - h) / 2 * j, e = (i - h) / 2 * j, {
                    chunk: e / b.stackCount,
                    ratio: c.barPercentage,
                    start: d
                }
            }
            var g = a(25),
                h = a(40),
                i = a(45);
            g._set("bar", {
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        offset: !0,
                        gridLines: {
                            offsetGridLines: !0
                        }
                    }],
                    yAxes: [{
                        type: "linear"
                    }]
                }
            }), g._set("horizontalBar", {
                hover: {
                    mode: "index",
                    axis: "y"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom"
                    }],
                    yAxes: [{
                        position: "left",
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        offset: !0,
                        gridLines: {
                            offsetGridLines: !0
                        }
                    }]
                },
                elements: {
                    rectangle: {
                        borderSkipped: "left"
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function (a, b) {
                            var c = "";
                            return a.length > 0 && (a[0].yLabel ? c = a[0].yLabel : b.labels.length > 0 && a[0].index < b.labels.length && (c = b.labels[a[0].index])), c
                        },
                        label: function (a, b) {
                            return (b.datasets[a.datasetIndex].label || "") + ": " + a.xLabel
                        }
                    },
                    mode: "index",
                    axis: "y"
                }
            }), b.exports = function (a) {
                a.controllers.bar = a.DatasetController.extend({
                    dataElementType: h.Rectangle,
                    initialize: function () {
                        var b, c = this;
                        a.DatasetController.prototype.initialize.apply(c, arguments), b = c.getMeta(), b.stack = c.getDataset().stack, b.bar = !0
                    },
                    update: function (a) {
                        var b, c, d = this,
                            e = d.getMeta().data;
                        for (d._ruler = d.getRuler(), b = 0, c = e.length; b < c; ++b) d.updateElement(e[b], b, a)
                    },
                    updateElement: function (a, b, c) {
                        var d = this,
                            e = d.chart,
                            f = d.getMeta(),
                            g = d.getDataset(),
                            h = a.custom || {},
                            j = e.options.elements.rectangle;
                        a._xScale = d.getScaleForId(f.xAxisID), a._yScale = d.getScaleForId(f.yAxisID), a._datasetIndex = d.index, a._index = b, a._model = {
                            datasetLabel: g.label,
                            label: e.data.labels[b],
                            borderSkipped: h.borderSkipped ? h.borderSkipped : j.borderSkipped,
                            backgroundColor: h.backgroundColor ? h.backgroundColor : i.valueAtIndexOrDefault(g.backgroundColor, b, j.backgroundColor),
                            borderColor: h.borderColor ? h.borderColor : i.valueAtIndexOrDefault(g.borderColor, b, j.borderColor),
                            borderWidth: h.borderWidth ? h.borderWidth : i.valueAtIndexOrDefault(g.borderWidth, b, j.borderWidth)
                        }, d.updateElementGeometry(a, b, c), a.pivot()
                    },
                    updateElementGeometry: function (a, b, c) {
                        var d = this,
                            e = a._model,
                            f = d.getValueScale(),
                            g = f.getBasePixel(),
                            h = f.isHorizontal(),
                            i = d._ruler || d.getRuler(),
                            j = d.calculateBarValuePixels(d.index, b),
                            k = d.calculateBarIndexPixels(d.index, b, i);
                        e.horizontal = h, e.base = c ? g : j.base, e.x = h ? c ? g : j.head : k.center, e.y = h ? k.center : c ? g : j.head, e.height = h ? k.size : void 0, e.width = h ? void 0 : k.size
                    },
                    getValueScaleId: function () {
                        return this.getMeta().yAxisID
                    },
                    getIndexScaleId: function () {
                        return this.getMeta().xAxisID
                    },
                    getValueScale: function () {
                        return this.getScaleForId(this.getValueScaleId())
                    },
                    getIndexScale: function () {
                        return this.getScaleForId(this.getIndexScaleId())
                    },
                    _getStacks: function (a) {
                        var b, c, d = this,
                            e = d.chart,
                            f = d.getIndexScale(),
                            g = f.options.stacked,
                            h = void 0 === a ? e.data.datasets.length : a + 1,
                            i = [];
                        for (b = 0; b < h; ++b) c = e.getDatasetMeta(b), c.bar && e.isDatasetVisible(b) && (!1 === g || !0 === g && -1 === i.indexOf(c.stack) || void 0 === g && (void 0 === c.stack || -1 === i.indexOf(c.stack))) && i.push(c.stack);
                        return i
                    },
                    getStackCount: function () {
                        return this._getStacks().length
                    },
                    getStackIndex: function (a, b) {
                        var c = this._getStacks(a),
                            d = void 0 !== b ? c.indexOf(b) : -1;
                        return -1 === d ? c.length - 1 : d
                    },
                    getRuler: function () {
                        var a, b, c, e = this,
                            f = e.getIndexScale(),
                            g = e.getStackCount(),
                            h = e.index,
                            j = f.isHorizontal(),
                            k = j ? f.left : f.top,
                            l = k + (j ? f.width : f.height),
                            m = [];
                        for (a = 0, b = e.getMeta().data.length; a < b; ++a) m.push(f.getPixelForValue(null, a, h));
                        return c = i.isNullOrUndef(f.options.barThickness) ? d(f, m) : -1, {
                            min: c,
                            pixels: m,
                            start: k,
                            end: l,
                            stackCount: g,
                            scale: f
                        }
                    },
                    calculateBarValuePixels: function (a, b) {
                        var c, d, e, f, g, h, i = this,
                            j = i.chart,
                            k = i.getMeta(),
                            l = i.getValueScale(),
                            m = j.data.datasets,
                            n = l.getRightValue(m[a].data[b]),
                            o = l.options.stacked,
                            p = k.stack,
                            q = 0;
                        if (o || void 0 === o && void 0 !== p)
                            for (c = 0; c < a; ++c) d = j.getDatasetMeta(c), d.bar && d.stack === p && d.controller.getValueScaleId() === l.id && j.isDatasetVisible(c) && (e = l.getRightValue(m[c].data[b]), (n < 0 && e < 0 || n >= 0 && e > 0) && (q += e));
                        return f = l.getPixelForValue(q), g = l.getPixelForValue(q + n), h = (g - f) / 2, {
                            size: h,
                            base: f,
                            head: g,
                            center: g + h / 2
                        }
                    },
                    calculateBarIndexPixels: function (a, b, c) {
                        var d = this,
                            g = c.scale.options,
                            h = "flex" === g.barThickness ? f(b, c, g) : e(b, c, g),
                            j = d.getStackIndex(a, d.getMeta().stack),
                            k = h.start + h.chunk * j + h.chunk / 2,
                            l = Math.min(i.valueOrDefault(g.maxBarThickness, 1 / 0), h.chunk * h.ratio);
                        return {
                            base: k - l / 2,
                            head: k + l / 2,
                            center: k,
                            size: l
                        }
                    },
                    draw: function () {
                        var a = this,
                            b = a.chart,
                            c = a.getValueScale(),
                            d = a.getMeta().data,
                            e = a.getDataset(),
                            f = d.length,
                            g = 0;
                        for (i.canvas.clipArea(b.ctx, b.chartArea); g < f; ++g) isNaN(c.getRightValue(e.data[g])) || d[g].draw();
                        i.canvas.unclipArea(b.ctx)
                    },
                    setHoverStyle: function (a) {
                        var b = this.chart.data.datasets[a._datasetIndex],
                            c = a._index,
                            d = a.custom || {},
                            e = a._model;
                        e.backgroundColor = d.hoverBackgroundColor ? d.hoverBackgroundColor : i.valueAtIndexOrDefault(b.hoverBackgroundColor, c, i.getHoverColor(e.backgroundColor)), e.borderColor = d.hoverBorderColor ? d.hoverBorderColor : i.valueAtIndexOrDefault(b.hoverBorderColor, c, i.getHoverColor(e.borderColor)), e.borderWidth = d.hoverBorderWidth ? d.hoverBorderWidth : i.valueAtIndexOrDefault(b.hoverBorderWidth, c, e.borderWidth)
                    },
                    removeHoverStyle: function (a) {
                        var b = this.chart.data.datasets[a._datasetIndex],
                            c = a._index,
                            d = a.custom || {},
                            e = a._model,
                            f = this.chart.options.elements.rectangle;
                        e.backgroundColor = d.backgroundColor ? d.backgroundColor : i.valueAtIndexOrDefault(b.backgroundColor, c, f.backgroundColor), e.borderColor = d.borderColor ? d.borderColor : i.valueAtIndexOrDefault(b.borderColor, c, f.borderColor), e.borderWidth = d.borderWidth ? d.borderWidth : i.valueAtIndexOrDefault(b.borderWidth, c, f.borderWidth)
                    }
                }), a.controllers.horizontalBar = a.controllers.bar.extend({
                    getValueScaleId: function () {
                        return this.getMeta().xAxisID
                    },
                    getIndexScaleId: function () {
                        return this.getMeta().yAxisID
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        16: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(40),
                f = a(45);
            d._set("bubble", {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        position: "left",
                        id: "y-axis-0"
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (a, b) {
                            var c = b.datasets[a.datasetIndex].label || "",
                                d = b.datasets[a.datasetIndex].data[a.index];
                            return c + ": (" + a.xLabel + ", " + a.yLabel + ", " + d.r + ")"
                        }
                    }
                }
            }), b.exports = function (a) {
                a.controllers.bubble = a.DatasetController.extend({
                    dataElementType: e.Point,
                    update: function (a) {
                        var b = this,
                            c = b.getMeta(),
                            d = c.data;
                        f.each(d, function (c, d) {
                            b.updateElement(c, d, a)
                        })
                    },
                    updateElement: function (a, b, c) {
                        var d = this,
                            e = d.getMeta(),
                            f = a.custom || {},
                            g = d.getScaleForId(e.xAxisID),
                            h = d.getScaleForId(e.yAxisID),
                            i = d._resolveElementOptions(a, b),
                            j = d.getDataset().data[b],
                            k = d.index,
                            l = c ? g.getPixelForDecimal(.5) : g.getPixelForValue("object" == typeof j ? j : NaN, b, k),
                            m = c ? h.getBasePixel() : h.getPixelForValue(j, b, k);
                        a._xScale = g, a._yScale = h, a._options = i, a._datasetIndex = k, a._index = b, a._model = {
                            backgroundColor: i.backgroundColor,
                            borderColor: i.borderColor,
                            borderWidth: i.borderWidth,
                            hitRadius: i.hitRadius,
                            pointStyle: i.pointStyle,
                            radius: c ? 0 : i.radius,
                            skip: f.skip || isNaN(l) || isNaN(m),
                            x: l,
                            y: m
                        }, a.pivot()
                    },
                    setHoverStyle: function (a) {
                        var b = a._model,
                            c = a._options;
                        b.backgroundColor = f.valueOrDefault(c.hoverBackgroundColor, f.getHoverColor(c.backgroundColor)), b.borderColor = f.valueOrDefault(c.hoverBorderColor, f.getHoverColor(c.borderColor)), b.borderWidth = f.valueOrDefault(c.hoverBorderWidth, c.borderWidth), b.radius = c.radius + c.hoverRadius
                    },
                    removeHoverStyle: function (a) {
                        var b = a._model,
                            c = a._options;
                        b.backgroundColor = c.backgroundColor, b.borderColor = c.borderColor, b.borderWidth = c.borderWidth, b.radius = c.radius
                    },
                    _resolveElementOptions: function (a, b) {
                        var c, d, e, g = this,
                            h = g.chart,
                            i = h.data.datasets,
                            j = i[g.index],
                            k = a.custom || {},
                            l = h.options.elements.point,
                            m = f.options.resolve,
                            n = j.data[b],
                            o = {},
                            p = {
                                chart: h,
                                dataIndex: b,
                                dataset: j,
                                datasetIndex: g.index
                            },
                            q = ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle"];
                        for (c = 0, d = q.length; c < d; ++c) e = q[c], o[e] = m([k[e], j[e], l[e]], p, b);
                        return o.radius = m([k.radius, n ? n.r : void 0, j.radius, l.radius], p, b), o
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        17: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(40),
                f = a(45);
            d._set("doughnut", {
                animation: {
                    animateRotate: !0,
                    animateScale: !1
                },
                hover: {
                    mode: "single"
                },
                legendCallback: function (a) {
                    var b = [];
                    b.push('<ul class="' + a.id + '-legend">');
                    var c = a.data,
                        d = c.datasets,
                        e = c.labels;
                    if (d.length)
                        for (var f = 0; f < d[0].data.length; ++f) b.push('<li><span style="background-color:' + d[0].backgroundColor[f] + '"></span>'), e[f] && b.push(e[f]), b.push("</li>");
                    return b.push("</ul>"), b.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function (a) {
                            var b = a.data;
                            return b.labels.length && b.datasets.length ? b.labels.map(function (c, d) {
                                var e = a.getDatasetMeta(0),
                                    g = b.datasets[0],
                                    h = e.data[d],
                                    i = h && h.custom || {},
                                    j = f.valueAtIndexOrDefault,
                                    k = a.options.elements.arc;
                                return {
                                    text: c,
                                    fillStyle: i.backgroundColor ? i.backgroundColor : j(g.backgroundColor, d, k.backgroundColor),
                                    strokeStyle: i.borderColor ? i.borderColor : j(g.borderColor, d, k.borderColor),
                                    lineWidth: i.borderWidth ? i.borderWidth : j(g.borderWidth, d, k.borderWidth),
                                    hidden: isNaN(g.data[d]) || e.data[d].hidden,
                                    index: d
                                }
                            }) : []
                        }
                    },
                    onClick: function (a, b) {
                        var c, d, e, f = b.index,
                            g = this.chart;
                        for (c = 0, d = (g.data.datasets || []).length; c < d; ++c) e = g.getDatasetMeta(c), e.data[f] && (e.data[f].hidden = !e.data[f].hidden);
                        g.update()
                    }
                },
                cutoutPercentage: 50,
                rotation: -.5 * Math.PI,
                circumference: 2 * Math.PI,
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (a, b) {
                            var c = b.labels[a.index],
                                d = ": " + b.datasets[a.datasetIndex].data[a.index];
                            return f.isArray(c) ? (c = c.slice(), c[0] += d) : c += d, c
                        }
                    }
                }
            }), d._set("pie", f.clone(d.doughnut)), d._set("pie", {
                cutoutPercentage: 0
            }), b.exports = function (a) {
                a.controllers.doughnut = a.controllers.pie = a.DatasetController.extend({
                    dataElementType: e.Arc,
                    linkScales: f.noop,
                    getRingIndex: function (a) {
                        for (var b = 0, c = 0; c < a; ++c) this.chart.isDatasetVisible(c) && ++b;
                        return b
                    },
                    update: function (a) {
                        var b = this,
                            c = b.chart,
                            d = c.chartArea,
                            e = c.options,
                            g = e.elements.arc,
                            h = d.right - d.left - g.borderWidth,
                            i = d.bottom - d.top - g.borderWidth,
                            j = Math.min(h, i),
                            k = {
                                x: 0,
                                y: 0
                            },
                            l = b.getMeta(),
                            m = e.cutoutPercentage,
                            n = e.circumference;
                        if (n < 2 * Math.PI) {
                            var o = e.rotation % (2 * Math.PI);
                            o += 2 * Math.PI * (o >= Math.PI ? -1 : o < -Math.PI ? 1 : 0);
                            var p = o + n,
                                q = {
                                    x: Math.cos(o),
                                    y: Math.sin(o)
                                },
                                r = {
                                    x: Math.cos(p),
                                    y: Math.sin(p)
                                },
                                s = o <= 0 && p >= 0 || o <= 2 * Math.PI && 2 * Math.PI <= p,
                                t = o <= .5 * Math.PI && .5 * Math.PI <= p || o <= 2.5 * Math.PI && 2.5 * Math.PI <= p,
                                u = o <= -Math.PI && -Math.PI <= p || o <= Math.PI && Math.PI <= p,
                                v = o <= .5 * -Math.PI && .5 * -Math.PI <= p || o <= 1.5 * Math.PI && 1.5 * Math.PI <= p,
                                w = m / 100,
                                x = {
                                    x: u ? -1 : Math.min(q.x * (q.x < 0 ? 1 : w), r.x * (r.x < 0 ? 1 : w)),
                                    y: v ? -1 : Math.min(q.y * (q.y < 0 ? 1 : w), r.y * (r.y < 0 ? 1 : w))
                                },
                                y = {
                                    x: s ? 1 : Math.max(q.x * (q.x > 0 ? 1 : w), r.x * (r.x > 0 ? 1 : w)),
                                    y: t ? 1 : Math.max(q.y * (q.y > 0 ? 1 : w), r.y * (r.y > 0 ? 1 : w))
                                },
                                z = {
                                    width: .5 * (y.x - x.x),
                                    height: .5 * (y.y - x.y)
                                };
                            j = Math.min(h / z.width, i / z.height), k = {
                                x: -.5 * (y.x + x.x),
                                y: -.5 * (y.y + x.y)
                            }
                        }
                        c.borderWidth = b.getMaxBorderWidth(l.data), c.outerRadius = Math.max((j - c.borderWidth) / 2, 0), c.innerRadius = Math.max(m ? c.outerRadius / 100 * m : 0, 0), c.radiusLength = (c.outerRadius - c.innerRadius) / c.getVisibleDatasetCount(), c.offsetX = k.x * c.outerRadius, c.offsetY = k.y * c.outerRadius, l.total = b.calculateTotal(), b.outerRadius = c.outerRadius - c.radiusLength * b.getRingIndex(b.index), b.innerRadius = Math.max(b.outerRadius - c.radiusLength, 0), f.each(l.data, function (c, d) {
                            b.updateElement(c, d, a)
                        })
                    },
                    updateElement: function (a, b, c) {
                        var d = this,
                            e = d.chart,
                            g = e.chartArea,
                            h = e.options,
                            i = h.animation,
                            j = (g.left + g.right) / 2,
                            k = (g.top + g.bottom) / 2,
                            l = h.rotation,
                            m = h.rotation,
                            n = d.getDataset(),
                            o = c && i.animateRotate ? 0 : a.hidden ? 0 : d.calculateCircumference(n.data[b]) * (h.circumference / (2 * Math.PI)),
                            p = c && i.animateScale ? 0 : d.innerRadius,
                            q = c && i.animateScale ? 0 : d.outerRadius,
                            r = f.valueAtIndexOrDefault;
                        f.extend(a, {
                            _datasetIndex: d.index,
                            _index: b,
                            _model: {
                                x: j + e.offsetX,
                                y: k + e.offsetY,
                                startAngle: l,
                                endAngle: m,
                                circumference: o,
                                outerRadius: q,
                                innerRadius: p,
                                label: r(n.label, b, e.data.labels[b])
                            }
                        });
                        var s = a._model;
                        this.removeHoverStyle(a), c && i.animateRotate || (s.startAngle = 0 === b ? h.rotation : d.getMeta().data[b - 1]._model.endAngle, s.endAngle = s.startAngle + s.circumference), a.pivot()
                    },
                    removeHoverStyle: function (b) {
                        a.DatasetController.prototype.removeHoverStyle.call(this, b, this.chart.options.elements.arc)
                    },
                    calculateTotal: function () {
                        var a, b = this.getDataset(),
                            c = this.getMeta(),
                            d = 0;
                        return f.each(c.data, function (c, e) {
                            a = b.data[e], isNaN(a) || c.hidden || (d += Math.abs(a))
                        }), d
                    },
                    calculateCircumference: function (a) {
                        var b = this.getMeta().total;
                        return b > 0 && !isNaN(a) ? 2 * Math.PI * (Math.abs(a) / b) : 0
                    },
                    getMaxBorderWidth: function (a) {
                        for (var b, c, d = 0, e = this.index, f = a.length, g = 0; g < f; g++) b = a[g]._model ? a[g]._model.borderWidth : 0, c = a[g]._chart ? a[g]._chart.config.data.datasets[e].hoverBorderWidth : 0, d = b > d ? b : d, d = c > d ? c : d;
                        return d
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        18: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(40),
                f = a(45);
            d._set("line", {
                showLines: !0,
                spanGaps: !1,
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        id: "y-axis-0"
                    }]
                }
            }), b.exports = function (a) {
                function b(a, b) {
                    return f.valueOrDefault(a.showLine, b.showLines)
                }
                a.controllers.line = a.DatasetController.extend({
                    datasetElementType: e.Line,
                    dataElementType: e.Point,
                    update: function (a) {
                        var c, d, e, g = this,
                            h = g.getMeta(),
                            i = h.dataset,
                            j = h.data || [],
                            k = g.chart.options,
                            l = k.elements.line,
                            m = g.getScaleForId(h.yAxisID),
                            n = g.getDataset(),
                            o = b(n, k);
                        for (o && (e = i.custom || {}, void 0 !== n.tension && void 0 === n.lineTension && (n.lineTension = n.tension), i._scale = m, i._datasetIndex = g.index, i._children = j, i._model = {
                                spanGaps: n.spanGaps ? n.spanGaps : k.spanGaps,
                                tension: e.tension ? e.tension : f.valueOrDefault(n.lineTension, l.tension),
                                backgroundColor: e.backgroundColor ? e.backgroundColor : n.backgroundColor || l.backgroundColor,
                                borderWidth: e.borderWidth ? e.borderWidth : n.borderWidth || l.borderWidth,
                                borderColor: e.borderColor ? e.borderColor : n.borderColor || l.borderColor,
                                borderCapStyle: e.borderCapStyle ? e.borderCapStyle : n.borderCapStyle || l.borderCapStyle,
                                borderDash: e.borderDash ? e.borderDash : n.borderDash || l.borderDash,
                                borderDashOffset: e.borderDashOffset ? e.borderDashOffset : n.borderDashOffset || l.borderDashOffset,
                                borderJoinStyle: e.borderJoinStyle ? e.borderJoinStyle : n.borderJoinStyle || l.borderJoinStyle,
                                fill: e.fill ? e.fill : void 0 !== n.fill ? n.fill : l.fill,
                                steppedLine: e.steppedLine ? e.steppedLine : f.valueOrDefault(n.steppedLine, l.stepped),
                                cubicInterpolationMode: e.cubicInterpolationMode ? e.cubicInterpolationMode : f.valueOrDefault(n.cubicInterpolationMode, l.cubicInterpolationMode)
                            }, i.pivot()), c = 0, d = j.length; c < d; ++c) g.updateElement(j[c], c, a);
                        for (o && 0 !== i._model.tension && g.updateBezierControlPoints(), c = 0, d = j.length; c < d; ++c) j[c].pivot()
                    },
                    getPointBackgroundColor: function (a, b) {
                        var c = this.chart.options.elements.point.backgroundColor,
                            d = this.getDataset(),
                            e = a.custom || {};
                        return e.backgroundColor ? c = e.backgroundColor : d.pointBackgroundColor ? c = f.valueAtIndexOrDefault(d.pointBackgroundColor, b, c) : d.backgroundColor && (c = d.backgroundColor), c
                    },
                    getPointBorderColor: function (a, b) {
                        var c = this.chart.options.elements.point.borderColor,
                            d = this.getDataset(),
                            e = a.custom || {};
                        return e.borderColor ? c = e.borderColor : d.pointBorderColor ? c = f.valueAtIndexOrDefault(d.pointBorderColor, b, c) : d.borderColor && (c = d.borderColor), c
                    },
                    getPointBorderWidth: function (a, b) {
                        var c = this.chart.options.elements.point.borderWidth,
                            d = this.getDataset(),
                            e = a.custom || {};
                        return isNaN(e.borderWidth) ? !isNaN(d.pointBorderWidth) || f.isArray(d.pointBorderWidth) ? c = f.valueAtIndexOrDefault(d.pointBorderWidth, b, c) : isNaN(d.borderWidth) || (c = d.borderWidth) : c = e.borderWidth, c
                    },
                    updateElement: function (a, b, c) {
                        var d, e, g = this,
                            h = g.getMeta(),
                            i = a.custom || {},
                            j = g.getDataset(),
                            k = g.index,
                            l = j.data[b],
                            m = g.getScaleForId(h.yAxisID),
                            n = g.getScaleForId(h.xAxisID),
                            o = g.chart.options.elements.point;
                        void 0 !== j.radius && void 0 === j.pointRadius && (j.pointRadius = j.radius), void 0 !== j.hitRadius && void 0 === j.pointHitRadius && (j.pointHitRadius = j.hitRadius), d = n.getPixelForValue("object" == typeof l ? l : NaN, b, k), e = c ? m.getBasePixel() : g.calculatePointY(l, b, k), a._xScale = n, a._yScale = m, a._datasetIndex = k, a._index = b, a._model = {
                            x: d,
                            y: e,
                            skip: i.skip || isNaN(d) || isNaN(e),
                            radius: i.radius || f.valueAtIndexOrDefault(j.pointRadius, b, o.radius),
                            pointStyle: i.pointStyle || f.valueAtIndexOrDefault(j.pointStyle, b, o.pointStyle),
                            backgroundColor: g.getPointBackgroundColor(a, b),
                            borderColor: g.getPointBorderColor(a, b),
                            borderWidth: g.getPointBorderWidth(a, b),
                            tension: h.dataset._model ? h.dataset._model.tension : 0,
                            steppedLine: !!h.dataset._model && h.dataset._model.steppedLine,
                            hitRadius: i.hitRadius || f.valueAtIndexOrDefault(j.pointHitRadius, b, o.hitRadius)
                        }
                    },
                    calculatePointY: function (a, b, c) {
                        var d, e, f, g = this,
                            h = g.chart,
                            i = g.getMeta(),
                            j = g.getScaleForId(i.yAxisID),
                            k = 0,
                            l = 0;
                        if (j.options.stacked) {
                            for (d = 0; d < c; d++)
                                if (e = h.data.datasets[d], f = h.getDatasetMeta(d), "line" === f.type && f.yAxisID === j.id && h.isDatasetVisible(d)) {
                                    var m = Number(j.getRightValue(e.data[b]));
                                    m < 0 ? l += m || 0 : k += m || 0
                                } var n = Number(j.getRightValue(a));
                            return n < 0 ? j.getPixelForValue(l + n) : j.getPixelForValue(k + n)
                        }
                        return j.getPixelForValue(a)
                    },
                    updateBezierControlPoints: function () {
                        function a(a, b, c) {
                            return Math.max(Math.min(a, c), b)
                        }
                        var b, c, d, e, g, h = this,
                            i = h.getMeta(),
                            j = h.chart.chartArea,
                            k = i.data || [];
                        if (i.dataset._model.spanGaps && (k = k.filter(function (a) {
                                return !a._model.skip
                            })), "monotone" === i.dataset._model.cubicInterpolationMode) f.splineCurveMonotone(k);
                        else
                            for (b = 0, c = k.length; b < c; ++b) d = k[b], e = d._model, g = f.splineCurve(f.previousItem(k, b)._model, e, f.nextItem(k, b)._model, i.dataset._model.tension), e.controlPointPreviousX = g.previous.x, e.controlPointPreviousY = g.previous.y, e.controlPointNextX = g.next.x, e.controlPointNextY = g.next.y;
                        if (h.chart.options.elements.line.capBezierPoints)
                            for (b = 0, c = k.length; b < c; ++b) e = k[b]._model, e.controlPointPreviousX = a(e.controlPointPreviousX, j.left, j.right), e.controlPointPreviousY = a(e.controlPointPreviousY, j.top, j.bottom), e.controlPointNextX = a(e.controlPointNextX, j.left, j.right), e.controlPointNextY = a(e.controlPointNextY, j.top, j.bottom)
                    },
                    draw: function () {
                        var a = this,
                            c = a.chart,
                            d = a.getMeta(),
                            e = d.data || [],
                            g = c.chartArea,
                            h = e.length,
                            i = 0;
                        for (f.canvas.clipArea(c.ctx, g), b(a.getDataset(), c.options) && d.dataset.draw(), f.canvas.unclipArea(c.ctx); i < h; ++i) e[i].draw(g)
                    },
                    setHoverStyle: function (a) {
                        var b = this.chart.data.datasets[a._datasetIndex],
                            c = a._index,
                            d = a.custom || {},
                            e = a._model;
                        e.radius = d.hoverRadius || f.valueAtIndexOrDefault(b.pointHoverRadius, c, this.chart.options.elements.point.hoverRadius), e.backgroundColor = d.hoverBackgroundColor || f.valueAtIndexOrDefault(b.pointHoverBackgroundColor, c, f.getHoverColor(e.backgroundColor)), e.borderColor = d.hoverBorderColor || f.valueAtIndexOrDefault(b.pointHoverBorderColor, c, f.getHoverColor(e.borderColor)), e.borderWidth = d.hoverBorderWidth || f.valueAtIndexOrDefault(b.pointHoverBorderWidth, c, e.borderWidth)
                    },
                    removeHoverStyle: function (a) {
                        var b = this,
                            c = b.chart.data.datasets[a._datasetIndex],
                            d = a._index,
                            e = a.custom || {},
                            g = a._model;
                        void 0 !== c.radius && void 0 === c.pointRadius && (c.pointRadius = c.radius), g.radius = e.radius || f.valueAtIndexOrDefault(c.pointRadius, d, b.chart.options.elements.point.radius), g.backgroundColor = b.getPointBackgroundColor(a, d), g.borderColor = b.getPointBorderColor(a, d), g.borderWidth = b.getPointBorderWidth(a, d)
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        19: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(40),
                f = a(45);
            d._set("polarArea", {
                scale: {
                    type: "radialLinear",
                    angleLines: {
                        display: !1
                    },
                    gridLines: {
                        circular: !0
                    },
                    pointLabels: {
                        display: !1
                    },
                    ticks: {
                        beginAtZero: !0
                    }
                },
                animation: {
                    animateRotate: !0,
                    animateScale: !0
                },
                startAngle: -.5 * Math.PI,
                legendCallback: function (a) {
                    var b = [];
                    b.push('<ul class="' + a.id + '-legend">');
                    var c = a.data,
                        d = c.datasets,
                        e = c.labels;
                    if (d.length)
                        for (var f = 0; f < d[0].data.length; ++f) b.push('<li><span style="background-color:' + d[0].backgroundColor[f] + '"></span>'), e[f] && b.push(e[f]), b.push("</li>");
                    return b.push("</ul>"), b.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function (a) {
                            var b = a.data;
                            return b.labels.length && b.datasets.length ? b.labels.map(function (c, d) {
                                var e = a.getDatasetMeta(0),
                                    g = b.datasets[0],
                                    h = e.data[d],
                                    i = h.custom || {},
                                    j = f.valueAtIndexOrDefault,
                                    k = a.options.elements.arc;
                                return {
                                    text: c,
                                    fillStyle: i.backgroundColor ? i.backgroundColor : j(g.backgroundColor, d, k.backgroundColor),
                                    strokeStyle: i.borderColor ? i.borderColor : j(g.borderColor, d, k.borderColor),
                                    lineWidth: i.borderWidth ? i.borderWidth : j(g.borderWidth, d, k.borderWidth),
                                    hidden: isNaN(g.data[d]) || e.data[d].hidden,
                                    index: d
                                }
                            }) : []
                        }
                    },
                    onClick: function (a, b) {
                        var c, d, e, f = b.index,
                            g = this.chart;
                        for (c = 0, d = (g.data.datasets || []).length; c < d; ++c) e = g.getDatasetMeta(c), e.data[f].hidden = !e.data[f].hidden;
                        g.update()
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (a, b) {
                            return b.labels[a.index] + ": " + a.yLabel
                        }
                    }
                }
            }), b.exports = function (a) {
                a.controllers.polarArea = a.DatasetController.extend({
                    dataElementType: e.Arc,
                    linkScales: f.noop,
                    update: function (a) {
                        var b = this,
                            c = b.chart,
                            d = c.chartArea,
                            e = b.getMeta(),
                            g = c.options,
                            h = g.elements.arc,
                            i = Math.min(d.right - d.left, d.bottom - d.top);
                        c.outerRadius = Math.max((i - h.borderWidth / 2) / 2, 0), c.innerRadius = Math.max(g.cutoutPercentage ? c.outerRadius / 100 * g.cutoutPercentage : 1, 0), c.radiusLength = (c.outerRadius - c.innerRadius) / c.getVisibleDatasetCount(), b.outerRadius = c.outerRadius - c.radiusLength * b.index, b.innerRadius = b.outerRadius - c.radiusLength, e.count = b.countVisibleElements(), f.each(e.data, function (c, d) {
                            b.updateElement(c, d, a)
                        })
                    },
                    updateElement: function (a, b, c) {
                        for (var d = this, e = d.chart, g = d.getDataset(), h = e.options, i = h.animation, j = e.scale, k = e.data.labels, l = d.calculateCircumference(g.data[b]), m = j.xCenter, n = j.yCenter, o = 0, p = d.getMeta(), q = 0; q < b; ++q) isNaN(g.data[q]) || p.data[q].hidden || ++o;
                        var r = h.startAngle,
                            s = a.hidden ? 0 : j.getDistanceFromCenterForValue(g.data[b]),
                            t = r + l * o,
                            u = t + (a.hidden ? 0 : l),
                            v = i.animateScale ? 0 : j.getDistanceFromCenterForValue(g.data[b]);
                        f.extend(a, {
                            _datasetIndex: d.index,
                            _index: b,
                            _scale: j,
                            _model: {
                                x: m,
                                y: n,
                                innerRadius: 0,
                                outerRadius: c ? v : s,
                                startAngle: c && i.animateRotate ? r : t,
                                endAngle: c && i.animateRotate ? r : u,
                                label: f.valueAtIndexOrDefault(k, b, k[b])
                            }
                        }), d.removeHoverStyle(a), a.pivot()
                    },
                    removeHoverStyle: function (b) {
                        a.DatasetController.prototype.removeHoverStyle.call(this, b, this.chart.options.elements.arc)
                    },
                    countVisibleElements: function () {
                        var a = this.getDataset(),
                            b = this.getMeta(),
                            c = 0;
                        return f.each(b.data, function (b, d) {
                            isNaN(a.data[d]) || b.hidden || c++
                        }), c
                    },
                    calculateCircumference: function (a) {
                        var b = this.getMeta().count;
                        return b > 0 && !isNaN(a) ? 2 * Math.PI / b : 0
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        20: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(40),
                f = a(45);
            d._set("radar", {
                scale: {
                    type: "radialLinear"
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }), b.exports = function (a) {
                a.controllers.radar = a.DatasetController.extend({
                    datasetElementType: e.Line,
                    dataElementType: e.Point,
                    linkScales: f.noop,
                    update: function (a) {
                        var b = this,
                            c = b.getMeta(),
                            d = c.dataset,
                            e = c.data,
                            g = d.custom || {},
                            h = b.getDataset(),
                            i = b.chart.options.elements.line,
                            j = b.chart.scale;
                        void 0 !== h.tension && void 0 === h.lineTension && (h.lineTension = h.tension), f.extend(c.dataset, {
                            _datasetIndex: b.index,
                            _scale: j,
                            _children: e,
                            _loop: !0,
                            _model: {
                                tension: g.tension ? g.tension : f.valueOrDefault(h.lineTension, i.tension),
                                backgroundColor: g.backgroundColor ? g.backgroundColor : h.backgroundColor || i.backgroundColor,
                                borderWidth: g.borderWidth ? g.borderWidth : h.borderWidth || i.borderWidth,
                                borderColor: g.borderColor ? g.borderColor : h.borderColor || i.borderColor,
                                fill: g.fill ? g.fill : void 0 !== h.fill ? h.fill : i.fill,
                                borderCapStyle: g.borderCapStyle ? g.borderCapStyle : h.borderCapStyle || i.borderCapStyle,
                                borderDash: g.borderDash ? g.borderDash : h.borderDash || i.borderDash,
                                borderDashOffset: g.borderDashOffset ? g.borderDashOffset : h.borderDashOffset || i.borderDashOffset,
                                borderJoinStyle: g.borderJoinStyle ? g.borderJoinStyle : h.borderJoinStyle || i.borderJoinStyle
                            }
                        }), c.dataset.pivot(), f.each(e, function (c, d) {
                            b.updateElement(c, d, a)
                        }, b), b.updateBezierControlPoints()
                    },
                    updateElement: function (a, b, c) {
                        var d = this,
                            e = a.custom || {},
                            g = d.getDataset(),
                            h = d.chart.scale,
                            i = d.chart.options.elements.point,
                            j = h.getPointPositionForValue(b, g.data[b]);
                        void 0 !== g.radius && void 0 === g.pointRadius && (g.pointRadius = g.radius), void 0 !== g.hitRadius && void 0 === g.pointHitRadius && (g.pointHitRadius = g.hitRadius), f.extend(a, {
                            _datasetIndex: d.index,
                            _index: b,
                            _scale: h,
                            _model: {
                                x: c ? h.xCenter : j.x,
                                y: c ? h.yCenter : j.y,
                                tension: e.tension ? e.tension : f.valueOrDefault(g.lineTension, d.chart.options.elements.line.tension),
                                radius: e.radius ? e.radius : f.valueAtIndexOrDefault(g.pointRadius, b, i.radius),
                                backgroundColor: e.backgroundColor ? e.backgroundColor : f.valueAtIndexOrDefault(g.pointBackgroundColor, b, i.backgroundColor),
                                borderColor: e.borderColor ? e.borderColor : f.valueAtIndexOrDefault(g.pointBorderColor, b, i.borderColor),
                                borderWidth: e.borderWidth ? e.borderWidth : f.valueAtIndexOrDefault(g.pointBorderWidth, b, i.borderWidth),
                                pointStyle: e.pointStyle ? e.pointStyle : f.valueAtIndexOrDefault(g.pointStyle, b, i.pointStyle),
                                hitRadius: e.hitRadius ? e.hitRadius : f.valueAtIndexOrDefault(g.pointHitRadius, b, i.hitRadius)
                            }
                        }), a._model.skip = e.skip ? e.skip : isNaN(a._model.x) || isNaN(a._model.y)
                    },
                    updateBezierControlPoints: function () {
                        var a = this.chart.chartArea,
                            b = this.getMeta();
                        f.each(b.data, function (c, d) {
                            var e = c._model,
                                g = f.splineCurve(f.previousItem(b.data, d, !0)._model, e, f.nextItem(b.data, d, !0)._model, e.tension);
                            e.controlPointPreviousX = Math.max(Math.min(g.previous.x, a.right), a.left), e.controlPointPreviousY = Math.max(Math.min(g.previous.y, a.bottom), a.top), e.controlPointNextX = Math.max(Math.min(g.next.x, a.right), a.left), e.controlPointNextY = Math.max(Math.min(g.next.y, a.bottom), a.top), c.pivot()
                        })
                    },
                    setHoverStyle: function (a) {
                        var b = this.chart.data.datasets[a._datasetIndex],
                            c = a.custom || {},
                            d = a._index,
                            e = a._model;
                        e.radius = c.hoverRadius ? c.hoverRadius : f.valueAtIndexOrDefault(b.pointHoverRadius, d, this.chart.options.elements.point.hoverRadius), e.backgroundColor = c.hoverBackgroundColor ? c.hoverBackgroundColor : f.valueAtIndexOrDefault(b.pointHoverBackgroundColor, d, f.getHoverColor(e.backgroundColor)), e.borderColor = c.hoverBorderColor ? c.hoverBorderColor : f.valueAtIndexOrDefault(b.pointHoverBorderColor, d, f.getHoverColor(e.borderColor)), e.borderWidth = c.hoverBorderWidth ? c.hoverBorderWidth : f.valueAtIndexOrDefault(b.pointHoverBorderWidth, d, e.borderWidth)
                    },
                    removeHoverStyle: function (a) {
                        var b = this.chart.data.datasets[a._datasetIndex],
                            c = a.custom || {},
                            d = a._index,
                            e = a._model,
                            g = this.chart.options.elements.point;
                        e.radius = c.radius ? c.radius : f.valueAtIndexOrDefault(b.pointRadius, d, g.radius), e.backgroundColor = c.backgroundColor ? c.backgroundColor : f.valueAtIndexOrDefault(b.pointBackgroundColor, d, g.backgroundColor), e.borderColor = c.borderColor ? c.borderColor : f.valueAtIndexOrDefault(b.pointBorderColor, d, g.borderColor), e.borderWidth = c.borderWidth ? c.borderWidth : f.valueAtIndexOrDefault(b.pointBorderWidth, d, g.borderWidth)
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        21: [function (a, b, c) {
            "use strict";
            a(25)._set("scatter", {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        id: "x-axis-1",
                        type: "linear",
                        position: "bottom"
                    }],
                    yAxes: [{
                        id: "y-axis-1",
                        type: "linear",
                        position: "left"
                    }]
                },
                showLines: !1,
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        label: function (a) {
                            return "(" + a.xLabel + ", " + a.yLabel + ")"
                        }
                    }
                }
            }), b.exports = function (a) {
                a.controllers.scatter = a.controllers.line
            }
        }, {
            25: 25
        }],
        22: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(26),
                f = a(45);
            d._set("global", {
                animation: {
                    duration: 1e3,
                    easing: "easeOutQuart",
                    onProgress: f.noop,
                    onComplete: f.noop
                }
            }), b.exports = function (a) {
                a.Animation = e.extend({
                    chart: null,
                    currentStep: 0,
                    numSteps: 60,
                    easing: "",
                    render: null,
                    onAnimationProgress: null,
                    onAnimationComplete: null
                }), a.animationService = {
                    frameDuration: 17,
                    animations: [],
                    dropFrames: 0,
                    request: null,
                    addAnimation: function (a, b, c, d) {
                        var e, f, g = this.animations;
                        for (b.chart = a, d || (a.animating = !0), e = 0, f = g.length; e < f; ++e)
                            if (g[e].chart === a) return void(g[e] = b);
                        g.push(b), 1 === g.length && this.requestAnimationFrame()
                    },
                    cancelAnimation: function (a) {
                        var b = f.findIndex(this.animations, function (b) {
                            return b.chart === a
                        }); - 1 !== b && (this.animations.splice(b, 1), a.animating = !1)
                    },
                    requestAnimationFrame: function () {
                        var a = this;
                        null === a.request && (a.request = f.requestAnimFrame.call(window, function () {
                            a.request = null, a.startDigest()
                        }))
                    },
                    startDigest: function () {
                        var a = this,
                            b = Date.now(),
                            c = 0;
                        a.dropFrames > 1 && (c = Math.floor(a.dropFrames), a.dropFrames = a.dropFrames % 1), a.advance(1 + c);
                        var d = Date.now();
                        a.dropFrames += (d - b) / a.frameDuration, a.animations.length > 0 && a.requestAnimationFrame()
                    },
                    advance: function (a) {
                        for (var b, c, d = this.animations, e = 0; e < d.length;) b = d[e], c = b.chart, b.currentStep = (b.currentStep || 0) + a, b.currentStep = Math.min(b.currentStep, b.numSteps), f.callback(b.render, [c, b], c), f.callback(b.onAnimationProgress, [b], c), b.currentStep >= b.numSteps ? (f.callback(b.onAnimationComplete, [b], c), c.animating = !1, d.splice(e, 1)) : ++e
                    }
                }, Object.defineProperty(a.Animation.prototype, "animationObject", {
                    get: function () {
                        return this
                    }
                }), Object.defineProperty(a.Animation.prototype, "chartInstance", {
                    get: function () {
                        return this.chart
                    },
                    set: function (a) {
                        this.chart = a
                    }
                })
            }
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        23: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(45),
                f = a(28),
                g = a(30),
                h = a(48),
                i = a(31);
            b.exports = function (a) {
                function b(a) {
                    a = a || {};
                    var b = a.data = a.data || {};
                    return b.datasets = b.datasets || [], b.labels = b.labels || [], a.options = e.configMerge(d.global, d[a.type], a.options || {}), a
                }

                function c(b) {
                    var c = b.options;
                    e.each(b.scales, function (a) {
                        g.removeBox(b, a)
                    }), c = e.configMerge(a.defaults.global, a.defaults[b.config.type], c), b.options = b.config.options = c, b.ensureScalesHaveIDs(), b.buildOrUpdateScales(), b.tooltip._options = c.tooltips, b.tooltip.initialize()
                }

                function j(a) {
                    return "top" === a || "bottom" === a
                }
                a.types = {}, a.instances = {}, a.controllers = {}, e.extend(a.prototype, {
                    construct: function (c, d) {
                        var f = this;
                        d = b(d);
                        var g = h.acquireContext(c, d),
                            i = g && g.canvas,
                            j = i && i.height,
                            k = i && i.width;
                        if (f.id = e.uid(), f.ctx = g, f.canvas = i, f.config = d, f.width = k, f.height = j, f.aspectRatio = j ? k / j : null, f.options = d.options, f._bufferedRender = !1, f.chart = f, f.controller = f, a.instances[f.id] = f, Object.defineProperty(f, "data", {
                                get: function () {
                                    return f.config.data
                                },
                                set: function (a) {
                                    f.config.data = a
                                }
                            }), !g || !i) return void console.error("Failed to create chart: can't acquire context from the given item");
                        f.initialize(), f.update()
                    },
                    initialize: function () {
                        var a = this;
                        return i.notify(a, "beforeInit"), e.retinaScale(a, a.options.devicePixelRatio), a.bindEvents(), a.options.responsive && a.resize(!0), a.ensureScalesHaveIDs(), a.buildOrUpdateScales(), a.initToolTip(), i.notify(a, "afterInit"), a
                    },
                    clear: function () {
                        return e.canvas.clear(this), this
                    },
                    stop: function () {
                        return a.animationService.cancelAnimation(this), this
                    },
                    resize: function (a) {
                        var b = this,
                            c = b.options,
                            d = b.canvas,
                            f = c.maintainAspectRatio && b.aspectRatio || null,
                            g = Math.max(0, Math.floor(e.getMaximumWidth(d))),
                            h = Math.max(0, Math.floor(f ? g / f : e.getMaximumHeight(d)));
                        if ((b.width !== g || b.height !== h) && (d.width = b.width = g, d.height = b.height = h, d.style.width = g + "px", d.style.height = h + "px", e.retinaScale(b, c.devicePixelRatio), !a)) {
                            var j = {
                                width: g,
                                height: h
                            };
                            i.notify(b, "resize", [j]), b.options.onResize && b.options.onResize(b, j), b.stop(), b.update(b.options.responsiveAnimationDuration)
                        }
                    },
                    ensureScalesHaveIDs: function () {
                        var a = this.options,
                            b = a.scales || {},
                            c = a.scale;
                        e.each(b.xAxes, function (a, b) {
                            a.id = a.id || "x-axis-" + b
                        }), e.each(b.yAxes, function (a, b) {
                            a.id = a.id || "y-axis-" + b
                        }), c && (c.id = c.id || "scale")
                    },
                    buildOrUpdateScales: function () {
                        var b = this,
                            c = b.options,
                            d = b.scales || {},
                            f = [],
                            g = Object.keys(d).reduce(function (a, b) {
                                return a[b] = !1, a
                            }, {});
                        c.scales && (f = f.concat((c.scales.xAxes || []).map(function (a) {
                            return {
                                options: a,
                                dtype: "category",
                                dposition: "bottom"
                            }
                        }), (c.scales.yAxes || []).map(function (a) {
                            return {
                                options: a,
                                dtype: "linear",
                                dposition: "left"
                            }
                        }))), c.scale && f.push({
                            options: c.scale,
                            dtype: "radialLinear",
                            isDefault: !0,
                            dposition: "chartArea"
                        }), e.each(f, function (c) {
                            var f = c.options,
                                h = f.id,
                                i = e.valueOrDefault(f.type, c.dtype);
                            j(f.position) !== j(c.dposition) && (f.position = c.dposition), g[h] = !0;
                            var k = null;
                            if (h in d && d[h].type === i) k = d[h], k.options = f, k.ctx = b.ctx, k.chart = b;
                            else {
                                var l = a.scaleService.getScaleConstructor(i);
                                if (!l) return;
                                k = new l({
                                    id: h,
                                    type: i,
                                    options: f,
                                    ctx: b.ctx,
                                    chart: b
                                }), d[k.id] = k
                            }
                            k.mergeTicksOptions(), c.isDefault && (b.scale = k)
                        }), e.each(g, function (a, b) {
                            a || delete d[b]
                        }), b.scales = d, a.scaleService.addScalesToLayout(this)
                    },
                    buildOrUpdateControllers: function () {
                        var b = this,
                            c = [],
                            d = [];
                        return e.each(b.data.datasets, function (e, f) {
                            var g = b.getDatasetMeta(f),
                                h = e.type || b.config.type;
                            if (g.type && g.type !== h && (b.destroyDatasetMeta(f), g = b.getDatasetMeta(f)), g.type = h, c.push(g.type), g.controller) g.controller.updateIndex(f), g.controller.linkScales();
                            else {
                                var i = a.controllers[g.type];
                                if (void 0 === i) throw new Error('"' + g.type + '" is not a chart type.');
                                g.controller = new i(b, f), d.push(g.controller)
                            }
                        }, b), d
                    },
                    resetElements: function () {
                        var a = this;
                        e.each(a.data.datasets, function (b, c) {
                            a.getDatasetMeta(c).controller.reset()
                        }, a)
                    },
                    reset: function () {
                        this.resetElements(), this.tooltip.initialize()
                    },
                    update: function (a) {
                        var b = this;
                        if (a && "object" == typeof a || (a = {
                                duration: a,
                                lazy: arguments[1]
                            }), c(b), i._invalidate(b), !1 !== i.notify(b, "beforeUpdate")) {
                            b.tooltip._data = b.data;
                            var d = b.buildOrUpdateControllers();
                            e.each(b.data.datasets, function (a, c) {
                                b.getDatasetMeta(c).controller.buildOrUpdateElements()
                            }, b), b.updateLayout(), b.options.animation && b.options.animation.duration && e.each(d, function (a) {
                                a.reset()
                            }), b.updateDatasets(), b.tooltip.initialize(), b.lastActive = [], i.notify(b, "afterUpdate"), b._bufferedRender ? b._bufferedRequest = {
                                duration: a.duration,
                                easing: a.easing,
                                lazy: a.lazy
                            } : b.render(a)
                        }
                    },
                    updateLayout: function () {
                        var a = this;
                        !1 !== i.notify(a, "beforeLayout") && (g.update(this, this.width, this.height), i.notify(a, "afterScaleUpdate"), i.notify(a, "afterLayout"))
                    },
                    updateDatasets: function () {
                        var a = this;
                        if (!1 !== i.notify(a, "beforeDatasetsUpdate")) {
                            for (var b = 0, c = a.data.datasets.length; b < c; ++b) a.updateDataset(b);
                            i.notify(a, "afterDatasetsUpdate")
                        }
                    },
                    updateDataset: function (a) {
                        var b = this,
                            c = b.getDatasetMeta(a),
                            d = {
                                meta: c,
                                index: a
                            };
                        !1 !== i.notify(b, "beforeDatasetUpdate", [d]) && (c.controller.update(), i.notify(b, "afterDatasetUpdate", [d]))
                    },
                    render: function (b) {
                        var c = this;
                        b && "object" == typeof b || (b = {
                            duration: b,
                            lazy: arguments[1]
                        });
                        var d = b.duration,
                            f = b.lazy;
                        if (!1 !== i.notify(c, "beforeRender")) {
                            var g = c.options.animation,
                                h = function (a) {
                                    i.notify(c, "afterRender"), e.callback(g && g.onComplete, [a], c)
                                };
                            if (g && (void 0 !== d && 0 !== d || void 0 === d && 0 !== g.duration)) {
                                var j = new a.Animation({
                                    numSteps: (d || g.duration) / 16.66,
                                    easing: b.easing || g.easing,
                                    render: function (a, b) {
                                        var c = e.easing.effects[b.easing],
                                            d = b.currentStep,
                                            f = d / b.numSteps;
                                        a.draw(c(f), f, d)
                                    },
                                    onAnimationProgress: g.onProgress,
                                    onAnimationComplete: h
                                });
                                a.animationService.addAnimation(c, j, d, f)
                            } else c.draw(), h(new a.Animation({
                                numSteps: 0,
                                chart: c
                            }));
                            return c
                        }
                    },
                    draw: function (a) {
                        var b = this;
                        b.clear(), e.isNullOrUndef(a) && (a = 1), b.transition(a), !1 !== i.notify(b, "beforeDraw", [a]) && (e.each(b.boxes, function (a) {
                            a.draw(b.chartArea)
                        }, b), b.scale && b.scale.draw(), b.drawDatasets(a), b._drawTooltip(a), i.notify(b, "afterDraw", [a]))
                    },
                    transition: function (a) {
                        for (var b = this, c = 0, d = (b.data.datasets || []).length; c < d; ++c) b.isDatasetVisible(c) && b.getDatasetMeta(c).controller.transition(a);
                        b.tooltip.transition(a)
                    },
                    drawDatasets: function (a) {
                        var b = this;
                        if (!1 !== i.notify(b, "beforeDatasetsDraw", [a])) {
                            for (var c = (b.data.datasets || []).length - 1; c >= 0; --c) b.isDatasetVisible(c) && b.drawDataset(c, a);
                            i.notify(b, "afterDatasetsDraw", [a])
                        }
                    },
                    drawDataset: function (a, b) {
                        var c = this,
                            d = c.getDatasetMeta(a),
                            e = {
                                meta: d,
                                index: a,
                                easingValue: b
                            };
                        !1 !== i.notify(c, "beforeDatasetDraw", [e]) && (d.controller.draw(b), i.notify(c, "afterDatasetDraw", [e]))
                    },
                    _drawTooltip: function (a) {
                        var b = this,
                            c = b.tooltip,
                            d = {
                                tooltip: c,
                                easingValue: a
                            };
                        !1 !== i.notify(b, "beforeTooltipDraw", [d]) && (c.draw(), i.notify(b, "afterTooltipDraw", [d]))
                    },
                    getElementAtEvent: function (a) {
                        return f.modes.single(this, a)
                    },
                    getElementsAtEvent: function (a) {
                        return f.modes.label(this, a, {
                            intersect: !0
                        })
                    },
                    getElementsAtXAxis: function (a) {
                        return f.modes["x-axis"](this, a, {
                            intersect: !0
                        })
                    },
                    getElementsAtEventForMode: function (a, b, c) {
                        var d = f.modes[b];
                        return "function" == typeof d ? d(this, a, c) : []
                    },
                    getDatasetAtEvent: function (a) {
                        return f.modes.dataset(this, a, {
                            intersect: !0
                        })
                    },
                    getDatasetMeta: function (a) {
                        var b = this,
                            c = b.data.datasets[a];
                        c._meta || (c._meta = {});
                        var d = c._meta[b.id];
                        return d || (d = c._meta[b.id] = {
                            type: null,
                            data: [],
                            dataset: null,
                            controller: null,
                            hidden: null,
                            xAxisID: null,
                            yAxisID: null
                        }), d
                    },
                    getVisibleDatasetCount: function () {
                        for (var a = 0, b = 0, c = this.data.datasets.length; b < c; ++b) this.isDatasetVisible(b) && a++;
                        return a
                    },
                    isDatasetVisible: function (a) {
                        var b = this.getDatasetMeta(a);
                        return "boolean" == typeof b.hidden ? !b.hidden : !this.data.datasets[a].hidden
                    },
                    generateLegend: function () {
                        return this.options.legendCallback(this)
                    },
                    destroyDatasetMeta: function (a) {
                        var b = this.id,
                            c = this.data.datasets[a],
                            d = c._meta && c._meta[b];
                        d && (d.controller.destroy(), delete c._meta[b])
                    },
                    destroy: function () {
                        var b, c, d = this,
                            f = d.canvas;
                        for (d.stop(), b = 0, c = d.data.datasets.length; b < c; ++b) d.destroyDatasetMeta(b);
                        f && (d.unbindEvents(), e.canvas.clear(d), h.releaseContext(d.ctx), d.canvas = null, d.ctx = null), i.notify(d, "destroy"), delete a.instances[d.id]
                    },
                    toBase64Image: function () {
                        return this.canvas.toDataURL.apply(this.canvas, arguments)
                    },
                    initToolTip: function () {
                        var b = this;
                        b.tooltip = new a.Tooltip({
                            _chart: b,
                            _chartInstance: b,
                            _data: b.data,
                            _options: b.options.tooltips
                        }, b)
                    },
                    bindEvents: function () {
                        var a = this,
                            b = a._listeners = {},
                            c = function () {
                                a.eventHandler.apply(a, arguments)
                            };
                        e.each(a.options.events, function (d) {
                            h.addEventListener(a, d, c), b[d] = c
                        }), a.options.responsive && (c = function () {
                            a.resize()
                        }, h.addEventListener(a, "resize", c), b.resize = c)
                    },
                    unbindEvents: function () {
                        var a = this,
                            b = a._listeners;
                        b && (delete a._listeners, e.each(b, function (b, c) {
                            h.removeEventListener(a, c, b)
                        }))
                    },
                    updateHoverStyle: function (a, b, c) {
                        var d, e, f, g = c ? "setHoverStyle" : "removeHoverStyle";
                        for (e = 0, f = a.length; e < f; ++e)(d = a[e]) && this.getDatasetMeta(d._datasetIndex).controller[g](d)
                    },
                    eventHandler: function (a) {
                        var b = this,
                            c = b.tooltip;
                        if (!1 !== i.notify(b, "beforeEvent", [a])) {
                            b._bufferedRender = !0, b._bufferedRequest = null;
                            var d = b.handleEvent(a);
                            c && (d = c._start ? c.handleEvent(a) : d | c.handleEvent(a)), i.notify(b, "afterEvent", [a]);
                            var e = b._bufferedRequest;
                            return e ? b.render(e) : d && !b.animating && (b.stop(), b.render(b.options.hover.animationDuration, !0)), b._bufferedRender = !1, b._bufferedRequest = null, b
                        }
                    },
                    handleEvent: function (a) {
                        var b = this,
                            c = b.options || {},
                            d = c.hover,
                            f = !1;
                        return b.lastActive = b.lastActive || [], "mouseout" === a.type ? b.active = [] : b.active = b.getElementsAtEventForMode(a, d.mode, d), e.callback(c.onHover || c.hover.onHover, [a.native, b.active], b), "mouseup" !== a.type && "click" !== a.type || c.onClick && c.onClick.call(b, a.native, b.active), b.lastActive.length && b.updateHoverStyle(b.lastActive, d.mode, !1), b.active.length && d.mode && b.updateHoverStyle(b.active, d.mode, !0), f = !e.arrayEquals(b.active, b.lastActive), b.lastActive = b.active, f
                    }
                }), a.Controller = a
            }
        }, {
            25: 25,
            28: 28,
            30: 30,
            31: 31,
            45: 45,
            48: 48
        }],
        24: [function (a, b, c) {
            "use strict";
            var d = a(45);
            b.exports = function (a) {
                function b(a, b) {
                    if (a._chartjs) return void a._chartjs.listeners.push(b);
                    Object.defineProperty(a, "_chartjs", {
                        configurable: !0,
                        enumerable: !1,
                        value: {
                            listeners: [b]
                        }
                    }), e.forEach(function (b) {
                        var c = "onData" + b.charAt(0).toUpperCase() + b.slice(1),
                            e = a[b];
                        Object.defineProperty(a, b, {
                            configurable: !0,
                            enumerable: !1,
                            value: function () {
                                var b = Array.prototype.slice.call(arguments),
                                    f = e.apply(this, b);
                                return d.each(a._chartjs.listeners, function (a) {
                                    "function" == typeof a[c] && a[c].apply(a, b)
                                }), f
                            }
                        })
                    })
                }

                function c(a, b) {
                    var c = a._chartjs;
                    if (c) {
                        var d = c.listeners,
                            f = d.indexOf(b); - 1 !== f && d.splice(f, 1), d.length > 0 || (e.forEach(function (b) {
                            delete a[b]
                        }), delete a._chartjs)
                    }
                }
                var e = ["push", "pop", "shift", "splice", "unshift"];
                a.DatasetController = function (a, b) {
                    this.initialize(a, b)
                }, d.extend(a.DatasetController.prototype, {
                    datasetElementType: null,
                    dataElementType: null,
                    initialize: function (a, b) {
                        var c = this;
                        c.chart = a, c.index = b, c.linkScales(), c.addElements()
                    },
                    updateIndex: function (a) {
                        this.index = a
                    },
                    linkScales: function () {
                        var a = this,
                            b = a.getMeta(),
                            c = a.getDataset();
                        null !== b.xAxisID && b.xAxisID in a.chart.scales || (b.xAxisID = c.xAxisID || a.chart.options.scales.xAxes[0].id), null !== b.yAxisID && b.yAxisID in a.chart.scales || (b.yAxisID = c.yAxisID || a.chart.options.scales.yAxes[0].id)
                    },
                    getDataset: function () {
                        return this.chart.data.datasets[this.index]
                    },
                    getMeta: function () {
                        return this.chart.getDatasetMeta(this.index)
                    },
                    getScaleForId: function (a) {
                        return this.chart.scales[a]
                    },
                    reset: function () {
                        this.update(!0)
                    },
                    destroy: function () {
                        this._data && c(this._data, this)
                    },
                    createMetaDataset: function () {
                        var a = this,
                            b = a.datasetElementType;
                        return b && new b({
                            _chart: a.chart,
                            _datasetIndex: a.index
                        })
                    },
                    createMetaData: function (a) {
                        var b = this,
                            c = b.dataElementType;
                        return c && new c({
                            _chart: b.chart,
                            _datasetIndex: b.index,
                            _index: a
                        })
                    },
                    addElements: function () {
                        var a, b, c = this,
                            d = c.getMeta(),
                            e = c.getDataset().data || [],
                            f = d.data;
                        for (a = 0, b = e.length; a < b; ++a) f[a] = f[a] || c.createMetaData(a);
                        d.dataset = d.dataset || c.createMetaDataset()
                    },
                    addElementAndReset: function (a) {
                        var b = this.createMetaData(a);
                        this.getMeta().data.splice(a, 0, b), this.updateElement(b, a, !0)
                    },
                    buildOrUpdateElements: function () {
                        var a = this,
                            d = a.getDataset(),
                            e = d.data || (d.data = []);
                        a._data !== e && (a._data && c(a._data, a), b(e, a), a._data = e), a.resyncElements()
                    },
                    update: d.noop,
                    transition: function (a) {
                        for (var b = this.getMeta(), c = b.data || [], d = c.length, e = 0; e < d; ++e) c[e].transition(a);
                        b.dataset && b.dataset.transition(a)
                    },
                    draw: function () {
                        var a = this.getMeta(),
                            b = a.data || [],
                            c = b.length,
                            d = 0;
                        for (a.dataset && a.dataset.draw(); d < c; ++d) b[d].draw()
                    },
                    removeHoverStyle: function (a, b) {
                        var c = this.chart.data.datasets[a._datasetIndex],
                            e = a._index,
                            f = a.custom || {},
                            g = d.valueAtIndexOrDefault,
                            h = a._model;
                        h.backgroundColor = f.backgroundColor ? f.backgroundColor : g(c.backgroundColor, e, b.backgroundColor), h.borderColor = f.borderColor ? f.borderColor : g(c.borderColor, e, b.borderColor), h.borderWidth = f.borderWidth ? f.borderWidth : g(c.borderWidth, e, b.borderWidth)
                    },
                    setHoverStyle: function (a) {
                        var b = this.chart.data.datasets[a._datasetIndex],
                            c = a._index,
                            e = a.custom || {},
                            f = d.valueAtIndexOrDefault,
                            g = d.getHoverColor,
                            h = a._model;
                        h.backgroundColor = e.hoverBackgroundColor ? e.hoverBackgroundColor : f(b.hoverBackgroundColor, c, g(h.backgroundColor)), h.borderColor = e.hoverBorderColor ? e.hoverBorderColor : f(b.hoverBorderColor, c, g(h.borderColor)), h.borderWidth = e.hoverBorderWidth ? e.hoverBorderWidth : f(b.hoverBorderWidth, c, h.borderWidth)
                    },
                    resyncElements: function () {
                        var a = this,
                            b = a.getMeta(),
                            c = a.getDataset().data,
                            d = b.data.length,
                            e = c.length;
                        e < d ? b.data.splice(e, d - e) : e > d && a.insertElements(d, e - d)
                    },
                    insertElements: function (a, b) {
                        for (var c = 0; c < b; ++c) this.addElementAndReset(a + c)
                    },
                    onDataPush: function () {
                        this.insertElements(this.getDataset().data.length - 1, arguments.length)
                    },
                    onDataPop: function () {
                        this.getMeta().data.pop()
                    },
                    onDataShift: function () {
                        this.getMeta().data.shift()
                    },
                    onDataSplice: function (a, b) {
                        this.getMeta().data.splice(a, b), this.insertElements(a, arguments.length - 2)
                    },
                    onDataUnshift: function () {
                        this.insertElements(0, arguments.length)
                    }
                }), a.DatasetController.extend = d.inherits
            }
        }, {
            45: 45
        }],
        25: [function (a, b, c) {
            "use strict";
            var d = a(45);
            b.exports = {
                _set: function (a, b) {
                    return d.merge(this[a] || (this[a] = {}), b)
                }
            }
        }, {
            45: 45
        }],
        26: [function (a, b, c) {
            "use strict";

            function d(a, b, c, d) {
                var f, g, h, i, j, k, l, m, n, o = Object.keys(c);
                for (f = 0, g = o.length; f < g; ++f)
                    if (h = o[f], k = c[h], b.hasOwnProperty(h) || (b[h] = k), (i = b[h]) !== k && "_" !== h[0]) {
                        if (a.hasOwnProperty(h) || (a[h] = i), j = a[h], (l = typeof k) === typeof j)
                            if ("string" === l) {
                                if (m = e(j), m.valid && (n = e(k), n.valid)) {
                                    b[h] = n.mix(m, d).rgbString();
                                    continue
                                }
                            } else if ("number" === l && isFinite(j) && isFinite(k)) {
                            b[h] = j + (k - j) * d;
                            continue
                        }
                        b[h] = k
                    }
            }
            var e = a(2),
                f = a(45),
                g = function (a) {
                    f.extend(this, a), this.initialize.apply(this, arguments)
                };
            f.extend(g.prototype, {
                initialize: function () {
                    this.hidden = !1
                },
                pivot: function () {
                    var a = this;
                    return a._view || (a._view = f.clone(a._model)), a._start = {}, a
                },
                transition: function (a) {
                    var b = this,
                        c = b._model,
                        e = b._start,
                        f = b._view;
                    return c && 1 !== a ? (f || (f = b._view = {}), e || (e = b._start = {}), d(e, f, c, a), b) : (b._view = c, b._start = null, b)
                },
                tooltipPosition: function () {
                    return {
                        x: this._model.x,
                        y: this._model.y
                    }
                },
                hasValue: function () {
                    return f.isNumber(this._model.x) && f.isNumber(this._model.y)
                }
            }), g.extend = f.inherits, b.exports = g
        }, {
            2: 2,
            45: 45
        }],
        27: [function (a, b, c) {
            "use strict";
            var d = a(2),
                e = a(25),
                f = a(45);
            b.exports = function (a) {
                function b(a, b, c) {
                    var d;
                    return "string" == typeof a ? (d = parseInt(a, 10), -1 !== a.indexOf("%") && (d = d / 100 * b.parentNode[c])) : d = a, d
                }

                function c(a) {
                    return void 0 !== a && null !== a && "none" !== a
                }

                function g(a, d, e) {
                    var f = document.defaultView,
                        g = a.parentNode,
                        h = f.getComputedStyle(a)[d],
                        i = f.getComputedStyle(g)[d],
                        j = c(h),
                        k = c(i),
                        l = Number.POSITIVE_INFINITY;
                    return j || k ? Math.min(j ? b(h, a, e) : l, k ? b(i, g, e) : l) : "none"
                }
                f.configMerge = function () {
                    return f.merge(f.clone(arguments[0]), [].slice.call(arguments, 1), {
                        merger: function (b, c, d, e) {
                            var g = c[b] || {},
                                h = d[b];
                            "scales" === b ? c[b] = f.scaleMerge(g, h) : "scale" === b ? c[b] = f.merge(g, [a.scaleService.getScaleDefaults(h.type), h]) : f._merger(b, c, d, e)
                        }
                    })
                }, f.scaleMerge = function () {
                    return f.merge(f.clone(arguments[0]), [].slice.call(arguments, 1), {
                        merger: function (b, c, d, e) {
                            if ("xAxes" === b || "yAxes" === b) {
                                var g, h, i, j = d[b].length;
                                for (c[b] || (c[b] = []), g = 0; g < j; ++g) i = d[b][g], h = f.valueOrDefault(i.type, "xAxes" === b ? "category" : "linear"), g >= c[b].length && c[b].push({}), !c[b][g].type || i.type && i.type !== c[b][g].type ? f.merge(c[b][g], [a.scaleService.getScaleDefaults(h), i]) : f.merge(c[b][g], i)
                            } else f._merger(b, c, d, e)
                        }
                    })
                }, f.where = function (a, b) {
                    if (f.isArray(a) && Array.prototype.filter) return a.filter(b);
                    var c = [];
                    return f.each(a, function (a) {
                        b(a) && c.push(a)
                    }), c
                }, f.findIndex = Array.prototype.findIndex ? function (a, b, c) {
                    return a.findIndex(b, c)
                } : function (a, b, c) {
                    c = void 0 === c ? a : c;
                    for (var d = 0, e = a.length; d < e; ++d)
                        if (b.call(c, a[d], d, a)) return d;
                    return -1
                }, f.findNextWhere = function (a, b, c) {
                    f.isNullOrUndef(c) && (c = -1);
                    for (var d = c + 1; d < a.length; d++) {
                        var e = a[d];
                        if (b(e)) return e
                    }
                }, f.findPreviousWhere = function (a, b, c) {
                    f.isNullOrUndef(c) && (c = a.length);
                    for (var d = c - 1; d >= 0; d--) {
                        var e = a[d];
                        if (b(e)) return e
                    }
                }, f.isNumber = function (a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                }, f.almostEquals = function (a, b, c) {
                    return Math.abs(a - b) < c
                }, f.almostWhole = function (a, b) {
                    var c = Math.round(a);
                    return c - b < a && c + b > a
                }, f.max = function (a) {
                    return a.reduce(function (a, b) {
                        return isNaN(b) ? a : Math.max(a, b)
                    }, Number.NEGATIVE_INFINITY)
                }, f.min = function (a) {
                    return a.reduce(function (a, b) {
                        return isNaN(b) ? a : Math.min(a, b)
                    }, Number.POSITIVE_INFINITY)
                }, f.sign = Math.sign ? function (a) {
                    return Math.sign(a)
                } : function (a) {
                    return a = +a, 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1
                }, f.log10 = Math.log10 ? function (a) {
                    return Math.log10(a)
                } : function (a) {
                    var b = Math.log(a) * Math.LOG10E,
                        c = Math.round(b);
                    return a === Math.pow(10, c) ? c : b
                }, f.toRadians = function (a) {
                    return a * (Math.PI / 180)
                }, f.toDegrees = function (a) {
                    return a * (180 / Math.PI)
                }, f.getAngleFromPoint = function (a, b) {
                    var c = b.x - a.x,
                        d = b.y - a.y,
                        e = Math.sqrt(c * c + d * d),
                        f = Math.atan2(d, c);
                    return f < -.5 * Math.PI && (f += 2 * Math.PI), {
                        angle: f,
                        distance: e
                    }
                }, f.distanceBetweenPoints = function (a, b) {
                    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
                }, f.aliasPixel = function (a) {
                    return a % 2 == 0 ? 0 : .5
                }, f.splineCurve = function (a, b, c, d) {
                    var e = a.skip ? b : a,
                        f = b,
                        g = c.skip ? b : c,
                        h = Math.sqrt(Math.pow(f.x - e.x, 2) + Math.pow(f.y - e.y, 2)),
                        i = Math.sqrt(Math.pow(g.x - f.x, 2) + Math.pow(g.y - f.y, 2)),
                        j = h / (h + i),
                        k = i / (h + i);
                    j = isNaN(j) ? 0 : j, k = isNaN(k) ? 0 : k;
                    var l = d * j,
                        m = d * k;
                    return {
                        previous: {
                            x: f.x - l * (g.x - e.x),
                            y: f.y - l * (g.y - e.y)
                        },
                        next: {
                            x: f.x + m * (g.x - e.x),
                            y: f.y + m * (g.y - e.y)
                        }
                    }
                }, f.EPSILON = Number.EPSILON || 1e-14, f.splineCurveMonotone = function (a) {
                    var b, c, d, e, g = (a || []).map(function (a) {
                            return {
                                model: a._model,
                                deltaK: 0,
                                mK: 0
                            }
                        }),
                        h = g.length;
                    for (b = 0; b < h; ++b)
                        if (d = g[b], !d.model.skip) {
                            if (c = b > 0 ? g[b - 1] : null, (e = b < h - 1 ? g[b + 1] : null) && !e.model.skip) {
                                var i = e.model.x - d.model.x;
                                d.deltaK = 0 !== i ? (e.model.y - d.model.y) / i : 0
                            }!c || c.model.skip ? d.mK = d.deltaK : !e || e.model.skip ? d.mK = c.deltaK : this.sign(c.deltaK) !== this.sign(d.deltaK) ? d.mK = 0 : d.mK = (c.deltaK + d.deltaK) / 2
                        } var j, k, l, m;
                    for (b = 0; b < h - 1; ++b) d = g[b], e = g[b + 1], d.model.skip || e.model.skip || (f.almostEquals(d.deltaK, 0, this.EPSILON) ? d.mK = e.mK = 0 : (j = d.mK / d.deltaK, k = e.mK / d.deltaK, (m = Math.pow(j, 2) + Math.pow(k, 2)) <= 9 || (l = 3 / Math.sqrt(m), d.mK = j * l * d.deltaK, e.mK = k * l * d.deltaK)));
                    var n;
                    for (b = 0; b < h; ++b) d = g[b], d.model.skip || (c = b > 0 ? g[b - 1] : null, e = b < h - 1 ? g[b + 1] : null, c && !c.model.skip && (n = (d.model.x - c.model.x) / 3, d.model.controlPointPreviousX = d.model.x - n, d.model.controlPointPreviousY = d.model.y - n * d.mK), e && !e.model.skip && (n = (e.model.x - d.model.x) / 3, d.model.controlPointNextX = d.model.x + n, d.model.controlPointNextY = d.model.y + n * d.mK))
                }, f.nextItem = function (a, b, c) {
                    return c ? b >= a.length - 1 ? a[0] : a[b + 1] : b >= a.length - 1 ? a[a.length - 1] : a[b + 1]
                }, f.previousItem = function (a, b, c) {
                    return c ? b <= 0 ? a[a.length - 1] : a[b - 1] : b <= 0 ? a[0] : a[b - 1]
                }, f.niceNum = function (a, b) {
                    var c = Math.floor(f.log10(a)),
                        d = a / Math.pow(10, c);
                    return (b ? d < 1.5 ? 1 : d < 3 ? 2 : d < 7 ? 5 : 10 : d <= 1 ? 1 : d <= 2 ? 2 : d <= 5 ? 5 : 10) * Math.pow(10, c)
                }, f.requestAnimFrame = function () {
                    return "undefined" == typeof window ? function (a) {
                        a()
                    } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
                        return window.setTimeout(a, 1e3 / 60)
                    }
                }(), f.getRelativePosition = function (a, b) {
                    var c, d, e = a.originalEvent || a,
                        g = a.currentTarget || a.srcElement,
                        h = g.getBoundingClientRect(),
                        i = e.touches;
                    i && i.length > 0 ? (c = i[0].clientX, d = i[0].clientY) : (c = e.clientX, d = e.clientY);
                    var j = parseFloat(f.getStyle(g, "padding-left")),
                        k = parseFloat(f.getStyle(g, "padding-top")),
                        l = parseFloat(f.getStyle(g, "padding-right")),
                        m = parseFloat(f.getStyle(g, "padding-bottom")),
                        n = h.right - h.left - j - l,
                        o = h.bottom - h.top - k - m;
                    return c = Math.round((c - h.left - j) / n * g.width / b.currentDevicePixelRatio), d = Math.round((d - h.top - k) / o * g.height / b.currentDevicePixelRatio), {
                        x: c,
                        y: d
                    }
                }, f.getConstraintWidth = function (a) {
                    return g(a, "max-width", "clientWidth")
                }, f.getConstraintHeight = function (a) {
                    return g(a, "max-height", "clientHeight")
                }, f.getMaximumWidth = function (a) {
                    var b = a.parentNode;
                    if (!b) return a.clientWidth;
                    var c = parseInt(f.getStyle(b, "padding-left"), 10),
                        d = parseInt(f.getStyle(b, "padding-right"), 10),
                        e = b.clientWidth - c - d,
                        g = f.getConstraintWidth(a);
                    return isNaN(g) ? e : Math.min(e, g)
                }, f.getMaximumHeight = function (a) {
                    var b = a.parentNode;
                    if (!b) return a.clientHeight;
                    var c = parseInt(f.getStyle(b, "padding-top"), 10),
                        d = parseInt(f.getStyle(b, "padding-bottom"), 10),
                        e = b.clientHeight - c - d,
                        g = f.getConstraintHeight(a);
                    return isNaN(g) ? e : Math.min(e, g)
                }, f.getStyle = function (a, b) {
                    return a.currentStyle ? a.currentStyle[b] : document.defaultView.getComputedStyle(a, null).getPropertyValue(b)
                }, f.retinaScale = function (a, b) {
                    var c = a.currentDevicePixelRatio = b || window.devicePixelRatio || 1;
                    if (1 !== c) {
                        var d = a.canvas,
                            e = a.height,
                            f = a.width;
                        d.height = e * c, d.width = f * c, a.ctx.scale(c, c), d.style.height || d.style.width || (d.style.height = e + "px", d.style.width = f + "px")
                    }
                }, f.fontString = function (a, b, c) {
                    return b + " " + a + "px " + c
                }, f.longestText = function (a, b, c, d) {
                    d = d || {};
                    var e = d.data = d.data || {},
                        g = d.garbageCollect = d.garbageCollect || [];
                    d.font !== b && (e = d.data = {}, g = d.garbageCollect = [], d.font = b), a.font = b;
                    var h = 0;
                    f.each(c, function (b) {
                        void 0 !== b && null !== b && !0 !== f.isArray(b) ? h = f.measureText(a, e, g, h, b) : f.isArray(b) && f.each(b, function (b) {
                            void 0 === b || null === b || f.isArray(b) || (h = f.measureText(a, e, g, h, b))
                        })
                    });
                    var i = g.length / 2;
                    if (i > c.length) {
                        for (var j = 0; j < i; j++) delete e[g[j]];
                        g.splice(0, i)
                    }
                    return h
                }, f.measureText = function (a, b, c, d, e) {
                    var f = b[e];
                    return f || (f = b[e] = a.measureText(e).width, c.push(e)), f > d && (d = f), d
                }, f.numberOfLabelLines = function (a) {
                    var b = 1;
                    return f.each(a, function (a) {
                        f.isArray(a) && a.length > b && (b = a.length)
                    }), b
                }, f.color = d ? function (a) {
                    return a instanceof CanvasGradient && (a = e.global.defaultColor), d(a)
                } : function (a) {
                    return console.error("Color.js not found!"), a
                }, f.getHoverColor = function (a) {
                    return a instanceof CanvasPattern ? a : f.color(a).saturate(.5).darken(.1).rgbString()
                }
            }
        }, {
            2: 2,
            25: 25,
            45: 45
        }],
        28: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                return a.native ? {
                    x: a.x,
                    y: a.y
                } : j.getRelativePosition(a, b)
            }

            function e(a, b) {
                var c, d, e, f, g, h = a.data.datasets;
                for (d = 0, f = h.length; d < f; ++d)
                    if (a.isDatasetVisible(d))
                        for (c = a.getDatasetMeta(d), e = 0, g = c.data.length; e < g; ++e) {
                            var i = c.data[e];
                            i._view.skip || b(i)
                        }
            }

            function f(a, b) {
                var c = [];
                return e(a, function (a) {
                    a.inRange(b.x, b.y) && c.push(a)
                }), c
            }

            function g(a, b, c, d) {
                var f = Number.POSITIVE_INFINITY,
                    g = [];
                return e(a, function (a) {
                    if (!c || a.inRange(b.x, b.y)) {
                        var e = a.getCenterPoint(),
                            h = d(b, e);
                        h < f ? (g = [a], f = h) : h === f && g.push(a)
                    }
                }), g
            }

            function h(a) {
                var b = -1 !== a.indexOf("x"),
                    c = -1 !== a.indexOf("y");
                return function (a, d) {
                    var e = b ? Math.abs(a.x - d.x) : 0,
                        f = c ? Math.abs(a.y - d.y) : 0;
                    return Math.sqrt(Math.pow(e, 2) + Math.pow(f, 2))
                }
            }

            function i(a, b, c) {
                var e = d(b, a);
                c.axis = c.axis || "x";
                var i = h(c.axis),
                    j = c.intersect ? f(a, e) : g(a, e, !1, i),
                    k = [];
                return j.length ? (a.data.datasets.forEach(function (b, c) {
                    if (a.isDatasetVisible(c)) {
                        var d = a.getDatasetMeta(c),
                            e = d.data[j[0]._index];
                        e && !e._view.skip && k.push(e)
                    }
                }), k) : []
            }
            var j = a(45);
            b.exports = {
                modes: {
                    single: function (a, b) {
                        var c = d(b, a),
                            f = [];
                        return e(a, function (a) {
                            if (a.inRange(c.x, c.y)) return f.push(a), f
                        }), f.slice(0, 1)
                    },
                    label: i,
                    index: i,
                    dataset: function (a, b, c) {
                        var e = d(b, a);
                        c.axis = c.axis || "xy";
                        var i = h(c.axis),
                            j = c.intersect ? f(a, e) : g(a, e, !1, i);
                        return j.length > 0 && (j = a.getDatasetMeta(j[0]._datasetIndex).data), j
                    },
                    "x-axis": function (a, b) {
                        return i(a, b, {
                            intersect: !1
                        })
                    },
                    point: function (a, b) {
                        return f(a, d(b, a))
                    },
                    nearest: function (a, b, c) {
                        var e = d(b, a);
                        c.axis = c.axis || "xy";
                        var f = h(c.axis),
                            i = g(a, e, c.intersect, f);
                        return i.length > 1 && i.sort(function (a, b) {
                            var c = a.getArea(),
                                d = b.getArea(),
                                e = c - d;
                            return 0 === e && (e = a._datasetIndex - b._datasetIndex), e
                        }), i.slice(0, 1)
                    },
                    x: function (a, b, c) {
                        var f = d(b, a),
                            g = [],
                            h = !1;
                        return e(a, function (a) {
                            a.inXRange(f.x) && g.push(a), a.inRange(f.x, f.y) && (h = !0)
                        }), c.intersect && !h && (g = []), g
                    },
                    y: function (a, b, c) {
                        var f = d(b, a),
                            g = [],
                            h = !1;
                        return e(a, function (a) {
                            a.inYRange(f.y) && g.push(a), a.inRange(f.x, f.y) && (h = !0)
                        }), c.intersect && !h && (g = []), g
                    }
                }
            }
        }, {
            45: 45
        }],
        29: [function (a, b, c) {
            "use strict";
            a(25)._set("global", {
                responsive: !0,
                responsiveAnimationDuration: 0,
                maintainAspectRatio: !0,
                events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
                hover: {
                    onHover: null,
                    mode: "nearest",
                    intersect: !0,
                    animationDuration: 400
                },
                onClick: null,
                defaultColor: "rgba(0,0,0,0.1)",
                defaultFontColor: "#666",
                defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                defaultFontSize: 12,
                defaultFontStyle: "normal",
                showLines: !0,
                elements: {},
                layout: {
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            }), b.exports = function () {
                var a = function (a, b) {
                    return this.construct(a, b), this
                };
                return a.Chart = a, a
            }
        }, {
            25: 25
        }],
        30: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                return f.where(a, function (a) {
                    return a.position === b
                })
            }

            function e(a, b) {
                a.forEach(function (a, b) {
                    return a._tmpIndex_ = b, a
                }), a.sort(function (a, c) {
                    var d = b ? c : a,
                        e = b ? a : c;
                    return d.weight === e.weight ? d._tmpIndex_ - e._tmpIndex_ : d.weight - e.weight
                }), a.forEach(function (a) {
                    delete a._tmpIndex_
                })
            }
            var f = a(45);
            b.exports = {
                defaults: {},
                addBox: function (a, b) {
                    a.boxes || (a.boxes = []), b.fullWidth = b.fullWidth || !1, b.position = b.position || "top", b.weight = b.weight || 0, a.boxes.push(b)
                },
                removeBox: function (a, b) {
                    var c = a.boxes ? a.boxes.indexOf(b) : -1; - 1 !== c && a.boxes.splice(c, 1)
                },
                configure: function (a, b, c) {
                    for (var d, e = ["fullWidth", "position", "weight"], f = e.length, g = 0; g < f; ++g) d = e[g], c.hasOwnProperty(d) && (b[d] = c[d])
                },
                update: function (a, b, c) {
                    function g(a) {
                        var b, c = a.isHorizontal();
                        c ? (b = a.update(a.fullWidth ? v : B, A), C -= b.height) : (b = a.update(z, C), B -= b.width), D.push({
                            horizontal: c,
                            minSize: b,
                            box: a
                        })
                    }

                    function h(a) {
                        var b = f.findNextWhere(D, function (b) {
                            return b.box === a
                        });
                        if (b)
                            if (a.isHorizontal()) {
                                var c = {
                                    left: Math.max(I, E),
                                    right: Math.max(J, F),
                                    top: 0,
                                    bottom: 0
                                };
                                a.update(a.fullWidth ? v : B, w / 2, c)
                            } else a.update(b.minSize.width, C)
                    }

                    function i(a) {
                        var b = f.findNextWhere(D, function (b) {
                                return b.box === a
                            }),
                            c = {
                                left: 0,
                                right: 0,
                                top: K,
                                bottom: L
                            };
                        b && a.update(b.minSize.width, C, c)
                    }

                    function j(a) {
                        a.isHorizontal() ? (a.left = a.fullWidth ? m : I, a.right = a.fullWidth ? b - n : I + B, a.top = R, a.bottom = R + a.height, R = a.bottom) : (a.left = Q, a.right = Q + a.width, a.top = K, a.bottom = K + C, Q = a.right)
                    }
                    if (a) {
                        var k = a.options.layout || {},
                            l = f.options.toPadding(k.padding),
                            m = l.left,
                            n = l.right,
                            o = l.top,
                            p = l.bottom,
                            q = d(a.boxes, "left"),
                            r = d(a.boxes, "right"),
                            s = d(a.boxes, "top"),
                            t = d(a.boxes, "bottom"),
                            u = d(a.boxes, "chartArea");
                        e(q, !0), e(r, !1), e(s, !0), e(t, !1);
                        var v = b - m - n,
                            w = c - o - p,
                            x = v / 2,
                            y = w / 2,
                            z = (b - x) / (q.length + r.length),
                            A = (c - y) / (s.length + t.length),
                            B = v,
                            C = w,
                            D = [];
                        f.each(q.concat(r, s, t), g);
                        var E = 0,
                            F = 0,
                            G = 0,
                            H = 0;
                        f.each(s.concat(t), function (a) {
                            if (a.getPadding) {
                                var b = a.getPadding();
                                E = Math.max(E, b.left), F = Math.max(F, b.right)
                            }
                        }), f.each(q.concat(r), function (a) {
                            if (a.getPadding) {
                                var b = a.getPadding();
                                G = Math.max(G, b.top), H = Math.max(H, b.bottom)
                            }
                        });
                        var I = m,
                            J = n,
                            K = o,
                            L = p;
                        f.each(q.concat(r), h), f.each(q, function (a) {
                            I += a.width
                        }), f.each(r, function (a) {
                            J += a.width
                        }), f.each(s.concat(t), h), f.each(s, function (a) {
                            K += a.height
                        }), f.each(t, function (a) {
                            L += a.height
                        }), f.each(q.concat(r), i), I = m, J = n, K = o, L = p, f.each(q, function (a) {
                            I += a.width
                        }), f.each(r, function (a) {
                            J += a.width
                        }), f.each(s, function (a) {
                            K += a.height
                        }), f.each(t, function (a) {
                            L += a.height
                        });
                        var M = Math.max(E - I, 0);
                        I += M, J += Math.max(F - J, 0);
                        var N = Math.max(G - K, 0);
                        K += N, L += Math.max(H - L, 0);
                        var O = c - K - L,
                            P = b - I - J;
                        P === B && O === C || (f.each(q, function (a) {
                            a.height = O
                        }), f.each(r, function (a) {
                            a.height = O
                        }), f.each(s, function (a) {
                            a.fullWidth || (a.width = P)
                        }), f.each(t, function (a) {
                            a.fullWidth || (a.width = P)
                        }), C = O, B = P);
                        var Q = m + M,
                            R = o + N;
                        f.each(q.concat(s), j), Q += B, R += C, f.each(r, j), f.each(t, j), a.chartArea = {
                            left: I,
                            top: K,
                            right: I + B,
                            bottom: K + C
                        }, f.each(u, function (b) {
                            b.left = a.chartArea.left, b.top = a.chartArea.top, b.right = a.chartArea.right, b.bottom = a.chartArea.bottom, b.update(B, C)
                        })
                    }
                }
            }
        }, {
            45: 45
        }],
        31: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(45);
            d._set("global", {
                plugins: {}
            }), b.exports = {
                _plugins: [],
                _cacheId: 0,
                register: function (a) {
                    var b = this._plugins;
                    [].concat(a).forEach(function (a) {
                        -1 === b.indexOf(a) && b.push(a)
                    }), this._cacheId++
                },
                unregister: function (a) {
                    var b = this._plugins;
                    [].concat(a).forEach(function (a) {
                        var c = b.indexOf(a); - 1 !== c && b.splice(c, 1)
                    }), this._cacheId++
                },
                clear: function () {
                    this._plugins = [], this._cacheId++
                },
                count: function () {
                    return this._plugins.length
                },
                getAll: function () {
                    return this._plugins
                },
                notify: function (a, b, c) {
                    var d, e, f, g, h, i = this.descriptors(a),
                        j = i.length;
                    for (d = 0; d < j; ++d)
                        if (e = i[d], f = e.plugin, "function" == typeof (h = f[b]) && (g = [a].concat(c || []), g.push(e.options), !1 === h.apply(f, g))) return !1;
                    return !0
                },
                descriptors: function (a) {
                    var b = a.$plugins || (a.$plugins = {});
                    if (b.id === this._cacheId) return b.descriptors;
                    var c = [],
                        f = [],
                        g = a && a.config || {},
                        h = g.options && g.options.plugins || {};
                    return this._plugins.concat(g.plugins || []).forEach(function (a) {
                        if (-1 === c.indexOf(a)) {
                            var b = a.id,
                                g = h[b];
                            !1 !== g && (!0 === g && (g = e.clone(d.global.plugins[b])), c.push(a), f.push({
                                plugin: a,
                                options: g || {}
                            }))
                        }
                    }), b.descriptors = f, b.id = this._cacheId, f
                },
                _invalidate: function (a) {
                    delete a.$plugins
                }
            }
        }, {
            25: 25,
            45: 45
        }],
        32: [function (a, b, c) {
            "use strict";

            function d(a) {
                var b, c, d = [];
                for (b = 0, c = a.length; b < c; ++b) d.push(a[b].label);
                return d
            }

            function e(a, b, c) {
                var d = a.getPixelForTick(b);
                return c && (d -= 0 === b ? (a.getPixelForTick(1) - d) / 2 : (d - a.getPixelForTick(b - 1)) / 2), d
            }
            var f = a(25),
                g = a(26),
                h = a(45),
                i = a(34);
            f._set("scale", {
                display: !0,
                position: "left",
                offset: !1,
                gridLines: {
                    display: !0,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1,
                    drawBorder: !0,
                    drawOnChartArea: !0,
                    drawTicks: !0,
                    tickMarkLength: 10,
                    zeroLineWidth: 1,
                    zeroLineColor: "rgba(0,0,0,0.25)",
                    zeroLineBorderDash: [],
                    zeroLineBorderDashOffset: 0,
                    offsetGridLines: !1,
                    borderDash: [],
                    borderDashOffset: 0
                },
                scaleLabel: {
                    display: !1,
                    labelString: "",
                    lineHeight: 1.2,
                    padding: {
                        top: 4,
                        bottom: 4
                    }
                },
                ticks: {
                    beginAtZero: !1,
                    minRotation: 0,
                    maxRotation: 50,
                    mirror: !1,
                    padding: 0,
                    reverse: !1,
                    display: !0,
                    autoSkip: !0,
                    autoSkipPadding: 0,
                    labelOffset: 0,
                    callback: i.formatters.values,
                    minor: {},
                    major: {}
                }
            }), b.exports = function (a) {
                function b(a, b, c) {
                    return h.isArray(b) ? h.longestText(a, c, b) : a.measureText(b).width
                }

                function c(a) {
                    var b = h.valueOrDefault,
                        c = f.global,
                        d = b(a.fontSize, c.defaultFontSize),
                        e = b(a.fontStyle, c.defaultFontStyle),
                        g = b(a.fontFamily, c.defaultFontFamily);
                    return {
                        size: d,
                        style: e,
                        family: g,
                        font: h.fontString(d, e, g)
                    }
                }

                function i(a) {
                    return h.options.toLineHeight(h.valueOrDefault(a.lineHeight, 1.2), h.valueOrDefault(a.fontSize, f.global.defaultFontSize))
                }
                a.Scale = g.extend({
                    getPadding: function () {
                        var a = this;
                        return {
                            left: a.paddingLeft || 0,
                            top: a.paddingTop || 0,
                            right: a.paddingRight || 0,
                            bottom: a.paddingBottom || 0
                        }
                    },
                    getTicks: function () {
                        return this._ticks
                    },
                    mergeTicksOptions: function () {
                        var a = this.options.ticks;
                        !1 === a.minor && (a.minor = {
                            display: !1
                        }), !1 === a.major && (a.major = {
                            display: !1
                        });
                        for (var b in a) "major" !== b && "minor" !== b && (void 0 === a.minor[b] && (a.minor[b] = a[b]), void 0 === a.major[b] && (a.major[b] = a[b]))
                    },
                    beforeUpdate: function () {
                        h.callback(this.options.beforeUpdate, [this])
                    },
                    update: function (a, b, c) {
                        var d, e, f, g, i, j, k = this;
                        for (k.beforeUpdate(), k.maxWidth = a, k.maxHeight = b, k.margins = h.extend({
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }, c), k.longestTextCache = k.longestTextCache || {}, k.beforeSetDimensions(), k.setDimensions(), k.afterSetDimensions(), k.beforeDataLimits(), k.determineDataLimits(), k.afterDataLimits(), k.beforeBuildTicks(), i = k.buildTicks() || [], k.afterBuildTicks(), k.beforeTickToLabelConversion(), f = k.convertTicksToLabels(i) || k.ticks, k.afterTickToLabelConversion(), k.ticks = f, d = 0, e = f.length; d < e; ++d) g = f[d], j = i[d], j ? j.label = g : i.push(j = {
                            label: g,
                            major: !1
                        });
                        return k._ticks = i, k.beforeCalculateTickRotation(), k.calculateTickRotation(), k.afterCalculateTickRotation(), k.beforeFit(), k.fit(), k.afterFit(), k.afterUpdate(), k.minSize
                    },
                    afterUpdate: function () {
                        h.callback(this.options.afterUpdate, [this])
                    },
                    beforeSetDimensions: function () {
                        h.callback(this.options.beforeSetDimensions, [this])
                    },
                    setDimensions: function () {
                        var a = this;
                        a.isHorizontal() ? (a.width = a.maxWidth, a.left = 0, a.right = a.width) : (a.height = a.maxHeight, a.top = 0, a.bottom = a.height), a.paddingLeft = 0, a.paddingTop = 0, a.paddingRight = 0, a.paddingBottom = 0
                    },
                    afterSetDimensions: function () {
                        h.callback(this.options.afterSetDimensions, [this])
                    },
                    beforeDataLimits: function () {
                        h.callback(this.options.beforeDataLimits, [this])
                    },
                    determineDataLimits: h.noop,
                    afterDataLimits: function () {
                        h.callback(this.options.afterDataLimits, [this])
                    },
                    beforeBuildTicks: function () {
                        h.callback(this.options.beforeBuildTicks, [this])
                    },
                    buildTicks: h.noop,
                    afterBuildTicks: function () {
                        h.callback(this.options.afterBuildTicks, [this])
                    },
                    beforeTickToLabelConversion: function () {
                        h.callback(this.options.beforeTickToLabelConversion, [this])
                    },
                    convertTicksToLabels: function () {
                        var a = this,
                            b = a.options.ticks;
                        a.ticks = a.ticks.map(b.userCallback || b.callback, this)
                    },
                    afterTickToLabelConversion: function () {
                        h.callback(this.options.afterTickToLabelConversion, [this])
                    },
                    beforeCalculateTickRotation: function () {
                        h.callback(this.options.beforeCalculateTickRotation, [this])
                    },
                    calculateTickRotation: function () {
                        var a = this,
                            b = a.ctx,
                            e = a.options.ticks,
                            f = d(a._ticks),
                            g = c(e);
                        b.font = g.font;
                        var i = e.minRotation || 0;
                        if (f.length && a.options.display && a.isHorizontal())
                            for (var j, k = h.longestText(b, g.font, f, a.longestTextCache), l = k, m = a.getPixelForTick(1) - a.getPixelForTick(0) - 6; l > m && i < e.maxRotation;) {
                                var n = h.toRadians(i);
                                if (j = Math.cos(n), Math.sin(n) * k > a.maxHeight) {
                                    i--;
                                    break
                                }
                                i++, l = j * k
                            }
                        a.labelRotation = i
                    },
                    afterCalculateTickRotation: function () {
                        h.callback(this.options.afterCalculateTickRotation, [this])
                    },
                    beforeFit: function () {
                        h.callback(this.options.beforeFit, [this])
                    },
                    fit: function () {
                        var a = this,
                            e = a.minSize = {
                                width: 0,
                                height: 0
                            },
                            f = d(a._ticks),
                            g = a.options,
                            j = g.ticks,
                            k = g.scaleLabel,
                            l = g.gridLines,
                            m = g.display,
                            n = a.isHorizontal(),
                            o = c(j),
                            p = g.gridLines.tickMarkLength;
                        if (e.width = n ? a.isFullWidth() ? a.maxWidth - a.margins.left - a.margins.right : a.maxWidth : m && l.drawTicks ? p : 0, e.height = n ? m && l.drawTicks ? p : 0 : a.maxHeight, k.display && m) {
                            var q = i(k),
                                r = h.options.toPadding(k.padding),
                                s = q + r.height;
                            n ? e.height += s : e.width += s
                        }
                        if (j.display && m) {
                            var t = h.longestText(a.ctx, o.font, f, a.longestTextCache),
                                u = h.numberOfLabelLines(f),
                                v = .5 * o.size,
                                w = a.options.ticks.padding;
                            if (n) {
                                a.longestLabelWidth = t;
                                var x = h.toRadians(a.labelRotation),
                                    y = Math.cos(x),
                                    z = Math.sin(x),
                                    A = z * t + o.size * u + v * (u - 1) + v;
                                e.height = Math.min(a.maxHeight, e.height + A + w), a.ctx.font = o.font;
                                var B = b(a.ctx, f[0], o.font),
                                    C = b(a.ctx, f[f.length - 1], o.font);
                                0 !== a.labelRotation ? (a.paddingLeft = "bottom" === g.position ? y * B + 3 : y * v + 3, a.paddingRight = "bottom" === g.position ? y * v + 3 : y * C + 3) : (a.paddingLeft = B / 2 + 3, a.paddingRight = C / 2 + 3)
                            } else j.mirror ? t = 0 : t += w + v, e.width = Math.min(a.maxWidth, e.width + t), a.paddingTop = o.size / 2, a.paddingBottom = o.size / 2
                        }
                        a.handleMargins(), a.width = e.width, a.height = e.height
                    },
                    handleMargins: function () {
                        var a = this;
                        a.margins && (a.paddingLeft = Math.max(a.paddingLeft - a.margins.left, 0), a.paddingTop = Math.max(a.paddingTop - a.margins.top, 0), a.paddingRight = Math.max(a.paddingRight - a.margins.right, 0), a.paddingBottom = Math.max(a.paddingBottom - a.margins.bottom, 0))
                    },
                    afterFit: function () {
                        h.callback(this.options.afterFit, [this])
                    },
                    isHorizontal: function () {
                        return "top" === this.options.position || "bottom" === this.options.position
                    },
                    isFullWidth: function () {
                        return this.options.fullWidth
                    },
                    getRightValue: function (a) {
                        if (h.isNullOrUndef(a)) return NaN;
                        if ("number" == typeof a && !isFinite(a)) return NaN;
                        if (a)
                            if (this.isHorizontal()) {
                                if (void 0 !== a.x) return this.getRightValue(a.x)
                            } else if (void 0 !== a.y) return this.getRightValue(a.y);
                        return a
                    },
                    getLabelForIndex: h.noop,
                    getPixelForValue: h.noop,
                    getValueForPixel: h.noop,
                    getPixelForTick: function (a) {
                        var b = this,
                            c = b.options.offset;
                        if (b.isHorizontal()) {
                            var d = b.width - (b.paddingLeft + b.paddingRight),
                                e = d / Math.max(b._ticks.length - (c ? 0 : 1), 1),
                                f = e * a + b.paddingLeft;
                            c && (f += e / 2);
                            var g = b.left + Math.round(f);
                            return g += b.isFullWidth() ? b.margins.left : 0
                        }
                        var h = b.height - (b.paddingTop + b.paddingBottom);
                        return b.top + a * (h / (b._ticks.length - 1))
                    },
                    getPixelForDecimal: function (a) {
                        var b = this;
                        if (b.isHorizontal()) {
                            var c = b.width - (b.paddingLeft + b.paddingRight),
                                d = c * a + b.paddingLeft,
                                e = b.left + Math.round(d);
                            return e += b.isFullWidth() ? b.margins.left : 0
                        }
                        return b.top + a * b.height
                    },
                    getBasePixel: function () {
                        return this.getPixelForValue(this.getBaseValue())
                    },
                    getBaseValue: function () {
                        var a = this,
                            b = a.min,
                            c = a.max;
                        return a.beginAtZero ? 0 : b < 0 && c < 0 ? c : b > 0 && c > 0 ? b : 0
                    },
                    _autoSkip: function (a) {
                        var b, c, d, e, f, g = this,
                            i = g.isHorizontal(),
                            j = g.options.ticks.minor,
                            k = a.length,
                            l = h.toRadians(g.labelRotation),
                            m = Math.cos(l),
                            n = g.longestLabelWidth * m,
                            o = [];
                        for (j.maxTicksLimit && (f = j.maxTicksLimit), i && (b = !1, (n + j.autoSkipPadding) * k > g.width - (g.paddingLeft + g.paddingRight) && (b = 1 + Math.floor((n + j.autoSkipPadding) * k / (g.width - (g.paddingLeft + g.paddingRight)))), f && k > f && (b = Math.max(b, Math.floor(k / f)))), c = 0; c < k; c++) d = a[c], e = b > 1 && c % b > 0 || c % b == 0 && c + b >= k, e && c !== k - 1 && delete d.label, o.push(d);
                        return o
                    },
                    draw: function (a) {
                        var b = this,
                            d = b.options;
                        if (d.display) {
                            var g = b.ctx,
                                j = f.global,
                                k = d.ticks.minor,
                                l = d.ticks.major || k,
                                m = d.gridLines,
                                n = d.scaleLabel,
                                o = 0 !== b.labelRotation,
                                p = b.isHorizontal(),
                                q = k.autoSkip ? b._autoSkip(b.getTicks()) : b.getTicks(),
                                r = h.valueOrDefault(k.fontColor, j.defaultFontColor),
                                s = c(k),
                                t = h.valueOrDefault(l.fontColor, j.defaultFontColor),
                                u = c(l),
                                v = m.drawTicks ? m.tickMarkLength : 0,
                                w = h.valueOrDefault(n.fontColor, j.defaultFontColor),
                                x = c(n),
                                y = h.options.toPadding(n.padding),
                                z = h.toRadians(b.labelRotation),
                                A = [],
                                B = b.options.gridLines.lineWidth,
                                C = "right" === d.position ? b.right : b.right - B - v,
                                D = "right" === d.position ? b.right + v : b.right,
                                E = "bottom" === d.position ? b.top + B : b.bottom - v - B,
                                F = "bottom" === d.position ? b.top + B + v : b.bottom + B;
                            if (h.each(q, function (c, f) {
                                    if (!h.isNullOrUndef(c.label)) {
                                        var g, i, l, n, r = c.label;
                                        f === b.zeroLineIndex && d.offset === m.offsetGridLines ? (g = m.zeroLineWidth, i = m.zeroLineColor, l = m.zeroLineBorderDash, n = m.zeroLineBorderDashOffset) : (g = h.valueAtIndexOrDefault(m.lineWidth, f), i = h.valueAtIndexOrDefault(m.color, f), l = h.valueOrDefault(m.borderDash, j.borderDash), n = h.valueOrDefault(m.borderDashOffset, j.borderDashOffset));
                                        var s, t, u, w, x, y, G, H, I, J, K = "middle",
                                            L = "middle",
                                            M = k.padding;
                                        if (p) {
                                            var N = v + M;
                                            "bottom" === d.position ? (L = o ? "middle" : "top", K = o ? "right" : "center", J = b.top + N) : (L = o ? "middle" : "bottom", K = o ? "left" : "center", J = b.bottom - N);
                                            var O = e(b, f, m.offsetGridLines && q.length > 1);
                                            O < b.left && (i = "rgba(0,0,0,0)"), O += h.aliasPixel(g), I = b.getPixelForTick(f) + k.labelOffset, s = u = x = G = O, t = E, w = F, y = a.top, H = a.bottom + B
                                        } else {
                                            var P, Q = "left" === d.position;
                                            k.mirror ? (K = Q ? "left" : "right", P = M) : (K = Q ? "right" : "left", P = v + M), I = Q ? b.right - P : b.left + P;
                                            var R = e(b, f, m.offsetGridLines && q.length > 1);
                                            R < b.top && (i = "rgba(0,0,0,0)"), R += h.aliasPixel(g), J = b.getPixelForTick(f) + k.labelOffset, s = C, u = D, x = a.left, G = a.right + B, t = w = y = H = R
                                        }
                                        A.push({
                                            tx1: s,
                                            ty1: t,
                                            tx2: u,
                                            ty2: w,
                                            x1: x,
                                            y1: y,
                                            x2: G,
                                            y2: H,
                                            labelX: I,
                                            labelY: J,
                                            glWidth: g,
                                            glColor: i,
                                            glBorderDash: l,
                                            glBorderDashOffset: n,
                                            rotation: -1 * z,
                                            label: r,
                                            major: c.major,
                                            textBaseline: L,
                                            textAlign: K
                                        })
                                    }
                                }), h.each(A, function (a) {
                                    if (m.display && (g.save(), g.lineWidth = a.glWidth, g.strokeStyle = a.glColor, g.setLineDash && (g.setLineDash(a.glBorderDash), g.lineDashOffset = a.glBorderDashOffset), g.beginPath(), m.drawTicks && (g.moveTo(a.tx1, a.ty1), g.lineTo(a.tx2, a.ty2)), m.drawOnChartArea && (g.moveTo(a.x1, a.y1), g.lineTo(a.x2, a.y2)), g.stroke(), g.restore()), k.display) {
                                        g.save(), g.translate(a.labelX, a.labelY), g.rotate(a.rotation), g.font = a.major ? u.font : s.font, g.fillStyle = a.major ? t : r, g.textBaseline = a.textBaseline, g.textAlign = a.textAlign;
                                        var c = a.label;
                                        if (h.isArray(c))
                                            for (var d = c.length, e = 1.5 * s.size, f = b.isHorizontal() ? 0 : -e * (d - 1) / 2, i = 0; i < d; ++i) g.fillText("" + c[i], 0, f), f += e;
                                        else g.fillText(c, 0, 0);
                                        g.restore()
                                    }
                                }), n.display) {
                                var G, H, I = 0,
                                    J = i(n) / 2;
                                if (p) G = b.left + (b.right - b.left) / 2, H = "bottom" === d.position ? b.bottom - J - y.bottom : b.top + J + y.top;
                                else {
                                    var K = "left" === d.position;
                                    G = K ? b.left + J + y.top : b.right - J - y.top, H = b.top + (b.bottom - b.top) / 2, I = K ? -.5 * Math.PI : .5 * Math.PI
                                }
                                g.save(), g.translate(G, H), g.rotate(I), g.textAlign = "center", g.textBaseline = "middle", g.fillStyle = w, g.font = x.font, g.fillText(n.labelString, 0, 0), g.restore()
                            }
                            if (m.drawBorder) {
                                g.lineWidth = h.valueAtIndexOrDefault(m.lineWidth, 0), g.strokeStyle = h.valueAtIndexOrDefault(m.color, 0);
                                var L = b.left,
                                    M = b.right + B,
                                    N = b.top,
                                    O = b.bottom + B,
                                    P = h.aliasPixel(g.lineWidth);
                                p ? (N = O = "top" === d.position ? b.bottom : b.top, N += P, O += P) : (L = M = "left" === d.position ? b.right : b.left, L += P, M += P), g.beginPath(), g.moveTo(L, N), g.lineTo(M, O), g.stroke()
                            }
                        }
                    }
                })
            }
        }, {
            25: 25,
            26: 26,
            34: 34,
            45: 45
        }],
        33: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(45),
                f = a(30);
            b.exports = function (a) {
                a.scaleService = {
                    constructors: {},
                    defaults: {},
                    registerScaleType: function (a, b, c) {
                        this.constructors[a] = b, this.defaults[a] = e.clone(c)
                    },
                    getScaleConstructor: function (a) {
                        return this.constructors.hasOwnProperty(a) ? this.constructors[a] : void 0
                    },
                    getScaleDefaults: function (a) {
                        return this.defaults.hasOwnProperty(a) ? e.merge({}, [d.scale, this.defaults[a]]) : {}
                    },
                    updateScaleDefaults: function (a, b) {
                        var c = this;
                        c.defaults.hasOwnProperty(a) && (c.defaults[a] = e.extend(c.defaults[a], b))
                    },
                    addScalesToLayout: function (a) {
                        e.each(a.scales, function (b) {
                            b.fullWidth = b.options.fullWidth, b.position = b.options.position, b.weight = b.options.weight, f.addBox(a, b)
                        })
                    }
                }
            }
        }, {
            25: 25,
            30: 30,
            45: 45
        }],
        34: [function (a, b, c) {
            "use strict";
            var d = a(45);
            b.exports = {
                formatters: {
                    values: function (a) {
                        return d.isArray(a) ? a : "" + a
                    },
                    linear: function (a, b, c) {
                        var e = c.length > 3 ? c[2] - c[1] : c[1] - c[0];
                        Math.abs(e) > 1 && a !== Math.floor(a) && (e = a - Math.floor(a));
                        var f = d.log10(Math.abs(e)),
                            g = "";
                        if (0 !== a) {
                            var h = -1 * Math.floor(f);
                            h = Math.max(Math.min(h, 20), 0), g = a.toFixed(h)
                        } else g = "0";
                        return g
                    },
                    logarithmic: function (a, b, c) {
                        var e = a / Math.pow(10, Math.floor(d.log10(a)));
                        return 0 === a ? "0" : 1 === e || 2 === e || 5 === e || 0 === b || b === c.length - 1 ? a.toExponential() : ""
                    }
                }
            }
        }, {
            45: 45
        }],
        35: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(26),
                f = a(45);
            d._set("global", {
                tooltips: {
                    enabled: !0,
                    custom: null,
                    mode: "nearest",
                    position: "average",
                    intersect: !0,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleFontStyle: "bold",
                    titleSpacing: 2,
                    titleMarginBottom: 6,
                    titleFontColor: "#fff",
                    titleAlign: "left",
                    bodySpacing: 2,
                    bodyFontColor: "#fff",
                    bodyAlign: "left",
                    footerFontStyle: "bold",
                    footerSpacing: 2,
                    footerMarginTop: 6,
                    footerFontColor: "#fff",
                    footerAlign: "left",
                    yPadding: 6,
                    xPadding: 6,
                    caretPadding: 2,
                    caretSize: 5,
                    cornerRadius: 6,
                    multiKeyBackground: "#fff",
                    displayColors: !0,
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    callbacks: {
                        beforeTitle: f.noop,
                        title: function (a, b) {
                            var c = "",
                                d = b.labels,
                                e = d ? d.length : 0;
                            if (a.length > 0) {
                                var f = a[0];
                                f.xLabel ? c = f.xLabel : e > 0 && f.index < e && (c = d[f.index])
                            }
                            return c
                        },
                        afterTitle: f.noop,
                        beforeBody: f.noop,
                        beforeLabel: f.noop,
                        label: function (a, b) {
                            var c = b.datasets[a.datasetIndex].label || "";
                            return c && (c += ": "), c += a.yLabel
                        },
                        labelColor: function (a, b) {
                            var c = b.getDatasetMeta(a.datasetIndex),
                                d = c.data[a.index],
                                e = d._view;
                            return {
                                borderColor: e.borderColor,
                                backgroundColor: e.backgroundColor
                            }
                        },
                        labelTextColor: function () {
                            return this._options.bodyFontColor
                        },
                        afterLabel: f.noop,
                        afterBody: f.noop,
                        beforeFooter: f.noop,
                        footer: f.noop,
                        afterFooter: f.noop
                    }
                }
            }), b.exports = function (a) {
                function b(a, b) {
                    var c = f.color(a);
                    return c.alpha(b * c.alpha()).rgbaString()
                }

                function c(a, b) {
                    return b && (f.isArray(b) ? Array.prototype.push.apply(a, b) : a.push(b)), a
                }

                function g(a) {
                    var b = a._xScale,
                        c = a._yScale || a._scale,
                        d = a._index,
                        e = a._datasetIndex;
                    return {
                        xLabel: b ? b.getLabelForIndex(d, e) : "",
                        yLabel: c ? c.getLabelForIndex(d, e) : "",
                        index: d,
                        datasetIndex: e,
                        x: a._model.x,
                        y: a._model.y
                    }
                }

                function h(a) {
                    var b = d.global,
                        c = f.valueOrDefault;
                    return {
                        xPadding: a.xPadding,
                        yPadding: a.yPadding,
                        xAlign: a.xAlign,
                        yAlign: a.yAlign,
                        bodyFontColor: a.bodyFontColor,
                        _bodyFontFamily: c(a.bodyFontFamily, b.defaultFontFamily),
                        _bodyFontStyle: c(a.bodyFontStyle, b.defaultFontStyle),
                        _bodyAlign: a.bodyAlign,
                        bodyFontSize: c(a.bodyFontSize, b.defaultFontSize),
                        bodySpacing: a.bodySpacing,
                        titleFontColor: a.titleFontColor,
                        _titleFontFamily: c(a.titleFontFamily, b.defaultFontFamily),
                        _titleFontStyle: c(a.titleFontStyle, b.defaultFontStyle),
                        titleFontSize: c(a.titleFontSize, b.defaultFontSize),
                        _titleAlign: a.titleAlign,
                        titleSpacing: a.titleSpacing,
                        titleMarginBottom: a.titleMarginBottom,
                        footerFontColor: a.footerFontColor,
                        _footerFontFamily: c(a.footerFontFamily, b.defaultFontFamily),
                        _footerFontStyle: c(a.footerFontStyle, b.defaultFontStyle),
                        footerFontSize: c(a.footerFontSize, b.defaultFontSize),
                        _footerAlign: a.footerAlign,
                        footerSpacing: a.footerSpacing,
                        footerMarginTop: a.footerMarginTop,
                        caretSize: a.caretSize,
                        cornerRadius: a.cornerRadius,
                        backgroundColor: a.backgroundColor,
                        opacity: 0,
                        legendColorBackground: a.multiKeyBackground,
                        displayColors: a.displayColors,
                        borderColor: a.borderColor,
                        borderWidth: a.borderWidth
                    }
                }

                function i(a, b) {
                    var c = a._chart.ctx,
                        d = 2 * b.yPadding,
                        e = 0,
                        g = b.body,
                        h = g.reduce(function (a, b) {
                            return a + b.before.length + b.lines.length + b.after.length
                        }, 0);
                    h += b.beforeBody.length + b.afterBody.length;
                    var i = b.title.length,
                        j = b.footer.length,
                        k = b.titleFontSize,
                        l = b.bodyFontSize,
                        m = b.footerFontSize;
                    d += i * k, d += i ? (i - 1) * b.titleSpacing : 0, d += i ? b.titleMarginBottom : 0, d += h * l, d += h ? (h - 1) * b.bodySpacing : 0, d += j ? b.footerMarginTop : 0, d += j * m, d += j ? (j - 1) * b.footerSpacing : 0;
                    var n = 0,
                        o = function (a) {
                            e = Math.max(e, c.measureText(a).width + n)
                        };
                    return c.font = f.fontString(k, b._titleFontStyle, b._titleFontFamily), f.each(b.title, o), c.font = f.fontString(l, b._bodyFontStyle, b._bodyFontFamily), f.each(b.beforeBody.concat(b.afterBody), o), n = b.displayColors ? l + 2 : 0, f.each(g, function (a) {
                        f.each(a.before, o), f.each(a.lines, o), f.each(a.after, o)
                    }), n = 0, c.font = f.fontString(m, b._footerFontStyle, b._footerFontFamily), f.each(b.footer, o), e += 2 * b.xPadding, {
                        width: e,
                        height: d
                    }
                }

                function j(a, b) {
                    var c = a._model,
                        d = a._chart,
                        e = a._chart.chartArea,
                        f = "center",
                        g = "center";
                    c.y < b.height ? g = "top" : c.y > d.height - b.height && (g = "bottom");
                    var h, i, j, k, l, m = (e.left + e.right) / 2,
                        n = (e.top + e.bottom) / 2;
                    "center" === g ? (h = function (a) {
                        return a <= m
                    }, i = function (a) {
                        return a > m
                    }) : (h = function (a) {
                        return a <= b.width / 2
                    }, i = function (a) {
                        return a >= d.width - b.width / 2
                    }), j = function (a) {
                        return a + b.width + c.caretSize + c.caretPadding > d.width
                    }, k = function (a) {
                        return a - b.width - c.caretSize - c.caretPadding < 0
                    }, l = function (a) {
                        return a <= n ? "top" : "bottom"
                    }, h(c.x) ? (f = "left", j(c.x) && (f = "center", g = l(c.y))) : i(c.x) && (f = "right", k(c.x) && (f = "center", g = l(c.y)));
                    var o = a._options;
                    return {
                        xAlign: o.xAlign ? o.xAlign : f,
                        yAlign: o.yAlign ? o.yAlign : g
                    }
                }

                function k(a, b, c, d) {
                    var e = a.x,
                        f = a.y,
                        g = a.caretSize,
                        h = a.caretPadding,
                        i = a.cornerRadius,
                        j = c.xAlign,
                        k = c.yAlign,
                        l = g + h,
                        m = i + h;
                    return "right" === j ? e -= b.width : "center" === j && (e -= b.width / 2, e + b.width > d.width && (e = d.width - b.width), e < 0 && (e = 0)), "top" === k ? f += l : f -= "bottom" === k ? b.height + l : b.height / 2, "center" === k ? "left" === j ? e += l : "right" === j && (e -= l) : "left" === j ? e -= m : "right" === j && (e += m), {
                        x: e,
                        y: f
                    }
                }
                a.Tooltip = e.extend({
                    initialize: function () {
                        this._model = h(this._options), this._lastActive = []
                    },
                    getTitle: function () {
                        var a = this,
                            b = a._options,
                            d = b.callbacks,
                            e = d.beforeTitle.apply(a, arguments),
                            f = d.title.apply(a, arguments),
                            g = d.afterTitle.apply(a, arguments),
                            h = [];
                        return h = c(h, e), h = c(h, f), h = c(h, g)
                    },
                    getBeforeBody: function () {
                        var a = this._options.callbacks.beforeBody.apply(this, arguments);
                        return f.isArray(a) ? a : void 0 !== a ? [a] : []
                    },
                    getBody: function (a, b) {
                        var d = this,
                            e = d._options.callbacks,
                            g = [];
                        return f.each(a, function (a) {
                            var f = {
                                before: [],
                                lines: [],
                                after: []
                            };
                            c(f.before, e.beforeLabel.call(d, a, b)), c(f.lines, e.label.call(d, a, b)), c(f.after, e.afterLabel.call(d, a, b)), g.push(f)
                        }), g
                    },
                    getAfterBody: function () {
                        var a = this._options.callbacks.afterBody.apply(this, arguments);
                        return f.isArray(a) ? a : void 0 !== a ? [a] : []
                    },
                    getFooter: function () {
                        var a = this,
                            b = a._options.callbacks,
                            d = b.beforeFooter.apply(a, arguments),
                            e = b.footer.apply(a, arguments),
                            f = b.afterFooter.apply(a, arguments),
                            g = [];
                        return g = c(g, d), g = c(g, e), g = c(g, f)
                    },
                    update: function (b) {
                        var c, d, e = this,
                            l = e._options,
                            m = e._model,
                            n = e._model = h(l),
                            o = e._active,
                            p = e._data,
                            q = {
                                xAlign: m.xAlign,
                                yAlign: m.yAlign
                            },
                            r = {
                                x: m.x,
                                y: m.y
                            },
                            s = {
                                width: m.width,
                                height: m.height
                            },
                            t = {
                                x: m.caretX,
                                y: m.caretY
                            };
                        if (o.length) {
                            n.opacity = 1;
                            var u = [],
                                v = [];
                            t = a.Tooltip.positioners[l.position].call(e, o, e._eventPosition);
                            var w = [];
                            for (c = 0, d = o.length; c < d; ++c) w.push(g(o[c]));
                            l.filter && (w = w.filter(function (a) {
                                return l.filter(a, p)
                            })), l.itemSort && (w = w.sort(function (a, b) {
                                return l.itemSort(a, b, p)
                            })), f.each(w, function (a) {
                                u.push(l.callbacks.labelColor.call(e, a, e._chart)), v.push(l.callbacks.labelTextColor.call(e, a, e._chart))
                            }), n.title = e.getTitle(w, p), n.beforeBody = e.getBeforeBody(w, p), n.body = e.getBody(w, p), n.afterBody = e.getAfterBody(w, p), n.footer = e.getFooter(w, p), n.x = Math.round(t.x), n.y = Math.round(t.y), n.caretPadding = l.caretPadding, n.labelColors = u, n.labelTextColors = v, n.dataPoints = w, s = i(this, n), q = j(this, s), r = k(n, s, q, e._chart)
                        } else n.opacity = 0;
                        return n.xAlign = q.xAlign, n.yAlign = q.yAlign, n.x = r.x, n.y = r.y, n.width = s.width, n.height = s.height, n.caretX = t.x, n.caretY = t.y, e._model = n, b && l.custom && l.custom.call(e, n), e
                    },
                    drawCaret: function (a, b) {
                        var c = this._chart.ctx,
                            d = this._view,
                            e = this.getCaretPosition(a, b, d);
                        c.lineTo(e.x1, e.y1), c.lineTo(e.x2, e.y2), c.lineTo(e.x3, e.y3)
                    },
                    getCaretPosition: function (a, b, c) {
                        var d, e, f, g, h, i, j = c.caretSize,
                            k = c.cornerRadius,
                            l = c.xAlign,
                            m = c.yAlign,
                            n = a.x,
                            o = a.y,
                            p = b.width,
                            q = b.height;
                        if ("center" === m) h = o + q / 2, "left" === l ? (d = n, e = d - j, f = d, g = h + j, i = h - j) : (d = n + p, e = d + j, f = d, g = h - j, i = h + j);
                        else if ("left" === l ? (e = n + k + j, d = e - j, f = e + j) : "right" === l ? (e = n + p - k - j, d = e - j, f = e + j) : (e = c.caretX, d = e - j, f = e + j), "top" === m) g = o, h = g - j, i = g;
                        else {
                            g = o + q, h = g + j, i = g;
                            var r = f;
                            f = d, d = r
                        }
                        return {
                            x1: d,
                            x2: e,
                            x3: f,
                            y1: g,
                            y2: h,
                            y3: i
                        }
                    },
                    drawTitle: function (a, c, d, e) {
                        var g = c.title;
                        if (g.length) {
                            d.textAlign = c._titleAlign, d.textBaseline = "top";
                            var h = c.titleFontSize,
                                i = c.titleSpacing;
                            d.fillStyle = b(c.titleFontColor, e), d.font = f.fontString(h, c._titleFontStyle, c._titleFontFamily);
                            var j, k;
                            for (j = 0, k = g.length; j < k; ++j) d.fillText(g[j], a.x, a.y), a.y += h + i, j + 1 === g.length && (a.y += c.titleMarginBottom - i)
                        }
                    },
                    drawBody: function (a, c, d, e) {
                        var g = c.bodyFontSize,
                            h = c.bodySpacing,
                            i = c.body;
                        d.textAlign = c._bodyAlign, d.textBaseline = "top", d.font = f.fontString(g, c._bodyFontStyle, c._bodyFontFamily);
                        var j = 0,
                            k = function (b) {
                                d.fillText(b, a.x + j, a.y), a.y += g + h
                            };
                        d.fillStyle = b(c.bodyFontColor, e), f.each(c.beforeBody, k);
                        var l = c.displayColors;
                        j = l ? g + 2 : 0, f.each(i, function (h, i) {
                            var j = b(c.labelTextColors[i], e);
                            d.fillStyle = j, f.each(h.before, k), f.each(h.lines, function (f) {
                                l && (d.fillStyle = b(c.legendColorBackground, e), d.fillRect(a.x, a.y, g, g), d.lineWidth = 1, d.strokeStyle = b(c.labelColors[i].borderColor, e), d.strokeRect(a.x, a.y, g, g), d.fillStyle = b(c.labelColors[i].backgroundColor, e), d.fillRect(a.x + 1, a.y + 1, g - 2, g - 2), d.fillStyle = j), k(f)
                            }), f.each(h.after, k)
                        }), j = 0, f.each(c.afterBody, k), a.y -= h
                    },
                    drawFooter: function (a, c, d, e) {
                        var g = c.footer;
                        g.length && (a.y += c.footerMarginTop, d.textAlign = c._footerAlign, d.textBaseline = "top", d.fillStyle = b(c.footerFontColor, e), d.font = f.fontString(c.footerFontSize, c._footerFontStyle, c._footerFontFamily), f.each(g, function (b) {
                            d.fillText(b, a.x, a.y), a.y += c.footerFontSize + c.footerSpacing
                        }))
                    },
                    drawBackground: function (a, c, d, e, f) {
                        d.fillStyle = b(c.backgroundColor, f), d.strokeStyle = b(c.borderColor, f), d.lineWidth = c.borderWidth;
                        var g = c.xAlign,
                            h = c.yAlign,
                            i = a.x,
                            j = a.y,
                            k = e.width,
                            l = e.height,
                            m = c.cornerRadius;
                        d.beginPath(), d.moveTo(i + m, j), "top" === h && this.drawCaret(a, e), d.lineTo(i + k - m, j), d.quadraticCurveTo(i + k, j, i + k, j + m), "center" === h && "right" === g && this.drawCaret(a, e), d.lineTo(i + k, j + l - m), d.quadraticCurveTo(i + k, j + l, i + k - m, j + l), "bottom" === h && this.drawCaret(a, e), d.lineTo(i + m, j + l), d.quadraticCurveTo(i, j + l, i, j + l - m), "center" === h && "left" === g && this.drawCaret(a, e), d.lineTo(i, j + m), d.quadraticCurveTo(i, j, i + m, j), d.closePath(), d.fill(), c.borderWidth > 0 && d.stroke()
                    },
                    draw: function () {
                        var a = this._chart.ctx,
                            b = this._view;
                        if (0 !== b.opacity) {
                            var c = {
                                    width: b.width,
                                    height: b.height
                                },
                                d = {
                                    x: b.x,
                                    y: b.y
                                },
                                e = Math.abs(b.opacity < .001) ? 0 : b.opacity,
                                f = b.title.length || b.beforeBody.length || b.body.length || b.afterBody.length || b.footer.length;
                            this._options.enabled && f && (this.drawBackground(d, b, a, c, e), d.x += b.xPadding, d.y += b.yPadding, this.drawTitle(d, b, a, e), this.drawBody(d, b, a, e), this.drawFooter(d, b, a, e))
                        }
                    },
                    handleEvent: function (a) {
                        var b = this,
                            c = b._options,
                            d = !1;
                        return b._lastActive = b._lastActive || [], "mouseout" === a.type ? b._active = [] : b._active = b._chart.getElementsAtEventForMode(a, c.mode, c), d = !f.arrayEquals(b._active, b._lastActive), d && (b._lastActive = b._active, (c.enabled || c.custom) && (b._eventPosition = {
                            x: a.x,
                            y: a.y
                        }, b.update(!0), b.pivot())), d
                    }
                }), a.Tooltip.positioners = {
                    average: function (a) {
                        if (!a.length) return !1;
                        var b, c, d = 0,
                            e = 0,
                            f = 0;
                        for (b = 0, c = a.length; b < c; ++b) {
                            var g = a[b];
                            if (g && g.hasValue()) {
                                var h = g.tooltipPosition();
                                d += h.x, e += h.y, ++f
                            }
                        }
                        return {
                            x: Math.round(d / f),
                            y: Math.round(e / f)
                        }
                    },
                    nearest: function (a, b) {
                        var c, d, e, g = b.x,
                            h = b.y,
                            i = Number.POSITIVE_INFINITY;
                        for (c = 0, d = a.length; c < d; ++c) {
                            var j = a[c];
                            if (j && j.hasValue()) {
                                var k = j.getCenterPoint(),
                                    l = f.distanceBetweenPoints(b, k);
                                l < i && (i = l, e = j)
                            }
                        }
                        if (e) {
                            var m = e.tooltipPosition();
                            g = m.x, h = m.y
                        }
                        return {
                            x: g,
                            y: h
                        }
                    }
                }
            }
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        36: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(26),
                f = a(45);
            d._set("global", {
                elements: {
                    arc: {
                        backgroundColor: d.global.defaultColor,
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                }
            }), b.exports = e.extend({
                inLabelRange: function (a) {
                    var b = this._view;
                    return !!b && Math.pow(a - b.x, 2) < Math.pow(b.radius + b.hoverRadius, 2)
                },
                inRange: function (a, b) {
                    var c = this._view;
                    if (c) {
                        for (var d = f.getAngleFromPoint(c, {
                                x: a,
                                y: b
                            }), e = d.angle, g = d.distance, h = c.startAngle, i = c.endAngle; i < h;) i += 2 * Math.PI;
                        for (; e > i;) e -= 2 * Math.PI;
                        for (; e < h;) e += 2 * Math.PI;
                        var j = e >= h && e <= i,
                            k = g >= c.innerRadius && g <= c.outerRadius;
                        return j && k
                    }
                    return !1
                },
                getCenterPoint: function () {
                    var a = this._view,
                        b = (a.startAngle + a.endAngle) / 2,
                        c = (a.innerRadius + a.outerRadius) / 2;
                    return {
                        x: a.x + Math.cos(b) * c,
                        y: a.y + Math.sin(b) * c
                    }
                },
                getArea: function () {
                    var a = this._view;
                    return Math.PI * ((a.endAngle - a.startAngle) / (2 * Math.PI)) * (Math.pow(a.outerRadius, 2) - Math.pow(a.innerRadius, 2))
                },
                tooltipPosition: function () {
                    var a = this._view,
                        b = a.startAngle + (a.endAngle - a.startAngle) / 2,
                        c = (a.outerRadius - a.innerRadius) / 2 + a.innerRadius;
                    return {
                        x: a.x + Math.cos(b) * c,
                        y: a.y + Math.sin(b) * c
                    }
                },
                draw: function () {
                    var a = this._chart.ctx,
                        b = this._view,
                        c = b.startAngle,
                        d = b.endAngle;
                    a.beginPath(), a.arc(b.x, b.y, b.outerRadius, c, d), a.arc(b.x, b.y, b.innerRadius, d, c, !0), a.closePath(), a.strokeStyle = b.borderColor, a.lineWidth = b.borderWidth, a.fillStyle = b.backgroundColor, a.fill(), a.lineJoin = "bevel", b.borderWidth && a.stroke()
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        37: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(26),
                f = a(45),
                g = d.global;
            d._set("global", {
                elements: {
                    line: {
                        tension: .4,
                        backgroundColor: g.defaultColor,
                        borderWidth: 3,
                        borderColor: g.defaultColor,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0,
                        borderJoinStyle: "miter",
                        capBezierPoints: !0,
                        fill: !0
                    }
                }
            }), b.exports = e.extend({
                draw: function () {
                    var a, b, c, d, e = this,
                        h = e._view,
                        i = e._chart.ctx,
                        j = h.spanGaps,
                        k = e._children.slice(),
                        l = g.elements.line,
                        m = -1;
                    for (e._loop && k.length && k.push(k[0]), i.save(), i.lineCap = h.borderCapStyle || l.borderCapStyle, i.setLineDash && i.setLineDash(h.borderDash || l.borderDash), i.lineDashOffset = h.borderDashOffset || l.borderDashOffset, i.lineJoin = h.borderJoinStyle || l.borderJoinStyle, i.lineWidth = h.borderWidth || l.borderWidth, i.strokeStyle = h.borderColor || g.defaultColor, i.beginPath(), m = -1, a = 0; a < k.length; ++a) b = k[a], c = f.previousItem(k, a), d = b._view, 0 === a ? d.skip || (i.moveTo(d.x, d.y), m = a) : (c = -1 === m ? c : k[m], d.skip || (m !== a - 1 && !j || -1 === m ? i.moveTo(d.x, d.y) : f.canvas.lineTo(i, c._view, b._view), m = a));
                    i.stroke(), i.restore()
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        38: [function (a, b, c) {
            "use strict";

            function d(a) {
                var b = this._view;
                return !!b && Math.abs(a - b.x) < b.radius + b.hitRadius
            }

            function e(a) {
                var b = this._view;
                return !!b && Math.abs(a - b.y) < b.radius + b.hitRadius
            }
            var f = a(25),
                g = a(26),
                h = a(45),
                i = f.global.defaultColor;
            f._set("global", {
                elements: {
                    point: {
                        radius: 3,
                        pointStyle: "circle",
                        backgroundColor: i,
                        borderColor: i,
                        borderWidth: 1,
                        hitRadius: 1,
                        hoverRadius: 4,
                        hoverBorderWidth: 1
                    }
                }
            }), b.exports = g.extend({
                inRange: function (a, b) {
                    var c = this._view;
                    return !!c && Math.pow(a - c.x, 2) + Math.pow(b - c.y, 2) < Math.pow(c.hitRadius + c.radius, 2)
                },
                inLabelRange: d,
                inXRange: d,
                inYRange: e,
                getCenterPoint: function () {
                    var a = this._view;
                    return {
                        x: a.x,
                        y: a.y
                    }
                },
                getArea: function () {
                    return Math.PI * Math.pow(this._view.radius, 2)
                },
                tooltipPosition: function () {
                    var a = this._view;
                    return {
                        x: a.x,
                        y: a.y,
                        padding: a.radius + a.borderWidth
                    }
                },
                draw: function (a) {
                    var b = this._view,
                        c = this._model,
                        d = this._chart.ctx,
                        e = b.pointStyle,
                        g = b.radius,
                        j = b.x,
                        k = b.y,
                        l = h.color,
                        m = 0;
                    b.skip || (d.strokeStyle = b.borderColor || i, d.lineWidth = h.valueOrDefault(b.borderWidth, f.global.elements.point.borderWidth), d.fillStyle = b.backgroundColor || i, void 0 !== a && (c.x < a.left || 1.01 * a.right < c.x || c.y < a.top || 1.01 * a.bottom < c.y) && (c.x < a.left ? m = (j - c.x) / (a.left - c.x) : 1.01 * a.right < c.x ? m = (c.x - j) / (c.x - a.right) : c.y < a.top ? m = (k - c.y) / (a.top - c.y) : 1.01 * a.bottom < c.y && (m = (c.y - k) / (c.y - a.bottom)), m = Math.round(100 * m) / 100, d.strokeStyle = l(d.strokeStyle).alpha(m).rgbString(), d.fillStyle = l(d.fillStyle).alpha(m).rgbString()), h.canvas.drawPoint(d, e, g, j, k))
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        39: [function (a, b, c) {
            "use strict";

            function d(a) {
                return void 0 !== a._view.width
            }

            function e(a) {
                var b, c, e, f, g = a._view;
                if (d(a)) {
                    var h = g.width / 2;
                    b = g.x - h, c = g.x + h, e = Math.min(g.y, g.base), f = Math.max(g.y, g.base)
                } else {
                    var i = g.height / 2;
                    b = Math.min(g.x, g.base), c = Math.max(g.x, g.base), e = g.y - i, f = g.y + i
                }
                return {
                    left: b,
                    top: e,
                    right: c,
                    bottom: f
                }
            }
            var f = a(25),
                g = a(26);
            f._set("global", {
                elements: {
                    rectangle: {
                        backgroundColor: f.global.defaultColor,
                        borderColor: f.global.defaultColor,
                        borderSkipped: "bottom",
                        borderWidth: 0
                    }
                }
            }), b.exports = g.extend({
                draw: function () {
                    function a(a) {
                        return r[(t + a) % 4]
                    }
                    var b, c, d, e, f, g, h, i = this._chart.ctx,
                        j = this._view,
                        k = j.borderWidth;
                    if (j.horizontal ? (b = j.base, c = j.x, d = j.y - j.height / 2, e = j.y + j.height / 2, f = c > b ? 1 : -1, g = 1, h = j.borderSkipped || "left") : (b = j.x - j.width / 2, c = j.x + j.width / 2, d = j.y, e = j.base, f = 1, g = e > d ? 1 : -1, h = j.borderSkipped || "bottom"), k) {
                        var l = Math.min(Math.abs(b - c), Math.abs(d - e));
                        k = k > l ? l : k;
                        var m = k / 2,
                            n = b + ("left" !== h ? m * f : 0),
                            o = c + ("right" !== h ? -m * f : 0),
                            p = d + ("top" !== h ? m * g : 0),
                            q = e + ("bottom" !== h ? -m * g : 0);
                        n !== o && (d = p, e = q), p !== q && (b = n, c = o)
                    }
                    i.beginPath(), i.fillStyle = j.backgroundColor, i.strokeStyle = j.borderColor, i.lineWidth = k;
                    var r = [
                            [b, e],
                            [b, d],
                            [c, d],
                            [c, e]
                        ],
                        s = ["bottom", "left", "top", "right"],
                        t = s.indexOf(h, 0); - 1 === t && (t = 0);
                    var u = a(0);
                    i.moveTo(u[0], u[1]);
                    for (var v = 1; v < 4; v++) u = a(v), i.lineTo(u[0], u[1]);
                    i.fill(), k && i.stroke()
                },
                height: function () {
                    var a = this._view;
                    return a.base - a.y
                },
                inRange: function (a, b) {
                    var c = !1;
                    if (this._view) {
                        var d = e(this);
                        c = a >= d.left && a <= d.right && b >= d.top && b <= d.bottom
                    }
                    return c
                },
                inLabelRange: function (a, b) {
                    var c = this;
                    if (!c._view) return !1;
                    var f = e(c);
                    return d(c) ? a >= f.left && a <= f.right : b >= f.top && b <= f.bottom
                },
                inXRange: function (a) {
                    var b = e(this);
                    return a >= b.left && a <= b.right
                },
                inYRange: function (a) {
                    var b = e(this);
                    return a >= b.top && a <= b.bottom
                },
                getCenterPoint: function () {
                    var a, b, c = this._view;
                    return d(this) ? (a = c.x, b = (c.y + c.base) / 2) : (a = (c.x + c.base) / 2, b = c.y), {
                        x: a,
                        y: b
                    }
                },
                getArea: function () {
                    var a = this._view;
                    return a.width * Math.abs(a.y - a.base)
                },
                tooltipPosition: function () {
                    var a = this._view;
                    return {
                        x: a.x,
                        y: a.y
                    }
                }
            })
        }, {
            25: 25,
            26: 26
        }],
        40: [function (a, b, c) {
            "use strict";
            b.exports = {}, b.exports.Arc = a(36), b.exports.Line = a(37), b.exports.Point = a(38), b.exports.Rectangle = a(39)
        }, {
            36: 36,
            37: 37,
            38: 38,
            39: 39
        }],
        41: [function (a, b, c) {
            "use strict";
            var d = a(42),
                c = b.exports = {
                    clear: function (a) {
                        a.ctx.clearRect(0, 0, a.width, a.height)
                    },
                    roundedRect: function (a, b, c, d, e, f) {
                        if (f) {
                            var g = Math.min(f, d / 2),
                                h = Math.min(f, e / 2);
                            a.moveTo(b + g, c), a.lineTo(b + d - g, c), a.quadraticCurveTo(b + d, c, b + d, c + h), a.lineTo(b + d, c + e - h), a.quadraticCurveTo(b + d, c + e, b + d - g, c + e), a.lineTo(b + g, c + e), a.quadraticCurveTo(b, c + e, b, c + e - h), a.lineTo(b, c + h), a.quadraticCurveTo(b, c, b + g, c)
                        } else a.rect(b, c, d, e)
                    },
                    drawPoint: function (a, b, c, d, e) {
                        var f, g, h, i, j, k;
                        if (b && "object" == typeof b && ("[object HTMLImageElement]" === (f = b.toString()) || "[object HTMLCanvasElement]" === f)) return void a.drawImage(b, d - b.width / 2, e - b.height / 2, b.width, b.height);
                        if (!(isNaN(c) || c <= 0)) {
                            switch (b) {
                                default:
                                    a.beginPath(), a.arc(d, e, c, 0, 2 * Math.PI), a.closePath(), a.fill();
                                    break;
                                case "triangle":
                                    a.beginPath(), g = 3 * c / Math.sqrt(3), j = g * Math.sqrt(3) / 2, a.moveTo(d - g / 2, e + j / 3), a.lineTo(d + g / 2, e + j / 3), a.lineTo(d, e - 2 * j / 3), a.closePath(), a.fill();
                                    break;
                                case "rect":
                                    k = 1 / Math.SQRT2 * c, a.beginPath(), a.fillRect(d - k, e - k, 2 * k, 2 * k), a.strokeRect(d - k, e - k, 2 * k, 2 * k);
                                    break;
                                case "rectRounded":
                                    var l = c / Math.SQRT2,
                                        m = d - l,
                                        n = e - l,
                                        o = Math.SQRT2 * c;
                                    a.beginPath(), this.roundedRect(a, m, n, o, o, c / 2), a.closePath(), a.fill();
                                    break;
                                case "rectRot":
                                    k = 1 / Math.SQRT2 * c, a.beginPath(), a.moveTo(d - k, e), a.lineTo(d, e + k), a.lineTo(d + k, e), a.lineTo(d, e - k), a.closePath(), a.fill();
                                    break;
                                case "cross":
                                    a.beginPath(), a.moveTo(d, e + c), a.lineTo(d, e - c), a.moveTo(d - c, e), a.lineTo(d + c, e), a.closePath();
                                    break;
                                case "crossRot":
                                    a.beginPath(), h = Math.cos(Math.PI / 4) * c, i = Math.sin(Math.PI / 4) * c, a.moveTo(d - h, e - i), a.lineTo(d + h, e + i), a.moveTo(d - h, e + i), a.lineTo(d + h, e - i), a.closePath();
                                    break;
                                case "star":
                                    a.beginPath(), a.moveTo(d, e + c), a.lineTo(d, e - c), a.moveTo(d - c, e), a.lineTo(d + c, e), h = Math.cos(Math.PI / 4) * c, i = Math.sin(Math.PI / 4) * c, a.moveTo(d - h, e - i), a.lineTo(d + h, e + i), a.moveTo(d - h, e + i), a.lineTo(d + h, e - i), a.closePath();
                                    break;
                                case "line":
                                    a.beginPath(), a.moveTo(d - c, e), a.lineTo(d + c, e), a.closePath();
                                    break;
                                case "dash":
                                    a.beginPath(), a.moveTo(d, e), a.lineTo(d + c, e), a.closePath()
                            }
                            a.stroke()
                        }
                    },
                    clipArea: function (a, b) {
                        a.save(), a.beginPath(), a.rect(b.left, b.top, b.right - b.left, b.bottom - b.top), a.clip()
                    },
                    unclipArea: function (a) {
                        a.restore()
                    },
                    lineTo: function (a, b, c, d) {
                        return c.steppedLine ? ("after" === c.steppedLine && !d || "after" !== c.steppedLine && d ? a.lineTo(b.x, c.y) : a.lineTo(c.x, b.y), void a.lineTo(c.x, c.y)) : c.tension ? void a.bezierCurveTo(d ? b.controlPointPreviousX : b.controlPointNextX, d ? b.controlPointPreviousY : b.controlPointNextY, d ? c.controlPointNextX : c.controlPointPreviousX, d ? c.controlPointNextY : c.controlPointPreviousY, c.x, c.y) : void a.lineTo(c.x, c.y)
                    }
                };
            d.clear = c.clear, d.drawRoundedRectangle = function (a) {
                a.beginPath(), c.roundedRect.apply(c, arguments), a.closePath()
            }
        }, {
            42: 42
        }],
        42: [function (a, b, c) {
            "use strict";
            var d = {
                noop: function () {},
                uid: function () {
                    var a = 0;
                    return function () {
                        return a++
                    }
                }(),
                isNullOrUndef: function (a) {
                    return null === a || void 0 === a
                },
                isArray: Array.isArray ? Array.isArray : function (a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                },
                isObject: function (a) {
                    return null !== a && "[object Object]" === Object.prototype.toString.call(a)
                },
                valueOrDefault: function (a, b) {
                    return void 0 === a ? b : a
                },
                valueAtIndexOrDefault: function (a, b, c) {
                    return d.valueOrDefault(d.isArray(a) ? a[b] : a, c)
                },
                callback: function (a, b, c) {
                    if (a && "function" == typeof a.call) return a.apply(c, b)
                },
                each: function (a, b, c, e) {
                    var f, g, h;
                    if (d.isArray(a))
                        if (g = a.length, e)
                            for (f = g - 1; f >= 0; f--) b.call(c, a[f], f);
                        else
                            for (f = 0; f < g; f++) b.call(c, a[f], f);
                    else if (d.isObject(a))
                        for (h = Object.keys(a), g = h.length, f = 0; f < g; f++) b.call(c, a[h[f]], h[f])
                },
                arrayEquals: function (a, b) {
                    var c, e, f, g;
                    if (!a || !b || a.length !== b.length) return !1;
                    for (c = 0, e = a.length; c < e; ++c)
                        if (f = a[c], g = b[c], f instanceof Array && g instanceof Array) {
                            if (!d.arrayEquals(f, g)) return !1
                        } else if (f !== g) return !1;
                    return !0
                },
                clone: function (a) {
                    if (d.isArray(a)) return a.map(d.clone);
                    if (d.isObject(a)) {
                        for (var b = {}, c = Object.keys(a), e = c.length, f = 0; f < e; ++f) b[c[f]] = d.clone(a[c[f]]);
                        return b
                    }
                    return a
                },
                _merger: function (a, b, c, e) {
                    var f = b[a],
                        g = c[a];
                    d.isObject(f) && d.isObject(g) ? d.merge(f, g, e) : b[a] = d.clone(g)
                },
                _mergerIf: function (a, b, c) {
                    var e = b[a],
                        f = c[a];
                    d.isObject(e) && d.isObject(f) ? d.mergeIf(e, f) : b.hasOwnProperty(a) || (b[a] = d.clone(f))
                },
                merge: function (a, b, c) {
                    var e, f, g, h, i, j = d.isArray(b) ? b : [b],
                        k = j.length;
                    if (!d.isObject(a)) return a;
                    for (c = c || {}, e = c.merger || d._merger, f = 0; f < k; ++f)
                        if (b = j[f], d.isObject(b))
                            for (g = Object.keys(b), i = 0, h = g.length; i < h; ++i) e(g[i], a, b, c);
                    return a
                },
                mergeIf: function (a, b) {
                    return d.merge(a, b, {
                        merger: d._mergerIf
                    })
                },
                extend: function (a) {
                    for (var b = function (b, c) {
                            a[c] = b
                        }, c = 1, e = arguments.length; c < e; ++c) d.each(arguments[c], b);
                    return a
                },
                inherits: function (a) {
                    var b = this,
                        c = a && a.hasOwnProperty("constructor") ? a.constructor : function () {
                            return b.apply(this, arguments)
                        },
                        e = function () {
                            this.constructor = c
                        };
                    return e.prototype = b.prototype, c.prototype = new e, c.extend = d.inherits, a && d.extend(c.prototype, a), c.__super__ = b.prototype, c
                }
            };
            b.exports = d, d.callCallback = d.callback, d.indexOf = function (a, b, c) {
                return Array.prototype.indexOf.call(a, b, c)
            }, d.getValueOrDefault = d.valueOrDefault, d.getValueAtIndexOrDefault = d.valueAtIndexOrDefault
        }, {}],
        43: [function (a, b, c) {
            "use strict";
            var d = a(42),
                e = {
                    linear: function (a) {
                        return a
                    },
                    easeInQuad: function (a) {
                        return a * a
                    },
                    easeOutQuad: function (a) {
                        return -a * (a - 2)
                    },
                    easeInOutQuad: function (a) {
                        return (a /= .5) < 1 ? .5 * a * a : -.5 * (--a * (a - 2) - 1)
                    },
                    easeInCubic: function (a) {
                        return a * a * a
                    },
                    easeOutCubic: function (a) {
                        return (a -= 1) * a * a + 1
                    },
                    easeInOutCubic: function (a) {
                        return (a /= .5) < 1 ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
                    },
                    easeInQuart: function (a) {
                        return a * a * a * a
                    },
                    easeOutQuart: function (a) {
                        return -((a -= 1) * a * a * a - 1)
                    },
                    easeInOutQuart: function (a) {
                        return (a /= .5) < 1 ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2)
                    },
                    easeInQuint: function (a) {
                        return a * a * a * a * a
                    },
                    easeOutQuint: function (a) {
                        return (a -= 1) * a * a * a * a + 1
                    },
                    easeInOutQuint: function (a) {
                        return (a /= .5) < 1 ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
                    },
                    easeInSine: function (a) {
                        return 1 - Math.cos(a * (Math.PI / 2))
                    },
                    easeOutSine: function (a) {
                        return Math.sin(a * (Math.PI / 2))
                    },
                    easeInOutSine: function (a) {
                        return -.5 * (Math.cos(Math.PI * a) - 1)
                    },
                    easeInExpo: function (a) {
                        return 0 === a ? 0 : Math.pow(2, 10 * (a - 1))
                    },
                    easeOutExpo: function (a) {
                        return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
                    },
                    easeInOutExpo: function (a) {
                        return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * --a))
                    },
                    easeInCirc: function (a) {
                        return a >= 1 ? a : -(Math.sqrt(1 - a * a) - 1)
                    },
                    easeOutCirc: function (a) {
                        return Math.sqrt(1 - (a -= 1) * a)
                    },
                    easeInOutCirc: function (a) {
                        return (a /= .5) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                    },
                    easeInElastic: function (a) {
                        var b = 1.70158,
                            c = 0,
                            d = 1;
                        return 0 === a ? 0 : 1 === a ? 1 : (c || (c = .3), d < 1 ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), -d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / c))
                    },
                    easeOutElastic: function (a) {
                        var b = 1.70158,
                            c = 0,
                            d = 1;
                        return 0 === a ? 0 : 1 === a ? 1 : (c || (c = .3), d < 1 ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), d * Math.pow(2, -10 * a) * Math.sin((a - b) * (2 * Math.PI) / c) + 1)
                    },
                    easeInOutElastic: function (a) {
                        var b = 1.70158,
                            c = 0,
                            d = 1;
                        return 0 === a ? 0 : 2 == (a /= .5) ? 1 : (c || (c = .45), d < 1 ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), a < 1 ? d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / c) * -.5 : d * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / c) * .5 + 1)
                    },
                    easeInBack: function (a) {
                        var b = 1.70158;
                        return a * a * ((b + 1) * a - b)
                    },
                    easeOutBack: function (a) {
                        var b = 1.70158;
                        return (a -= 1) * a * ((b + 1) * a + b) + 1
                    },
                    easeInOutBack: function (a) {
                        var b = 1.70158;
                        return (a /= .5) < 1 ? a * a * ((1 + (b *= 1.525)) * a - b) * .5 : .5 * ((a -= 2) * a * ((1 + (b *= 1.525)) * a + b) + 2)
                    },
                    easeInBounce: function (a) {
                        return 1 - e.easeOutBounce(1 - a)
                    },
                    easeOutBounce: function (a) {
                        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                    },
                    easeInOutBounce: function (a) {
                        return a < .5 ? .5 * e.easeInBounce(2 * a) : .5 * e.easeOutBounce(2 * a - 1) + .5
                    }
                };
            b.exports = {
                effects: e
            }, d.easingEffects = e
        }, {
            42: 42
        }],
        44: [function (a, b, c) {
            "use strict";
            var d = a(42);
            b.exports = {
                toLineHeight: function (a, b) {
                    var c = ("" + a).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
                    if (!c || "normal" === c[1]) return 1.2 * b;
                    switch (a = +c[2], c[3]) {
                        case "px":
                            return a;
                        case "%":
                            a /= 100
                    }
                    return b * a
                },
                toPadding: function (a) {
                    var b, c, e, f;
                    return d.isObject(a) ? (b = +a.top || 0, c = +a.right || 0, e = +a.bottom || 0, f = +a.left || 0) : b = c = e = f = +a || 0, {
                        top: b,
                        right: c,
                        bottom: e,
                        left: f,
                        height: b + e,
                        width: f + c
                    }
                },
                resolve: function (a, b, c) {
                    var e, f, g;
                    for (e = 0, f = a.length; e < f; ++e)
                        if (void 0 !== (g = a[e]) && (void 0 !== b && "function" == typeof g && (g = g(b)), void 0 !== c && d.isArray(g) && (g = g[c]), void 0 !== g)) return g
                }
            }
        }, {
            42: 42
        }],
        45: [function (a, b, c) {
            "use strict";
            b.exports = a(42), b.exports.easing = a(43), b.exports.canvas = a(41), b.exports.options = a(44)
        }, {
            41: 41,
            42: 42,
            43: 43,
            44: 44
        }],
        46: [function (a, b, c) {
            b.exports = {
                acquireContext: function (a) {
                    return a && a.canvas && (a = a.canvas), a && a.getContext("2d") || null
                }
            }
        }, {}],
        47: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                var c = q.getStyle(a, b),
                    d = c && c.match(/^(\d+)(\.\d+)?px$/);
                return d ? Number(d[1]) : void 0
            }

            function e(a, b) {
                var c = a.style,
                    e = a.getAttribute("height"),
                    f = a.getAttribute("width");
                if (a[r] = {
                        initial: {
                            height: e,
                            width: f,
                            style: {
                                display: c.display,
                                height: c.height,
                                width: c.width
                            }
                        }
                    }, c.display = c.display || "block", null === f || "" === f) {
                    var g = d(a, "width");
                    void 0 !== g && (a.width = g)
                }
                if (null === e || "" === e)
                    if ("" === a.style.height) a.height = a.width / (b.options.aspectRatio || 2);
                    else {
                        var h = d(a, "height");
                        void 0 !== g && (a.height = h)
                    } return a
            }

            function f(a, b, c) {
                a.addEventListener(b, c, y)
            }

            function g(a, b, c) {
                a.removeEventListener(b, c, y)
            }

            function h(a, b, c, d, e) {
                return {
                    type: a,
                    chart: b,
                    native: e || null,
                    x: void 0 !== c ? c : null,
                    y: void 0 !== d ? d : null
                }
            }

            function i(a, b) {
                var c = w[a.type] || a.type,
                    d = q.getRelativePosition(a, b);
                return h(c, b, d.x, d.y, a)
            }

            function j(a, b) {
                var c = !1,
                    d = [];
                return function () {
                    d = Array.prototype.slice.call(arguments), b = b || this, c || (c = !0, q.requestAnimFrame.call(window, function () {
                        c = !1, a.apply(b, d)
                    }))
                }
            }

            function k(a) {
                var b = document.createElement("div"),
                    c = s + "size-monitor",
                    d = "position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;";
                b.style.cssText = d, b.className = c, b.innerHTML = '<div class="' + c + '-expand" style="' + d + '"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="' + c + '-shrink" style="' + d + '"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>';
                var e = b.childNodes[0],
                    g = b.childNodes[1];
                b._reset = function () {
                    e.scrollLeft = 1e6, e.scrollTop = 1e6, g.scrollLeft = 1e6, g.scrollTop = 1e6
                };
                var h = function () {
                    b._reset(), a()
                };
                return f(e, "scroll", h.bind(e, "expand")), f(g, "scroll", h.bind(g, "shrink")), b
            }

            function l(a, b) {
                var c = a[r] || (a[r] = {}),
                    d = c.renderProxy = function (a) {
                        a.animationName === u && b()
                    };
                q.each(v, function (b) {
                    f(a, b, d)
                }), c.reflow = !!a.offsetParent, a.classList.add(t)
            }

            function m(a) {
                var b = a[r] || {},
                    c = b.renderProxy;
                c && (q.each(v, function (b) {
                    g(a, b, c)
                }), delete b.renderProxy), a.classList.remove(t)
            }

            function n(a, b, c) {
                var d = a[r] || (a[r] = {}),
                    e = d.resizer = k(j(function () {
                        if (d.resizer) return b(h("resize", c))
                    }));
                l(a, function () {
                    if (d.resizer) {
                        var b = a.parentNode;
                        b && b !== e.parentNode && b.insertBefore(e, b.firstChild), e._reset()
                    }
                })
            }

            function o(a) {
                var b = a[r] || {},
                    c = b.resizer;
                delete b.resizer, m(a), c && c.parentNode && c.parentNode.removeChild(c)
            }

            function p(a, b) {
                var c = a._style || document.createElement("style");
                a._style || (a._style = c, b = "/* Chart.js */\n" + b, c.setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(c)), c.appendChild(document.createTextNode(b))
            }
            var q = a(45),
                r = "$chartjs",
                s = "chartjs-",
                t = s + "render-monitor",
                u = s + "render-animation",
                v = ["animationstart", "webkitAnimationStart"],
                w = {
                    touchstart: "mousedown",
                    touchmove: "mousemove",
                    touchend: "mouseup",
                    pointerenter: "mouseenter",
                    pointerdown: "mousedown",
                    pointermove: "mousemove",
                    pointerup: "mouseup",
                    pointerleave: "mouseout",
                    pointerout: "mouseout"
                },
                x = function () {
                    var a = !1;
                    try {
                        var b = Object.defineProperty({}, "passive", {
                            get: function () {
                                a = !0
                            }
                        });
                        window.addEventListener("e", null, b)
                    } catch (a) {}
                    return a
                }(),
                y = !!x && {
                    passive: !0
                };
            b.exports = {
                _enabled: "undefined" != typeof window && "undefined" != typeof document,
                initialize: function () {
                    var a = "from{opacity:0.99}to{opacity:1}";
                    p(this, "@-webkit-keyframes " + u + "{" + a + "}@keyframes " + u + "{" + a + "}." + t + "{-webkit-animation:" + u + " 0.001s;animation:" + u + " 0.001s;}")
                },
                acquireContext: function (a, b) {
                    "string" == typeof a ? a = document.getElementById(a) : a.length && (a = a[0]), a && a.canvas && (a = a.canvas);
                    var c = a && a.getContext && a.getContext("2d");
                    return c && c.canvas === a ? (e(a, b), c) : null
                },
                releaseContext: function (a) {
                    var b = a.canvas;
                    if (b[r]) {
                        var c = b[r].initial;
                        ["height", "width"].forEach(function (a) {
                            var d = c[a];
                            q.isNullOrUndef(d) ? b.removeAttribute(a) : b.setAttribute(a, d)
                        }), q.each(c.style || {}, function (a, c) {
                            b.style[c] = a
                        }), b.width = b.width, delete b[r]
                    }
                },
                addEventListener: function (a, b, c) {
                    var d = a.canvas;
                    if ("resize" === b) return void n(d, c, a);
                    var e = c[r] || (c[r] = {});
                    f(d, b, (e.proxies || (e.proxies = {}))[a.id + "_" + b] = function (b) {
                        c(i(b, a))
                    })
                },
                removeEventListener: function (a, b, c) {
                    var d = a.canvas;
                    if ("resize" === b) return void o(d);
                    var e = c[r] || {},
                        f = e.proxies || {},
                        h = f[a.id + "_" + b];
                    h && g(d, b, h)
                }
            }, q.addEvent = f, q.removeEvent = g
        }, {
            45: 45
        }],
        48: [function (a, b, c) {
            "use strict";
            var d = a(45),
                e = a(46),
                f = a(47),
                g = f._enabled ? f : e;
            b.exports = d.extend({
                initialize: function () {},
                acquireContext: function () {},
                releaseContext: function () {},
                addEventListener: function () {},
                removeEventListener: function () {}
            }, g)
        }, {
            45: 45,
            46: 46,
            47: 47
        }],
        49: [function (a, b, c) {
            "use strict";
            b.exports = {}, b.exports.filler = a(50), b.exports.legend = a(51), b.exports.title = a(52)
        }, {
            50: 50,
            51: 51,
            52: 52
        }],
        50: [function (a, b, c) {
            "use strict";

            function d(a, b, c) {
                var d, e = a._model || {},
                    f = e.fill;
                if (void 0 === f && (f = !!e.backgroundColor), !1 === f || null === f) return !1;
                if (!0 === f) return "origin";
                if (d = parseFloat(f, 10), isFinite(d) && Math.floor(d) === d) return "-" !== f[0] && "+" !== f[0] || (d = b + d), !(d === b || d < 0 || d >= c) && d;
                switch (f) {
                    case "bottom":
                        return "start";
                    case "top":
                        return "end";
                    case "zero":
                        return "origin";
                    case "origin":
                    case "start":
                    case "end":
                        return f;
                    default:
                        return !1
                }
            }

            function e(a) {
                var b, c = a.el._model || {},
                    d = a.el._scale || {},
                    e = a.fill,
                    f = null;
                if (isFinite(e)) return null;
                if ("start" === e ? f = void 0 === c.scaleBottom ? d.bottom : c.scaleBottom : "end" === e ? f = void 0 === c.scaleTop ? d.top : c.scaleTop : void 0 !== c.scaleZero ? f = c.scaleZero : d.getBasePosition ? f = d.getBasePosition() : d.getBasePixel && (f = d.getBasePixel()), void 0 !== f && null !== f) {
                    if (void 0 !== f.x && void 0 !== f.y) return f;
                    if ("number" == typeof f && isFinite(f)) return b = d.isHorizontal(), {
                        x: b ? f : null,
                        y: b ? null : f
                    }
                }
                return null
            }

            function f(a, b, c) {
                var d, e = a[b],
                    f = e.fill,
                    g = [b];
                if (!c) return f;
                for (; !1 !== f && -1 === g.indexOf(f);) {
                    if (!isFinite(f)) return f;
                    if (!(d = a[f])) return !1;
                    if (d.visible) return f;
                    g.push(f), f = d.fill
                }
                return !1
            }

            function g(a) {
                var b = a.fill,
                    c = "dataset";
                return !1 === b ? null : (isFinite(b) || (c = "boundary"), n[c](a))
            }

            function h(a) {
                return a && !a.skip
            }

            function i(a, b, c, d, e) {
                var f;
                if (d && e) {
                    for (a.moveTo(b[0].x, b[0].y), f = 1; f < d; ++f) m.canvas.lineTo(a, b[f - 1], b[f]);
                    for (a.lineTo(c[e - 1].x, c[e - 1].y), f = e - 1; f > 0; --f) m.canvas.lineTo(a, c[f], c[f - 1], !0)
                }
            }

            function j(a, b, c, d, e, f) {
                var g, j, k, l, m, n, o, p = b.length,
                    q = d.spanGaps,
                    r = [],
                    s = [],
                    t = 0,
                    u = 0;
                for (a.beginPath(), g = 0, j = p + !!f; g < j; ++g) k = g % p, l = b[k]._view, m = c(l, k, d), n = h(l), o = h(m), n && o ? (t = r.push(l), u = s.push(m)) : t && u && (q ? (n && r.push(l), o && s.push(m)) : (i(a, r, s, t, u), t = u = 0, r = [], s = []));
                i(a, r, s, t, u), a.closePath(), a.fillStyle = e, a.fill()
            }
            var k = a(25),
                l = a(40),
                m = a(45);
            k._set("global", {
                plugins: {
                    filler: {
                        propagate: !0
                    }
                }
            });
            var n = {
                dataset: function (a) {
                    var b = a.fill,
                        c = a.chart,
                        d = c.getDatasetMeta(b),
                        e = d && c.isDatasetVisible(b),
                        f = e && d.dataset._children || [],
                        g = f.length || 0;
                    return g ? function (a, b) {
                        return b < g && f[b]._view || null
                    } : null
                },
                boundary: function (a) {
                    var b = a.boundary,
                        c = b ? b.x : null,
                        d = b ? b.y : null;
                    return function (a) {
                        return {
                            x: null === c ? a.x : c,
                            y: null === d ? a.y : d
                        }
                    }
                }
            };
            b.exports = {
                id: "filler",
                afterDatasetsUpdate: function (a, b) {
                    var c, h, i, j, k = (a.data.datasets || []).length,
                        m = b.propagate,
                        n = [];
                    for (h = 0; h < k; ++h) c = a.getDatasetMeta(h), i = c.dataset, j = null, i && i._model && i instanceof l.Line && (j = {
                        visible: a.isDatasetVisible(h),
                        fill: d(i, h, k),
                        chart: a,
                        el: i
                    }), c.$filler = j, n.push(j);
                    for (h = 0; h < k; ++h)(j = n[h]) && (j.fill = f(n, h, m), j.boundary = e(j), j.mapper = g(j))
                },
                beforeDatasetDraw: function (a, b) {
                    var c = b.meta.$filler;
                    if (c) {
                        var d = a.ctx,
                            e = c.el,
                            f = e._view,
                            g = e._children || [],
                            h = c.mapper,
                            i = f.backgroundColor || k.global.defaultColor;
                        h && i && g.length && (m.canvas.clipArea(d, a.chartArea), j(d, g, h, f, i, e._loop), m.canvas.unclipArea(d))
                    }
                }
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        51: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                return a.usePointStyle ? b * Math.SQRT2 : a.boxWidth
            }

            function e(a, b) {
                var c = new k({
                    ctx: a.ctx,
                    options: b,
                    chart: a
                });
                i.configure(a, c, b), i.addBox(a, c), a.legend = c
            }
            var f = a(25),
                g = a(26),
                h = a(45),
                i = a(30),
                j = h.noop;
            f._set("global", {
                legend: {
                    display: !0,
                    position: "top",
                    fullWidth: !0,
                    reverse: !1,
                    weight: 1e3,
                    onClick: function (a, b) {
                        var c = b.datasetIndex,
                            d = this.chart,
                            e = d.getDatasetMeta(c);
                        e.hidden = null === e.hidden ? !d.data.datasets[c].hidden : null, d.update()
                    },
                    onHover: null,
                    labels: {
                        boxWidth: 40,
                        padding: 10,
                        generateLabels: function (a) {
                            var b = a.data;
                            return h.isArray(b.datasets) ? b.datasets.map(function (b, c) {
                                return {
                                    text: b.label,
                                    fillStyle: h.isArray(b.backgroundColor) ? b.backgroundColor[0] : b.backgroundColor,
                                    hidden: !a.isDatasetVisible(c),
                                    lineCap: b.borderCapStyle,
                                    lineDash: b.borderDash,
                                    lineDashOffset: b.borderDashOffset,
                                    lineJoin: b.borderJoinStyle,
                                    lineWidth: b.borderWidth,
                                    strokeStyle: b.borderColor,
                                    pointStyle: b.pointStyle,
                                    datasetIndex: c
                                }
                            }, this) : []
                        }
                    }
                },
                legendCallback: function (a) {
                    var b = [];
                    b.push('<ul class="' + a.id + '-legend">');
                    for (var c = 0; c < a.data.datasets.length; c++) b.push('<li><span style="background-color:' + a.data.datasets[c].backgroundColor + '"></span>'), a.data.datasets[c].label && b.push(a.data.datasets[c].label), b.push("</li>");
                    return b.push("</ul>"), b.join("")
                }
            });
            var k = g.extend({
                initialize: function (a) {
                    h.extend(this, a), this.legendHitBoxes = [], this.doughnutMode = !1
                },
                beforeUpdate: j,
                update: function (a, b, c) {
                    var d = this;
                    return d.beforeUpdate(), d.maxWidth = a, d.maxHeight = b, d.margins = c, d.beforeSetDimensions(), d.setDimensions(), d.afterSetDimensions(), d.beforeBuildLabels(), d.buildLabels(), d.afterBuildLabels(), d.beforeFit(), d.fit(), d.afterFit(), d.afterUpdate(), d.minSize
                },
                afterUpdate: j,
                beforeSetDimensions: j,
                setDimensions: function () {
                    var a = this;
                    a.isHorizontal() ? (a.width = a.maxWidth, a.left = 0, a.right = a.width) : (a.height = a.maxHeight, a.top = 0, a.bottom = a.height), a.paddingLeft = 0, a.paddingTop = 0, a.paddingRight = 0, a.paddingBottom = 0, a.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: j,
                beforeBuildLabels: j,
                buildLabels: function () {
                    var a = this,
                        b = a.options.labels || {},
                        c = h.callback(b.generateLabels, [a.chart], a) || [];
                    b.filter && (c = c.filter(function (c) {
                        return b.filter(c, a.chart.data)
                    })), a.options.reverse && c.reverse(), a.legendItems = c
                },
                afterBuildLabels: j,
                beforeFit: j,
                fit: function () {
                    var a = this,
                        b = a.options,
                        c = b.labels,
                        e = b.display,
                        g = a.ctx,
                        i = f.global,
                        j = h.valueOrDefault,
                        k = j(c.fontSize, i.defaultFontSize),
                        l = j(c.fontStyle, i.defaultFontStyle),
                        m = j(c.fontFamily, i.defaultFontFamily),
                        n = h.fontString(k, l, m),
                        o = a.legendHitBoxes = [],
                        p = a.minSize,
                        q = a.isHorizontal();
                    if (q ? (p.width = a.maxWidth, p.height = e ? 10 : 0) : (p.width = e ? 10 : 0, p.height = a.maxHeight), e)
                        if (g.font = n, q) {
                            var r = a.lineWidths = [0],
                                s = a.legendItems.length ? k + c.padding : 0;
                            g.textAlign = "left", g.textBaseline = "top", h.each(a.legendItems, function (b, e) {
                                var f = d(c, k),
                                    h = f + k / 2 + g.measureText(b.text).width;
                                r[r.length - 1] + h + c.padding >= a.width && (s += k + c.padding, r[r.length] = a.left), o[e] = {
                                    left: 0,
                                    top: 0,
                                    width: h,
                                    height: k
                                }, r[r.length - 1] += h + c.padding
                            }), p.height += s
                        } else {
                            var t = c.padding,
                                u = a.columnWidths = [],
                                v = c.padding,
                                w = 0,
                                x = 0,
                                y = k + t;
                            h.each(a.legendItems, function (a, b) {
                                var e = d(c, k),
                                    f = e + k / 2 + g.measureText(a.text).width;
                                x + y > p.height && (v += w + c.padding, u.push(w), w = 0, x = 0), w = Math.max(w, f), x += y, o[b] = {
                                    left: 0,
                                    top: 0,
                                    width: f,
                                    height: k
                                }
                            }), v += w, u.push(w), p.width += v
                        } a.width = p.width, a.height = p.height
                },
                afterFit: j,
                isHorizontal: function () {
                    return "top" === this.options.position || "bottom" === this.options.position
                },
                draw: function () {
                    var a = this,
                        b = a.options,
                        c = b.labels,
                        e = f.global,
                        g = e.elements.line,
                        i = a.width,
                        j = a.lineWidths;
                    if (b.display) {
                        var k, l = a.ctx,
                            m = h.valueOrDefault,
                            n = m(c.fontColor, e.defaultFontColor),
                            o = m(c.fontSize, e.defaultFontSize),
                            p = m(c.fontStyle, e.defaultFontStyle),
                            q = m(c.fontFamily, e.defaultFontFamily),
                            r = h.fontString(o, p, q);
                        l.textAlign = "left", l.textBaseline = "middle", l.lineWidth = .5, l.strokeStyle = n, l.fillStyle = n, l.font = r;
                        var s = d(c, o),
                            t = a.legendHitBoxes,
                            u = function (a, c, d) {
                                if (!(isNaN(s) || s <= 0)) {
                                    l.save(), l.fillStyle = m(d.fillStyle, e.defaultColor), l.lineCap = m(d.lineCap, g.borderCapStyle), l.lineDashOffset = m(d.lineDashOffset, g.borderDashOffset), l.lineJoin = m(d.lineJoin, g.borderJoinStyle), l.lineWidth = m(d.lineWidth, g.borderWidth), l.strokeStyle = m(d.strokeStyle, e.defaultColor);
                                    var f = 0 === m(d.lineWidth, g.borderWidth);
                                    if (l.setLineDash && l.setLineDash(m(d.lineDash, g.borderDash)), b.labels && b.labels.usePointStyle) {
                                        var i = o * Math.SQRT2 / 2,
                                            j = i / Math.SQRT2,
                                            k = a + j,
                                            n = c + j;
                                        h.canvas.drawPoint(l, d.pointStyle, i, k, n)
                                    } else f || l.strokeRect(a, c, s, o), l.fillRect(a, c, s, o);
                                    l.restore()
                                }
                            },
                            v = function (a, b, c, d) {
                                var e = o / 2,
                                    f = s + e + a,
                                    g = b + e;
                                l.fillText(c.text, f, g), c.hidden && (l.beginPath(), l.lineWidth = 2, l.moveTo(f, g), l.lineTo(f + d, g), l.stroke())
                            },
                            w = a.isHorizontal();
                        k = w ? {
                            x: a.left + (i - j[0]) / 2,
                            y: a.top + c.padding,
                            line: 0
                        } : {
                            x: a.left + c.padding,
                            y: a.top + c.padding,
                            line: 0
                        };
                        var x = o + c.padding;
                        h.each(a.legendItems, function (b, d) {
                            var e = l.measureText(b.text).width,
                                f = s + o / 2 + e,
                                g = k.x,
                                h = k.y;
                            w ? g + f >= i && (h = k.y += x, k.line++, g = k.x = a.left + (i - j[k.line]) / 2) : h + x > a.bottom && (g = k.x = g + a.columnWidths[k.line] + c.padding, h = k.y = a.top + c.padding, k.line++), u(g, h, b), t[d].left = g, t[d].top = h, v(g, h, b, e), w ? k.x += f + c.padding : k.y += x
                        })
                    }
                },
                handleEvent: function (a) {
                    var b = this,
                        c = b.options,
                        d = "mouseup" === a.type ? "click" : a.type,
                        e = !1;
                    if ("mousemove" === d) {
                        if (!c.onHover) return
                    } else {
                        if ("click" !== d) return;
                        if (!c.onClick) return
                    }
                    var f = a.x,
                        g = a.y;
                    if (f >= b.left && f <= b.right && g >= b.top && g <= b.bottom)
                        for (var h = b.legendHitBoxes, i = 0; i < h.length; ++i) {
                            var j = h[i];
                            if (f >= j.left && f <= j.left + j.width && g >= j.top && g <= j.top + j.height) {
                                if ("click" === d) {
                                    c.onClick.call(b, a.native, b.legendItems[i]), e = !0;
                                    break
                                }
                                if ("mousemove" === d) {
                                    c.onHover.call(b, a.native, b.legendItems[i]), e = !0;
                                    break
                                }
                            }
                        }
                    return e
                }
            });
            b.exports = {
                id: "legend",
                _element: k,
                beforeInit: function (a) {
                    var b = a.options.legend;
                    b && e(a, b)
                },
                beforeUpdate: function (a) {
                    var b = a.options.legend,
                        c = a.legend;
                    b ? (h.mergeIf(b, f.global.legend), c ? (i.configure(a, c, b), c.options = b) : e(a, b)) : c && (i.removeBox(a, c), delete a.legend)
                },
                afterEvent: function (a, b) {
                    var c = a.legend;
                    c && c.handleEvent(b)
                }
            }
        }, {
            25: 25,
            26: 26,
            30: 30,
            45: 45
        }],
        52: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                var c = new j({
                    ctx: a.ctx,
                    options: b,
                    chart: a
                });
                h.configure(a, c, b), h.addBox(a, c), a.titleBlock = c
            }
            var e = a(25),
                f = a(26),
                g = a(45),
                h = a(30),
                i = g.noop;
            e._set("global", {
                title: {
                    display: !1,
                    fontStyle: "bold",
                    fullWidth: !0,
                    lineHeight: 1.2,
                    padding: 10,
                    position: "top",
                    text: "",
                    weight: 2e3
                }
            });
            var j = f.extend({
                initialize: function (a) {
                    var b = this;
                    g.extend(b, a), b.legendHitBoxes = []
                },
                beforeUpdate: i,
                update: function (a, b, c) {
                    var d = this;
                    return d.beforeUpdate(), d.maxWidth = a, d.maxHeight = b, d.margins = c, d.beforeSetDimensions(), d.setDimensions(), d.afterSetDimensions(), d.beforeBuildLabels(), d.buildLabels(), d.afterBuildLabels(), d.beforeFit(), d.fit(), d.afterFit(), d.afterUpdate(), d.minSize
                },
                afterUpdate: i,
                beforeSetDimensions: i,
                setDimensions: function () {
                    var a = this;
                    a.isHorizontal() ? (a.width = a.maxWidth, a.left = 0, a.right = a.width) : (a.height = a.maxHeight, a.top = 0, a.bottom = a.height), a.paddingLeft = 0, a.paddingTop = 0, a.paddingRight = 0, a.paddingBottom = 0, a.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: i,
                beforeBuildLabels: i,
                buildLabels: i,
                afterBuildLabels: i,
                beforeFit: i,
                fit: function () {
                    var a = this,
                        b = g.valueOrDefault,
                        c = a.options,
                        d = c.display,
                        f = b(c.fontSize, e.global.defaultFontSize),
                        h = a.minSize,
                        i = g.isArray(c.text) ? c.text.length : 1,
                        j = g.options.toLineHeight(c.lineHeight, f),
                        k = d ? i * j + 2 * c.padding : 0;
                    a.isHorizontal() ? (h.width = a.maxWidth, h.height = k) : (h.width = k, h.height = a.maxHeight), a.width = h.width, a.height = h.height
                },
                afterFit: i,
                isHorizontal: function () {
                    var a = this.options.position;
                    return "top" === a || "bottom" === a
                },
                draw: function () {
                    var a = this,
                        b = a.ctx,
                        c = g.valueOrDefault,
                        d = a.options,
                        f = e.global;
                    if (d.display) {
                        var h, i, j, k = c(d.fontSize, f.defaultFontSize),
                            l = c(d.fontStyle, f.defaultFontStyle),
                            m = c(d.fontFamily, f.defaultFontFamily),
                            n = g.fontString(k, l, m),
                            o = g.options.toLineHeight(d.lineHeight, k),
                            p = o / 2 + d.padding,
                            q = 0,
                            r = a.top,
                            s = a.left,
                            t = a.bottom,
                            u = a.right;
                        b.fillStyle = c(d.fontColor, f.defaultFontColor), b.font = n, a.isHorizontal() ? (i = s + (u - s) / 2, j = r + p, h = u - s) : (i = "left" === d.position ? s + p : u - p, j = r + (t - r) / 2, h = t - r, q = Math.PI * ("left" === d.position ? -.5 : .5)), b.save(), b.translate(i, j), b.rotate(q), b.textAlign = "center", b.textBaseline = "middle";
                        var v = d.text;
                        if (g.isArray(v))
                            for (var w = 0, x = 0; x < v.length; ++x) b.fillText(v[x], 0, w, h), w += o;
                        else b.fillText(v, 0, 0, h);
                        b.restore()
                    }
                }
            });
            b.exports = {
                id: "title",
                _element: j,
                beforeInit: function (a) {
                    var b = a.options.title;
                    b && d(a, b)
                },
                beforeUpdate: function (a) {
                    var b = a.options.title,
                        c = a.titleBlock;
                    b ? (g.mergeIf(b, e.global.title), c ? (h.configure(a, c, b), c.options = b) : d(a, b)) : c && (h.removeBox(a, c), delete a.titleBlock)
                }
            }
        }, {
            25: 25,
            26: 26,
            30: 30,
            45: 45
        }],
        53: [function (a, b, c) {
            "use strict";
            b.exports = function (a) {
                var b = {
                        position: "bottom"
                    },
                    c = a.Scale.extend({
                        getLabels: function () {
                            var a = this.chart.data;
                            return this.options.labels || (this.isHorizontal() ? a.xLabels : a.yLabels) || a.labels
                        },
                        determineDataLimits: function () {
                            var a = this,
                                b = a.getLabels();
                            a.minIndex = 0, a.maxIndex = b.length - 1;
                            var c;
                            void 0 !== a.options.ticks.min && (c = b.indexOf(a.options.ticks.min), a.minIndex = -1 !== c ? c : a.minIndex), void 0 !== a.options.ticks.max && (c = b.indexOf(a.options.ticks.max), a.maxIndex = -1 !== c ? c : a.maxIndex), a.min = b[a.minIndex], a.max = b[a.maxIndex]
                        },
                        buildTicks: function () {
                            var a = this,
                                b = a.getLabels();
                            a.ticks = 0 === a.minIndex && a.maxIndex === b.length - 1 ? b : b.slice(a.minIndex, a.maxIndex + 1)
                        },
                        getLabelForIndex: function (a, b) {
                            var c = this,
                                d = c.chart.data,
                                e = c.isHorizontal();
                            return d.yLabels && !e ? c.getRightValue(d.datasets[b].data[a]) : c.ticks[a - c.minIndex]
                        },
                        getPixelForValue: function (a, b) {
                            var c, d = this,
                                e = d.options.offset,
                                f = Math.max(d.maxIndex + 1 - d.minIndex - (e ? 0 : 1), 1);
                            if (void 0 !== a && null !== a && (c = d.isHorizontal() ? a.x : a.y), void 0 !== c || void 0 !== a && isNaN(b)) {
                                var g = d.getLabels();
                                a = c || a;
                                var h = g.indexOf(a);
                                b = -1 !== h ? h : b
                            }
                            if (d.isHorizontal()) {
                                var i = d.width / f,
                                    j = i * (b - d.minIndex);
                                return e && (j += i / 2), d.left + Math.round(j)
                            }
                            var k = d.height / f,
                                l = k * (b - d.minIndex);
                            return e && (l += k / 2), d.top + Math.round(l)
                        },
                        getPixelForTick: function (a) {
                            return this.getPixelForValue(this.ticks[a], a + this.minIndex, null)
                        },
                        getValueForPixel: function (a) {
                            var b = this,
                                c = b.options.offset,
                                d = Math.max(b._ticks.length - (c ? 0 : 1), 1),
                                e = b.isHorizontal(),
                                f = (e ? b.width : b.height) / d;
                            return a -= e ? b.left : b.top, c && (a -= f / 2), (a <= 0 ? 0 : Math.round(a / f)) + b.minIndex
                        },
                        getBasePixel: function () {
                            return this.bottom
                        }
                    });
                a.scaleService.registerScaleType("category", c, b)
            }
        }, {}],
        54: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(45),
                f = a(34);
            b.exports = function (a) {
                var b = {
                        position: "left",
                        ticks: {
                            callback: f.formatters.linear
                        }
                    },
                    c = a.LinearScaleBase.extend({
                        determineDataLimits: function () {
                            function a(a) {
                                return h ? a.xAxisID === b.id : a.yAxisID === b.id
                            }
                            var b = this,
                                c = b.options,
                                d = b.chart,
                                f = d.data,
                                g = f.datasets,
                                h = b.isHorizontal();
                            b.min = null, b.max = null;
                            var i = c.stacked;
                            if (void 0 === i && e.each(g, function (b, c) {
                                    if (!i) {
                                        var e = d.getDatasetMeta(c);
                                        d.isDatasetVisible(c) && a(e) && void 0 !== e.stack && (i = !0)
                                    }
                                }), c.stacked || i) {
                                var j = {};
                                e.each(g, function (f, g) {
                                    var h = d.getDatasetMeta(g),
                                        i = [h.type, void 0 === c.stacked && void 0 === h.stack ? g : "", h.stack].join(".");
                                    void 0 === j[i] && (j[i] = {
                                        positiveValues: [],
                                        negativeValues: []
                                    });
                                    var k = j[i].positiveValues,
                                        l = j[i].negativeValues;
                                    d.isDatasetVisible(g) && a(h) && e.each(f.data, function (a, d) {
                                        var e = +b.getRightValue(a);
                                        isNaN(e) || h.data[d].hidden || (k[d] = k[d] || 0, l[d] = l[d] || 0, c.relativePoints ? k[d] = 100 : e < 0 ? l[d] += e : k[d] += e)
                                    })
                                }), e.each(j, function (a) {
                                    var c = a.positiveValues.concat(a.negativeValues),
                                        d = e.min(c),
                                        f = e.max(c);
                                    b.min = null === b.min ? d : Math.min(b.min, d), b.max = null === b.max ? f : Math.max(b.max, f)
                                })
                            } else e.each(g, function (c, f) {
                                var g = d.getDatasetMeta(f);
                                d.isDatasetVisible(f) && a(g) && e.each(c.data, function (a, c) {
                                    var d = +b.getRightValue(a);
                                    isNaN(d) || g.data[c].hidden || (null === b.min ? b.min = d : d < b.min && (b.min = d), null === b.max ? b.max = d : d > b.max && (b.max = d))
                                })
                            });
                            b.min = isFinite(b.min) && !isNaN(b.min) ? b.min : 0, b.max = isFinite(b.max) && !isNaN(b.max) ? b.max : 1, this.handleTickRangeOptions()
                        },
                        getTickLimit: function () {
                            var a, b = this,
                                c = b.options.ticks;
                            if (b.isHorizontal()) a = Math.min(c.maxTicksLimit ? c.maxTicksLimit : 11, Math.ceil(b.width / 50));
                            else {
                                var f = e.valueOrDefault(c.fontSize, d.global.defaultFontSize);
                                a = Math.min(c.maxTicksLimit ? c.maxTicksLimit : 11, Math.ceil(b.height / (2 * f)))
                            }
                            return a
                        },
                        handleDirectionalChanges: function () {
                            this.isHorizontal() || this.ticks.reverse()
                        },
                        getLabelForIndex: function (a, b) {
                            return +this.getRightValue(this.chart.data.datasets[b].data[a])
                        },
                        getPixelForValue: function (a) {
                            var b = this,
                                c = b.start,
                                d = +b.getRightValue(a),
                                e = b.end - c;
                            return b.isHorizontal() ? b.left + b.width / e * (d - c) : b.bottom - b.height / e * (d - c)
                        },
                        getValueForPixel: function (a) {
                            var b = this,
                                c = b.isHorizontal(),
                                d = c ? b.width : b.height,
                                e = (c ? a - b.left : b.bottom - a) / d;
                            return b.start + (b.end - b.start) * e
                        },
                        getPixelForTick: function (a) {
                            return this.getPixelForValue(this.ticksAsNumbers[a])
                        }
                    });
                a.scaleService.registerScaleType("linear", c, b)
            }
        }, {
            25: 25,
            34: 34,
            45: 45
        }],
        55: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                var c, d = [];
                if (a.stepSize && a.stepSize > 0) c = a.stepSize;
                else {
                    var f = e.niceNum(b.max - b.min, !1);
                    c = e.niceNum(f / (a.maxTicks - 1), !0)
                }
                var g = Math.floor(b.min / c) * c,
                    h = Math.ceil(b.max / c) * c;
                a.min && a.max && a.stepSize && e.almostWhole((a.max - a.min) / a.stepSize, c / 1e3) && (g = a.min, h = a.max);
                var i = (h - g) / c;
                i = e.almostEquals(i, Math.round(i), c / 1e3) ? Math.round(i) : Math.ceil(i);
                var j = 1;
                c < 1 && (j = Math.pow(10, c.toString().length - 2), g = Math.round(g * j) / j, h = Math.round(h * j) / j), d.push(void 0 !== a.min ? a.min : g);
                for (var k = 1; k < i; ++k) d.push(Math.round((g + k * c) * j) / j);
                return d.push(void 0 !== a.max ? a.max : h), d
            }
            var e = a(45);
            b.exports = function (a) {
                var b = e.noop;
                a.LinearScaleBase = a.Scale.extend({
                    getRightValue: function (b) {
                        return "string" == typeof b ? +b : a.Scale.prototype.getRightValue.call(this, b)
                    },
                    handleTickRangeOptions: function () {
                        var a = this,
                            b = a.options,
                            c = b.ticks;
                        if (c.beginAtZero) {
                            var d = e.sign(a.min),
                                f = e.sign(a.max);
                            d < 0 && f < 0 ? a.max = 0 : d > 0 && f > 0 && (a.min = 0)
                        }
                        var g = void 0 !== c.min || void 0 !== c.suggestedMin,
                            h = void 0 !== c.max || void 0 !== c.suggestedMax;
                        void 0 !== c.min ? a.min = c.min : void 0 !== c.suggestedMin && (null === a.min ? a.min = c.suggestedMin : a.min = Math.min(a.min, c.suggestedMin)), void 0 !== c.max ? a.max = c.max : void 0 !== c.suggestedMax && (null === a.max ? a.max = c.suggestedMax : a.max = Math.max(a.max, c.suggestedMax)), g !== h && a.min >= a.max && (g ? a.max = a.min + 1 : a.min = a.max - 1), a.min === a.max && (a.max++, c.beginAtZero || a.min--)
                    },
                    getTickLimit: b,
                    handleDirectionalChanges: b,
                    buildTicks: function () {
                        var a = this,
                            b = a.options,
                            c = b.ticks,
                            f = a.getTickLimit();
                        f = Math.max(2, f);
                        var g = {
                                maxTicks: f,
                                min: c.min,
                                max: c.max,
                                stepSize: e.valueOrDefault(c.fixedStepSize, c.stepSize)
                            },
                            h = a.ticks = d(g, a);
                        a.handleDirectionalChanges(), a.max = e.max(h), a.min = e.min(h), c.reverse ? (h.reverse(), a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max)
                    },
                    convertTicksToLabels: function () {
                        var b = this;
                        b.ticksAsNumbers = b.ticks.slice(), b.zeroLineIndex = b.ticks.indexOf(0), a.Scale.prototype.convertTicksToLabels.call(b)
                    }
                })
            }
        }, {
            45: 45
        }],
        56: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                var c, d, f = [],
                    g = e.valueOrDefault,
                    h = g(a.min, Math.pow(10, Math.floor(e.log10(b.min)))),
                    i = Math.floor(e.log10(b.max)),
                    j = Math.ceil(b.max / Math.pow(10, i));
                0 === h ? (c = Math.floor(e.log10(b.minNotZero)), d = Math.floor(b.minNotZero / Math.pow(10, c)), f.push(h), h = d * Math.pow(10, c)) : (c = Math.floor(e.log10(h)), d = Math.floor(h / Math.pow(10, c)));
                var k = c < 0 ? Math.pow(10, Math.abs(c)) : 1;
                do {
                    f.push(h), ++d, 10 === d && (d = 1, ++c, k = c >= 0 ? 1 : k), h = Math.round(d * Math.pow(10, c) * k) / k
                } while (c < i || c === i && d < j);
                var l = g(a.max, h);
                return f.push(l), f
            }
            var e = a(45),
                f = a(34);
            b.exports = function (a) {
                var b = {
                        position: "left",
                        ticks: {
                            callback: f.formatters.logarithmic
                        }
                    },
                    c = a.Scale.extend({
                        determineDataLimits: function () {
                            function a(a) {
                                return h ? a.xAxisID === b.id : a.yAxisID === b.id
                            }
                            var b = this,
                                c = b.options,
                                d = b.chart,
                                f = d.data,
                                g = f.datasets,
                                h = b.isHorizontal();
                            b.min = null, b.max = null, b.minNotZero = null;
                            var i = c.stacked;
                            if (void 0 === i && e.each(g, function (b, c) {
                                    if (!i) {
                                        var e = d.getDatasetMeta(c);
                                        d.isDatasetVisible(c) && a(e) && void 0 !== e.stack && (i = !0)
                                    }
                                }), c.stacked || i) {
                                var j = {};
                                e.each(g, function (f, g) {
                                    var h = d.getDatasetMeta(g),
                                        i = [h.type, void 0 === c.stacked && void 0 === h.stack ? g : "", h.stack].join(".");
                                    d.isDatasetVisible(g) && a(h) && (void 0 === j[i] && (j[i] = []), e.each(f.data, function (a, c) {
                                        var d = j[i],
                                            e = +b.getRightValue(a);
                                        isNaN(e) || h.data[c].hidden || e < 0 || (d[c] = d[c] || 0, d[c] += e)
                                    }))
                                }), e.each(j, function (a) {
                                    if (a.length > 0) {
                                        var c = e.min(a),
                                            d = e.max(a);
                                        b.min = null === b.min ? c : Math.min(b.min, c), b.max = null === b.max ? d : Math.max(b.max, d)
                                    }
                                })
                            } else e.each(g, function (c, f) {
                                var g = d.getDatasetMeta(f);
                                d.isDatasetVisible(f) && a(g) && e.each(c.data, function (a, c) {
                                    var d = +b.getRightValue(a);
                                    isNaN(d) || g.data[c].hidden || d < 0 || (null === b.min ? b.min = d : d < b.min && (b.min = d), null === b.max ? b.max = d : d > b.max && (b.max = d), 0 !== d && (null === b.minNotZero || d < b.minNotZero) && (b.minNotZero = d))
                                })
                            });
                            this.handleTickRangeOptions()
                        },
                        handleTickRangeOptions: function () {
                            var a = this,
                                b = a.options,
                                c = b.ticks,
                                d = e.valueOrDefault;
                            a.min = d(c.min, a.min), a.max = d(c.max, a.max), a.min === a.max && (0 !== a.min && null !== a.min ? (a.min = Math.pow(10, Math.floor(e.log10(a.min)) - 1), a.max = Math.pow(10, Math.floor(e.log10(a.max)) + 1)) : (a.min = 1, a.max = 10)), null === a.min && (a.min = Math.pow(10, Math.floor(e.log10(a.max)) - 1)), null === a.max && (a.max = 0 !== a.min ? Math.pow(10, Math.floor(e.log10(a.min)) + 1) : 10), null === a.minNotZero && (a.min > 0 ? a.minNotZero = a.min : a.max < 1 ? a.minNotZero = Math.pow(10, Math.floor(e.log10(a.max))) : a.minNotZero = 1)
                        },
                        buildTicks: function () {
                            var a = this,
                                b = a.options,
                                c = b.ticks,
                                f = !a.isHorizontal(),
                                g = {
                                    min: c.min,
                                    max: c.max
                                },
                                h = a.ticks = d(g, a);
                            a.max = e.max(h), a.min = e.min(h), c.reverse ? (f = !f, a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max), f && h.reverse()
                        },
                        convertTicksToLabels: function () {
                            this.tickValues = this.ticks.slice(), a.Scale.prototype.convertTicksToLabels.call(this)
                        },
                        getLabelForIndex: function (a, b) {
                            return +this.getRightValue(this.chart.data.datasets[b].data[a])
                        },
                        getPixelForTick: function (a) {
                            return this.getPixelForValue(this.tickValues[a])
                        },
                        _getFirstTickValue: function (a) {
                            var b = Math.floor(e.log10(a));
                            return Math.floor(a / Math.pow(10, b)) * Math.pow(10, b)
                        },
                        getPixelForValue: function (b) {
                            var c, d, f, g, h, i = this,
                                j = i.options.ticks.reverse,
                                k = e.log10,
                                l = i._getFirstTickValue(i.minNotZero),
                                m = 0;
                            return b = +i.getRightValue(b), j ? (f = i.end, g = i.start, h = -1) : (f = i.start, g = i.end, h = 1), i.isHorizontal() ? (c = i.width, d = j ? i.right : i.left) : (c = i.height, h *= -1, d = j ? i.top : i.bottom), b !== f && (0 === f && (m = e.getValueOrDefault(i.options.ticks.fontSize, a.defaults.global.defaultFontSize), c -= m, f = l), 0 !== b && (m += c / (k(g) - k(f)) * (k(b) - k(f))), d += h * m), d
                        },
                        getValueForPixel: function (b) {
                            var c, d, f, g, h = this,
                                i = h.options.ticks.reverse,
                                j = e.log10,
                                k = h._getFirstTickValue(h.minNotZero);
                            if (i ? (d = h.end, f = h.start) : (d = h.start, f = h.end), h.isHorizontal() ? (c = h.width, g = i ? h.right - b : b - h.left) : (c = h.height, g = i ? b - h.top : h.bottom - b), g !== d) {
                                if (0 === d) {
                                    var l = e.getValueOrDefault(h.options.ticks.fontSize, a.defaults.global.defaultFontSize);
                                    g -= l, c -= l, d = k
                                }
                                g *= j(f) - j(d), g /= c, g = Math.pow(10, j(d) + g)
                            }
                            return g
                        }
                    });
                a.scaleService.registerScaleType("logarithmic", c, b)
            }
        }, {
            34: 34,
            45: 45
        }],
        57: [function (a, b, c) {
            "use strict";
            var d = a(25),
                e = a(45),
                f = a(34);
            b.exports = function (a) {
                function b(a) {
                    var b = a.options;
                    return b.angleLines.display || b.pointLabels.display ? a.chart.data.labels.length : 0
                }

                function c(a) {
                    var b = a.options.pointLabels,
                        c = e.valueOrDefault(b.fontSize, q.defaultFontSize),
                        d = e.valueOrDefault(b.fontStyle, q.defaultFontStyle),
                        f = e.valueOrDefault(b.fontFamily, q.defaultFontFamily);
                    return {
                        size: c,
                        style: d,
                        family: f,
                        font: e.fontString(c, d, f)
                    }
                }

                function g(a, b, c) {
                    return e.isArray(c) ? {
                        w: e.longestText(a, a.font, c),
                        h: c.length * b + 1.5 * (c.length - 1) * b
                    } : {
                        w: a.measureText(c).width,
                        h: b
                    }
                }

                function h(a, b, c, d, e) {
                    return a === d || a === e ? {
                        start: b - c / 2,
                        end: b + c / 2
                    } : a < d || a > e ? {
                        start: b - c - 5,
                        end: b
                    } : {
                        start: b,
                        end: b + c + 5
                    }
                }

                function i(a) {
                    var d, f, i, j = c(a),
                        k = Math.min(a.height / 2, a.width / 2),
                        l = {
                            r: a.width,
                            l: 0,
                            t: a.height,
                            b: 0
                        },
                        m = {};
                    a.ctx.font = j.font, a._pointLabelSizes = [];
                    var n = b(a);
                    for (d = 0; d < n; d++) {
                        i = a.getPointPosition(d, k), f = g(a.ctx, j.size, a.pointLabels[d] || ""), a._pointLabelSizes[d] = f;
                        var o = a.getIndexAngle(d),
                            p = e.toDegrees(o) % 360,
                            q = h(p, i.x, f.w, 0, 180),
                            r = h(p, i.y, f.h, 90, 270);
                        q.start < l.l && (l.l = q.start, m.l = o), q.end > l.r && (l.r = q.end, m.r = o), r.start < l.t && (l.t = r.start, m.t = o), r.end > l.b && (l.b = r.end, m.b = o)
                    }
                    a.setReductions(k, l, m)
                }

                function j(a) {
                    var b = Math.min(a.height / 2, a.width / 2);
                    a.drawingArea = Math.round(b), a.setCenterPoint(0, 0, 0, 0)
                }

                function k(a) {
                    return 0 === a || 180 === a ? "center" : a < 180 ? "left" : "right"
                }

                function l(a, b, c, d) {
                    if (e.isArray(b))
                        for (var f = c.y, g = 1.5 * d, h = 0; h < b.length; ++h) a.fillText(b[h], c.x, f), f += g;
                    else a.fillText(b, c.x, c.y)
                }

                function m(a, b, c) {
                    90 === a || 270 === a ? c.y -= b.h / 2 : (a > 270 || a < 90) && (c.y -= b.h)
                }

                function n(a) {
                    var d = a.ctx,
                        f = a.options,
                        g = f.angleLines,
                        h = f.pointLabels;
                    d.lineWidth = g.lineWidth, d.strokeStyle = g.color;
                    var i = a.getDistanceFromCenterForValue(f.ticks.reverse ? a.min : a.max),
                        j = c(a);
                    d.textBaseline = "top";
                    for (var n = b(a) - 1; n >= 0; n--) {
                        if (g.display) {
                            var o = a.getPointPosition(n, i);
                            d.beginPath(), d.moveTo(a.xCenter, a.yCenter), d.lineTo(o.x, o.y), d.stroke(), d.closePath()
                        }
                        if (h.display) {
                            var p = a.getPointPosition(n, i + 5),
                                r = e.valueAtIndexOrDefault(h.fontColor, n, q.defaultFontColor);
                            d.font = j.font, d.fillStyle = r;
                            var s = a.getIndexAngle(n),
                                t = e.toDegrees(s);
                            d.textAlign = k(t), m(t, a._pointLabelSizes[n], p), l(d, a.pointLabels[n] || "", p, j.size)
                        }
                    }
                }

                function o(a, c, d, f) {
                    var g = a.ctx;
                    if (g.strokeStyle = e.valueAtIndexOrDefault(c.color, f - 1), g.lineWidth = e.valueAtIndexOrDefault(c.lineWidth, f - 1), a.options.gridLines.circular) g.beginPath(), g.arc(a.xCenter, a.yCenter, d, 0, 2 * Math.PI), g.closePath(), g.stroke();
                    else {
                        var h = b(a);
                        if (0 === h) return;
                        g.beginPath();
                        var i = a.getPointPosition(0, d);
                        g.moveTo(i.x, i.y);
                        for (var j = 1; j < h; j++) i = a.getPointPosition(j, d), g.lineTo(i.x, i.y);
                        g.closePath(), g.stroke()
                    }
                }

                function p(a) {
                    return e.isNumber(a) ? a : 0
                }
                var q = d.global,
                    r = {
                        display: !0,
                        animate: !0,
                        position: "chartArea",
                        angleLines: {
                            display: !0,
                            color: "rgba(0, 0, 0, 0.1)",
                            lineWidth: 1
                        },
                        gridLines: {
                            circular: !1
                        },
                        ticks: {
                            showLabelBackdrop: !0,
                            backdropColor: "rgba(255,255,255,0.75)",
                            backdropPaddingY: 2,
                            backdropPaddingX: 2,
                            callback: f.formatters.linear
                        },
                        pointLabels: {
                            display: !0,
                            fontSize: 10,
                            callback: function (a) {
                                return a
                            }
                        }
                    },
                    s = a.LinearScaleBase.extend({
                        setDimensions: function () {
                            var a = this,
                                b = a.options,
                                c = b.ticks;
                            a.width = a.maxWidth, a.height = a.maxHeight, a.xCenter = Math.round(a.width / 2), a.yCenter = Math.round(a.height / 2);
                            var d = e.min([a.height, a.width]),
                                f = e.valueOrDefault(c.fontSize, q.defaultFontSize);
                            a.drawingArea = b.display ? d / 2 - (f / 2 + c.backdropPaddingY) : d / 2
                        },
                        determineDataLimits: function () {
                            var a = this,
                                b = a.chart,
                                c = Number.POSITIVE_INFINITY,
                                d = Number.NEGATIVE_INFINITY;
                            e.each(b.data.datasets, function (f, g) {
                                if (b.isDatasetVisible(g)) {
                                    var h = b.getDatasetMeta(g);
                                    e.each(f.data, function (b, e) {
                                        var f = +a.getRightValue(b);
                                        isNaN(f) || h.data[e].hidden || (c = Math.min(f, c), d = Math.max(f, d))
                                    })
                                }
                            }), a.min = c === Number.POSITIVE_INFINITY ? 0 : c, a.max = d === Number.NEGATIVE_INFINITY ? 0 : d, a.handleTickRangeOptions()
                        },
                        getTickLimit: function () {
                            var a = this.options.ticks,
                                b = e.valueOrDefault(a.fontSize, q.defaultFontSize);
                            return Math.min(a.maxTicksLimit ? a.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * b)))
                        },
                        convertTicksToLabels: function () {
                            var b = this;
                            a.LinearScaleBase.prototype.convertTicksToLabels.call(b), b.pointLabels = b.chart.data.labels.map(b.options.pointLabels.callback, b)
                        },
                        getLabelForIndex: function (a, b) {
                            return +this.getRightValue(this.chart.data.datasets[b].data[a])
                        },
                        fit: function () {
                            this.options.pointLabels.display ? i(this) : j(this)
                        },
                        setReductions: function (a, b, c) {
                            var d = this,
                                e = b.l / Math.sin(c.l),
                                f = Math.max(b.r - d.width, 0) / Math.sin(c.r),
                                g = -b.t / Math.cos(c.t),
                                h = -Math.max(b.b - d.height, 0) / Math.cos(c.b);
                            e = p(e), f = p(f), g = p(g), h = p(h), d.drawingArea = Math.min(Math.round(a - (e + f) / 2), Math.round(a - (g + h) / 2)), d.setCenterPoint(e, f, g, h)
                        },
                        setCenterPoint: function (a, b, c, d) {
                            var e = this,
                                f = e.width - b - e.drawingArea,
                                g = a + e.drawingArea,
                                h = c + e.drawingArea,
                                i = e.height - d - e.drawingArea;
                            e.xCenter = Math.round((g + f) / 2 + e.left), e.yCenter = Math.round((h + i) / 2 + e.top)
                        },
                        getIndexAngle: function (a) {
                            return a * (2 * Math.PI / b(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360
                        },
                        getDistanceFromCenterForValue: function (a) {
                            var b = this;
                            if (null === a) return 0;
                            var c = b.drawingArea / (b.max - b.min);
                            return b.options.ticks.reverse ? (b.max - a) * c : (a - b.min) * c
                        },
                        getPointPosition: function (a, b) {
                            var c = this,
                                d = c.getIndexAngle(a) - Math.PI / 2;
                            return {
                                x: Math.round(Math.cos(d) * b) + c.xCenter,
                                y: Math.round(Math.sin(d) * b) + c.yCenter
                            }
                        },
                        getPointPositionForValue: function (a, b) {
                            return this.getPointPosition(a, this.getDistanceFromCenterForValue(b))
                        },
                        getBasePosition: function () {
                            var a = this,
                                b = a.min,
                                c = a.max;
                            return a.getPointPositionForValue(0, a.beginAtZero ? 0 : b < 0 && c < 0 ? c : b > 0 && c > 0 ? b : 0)
                        },
                        draw: function () {
                            var a = this,
                                b = a.options,
                                c = b.gridLines,
                                d = b.ticks,
                                f = e.valueOrDefault;
                            if (b.display) {
                                var g = a.ctx,
                                    h = this.getIndexAngle(0),
                                    i = f(d.fontSize, q.defaultFontSize),
                                    j = f(d.fontStyle, q.defaultFontStyle),
                                    k = f(d.fontFamily, q.defaultFontFamily),
                                    l = e.fontString(i, j, k);
                                e.each(a.ticks, function (b, e) {
                                    if (e > 0 || d.reverse) {
                                        var j = a.getDistanceFromCenterForValue(a.ticksAsNumbers[e]);
                                        if (c.display && 0 !== e && o(a, c, j, e), d.display) {
                                            var k = f(d.fontColor, q.defaultFontColor);
                                            if (g.font = l, g.save(), g.translate(a.xCenter, a.yCenter), g.rotate(h), d.showLabelBackdrop) {
                                                var m = g.measureText(b).width;
                                                g.fillStyle = d.backdropColor, g.fillRect(-m / 2 - d.backdropPaddingX, -j - i / 2 - d.backdropPaddingY, m + 2 * d.backdropPaddingX, i + 2 * d.backdropPaddingY)
                                            }
                                            g.textAlign = "center", g.textBaseline = "middle", g.fillStyle = k, g.fillText(b, 0, -j), g.restore()
                                        }
                                    }
                                }), (b.angleLines.display || b.pointLabels.display) && n(a)
                            }
                        }
                    });
                a.scaleService.registerScaleType("radialLinear", s, r)
            }
        }, {
            25: 25,
            34: 34,
            45: 45
        }],
        58: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                return a - b
            }

            function e(a) {
                var b, c, d, e = {},
                    f = [];
                for (b = 0, c = a.length; b < c; ++b) d = a[b], e[d] || (e[d] = !0, f.push(d));
                return f
            }

            function f(a, b, c, d) {
                if ("linear" === d || !a.length) return [{
                    time: b,
                    pos: 0
                }, {
                    time: c,
                    pos: 1
                }];
                var e, f, g, h, i, j = [],
                    k = [b];
                for (e = 0, f = a.length; e < f; ++e)(h = a[e]) > b && h < c && k.push(h);
                for (k.push(c), e = 0, f = k.length; e < f; ++e) i = k[e + 1], g = k[e - 1], h = k[e], void 0 !== g && void 0 !== i && Math.round((i + g) / 2) === h || j.push({
                    time: h,
                    pos: e / (f - 1)
                });
                return j
            }

            function g(a, b, c) {
                for (var d, e, f, g = 0, h = a.length - 1; g >= 0 && g <= h;) {
                    if (d = g + h >> 1, e = a[d - 1] || null, f = a[d], !e) return {
                        lo: null,
                        hi: f
                    };
                    if (f[b] < c) g = d + 1;
                    else {
                        if (!(e[b] > c)) return {
                            lo: e,
                            hi: f
                        };
                        h = d - 1
                    }
                }
                return {
                    lo: f,
                    hi: null
                }
            }

            function h(a, b, c, d) {
                var e = g(a, b, c),
                    f = e.lo ? e.hi ? e.lo : a[a.length - 2] : a[0],
                    h = e.lo ? e.hi ? e.hi : a[a.length - 1] : a[1],
                    i = h[b] - f[b],
                    j = i ? (c - f[b]) / i : 0,
                    k = (h[d] - f[d]) * j;
                return f[d] + k
            }

            function i(a, b) {
                var c = b.parser,
                    d = b.parser || b.format;
                return "function" == typeof c ? c(a) : "string" == typeof a && "string" == typeof d ? s(a, d) : (a instanceof s || (a = s(a)), a.isValid() ? a : "function" == typeof d ? d(a) : a)
            }

            function j(a, b) {
                if (u.isNullOrUndef(a)) return null;
                var c = b.options.time,
                    d = i(b.getRightValue(a), c);
                return d.isValid() ? (c.round && d.startOf(c.round), d.valueOf()) : null
            }

            function k(a, b, c, d) {
                var e, f, g, h = b - a,
                    i = x[c],
                    j = i.size,
                    k = i.steps;
                if (!k) return Math.ceil(h / (d * j));
                for (e = 0, f = k.length; e < f && (g = k[e], !(Math.ceil(h / (j * g)) <= d)); ++e);
                return g
            }

            function l(a, b, c, d) {
                var e, f, g, h = y.length;
                for (e = y.indexOf(a); e < h - 1; ++e)
                    if (f = x[y[e]], g = f.steps ? f.steps[f.steps.length - 1] : w, f.common && Math.ceil((c - b) / (g * f.size)) <= d) return y[e];
                return y[h - 1]
            }

            function m(a, b, c, d) {
                var e, f, g = s.duration(s(d).diff(s(c))),
                    h = y.length;
                for (e = h - 1; e >= y.indexOf(b); e--)
                    if (f = y[e], x[f].common && g.as(f) >= a.length) return f;
                return y[b ? y.indexOf(b) : 0]
            }

            function n(a) {
                for (var b = y.indexOf(a) + 1, c = y.length; b < c; ++b)
                    if (x[y[b]].common) return y[b]
            }

            function o(a, b, c, d) {
                var e, f = d.time,
                    g = f.unit || l(f.minUnit, a, b, c),
                    h = n(g),
                    i = u.valueOrDefault(f.stepSize, f.unitStepSize),
                    j = "week" === g && f.isoWeekday,
                    m = d.ticks.major.enabled,
                    o = x[g],
                    p = s(a),
                    q = s(b),
                    r = [];
                for (i || (i = k(a, b, g, c)), j && (p = p.isoWeekday(j), q = q.isoWeekday(j)), p = p.startOf(j ? "day" : g), q = q.startOf(j ? "day" : g), q < b && q.add(1, g), e = s(p), m && h && !j && !f.round && (e.startOf(h), e.add(~~((p - e) / (o.size * i)) * i, g)); e < q; e.add(i, g)) r.push(+e);
                return r.push(+e), r
            }

            function p(a, b, c, d, e) {
                var f, g, i = 0,
                    j = 0;
                return e.offset && b.length && (e.time.min || (f = b.length > 1 ? b[1] : d, g = b[0], i = (h(a, "time", f, "pos") - h(a, "time", g, "pos")) / 2), e.time.max || (f = b[b.length - 1], g = b.length > 1 ? b[b.length - 2] : c, j = (h(a, "time", f, "pos") - h(a, "time", g, "pos")) / 2)), {
                    left: i,
                    right: j
                }
            }

            function q(a, b) {
                var c, d, e, f, g = [];
                for (c = 0, d = a.length; c < d; ++c) e = a[c], f = !!b && e === +s(e).startOf(b), g.push({
                    value: e,
                    major: f
                });
                return g
            }

            function r(a, b) {
                var c, d, e, f = a.length;
                for (c = 0; c < f; c++) {
                    if (d = i(a[c], b), 0 !== d.millisecond()) return "MMM D, YYYY h:mm:ss.SSS a";
                    0 === d.second() && 0 === d.minute() && 0 === d.hour() || (e = !0)
                }
                return e ? "MMM D, YYYY h:mm:ss a" : "MMM D, YYYY"
            }
            var s = a(6);
            s = "function" == typeof s ? s : window.moment;
            var t = a(25),
                u = a(45),
                v = Number.MIN_SAFE_INTEGER || -9007199254740991,
                w = Number.MAX_SAFE_INTEGER || 9007199254740991,
                x = {
                    millisecond: {
                        common: !0,
                        size: 1,
                        steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
                    },
                    second: {
                        common: !0,
                        size: 1e3,
                        steps: [1, 2, 5, 10, 30]
                    },
                    minute: {
                        common: !0,
                        size: 6e4,
                        steps: [1, 2, 5, 10, 30]
                    },
                    hour: {
                        common: !0,
                        size: 36e5,
                        steps: [1, 2, 3, 6, 12]
                    },
                    day: {
                        common: !0,
                        size: 864e5,
                        steps: [1, 2, 5]
                    },
                    week: {
                        common: !1,
                        size: 6048e5,
                        steps: [1, 2, 3, 4]
                    },
                    month: {
                        common: !0,
                        size: 2628e6,
                        steps: [1, 2, 3]
                    },
                    quarter: {
                        common: !1,
                        size: 7884e6,
                        steps: [1, 2, 3, 4]
                    },
                    year: {
                        common: !0,
                        size: 3154e7
                    }
                },
                y = Object.keys(x);
            b.exports = function (a) {
                var b = {
                        position: "bottom",
                        distribution: "linear",
                        bounds: "data",
                        time: {
                            parser: !1,
                            format: !1,
                            unit: !1,
                            round: !1,
                            displayFormat: !1,
                            isoWeekday: !1,
                            minUnit: "millisecond",
                            displayFormats: {
                                millisecond: "h:mm:ss.SSS a",
                                second: "h:mm:ss a",
                                minute: "h:mm a",
                                hour: "hA",
                                day: "MMM D",
                                week: "ll",
                                month: "MMM YYYY",
                                quarter: "[Q]Q - YYYY",
                                year: "YYYY"
                            }
                        },
                        ticks: {
                            autoSkip: !1,
                            source: "auto",
                            major: {
                                enabled: !1
                            }
                        }
                    },
                    c = a.Scale.extend({
                        initialize: function () {
                            if (!s) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                            this.mergeTicksOptions(), a.Scale.prototype.initialize.call(this)
                        },
                        update: function () {
                            var b = this,
                                c = b.options;
                            return c.time && c.time.format && console.warn("options.time.format is deprecated and replaced by options.time.parser."), a.Scale.prototype.update.apply(b, arguments)
                        },
                        getRightValue: function (b) {
                            return b && void 0 !== b.t && (b = b.t), a.Scale.prototype.getRightValue.call(this, b)
                        },
                        determineDataLimits: function () {
                            var a, b, c, f, g, h, i = this,
                                k = i.chart,
                                l = i.options.time,
                                m = l.unit || "day",
                                n = w,
                                o = v,
                                p = [],
                                q = [],
                                r = [];
                            for (a = 0, c = k.data.labels.length; a < c; ++a) r.push(j(k.data.labels[a], i));
                            for (a = 0, c = (k.data.datasets || []).length; a < c; ++a)
                                if (k.isDatasetVisible(a))
                                    if (g = k.data.datasets[a].data, u.isObject(g[0]))
                                        for (q[a] = [], b = 0, f = g.length; b < f; ++b) h = j(g[b], i), p.push(h), q[a][b] = h;
                                    else p.push.apply(p, r), q[a] = r.slice(0);
                            else q[a] = [];
                            r.length && (r = e(r).sort(d), n = Math.min(n, r[0]), o = Math.max(o, r[r.length - 1])), p.length && (p = e(p).sort(d), n = Math.min(n, p[0]), o = Math.max(o, p[p.length - 1])), n = j(l.min, i) || n, o = j(l.max, i) || o, n = n === w ? +s().startOf(m) : n, o = o === v ? +s().endOf(m) + 1 : o, i.min = Math.min(n, o), i.max = Math.max(n + 1, o), i._horizontal = i.isHorizontal(), i._table = [], i._timestamps = {
                                data: p,
                                datasets: q,
                                labels: r
                            }
                        },
                        buildTicks: function () {
                            var a, b, c, d = this,
                                e = d.min,
                                g = d.max,
                                h = d.options,
                                i = h.time,
                                k = [],
                                l = [];
                            switch (h.ticks.source) {
                                case "data":
                                    k = d._timestamps.data;
                                    break;
                                case "labels":
                                    k = d._timestamps.labels;
                                    break;
                                case "auto":
                                default:
                                    k = o(e, g, d.getLabelCapacity(e), h)
                            }
                            for ("ticks" === h.bounds && k.length && (e = k[0], g = k[k.length - 1]), e = j(i.min, d) || e, g = j(i.max, d) || g, a = 0, b = k.length; a < b; ++a)(c = k[a]) >= e && c <= g && l.push(c);
                            return d.min = e, d.max = g, d._unit = i.unit || m(l, i.minUnit, d.min, d.max), d._majorUnit = n(d._unit), d._table = f(d._timestamps.data, e, g, h.distribution), d._offsets = p(d._table, l, e, g, h), d._labelFormat = r(d._timestamps.data, i), q(l, d._majorUnit)
                        },
                        getLabelForIndex: function (a, b) {
                            var c = this,
                                d = c.chart.data,
                                e = c.options.time,
                                f = d.labels && a < d.labels.length ? d.labels[a] : "",
                                g = d.datasets[b].data[a];
                            return u.isObject(g) && (f = c.getRightValue(g)), e.tooltipFormat ? i(f, e).format(e.tooltipFormat) : "string" == typeof f ? f : i(f, e).format(c._labelFormat)
                        },
                        tickFormatFunction: function (a, b, c, d) {
                            var e = this,
                                f = e.options,
                                g = a.valueOf(),
                                h = f.time.displayFormats,
                                i = h[e._unit],
                                j = e._majorUnit,
                                k = h[j],
                                l = a.clone().startOf(j).valueOf(),
                                m = f.ticks.major,
                                n = m.enabled && j && k && g === l,
                                o = a.format(d || (n ? k : i)),
                                p = n ? m : f.ticks.minor,
                                q = u.valueOrDefault(p.callback, p.userCallback);
                            return q ? q(o, b, c) : o
                        },
                        convertTicksToLabels: function (a) {
                            var b, c, d = [];
                            for (b = 0, c = a.length; b < c; ++b) d.push(this.tickFormatFunction(s(a[b].value), b, a));
                            return d
                        },
                        getPixelForOffset: function (a) {
                            var b = this,
                                c = b._horizontal ? b.width : b.height,
                                d = b._horizontal ? b.left : b.top,
                                e = h(b._table, "time", a, "pos");
                            return d + c * (b._offsets.left + e) / (b._offsets.left + 1 + b._offsets.right)
                        },
                        getPixelForValue: function (a, b, c) {
                            var d = this,
                                e = null;
                            if (void 0 !== b && void 0 !== c && (e = d._timestamps.datasets[c][b]), null === e && (e = j(a, d)), null !== e) return d.getPixelForOffset(e)
                        },
                        getPixelForTick: function (a) {
                            var b = this.getTicks();
                            return a >= 0 && a < b.length ? this.getPixelForOffset(b[a].value) : null
                        },
                        getValueForPixel: function (a) {
                            var b = this,
                                c = b._horizontal ? b.width : b.height,
                                d = b._horizontal ? b.left : b.top,
                                e = (c ? (a - d) / c : 0) * (b._offsets.left + 1 + b._offsets.left) - b._offsets.right,
                                f = h(b._table, "pos", e, "time");
                            return s(f)
                        },
                        getLabelWidth: function (a) {
                            var b = this,
                                c = b.options.ticks,
                                d = b.ctx.measureText(a).width,
                                e = u.toRadians(c.maxRotation),
                                f = Math.cos(e),
                                g = Math.sin(e);
                            return d * f + u.valueOrDefault(c.fontSize, t.global.defaultFontSize) * g
                        },
                        getLabelCapacity: function (a) {
                            var b = this,
                                c = b.options.time.displayFormats.millisecond,
                                d = b.tickFormatFunction(s(a), 0, [], c),
                                e = b.getLabelWidth(d),
                                f = b.isHorizontal() ? b.width : b.height,
                                g = Math.floor(f / e);
                            return g > 0 ? g : 1
                        }
                    });
                a.scaleService.registerScaleType("time", c, b)
            }
        }, {
            25: 25,
            45: 45,
            6: 6
        }]
    }, {}, [7])(7)
});