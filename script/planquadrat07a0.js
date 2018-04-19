/*! planquadrat - v1.0.0
 * http://www.planquadrat.de
 * Copyright (c) 2017 FORWARD MEDIA <kontakt@4wdmedia.de> */

! function a(b, c, d) {
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
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function() {
        ! function(a) {
            "use strict";
            var b = a.fn.cycle;
            a.fn.cycle = function(c) {
                var d, e, f, g = a.makeArray(arguments);
                return "number" == a.type(c) ? this.cycle("goto", c) : "string" == a.type(c) ? this.each(function() {
                    var h;
                    return d = c, f = a(this).data("cycle.opts"), void 0 === f ? void b.log('slideshow must be initialized before sending commands; "' + d + '" ignored') : (d = "goto" == d ? "jump" : d, e = f.API[d], a.isFunction(e) ? (h = a.makeArray(g), h.shift(), e.apply(f.API, h)) : void b.log("unknown command: ", d))
                }) : b.apply(this, arguments)
            }, a.extend(a.fn.cycle, b), a.extend(b.API, {
                next: function() {
                    var a = this.opts();
                    if (!a.busy || a.manualTrump) {
                        var b = a.reverse ? -1 : 1;
                        a.allowWrap === !1 && a.currSlide + b >= a.slideCount || (a.API.advanceSlide(b), a.API.trigger("cycle-next", [a]).log("cycle-next"))
                    }
                },
                prev: function() {
                    var a = this.opts();
                    if (!a.busy || a.manualTrump) {
                        var b = a.reverse ? 1 : -1;
                        a.allowWrap === !1 && a.currSlide + b < 0 || (a.API.advanceSlide(b), a.API.trigger("cycle-prev", [a]).log("cycle-prev"))
                    }
                },
                destroy: function() {
                    this.stop();
                    var b = this.opts(),
                        c = a.isFunction(a._data) ? a._data : a.noop;
                    clearTimeout(b.timeoutId), b.timeoutId = 0, b.API.stop(), b.API.trigger("cycle-destroyed", [b]).log("cycle-destroyed"), b.container.removeData(), c(b.container[0], "parsedAttrs", !1), b.retainStylesOnDestroy || (b.container.removeAttr("style"), b.slides.removeAttr("style"), b.slides.removeClass(b.slideActiveClass)), b.slides.each(function() {
                        a(this).removeData(), c(this, "parsedAttrs", !1)
                    })
                },
                jump: function(a, b) {
                    var c, d = this.opts();
                    if (!d.busy || d.manualTrump) {
                        var e = parseInt(a, 10);
                        if (isNaN(e) || 0 > e || e >= d.slides.length) return void d.API.log("goto: invalid slide index: " + e);
                        if (e == d.currSlide) return void d.API.log("goto: skipping, already on slide", e);
                        d.nextSlide = e, clearTimeout(d.timeoutId), d.timeoutId = 0, d.API.log("goto: ", e, " (zero-index)"), c = d.currSlide < d.nextSlide, d._tempFx = b, d.API.prepareTx(!0, c)
                    }
                },
                stop: function() {
                    var b = this.opts(),
                        c = b.container;
                    clearTimeout(b.timeoutId), b.timeoutId = 0, b.API.stopTransition(), b.pauseOnHover && (b.pauseOnHover !== !0 && (c = a(b.pauseOnHover)), c.off("mouseenter mouseleave")), b.API.trigger("cycle-stopped", [b]).log("cycle-stopped")
                },
                reinit: function() {
                    var a = this.opts();
                    a.API.destroy(), a.container.cycle()
                },
                remove: function(b) {
                    for (var c, d, e = this.opts(), f = [], g = 1, h = 0; h < e.slides.length; h++) c = e.slides[h], h == b ? d = c : (f.push(c), a(c).data("cycle.opts").slideNum = g, g++);
                    d && (e.slides = a(f), e.slideCount--, a(d).remove(), b == e.currSlide ? e.API.advanceSlide(1) : b < e.currSlide ? e.currSlide-- : e.currSlide++, e.API.trigger("cycle-slide-removed", [e, b, d]).log("cycle-slide-removed"), e.API.updateView())
                }
            }), a(document).on("click.cycle", "[data-cycle-cmd]", function(b) {
                b.preventDefault();
                var c = a(this),
                    d = c.data("cycle-cmd"),
                    e = c.data("cycle-context") || ".cycle-slideshow";
                a(e).cycle(d, c.data("cycle-arg"))
            })
        }(jQuery)
    }, {}],
    2: [function() {
        ! function(a) {
            "use strict";

            function b(a) {
                return (a || "").toLowerCase()
            }
            var c = "2.1.5";
            a.fn.cycle = function(c) {
                var d;
                return 0 !== this.length || a.isReady ? this.each(function() {
                    var d, e, f, g, h = a(this),
                        i = a.fn.cycle.log;
                    if (!h.data("cycle.opts")) {
                        (h.data("cycle-log") === !1 || c && c.log === !1 || e && e.log === !1) && (i = a.noop), i("--c2 init--"), d = h.data();
                        for (var j in d) d.hasOwnProperty(j) && /^cycle[A-Z]+/.test(j) && (g = d[j], f = j.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, b), i(f + ":", g, "(" + typeof g + ")"), d[f] = g);
                        e = a.extend({}, a.fn.cycle.defaults, d, c || {}), e.timeoutId = 0, e.paused = e.paused || !1, e.container = h, e._maxZ = e.maxZ, e.API = a.extend({
                            _container: h
                        }, a.fn.cycle.API), e.API.log = i, e.API.trigger = function(a, b) {
                            return e.container.trigger(a, b), e.API
                        }, h.data("cycle.opts", e), h.data("cycle.API", e.API), e.API.trigger("cycle-bootstrap", [e, e.API]), e.API.addInitialSlides(), e.API.preInitSlideshow(), e.slides.length && e.API.initSlideshow()
                    }
                }) : (d = {
                    s: this.selector,
                    c: this.context
                }, a.fn.cycle.log("requeuing slideshow (dom not ready)"), a(function() {
                    a(d.s, d.c).cycle(c)
                }), this)
            }, a.fn.cycle.API = {
                opts: function() {
                    return this._container.data("cycle.opts")
                },
                addInitialSlides: function() {
                    var b = this.opts(),
                        c = b.slides;
                    b.slideCount = 0, b.slides = a(), c = c.jquery ? c : b.container.find(c), b.random && c.sort(function() {
                        return Math.random() - .5
                    }), b.API.add(c)
                },
                preInitSlideshow: function() {
                    var b = this.opts();
                    b.API.trigger("cycle-pre-initialize", [b]);
                    var c = a.fn.cycle.transitions[b.fx];
                    c && a.isFunction(c.preInit) && c.preInit(b), b._preInitialized = !0
                },
                postInitSlideshow: function() {
                    var b = this.opts();
                    b.API.trigger("cycle-post-initialize", [b]);
                    var c = a.fn.cycle.transitions[b.fx];
                    c && a.isFunction(c.postInit) && c.postInit(b)
                },
                initSlideshow: function() {
                    var b, c = this.opts(),
                        d = c.container;
                    c.API.calcFirstSlide(), "static" == c.container.css("position") && c.container.css("position", "relative"), a(c.slides[c.currSlide]).css({
                        opacity: 1,
                        display: "block",
                        visibility: "visible"
                    }), c.API.stackSlides(c.slides[c.currSlide], c.slides[c.nextSlide], !c.reverse), c.pauseOnHover && (c.pauseOnHover !== !0 && (d = a(c.pauseOnHover)), d.hover(function() {
                        c.API.pause(!0)
                    }, function() {
                        c.API.resume(!0)
                    })), c.timeout && (b = c.API.getSlideOpts(c.currSlide), c.API.queueTransition(b, b.timeout + c.delay)), c._initialized = !0, c.API.updateView(!0), c.API.trigger("cycle-initialized", [c]), c.API.postInitSlideshow()
                },
                pause: function(b) {
                    var c = this.opts(),
                        d = c.API.getSlideOpts(),
                        e = c.hoverPaused || c.paused;
                    b ? c.hoverPaused = !0 : c.paused = !0, e || (c.container.addClass("cycle-paused"), c.API.trigger("cycle-paused", [c]).log("cycle-paused"), d.timeout && (clearTimeout(c.timeoutId), c.timeoutId = 0, c._remainingTimeout -= a.now() - c._lastQueue, (c._remainingTimeout < 0 || isNaN(c._remainingTimeout)) && (c._remainingTimeout = void 0)))
                },
                resume: function(a) {
                    var b = this.opts(),
                        c = !b.hoverPaused && !b.paused;
                    a ? b.hoverPaused = !1 : b.paused = !1, c || (b.container.removeClass("cycle-paused"), 0 === b.slides.filter(":animated").length && b.API.queueTransition(b.API.getSlideOpts(), b._remainingTimeout), b.API.trigger("cycle-resumed", [b, b._remainingTimeout]).log("cycle-resumed"))
                },
                add: function(b, c) {
                    var d, e = this.opts(),
                        f = e.slideCount,
                        g = !1;
                    "string" == a.type(b) && (b = a.trim(b)), a(b).each(function() {
                        var b, d = a(this);
                        c ? e.container.prepend(d) : e.container.append(d), e.slideCount++, b = e.API.buildSlideOpts(d), e.slides = c ? a(d).add(e.slides) : e.slides.add(d), e.API.initSlide(b, d, --e._maxZ), d.data("cycle.opts", b), e.API.trigger("cycle-slide-added", [e, b, d])
                    }), e.API.updateView(!0), g = e._preInitialized && 2 > f && e.slideCount >= 1, g && (e._initialized ? e.timeout && (d = e.slides.length, e.nextSlide = e.reverse ? d - 1 : 1, e.timeoutId || e.API.queueTransition(e)) : e.API.initSlideshow())
                },
                calcFirstSlide: function() {
                    var a, b = this.opts();
                    a = parseInt(b.startingSlide || 0, 10), (a >= b.slides.length || 0 > a) && (a = 0), b.currSlide = a, b.reverse ? (b.nextSlide = a - 1, b.nextSlide < 0 && (b.nextSlide = b.slides.length - 1)) : (b.nextSlide = a + 1, b.nextSlide == b.slides.length && (b.nextSlide = 0))
                },
                calcNextSlide: function() {
                    var a, b = this.opts();
                    b.reverse ? (a = b.nextSlide - 1 < 0, b.nextSlide = a ? b.slideCount - 1 : b.nextSlide - 1, b.currSlide = a ? 0 : b.nextSlide + 1) : (a = b.nextSlide + 1 == b.slides.length, b.nextSlide = a ? 0 : b.nextSlide + 1, b.currSlide = a ? b.slides.length - 1 : b.nextSlide - 1)
                },
                calcTx: function(b, c) {
                    var d, e = b;
                    return e._tempFx ? d = a.fn.cycle.transitions[e._tempFx] : c && e.manualFx && (d = a.fn.cycle.transitions[e.manualFx]), d || (d = a.fn.cycle.transitions[e.fx]), e._tempFx = null, this.opts()._tempFx = null, d || (d = a.fn.cycle.transitions.fade, e.API.log('Transition "' + e.fx + '" not found.  Using fade.')), d
                },
                prepareTx: function(a, b) {
                    var c, d, e, f, g, h = this.opts();
                    return h.slideCount < 2 ? void(h.timeoutId = 0) : (!a || h.busy && !h.manualTrump || (h.API.stopTransition(), h.busy = !1, clearTimeout(h.timeoutId), h.timeoutId = 0), void(h.busy || (0 !== h.timeoutId || a) && (d = h.slides[h.currSlide], e = h.slides[h.nextSlide], f = h.API.getSlideOpts(h.nextSlide), g = h.API.calcTx(f, a), h._tx = g, a && void 0 !== f.manualSpeed && (f.speed = f.manualSpeed), h.nextSlide != h.currSlide && (a || !h.paused && !h.hoverPaused && h.timeout) ? (h.API.trigger("cycle-before", [f, d, e, b]), g.before && g.before(f, d, e, b), c = function() {
                        h.busy = !1, h.container.data("cycle.opts") && (g.after && g.after(f, d, e, b), h.API.trigger("cycle-after", [f, d, e, b]), h.API.queueTransition(f), h.API.updateView(!0))
                    }, h.busy = !0, g.transition ? g.transition(f, d, e, b, c) : h.API.doTransition(f, d, e, b, c), h.API.calcNextSlide(), h.API.updateView()) : h.API.queueTransition(f))))
                },
                doTransition: function(b, c, d, e, f) {
                    var g = b,
                        h = a(c),
                        i = a(d),
                        j = function() {
                            i.animate(g.animIn || {
                                opacity: 1
                            }, g.speed, g.easeIn || g.easing, f)
                        };
                    i.css(g.cssBefore || {}), h.animate(g.animOut || {}, g.speed, g.easeOut || g.easing, function() {
                        h.css(g.cssAfter || {}), g.sync || j()
                    }), g.sync && j()
                },
                queueTransition: function(b, c) {
                    var d = this.opts(),
                        e = void 0 !== c ? c : b.timeout;
                    return 0 === d.nextSlide && 0 === --d.loop ? (d.API.log("terminating; loop=0"), d.timeout = 0, e ? setTimeout(function() {
                        d.API.trigger("cycle-finished", [d])
                    }, e) : d.API.trigger("cycle-finished", [d]), void(d.nextSlide = d.currSlide)) : void 0 !== d.continueAuto && (d.continueAuto === !1 || a.isFunction(d.continueAuto) && d.continueAuto() === !1) ? (d.API.log("terminating automatic transitions"), d.timeout = 0, void(d.timeoutId && clearTimeout(d.timeoutId))) : void(e && (d._lastQueue = a.now(), void 0 === c && (d._remainingTimeout = b.timeout), d.paused || d.hoverPaused || (d.timeoutId = setTimeout(function() {
                        d.API.prepareTx(!1, !d.reverse)
                    }, e))))
                },
                stopTransition: function() {
                    var a = this.opts();
                    a.slides.filter(":animated").length && (a.slides.stop(!1, !0), a.API.trigger("cycle-transition-stopped", [a])), a._tx && a._tx.stopTransition && a._tx.stopTransition(a)
                },
                advanceSlide: function(a) {
                    var b = this.opts();
                    return clearTimeout(b.timeoutId), b.timeoutId = 0, b.nextSlide = b.currSlide + a, b.nextSlide < 0 ? b.nextSlide = b.slides.length - 1 : b.nextSlide >= b.slides.length && (b.nextSlide = 0), b.API.prepareTx(!0, a >= 0), !1
                },
                buildSlideOpts: function(c) {
                    var d, e, f = this.opts(),
                        g = c.data() || {};
                    for (var h in g) g.hasOwnProperty(h) && /^cycle[A-Z]+/.test(h) && (d = g[h], e = h.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, b), f.API.log("[" + (f.slideCount - 1) + "]", e + ":", d, "(" + typeof d + ")"), g[e] = d);
                    g = a.extend({}, a.fn.cycle.defaults, f, g), g.slideNum = f.slideCount;
                    try {
                        delete g.API, delete g.slideCount, delete g.currSlide, delete g.nextSlide, delete g.slides
                    } catch (i) {}
                    return g
                },
                getSlideOpts: function(b) {
                    var c = this.opts();
                    void 0 === b && (b = c.currSlide);
                    var d = c.slides[b],
                        e = a(d).data("cycle.opts");
                    return a.extend({}, c, e)
                },
                initSlide: function(b, c, d) {
                    var e = this.opts();
                    c.css(b.slideCss || {}), d > 0 && c.css("zIndex", d), isNaN(b.speed) && (b.speed = a.fx.speeds[b.speed] || a.fx.speeds._default), b.sync || (b.speed = b.speed / 2), c.addClass(e.slideClass)
                },
                updateView: function(a, b) {
                    var c = this.opts();
                    if (c._initialized) {
                        var d = c.API.getSlideOpts(),
                            e = c.slides[c.currSlide];
                        !a && b !== !0 && (c.API.trigger("cycle-update-view-before", [c, d, e]), c.updateView < 0) || (c.slideActiveClass && c.slides.removeClass(c.slideActiveClass).eq(c.currSlide).addClass(c.slideActiveClass), a && c.hideNonActive && c.slides.filter(":not(." + c.slideActiveClass + ")").css("visibility", "hidden"), 0 === c.updateView && setTimeout(function() {
                            c.API.trigger("cycle-update-view", [c, d, e, a])
                        }, d.speed / (c.sync ? 2 : 1)), 0 !== c.updateView && c.API.trigger("cycle-update-view", [c, d, e, a]), a && c.API.trigger("cycle-update-view-after", [c, d, e]))
                    }
                },
                getComponent: function(b) {
                    var c = this.opts(),
                        d = c[b];
                    return "string" == typeof d ? /^\s*[\>|\+|~]/.test(d) ? c.container.find(d) : a(d) : d.jquery ? d : a(d)
                },
                stackSlides: function(b, c, d) {
                    var e = this.opts();
                    b || (b = e.slides[e.currSlide], c = e.slides[e.nextSlide], d = !e.reverse), a(b).css("zIndex", e.maxZ);
                    var f, g = e.maxZ - 2,
                        h = e.slideCount;
                    if (d) {
                        for (f = e.currSlide + 1; h > f; f++) a(e.slides[f]).css("zIndex", g--);
                        for (f = 0; f < e.currSlide; f++) a(e.slides[f]).css("zIndex", g--)
                    } else {
                        for (f = e.currSlide - 1; f >= 0; f--) a(e.slides[f]).css("zIndex", g--);
                        for (f = h - 1; f > e.currSlide; f--) a(e.slides[f]).css("zIndex", g--)
                    }
                    a(c).css("zIndex", e.maxZ - 1)
                },
                getSlideIndex: function(a) {
                    return this.opts().slides.index(a)
                }
            }, a.fn.cycle.log = function() {
                window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "))
            }, a.fn.cycle.version = function() {
                return "Cycle2: " + c
            }, a.fn.cycle.transitions = {
                custom: {},
                none: {
                    before: function(a, b, c, d) {
                        a.API.stackSlides(c, b, d), a.cssBefore = {
                            opacity: 1,
                            visibility: "visible",
                            display: "block"
                        }
                    }
                },
                fade: {
                    before: function(b, c, d, e) {
                        var f = b.API.getSlideOpts(b.nextSlide).slideCss || {};
                        b.API.stackSlides(c, d, e), b.cssBefore = a.extend(f, {
                            opacity: 0,
                            visibility: "visible",
                            display: "block"
                        }), b.animIn = {
                            opacity: 1
                        }, b.animOut = {
                            opacity: 0
                        }
                    }
                },
                fadeout: {
                    before: function(b, c, d, e) {
                        var f = b.API.getSlideOpts(b.nextSlide).slideCss || {};
                        b.API.stackSlides(c, d, e), b.cssBefore = a.extend(f, {
                            opacity: 1,
                            visibility: "visible",
                            display: "block"
                        }), b.animOut = {
                            opacity: 0
                        }
                    }
                },
                scrollHorz: {
                    before: function(a, b, c, d) {
                        a.API.stackSlides(b, c, d);
                        var e = a.container.css("overflow", "hidden").width();
                        a.cssBefore = {
                            left: d ? e : -e,
                            top: 0,
                            opacity: 1,
                            visibility: "visible",
                            display: "block"
                        }, a.cssAfter = {
                            zIndex: a._maxZ - 2,
                            left: 0
                        }, a.animIn = {
                            left: 0
                        }, a.animOut = {
                            left: d ? -e : e
                        }
                    }
                }
            }, a.fn.cycle.defaults = {
                allowWrap: !0,
                autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]",
                delay: 0,
                easing: null,
                fx: "fade",
                hideNonActive: !0,
                loop: 0,
                manualFx: void 0,
                manualSpeed: void 0,
                manualTrump: !0,
                maxZ: 100,
                pauseOnHover: !1,
                reverse: !1,
                slideActiveClass: "cycle-slide-active",
                slideClass: "cycle-slide",
                slideCss: {
                    position: "absolute",
                    top: 0,
                    left: 0
                },
                slides: "> img",
                speed: 500,
                startingSlide: 0,
                sync: !0,
                timeout: 4e3,
                updateView: 0
            }, a(document).ready(function() {
                a(a.fn.cycle.defaults.autoSelector).cycle()
            })
        }(jQuery)
    }, {}],
    3: [function() {
        ! function(a) {
            "use strict";
            a.extend(a.fn.cycle.defaults, {
                next: "> .cycle-next",
                nextEvent: "click.cycle",
                disabledClass: "disabled",
                prev: "> .cycle-prev",
                prevEvent: "click.cycle",
                swipe: !1
            }), a(document).on("cycle-initialized", function(a, b) {
                if (b.API.getComponent("next").on(b.nextEvent, function(a) {
                        a.preventDefault(), b.API.next()
                    }), b.API.getComponent("prev").on(b.prevEvent, function(a) {
                        a.preventDefault(), b.API.prev()
                    }), b.swipe) {
                    var c = b.swipeVert ? "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle",
                        d = b.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle";
                    b.container.on(c, function() {
                        b._tempFx = b.swipeFx, b.API.next()
                    }), b.container.on(d, function() {
                        b._tempFx = b.swipeFx, b.API.prev()
                    })
                }
            }), a(document).on("cycle-update-view", function(a, b) {
                if (!b.allowWrap) {
                    var c = b.disabledClass,
                        d = b.API.getComponent("next"),
                        e = b.API.getComponent("prev"),
                        f = b._prevBoundry || 0,
                        g = void 0 !== b._nextBoundry ? b._nextBoundry : b.slideCount - 1;
                    b.currSlide == g ? d.addClass(c).prop("disabled", !0) : d.removeClass(c).prop("disabled", !1), b.currSlide === f ? e.addClass(c).prop("disabled", !0) : e.removeClass(c).prop("disabled", !1)
                }
            }), a(document).on("cycle-destroyed", function(a, b) {
                b.API.getComponent("prev").off(b.nextEvent), b.API.getComponent("next").off(b.prevEvent), b.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")
            })
        }(jQuery)
    }, {}],
    4: [function() {
        ! function(a) {
            "use strict";
            "ontouchend" in document;
            a.event.special.swipe = a.event.special.swipe || {
                scrollSupressionThreshold: 10,
                durationThreshold: 1e3,
                horizontalDistanceThreshold: 30,
                verticalDistanceThreshold: 75,
                setup: function() {
                    var b = a(this);
                    b.bind("touchstart", function(c) {
                        function d(b) {
                            if (g) {
                                var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b;
                                e = {
                                    time: (new Date).getTime(),
                                    coords: [c.pageX, c.pageY]
                                }, Math.abs(g.coords[0] - e.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && b.preventDefault()
                            }
                        }
                        var e, f = c.originalEvent.touches ? c.originalEvent.touches[0] : c,
                            g = {
                                time: (new Date).getTime(),
                                coords: [f.pageX, f.pageY],
                                origin: a(c.target)
                            };
                        b.bind("touchmove", d).one("touchend", function() {
                            b.unbind("touchmove", d), g && e && e.time - g.time < a.event.special.swipe.durationThreshold && Math.abs(g.coords[0] - e.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(g.coords[1] - e.coords[1]) < a.event.special.swipe.verticalDistanceThreshold && g.origin.trigger("swipe").trigger(g.coords[0] > e.coords[0] ? "swipeleft" : "swiperight"), g = e = void 0
                        })
                    })
                }
            }, a.event.special.swipeleft = a.event.special.swipeleft || {
                setup: function() {
                    a(this).bind("swipe", a.noop)
                }
            }, a.event.special.swiperight = a.event.special.swiperight || a.event.special.swipeleft
        }(jQuery)
    }, {}],
    5: [function() {
        ! function(a) {
            "use strict";
            a.extend(a.fn.cycle.defaults, {
                tmplRegex: "{{((.)?.*?)}}"
            }), a.extend(a.fn.cycle.API, {
                tmpl: function(b, c) {
                    var d = new RegExp(c.tmplRegex || a.fn.cycle.defaults.tmplRegex, "g"),
                        e = a.makeArray(arguments);
                    return e.shift(), b.replace(d, function(b, c) {
                        var d, f, g, h, i = c.split(".");
                        for (d = 0; d < e.length; d++)
                            if (g = e[d]) {
                                if (i.length > 1)
                                    for (h = g, f = 0; f < i.length; f++) g = h, h = h[i[f]] || c;
                                else h = g[c];
                                if (a.isFunction(h)) return h.apply(g, e);
                                if (void 0 !== h && null !== h && h != c) return h
                            }
                        return c
                    })
                }
            })
        }(jQuery)
    }, {}],
    6: [function(a) {
        a("../cycle2/jquery.cycle2.core"), a("../cycle2/jquery.cycle2.command"), a("../cycle2/jquery.cycle2.prevnext"), a("../cycle2/jquery.cycle2.tmpl"), a("../cycle2/jquery.cycle2.swipe")
    }, {
        "../cycle2/jquery.cycle2.command": 1,
        "../cycle2/jquery.cycle2.core": 2,
        "../cycle2/jquery.cycle2.prevnext": 3,
        "../cycle2/jquery.cycle2.swipe": 4,
        "../cycle2/jquery.cycle2.tmpl": 5
    }],
    7: [function() {
        var a, b;
        "undefined" != typeof document.hidden ? (a = "hidden", b = "visibilitychange") : "undefined" != typeof document.mozHidden ? (a = "mozHidden", b = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (a = "msHidden", b = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (a = "webkitHidden", b = "webkitvisibilitychange"), b && $(document).on(b, function() {
            $(document).trigger("page:visibilitychange", [document[a]])
        })
    }, {}],
    8: [function() {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
            var c = (new Date).getTime(),
                d = Math.max(0, 16 - (c - a)),
                e = window.setTimeout(function() {
                    b(c + d)
                }, d);
            return a = c + d, e
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        })
    }, {}],
    9: [function() {
        $(document).on("click", "a[href*=#]", function(a) {
            if ((this.pathname === location.pathname || "/" + this.pathname === location.pathname) && this.search === location.search) {
                var b = this.hash.substr(1);
                if (!b) return;
                var c = $("#" + b);
                if (c.length || (c = $("*[name=" + b + "]")), !c.length) return;
                var d = c.offset().top;
                $("<p>").prop("foo", $(window).scrollTop()).animate({
                    foo: d
                }, {
                    step: function(a) {
                        $(window).scrollTop(a)
                    }
                }), a.preventDefault(), a.stopPropagation()
            }
        })
    }, {}],
    10: [function(a, b) {
        b.exports = function(a) {
            return a = a.toLowerCase().replace(/\(|\)/g, "").split(/[ \n\t\-\.:,!\?\+]+/), a = $.map(a, function(a) {
                return $.trim(a)
            }), a = $.grep(a, function(a) {
                return !!a
            }), a.sort(), a
        }
    }, {}],
    11: [function() {
        function a() {
            var a = b.outerHeight(),
                f = c.height() - d.outerHeight() - e.outerHeight();
            return f >= a
        }
        var b = $(".history--block__text"),
            c = $(window),
            d = $(".main-header"),
            e = $(".main-footer");
        if (b.length) {
            b.toggleClass("history--block__fixed", a());
            var f;
            c.on("resize.history", function() {
                clearTimeout(f), setTimeout(function() {
                    b.toggleClass("history--block__fixed", a())
                }, 50)
            })
        }
    }, {}],
    12: [function() {
        var a;
        $(document).ready(function() {
            function b(a, b, c) {
                var d = "";
                c && (d = "; expires=" + c.toGMTString()), document.cookie = a + "=" + b + d + "; path=/"
            }

            function c(a) {
                for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                    for (var e = c[d];
                        " " === e.charAt(0);) e = e.substring(1, e.length);
                    if (0 === e.indexOf(b)) return e.substring(b.length, e.length)
                }
                return null
            }
            if (!c("intro") || "#showIntro" === location.hash) {
                $(".intro").addClass("intro--show"), $(".intro").on("click", function() {
                    $(this).removeClass("intro--show")
                });
                var d = new Date;
                d.setTime(d.getTime() + 288e5), b("intro", "1", d), clearTimeout(a), a = setTimeout(function() {
                    $(".intro").removeClass("intro--show")
                }, 7e3)
            }
        }), $(document).on("click", ".logo", function() {
            this.pathname === location.pathname && ($(".intro").addClass("intro--show"), clearTimeout(a), a = setTimeout(function() {
                $(".intro").removeClass("intro--show")
            }, 7e3))
        })
    }, {}],
    13: [function() {
        $.getScriptOnce = function() {
            var a = {};
            return function(b, c) {
                return a[b] || (a[b] = $.ajax({
                    url: b,
                    dataType: "script",
                    cache: !0
                })), $.isFunction(c) && a[b].then(c), a[b]
            }
        }()
    }, {}],
    14: [function() {
        $(document).on("click", ".navigation--toggle", function(a) {
            a.preventDefault(), $(document.documentElement).toggleClass("navigation__visible")
        }), $(document).on("click", ".navigation--close", function(a) {
            a.preventDefault(), $(document.documentElement).removeClass("navigation__visible")
        }), $(document).on("click", ".navigation--filter-toggle", function(a) {
            var b = this.hash.substr(1);
            if (b) {
                var c = $("#" + b);
                c.length || (c = $("*[name=" + b + "]")), c.length && (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), $(this).hasClass("navigation--filter-toggle__open") || ($(".navigation--filter__open").removeClass("navigation--filter__open"), $(".navigation--filter-toggle__open").removeClass("navigation--filter-toggle__open")), c.closest(".navigation--filter").toggleClass("navigation--filter__open"), $(this).toggleClass("navigation--filter-toggle__open"))
            }
        }), $(document).on("click", function(a) {
            $(a.target).closest(".main-header").length || $(".navigation--filter-toggle__open").length && (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), $(".navigation--filter-toggle__open:first").click())
        });
        var a, b = $(window).scrollTop(),
            c = $(".main-header");
        $(document).on("scroll", {
            passive: !0
        }, function() {
            if (Modernizr.mq("(max-width: 767px)")) {
                var d = $(window).scrollTop();
                clearTimeout(a), setTimeout(function() {
                    b = d
                }, 100), b - 30 > d ? (c.removeClass("main-header--hidden"), b = d) : d > b + 30 && (c.addClass("main-header--hidden"), b = d)
            }
        })
    }, {}],
    15: [function() {
        $(document).on("click", ".news-slideshow--header", function(a) {
            var b = $(this).next(".news-slideshow--content");
            b.length && (a.preventDefault(), b.css("max-height", b.prop("scrollHeight")), b.height(), $(this).closest(".news-slideshow--slide").toggleClass("news-slideshow--slide__toggle"))
        }), $(document).on("click", ".news--header", function(a) {
            var b = $(this).closest(".news--block"),
                c = b.find(".news--content");
            c.length && (a.preventDefault(), c.css("max-height", c.prop("scrollHeight")), c.height(), b.toggleClass("news--block__open"))
        }), $(document).ready(function() {
            if ("#news-" === location.hash.substr(0, 6)) {
                var a = $("#news-" + parseInt(location.hash.substr(6), 10));
                if (!a.length) return;
                a.addClass("news--block__open");
                var b = a.offset().top - $(".navigation").height();
                $(window).scrollTop(b)
            }
        })
    }, {}],
    16: [function(a) {
        function b() {
            f.detach(), g.detach();
            var a = 0,
                b = 0,
                c = f.length,
                d = f.eq(a);
            $.each(h, function(h, i) {
                if ("card" === i) e.append(g.eq(b)), b++;
                else {
                    for (; d.data("hidden") && a++ < c;) d = f.eq(a);
                    e.append(d), d = f.eq(++a)
                }
                return a >= c ? !1 : void 0
            })
        }
        a("./helpers/request-animation-frame.js");
        var c = $('.main-header input[name="person-name"]');
        if (c.length) {
            var d = a("./helpers/split-search-words.js"),
                e = $(".persons"),
                f = $(".persons--person");
            f.each(function(a, b) {
                var c = d($(b).text());
                $(b).data("search-words", c)
            });
            var g = $(".card, .persons--person__placeholder"),
                h = $.map(e.children(), function(a) {
                    return $(a).hasClass("persons--person") ? "person" : "card"
                }),
                i = c.val();
            c.on("change keydown keypress blur", function() {
                requestAnimationFrame(function() {
                    i !== c.val() && (i = c.val(), $(document).trigger("person-filter", i))
                })
            }), $(document).on("person-filter", function(a, c) {
                var e = d(c);
                e.length ? f.each(function(a, b) {
                    var c = $(b).data("search-words"),
                        d = !0;
                    $.each(e, function(a, b) {
                        var e = !1;
                        return $.each(c, function(a, c) {
                            return c.indexOf(b) > -1 ? (e = !0, !1) : void 0
                        }), e || (d = !1), d
                    }), $(b).data("hidden", !d)
                }) : f.data("hidden", !1), b()
            })
        }
    }, {
        "./helpers/request-animation-frame.js": 8,
        "./helpers/split-search-words.js": 10
    }],
    17: [function(a) {
        function b() {
            f.detach(), g.detach();
            var a = 0,
                b = 0,
                c = f.length,
                d = f.eq(a);
            $.each(h, function(h, i) {
                if ("card" === i) e.append(g.eq(b)), b++;
                else {
                    for (; d.data("hidden") && a++ < c;) d = f.eq(a);
                    e.append(d), d = f.eq(++a)
                }
                return a >= c ? !1 : void 0
            })
        }
        a("./helpers/request-animation-frame.js");
        var c = $('.main-header input[name="project-name"]');
        if (c.length) {
            var d = a("./helpers/split-search-words.js"),
                e = $(".projects"),
                f = $(".project-list__project");
            f.each(function(a, b) {
                var c = d($(b).text());
                $(b).data("search-words", c)
            });
            var g = $(".card"),
                h = $.map(e.children(), function(a) {
                    return $(a).hasClass("card") ? "card" : "project"
                }),
                i = c.val();
            c.on("change keydown keypress blur", function() {
                requestAnimationFrame(function() {
                    i !== c.val() && (i = c.val(), $(document).trigger("project-filter", i))
                })
            }), $(document).on("project-filter", function(a, c) {
                var e = d(c);
                e.length ? f.each(function(a, b) {
                    var c = $(b).data("search-words"),
                        d = !0;
                    $.each(e, function(a, b) {
                        var e = !1;
                        return $.each(c, function(a, c) {
                            return c.indexOf(b) > -1 ? (e = !0, !1) : void 0
                        }), e || (d = !1), d
                    }), $(b).data("hidden", !d)
                }) : f.data("hidden", !1), b()
            })
        }
    }, {
        "./helpers/request-animation-frame.js": 8,
        "./helpers/split-search-words.js": 10
    }],
    18: [function() {
        var a = $(".project__details");
        if (a.length) {
            var b, c, d, e = a.clone().addClass("project__details--small").insertAfter(a),
                f = -parseInt(a.css("marginTop")),
                g = 1.5,
                h = a.prev(),
                i = $(".main-header"),
                j = $(".project__details-pull"),
                k = parseInt($(".project__description").css("margin-left"), 10),
                l = function() {
                    b = a.outerHeight(), c = i.outerHeight(), d = h.offset().top + h.outerHeight() - f + b + 30, e.css("top", c)
                };
            l();
            var m, n = function() {
                var f = $(window).scrollTop();
                j.css("marginBottom", -Math.min(f, b - k));
                var h = e.hasClass("project__details--small-visible");
                h ? d >= f * g + f + c && e.removeClass("project__details--small-visible") : f * g + f + c > d ? e.addClass("project__details--small-visible") : Modernizr.csstransforms ? a.css("transform", "translateY(" + f * -g + "px)") : a.css("marginBottom", f * -g)
            };
            $(window).on("scroll", function() {
                n(), clearTimeout(m), m = setTimeout(n, 30)
            });
            var o;
            $(window).on("resize", function() {
                clearTimeout(o), o = setTimeout(function() {
                    l(), n()
                }, 30)
            })
        }
    }, {}],
    19: [function() {
        var a = $(".quote");
        a.length && (a.each(function() {
            var a = $(this).find(".quote--text, h1, h2, h3, h4");
            a.addClass("quote--text");
            var b = a.text();
            a.attr("aria-label", b), a.empty(), $.each(b.split(""), function(b, c) {
                a.append($("<span>", {
                    "class": "quote--text-letter" + (15 > b ? " quote--text-letter__visible" : ""),
                    attr: {
                        "aria-hidden": "true"
                    },
                    text: c
                }))
            })
        }), $(window).on("scroll.quotes", function() {
            var b = $(window).scrollTop(),
                c = Math.floor(b / 40) + 14,
                d = a.find(".quote--text-letter");
            b >= $("html").height() - $(window).height() && (c = d.length), d.filter(":lt(" + c + ")").addClass("quote--text-letter__visible");
            var e = c >= d.length;
            a.find(".quote--source, p").toggleClass("quote--source__visible", e), e && $(window).off("scroll.quotes")
        }))
    }, {}],
    20: [function(a) {
        a("./cycle"), a("./helpers/page-visibility");
        var b = ["", "project-", "news-"];
        $.each(b, function(a, b) {
            var c = "." + b + "slideshow",
                d = $(c);
            if (d = d.filter(function(a, b) {
                    return $(b).find(c + "--slide").length > 1
                }), d.length) {
                var e = 1e3;
                if (window.Modernizr.csstransitions && window.Modernizr.csstransforms) {
                    var f = function(a, b, c, d, e) {
                        var f = (Modernizr.prefixed("transform"), $(b)),
                            g = $(c);
                        g.show(), g.width(), d && g.hasClass("left") && (g.addClass("no-transition").removeClass("left"), g.height(), g.removeClass("no-transition")), d || g.hasClass("left") || (g.addClass("no-transition").addClass("left"), g.height(), g.removeClass("no-transition")), d && f.addClass("left"), f.removeClass("active"), g.addClass("active").removeClass("left"), e && setTimeout(e, a.speed)
                    };
                    $.fn.cycle.transitions.custom = {
                        transition: f
                    }, $(document).on("page:visibilitychange", function(a, b) {
                        b || ($(c + "--slide").addClass("no-transition"), $(c + "--slide").height(), $(c + "--slide").removeClass("no-transition"))
                    })
                } else $.fn.cycle.transitions.custom = $.fn.cycle.transitions.none, e = 0;
                d.cycle({
                    slides: c + "--slide",
                    prev: c + "--prev",
                    next: c + "--next",
                    timeout: 4e3,
                    speed: e,
                    fx: "custom",
                    slideCss: {},
                    hideNonActive: !1,
                    slideClass: b + "slideshow--slide",
                    slideActiveClass: "active",
                    swipe: !0,
                    manualTrump: !1,
                    pauseOnHover: !0
                }).on("cycle-before", function(a, b, d) {
                    var e = $(d).closest(c),
                        f = e.find(c + "--pager-page"),
                        g = (b.slideNum - 1) / (b.slideCount - 1) * 100;
                    f.css("left", g + "%")
                }), $(document).on("mousedown", c + "--pager-page", function(a) {
                    var d = $(this),
                        e = d.closest(c);
                    d.addClass(b + "slideshow--pager-page__dragging");
                    var f = d.offset().left,
                        g = a.pageX - f,
                        h = e.width() - d.width();
                    $(document).on("mousemove.slider-drag", function(a) {
                        var b = a.pageX - g;
                        0 > b && (b = 0), b > h && (b = h), d.css("left", b)
                    }), $(document).on("mouseup.slider-drag click.slider-drag", function(a) {
                        $(document).off(".slider-drag");
                        var c = e.data("cycle.opts"),
                            f = (a.pageX - g) / h,
                            i = Math.round(f * (c.slideCount - 1));
                        d.removeClass(b + "slideshow--pager-page__dragging"), i === c.currSlide ? (f = c.currSlide / (c.slideCount - 1) * 100, d.css("left", f + "%")) : e.cycle("goto", i)
                    })
                }), $(document).on("click", c + "--pager", function(a) {
                    if (!$(a.target).hasClass(b + "slideshow--pager-page")) {
                        var d = a.pageX,
                            e = $(this).children(c + "--pager-page").offset().left;
                        $(this).closest(c).cycle(e > d ? "prev" : "next")
                    }
                })
            }
        })
    }, {
        "./cycle": 6,
        "./helpers/page-visibility": 7
    }],
    21: [function(a) {
        function b() {
            return c = $.getScriptOnce("static/script/lib/video.js"), c.done(function() {
                window.videojs.options.flash.swf = "static/script/lib/video-js.swf"
            }), c
        }
        a("./jquery/get-script-once.js");
        var c;
        $(document).ready(function() {
            $("[data-sources]").length && b()
        }), $(document).on("click", "[data-sources]", function() {
            var a = $(this),
                c = $("<video>", {
                    "class": "vjs-default-skin video-js",
                    prop: {
                        controls: !0,
                        autoplay: !0,
                        preload: "auto"
                    }
                });
            $.map(a.data("sources").split(","), function(a) {
                $("<source>", {
                    src: a
                }).appendTo(c)
            });
            var d = c.wrap('<div class="video-overlay page-container">').parent();
            d.css("top", $(window).scrollTop() + $(".main-header").outerHeight()), d.appendTo(document.body), b().done(function() {
                window.videojs(c[0], {
                    width: "100%",
                    height: "100%"
                }, function() {})
            })
        }), $(document).on("click", ".video-overlay", function(a) {
            $(a.target).closest(".video-js").length || (a.preventDefault(), $(this).remove())
        })
    }, {
        "./jquery/get-script-once.js": 13
    }],
    22: [function(a) {
        jQuery = $ = a("jquery"), window.isReady && jQuery.ready(), a("./modules/navigation"), a("./modules/quote"), a("./modules/slideshow"), a("./modules/news"), a("./modules/history"), a("./modules/person-filter"), a("./modules/project-filter"), a("./modules/projects"), a("./modules/helpers/scroll"), a("./modules/intro"), a("./modules/video"), $(document).on("click", 'a[href="#"]', function(a) {
            a.preventDefault()
        })
    }, {
        "./modules/helpers/scroll": 9,
        "./modules/history": 11,
        "./modules/intro": 12,
        "./modules/navigation": 14,
        "./modules/news": 15,
        "./modules/person-filter": 16,
        "./modules/project-filter": 17,
        "./modules/projects": 18,
        "./modules/quote": 19,
        "./modules/slideshow": 20,
        "./modules/video": 21,
        jquery: 23
    }],
    23: [function(a, b) {
        ! function(a, c) {
            "object" == typeof b && "object" == typeof b.exports ? b.exports = a.document ? c(a, !0) : function(a) {
                if (!a.document) throw new Error("jQuery requires a window with a document");
                return c(a)
            } : c(a)
        }("undefined" != typeof window ? window : this, function(a, b) {
            function c(a) {
                var b = "length" in a && a.length,
                    c = ea.type(a);
                return "function" === c || ea.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
            }

            function d(a, b, c) {
                if (ea.isFunction(b)) return ea.grep(a, function(a, d) {
                    return !!b.call(a, d, a) !== c
                });
                if (b.nodeType) return ea.grep(a, function(a) {
                    return a === b !== c
                });
                if ("string" == typeof b) {
                    if (ma.test(b)) return ea.filter(b, a, c);
                    b = ea.filter(b, a)
                }
                return ea.grep(a, function(a) {
                    return ea.inArray(a, b) >= 0 !== c
                })
            }

            function e(a, b) {
                do a = a[b]; while (a && 1 !== a.nodeType);
                return a
            }

            function f(a) {
                var b = ua[a] = {};
                return ea.each(a.match(ta) || [], function(a, c) {
                    b[c] = !0
                }), b
            }

            function g() {
                oa.addEventListener ? (oa.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (oa.detachEvent("onreadystatechange", h), a.detachEvent("onload", h))
            }

            function h() {
                (oa.addEventListener || "load" === event.type || "complete" === oa.readyState) && (g(), ea.ready())
            }

            function i(a, b, c) {
                if (void 0 === c && 1 === a.nodeType) {
                    var d = "data-" + b.replace(za, "-$1").toLowerCase();
                    if (c = a.getAttribute(d), "string" == typeof c) {
                        try {
                            c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ya.test(c) ? ea.parseJSON(c) : c
                        } catch (e) {}
                        ea.data(a, b, c)
                    } else c = void 0
                }
                return c
            }

            function j(a) {
                var b;
                for (b in a)
                    if (("data" !== b || !ea.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
                return !0
            }

            function k(a, b, c, d) {
                if (ea.acceptData(a)) {
                    var e, f, g = ea.expando,
                        h = a.nodeType,
                        i = h ? ea.cache : a,
                        j = h ? a[g] : a[g] && g;
                    if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = W.pop() || ea.guid++ : g), i[j] || (i[j] = h ? {} : {
                            toJSON: ea.noop
                        }), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = ea.extend(i[j], b) : i[j].data = ea.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[ea.camelCase(b)] = c),
                        "string" == typeof b ? (e = f[b], null == e && (e = f[ea.camelCase(b)])) : e = f, e
                }
            }

            function l(a, b, c) {
                if (ea.acceptData(a)) {
                    var d, e, f = a.nodeType,
                        g = f ? ea.cache : a,
                        h = f ? a[ea.expando] : ea.expando;
                    if (g[h]) {
                        if (b && (d = c ? g[h] : g[h].data)) {
                            ea.isArray(b) ? b = b.concat(ea.map(b, ea.camelCase)) : b in d ? b = [b] : (b = ea.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                            for (; e--;) delete d[b[e]];
                            if (c ? !j(d) : !ea.isEmptyObject(d)) return
                        }(c || (delete g[h].data, j(g[h]))) && (f ? ea.cleanData([a], !0) : ca.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
                    }
                }
            }

            function m() {
                return !0
            }

            function n() {
                return !1
            }

            function o() {
                try {
                    return oa.activeElement
                } catch (a) {}
            }

            function p(a) {
                var b = Ka.split("|"),
                    c = a.createDocumentFragment();
                if (c.createElement)
                    for (; b.length;) c.createElement(b.pop());
                return c
            }

            function q(a, b) {
                var c, d, e = 0,
                    f = typeof a.getElementsByTagName !== xa ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xa ? a.querySelectorAll(b || "*") : void 0;
                if (!f)
                    for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || ea.nodeName(d, b) ? f.push(d) : ea.merge(f, q(d, b));
                return void 0 === b || b && ea.nodeName(a, b) ? ea.merge([a], f) : f
            }

            function r(a) {
                Ea.test(a.type) && (a.defaultChecked = a.checked)
            }

            function s(a, b) {
                return ea.nodeName(a, "table") && ea.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
            }

            function t(a) {
                return a.type = (null !== ea.find.attr(a, "type")) + "/" + a.type, a
            }

            function u(a) {
                var b = Va.exec(a.type);
                return b ? a.type = b[1] : a.removeAttribute("type"), a
            }

            function v(a, b) {
                for (var c, d = 0; null != (c = a[d]); d++) ea._data(c, "globalEval", !b || ea._data(b[d], "globalEval"))
            }

            function w(a, b) {
                if (1 === b.nodeType && ea.hasData(a)) {
                    var c, d, e, f = ea._data(a),
                        g = ea._data(b, f),
                        h = f.events;
                    if (h) {
                        delete g.handle, g.events = {};
                        for (c in h)
                            for (d = 0, e = h[c].length; e > d; d++) ea.event.add(b, c, h[c][d])
                    }
                    g.data && (g.data = ea.extend({}, g.data))
                }
            }

            function x(a, b) {
                var c, d, e;
                if (1 === b.nodeType) {
                    if (c = b.nodeName.toLowerCase(), !ca.noCloneEvent && b[ea.expando]) {
                        e = ea._data(b);
                        for (d in e.events) ea.removeEvent(b, d, e.handle);
                        b.removeAttribute(ea.expando)
                    }
                    "script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), ca.html5Clone && a.innerHTML && !ea.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Ea.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
                }
            }

            function y(b, c) {
                var d, e = ea(c.createElement(b)).appendTo(c.body),
                    f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : ea.css(e[0], "display");
                return e.detach(), f
            }

            function z(a) {
                var b = oa,
                    c = _a[a];
                return c || (c = y(a, b), "none" !== c && c || ($a = ($a || ea("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = ($a[0].contentWindow || $a[0].contentDocument).document, b.write(), b.close(), c = y(a, b), $a.detach()), _a[a] = c), c
            }

            function A(a, b) {
                return {
                    get: function() {
                        var c = a();
                        if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
                    }
                }
            }

            function B(a, b) {
                if (b in a) return b;
                for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mb.length; e--;)
                    if (b = mb[e] + c, b in a) return b;
                return d
            }

            function C(a, b) {
                for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ea._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Ca(d) && (f[g] = ea._data(d, "olddisplay", z(d.nodeName)))) : (e = Ca(d), (c && "none" !== c || !e) && ea._data(d, "olddisplay", e ? c : ea.css(d, "display"))));
                for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
                return a
            }

            function D(a, b, c) {
                var d = ib.exec(b);
                return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
            }

            function E(a, b, c, d, e) {
                for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ea.css(a, c + Ba[f], !0, e)), d ? ("content" === c && (g -= ea.css(a, "padding" + Ba[f], !0, e)), "margin" !== c && (g -= ea.css(a, "border" + Ba[f] + "Width", !0, e))) : (g += ea.css(a, "padding" + Ba[f], !0, e), "padding" !== c && (g += ea.css(a, "border" + Ba[f] + "Width", !0, e)));
                return g
            }

            function F(a, b, c) {
                var d = !0,
                    e = "width" === b ? a.offsetWidth : a.offsetHeight,
                    f = ab(a),
                    g = ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, f);
                if (0 >= e || null == e) {
                    if (e = bb(a, b, f), (0 > e || null == e) && (e = a.style[b]), db.test(e)) return e;
                    d = g && (ca.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
                }
                return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px"
            }

            function G(a, b, c, d, e) {
                return new G.prototype.init(a, b, c, d, e)
            }

            function H() {
                return setTimeout(function() {
                    nb = void 0
                }), nb = ea.now()
            }

            function I(a, b) {
                var c, d = {
                        height: a
                    },
                    e = 0;
                for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = Ba[e], d["margin" + c] = d["padding" + c] = a;
                return b && (d.opacity = d.width = a), d
            }

            function J(a, b, c) {
                for (var d, e = (tb[b] || []).concat(tb["*"]), f = 0, g = e.length; g > f; f++)
                    if (d = e[f].call(c, b, a)) return d
            }

            function K(a, b, c) {
                var d, e, f, g, h, i, j, k, l = this,
                    m = {},
                    n = a.style,
                    o = a.nodeType && Ca(a),
                    p = ea._data(a, "fxshow");
                c.queue || (h = ea._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
                    h.unqueued || i()
                }), h.unqueued++, l.always(function() {
                    l.always(function() {
                        h.unqueued--, ea.queue(a, "fx").length || h.empty.fire()
                    })
                })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = ea.css(a, "display"), k = "none" === j ? ea._data(a, "olddisplay") || z(a.nodeName) : j, "inline" === k && "none" === ea.css(a, "float") && (ca.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", ca.shrinkWrapBlocks() || l.always(function() {
                    n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
                }));
                for (d in b)
                    if (e = b[d], pb.exec(e)) {
                        if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                            if ("show" !== e || !p || void 0 === p[d]) continue;
                            o = !0
                        }
                        m[d] = p && p[d] || ea.style(a, d)
                    } else j = void 0;
                if (ea.isEmptyObject(m)) "inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j);
                else {
                    p ? "hidden" in p && (o = p.hidden) : p = ea._data(a, "fxshow", {}), f && (p.hidden = !o), o ? ea(a).show() : l.done(function() {
                        ea(a).hide()
                    }), l.done(function() {
                        var b;
                        ea._removeData(a, "fxshow");
                        for (b in m) ea.style(a, b, m[b])
                    });
                    for (d in m) g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
                }
            }

            function L(a, b) {
                var c, d, e, f, g;
                for (c in a)
                    if (d = ea.camelCase(c), e = b[d], f = a[c], ea.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ea.cssHooks[d], g && "expand" in g) {
                        f = g.expand(f), delete a[d];
                        for (c in f) c in a || (a[c] = f[c], b[c] = e)
                    } else b[d] = e
            }

            function M(a, b, c) {
                var d, e, f = 0,
                    g = sb.length,
                    h = ea.Deferred().always(function() {
                        delete i.elem
                    }),
                    i = function() {
                        if (e) return !1;
                        for (var b = nb || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                    },
                    j = h.promise({
                        elem: a,
                        props: ea.extend({}, b),
                        opts: ea.extend(!0, {
                            specialEasing: {}
                        }, c),
                        originalProperties: b,
                        originalOptions: c,
                        startTime: nb || H(),
                        duration: c.duration,
                        tweens: [],
                        createTween: function(b, c) {
                            var d = ea.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                            return j.tweens.push(d), d
                        },
                        stop: function(b) {
                            var c = 0,
                                d = b ? j.tweens.length : 0;
                            if (e) return this;
                            for (e = !0; d > c; c++) j.tweens[c].run(1);
                            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                        }
                    }),
                    k = j.props;
                for (L(k, j.opts.specialEasing); g > f; f++)
                    if (d = sb[f].call(j, a, k, j.opts)) return d;
                return ea.map(k, J, j), ea.isFunction(j.opts.start) && j.opts.start.call(a, j), ea.fx.timer(ea.extend(i, {
                    elem: a,
                    anim: j,
                    queue: j.opts.queue
                })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
            }

            function N(a) {
                return function(b, c) {
                    "string" != typeof b && (c = b, b = "*");
                    var d, e = 0,
                        f = b.toLowerCase().match(ta) || [];
                    if (ea.isFunction(c))
                        for (; d = f[e++];) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                }
            }

            function O(a, b, c, d) {
                function e(h) {
                    var i;
                    return f[h] = !0, ea.each(a[h] || [], function(a, h) {
                        var j = h(b, c, d);
                        return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                    }), i
                }
                var f = {},
                    g = a === Rb;
                return e(b.dataTypes[0]) || !f["*"] && e("*")
            }

            function P(a, b) {
                var c, d, e = ea.ajaxSettings.flatOptions || {};
                for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
                return c && ea.extend(!0, a, c), a
            }

            function Q(a, b, c) {
                for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                    "*" === i[0];) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
                if (e)
                    for (g in h)
                        if (h[g] && h[g].test(e)) {
                            i.unshift(g);
                            break
                        }
                if (i[0] in c) f = i[0];
                else {
                    for (g in c) {
                        if (!i[0] || a.converters[g + " " + i[0]]) {
                            f = g;
                            break
                        }
                        d || (d = g)
                    }
                    f = f || d
                }
                return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
            }

            function R(a, b, c, d) {
                var e, f, g, h, i, j = {},
                    k = a.dataTypes.slice();
                if (k[1])
                    for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
                for (f = k.shift(); f;)
                    if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                        if ("*" === f) f = i;
                        else if ("*" !== i && i !== f) {
                    if (g = j[i + " " + f] || j["* " + f], !g)
                        for (e in j)
                            if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                                break
                            }
                    if (g !== !0)
                        if (g && a["throws"]) b = g(b);
                        else try {
                            b = g(b)
                        } catch (l) {
                            return {
                                state: "parsererror",
                                error: g ? l : "No conversion from " + i + " to " + f
                            }
                        }
                }
                return {
                    state: "success",
                    data: b
                }
            }

            function S(a, b, c, d) {
                var e;
                if (ea.isArray(b)) ea.each(b, function(b, e) {
                    c || Vb.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
                });
                else if (c || "object" !== ea.type(b)) d(a, b);
                else
                    for (e in b) S(a + "[" + e + "]", b[e], c, d)
            }

            function T() {
                try {
                    return new a.XMLHttpRequest
                } catch (b) {}
            }

            function U() {
                try {
                    return new a.ActiveXObject("Microsoft.XMLHTTP")
                } catch (b) {}
            }

            function V(a) {
                return ea.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
            }
            var W = [],
                X = W.slice,
                Y = W.concat,
                Z = W.push,
                $ = W.indexOf,
                _ = {},
                aa = _.toString,
                ba = _.hasOwnProperty,
                ca = {},
                da = "1.11.3",
                ea = function(a, b) {
                    return new ea.fn.init(a, b)
                },
                fa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                ga = /^-ms-/,
                ha = /-([\da-z])/gi,
                ia = function(a, b) {
                    return b.toUpperCase()
                };
            ea.fn = ea.prototype = {
                jquery: da,
                constructor: ea,
                selector: "",
                length: 0,
                toArray: function() {
                    return X.call(this)
                },
                get: function(a) {
                    return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this)
                },
                pushStack: function(a) {
                    var b = ea.merge(this.constructor(), a);
                    return b.prevObject = this, b.context = this.context, b
                },
                each: function(a, b) {
                    return ea.each(this, a, b)
                },
                map: function(a) {
                    return this.pushStack(ea.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                slice: function() {
                    return this.pushStack(X.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(a) {
                    var b = this.length,
                        c = +a + (0 > a ? b : 0);
                    return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: Z,
                sort: W.sort,
                splice: W.splice
            }, ea.extend = ea.fn.extend = function() {
                var a, b, c, d, e, f, g = arguments[0] || {},
                    h = 1,
                    i = arguments.length,
                    j = !1;
                for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ea.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
                    if (null != (e = arguments[h]))
                        for (d in e) a = g[d], c = e[d], g !== c && (j && c && (ea.isPlainObject(c) || (b = ea.isArray(c))) ? (b ? (b = !1, f = a && ea.isArray(a) ? a : []) : f = a && ea.isPlainObject(a) ? a : {}, g[d] = ea.extend(j, f, c)) : void 0 !== c && (g[d] = c));
                return g
            }, ea.extend({
                expando: "jQuery" + (da + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(a) {
                    throw new Error(a)
                },
                noop: function() {},
                isFunction: function(a) {
                    return "function" === ea.type(a)
                },
                isArray: Array.isArray || function(a) {
                    return "array" === ea.type(a)
                },
                isWindow: function(a) {
                    return null != a && a == a.window
                },
                isNumeric: function(a) {
                    return !ea.isArray(a) && a - parseFloat(a) + 1 >= 0
                },
                isEmptyObject: function(a) {
                    var b;
                    for (b in a) return !1;
                    return !0
                },
                isPlainObject: function(a) {
                    var b;
                    if (!a || "object" !== ea.type(a) || a.nodeType || ea.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !ba.call(a, "constructor") && !ba.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    if (ca.ownLast)
                        for (b in a) return ba.call(a, b);
                    for (b in a);
                    return void 0 === b || ba.call(a, b)
                },
                type: function(a) {
                    return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[aa.call(a)] || "object" : typeof a
                },
                globalEval: function(b) {
                    b && ea.trim(b) && (a.execScript || function(b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function(a) {
                    return a.replace(ga, "ms-").replace(ha, ia)
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                },
                each: function(a, b, d) {
                    var e, f = 0,
                        g = a.length,
                        h = c(a);
                    if (d) {
                        if (h)
                            for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                        else
                            for (f in a)
                                if (e = b.apply(a[f], d), e === !1) break
                    } else if (h)
                        for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
                    else
                        for (f in a)
                            if (e = b.call(a[f], f, a[f]), e === !1) break; return a
                },
                trim: function(a) {
                    return null == a ? "" : (a + "").replace(fa, "")
                },
                makeArray: function(a, b) {
                    var d = b || [];
                    return null != a && (c(Object(a)) ? ea.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d
                },
                inArray: function(a, b, c) {
                    var d;
                    if (b) {
                        if ($) return $.call(b, a, c);
                        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                            if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function(a, b) {
                    for (var c = +b.length, d = 0, e = a.length; c > d;) a[e++] = b[d++];
                    if (c !== c)
                        for (; void 0 !== b[d];) a[e++] = b[d++];
                    return a.length = e, a
                },
                grep: function(a, b, c) {
                    for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
                    return e
                },
                map: function(a, b, d) {
                    var e, f = 0,
                        g = a.length,
                        h = c(a),
                        i = [];
                    if (h)
                        for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
                    else
                        for (f in a) e = b(a[f], f, d), null != e && i.push(e);
                    return Y.apply([], i)
                },
                guid: 1,
                proxy: function(a, b) {
                    var c, d, e;
                    return "string" == typeof b && (e = a[b], b = a, a = e), ea.isFunction(a) ? (c = X.call(arguments, 2), d = function() {
                        return a.apply(b || this, c.concat(X.call(arguments)))
                    }, d.guid = a.guid = a.guid || ea.guid++, d) : void 0
                },
                now: function() {
                    return +new Date
                },
                support: ca
            }), ea.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
                _["[object " + b + "]"] = b.toLowerCase()
            });
            var ja = function(a) {
                function b(a, b, c, d) {
                    var e, f, g, h, i, j, l, n, o, p;
                    if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
                    if (!d && I) {
                        if (11 !== h && (e = sa.exec(a)))
                            if (g = e[1]) {
                                if (9 === h) {
                                    if (f = b.getElementById(g), !f || !f.parentNode) return c;
                                    if (f.id === g) return c.push(f), c
                                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                            } else {
                                if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                                if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c
                            }
                        if (v.qsa && (!J || !J.test(a))) {
                            if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                                for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                                o = ta.test(a) && k(b.parentNode) || b, p = j.join(",")
                            }
                            if (p) try {
                                return $.apply(c, o.querySelectorAll(p)), c
                            } catch (q) {} finally {
                                l || b.removeAttribute("id")
                            }
                        }
                    }
                    return B(a.replace(ia, "$1"), b, c, d)
                }

                function c() {
                    function a(c, d) {
                        return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
                    }
                    var b = [];
                    return a
                }

                function d(a) {
                    return a[N] = !0, a
                }

                function e(a) {
                    var b = G.createElement("div");
                    try {
                        return !!a(b)
                    } catch (c) {
                        return !1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b), b = null
                    }
                }

                function f(a, b) {
                    for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
                }

                function g(a, b) {
                    var c = b && a,
                        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
                    if (d) return d;
                    if (c)
                        for (; c = c.nextSibling;)
                            if (c === b) return -1;
                    return a ? 1 : -1
                }

                function h(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return "input" === c && b.type === a
                    }
                }

                function i(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return ("input" === c || "button" === c) && b.type === a
                    }
                }

                function j(a) {
                    return d(function(b) {
                        return b = +b, d(function(c, d) {
                            for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                        })
                    })
                }

                function k(a) {
                    return a && "undefined" != typeof a.getElementsByTagName && a
                }

                function l() {}

                function m(a) {
                    for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
                    return d
                }

                function n(a, b, c) {
                    var d = b.dir,
                        e = c && "parentNode" === d,
                        f = Q++;
                    return b.first ? function(b, c, f) {
                        for (; b = b[d];)
                            if (1 === b.nodeType || e) return a(b, c, f)
                    } : function(b, c, g) {
                        var h, i, j = [P, f];
                        if (g) {
                            for (; b = b[d];)
                                if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                        } else
                            for (; b = b[d];)
                                if (1 === b.nodeType || e) {
                                    if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                                    if (i[d] = j, j[2] = a(b, c, g)) return !0
                                }
                    }
                }

                function o(a) {
                    return a.length > 1 ? function(b, c, d) {
                        for (var e = a.length; e--;)
                            if (!a[e](b, c, d)) return !1;
                        return !0
                    } : a[0]
                }

                function p(a, c, d) {
                    for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
                    return d
                }

                function q(a, b, c, d, e) {
                    for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                    return g
                }

                function r(a, b, c, e, f, g) {
                    return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                        var j, k, l, m = [],
                            n = [],
                            o = g.length,
                            r = d || p(b || "*", h.nodeType ? [h] : h, []),
                            s = !a || !d && b ? r : q(r, m, a, h, i),
                            t = c ? f || (d ? a : o || e) ? [] : g : s;
                        if (c && c(s, t, h, i), e)
                            for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                        if (d) {
                            if (f || a) {
                                if (f) {
                                    for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                    f(null, t = [], j, i)
                                }
                                for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                            }
                        } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
                    })
                }

                function s(a) {
                    for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                            return a === b
                        }, g, !0), j = n(function(a) {
                            return aa(b, a) > -1
                        }, g, !0), k = [function(a, c, d) {
                            var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                            return b = null, e
                        }]; e > h; h++)
                        if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                        else {
                            if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                                for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                                return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                                    value: " " === a[h - 2].type ? "*" : ""
                                })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                            }
                            k.push(c)
                        }
                    return o(k)
                }

                function t(a, c) {
                    var e = c.length > 0,
                        f = a.length > 0,
                        g = function(d, g, h, i, j) {
                            var k, l, m, n = 0,
                                o = "0",
                                p = d && [],
                                r = [],
                                s = C,
                                t = d || f && w.find.TAG("*", j),
                                u = P += null == s ? 1 : Math.random() || .1,
                                v = t.length;
                            for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                                if (f && k) {
                                    for (l = 0; m = a[l++];)
                                        if (m(k, g, h)) {
                                            i.push(k);
                                            break
                                        }
                                    j && (P = u)
                                }
                                e && ((k = !m && k) && n--, d && p.push(k))
                            }
                            if (n += o, e && o !== n) {
                                for (l = 0; m = c[l++];) m(p, r, g, h);
                                if (d) {
                                    if (n > 0)
                                        for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                                    r = q(r)
                                }
                                $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                            }
                            return j && (P = u, C = s), p
                        };
                    return e ? d(g) : g
                }
                var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
                    O = a.document,
                    P = 0,
                    Q = 0,
                    R = c(),
                    S = c(),
                    T = c(),
                    U = function(a, b) {
                        return a === b && (E = !0), 0
                    },
                    V = 1 << 31,
                    W = {}.hasOwnProperty,
                    X = [],
                    Y = X.pop,
                    Z = X.push,
                    $ = X.push,
                    _ = X.slice,
                    aa = function(a, b) {
                        for (var c = 0, d = a.length; d > c; c++)
                            if (a[c] === b) return c;
                        return -1
                    },
                    ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ca = "[\\x20\\t\\r\\n\\f]",
                    da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    ea = da.replace("w", "w#"),
                    fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
                    ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
                    ha = new RegExp(ca + "+", "g"),
                    ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
                    ja = new RegExp("^" + ca + "*," + ca + "*"),
                    ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
                    la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
                    ma = new RegExp(ga),
                    na = new RegExp("^" + ea + "$"),
                    oa = {
                        ID: new RegExp("^#(" + da + ")"),
                        CLASS: new RegExp("^\\.(" + da + ")"),
                        TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + fa),
                        PSEUDO: new RegExp("^" + ga),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + ba + ")$", "i"),
                        needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
                    },
                    pa = /^(?:input|select|textarea|button)$/i,
                    qa = /^h\d$/i,
                    ra = /^[^{]+\{\s*\[native \w/,
                    sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ta = /[+~]/,
                    ua = /'|\\/g,
                    va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
                    wa = function(a, b, c) {
                        var d = "0x" + b - 65536;
                        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                    },
                    xa = function() {
                        F()
                    };
                try {
                    $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
                } catch (ya) {
                    $ = {
                        apply: X.length ? function(a, b) {
                            Z.apply(a, _.call(b))
                        } : function(a, b) {
                            for (var c = a.length, d = 0; a[c++] = b[d++];);
                            a.length = c - 1
                        }
                    }
                }
                v = b.support = {}, y = b.isXML = function(a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return b ? "HTML" !== b.nodeName : !1
                }, F = b.setDocument = function(a) {
                    var b, c, d = a ? a.ownerDocument || a : O;
                    return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), I = !y(d), v.attributes = e(function(a) {
                        return a.className = "i", !a.getAttribute("className")
                    }), v.getElementsByTagName = e(function(a) {
                        return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
                    }), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function(a) {
                        return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length
                    }), v.getById ? (w.find.ID = function(a, b) {
                        if ("undefined" != typeof b.getElementById && I) {
                            var c = b.getElementById(a);
                            return c && c.parentNode ? [c] : []
                        }
                    }, w.filter.ID = function(a) {
                        var b = a.replace(va, wa);
                        return function(a) {
                            return a.getAttribute("id") === b
                        }
                    }) : (delete w.find.ID, w.filter.ID = function(a) {
                        var b = a.replace(va, wa);
                        return function(a) {
                            var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                            return c && c.value === b
                        }
                    }), w.find.TAG = v.getElementsByTagName ? function(a, b) {
                        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
                    } : function(a, b) {
                        var c, d = [],
                            e = 0,
                            f = b.getElementsByTagName(a);
                        if ("*" === a) {
                            for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                            return d
                        }
                        return f
                    }, w.find.CLASS = v.getElementsByClassName && function(a, b) {
                        return I ? b.getElementsByClassName(a) : void 0
                    }, K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function(a) {
                        H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
                    }), e(function(a) {
                        var b = d.createElement("input");
                        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
                    })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                        v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ga)
                    }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function(a, b) {
                        var c = 9 === a.nodeType ? a.documentElement : a,
                            d = b && b.parentNode;
                        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                    } : function(a, b) {
                        if (b)
                            for (; b = b.parentNode;)
                                if (b === a) return !0;
                        return !1
                    }, U = b ? function(a, b) {
                        if (a === b) return E = !0, 0;
                        var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
                    } : function(a, b) {
                        if (a === b) return E = !0, 0;
                        var c, e = 0,
                            f = a.parentNode,
                            h = b.parentNode,
                            i = [a],
                            j = [b];
                        if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                        if (f === h) return g(a, b);
                        for (c = a; c = c.parentNode;) i.unshift(c);
                        for (c = b; c = c.parentNode;) j.unshift(c);
                        for (; i[e] === j[e];) e++;
                        return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                    }, d) : G
                }, b.matches = function(a, c) {
                    return b(a, null, null, c)
                }, b.matchesSelector = function(a, c) {
                    if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                        var d = L.call(a, c);
                        if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                    } catch (e) {}
                    return b(c, G, null, [a]).length > 0
                }, b.contains = function(a, b) {
                    return (a.ownerDocument || a) !== G && F(a), M(a, b)
                }, b.attr = function(a, b) {
                    (a.ownerDocument || a) !== G && F(a);
                    var c = w.attrHandle[b.toLowerCase()],
                        d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                    return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }, b.error = function(a) {
                    throw new Error("Syntax error, unrecognized expression: " + a)
                }, b.uniqueSort = function(a) {
                    var b, c = [],
                        d = 0,
                        e = 0;
                    if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                        for (; b = a[e++];) b === a[e] && (d = c.push(e));
                        for (; d--;) a.splice(c[d], 1)
                    }
                    return D = null, a
                }, x = b.getText = function(a) {
                    var b, c = "",
                        d = 0,
                        e = a.nodeType;
                    if (e) {
                        if (1 === e || 9 === e || 11 === e) {
                            if ("string" == typeof a.textContent) return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                        } else if (3 === e || 4 === e) return a.nodeValue
                    } else
                        for (; b = a[d++];) c += x(b);
                    return c
                }, w = b.selectors = {
                    cacheLength: 50,
                    createPseudo: d,
                    match: oa,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(a) {
                            return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                        },
                        CHILD: function(a) {
                            return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                        },
                        PSEUDO: function(a) {
                            var b, c = !a[6] && a[2];
                            return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(a) {
                            var b = a.replace(va, wa).toLowerCase();
                            return "*" === a ? function() {
                                return !0
                            } : function(a) {
                                return a.nodeName && a.nodeName.toLowerCase() === b
                            }
                        },
                        CLASS: function(a) {
                            var b = R[a + " "];
                            return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function(a) {
                                return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(a, c, d) {
                            return function(e) {
                                var f = b.attr(e, a);
                                return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                            }
                        },
                        CHILD: function(a, b, c, d, e) {
                            var f = "nth" !== a.slice(0, 3),
                                g = "last" !== a.slice(-4),
                                h = "of-type" === b;
                            return 1 === d && 0 === e ? function(a) {
                                return !!a.parentNode
                            } : function(b, c, i) {
                                var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                    q = b.parentNode,
                                    r = h && b.nodeName.toLowerCase(),
                                    s = !i && !h;
                                if (q) {
                                    if (f) {
                                        for (; p;) {
                                            for (l = b; l = l[p];)
                                                if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                            o = p = "only" === a && !o && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                        for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                            if (1 === l.nodeType && ++m && l === b) {
                                                k[a] = [P, n, m];
                                                break
                                            }
                                    } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                    else
                                        for (;
                                            (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                                    return m -= e, m === d || m % d === 0 && m / d >= 0
                                }
                            }
                        },
                        PSEUDO: function(a, c) {
                            var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                            return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                                for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
                            }) : function(a) {
                                return f(a, 0, e)
                            }) : f
                        }
                    },
                    pseudos: {
                        not: d(function(a) {
                            var b = [],
                                c = [],
                                e = A(a.replace(ia, "$1"));
                            return e[N] ? d(function(a, b, c, d) {
                                for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                            }) : function(a, d, f) {
                                return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                            }
                        }),
                        has: d(function(a) {
                            return function(c) {
                                return b(a, c).length > 0
                            }
                        }),
                        contains: d(function(a) {
                            return a = a.replace(va, wa),
                                function(b) {
                                    return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                                }
                        }),
                        lang: d(function(a) {
                            return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
                                function(b) {
                                    var c;
                                    do
                                        if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                                    while ((b = b.parentNode) && 1 === b.nodeType);
                                    return !1
                                }
                        }),
                        target: function(b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id
                        },
                        root: function(a) {
                            return a === H
                        },
                        focus: function(a) {
                            return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                        },
                        enabled: function(a) {
                            return a.disabled === !1
                        },
                        disabled: function(a) {
                            return a.disabled === !0
                        },
                        checked: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && !!a.checked || "option" === b && !!a.selected
                        },
                        selected: function(a) {
                            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                        },
                        empty: function(a) {
                            for (a = a.firstChild; a; a = a.nextSibling)
                                if (a.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(a) {
                            return !w.pseudos.empty(a)
                        },
                        header: function(a) {
                            return qa.test(a.nodeName)
                        },
                        input: function(a) {
                            return pa.test(a.nodeName)
                        },
                        button: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && "button" === a.type || "button" === b
                        },
                        text: function(a) {
                            var b;
                            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                        },
                        first: j(function() {
                            return [0]
                        }),
                        last: j(function(a, b) {
                            return [b - 1]
                        }),
                        eq: j(function(a, b, c) {
                            return [0 > c ? c + b : c]
                        }),
                        even: j(function(a, b) {
                            for (var c = 0; b > c; c += 2) a.push(c);
                            return a
                        }),
                        odd: j(function(a, b) {
                            for (var c = 1; b > c; c += 2) a.push(c);
                            return a
                        }),
                        lt: j(function(a, b, c) {
                            for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                            return a
                        }),
                        gt: j(function(a, b, c) {
                            for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                            return a
                        })
                    }
                }, w.pseudos.nth = w.pseudos.eq;
                for (u in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) w.pseudos[u] = h(u);
                for (u in {
                        submit: !0,
                        reset: !0
                    }) w.pseudos[u] = i(u);
                return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) {
                    var d, e, f, g, h, i, j, k = S[a + " "];
                    if (k) return c ? 0 : k.slice(0);
                    for (h = a, i = [], j = w.preFilter; h;) {
                        (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                            value: d,
                            type: e[0].replace(ia, " ")
                        }), h = h.slice(d.length));
                        for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                            value: d,
                            type: g,
                            matches: e
                        }), h = h.slice(d.length));
                        if (!d) break
                    }
                    return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
                }, A = b.compile = function(a, b) {
                    var c, d = [],
                        e = [],
                        f = T[a + " "];
                    if (!f) {
                        for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                        f = T(a, t(e, d)), f.selector = a
                    }
                    return f
                }, B = b.select = function(a, b, c, d) {
                    var e, f, g, h, i, j = "function" == typeof a && a,
                        l = !d && z(a = j.selector || a);
                    if (c = c || [], 1 === l.length) {
                        if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                            if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
                            j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                        }
                        for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                            if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                                if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                                break
                            }
                    }
                    return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
                }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function(a) {
                    return 1 & a.compareDocumentPosition(G.createElement("div"))
                }), e(function(a) {
                    return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
                }) || f("type|href|height|width", function(a, b, c) {
                    return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                }), v.attributes && e(function(a) {
                    return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
                }) || f("value", function(a, b, c) {
                    return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
                }), e(function(a) {
                    return null == a.getAttribute("disabled")
                }) || f(ba, function(a, b, c) {
                    var d;
                    return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }), b
            }(a);
            ea.find = ja, ea.expr = ja.selectors, ea.expr[":"] = ea.expr.pseudos, ea.unique = ja.uniqueSort, ea.text = ja.getText, ea.isXMLDoc = ja.isXML, ea.contains = ja.contains;
            var ka = ea.expr.match.needsContext,
                la = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                ma = /^.[^:#\[\.,]*$/;

            ea.filter = function(a, b, c) {
                var d = b[0];
                return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ea.find.matchesSelector(d, a) ? [d] : [] : ea.find.matches(a, ea.grep(b, function(a) {
                    return 1 === a.nodeType
                }))
            }, ea.fn.extend({
                find: function(a) {
                    var b, c = [],
                        d = this,
                        e = d.length;
                    if ("string" != typeof a) return this.pushStack(ea(a).filter(function() {
                        for (b = 0; e > b; b++)
                            if (ea.contains(d[b], this)) return !0
                    }));
                    for (b = 0; e > b; b++) ea.find(a, d[b], c);
                    return c = this.pushStack(e > 1 ? ea.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
                },
                filter: function(a) {
                    return this.pushStack(d(this, a || [], !1))
                },
                not: function(a) {
                    return this.pushStack(d(this, a || [], !0))
                },
                is: function(a) {
                    return !!d(this, "string" == typeof a && ka.test(a) ? ea(a) : a || [], !1).length
                }
            });
            var na, oa = a.document,
                pa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                qa = ea.fn.init = function(a, b) {
                    var c, d;
                    if (!a) return this;
                    if ("string" == typeof a) {
                        if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : pa.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || na).find(a) : this.constructor(b).find(a);
                        if (c[1]) {
                            if (b = b instanceof ea ? b[0] : b, ea.merge(this, ea.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : oa, !0)), la.test(c[1]) && ea.isPlainObject(b))
                                for (c in b) ea.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                            return this
                        }
                        if (d = oa.getElementById(c[2]), d && d.parentNode) {
                            if (d.id !== c[2]) return na.find(a);
                            this.length = 1, this[0] = d
                        }
                        return this.context = oa, this.selector = a, this
                    }
                    return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ea.isFunction(a) ? "undefined" != typeof na.ready ? na.ready(a) : a(ea) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), ea.makeArray(a, this))
                };
            qa.prototype = ea.fn, na = ea(oa);
            var ra = /^(?:parents|prev(?:Until|All))/,
                sa = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            ea.extend({
                dir: function(a, b, c) {
                    for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !ea(e).is(c));) 1 === e.nodeType && d.push(e), e = e[b];
                    return d
                },
                sibling: function(a, b) {
                    for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                    return c
                }
            }), ea.fn.extend({
                has: function(a) {
                    var b, c = ea(a, this),
                        d = c.length;
                    return this.filter(function() {
                        for (b = 0; d > b; b++)
                            if (ea.contains(this, c[b])) return !0
                    })
                },
                closest: function(a, b) {
                    for (var c, d = 0, e = this.length, f = [], g = ka.test(a) || "string" != typeof a ? ea(a, b || this.context) : 0; e > d; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ea.find.matchesSelector(c, a))) {
                                f.push(c);
                                break
                            }
                    return this.pushStack(f.length > 1 ? ea.unique(f) : f)
                },
                index: function(a) {
                    return a ? "string" == typeof a ? ea.inArray(this[0], ea(a)) : ea.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(a, b) {
                    return this.pushStack(ea.unique(ea.merge(this.get(), ea(a, b))))
                },
                addBack: function(a) {
                    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                }
            }), ea.each({
                parent: function(a) {
                    var b = a.parentNode;
                    return b && 11 !== b.nodeType ? b : null
                },
                parents: function(a) {
                    return ea.dir(a, "parentNode")
                },
                parentsUntil: function(a, b, c) {
                    return ea.dir(a, "parentNode", c)
                },
                next: function(a) {
                    return e(a, "nextSibling")
                },
                prev: function(a) {
                    return e(a, "previousSibling")
                },
                nextAll: function(a) {
                    return ea.dir(a, "nextSibling")
                },
                prevAll: function(a) {
                    return ea.dir(a, "previousSibling")
                },
                nextUntil: function(a, b, c) {
                    return ea.dir(a, "nextSibling", c)
                },
                prevUntil: function(a, b, c) {
                    return ea.dir(a, "previousSibling", c)
                },
                siblings: function(a) {
                    return ea.sibling((a.parentNode || {}).firstChild, a)
                },
                children: function(a) {
                    return ea.sibling(a.firstChild)
                },
                contents: function(a) {
                    return ea.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ea.merge([], a.childNodes)
                }
            }, function(a, b) {
                ea.fn[a] = function(c, d) {
                    var e = ea.map(this, b, c);
                    return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ea.filter(d, e)), this.length > 1 && (sa[a] || (e = ea.unique(e)), ra.test(a) && (e = e.reverse())), this.pushStack(e)
                }
            });
            var ta = /\S+/g,
                ua = {};
            ea.Callbacks = function(a) {
                a = "string" == typeof a ? ua[a] || f(a) : ea.extend({}, a);
                var b, c, d, e, g, h, i = [],
                    j = !a.once && [],
                    k = function(f) {
                        for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++)
                            if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                                c = !1;
                                break
                            }
                        b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
                    },
                    l = {
                        add: function() {
                            if (i) {
                                var d = i.length;
                                ! function f(b) {
                                    ea.each(b, function(b, c) {
                                        var d = ea.type(c);
                                        "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                                    })
                                }(arguments), b ? e = i.length : c && (h = d, k(c))
                            }
                            return this
                        },
                        remove: function() {
                            return i && ea.each(arguments, function(a, c) {
                                for (var d;
                                    (d = ea.inArray(c, i, d)) > -1;) i.splice(d, 1), b && (e >= d && e--, g >= d && g--)
                            }), this
                        },
                        has: function(a) {
                            return a ? ea.inArray(a, i) > -1 : !(!i || !i.length)
                        },
                        empty: function() {
                            return i = [], e = 0, this
                        },
                        disable: function() {
                            return i = j = c = void 0, this
                        },
                        disabled: function() {
                            return !i
                        },
                        lock: function() {
                            return j = void 0, c || l.disable(), this
                        },
                        locked: function() {
                            return !j
                        },
                        fireWith: function(a, c) {
                            return !i || d && !j || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? j.push(c) : k(c)), this
                        },
                        fire: function() {
                            return l.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!d
                        }
                    };
                return l
            }, ea.extend({
                Deferred: function(a) {
                    var b = [
                            ["resolve", "done", ea.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", ea.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", ea.Callbacks("memory")]
                        ],
                        c = "pending",
                        d = {
                            state: function() {
                                return c
                            },
                            always: function() {
                                return e.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var a = arguments;
                                return ea.Deferred(function(c) {
                                    ea.each(b, function(b, f) {
                                        var g = ea.isFunction(a[b]) && a[b];
                                        e[f[1]](function() {
                                            var a = g && g.apply(this, arguments);
                                            a && ea.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                        })
                                    }), a = null
                                }).promise()
                            },
                            promise: function(a) {
                                return null != a ? ea.extend(a, d) : d
                            }
                        },
                        e = {};
                    return d.pipe = d.then, ea.each(b, function(a, f) {
                        var g = f[2],
                            h = f[3];
                        d[f[1]] = g.add, h && g.add(function() {
                            c = h
                        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                            return e[f[0] + "With"](this === e ? d : this, arguments), this
                        }, e[f[0] + "With"] = g.fireWith
                    }), d.promise(e), a && a.call(e, e), e
                },
                when: function(a) {
                    var b, c, d, e = 0,
                        f = X.call(arguments),
                        g = f.length,
                        h = 1 !== g || a && ea.isFunction(a.promise) ? g : 0,
                        i = 1 === h ? a : ea.Deferred(),
                        j = function(a, c, d) {
                            return function(e) {
                                c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                            }
                        };
                    if (g > 1)
                        for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && ea.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                    return h || i.resolveWith(d, f), i.promise()
                }
            });
            var va;
            ea.fn.ready = function(a) {
                return ea.ready.promise().done(a), this
            }, ea.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? ea.readyWait++ : ea.ready(!0)
                },
                ready: function(a) {
                    if (a === !0 ? !--ea.readyWait : !ea.isReady) {
                        if (!oa.body) return setTimeout(ea.ready);
                        ea.isReady = !0, a !== !0 && --ea.readyWait > 0 || (va.resolveWith(oa, [ea]), ea.fn.triggerHandler && (ea(oa).triggerHandler("ready"), ea(oa).off("ready")))
                    }
                }
            }), ea.ready.promise = function(b) {
                if (!va)
                    if (va = ea.Deferred(), "complete" === oa.readyState) setTimeout(ea.ready);
                    else if (oa.addEventListener) oa.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1);
                else {
                    oa.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
                    var c = !1;
                    try {
                        c = null == a.frameElement && oa.documentElement
                    } catch (d) {}
                    c && c.doScroll && ! function e() {
                        if (!ea.isReady) {
                            try {
                                c.doScroll("left")
                            } catch (a) {
                                return setTimeout(e, 50)
                            }
                            g(), ea.ready()
                        }
                    }()
                }
                return va.promise(b)
            };
            var wa, xa = "undefined";
            for (wa in ea(ca)) break;
            ca.ownLast = "0" !== wa, ca.inlineBlockNeedsLayout = !1, ea(function() {
                    var a, b, c, d;
                    c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ca.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
                }),
                function() {
                    var a = oa.createElement("div");
                    if (null == ca.deleteExpando) {
                        ca.deleteExpando = !0;
                        try {
                            delete a.test
                        } catch (b) {
                            ca.deleteExpando = !1
                        }
                    }
                    a = null
                }(), ea.acceptData = function(a) {
                    var b = ea.noData[(a.nodeName + " ").toLowerCase()],
                        c = +a.nodeType || 1;
                    return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
                };
            var ya = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                za = /([A-Z])/g;
            ea.extend({
                cache: {},
                noData: {
                    "applet ": !0,
                    "embed ": !0,
                    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },
                hasData: function(a) {
                    return a = a.nodeType ? ea.cache[a[ea.expando]] : a[ea.expando], !!a && !j(a)
                },
                data: function(a, b, c) {
                    return k(a, b, c)
                },
                removeData: function(a, b) {
                    return l(a, b)
                },
                _data: function(a, b, c) {
                    return k(a, b, c, !0)
                },
                _removeData: function(a, b) {
                    return l(a, b, !0)
                }
            }), ea.fn.extend({
                data: function(a, b) {
                    var c, d, e, f = this[0],
                        g = f && f.attributes;
                    if (void 0 === a) {
                        if (this.length && (e = ea.data(f), 1 === f.nodeType && !ea._data(f, "parsedAttrs"))) {
                            for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ea.camelCase(d.slice(5)), i(f, d, e[d])));
                            ea._data(f, "parsedAttrs", !0)
                        }
                        return e
                    }
                    return "object" == typeof a ? this.each(function() {
                        ea.data(this, a)
                    }) : arguments.length > 1 ? this.each(function() {
                        ea.data(this, a, b)
                    }) : f ? i(f, a, ea.data(f, a)) : void 0
                },
                removeData: function(a) {
                    return this.each(function() {
                        ea.removeData(this, a)
                    })
                }
            }), ea.extend({
                queue: function(a, b, c) {
                    var d;
                    return a ? (b = (b || "fx") + "queue", d = ea._data(a, b), c && (!d || ea.isArray(c) ? d = ea._data(a, b, ea.makeArray(c)) : d.push(c)), d || []) : void 0
                },
                dequeue: function(a, b) {
                    b = b || "fx";
                    var c = ea.queue(a, b),
                        d = c.length,
                        e = c.shift(),
                        f = ea._queueHooks(a, b),
                        g = function() {
                            ea.dequeue(a, b)
                        };
                    "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
                },
                _queueHooks: function(a, b) {
                    var c = b + "queueHooks";
                    return ea._data(a, c) || ea._data(a, c, {
                        empty: ea.Callbacks("once memory").add(function() {
                            ea._removeData(a, b + "queue"), ea._removeData(a, c)
                        })
                    })
                }
            }), ea.fn.extend({
                queue: function(a, b) {
                    var c = 2;
                    return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ea.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                        var c = ea.queue(this, a, b);
                        ea._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ea.dequeue(this, a)
                    })
                },
                dequeue: function(a) {
                    return this.each(function() {
                        ea.dequeue(this, a)
                    })
                },
                clearQueue: function(a) {
                    return this.queue(a || "fx", [])
                },
                promise: function(a, b) {
                    var c, d = 1,
                        e = ea.Deferred(),
                        f = this,
                        g = this.length,
                        h = function() {
                            --d || e.resolveWith(f, [f])
                        };
                    for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = ea._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                    return h(), e.promise(b)
                }
            });
            var Aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                Ba = ["Top", "Right", "Bottom", "Left"],
                Ca = function(a, b) {
                    return a = b || a, "none" === ea.css(a, "display") || !ea.contains(a.ownerDocument, a)
                },
                Da = ea.access = function(a, b, c, d, e, f, g) {
                    var h = 0,
                        i = a.length,
                        j = null == c;
                    if ("object" === ea.type(c)) {
                        e = !0;
                        for (h in c) ea.access(a, b, h, c[h], !0, f, g)
                    } else if (void 0 !== d && (e = !0, ea.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                            return j.call(ea(a), c)
                        })), b))
                        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                    return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
                },
                Ea = /^(?:checkbox|radio)$/i;
            ! function() {
                var a = oa.createElement("input"),
                    b = oa.createElement("div"),
                    c = oa.createDocumentFragment();
                if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ca.leadingWhitespace = 3 === b.firstChild.nodeType, ca.tbody = !b.getElementsByTagName("tbody").length, ca.htmlSerialize = !!b.getElementsByTagName("link").length, ca.html5Clone = "<:nav></:nav>" !== oa.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), ca.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", ca.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", ca.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, ca.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
                        ca.noCloneEvent = !1
                    }), b.cloneNode(!0).click()), null == ca.deleteExpando) {
                    ca.deleteExpando = !0;
                    try {
                        delete b.test
                    } catch (d) {
                        ca.deleteExpando = !1
                    }
                }
            }(),
            function() {
                var b, c, d = oa.createElement("div");
                for (b in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    }) c = "on" + b, (ca[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), ca[b + "Bubbles"] = d.attributes[c].expando === !1);
                d = null
            }();
            var Fa = /^(?:input|select|textarea)$/i,
                Ga = /^key/,
                Ha = /^(?:mouse|pointer|contextmenu)|click/,
                Ia = /^(?:focusinfocus|focusoutblur)$/,
                Ja = /^([^.]*)(?:\.(.+)|)$/;
            ea.event = {
                global: {},
                add: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = ea._data(a);
                    if (q) {
                        for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = ea.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) {
                                return typeof ea === xa || a && ea.event.triggered === a.type ? void 0 : ea.event.dispatch.apply(k.elem, arguments)
                            }, k.elem = a), b = (b || "").match(ta) || [""], h = b.length; h--;) f = Ja.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = ea.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = ea.event.special[n] || {}, l = ea.extend({
                            type: n,
                            origType: p,
                            data: d,
                            handler: c,
                            guid: c.guid,
                            selector: e,
                            needsContext: e && ea.expr.match.needsContext.test(e),
                            namespace: o.join(".")
                        }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), ea.event.global[n] = !0);
                        a = null
                    }
                },
                remove: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = ea.hasData(a) && ea._data(a);
                    if (q && (k = q.events)) {
                        for (b = (b || "").match(ta) || [""], j = b.length; j--;)
                            if (h = Ja.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                                for (l = ea.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                                i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ea.removeEvent(a, n, q.handle), delete k[n])
                            } else
                                for (n in k) ea.event.remove(a, n + b[j], c, d, !0);
                        ea.isEmptyObject(k) && (delete q.handle, ea._removeData(a, "events"))
                    }
                },
                trigger: function(b, c, d, e) {
                    var f, g, h, i, j, k, l, m = [d || oa],
                        n = ba.call(b, "type") ? b.type : b,
                        o = ba.call(b, "namespace") ? b.namespace.split(".") : [];
                    if (h = k = d = d || oa, 3 !== d.nodeType && 8 !== d.nodeType && !Ia.test(n + ea.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[ea.expando] ? b : new ea.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : ea.makeArray(c, [b]), j = ea.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                        if (!e && !j.noBubble && !ea.isWindow(d)) {
                            for (i = j.delegateType || n, Ia.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), k = h;
                            k === (d.ownerDocument || oa) && m.push(k.defaultView || k.parentWindow || a)
                        }
                        for (l = 0;
                            (h = m[l++]) && !b.isPropagationStopped();) b.type = l > 1 ? i : j.bindType || n, f = (ea._data(h, "events") || {})[b.type] && ea._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && ea.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                        if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && ea.acceptData(d) && g && d[n] && !ea.isWindow(d)) {
                            k = d[g], k && (d[g] = null), ea.event.triggered = n;
                            try {
                                d[n]()
                            } catch (p) {}
                            ea.event.triggered = void 0, k && (d[g] = k)
                        }
                        return b.result
                    }
                },
                dispatch: function(a) {
                    a = ea.event.fix(a);
                    var b, c, d, e, f, g = [],
                        h = X.call(arguments),
                        i = (ea._data(this, "events") || {})[a.type] || [],
                        j = ea.event.special[a.type] || {};
                    if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                        for (g = ea.event.handlers.call(this, a, i), b = 0;
                            (e = g[b++]) && !a.isPropagationStopped();)
                            for (a.currentTarget = e.elem, f = 0;
                                (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, a.data = d.data, c = ((ea.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
                        return j.postDispatch && j.postDispatch.call(this, a), a.result
                    }
                },
                handlers: function(a, b) {
                    var c, d, e, f, g = [],
                        h = b.delegateCount,
                        i = a.target;
                    if (h && i.nodeType && (!a.button || "click" !== a.type))
                        for (; i != this; i = i.parentNode || this)
                            if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                                for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? ea(c, this).index(i) >= 0 : ea.find(c, this, null, [i]).length), e[c] && e.push(d);
                                e.length && g.push({
                                    elem: i,
                                    handlers: e
                                })
                            }
                    return h < b.length && g.push({
                        elem: this,
                        handlers: b.slice(h)
                    }), g
                },
                fix: function(a) {
                    if (a[ea.expando]) return a;
                    var b, c, d, e = a.type,
                        f = a,
                        g = this.fixHooks[e];
                    for (g || (this.fixHooks[e] = g = Ha.test(e) ? this.mouseHooks : Ga.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ea.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
                    return a.target || (a.target = f.srcElement || oa), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(a, b) {
                        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(a, b) {
                        var c, d, e, f = b.button,
                            g = b.fromElement;
                        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || oa, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== o() && this.focus) try {
                                return this.focus(), !1
                            } catch (a) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === o() && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return ea.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                        },
                        _default: function(a) {
                            return ea.nodeName(a.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(a) {
                            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                },
                simulate: function(a, b, c, d) {
                    var e = ea.extend(new ea.Event, c, {
                        type: a,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    d ? ea.event.trigger(e, null, b) : ea.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
                }
            }, ea.removeEvent = oa.removeEventListener ? function(a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c, !1)
            } : function(a, b, c) {
                var d = "on" + b;
                a.detachEvent && (typeof a[d] === xa && (a[d] = null), a.detachEvent(d, c))
            }, ea.Event = function(a, b) {
                return this instanceof ea.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a, b && ea.extend(this, b), this.timeStamp = a && a.timeStamp || ea.now(), void(this[ea.expando] = !0)) : new ea.Event(a, b)
            }, ea.Event.prototype = {
                isDefaultPrevented: n,
                isPropagationStopped: n,
                isImmediatePropagationStopped: n,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    var a = this.originalEvent;
                    this.isImmediatePropagationStopped = m, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
                }
            }, ea.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(a, b) {
                ea.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function(a) {
                        var c, d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        return (!e || e !== d && !ea.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                    }
                }
            }), ca.submitBubbles || (ea.event.special.submit = {
                setup: function() {
                    return ea.nodeName(this, "form") ? !1 : void ea.event.add(this, "click._submit keypress._submit", function(a) {
                        var b = a.target,
                            c = ea.nodeName(b, "input") || ea.nodeName(b, "button") ? b.form : void 0;
                        c && !ea._data(c, "submitBubbles") && (ea.event.add(c, "submit._submit", function(a) {
                            a._submit_bubble = !0
                        }), ea._data(c, "submitBubbles", !0))
                    })
                },
                postDispatch: function(a) {
                    a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ea.event.simulate("submit", this.parentNode, a, !0))
                },
                teardown: function() {
                    return ea.nodeName(this, "form") ? !1 : void ea.event.remove(this, "._submit")
                }
            }), ca.changeBubbles || (ea.event.special.change = {
                setup: function() {
                    return Fa.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ea.event.add(this, "propertychange._change", function(a) {
                        "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                    }), ea.event.add(this, "click._change", function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1), ea.event.simulate("change", this, a, !0)
                    })), !1) : void ea.event.add(this, "beforeactivate._change", function(a) {
                        var b = a.target;
                        Fa.test(b.nodeName) && !ea._data(b, "changeBubbles") && (ea.event.add(b, "change._change", function(a) {
                            !this.parentNode || a.isSimulated || a.isTrigger || ea.event.simulate("change", this.parentNode, a, !0)
                        }), ea._data(b, "changeBubbles", !0))
                    })
                },
                handle: function(a) {
                    var b = a.target;
                    return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return ea.event.remove(this, "._change"), !Fa.test(this.nodeName)
                }
            }), ca.focusinBubbles || ea.each({
                focus: "focusin",
                blur: "focusout"
            }, function(a, b) {
                var c = function(a) {
                    ea.event.simulate(b, a.target, ea.event.fix(a), !0)
                };
                ea.event.special[b] = {
                    setup: function() {
                        var d = this.ownerDocument || this,
                            e = ea._data(d, b);
                        e || d.addEventListener(a, c, !0), ea._data(d, b, (e || 0) + 1)
                    },
                    teardown: function() {
                        var d = this.ownerDocument || this,
                            e = ea._data(d, b) - 1;
                        e ? ea._data(d, b, e) : (d.removeEventListener(a, c, !0), ea._removeData(d, b))
                    }
                }
            }), ea.fn.extend({
                on: function(a, b, c, d, e) {
                    var f, g;
                    if ("object" == typeof a) {
                        "string" != typeof b && (c = c || b, b = void 0);
                        for (f in a) this.on(f, b, c, a[f], e);
                        return this
                    }
                    if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = n;
                    else if (!d) return this;
                    return 1 === e && (g = d, d = function(a) {
                        return ea().off(a), g.apply(this, arguments)
                    }, d.guid = g.guid || (g.guid = ea.guid++)), this.each(function() {
                        ea.event.add(this, a, d, c, b)
                    })
                },
                one: function(a, b, c, d) {
                    return this.on(a, b, c, d, 1)
                },
                off: function(a, b, c) {
                    var d, e;
                    if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ea(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                    if ("object" == typeof a) {
                        for (e in a) this.off(e, b, a[e]);
                        return this
                    }
                    return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), this.each(function() {
                        ea.event.remove(this, a, c, b)
                    })
                },
                trigger: function(a, b) {
                    return this.each(function() {
                        ea.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function(a, b) {
                    var c = this[0];
                    return c ? ea.event.trigger(a, b, c, !0) : void 0
                }
            });
            var Ka = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                La = / jQuery\d+="(?:null|\d+)"/g,
                Ma = new RegExp("<(?:" + Ka + ")[\\s/>]", "i"),
                Na = /^\s+/,
                Oa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                Pa = /<([\w:]+)/,
                Qa = /<tbody/i,
                Ra = /<|&#?\w+;/,
                Sa = /<(?:script|style|link)/i,
                Ta = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Ua = /^$|\/(?:java|ecma)script/i,
                Va = /^true\/(.*)/,
                Wa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                Xa = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    area: [1, "<map>", "</map>"],
                    param: [1, "<object>", "</object>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: ca.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                },
                Ya = p(oa),
                Za = Ya.appendChild(oa.createElement("div"));
            Xa.optgroup = Xa.option, Xa.tbody = Xa.tfoot = Xa.colgroup = Xa.caption = Xa.thead, Xa.th = Xa.td, ea.extend({
                clone: function(a, b, c) {
                    var d, e, f, g, h, i = ea.contains(a.ownerDocument, a);
                    if (ca.html5Clone || ea.isXMLDoc(a) || !Ma.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Za.innerHTML = a.outerHTML, Za.removeChild(f = Za.firstChild)), !(ca.noCloneEvent && ca.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ea.isXMLDoc(a)))
                        for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
                    if (b)
                        if (c)
                            for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]);
                        else w(a, f);
                    return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, f
                },
                buildFragment: function(a, b, c, d) {
                    for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)
                        if (f = a[o], f || 0 === f)
                            if ("object" === ea.type(f)) ea.merge(n, f.nodeType ? [f] : f);
                            else if (Ra.test(f)) {
                        for (h = h || m.appendChild(b.createElement("div")), i = (Pa.exec(f) || ["", ""])[1].toLowerCase(), k = Xa[i] || Xa._default, h.innerHTML = k[1] + f.replace(Oa, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild;
                        if (!ca.leadingWhitespace && Na.test(f) && n.push(b.createTextNode(Na.exec(f)[0])), !ca.tbody)
                            for (f = "table" !== i || Qa.test(f) ? "<table>" !== k[1] || Qa.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;) ea.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                        for (ea.merge(n, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                        h = m.lastChild
                    } else n.push(b.createTextNode(f));
                    for (h && m.removeChild(h), ca.appendChecked || ea.grep(q(n, "input"), r), o = 0; f = n[o++];)
                        if ((!d || -1 === ea.inArray(f, d)) && (g = ea.contains(f.ownerDocument, f), h = q(m.appendChild(f), "script"), g && v(h), c))
                            for (e = 0; f = h[e++];) Ua.test(f.type || "") && c.push(f);
                    return h = null, m
                },
                cleanData: function(a, b) {
                    for (var c, d, e, f, g = 0, h = ea.expando, i = ea.cache, j = ca.deleteExpando, k = ea.event.special; null != (c = a[g]); g++)
                        if ((b || ea.acceptData(c)) && (e = c[h], f = e && i[e])) {
                            if (f.events)
                                for (d in f.events) k[d] ? ea.event.remove(c, d) : ea.removeEvent(c, d, f.handle);
                            i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xa ? c.removeAttribute(h) : c[h] = null, W.push(e))
                        }
                }
            }), ea.fn.extend({
                text: function(a) {
                    return Da(this, function(a) {
                        return void 0 === a ? ea.text(this) : this.empty().append((this[0] && this[0].ownerDocument || oa).createTextNode(a))
                    }, null, a, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments, function(a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = s(this, a);
                            b.appendChild(a)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, function(a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = s(this, a);
                            b.insertBefore(a, b.firstChild)
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                    })
                },
                remove: function(a, b) {
                    for (var c, d = a ? ea.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || ea.cleanData(q(c)), c.parentNode && (b && ea.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
                    return this
                },
                empty: function() {
                    for (var a, b = 0; null != (a = this[b]); b++) {
                        for (1 === a.nodeType && ea.cleanData(q(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                        a.options && ea.nodeName(a, "select") && (a.options.length = 0)
                    }
                    return this
                },
                clone: function(a, b) {
                    return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                        return ea.clone(this, a, b)
                    })
                },
                html: function(a) {
                    return Da(this, function(a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(La, "") : void 0;
                        if (!("string" != typeof a || Sa.test(a) || !ca.htmlSerialize && Ma.test(a) || !ca.leadingWhitespace && Na.test(a) || Xa[(Pa.exec(a) || ["", ""])[1].toLowerCase()])) {
                            a = a.replace(Oa, "<$1></$2>");
                            try {
                                for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (ea.cleanData(q(b, !1)), b.innerHTML = a);
                                b = 0
                            } catch (e) {}
                        }
                        b && this.empty().append(a)
                    }, null, a, arguments.length)
                },
                replaceWith: function() {
                    var a = arguments[0];
                    return this.domManip(arguments, function(b) {
                        a = this.parentNode, ea.cleanData(q(this)), a && a.replaceChild(b, this)
                    }), a && (a.length || a.nodeType) ? this : this.remove()
                },
                detach: function(a) {
                    return this.remove(a, !0)
                },
                domManip: function(a, b) {
                    a = Y.apply([], a);
                    var c, d, e, f, g, h, i = 0,
                        j = this.length,
                        k = this,
                        l = j - 1,
                        m = a[0],
                        n = ea.isFunction(m);
                    if (n || j > 1 && "string" == typeof m && !ca.checkClone && Ta.test(m)) return this.each(function(c) {
                        var d = k.eq(c);
                        n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
                    });
                    if (j && (h = ea.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 1 === h.childNodes.length && (h = c), c)) {
                        for (f = ea.map(q(h, "script"), t), e = f.length; j > i; i++) d = h, i !== l && (d = ea.clone(d, !0, !0), e && ea.merge(f, q(d, "script"))), b.call(this[i], d, i);
                        if (e)
                            for (g = f[f.length - 1].ownerDocument, ea.map(f, u), i = 0; e > i; i++) d = f[i], Ua.test(d.type || "") && !ea._data(d, "globalEval") && ea.contains(g, d) && (d.src ? ea._evalUrl && ea._evalUrl(d.src) : ea.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wa, "")));
                        h = c = null
                    }
                    return this
                }
            }), ea.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(a, b) {
                ea.fn[a] = function(a) {
                    for (var c, d = 0, e = [], f = ea(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), ea(f[d])[b](c), Z.apply(e, c.get());
                    return this.pushStack(e)
                }
            });
            var $a, _a = {};
            ! function() {
                var a;
                ca.shrinkWrapBlocks = function() {
                    if (null != a) return a;
                    a = !1;
                    var b, c, d;
                    return c = oa.getElementsByTagName("body")[0], c && c.style ? (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(oa.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
                }
            }();
            var ab, bb, cb = /^margin/,
                db = new RegExp("^(" + Aa + ")(?!px)[a-z%]+$", "i"),
                eb = /^(top|right|bottom|left)$/;
            a.getComputedStyle ? (ab = function(b) {
                    return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
                }, bb = function(a, b, c) {
                    var d, e, f, g, h = a.style;
                    return c = c || ab(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || ea.contains(a.ownerDocument, a) || (g = ea.style(a, b)), db.test(g) && cb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
                }) : oa.documentElement.currentStyle && (ab = function(a) {
                    return a.currentStyle
                }, bb = function(a, b, c) {
                    var d, e, f, g, h = a.style;
                    return c = c || ab(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), db.test(g) && !eb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
                }),
                function() {
                    function b() {
                        var b, c, d, e;
                        c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f = g = !1, i = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null) || {}).top, g = "4px" === (a.getComputedStyle(b, null) || {
                            width: "4px"
                        }).width, e = b.appendChild(oa.createElement("div")), e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", b.style.width = "1px", i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), b.removeChild(e)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = b.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", h = 0 === e[0].offsetHeight, h && (e[0].style.display = "", e[1].style.display = "none", h = 0 === e[0].offsetHeight), c.removeChild(d))
                    }
                    var c, d, e, f, g, h, i;
                    c = oa.createElement("div"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = c.getElementsByTagName("a")[0], d = e && e.style, d && (d.cssText = "float:left;opacity:.5", ca.opacity = "0.5" === d.opacity, ca.cssFloat = !!d.cssFloat, c.style.backgroundClip = "content-box",
                        c.cloneNode(!0).style.backgroundClip = "", ca.clearCloneStyle = "content-box" === c.style.backgroundClip, ca.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing, ea.extend(ca, {
                            reliableHiddenOffsets: function() {
                                return null == h && b(), h
                            },
                            boxSizingReliable: function() {
                                return null == g && b(), g
                            },
                            pixelPosition: function() {
                                return null == f && b(), f
                            },
                            reliableMarginRight: function() {
                                return null == i && b(), i
                            }
                        }))
                }(), ea.swap = function(a, b, c, d) {
                    var e, f, g = {};
                    for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                    e = c.apply(a, d || []);
                    for (f in b) a.style[f] = g[f];
                    return e
                };
            var fb = /alpha\([^)]*\)/i,
                gb = /opacity\s*=\s*([^)]*)/,
                hb = /^(none|table(?!-c[ea]).+)/,
                ib = new RegExp("^(" + Aa + ")(.*)$", "i"),
                jb = new RegExp("^([+-])=(" + Aa + ")", "i"),
                kb = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                lb = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                mb = ["Webkit", "O", "Moz", "ms"];
            ea.extend({
                cssHooks: {
                    opacity: {
                        get: function(a, b) {
                            if (b) {
                                var c = bb(a, "opacity");
                                return "" === c ? "1" : c
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": ca.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(a, b, c, d) {
                    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                        var e, f, g, h = ea.camelCase(b),
                            i = a.style;
                        if (b = ea.cssProps[h] || (ea.cssProps[h] = B(i, h)), g = ea.cssHooks[b] || ea.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                        if (f = typeof c, "string" === f && (e = jb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(ea.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || ea.cssNumber[h] || (c += "px"), ca.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                            i[b] = c
                        } catch (j) {}
                    }
                },
                css: function(a, b, c, d) {
                    var e, f, g, h = ea.camelCase(b);
                    return b = ea.cssProps[h] || (ea.cssProps[h] = B(a.style, h)), g = ea.cssHooks[b] || ea.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = bb(a, b, d)), "normal" === f && b in lb && (f = lb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || ea.isNumeric(e) ? e || 0 : f) : f
                }
            }), ea.each(["height", "width"], function(a, b) {
                ea.cssHooks[b] = {
                    get: function(a, c, d) {
                        return c ? hb.test(ea.css(a, "display")) && 0 === a.offsetWidth ? ea.swap(a, kb, function() {
                            return F(a, b, d)
                        }) : F(a, b, d) : void 0
                    },
                    set: function(a, c, d) {
                        var e = d && ab(a);
                        return D(a, c, d ? E(a, b, d, ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, e), e) : 0)
                    }
                }
            }), ca.opacity || (ea.cssHooks.opacity = {
                get: function(a, b) {
                    return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
                },
                set: function(a, b) {
                    var c = a.style,
                        d = a.currentStyle,
                        e = ea.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                        f = d && d.filter || c.filter || "";
                    c.zoom = 1, (b >= 1 || "" === b) && "" === ea.trim(f.replace(fb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = fb.test(f) ? f.replace(fb, e) : f + " " + e)
                }
            }), ea.cssHooks.marginRight = A(ca.reliableMarginRight, function(a, b) {
                return b ? ea.swap(a, {
                    display: "inline-block"
                }, bb, [a, "marginRight"]) : void 0
            }), ea.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(a, b) {
                ea.cssHooks[a + b] = {
                    expand: function(c) {
                        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + Ba[d] + b] = f[d] || f[d - 2] || f[0];
                        return e
                    }
                }, cb.test(a) || (ea.cssHooks[a + b].set = D)
            }), ea.fn.extend({
                css: function(a, b) {
                    return Da(this, function(a, b, c) {
                        var d, e, f = {},
                            g = 0;
                        if (ea.isArray(b)) {
                            for (d = ab(a), e = b.length; e > g; g++) f[b[g]] = ea.css(a, b[g], !1, d);
                            return f
                        }
                        return void 0 !== c ? ea.style(a, b, c) : ea.css(a, b)
                    }, a, b, arguments.length > 1)
                },
                show: function() {
                    return C(this, !0)
                },
                hide: function() {
                    return C(this)
                },
                toggle: function(a) {
                    return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                        Ca(this) ? ea(this).show() : ea(this).hide()
                    })
                }
            }), ea.Tween = G, G.prototype = {
                constructor: G,
                init: function(a, b, c, d, e, f) {
                    this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ea.cssNumber[c] ? "" : "px")
                },
                cur: function() {
                    var a = G.propHooks[this.prop];
                    return a && a.get ? a.get(this) : G.propHooks._default.get(this)
                },
                run: function(a) {
                    var b, c = G.propHooks[this.prop];
                    return this.pos = b = this.options.duration ? ea.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : G.propHooks._default.set(this), this
                }
            }, G.prototype.init.prototype = G.prototype, G.propHooks = {
                _default: {
                    get: function(a) {
                        var b;
                        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ea.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                    },
                    set: function(a) {
                        ea.fx.step[a.prop] ? ea.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ea.cssProps[a.prop]] || ea.cssHooks[a.prop]) ? ea.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                    }
                }
            }, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
                set: function(a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                }
            }, ea.easing = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return .5 - Math.cos(a * Math.PI) / 2
                }
            }, ea.fx = G.prototype.init, ea.fx.step = {};
            var nb, ob, pb = /^(?:toggle|show|hide)$/,
                qb = new RegExp("^(?:([+-])=|)(" + Aa + ")([a-z%]*)$", "i"),
                rb = /queueHooks$/,
                sb = [K],
                tb = {
                    "*": [function(a, b) {
                        var c = this.createTween(a, b),
                            d = c.cur(),
                            e = qb.exec(b),
                            f = e && e[3] || (ea.cssNumber[a] ? "" : "px"),
                            g = (ea.cssNumber[a] || "px" !== f && +d) && qb.exec(ea.css(c.elem, a)),
                            h = 1,
                            i = 20;
                        if (g && g[3] !== f) {
                            f = f || g[3], e = e || [], g = +d || 1;
                            do h = h || ".5", g /= h, ea.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                        }
                        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
                    }]
                };
            ea.Animation = ea.extend(M, {
                    tweener: function(a, b) {
                        ea.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                        for (var c, d = 0, e = a.length; e > d; d++) c = a[d], tb[c] = tb[c] || [], tb[c].unshift(b)
                    },
                    prefilter: function(a, b) {
                        b ? sb.unshift(a) : sb.push(a)
                    }
                }), ea.speed = function(a, b, c) {
                    var d = a && "object" == typeof a ? ea.extend({}, a) : {
                        complete: c || !c && b || ea.isFunction(a) && a,
                        duration: a,
                        easing: c && b || b && !ea.isFunction(b) && b
                    };
                    return d.duration = ea.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ea.fx.speeds ? ea.fx.speeds[d.duration] : ea.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                        ea.isFunction(d.old) && d.old.call(this), d.queue && ea.dequeue(this, d.queue)
                    }, d
                }, ea.fn.extend({
                    fadeTo: function(a, b, c, d) {
                        return this.filter(Ca).css("opacity", 0).show().end().animate({
                            opacity: b
                        }, a, c, d)
                    },
                    animate: function(a, b, c, d) {
                        var e = ea.isEmptyObject(a),
                            f = ea.speed(b, c, d),
                            g = function() {
                                var b = M(this, ea.extend({}, a), f);
                                (e || ea._data(this, "finish")) && b.stop(!0)
                            };
                        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                    },
                    stop: function(a, b, c) {
                        var d = function(a) {
                            var b = a.stop;
                            delete a.stop, b(c)
                        };
                        return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                            var b = !0,
                                e = null != a && a + "queueHooks",
                                f = ea.timers,
                                g = ea._data(this);
                            if (e) g[e] && g[e].stop && d(g[e]);
                            else
                                for (e in g) g[e] && g[e].stop && rb.test(e) && d(g[e]);
                            for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                            (b || !c) && ea.dequeue(this, a)
                        })
                    },
                    finish: function(a) {
                        return a !== !1 && (a = a || "fx"), this.each(function() {
                            var b, c = ea._data(this),
                                d = c[a + "queue"],
                                e = c[a + "queueHooks"],
                                f = ea.timers,
                                g = d ? d.length : 0;
                            for (c.finish = !0, ea.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                            for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                            delete c.finish
                        })
                    }
                }), ea.each(["toggle", "show", "hide"], function(a, b) {
                    var c = ea.fn[b];
                    ea.fn[b] = function(a, d, e) {
                        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e)
                    }
                }), ea.each({
                    slideDown: I("show"),
                    slideUp: I("hide"),
                    slideToggle: I("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(a, b) {
                    ea.fn[a] = function(a, c, d) {
                        return this.animate(b, a, c, d)
                    }
                }), ea.timers = [], ea.fx.tick = function() {
                    var a, b = ea.timers,
                        c = 0;
                    for (nb = ea.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
                    b.length || ea.fx.stop(), nb = void 0
                }, ea.fx.timer = function(a) {
                    ea.timers.push(a), a() ? ea.fx.start() : ea.timers.pop()
                }, ea.fx.interval = 13, ea.fx.start = function() {
                    ob || (ob = setInterval(ea.fx.tick, ea.fx.interval))
                }, ea.fx.stop = function() {
                    clearInterval(ob), ob = null
                }, ea.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, ea.fn.delay = function(a, b) {
                    return a = ea.fx ? ea.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                        var d = setTimeout(b, a);
                        c.stop = function() {
                            clearTimeout(d)
                        }
                    })
                },
                function() {
                    var a, b, c, d, e;
                    b = oa.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = oa.createElement("select"), e = c.appendChild(oa.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", ca.getSetAttribute = "t" !== b.className, ca.style = /top/.test(d.getAttribute("style")), ca.hrefNormalized = "/a" === d.getAttribute("href"), ca.checkOn = !!a.value, ca.optSelected = e.selected, ca.enctype = !!oa.createElement("form").enctype, c.disabled = !0, ca.optDisabled = !e.disabled, a = oa.createElement("input"), a.setAttribute("value", ""), ca.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), ca.radioValue = "t" === a.value
                }();
            var ub = /\r/g;
            ea.fn.extend({
                val: function(a) {
                    var b, c, d, e = this[0]; {
                        if (arguments.length) return d = ea.isFunction(a), this.each(function(c) {
                            var e;
                            1 === this.nodeType && (e = d ? a.call(this, c, ea(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ea.isArray(e) && (e = ea.map(e, function(a) {
                                return null == a ? "" : a + ""
                            })), b = ea.valHooks[this.type] || ea.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                        });
                        if (e) return b = ea.valHooks[e.type] || ea.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c)
                    }
                }
            }), ea.extend({
                valHooks: {
                    option: {
                        get: function(a) {
                            var b = ea.find.attr(a, "value");
                            return null != b ? b : ea.trim(ea.text(a))
                        }
                    },
                    select: {
                        get: function(a) {
                            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                                if (c = d[i], !(!c.selected && i !== e || (ca.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ea.nodeName(c.parentNode, "optgroup"))) {
                                    if (b = ea(c).val(), f) return b;
                                    g.push(b)
                                }
                            return g
                        },
                        set: function(a, b) {
                            for (var c, d, e = a.options, f = ea.makeArray(b), g = e.length; g--;)
                                if (d = e[g], ea.inArray(ea.valHooks.option.get(d), f) >= 0) try {
                                    d.selected = c = !0
                                } catch (h) {
                                    d.scrollHeight
                                } else d.selected = !1;
                            return c || (a.selectedIndex = -1), e
                        }
                    }
                }
            }), ea.each(["radio", "checkbox"], function() {
                ea.valHooks[this] = {
                    set: function(a, b) {
                        return ea.isArray(b) ? a.checked = ea.inArray(ea(a).val(), b) >= 0 : void 0
                    }
                }, ca.checkOn || (ea.valHooks[this].get = function(a) {
                    return null === a.getAttribute("value") ? "on" : a.value
                })
            });
            var vb, wb, xb = ea.expr.attrHandle,
                yb = /^(?:checked|selected)$/i,
                zb = ca.getSetAttribute,
                Ab = ca.input;
            ea.fn.extend({
                attr: function(a, b) {
                    return Da(this, ea.attr, a, b, arguments.length > 1)
                },
                removeAttr: function(a) {
                    return this.each(function() {
                        ea.removeAttr(this, a)
                    })
                }
            }), ea.extend({
                attr: function(a, b, c) {
                    var d, e, f = a.nodeType;
                    if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === xa ? ea.prop(a, b, c) : (1 === f && ea.isXMLDoc(a) || (b = b.toLowerCase(), d = ea.attrHooks[b] || (ea.expr.match.bool.test(b) ? wb : vb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = ea.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void ea.removeAttr(a, b))
                },
                removeAttr: function(a, b) {
                    var c, d, e = 0,
                        f = b && b.match(ta);
                    if (f && 1 === a.nodeType)
                        for (; c = f[e++];) d = ea.propFix[c] || c, ea.expr.match.bool.test(c) ? Ab && zb || !yb.test(c) ? a[d] = !1 : a[ea.camelCase("default-" + c)] = a[d] = !1 : ea.attr(a, c, ""), a.removeAttribute(zb ? c : d)
                },
                attrHooks: {
                    type: {
                        set: function(a, b) {
                            if (!ca.radioValue && "radio" === b && ea.nodeName(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b), c && (a.value = c), b
                            }
                        }
                    }
                }
            }), wb = {
                set: function(a, b, c) {
                    return b === !1 ? ea.removeAttr(a, c) : Ab && zb || !yb.test(c) ? a.setAttribute(!zb && ea.propFix[c] || c, c) : a[ea.camelCase("default-" + c)] = a[c] = !0, c
                }
            }, ea.each(ea.expr.match.bool.source.match(/\w+/g), function(a, b) {
                var c = xb[b] || ea.find.attr;
                xb[b] = Ab && zb || !yb.test(b) ? function(a, b, d) {
                    var e, f;
                    return d || (f = xb[b], xb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, xb[b] = f), e
                } : function(a, b, c) {
                    return c ? void 0 : a[ea.camelCase("default-" + b)] ? b.toLowerCase() : null
                }
            }), Ab && zb || (ea.attrHooks.value = {
                set: function(a, b, c) {
                    return ea.nodeName(a, "input") ? void(a.defaultValue = b) : vb && vb.set(a, b, c)
                }
            }), zb || (vb = {
                set: function(a, b, c) {
                    var d = a.getAttributeNode(c);
                    return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
                }
            }, xb.id = xb.name = xb.coords = function(a, b, c) {
                var d;
                return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
            }, ea.valHooks.button = {
                get: function(a, b) {
                    var c = a.getAttributeNode(b);
                    return c && c.specified ? c.value : void 0
                },
                set: vb.set
            }, ea.attrHooks.contenteditable = {
                set: function(a, b, c) {
                    vb.set(a, "" === b ? !1 : b, c)
                }
            }, ea.each(["width", "height"], function(a, b) {
                ea.attrHooks[b] = {
                    set: function(a, c) {
                        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
                    }
                }
            })), ca.style || (ea.attrHooks.style = {
                get: function(a) {
                    return a.style.cssText || void 0
                },
                set: function(a, b) {
                    return a.style.cssText = b + ""
                }
            });
            var Bb = /^(?:input|select|textarea|button|object)$/i,
                Cb = /^(?:a|area)$/i;
            ea.fn.extend({
                prop: function(a, b) {
                    return Da(this, ea.prop, a, b, arguments.length > 1)
                },
                removeProp: function(a) {
                    return a = ea.propFix[a] || a, this.each(function() {
                        try {
                            this[a] = void 0, delete this[a]
                        } catch (b) {}
                    })
                }
            }), ea.extend({
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(a, b, c) {
                    var d, e, f, g = a.nodeType;
                    if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !ea.isXMLDoc(a), f && (b = ea.propFix[b] || b, e = ea.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                },
                propHooks: {
                    tabIndex: {
                        get: function(a) {
                            var b = ea.find.attr(a, "tabindex");
                            return b ? parseInt(b, 10) : Bb.test(a.nodeName) || Cb.test(a.nodeName) && a.href ? 0 : -1
                        }
                    }
                }
            }), ca.hrefNormalized || ea.each(["href", "src"], function(a, b) {
                ea.propHooks[b] = {
                    get: function(a) {
                        return a.getAttribute(b, 4)
                    }
                }
            }), ca.optSelected || (ea.propHooks.selected = {
                get: function(a) {
                    var b = a.parentNode;
                    return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
                }
            }), ea.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                ea.propFix[this.toLowerCase()] = this
            }), ca.enctype || (ea.propFix.enctype = "encoding");
            var Db = /[\t\r\n\f]/g;
            ea.fn.extend({
                addClass: function(a) {
                    var b, c, d, e, f, g, h = 0,
                        i = this.length,
                        j = "string" == typeof a && a;
                    if (ea.isFunction(a)) return this.each(function(b) {
                        ea(this).addClass(a.call(this, b, this.className))
                    });
                    if (j)
                        for (b = (a || "").match(ta) || []; i > h; h++)
                            if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : " ")) {
                                for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                                g = ea.trim(d), c.className !== g && (c.className = g)
                            }
                    return this
                },
                removeClass: function(a) {
                    var b, c, d, e, f, g, h = 0,
                        i = this.length,
                        j = 0 === arguments.length || "string" == typeof a && a;
                    if (ea.isFunction(a)) return this.each(function(b) {
                        ea(this).removeClass(a.call(this, b, this.className))
                    });
                    if (j)
                        for (b = (a || "").match(ta) || []; i > h; h++)
                            if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : "")) {
                                for (f = 0; e = b[f++];)
                                    for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                                g = a ? ea.trim(d) : "", c.className !== g && (c.className = g)
                            }
                    return this
                },
                toggleClass: function(a, b) {
                    var c = typeof a;
                    return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(ea.isFunction(a) ? function(c) {
                        ea(this).toggleClass(a.call(this, c, this.className, b), b)
                    } : function() {
                        if ("string" === c)
                            for (var b, d = 0, e = ea(this), f = a.match(ta) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                        else(c === xa || "boolean" === c) && (this.className && ea._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ea._data(this, "__className__") || "")
                    })
                },
                hasClass: function(a) {
                    for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Db, " ").indexOf(b) >= 0) return !0;
                    return !1
                }
            }), ea.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
                ea.fn[b] = function(a, c) {
                    return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                }
            }), ea.fn.extend({
                hover: function(a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                },
                bind: function(a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function(a, b) {
                    return this.off(a, null, b)
                },
                delegate: function(a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function(a, b, c) {
                    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                }
            });
            var Eb = ea.now(),
                Fb = /\?/,
                Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            ea.parseJSON = function(b) {
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
                var c, d = null,
                    e = ea.trim(b + "");
                return e && !ea.trim(e.replace(Gb, function(a, b, e, f) {
                    return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
                })) ? Function("return " + e)() : ea.error("Invalid JSON: " + b)
            }, ea.parseXML = function(b) {
                var c, d;
                if (!b || "string" != typeof b) return null;
                try {
                    a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
                } catch (e) {
                    c = void 0
                }
                return c && c.documentElement && !c.getElementsByTagName("parsererror").length || ea.error("Invalid XML: " + b), c
            };
            var Hb, Ib, Jb = /#.*$/,
                Kb = /([?&])_=[^&]*/,
                Lb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                Mb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                Nb = /^(?:GET|HEAD)$/,
                Ob = /^\/\//,
                Pb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                Qb = {},
                Rb = {},
                Sb = "*/".concat("*");
            try {
                Ib = location.href
            } catch (Tb) {
                Ib = oa.createElement("a"), Ib.href = "", Ib = Ib.href
            }
            Hb = Pb.exec(Ib.toLowerCase()) || [], ea.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Ib,
                    type: "GET",
                    isLocal: Mb.test(Hb[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Sb,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": ea.parseJSON,
                        "text xml": ea.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(a, b) {
                    return b ? P(P(a, ea.ajaxSettings), b) : P(ea.ajaxSettings, a)
                },
                ajaxPrefilter: N(Qb),
                ajaxTransport: N(Rb),
                ajax: function(a, b) {
                    function c(a, b, c, d) {
                        var e, k, r, s, u, w = b;
                        2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (ea.lastModified[f] = u), u = v.getResponseHeader("etag"), u && (ea.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]), p.fireWith(m, [v, w]), i && (n.trigger("ajaxComplete", [v, l]), --ea.active || ea.event.trigger("ajaxStop")))
                    }
                    "object" == typeof a && (b = a, a = void 0), b = b || {};
                    var d, e, f, g, h, i, j, k, l = ea.ajaxSetup({}, b),
                        m = l.context || l,
                        n = l.context && (m.nodeType || m.jquery) ? ea(m) : ea.event,
                        o = ea.Deferred(),
                        p = ea.Callbacks("once memory"),
                        q = l.statusCode || {},
                        r = {},
                        s = {},
                        t = 0,
                        u = "canceled",
                        v = {
                            readyState: 0,
                            getResponseHeader: function(a) {
                                var b;
                                if (2 === t) {
                                    if (!k)
                                        for (k = {}; b = Lb.exec(g);) k[b[1].toLowerCase()] = b[2];
                                    b = k[a.toLowerCase()]
                                }
                                return null == b ? null : b
                            },
                            getAllResponseHeaders: function() {
                                return 2 === t ? g : null
                            },
                            setRequestHeader: function(a, b) {
                                var c = a.toLowerCase();
                                return t || (a = s[c] = s[c] || a, r[a] = b), this
                            },
                            overrideMimeType: function(a) {
                                return t || (l.mimeType = a), this
                            },
                            statusCode: function(a) {
                                var b;
                                if (a)
                                    if (2 > t)
                                        for (b in a) q[b] = [q[b], a[b]];
                                    else v.always(a[v.status]);
                                return this
                            },
                            abort: function(a) {
                                var b = a || u;
                                return j && j.abort(b), c(0, b), this
                            }
                        };
                    if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Ib) + "").replace(Jb, "").replace(Ob, Hb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = ea.trim(l.dataType || "*").toLowerCase().match(ta) || [""], null == l.crossDomain && (d = Pb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Hb[1] && d[2] === Hb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hb[3] || ("http:" === Hb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = ea.param(l.data, l.traditional)), O(Qb, l, b, v), 2 === t) return v;
                    i = ea.event && l.global, i && 0 === ea.active++ && ea.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Nb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Kb.test(f) ? f.replace(Kb, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), l.ifModified && (ea.lastModified[f] && v.setRequestHeader("If-Modified-Since", ea.lastModified[f]), ea.etag[f] && v.setRequestHeader("If-None-Match", ea.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sb + "; q=0.01" : "") : l.accepts["*"]);
                    for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
                    if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
                    u = "abort";
                    for (e in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) v[e](l[e]);
                    if (j = O(Rb, l, b, v)) {
                        v.readyState = 1, i && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                            v.abort("timeout")
                        }, l.timeout));
                        try {
                            t = 1, j.send(r, c)
                        } catch (w) {
                            if (!(2 > t)) throw w;
                            c(-1, w)
                        }
                    } else c(-1, "No Transport");
                    return v
                },
                getJSON: function(a, b, c) {
                    return ea.get(a, b, c, "json")
                },
                getScript: function(a, b) {
                    return ea.get(a, void 0, b, "script")
                }
            }), ea.each(["get", "post"], function(a, b) {
                ea[b] = function(a, c, d, e) {
                    return ea.isFunction(c) && (e = e || d, d = c, c = void 0), ea.ajax({
                        url: a,
                        type: b,
                        dataType: e,
                        data: c,
                        success: d
                    })
                }
            }), ea._evalUrl = function(a) {
                return ea.ajax({
                    url: a,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, ea.fn.extend({
                wrapAll: function(a) {
                    if (ea.isFunction(a)) return this.each(function(b) {
                        ea(this).wrapAll(a.call(this, b))
                    });
                    if (this[0]) {
                        var b = ea(a, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                            for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                            return a
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(a) {
                    return this.each(ea.isFunction(a) ? function(b) {
                        ea(this).wrapInner(a.call(this, b))
                    } : function() {
                        var b = ea(this),
                            c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function(a) {
                    var b = ea.isFunction(a);
                    return this.each(function(c) {
                        ea(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        ea.nodeName(this, "body") || ea(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), ea.expr.filters.hidden = function(a) {
                return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !ca.reliableHiddenOffsets() && "none" === (a.style && a.style.display || ea.css(a, "display"))
            }, ea.expr.filters.visible = function(a) {
                return !ea.expr.filters.hidden(a)
            };
            var Ub = /%20/g,
                Vb = /\[\]$/,
                Wb = /\r?\n/g,
                Xb = /^(?:submit|button|image|reset|file)$/i,
                Yb = /^(?:input|select|textarea|keygen)/i;
            ea.param = function(a, b) {
                var c, d = [],
                    e = function(a, b) {
                        b = ea.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                if (void 0 === b && (b = ea.ajaxSettings && ea.ajaxSettings.traditional), ea.isArray(a) || a.jquery && !ea.isPlainObject(a)) ea.each(a, function() {
                    e(this.name, this.value)
                });
                else
                    for (c in a) S(c, a[c], b, e);
                return d.join("&").replace(Ub, "+")
            }, ea.fn.extend({
                serialize: function() {
                    return ea.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var a = ea.prop(this, "elements");
                        return a ? ea.makeArray(a) : this
                    }).filter(function() {
                        var a = this.type;
                        return this.name && !ea(this).is(":disabled") && Yb.test(this.nodeName) && !Xb.test(a) && (this.checked || !Ea.test(a))
                    }).map(function(a, b) {
                        var c = ea(this).val();
                        return null == c ? null : ea.isArray(c) ? ea.map(c, function(a) {
                            return {
                                name: b.name,
                                value: a.replace(Wb, "\r\n")
                            }
                        }) : {
                            name: b.name,
                            value: c.replace(Wb, "\r\n")
                        }
                    }).get()
                }
            }), ea.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
                return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U()
            } : T;
            var Zb = 0,
                $b = {},
                _b = ea.ajaxSettings.xhr();
            a.attachEvent && a.attachEvent("onunload", function() {
                for (var a in $b) $b[a](void 0, !0)
            }), ca.cors = !!_b && "withCredentials" in _b, _b = ca.ajax = !!_b, _b && ea.ajaxTransport(function(a) {
                if (!a.crossDomain || ca.cors) {
                    var b;
                    return {
                        send: function(c, d) {
                            var e, f = a.xhr(),
                                g = ++Zb;
                            if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                                for (e in a.xhrFields) f[e] = a.xhrFields[e];
                            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                            for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                            f.send(a.hasContent && a.data || null), b = function(c, e) {
                                var h, i, j;
                                if (b && (e || 4 === f.readyState))
                                    if (delete $b[g], b = void 0, f.onreadystatechange = ea.noop, e) 4 !== f.readyState && f.abort();
                                    else {
                                        j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                        try {
                                            i = f.statusText
                                        } catch (k) {
                                            i = ""
                                        }
                                        h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                                    }
                                j && d(h, i, j, f.getAllResponseHeaders())
                            }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = $b[g] = b : b()
                        },
                        abort: function() {
                            b && b(void 0, !0)
                        }
                    }
                }
            }), ea.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(a) {
                        return ea.globalEval(a), a
                    }
                }
            }), ea.ajaxPrefilter("script", function(a) {
                void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
            }), ea.ajaxTransport("script", function(a) {
                if (a.crossDomain) {
                    var b, c = oa.head || ea("head")[0] || oa.documentElement;
                    return {
                        send: function(d, e) {
                            b = oa.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                                (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                            }, c.insertBefore(b, c.firstChild)
                        },
                        abort: function() {
                            b && b.onload(void 0, !0)
                        }
                    }
                }
            });
            var ac = [],
                bc = /(=)\?(?=&|$)|\?\?/;
            ea.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var a = ac.pop() || ea.expando + "_" + Eb++;
                    return this[a] = !0, a
                }
            }), ea.ajaxPrefilter("json jsonp", function(b, c, d) {
                var e, f, g, h = b.jsonp !== !1 && (bc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bc.test(b.data) && "data");
                return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = ea.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(bc, "$1" + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
                    return g || ea.error(e + " was not called"), g[0]
                }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
                    g = arguments
                }, d.always(function() {
                    a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ac.push(e)), g && ea.isFunction(f) && f(g[0]), g = f = void 0
                }), "script") : void 0
            }), ea.parseHTML = function(a, b, c) {
                if (!a || "string" != typeof a) return null;
                "boolean" == typeof b && (c = b, b = !1), b = b || oa;
                var d = la.exec(a),
                    e = !c && [];
                return d ? [b.createElement(d[1])] : (d = ea.buildFragment([a], b, e), e && e.length && ea(e).remove(), ea.merge([], d.childNodes))
            };
            var cc = ea.fn.load;
            ea.fn.load = function(a, b, c) {
                if ("string" != typeof a && cc) return cc.apply(this, arguments);
                var d, e, f, g = this,
                    h = a.indexOf(" ");
                return h >= 0 && (d = ea.trim(a.slice(h, a.length)), a = a.slice(0, h)), ea.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && ea.ajax({
                    url: a,
                    type: f,
                    dataType: "html",
                    data: b
                }).done(function(a) {
                    e = arguments, g.html(d ? ea("<div>").append(ea.parseHTML(a)).find(d) : a)
                }).complete(c && function(a, b) {
                    g.each(c, e || [a.responseText, b, a])
                }), this
            }, ea.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
                ea.fn[b] = function(a) {
                    return this.on(b, a)
                }
            }), ea.expr.filters.animated = function(a) {
                return ea.grep(ea.timers, function(b) {
                    return a === b.elem
                }).length
            };
            var dc = a.document.documentElement;
            ea.offset = {
                setOffset: function(a, b, c) {
                    var d, e, f, g, h, i, j, k = ea.css(a, "position"),
                        l = ea(a),
                        m = {};
                    "static" === k && (a.style.position = "relative"), h = l.offset(), f = ea.css(a, "top"), i = ea.css(a, "left"), j = ("absolute" === k || "fixed" === k) && ea.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), ea.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
                }
            }, ea.fn.extend({
                offset: function(a) {
                    if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                        ea.offset.setOffset(this, a, b)
                    });
                    var b, c, d = {
                            top: 0,
                            left: 0
                        },
                        e = this[0],
                        f = e && e.ownerDocument;
                    if (f) return b = f.documentElement, ea.contains(b, e) ? (typeof e.getBoundingClientRect !== xa && (d = e.getBoundingClientRect()), c = V(f), {
                        top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                        left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                    }) : d
                },
                position: function() {
                    if (this[0]) {
                        var a, b, c = {
                                top: 0,
                                left: 0
                            },
                            d = this[0];
                        return "fixed" === ea.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ea.nodeName(a[0], "html") || (c = a.offset()), c.top += ea.css(a[0], "borderTopWidth", !0), c.left += ea.css(a[0], "borderLeftWidth", !0)), {
                            top: b.top - c.top - ea.css(d, "marginTop", !0),
                            left: b.left - c.left - ea.css(d, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var a = this.offsetParent || dc; a && !ea.nodeName(a, "html") && "static" === ea.css(a, "position");) a = a.offsetParent;
                        return a || dc
                    })
                }
            }), ea.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(a, b) {
                var c = /Y/.test(b);
                ea.fn[a] = function(d) {
                    return Da(this, function(a, d, e) {
                        var f = V(a);
                        return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? ea(f).scrollLeft() : e, c ? e : ea(f).scrollTop()) : a[d] = e)
                    }, a, d, arguments.length, null)
                }
            }), ea.each(["top", "left"], function(a, b) {
                ea.cssHooks[b] = A(ca.pixelPosition, function(a, c) {
                    return c ? (c = bb(a, b), db.test(c) ? ea(a).position()[b] + "px" : c) : void 0
                })
            }), ea.each({
                Height: "height",
                Width: "width"
            }, function(a, b) {
                ea.each({
                    padding: "inner" + a,
                    content: b,
                    "": "outer" + a
                }, function(c, d) {
                    ea.fn[d] = function(d, e) {
                        var f = arguments.length && (c || "boolean" != typeof d),
                            g = c || (d === !0 || e === !0 ? "margin" : "border");
                        return Da(this, function(b, c, d) {
                            var e;
                            return ea.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? ea.css(b, c, g) : ea.style(b, c, d, g)
                        }, b, f ? d : void 0, f, null)
                    }
                })
            }), ea.fn.size = function() {
                return this.length
            }, ea.fn.andSelf = ea.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return ea
            });
            var ec = a.jQuery,
                fc = a.$;
            return ea.noConflict = function(b) {
                return a.$ === ea && (a.$ = fc), b && a.jQuery === ea && (a.jQuery = ec), ea
            }, typeof b === xa && (a.jQuery = a.$ = ea), ea
        })
    }, {}]
}, {}, [22]);
//# sourceMappingURL=planquadrat.js.map