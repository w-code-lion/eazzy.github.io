/*!
 * BeefUp 1.2.0 - A jQuery Accordion Plugin
 * Copyright Sascha Künstler http://www.schaschaweb.de/
 */
!(function (a) {
    "use strict";
    var b = {};
    (b.defaults = {
        accessibility: !0,
        trigger: ".beefup__head",
        content: ".beefup__body",
        openClass: "is-open",
        animation: "slide",
        openSpeed: 200,
        closeSpeed: 200,
        scroll: !1,
        scrollSpeed: 400,
        scrollOffset: 0,
        openSingle: !1,
        stayOpen: null,
        selfBlock: !1,
        selfClose: !1,
        hash: !0,
        breakpoints: null,
        onInit: null,
        onOpen: null,
        onClose: null,
        onScroll: null,
    }),
        (b.id = 0),
        (b.methods = {
            _getVars: function (c) {
                var d = a.extend(!0, {}, c.data("beefup"), c.data("beefup-options"));
                return d.breakpoints ? b.methods._getResponsiveVars(d) : d;
            },
            _getResponsiveVars: function (b) {
                var c = window.innerWidth || a(window).width();
                return (
                    b.breakpoints.sort(function (a, b) {
                        return a.breakpoint < b.breakpoint ? -1 : a.breakpoint > b.breakpoint ? 1 : 0;
                    }),
                    a.each(b.breakpoints, function (d, e) {
                        c >= e.breakpoint && (b = a.extend({}, b, e.settings));
                    }),
                    b
                );
            },
            _animation: function (a, b, c, d) {
                switch (a) {
                    case "slideDown":
                        b.slideDown(c, d);
                        break;
                    case "slideUp":
                        b.slideUp(c, d);
                        break;
                    case "fadeIn":
                        b.fadeIn(c, d);
                        break;
                    case "fadeOut":
                        b.fadeOut(c, d);
                        break;
                    case "show":
                        b.show(c, d);
                        break;
                    case "hide":
                        b.hide(c, d);
                }
            },
            _close: function (a, b) {
                var c = a.find(b.content + ":first"),
                    d = a.find(b.trigger + ":first");
                a.removeClass(b.openClass), c.hide().css("overflow", ""), b.accessibility && (c.attr("hidden", !0), d.attr("aria-expanded", !1).removeAttr("aria-disabled"));
            },
            _open: function (a, b) {
                var c = a.find(b.content + ":first"),
                    d = a.find(b.trigger + ":first");
                a.addClass(b.openClass), c.show().css("overflow", "hidden"), b.accessibility && (c.attr("hidden", !1), d.attr("aria-expanded", !0), b.selfBlock && d.attr("aria-disabled", !0));
            },
            _getStayOpen: function (a, b) {
                var c;
                if ("number" == typeof b) c = a.eq(b);
                else if ("string" == typeof b)
                    switch (b) {
                        case "first":
                            c = a.first();
                            break;
                        case "last":
                            c = a.last();
                            break;
                        default:
                            c = a.filter(b);
                    }
                return c;
            },
            _openSingle: function (c, d, e) {
                if (e.openSingle) {
                    var f = c.not(d);
                    null !== e.stayOpen && (f = f.not(b.methods._getStayOpen(c, e.stayOpen))),
                        c.close(
                            f.filter(function () {
                                return !a(this).find(d).length;
                            })
                        );
                }
            },
            _addSelfCloseEvent: function (c, d) {
                d.selfClose &&
                    a(document).on("click", function (e) {
                        if (!a(e.target).closest(c).length) {
                            var f = c.filter("." + d.openClass);
                            null !== d.stayOpen && (f = f.not(b.methods._getStayOpen(c, d.stayOpen))), f.length && c.close(f);
                        }
                    });
            },
            _addHashchangeEvent: function (b, c) {
                if (c.hash) {
                    var d = function () {
                        var a = b.filter(window.location.hash);
                        a.length && !a.hasClass(c.openClass) && b.click(a);
                    };
                    d(), a(window).on("hashchange", d);
                }
            },
            _initAccessibility: function (a, c) {
                var d = a.find(c.trigger + ":first"),
                    e = "acc" + b.id++,
                    f = e + "id",
                    g = d.children("button");
                return (
                    c.accessibility &&
                        (d.is("button") || d.is("a")
                            ? (g = d)
                            : (d.children("button").length || (d.wrapInner('<button type="button" aria-controls="' + e + '" aria-expanded="false" id="' + f + '"></button>'), (g = d.children("button"))), (c.trigger += " > button")),
                        g.attr("aria-controls", e).attr("aria-expanded", !1).attr("id", f),
                        a
                            .find(c.content + ":first")
                            .attr("aria-labelledby", f)
                            .attr("id", e)
                            .attr("role", "region")),
                    c
                );
            },
        }),
        (a.fn.beefup = function (c) {
            var d = this;
            return (
                (this.open = function (c, e) {
                    return (
                        (c && c.length) || (c = d),
                        c.each(function () {
                            var f = a(this),
                                g = b.methods._getVars(f),
                                h = f.find(g.content + ":first"),
                                i = "slide" === g.animation ? "slideDown" : "fade" === g.animation ? "fadeIn" : "show";
                            b.methods._openSingle(d, c, g),
                                b.methods._animation(i, h, g.openSpeed, function () {
                                    b.methods._open(f, g), g.scroll && d.scroll(c), e && "function" == typeof e && e(f), g.onOpen && "function" == typeof g.onOpen && g.onOpen(f);
                                });
                        }),
                        d
                    );
                }),
                (this.close = function (c, e) {
                    return (
                        (c && c.length) || (c = d),
                        c.each(function () {
                            var c = a(this),
                                d = b.methods._getVars(c),
                                f = c.find(d.content + ":first"),
                                g = "slide" === d.animation ? "slideUp" : "fade" === d.animation ? "fadeOut" : "hide";
                            b.methods._animation(g, f, d.closeSpeed, function () {
                                b.methods._close(c, d), e && "function" == typeof e && e(c), d.onClose && "function" == typeof d.onClose && d.onClose(c);
                            });
                        }),
                        d
                    );
                }),
                (this.scroll = function (c) {
                    var e = b.methods._getVars(c);
                    return (
                        a("html, body")
                            .animate({ scrollTop: c.offset().top + e.scrollOffset }, e.scrollSpeed)
                            .promise()
                            .done(function () {
                                e.onScroll && "function" == typeof e.onScroll && e.onScroll(c);
                            }),
                        d
                    );
                }),
                (this.click = function (a) {
                    var c = b.methods._getVars(a);
                    return a.hasClass(c.openClass) ? c.selfBlock || d.close(a) : d.open(a), d;
                }),
                this.each(function (e, f) {
                    var g = a(f),
                        h = b.methods._initAccessibility(g, a.extend({}, b.defaults, c, g.data("beefup-options")));
                    g.data("beefup") ||
                        (g.data("beefup", h),
                        h.breakpoints && (h = b.methods._getResponsiveVars(h)),
                        (g.is("." + h.openClass) || (null !== h.stayOpen && g.is(b.methods._getStayOpen(d, h.stayOpen)))) && b.methods._open(g, h),
                        b.methods._close(g.not("." + h.openClass), h),
                        h.onInit && "function" == typeof h.onInit && h.onInit(g),
                        g.on("click", h.trigger + ":first", function (a) {
                            a.preventDefault(), d.click(g);
                        }),
                        e === d.length - 1 && (b.methods._addHashchangeEvent(d, h), b.methods._addSelfCloseEvent(d, h)));
                })
            );
        });
})(jQuery);
