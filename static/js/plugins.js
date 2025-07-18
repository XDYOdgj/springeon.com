/* jQuery UI - v1.11.4 - 2015-12-02
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
})(function(c) {
	function h(m, l) {
		var i, e, j, k = m.nodeName.toLowerCase();
		return "area" === k ? (i = m.parentNode, e = i.name, m.href && e && "map" === i.nodeName.toLowerCase() ? (
			j = c("img[usemap='#" + e + "']")[0], !!j && d(j)) : !1) : (
			/^(input|select|textarea|button|object)$/.test(k) ? !m.disabled : "a" === k ? m.href || l : l) && d(
			m)
	}

	function d(a) {
		return c.expr.filters.visible(a) && !c(a).parents().addBack().filter(function() {
			return "hidden" === c.css(this, "visibility")
		}).length
	}
	c.ui = c.ui || {}, c.extend(c.ui, {
		version: "1.11.4",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), c.fn.extend({
		scrollParent: function(m) {
			var j = this.css("position"),
				l = "absolute" === j,
				k = m ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				e = this.parents().filter(function() {
					var a = c(this);
					return l && "static" === a.css("position") ? !1 : k.test(a.css("overflow") + a
						.css("overflow-y") + a.css("overflow-x"))
				}).eq(0);
			return "fixed" !== j && e.length ? e : c(this[0].ownerDocument || document)
		},
		uniqueId: function() {
			var a = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + ++a)
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && c(this).removeAttr("id")
			})
		}
	}), c.extend(c.expr[":"], {
		data: c.expr.createPseudo ? c.expr.createPseudo(function(a) {
			return function(e) {
				return !!c.data(e, a)
			}
		}) : function(j, a, e) {
			return !!c.data(j, e[3])
		},
		focusable: function(a) {
			return h(a, !isNaN(c.attr(a, "tabindex")))
		},
		tabbable: function(a) {
			var j = c.attr(a, "tabindex"),
				e = isNaN(j);
			return (e || j >= 0) && h(a, !e)
		}
	}), c("<a>").outerWidth(1).jquery || c.each(["Width", "Height"], function(p, j) {
		function m(r, o, q, n) {
			return c.each(k, function() {
				o -= parseFloat(c.css(r, "padding" + this)) || 0, q && (o -= parseFloat(c.css(r,
					"border" + this + "Width")) || 0), n && (o -= parseFloat(c.css(r, "margin" +
					this)) || 0)
			}), o
		}
		var k = "Width" === j ? ["Left", "Right"] : ["Top", "Bottom"],
			e = j.toLowerCase(),
			l = {
				innerWidth: c.fn.innerWidth,
				innerHeight: c.fn.innerHeight,
				outerWidth: c.fn.outerWidth,
				outerHeight: c.fn.outerHeight
			};
		c.fn["inner" + j] = function(a) {
			return void 0 === a ? l["inner" + j].call(this) : this.each(function() {
				c(this).css(e, m(this, a) + "px")
			})
		}, c.fn["outer" + j] = function(i, a) {
			return "number" != typeof i ? l["outer" + j].call(this, i) : this.each(function() {
				c(this).css(e, m(this, i, !0, a) + "px")
			})
		}
	}), c.fn.addBack || (c.fn.addBack = function(a) {
		return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
	}), c("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (c.fn.removeData = function(a) {
		return function(e) {
			return arguments.length ? a.call(this, c.camelCase(e)) : a.call(this)
		}
	}(c.fn.removeData)), c.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), c.fn.extend({
		focus: function(a) {
			return function(e, j) {
				return "number" == typeof e ? this.each(function() {
					var i = this;
					setTimeout(function() {
						c(i).focus(), j && j.call(i)
					}, e)
				}) : a.apply(this, arguments)
			}
		}(c.fn.focus),
		disableSelection: function() {
			var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.bind(a + ".ui-disableSelection", function(i) {
					i.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		},
		zIndex: function(k) {
			if (void 0 !== k) {
				return this.css("zIndex", k)
			}
			if (this.length) {
				for (var a, j, e = c(this[0]); e.length && e[0] !== document;) {
					if (a = e.css("position"), ("absolute" === a || "relative" === a || "fixed" ===
						a) && (j = parseInt(e.css("zIndex"), 10), !isNaN(j) && 0 !== j)) {
						return j
					}
					e = e.parent()
				}
			}
			return 0
		}
	}), c.ui.plugin = {
		add: function(m, j, l) {
			var k, e = c.ui[m].prototype;
			for (k in l) {
				e.plugins[k] = e.plugins[k] || [], e.plugins[k].push([j, l[k]])
			}
		},
		call: function(k, p, l, o) {
			var m, j = k.plugins[p];
			if (j && (o || k.element[0].parentNode && 11 !== k.element[0].parentNode.nodeType)) {
				for (m = 0; j.length > m; m++) {
					k.options[j[m][0]] && j[m][1].apply(k.element, l)
				}
			}
		}
	};
	var g = 0,
		f = Array.prototype.slice;
	c.cleanData = function(a) {
		return function(j) {
			var m, k, e;
			for (e = 0; null != (k = j[e]); e++) {
				try {
					m = c._data(k, "events"), m && m.remove && c(k).triggerHandler("remove")
				} catch (l) {}
			}
			a(j)
		}
	}(c.cleanData), c.widget = function(w, k, v) {
		var p, e, q, u, j = {},
			m = w.split(".")[0];
		return w = w.split(".")[1], p = m + "-" + w, v || (v = k, k = c.Widget), c.expr[":"][p.toLowerCase()] =
			function(a) {
				return !!c.data(a, p)
			}, c[m] = c[m] || {}, e = c[m][w], q = c[m][w] = function(a, i) {
				return this._createWidget ? (arguments.length && this._createWidget(a, i), void 0) : new q(a, i)
			}, c.extend(q, e, {
				version: v.version,
				_proto: c.extend({}, v),
				_childConstructors: []
			}), u = new k, u.options = c.widget.extend({}, u.options), c.each(v, function(i, a) {
				return c.isFunction(a) ? (j[i] = function() {
					var l = function() {
							return k.prototype[i].apply(this, arguments)
						},
						o = function(n) {
							return k.prototype[i].apply(this, n)
						};
					return function() {
						var s, r = this._super,
							n = this._superApply;
						return this._super = l, this._superApply = o, s = a.apply(this,
							arguments), this._super = r, this._superApply = n, s
					}
				}(), void 0) : (j[i] = a, void 0)
			}), q.prototype = c.widget.extend(u, {
				widgetEventPrefix: e ? u.widgetEventPrefix || w : w
			}, j, {
				constructor: q,
				namespace: m,
				widgetName: w,
				widgetFullName: p
			}), e ? (c.each(e._childConstructors, function(n, a) {
				var l = a.prototype;
				c.widget(l.namespace + "." + l.widgetName, q, a._proto)
			}), delete e._childConstructors) : k._childConstructors.push(q), c.widget.bridge(w, q), q
	}, c.widget.extend = function(n) {
		for (var j, m, e = f.call(arguments, 1), k = 0, l = e.length; l > k; k++) {
			for (j in e[k]) {
				m = e[k][j], e[k].hasOwnProperty(j) && void 0 !== m && (n[j] = c.isPlainObject(m) ? c
					.isPlainObject(n[j]) ? c.widget.extend({}, n[j], m) : c.widget.extend({}, m) : m)
			}
		}
		return n
	}, c.widget.bridge = function(j, a) {
		var e = a.prototype.widgetFullName || j;
		c.fn[j] = function(i) {
			var l = "string" == typeof i,
				m = f.call(arguments, 1),
				k = this;
			return l ? this.each(function() {
				var o, p = c.data(this, e);
				return "instance" === i ? (k = p, !1) : p ? c.isFunction(p[i]) && "_" !== i.charAt(
					0) ? (o = p[i].apply(p, m), o !== p && void 0 !== o ? (k = o && o.jquery ? k
					.pushStack(o.get()) : o, !1) : void 0) : c.error("no such method '" + i +
					"' for " + j + " widget instance") : c.error("cannot call methods on " + j +
					" prior to initialization; attempted to call method '" + i + "'")
			}) : (m.length && (i = c.widget.extend.apply(null, [i].concat(m))), this.each(function() {
				var n = c.data(this, e);
				n ? (n.option(i || {}), n._init && n._init()) : c.data(this, e, new a(i, this))
			})), k
		}
	}, c.Widget = function() {}, c.Widget._childConstructors = [], c.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(e, a) {
			a = c(a || this.defaultElement || this)[0], this.element = c(a), this.uuid = g++, this
				.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = c(), this.hoverable =
				c(), this.focusable = c(), a !== this && (c.data(a, this.widgetFullName, this), this._on(!0,
					this.element, {
						remove: function(i) {
							i.target === a && this.destroy()
						}
					}), this.document = c(a.style ? a.ownerDocument : a.document || a), this.window = c(
					this.document[0].defaultView || this.document[0].parentWindow)), this.options = c.widget
				.extend({}, this.options, this._getCreateOptions(), e), this._create(), this._trigger(
					"create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: c.noop,
		_getCreateEventData: c.noop,
		_create: c.noop,
		_init: c.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName)
				.removeData(c.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace)
				.removeAttr("aria-disabled").removeClass(this.widgetFullName +
					"-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this
				.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: c.noop,
		widget: function() {
			return this.element
		},
		option: function(p, j) {
			var m, k, e, l = p;
			if (0 === arguments.length) {
				return c.widget.extend({}, this.options)
			}
			if ("string" == typeof p) {
				if (l = {}, m = p.split("."), p = m.shift(), m.length) {
					for (k = l[p] = c.widget.extend({}, this.options[p]), e = 0; m.length - 1 > e; e++) {
						k[m[e]] = k[m[e]] || {}, k = k[m[e]]
					}
					if (p = m.pop(), 1 === arguments.length) {
						return void 0 === k[p] ? null : k[p]
					}
					k[p] = j
				} else {
					if (1 === arguments.length) {
						return void 0 === this.options[p] ? null : this.options[p]
					}
					l[p] = j
				}
			}
			return this._setOptions(l), this
		},
		_setOptions: function(a) {
			var i;
			for (i in a) {
				this._setOption(i, a[i])
			}
			return this
		},
		_setOption: function(a, i) {
			return this.options[a] = i, "disabled" === a && (this.widget().toggleClass(this.widgetFullName +
				"-disabled", !!i), i && (this.hoverable.removeClass("ui-state-hover"), this
				.focusable.removeClass("ui-state-focus"))), this
		},
		enable: function() {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function() {
			return this._setOptions({
				disabled: !0
			})
		},
		_on: function(m, j, l) {
			var k, e = this;
			"boolean" != typeof m && (l = j, j = m, m = !1), l ? (j = k = c(j), this.bindings = this
				.bindings.add(j)) : (l = j, j = this.element, k = this.widget()), c.each(l, function(q,
				n) {
				function p() {
					return m || e.options.disabled !== !0 && !c(this).hasClass(
						"ui-state-disabled") ? ("string" == typeof n ? e[n] : n).apply(e,
						arguments) : void 0
				}
				"string" != typeof n && (p.guid = n.guid = n.guid || p.guid || c.guid++);
				var a = q.match(/^([\w:-]*)\s*(.*)$/),
					i = a[1] + e.eventNamespace,
					t = a[2];
				t ? k.delegate(t, i, p) : j.bind(i, p)
			})
		},
		_off: function(e, a) {
			a = (a || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(a)
				.undelegate(a), this.bindings = c(this.bindings.not(e).get()), this.focusable = c(this
					.focusable.not(e).get()), this.hoverable = c(this.hoverable.not(e).get())
		},
		_delay: function(a, l) {
			function j() {
				return ("string" == typeof a ? k[a] : a).apply(k, arguments)
			}
			var k = this;
			return setTimeout(j, l || 0)
		},
		_hoverable: function(a) {
			this.hoverable = this.hoverable.add(a), this._on(a, {
				mouseenter: function(e) {
					c(e.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(e) {
					c(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(a) {
			this.focusable = this.focusable.add(a), this._on(a, {
				focusin: function(e) {
					c(e.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(e) {
					c(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(p, j, m) {
			var k, e, l = this.options[p];
			if (m = m || {}, j = c.Event(j), j.type = (p === this.widgetEventPrefix ? p : this
					.widgetEventPrefix + p).toLowerCase(), j.target = this.element[0], e = j
				.originalEvent) {
				for (k in e) {
					k in j || (j[k] = e[k])
				}
			}
			return this.element.trigger(j, m), !(c.isFunction(l) && l.apply(this.element[0], [j].concat(
				m)) === !1 || j.isDefaultPrevented())
		}
	}, c.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(e, a) {
		c.Widget.prototype["_" + e] = function(m, j, i) {
			"string" == typeof j && (j = {
				effect: j
			});
			var k, l = j ? j === !0 || "number" == typeof j ? a : j.effect || a : e;
			j = j || {}, "number" == typeof j && (j = {
					duration: j
				}), k = !c.isEmptyObject(j), j.complete = i, j.delay && m.delay(j.delay), k && c
				.effects && c.effects.effect[l] ? m[e](j) : l !== e && m[l] ? m[l](j.duration, j.easing,
					i) : m.queue(function(n) {
					c(this)[e](), i && i.call(m[0]), n()
				})
		}
	}), c.widget;
	var b = !1;
	c(document).mouseup(function() {
		b = !1
	}), c.widget("ui.mouse", {
		version: "1.11.4",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var a = this;
			this.element.bind("mousedown." + this.widgetName, function(i) {
				return a._mouseDown(i)
			}).bind("click." + this.widgetName, function(e) {
				return !0 === c.data(e.target, a.widgetName + ".preventClickEvent") ? (c
					.removeData(e.target, a.widgetName + ".preventClickEvent"), e
					.stopImmediatePropagation(), !1) : void 0
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind(
				"mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this
				.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(k) {
			if (!b) {
				this._mouseMoved = !1, this._mouseStarted && this._mouseUp(k), this._mouseDownEvent = k;
				var a = this,
					j = 1 === k.which,
					e = "string" == typeof this.options.cancel && k.target.nodeName ? c(k.target)
					.closest(this.options.cancel).length : !1;
				return j && !e && this._mouseCapture(k) ? (this.mouseDelayMet = !this.options.delay,
					this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
						a.mouseDelayMet = !0
					}, this.options.delay)), this._mouseDistanceMet(k) && this._mouseDelayMet(k) &&
					(this._mouseStarted = this._mouseStart(k) !== !1, !this._mouseStarted) ? (k
						.preventDefault(), !0) : (!0 === c.data(k.target, this.widgetName +
						".preventClickEvent") && c.removeData(k.target, this.widgetName +
						".preventClickEvent"), this._mouseMoveDelegate = function(i) {
						return a._mouseMove(i)
					}, this._mouseUpDelegate = function(i) {
						return a._mouseUp(i)
					}, this.document.bind("mousemove." + this.widgetName, this
						._mouseMoveDelegate).bind("mouseup." + this.widgetName, this
						._mouseUpDelegate), k.preventDefault(), b = !0, !0)) : !0
			}
		},
		_mouseMove: function(a) {
			if (this._mouseMoved) {
				if (c.ui.ie && (!document.documentMode || 9 > document.documentMode) && !a.button) {
					return this._mouseUp(a)
				}
				if (!a.which) {
					return this._mouseUp(a)
				}
			}
			return (a.which || a.button) && (this._mouseMoved = !0), this._mouseStarted ? (this
				._mouseDrag(a), a.preventDefault()) : (this._mouseDistanceMet(a) && this
				._mouseDelayMet(a) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent,
					a) !== !1, this._mouseStarted ? this._mouseDrag(a) : this._mouseUp(a)), !this
				._mouseStarted)
		},
		_mouseUp: function(a) {
			return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind(
				"mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this
				._mouseStarted = !1, a.target === this._mouseDownEvent.target && c.data(a.target,
					this.widgetName + ".preventClickEvent", !0), this._mouseStop(a)), b = !1, !1
		},
		_mouseDistanceMet: function(a) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this
				._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return !0
		}
	}), c.widget("ui.slider", c.ui.mouse, {
		version: "1.11.4",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null,
			change: null,
			slide: null,
			start: null,
			stop: null
		},
		numPages: 5,
		_create: function() {
			this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex =
				null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this
				.element.addClass("ui-slider ui-slider-" + this.orientation +
					" ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption(
					"disabled", this.options.disabled), this._animateOff = !1
		},
		_refresh: function() {
			this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
		},
		_createHandles: function() {
			var p, j, m = this.options,
				k = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
				e =
				"<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
				l = [];
			for (j = m.values && m.values.length || 1, k.length > j && (k.slice(j).remove(), k = k
					.slice(0, j)), p = k.length; j > p; p++) {
				l.push(e)
			}
			this.handles = k.add(c(l.join("")).appendTo(this.element)), this.handle = this.handles.eq(
				0), this.handles.each(function(a) {
					c(this).data("ui-slider-handle-index", a)
				})
		},
		_createRange: function() {
			var e = this.options,
				a = "";
			e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e
					.values = [e.values[0], e.values[0]] : c.isArray(e.values) && (e.values = e
						.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this
				.range && this.range.length ? this.range.removeClass(
					"ui-slider-range-min ui-slider-range-max").css({
					left: "",
					bottom: ""
				}) : (this.range = c("<div></div>").appendTo(this.element), a =
					"ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(a + (
						"min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""
						))) : (this.range && this.range.remove(), this.range = null)
		},
		_setupEvents: function() {
			this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this
				.handles), this._focusable(this.handles)
		},
		_destroy: function() {
			this.handles.remove(), this.range && this.range.remove(), this.element.removeClass(
				"ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
				), this._mouseDestroy()
		},
		_mouseCapture: function(y) {
			var m, x, q, e, v, w, k, p, z = this,
				j = this.options;
			return j.disabled ? !1 : (this.elementSize = {
					width: this.element.outerWidth(),
					height: this.element.outerHeight()
				}, this.elementOffset = this.element.offset(), m = {
					x: y.pageX,
					y: y.pageY
				}, x = this._normValueFromMouse(m), q = this._valueMax() - this._valueMin() + 1,
				this.handles.each(function(l) {
					var a = Math.abs(x - z.values(l));
					(q > a || q === a && (l === z._lastChangedValue || z.values(l) === j
					.min)) && (q = a, e = c(this), v = l)
				}), w = this._start(y, v), w === !1 ? !1 : (this._mouseSliding = !0, this
					._handleIndex = v, e.addClass("ui-state-active").focus(), k = e.offset(), p = !
					c(y.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = p ?
					{
						left: 0,
						top: 0
					} : {
						left: y.pageX - k.left - e.width() / 2,
						top: y.pageY - k.top - e.height() / 2 - (parseInt(e.css("borderTopWidth"),
							10) || 0) - (parseInt(e.css("borderBottomWidth"), 10) || 0) + (
							parseInt(e.css("marginTop"), 10) || 0)
					}, this.handles.hasClass("ui-state-hover") || this._slide(y, v, x), this
					._animateOff = !0, !0))
		},
		_mouseStart: function() {
			return !0
		},
		_mouseDrag: function(a) {
			var k = {
					x: a.pageX,
					y: a.pageY
				},
				j = this._normValueFromMouse(k);
			return this._slide(a, this._handleIndex, j), !1
		},
		_mouseStop: function(a) {
			return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a,
					this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null,
				this._clickOffset = null, this._animateOff = !1, !1
		},
		_detectOrientation: function() {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(k) {
			var p, l, o, m, j;
			return "horizontal" === this.orientation ? (p = this.elementSize.width, l = k.x - this
					.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (p = this
					.elementSize.height, l = k.y - this.elementOffset.top - (this._clickOffset ? this
						._clickOffset.top : 0)), o = l / p, o > 1 && (o = 1), 0 > o && (o = 0),
				"vertical" === this.orientation && (o = 1 - o), m = this._valueMax() - this._valueMin(),
				j = this._valueMin() + o * m, this._trimAlignValue(j)
		},
		_start: function(a, k) {
			var j = {
				handle: this.handles[k],
				value: this.value()
			};
			return this.options.values && this.options.values.length && (j.value = this.values(k), j
				.values = this.values()), this._trigger("start", a, j)
		},
		_slide: function(k, p, l) {
			var o, m, j;
			this.options.values && this.options.values.length ? (o = this.values(p ? 0 : 1), 2 === this
					.options.values.length && this.options.range === !0 && (0 === p && l > o || 1 ===
						p && o > l) && (l = o), l !== this.values(p) && (m = this.values(), m[p] = l,
						j = this._trigger("slide", k, {
							handle: this.handles[p],
							value: l,
							values: m
						}), o = this.values(p ? 0 : 1), j !== !1 && this.values(p, l))) : l !== this
				.value() && (j = this._trigger("slide", k, {
					handle: this.handles[p],
					value: l
				}), j !== !1 && this.value(l))
		},
		_stop: function(a, k) {
			var j = {
				handle: this.handles[k],
				value: this.value()
			};
			this.options.values && this.options.values.length && (j.value = this.values(k), j.values =
				this.values()), this._trigger("stop", a, j)
		},
		_change: function(a, k) {
			if (!this._keySliding && !this._mouseSliding) {
				var j = {
					handle: this.handles[k],
					value: this.value()
				};
				this.options.values && this.options.values.length && (j.value = this.values(k), j
					.values = this.values()), this._lastChangedValue = k, this._trigger("change", a,
					j)
			}
		},
		value: function(a) {
			return arguments.length ? (this.options.value = this._trimAlignValue(a), this
			._refreshValue(), this._change(null, 0), void 0) : this._value()
		},
		values: function(m, j) {
			var l, k, e;
			if (arguments.length > 1) {
				return this.options.values[m] = this._trimAlignValue(j), this._refreshValue(), this
					._change(null, m), void 0
			}
			if (!arguments.length) {
				return this._values()
			}
			if (!c.isArray(arguments[0])) {
				return this.options.values && this.options.values.length ? this._values(m) : this
				.value()
			}
			for (l = this.options.values, k = arguments[0], e = 0; l.length > e; e += 1) {
				l[e] = this._trimAlignValue(k[e]), this._change(null, e)
			}
			this._refreshValue()
		},
		_setOption: function(k, a) {
			var j, e = 0;
			switch ("range" === k && this.options.range === !0 && ("min" === a ? (this.options.value =
					this._values(0), this.options.values = null) : "max" === a && (this.options
					.value = this._values(this.options.values.length - 1), this.options.values =
					null)), c.isArray(this.options.values) && (e = this.options.values.length),
				"disabled" === k && this.element.toggleClass("ui-state-disabled", !!a), this._super(k,
					a), k) {
				case "orientation":
					this._detectOrientation(), this.element.removeClass(
						"ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this
						.orientation), this._refreshValue(), this.handles.css("horizontal" === a ?
						"bottom" : "left", "");
					break;
				case "value":
					this._animateOff = !0, this._refreshValue(), this._change(null, 0), this
						._animateOff = !1;
					break;
				case "values":
					for (this._animateOff = !0, this._refreshValue(), j = 0; e > j; j += 1) {
						this._change(null, j)
					}
					this._animateOff = !1;
					break;
				case "step":
				case "min":
				case "max":
					this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this
						._animateOff = !1;
					break;
				case "range":
					this._animateOff = !0, this._refresh(), this._animateOff = !1
			}
		},
		_value: function() {
			var a = this.options.value;
			return a = this._trimAlignValue(a)
		},
		_values: function(a) {
			var l, j, k;
			if (arguments.length) {
				return l = this.options.values[a], l = this._trimAlignValue(l)
			}
			if (this.options.values && this.options.values.length) {
				for (j = this.options.values.slice(), k = 0; j.length > k; k += 1) {
					j[k] = this._trimAlignValue(j[k])
				}
				return j
			}
			return []
		},
		_trimAlignValue: function(a) {
			if (this._valueMin() >= a) {
				return this._valueMin()
			}
			if (a >= this._valueMax()) {
				return this._valueMax()
			}
			var l = this.options.step > 0 ? this.options.step : 1,
				j = (a - this._valueMin()) % l,
				k = a - j;
			return 2 * Math.abs(j) >= l && (k += j > 0 ? l : -l), parseFloat(k.toFixed(5))
		},
		_calculateNewMax: function() {
			var a = this.options.max,
				l = this._valueMin(),
				j = this.options.step,
				k = Math.floor(+(a - l).toFixed(this._precision()) / j) * j;
			a = k + l, this.max = parseFloat(a.toFixed(this._precision()))
		},
		_precision: function() {
			var a = this._precisionOf(this.options.step);
			return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))),
				a
		},
		_precisionOf: function(a) {
			var k = "" + a,
				j = k.indexOf(".");
			return -1 === j ? 0 : k.length - j - 1
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.max
		},
		_refreshValue: function() {
			var x, k, w, p, e, q = this.options.range,
				v = this.options,
				j = this,
				m = this._animateOff ? !1 : v.animate,
				y = {};
			this.options.values && this.options.values.length ? this.handles.each(function(a) {
				k = 100 * ((j.values(a) - j._valueMin()) / (j._valueMax() - j._valueMin())), y[
						"horizontal" === j.orientation ? "left" : "bottom"] = k + "%", c(this)
					.stop(1, 1)[m ? "animate" : "css"](y, v.animate), j.options.range === !0 &&
					("horizontal" === j.orientation ? (0 === a && j.range.stop(1, 1)[m ?
						"animate" : "css"]({
						left: k + "%"
					}, v.animate), 1 === a && j.range[m ? "animate" : "css"]({
						width: k - x + "%"
					}, {
						queue: !1,
						duration: v.animate
					})) : (0 === a && j.range.stop(1, 1)[m ? "animate" : "css"]({
						bottom: k + "%"
					}, v.animate), 1 === a && j.range[m ? "animate" : "css"]({
						height: k - x + "%"
					}, {
						queue: !1,
						duration: v.animate
					}))), x = k
			}) : (w = this.value(), p = this._valueMin(), e = this._valueMax(), k = e !== p ? 100 *
				((w - p) / (e - p)) : 0, y["horizontal" === this.orientation ? "left" : "bottom"] =
				k + "%", this.handle.stop(1, 1)[m ? "animate" : "css"](y, v.animate), "min" === q &&
				"horizontal" === this.orientation && this.range.stop(1, 1)[m ? "animate" : "css"]({
					width: k + "%"
				}, v.animate), "max" === q && "horizontal" === this.orientation && this.range[m ?
					"animate" : "css"]({
					width: 100 - k + "%"
				}, {
					queue: !1,
					duration: v.animate
				}), "min" === q && "vertical" === this.orientation && this.range.stop(1, 1)[m ?
					"animate" : "css"]({
					height: k + "%"
				}, v.animate), "max" === q && "vertical" === this.orientation && this.range[m ?
					"animate" : "css"]({
					height: 100 - k + "%"
				}, {
					queue: !1,
					duration: v.animate
				}))
		},
		_handleEvents: {
			keydown: function(p) {
				var j, m, k, e, l = c(p.target).data("ui-slider-handle-index");
				switch (p.keyCode) {
					case c.ui.keyCode.HOME:
					case c.ui.keyCode.END:
					case c.ui.keyCode.PAGE_UP:
					case c.ui.keyCode.PAGE_DOWN:
					case c.ui.keyCode.UP:
					case c.ui.keyCode.RIGHT:
					case c.ui.keyCode.DOWN:
					case c.ui.keyCode.LEFT:
						if (p.preventDefault(), !this._keySliding && (this._keySliding = !0, c(p.target)
								.addClass("ui-state-active"), j = this._start(p, l), j === !1)) {
							return
						}
				}
				switch (e = this.options.step, m = k = this.options.values && this.options.values
					.length ? this.values(l) : this.value(), p.keyCode) {
					case c.ui.keyCode.HOME:
						k = this._valueMin();
						break;
					case c.ui.keyCode.END:
						k = this._valueMax();
						break;
					case c.ui.keyCode.PAGE_UP:
						k = this._trimAlignValue(m + (this._valueMax() - this._valueMin()) / this
							.numPages);
						break;
					case c.ui.keyCode.PAGE_DOWN:
						k = this._trimAlignValue(m - (this._valueMax() - this._valueMin()) / this
							.numPages);
						break;
					case c.ui.keyCode.UP:
					case c.ui.keyCode.RIGHT:
						if (m === this._valueMax()) {
							return
						}
						k = this._trimAlignValue(m + e);
						break;
					case c.ui.keyCode.DOWN:
					case c.ui.keyCode.LEFT:
						if (m === this._valueMin()) {
							return
						}
						k = this._trimAlignValue(m - e)
				}
				this._slide(p, l, k)
			},
			keyup: function(e) {
				var a = c(e.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(e, a), this._change(e, a), c(e
					.target).removeClass("ui-state-active"))
			}
		}
	})
});
/*
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011â€“2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
! function(g) {
	function l(e, f) {
		if (!(e.originalEvent.touches.length > 1)) {
			e.preventDefault();
			var m = e.originalEvent.changedTouches[0],
				n = document.createEvent("MouseEvents");
			n.initMouseEvent(f, !0, !0, window, 1, m.screenX, m.screenY, m.clientX, m.clientY, !1, !1, !1, !1, 0, null),
				e.target.dispatchEvent(n)
		}
	}
	if (g.support.touch = "ontouchend" in document, g.support.touch) {
		var k, h = g.ui.mouse.prototype,
			i = h._mouseInit,
			j = h._mouseDestroy;
		h._touchStart = function(c) {
			var d = this;
			!k && d._mouseCapture(c.originalEvent.changedTouches[0]) && (k = !0, d._touchMoved = !1, l(c,
				"mouseover"), l(c, "mousemove"), l(c, "mousedown"))
		}, h._touchMove = function(b) {
			k && (this._touchMoved = !0, l(b, "mousemove"))
		}, h._touchEnd = function(b) {
			k && (l(b, "mouseup"), l(b, "mouseout"), this._touchMoved || l(b, "click"), k = !1)
		}, h._mouseInit = function() {
			var a = this;
			a.element.bind({
				touchstart: g.proxy(a, "_touchStart"),
				touchmove: g.proxy(a, "_touchMove"),
				touchend: g.proxy(a, "_touchEnd")
			}), i.call(a)
		}, h._mouseDestroy = function() {
			var a = this;
			a.element.unbind({
				touchstart: g.proxy(a, "_touchStart"),
				touchmove: g.proxy(a, "_touchMove"),
				touchend: g.proxy(a, "_touchEnd")
			}), j.call(a)
		}
	}
}(jQuery);
! function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports =
		a(require("jquery")) : a(jQuery)
}(function(b) {
	var a = window.Slick || {};
	(a = function() {
		var c = 0;
		return function(g, e) {
			var f, d = this;
			d.defaults = {
					accessibility: !0,
					adaptiveHeight: !1,
					appendArrows: b(g),
					appendDots: b(g),
					arrows: !0,
					asNavFor: null,
					prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
					nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
					autoplay: !1,
					autoplaySpeed: 3000,
					centerMode: !1,
					centerPadding: "50px",
					cssEase: "ease",
					customPaging: function(h, i) {
						return b('<button type="button" />').text(i + 1)
					},
					dots: !1,
					dotsClass: "slick-dots",
					draggable: !0,
					easing: "linear",
					edgeFriction: 0.35,
					fade: !1,
					focusOnSelect: !1,
					focusOnChange: !1,
					infinite: !0,
					initialSlide: 0,
					lazyLoad: "ondemand",
					mobileFirst: !1,
					pauseOnHover: !0,
					pauseOnFocus: !0,
					pauseOnDotsHover: !1,
					respondTo: "window",
					responsive: null,
					rows: 1,
					rtl: !1,
					slide: "",
					slidesPerRow: 1,
					slidesToShow: 1,
					slidesToScroll: 1,
					speed: 500,
					swipe: !0,
					swipeToSlide: !1,
					touchMove: !0,
					touchThreshold: 5,
					useCSS: !0,
					useTransform: !0,
					variableWidth: !1,
					vertical: !1,
					verticalSwiping: !1,
					waitForAnimate: !0,
					zIndex: 1000
				}, d.initials = {
					animating: !1,
					dragging: !1,
					autoPlayTimer: null,
					currentDirection: 0,
					currentLeft: null,
					currentSlide: 0,
					direction: 1,
					$dots: null,
					listWidth: null,
					listHeight: null,
					loadIndex: 0,
					$nextArrow: null,
					$prevArrow: null,
					scrolling: !1,
					slideCount: null,
					slideWidth: null,
					$slideTrack: null,
					$slides: null,
					sliding: !1,
					slideOffset: 0,
					swipeLeft: null,
					swiping: !1,
					$list: null,
					touchObject: {},
					transformsEnabled: !1,
					unslicked: !1
				}, b.extend(d, d.initials), d.activeBreakpoint = null, d.animType = null, d.animProp = null,
				d.breakpoints = [], d.breakpointSettings = [], d.cssTransitions = !1, d.focussed = !1, d
				.interrupted = !1, d.hidden = "hidden", d.paused = !0, d.positionProp = null, d.respondTo =
				null, d.rowCount = 1, d.shouldClick = !0, d.$slider = b(g), d.$slidesCache = null, d
				.transformType = null, d.transitionType = null, d.visibilityChange = "visibilitychange", d
				.windowWidth = 0, d.windowTimer = null, f = b(g).data("slick") || {}, d.options = b
				.extend({}, d.defaults, e, f), d.currentSlide = d.options.initialSlide, d.originalSettings =
				d.options, void 0 !== document.mozHidden ? (d.hidden = "mozHidden", d.visibilityChange =
					"mozvisibilitychange") : void 0 !== document.webkitHidden && (d.hidden = "webkitHidden",
					d.visibilityChange = "webkitvisibilitychange"), d.autoPlay = b.proxy(d.autoPlay, d), d
				.autoPlayClear = b.proxy(d.autoPlayClear, d), d.autoPlayIterator = b.proxy(d
					.autoPlayIterator, d), d.changeSlide = b.proxy(d.changeSlide, d), d.clickHandler = b
				.proxy(d.clickHandler, d), d.selectHandler = b.proxy(d.selectHandler, d), d.setPosition = b
				.proxy(d.setPosition, d), d.swipeHandler = b.proxy(d.swipeHandler, d), d.dragHandler = b
				.proxy(d.dragHandler, d), d.keyHandler = b.proxy(d.keyHandler, d), d.instanceUid = c++, d
				.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, d.registerBreakpoints(), d.init(!0)
		}
	}()).prototype.activateADA = function() {
		this.$slideTrack.find(".slick-active").attr({
			"aria-hidden": "false"
		}).find("a, input, button, select").attr({
			tabindex: "0"
		})
	}, a.prototype.addSlide = a.prototype.slickAdd = function(c, g, d) {
		var f = this;
		if ("boolean" == typeof g) {
			d = g, g = null
		} else {
			if (g < 0 || g >= f.slideCount) {
				return !1
			}
		}
		f.unload(), "number" == typeof g ? 0 === g && 0 === f.$slides.length ? b(c).appendTo(f.$slideTrack) :
			d ? b(c).insertBefore(f.$slides.eq(g)) : b(c).insertAfter(f.$slides.eq(g)) : !0 === d ? b(c)
			.prependTo(f.$slideTrack) : b(c).appendTo(f.$slideTrack), f.$slides = f.$slideTrack.children(this
				.options.slide), f.$slideTrack.children(this.options.slide).detach(), f.$slideTrack.append(f
				.$slides), f.$slides.each(function(h, i) {
				b(i).attr("data-slick-index", h)
			}), f.$slidesCache = f.$slides, f.reinit()
	}, a.prototype.animateHeight = function() {
		var d = this;
		if (1 === d.options.slidesToShow && !0 === d.options.adaptiveHeight && !1 === d.options.vertical) {
			var c = d.$slides.eq(d.currentSlide).outerHeight(!0);
			d.$list.animate({
				height: c
			}, d.options.speed)
		}
	}, a.prototype.animateSlide = function(c, g) {
		var d = {},
			f = this;
		f.animateHeight(), !0 === f.options.rtl && !1 === f.options.vertical && (c = -c), !1 === f
			.transformsEnabled ? !1 === f.options.vertical ? f.$slideTrack.animate({
				left: c
			}, f.options.speed, f.options.easing, g) : f.$slideTrack.animate({
				top: c
			}, f.options.speed, f.options.easing, g) : !1 === f.cssTransitions ? (!0 === f.options.rtl && (f
				.currentLeft = -f.currentLeft), b({
				animStart: f.currentLeft
			}).animate({
				animStart: c
			}, {
				duration: f.options.speed,
				easing: f.options.easing,
				step: function(e) {
					e = Math.ceil(e), !1 === f.options.vertical ? (d[f.animType] = "translate(" +
						e + "px, 0px)", f.$slideTrack.css(d)) : (d[f.animType] =
						"translate(0px," + e + "px)", f.$slideTrack.css(d))
				},
				complete: function() {
					g && g.call()
				}
			})) : (f.applyTransition(), c = Math.ceil(c), !1 === f.options.vertical ? d[f.animType] =
				"translate3d(" + c + "px, 0px, 0px)" : d[f.animType] = "translate3d(0px," + c + "px, 0px)", f
				.$slideTrack.css(d), g && setTimeout(function() {
					f.disableTransition(), g.call()
				}, f.options.speed))
	}, a.prototype.getNavTarget = function() {
		var c = this,
			d = c.options.asNavFor;
		return d && null !== d && (d = b(d).not(c.$slider)), d
	}, a.prototype.asNavFor = function(c) {
		var d = this.getNavTarget();
		null !== d && "object" == typeof d && d.each(function() {
			var e = b(this).slick("getSlick");
			e.unslicked || e.slideHandler(c, !0)
		})
	}, a.prototype.applyTransition = function(d) {
		var c = this,
			f = {};
		!1 === c.options.fade ? f[c.transitionType] = c.transformType + " " + c.options.speed + "ms " + c
			.options.cssEase : f[c.transitionType] = "opacity " + c.options.speed + "ms " + c.options.cssEase, !
			1 === c.options.fade ? c.$slideTrack.css(f) : c.$slides.eq(d).css(f)
	}, a.prototype.autoPlay = function() {
		var c = this;
		c.autoPlayClear(), c.slideCount > c.options.slidesToShow && (c.autoPlayTimer = setInterval(c
			.autoPlayIterator, c.options.autoplaySpeed))
	}, a.prototype.autoPlayClear = function() {
		var c = this;
		c.autoPlayTimer && clearInterval(c.autoPlayTimer)
	}, a.prototype.autoPlayIterator = function() {
		var d = this,
			c = d.currentSlide + d.options.slidesToScroll;
		d.paused || d.interrupted || d.focussed || (!1 === d.options.infinite && (1 === d.direction && d
				.currentSlide + 1 === d.slideCount - 1 ? d.direction = 0 : 0 === d.direction && (c = d
					.currentSlide - d.options.slidesToScroll, d.currentSlide - 1 == 0 && (d.direction = 1))
				), d.slideHandler(c))
	}, a.prototype.buildArrows = function() {
		var c = this;
		!0 === c.options.arrows && (c.$prevArrow = b(c.options.prevArrow).addClass("slick-arrow"), c
			.$nextArrow = b(c.options.nextArrow).addClass("slick-arrow"), c.slideCount > c.options
			.slidesToShow ? (c.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), c
				.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), c.htmlExpr.test(
					c.options.prevArrow) && c.$prevArrow.prependTo(c.options.appendArrows), c.htmlExpr.test(
					c.options.nextArrow) && c.$nextArrow.appendTo(c.options.appendArrows), !0 !== c.options
				.infinite && c.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : c
			.$prevArrow.add(c.$nextArrow).addClass("slick-hidden").attr({
				"aria-disabled": "true",
				tabindex: "-1"
			}))
	}, a.prototype.buildDots = function() {
		var c, f, d = this;
		if (!0 === d.options.dots) {
			for (d.$slider.addClass("slick-dotted"), f = b("<ul />").addClass(d.options.dotsClass), c = 0; c <=
				d.getDotCount(); c += 1) {
				f.append(b("<li />").append(d.options.customPaging.call(this, d, c)))
			}
			d.$dots = f.appendTo(d.options.appendDots), d.$dots.find("li").first().addClass("slick-active")
		}
	}, a.prototype.buildOut = function() {
		var c = this;
		c.$slides = c.$slider.children(c.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), c
			.slideCount = c.$slides.length, c.$slides.each(function(d, f) {
				b(f).attr("data-slick-index", d).data("originalStyling", b(f).attr("style") || "")
			}), c.$slider.addClass("slick-slider"), c.$slideTrack = 0 === c.slideCount ? b(
				'<div class="slick-track"/>').appendTo(c.$slider) : c.$slides.wrapAll(
				'<div class="slick-track"/>').parent(), c.$list = c.$slideTrack.wrap(
				'<div class="slick-list"/>').parent(), c.$slideTrack.css("opacity", 0), !0 !== c.options
			.centerMode && !0 !== c.options.swipeToSlide || (c.options.slidesToScroll = 1), b("img[data-lazy]",
				c.$slider).not("[src]").addClass("slick-loading"), c.setupInfinite(), c.buildArrows(), c
			.buildDots(), c.updateDots(), c.setSlideClasses("number" == typeof c.currentSlide ? c.currentSlide :
				0), !0 === c.options.draggable && c.$list.addClass("draggable")
	}, a.prototype.buildRows = function() {
		var k, j, w, q, v, p, u, m = this;
		if (q = document.createDocumentFragment(), p = m.$slider.children(), m.options.rows > 1) {
			for (u = m.options.slidesPerRow * m.options.rows, v = Math.ceil(p.length / u), k = 0; k < v; k++) {
				var h = document.createElement("div");
				for (j = 0; j < m.options.rows; j++) {
					var f = document.createElement("div");
					for (w = 0; w < m.options.slidesPerRow; w++) {
						var g = k * u + (j * m.options.slidesPerRow + w);
						p.get(g) && f.appendChild(p.get(g))
					}
					h.appendChild(f)
				}
				q.appendChild(h)
			}
			m.$slider.empty().append(q), m.$slider.children().children().children().css({
				width: 100 / m.options.slidesPerRow + "%",
				display: "inline-block"
			})
		}
	}, a.prototype.checkResponsive = function(g, p) {
		var j, m, i, k = this,
			h = !1,
			f = k.$slider.width(),
			c = window.innerWidth || b(window).width();
		if ("window" === k.respondTo ? i = c : "slider" === k.respondTo ? i = f : "min" === k.respondTo && (i =
				Math.min(c, f)), k.options.responsive && k.options.responsive.length && null !== k.options
			.responsive) {
			m = null;
			for (j in k.breakpoints) {
				k.breakpoints.hasOwnProperty(j) && (!1 === k.originalSettings.mobileFirst ? i < k.breakpoints[
					j] && (m = k.breakpoints[j]) : i > k.breakpoints[j] && (m = k.breakpoints[j]))
			}
			null !== m ? null !== k.activeBreakpoint ? (m !== k.activeBreakpoint || p) && (k.activeBreakpoint =
				m, "unslick" === k.breakpointSettings[m] ? k.unslick(m) : (k.options = b.extend({}, k
					.originalSettings, k.breakpointSettings[m]), !0 === g && (k.currentSlide = k.options
					.initialSlide), k.refresh(g)), h = m) : (k.activeBreakpoint = m, "unslick" === k
				.breakpointSettings[m] ? k.unslick(m) : (k.options = b.extend({}, k.originalSettings, k
						.breakpointSettings[m]), !0 === g && (k.currentSlide = k.options.initialSlide), k
					.refresh(g)), h = m) : null !== k.activeBreakpoint && (k.activeBreakpoint = null, k
				.options = k.originalSettings, !0 === g && (k.currentSlide = k.options.initialSlide), k
				.refresh(g), h = m), g || !1 === h || k.$slider.trigger("breakpoint", [k, h])
		}
	}, a.prototype.changeSlide = function(f, m) {
		var i, k, h, j = this,
			g = b(f.currentTarget);
		switch (g.is("a") && f.preventDefault(), g.is("li") || (g = g.closest("li")), h = j.slideCount % j
			.options.slidesToScroll != 0, i = h ? 0 : (j.slideCount - j.currentSlide) % j.options
			.slidesToScroll, f.data.message) {
			case "previous":
				k = 0 === i ? j.options.slidesToScroll : j.options.slidesToShow - i, j.slideCount > j.options
					.slidesToShow && j.slideHandler(j.currentSlide - k, !1, m);
				break;
			case "next":
				k = 0 === i ? j.options.slidesToScroll : i, j.slideCount > j.options.slidesToShow && j
					.slideHandler(j.currentSlide + k, !1, m);
				break;
			case "index":
				var c = 0 === f.data.index ? 0 : f.data.index || g.index() * j.options.slidesToScroll;
				j.slideHandler(j.checkNavigable(c), !1, m), g.children().trigger("focus");
				break;
			default:
				return
		}
	}, a.prototype.checkNavigable = function(d) {
		var c, g;
		if (c = this.getNavigableIndexes(), g = 0, d > c[c.length - 1]) {
			d = c[c.length - 1]
		} else {
			for (var f in c) {
				if (d < c[f]) {
					d = g;
					break
				}
				g = c[f]
			}
		}
		return d
	}, a.prototype.cleanUpEvents = function() {
		var c = this;
		c.options.dots && null !== c.$dots && (b("li", c.$dots).off("click.slick", c.changeSlide).off(
				"mouseenter.slick", b.proxy(c.interrupt, c, !0)).off("mouseleave.slick", b.proxy(c
				.interrupt, c, !1)), !0 === c.options.accessibility && c.$dots.off("keydown.slick", c
				.keyHandler)), c.$slider.off("focus.slick blur.slick"), !0 === c.options.arrows && c
			.slideCount > c.options.slidesToShow && (c.$prevArrow && c.$prevArrow.off("click.slick", c
					.changeSlide), c.$nextArrow && c.$nextArrow.off("click.slick", c.changeSlide), !0 === c
				.options.accessibility && (c.$prevArrow && c.$prevArrow.off("keydown.slick", c.keyHandler), c
					.$nextArrow && c.$nextArrow.off("keydown.slick", c.keyHandler))), c.$list.off(
				"touchstart.slick mousedown.slick", c.swipeHandler), c.$list.off(
				"touchmove.slick mousemove.slick", c.swipeHandler), c.$list.off("touchend.slick mouseup.slick",
				c.swipeHandler), c.$list.off("touchcancel.slick mouseleave.slick", c.swipeHandler), c.$list.off(
				"click.slick", c.clickHandler), b(document).off(c.visibilityChange, c.visibility), c
			.cleanUpSlideEvents(), !0 === c.options.accessibility && c.$list.off("keydown.slick", c.keyHandler),
			!0 === c.options.focusOnSelect && b(c.$slideTrack).children().off("click.slick", c.selectHandler),
			b(window).off("orientationchange.slick.slick-" + c.instanceUid, c.orientationChange), b(window).off(
				"resize.slick.slick-" + c.instanceUid, c.resize), b("[draggable!=true]", c.$slideTrack).off(
				"dragstart", c.preventDefault), b(window).off("load.slick.slick-" + c.instanceUid, c
				.setPosition)
	}, a.prototype.cleanUpSlideEvents = function() {
		var c = this;
		c.$list.off("mouseenter.slick", b.proxy(c.interrupt, c, !0)), c.$list.off("mouseleave.slick", b.proxy(c
			.interrupt, c, !1))
	}, a.prototype.cleanUpRows = function() {
		var d, c = this;
		c.options.rows > 1 && ((d = c.$slides.children().children()).removeAttr("style"), c.$slider.empty()
			.append(d))
	}, a.prototype.clickHandler = function(c) {
		!1 === this.shouldClick && (c.stopImmediatePropagation(), c.stopPropagation(), c.preventDefault())
	}, a.prototype.destroy = function(c) {
		var d = this;
		d.autoPlayClear(), d.touchObject = {}, d.cleanUpEvents(), b(".slick-cloned", d.$slider).detach(), d
			.$dots && d.$dots.remove(), d.$prevArrow && d.$prevArrow.length && (d.$prevArrow.removeClass(
					"slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex")
				.css("display", ""), d.htmlExpr.test(d.options.prevArrow) && d.$prevArrow.remove()), d
			.$nextArrow && d.$nextArrow.length && (d.$nextArrow.removeClass(
					"slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex")
				.css("display", ""), d.htmlExpr.test(d.options.nextArrow) && d.$nextArrow.remove()), d
			.$slides && (d.$slides.removeClass(
				"slick-slide slick-active slick-center slick-visible slick-current").removeAttr(
				"aria-hidden").removeAttr("data-slick-index").each(function() {
				b(this).attr("style", b(this).data("originalStyling"))
			}), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.detach(), d.$list
			.detach(), d.$slider.append(d.$slides)), d.cleanUpRows(), d.$slider.removeClass("slick-slider"), d
			.$slider.removeClass("slick-initialized"), d.$slider.removeClass("slick-dotted"), d.unslicked = !0,
			c || d.$slider.trigger("destroy", [d])
	}, a.prototype.disableTransition = function(d) {
		var c = this,
			f = {};
		f[c.transitionType] = "", !1 === c.options.fade ? c.$slideTrack.css(f) : c.$slides.eq(d).css(f)
	}, a.prototype.fadeSlide = function(d, c) {
		var f = this;
		!1 === f.cssTransitions ? (f.$slides.eq(d).css({
			zIndex: f.options.zIndex
		}), f.$slides.eq(d).animate({
			opacity: 1
		}, f.options.speed, f.options.easing, c)) : (f.applyTransition(d), f.$slides.eq(d).css({
			opacity: 1,
			zIndex: f.options.zIndex
		}), c && setTimeout(function() {
			f.disableTransition(d), c.call()
		}, f.options.speed))
	}, a.prototype.fadeSlideOut = function(d) {
		var c = this;
		!1 === c.cssTransitions ? c.$slides.eq(d).animate({
			opacity: 0,
			zIndex: c.options.zIndex - 2
		}, c.options.speed, c.options.easing) : (c.applyTransition(d), c.$slides.eq(d).css({
			opacity: 0,
			zIndex: c.options.zIndex - 2
		}))
	}, a.prototype.filterSlides = a.prototype.slickFilter = function(d) {
		var c = this;
		null !== d && (c.$slidesCache = c.$slides, c.unload(), c.$slideTrack.children(this.options.slide)
			.detach(), c.$slidesCache.filter(d).appendTo(c.$slideTrack), c.reinit())
	}, a.prototype.focusHandler = function() {
		var c = this;
		c.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(e) {
			e.stopImmediatePropagation();
			var d = b(this);
			setTimeout(function() {
				c.options.pauseOnFocus && (c.focussed = d.is(":focus"), c.autoPlay())
			}, 0)
		})
	}, a.prototype.getCurrent = a.prototype.slickCurrentSlide = function() {
		return this.currentSlide
	}, a.prototype.getDotCount = function() {
		var d = this,
			c = 0,
			g = 0,
			f = 0;
		if (!0 === d.options.infinite) {
			if (d.slideCount <= d.options.slidesToShow) {
				++f
			} else {
				for (; c < d.slideCount;) {
					++f, c = g + d.options.slidesToScroll, g += d.options.slidesToScroll <= d.options
						.slidesToShow ? d.options.slidesToScroll : d.options.slidesToShow
				}
			}
		} else {
			if (!0 === d.options.centerMode) {
				f = d.slideCount
			} else {
				if (d.options.asNavFor) {
					for (; c < d.slideCount;) {
						++f, c = g + d.options.slidesToScroll, g += d.options.slidesToScroll <= d.options
							.slidesToShow ? d.options.slidesToScroll : d.options.slidesToShow
					}
				} else {
					f = 1 + Math.ceil((d.slideCount - d.options.slidesToShow) / d.options.slidesToScroll)
				}
			}
		}
		return f - 1
	}, a.prototype.getLeft = function(d) {
		var c, k, g, j, f = this,
			h = 0;
		return f.slideOffset = 0, k = f.$slides.first().outerHeight(!0), !0 === f.options.infinite ? (f
				.slideCount > f.options.slidesToShow && (f.slideOffset = f.slideWidth * f.options.slidesToShow *
					-1, j = -1, !0 === f.options.vertical && !0 === f.options.centerMode && (2 === f.options
						.slidesToShow ? j = -1.5 : 1 === f.options.slidesToShow && (j = -2)), h = k * f.options
					.slidesToShow * j), f.slideCount % f.options.slidesToScroll != 0 && d + f.options
				.slidesToScroll > f.slideCount && f.slideCount > f.options.slidesToShow && (d > f.slideCount ? (
					f.slideOffset = (f.options.slidesToShow - (d - f.slideCount)) * f.slideWidth * -1, h = (
						f.options.slidesToShow - (d - f.slideCount)) * k * -1) : (f.slideOffset = f
					.slideCount % f.options.slidesToScroll * f.slideWidth * -1, h = f.slideCount % f.options
					.slidesToScroll * k * -1))) : d + f.options.slidesToShow > f.slideCount && (f.slideOffset =
				(d + f.options.slidesToShow - f.slideCount) * f.slideWidth, h = (d + f.options.slidesToShow - f
					.slideCount) * k), f.slideCount <= f.options.slidesToShow && (f.slideOffset = 0, h = 0), !
			0 === f.options.centerMode && f.slideCount <= f.options.slidesToShow ? f.slideOffset = f
			.slideWidth * Math.floor(f.options.slidesToShow) / 2 - f.slideWidth * f.slideCount / 2 : !0 === f
			.options.centerMode && !0 === f.options.infinite ? f.slideOffset += f.slideWidth * Math.floor(f
				.options.slidesToShow / 2) - f.slideWidth : !0 === f.options.centerMode && (f.slideOffset = 0, f
				.slideOffset += f.slideWidth * Math.floor(f.options.slidesToShow / 2)), c = !1 === f.options
			.vertical ? d * f.slideWidth * -1 + f.slideOffset : d * k * -1 + h, !0 === f.options
			.variableWidth && (g = f.slideCount <= f.options.slidesToShow || !1 === f.options.infinite ? f
				.$slideTrack.children(".slick-slide").eq(d) : f.$slideTrack.children(".slick-slide").eq(d + f
					.options.slidesToShow), c = !0 === f.options.rtl ? g[0] ? -1 * (f.$slideTrack.width() - g[0]
					.offsetLeft - g.width()) : 0 : g[0] ? -1 * g[0].offsetLeft : 0, !0 === f.options
				.centerMode && (g = f.slideCount <= f.options.slidesToShow || !1 === f.options.infinite ? f
					.$slideTrack.children(".slick-slide").eq(d) : f.$slideTrack.children(".slick-slide").eq(d +
						f.options.slidesToShow + 1), c = !0 === f.options.rtl ? g[0] ? -1 * (f.$slideTrack
						.width() - g[0].offsetLeft - g.width()) : 0 : g[0] ? -1 * g[0].offsetLeft : 0, c += (f
						.$list.width() - g.outerWidth()) / 2)), c
	}, a.prototype.getOption = a.prototype.slickGetOption = function(c) {
		return this.options[c]
	}, a.prototype.getNavigableIndexes = function() {
		var d, c = this,
			h = 0,
			f = 0,
			g = [];
		for (!1 === c.options.infinite ? d = c.slideCount : (h = -1 * c.options.slidesToScroll, f = -1 * c
				.options.slidesToScroll, d = 2 * c.slideCount); h < d;) {
			g.push(h), h = f + c.options.slidesToScroll, f += c.options.slidesToScroll <= c.options
				.slidesToShow ? c.options.slidesToScroll : c.options.slidesToShow
		}
		return g
	}, a.prototype.getSlick = function() {
		return this
	}, a.prototype.getSlideCount = function() {
		var c, f, d = this;
		return f = !0 === d.options.centerMode ? d.slideWidth * Math.floor(d.options.slidesToShow / 2) : 0, !
			0 === d.options.swipeToSlide ? (d.$slideTrack.find(".slick-slide").each(function(g, e) {
				if (e.offsetLeft - f + b(e).outerWidth() / 2 > -1 * d.swipeLeft) {
					return c = e, !1
				}
			}), Math.abs(b(c).attr("data-slick-index") - d.currentSlide) || 1) : d.options.slidesToScroll
	}, a.prototype.goTo = a.prototype.slickGoTo = function(d, c) {
		this.changeSlide({
			data: {
				message: "index",
				index: parseInt(d)
			}
		}, c)
	}, a.prototype.init = function(c) {
		var d = this;
		b(d.$slider).hasClass("slick-initialized") || (b(d.$slider).addClass("slick-initialized"), d
			.buildRows(), d.buildOut(), d.setProps(), d.startLoad(), d.loadSlider(), d.initializeEvents(), d
				.updateArrows(), d.updateDots(), d.checkResponsive(!0), d.focusHandler()), c && d.$slider
			.trigger("init", [d]), !0 === d.options.accessibility && d.initADA(), d.options.autoplay && (d
				.paused = !1, d.autoPlay())
	}, a.prototype.initADA = function() {
		var c = this,
			h = Math.ceil(c.slideCount / c.options.slidesToShow),
			f = c.getNavigableIndexes().filter(function(e) {
				return e >= 0 && e < c.slideCount
			});
		c.$slides.add(c.$slideTrack.find(".slick-cloned")).attr({
			"aria-hidden": "true",
			tabindex: "-1"
		}).find("a, input, button, select").attr({
			tabindex: "-1"
		}), null !== c.$dots && (c.$slides.not(c.$slideTrack.find(".slick-cloned")).each(function(i) {
			var e = f.indexOf(i);
			b(this).attr({
				role: "tabpanel",
				id: "slick-slide" + c.instanceUid + i,
				tabindex: -1
			}), -1 !== e && b(this).attr({
				"aria-describedby": "slick-slide-control" + c.instanceUid + e
			})
		}), c.$dots.attr("role", "tablist").find("li").each(function(i) {
			var e = f[i];
			b(this).attr({
				role: "presentation"
			}), b(this).find("button").first().attr({
				role: "tab",
				id: "slick-slide-control" + c.instanceUid + i,
				"aria-controls": "slick-slide" + c.instanceUid + e,
				"aria-label": i + 1 + " of " + h,
				"aria-selected": null,
				tabindex: "-1"
			})
		}).eq(c.currentSlide).find("button").attr({
			"aria-selected": "true",
			tabindex: "0"
		}).end());
		for (var g = c.currentSlide, d = g + c.options.slidesToShow; g < d; g++) {
			c.$slides.eq(g).attr("tabindex", 0)
		}
		c.activateADA()
	}, a.prototype.initArrowEvents = function() {
		var c = this;
		!0 === c.options.arrows && c.slideCount > c.options.slidesToShow && (c.$prevArrow.off("click.slick").on(
			"click.slick", {
				message: "previous"
			}, c.changeSlide), c.$nextArrow.off("click.slick").on("click.slick", {
			message: "next"
		}, c.changeSlide), !0 === c.options.accessibility && (c.$prevArrow.on("keydown.slick", c
			.keyHandler), c.$nextArrow.on("keydown.slick", c.keyHandler)))
	}, a.prototype.initDotEvents = function() {
		var c = this;
		!0 === c.options.dots && (b("li", c.$dots).on("click.slick", {
				message: "index"
			}, c.changeSlide), !0 === c.options.accessibility && c.$dots.on("keydown.slick", c.keyHandler)), !
			0 === c.options.dots && !0 === c.options.pauseOnDotsHover && b("li", c.$dots).on("mouseenter.slick",
				b.proxy(c.interrupt, c, !0)).on("mouseleave.slick", b.proxy(c.interrupt, c, !1))
	}, a.prototype.initSlideEvents = function() {
		var c = this;
		c.options.pauseOnHover && (c.$list.on("mouseenter.slick", b.proxy(c.interrupt, c, !0)), c.$list.on(
			"mouseleave.slick", b.proxy(c.interrupt, c, !1)))
	}, a.prototype.initializeEvents = function() {
		var c = this;
		c.initArrowEvents(), c.initDotEvents(), c.initSlideEvents(), c.$list.on(
			"touchstart.slick mousedown.slick", {
				action: "start"
			}, c.swipeHandler), c.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, c.swipeHandler), c.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, c.swipeHandler), c.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, c.swipeHandler), c.$list.on("click.slick", c.clickHandler), b(document).on(c.visibilityChange, b
			.proxy(c.visibility, c)), !0 === c.options.accessibility && c.$list.on("keydown.slick", c
			.keyHandler), !0 === c.options.focusOnSelect && b(c.$slideTrack).children().on("click.slick", c
			.selectHandler), b(window).on("orientationchange.slick.slick-" + c.instanceUid, b.proxy(c
			.orientationChange, c)), b(window).on("resize.slick.slick-" + c.instanceUid, b.proxy(c.resize,
			c)), b("[draggable!=true]", c.$slideTrack).on("dragstart", c.preventDefault), b(window).on(
			"load.slick.slick-" + c.instanceUid, c.setPosition), b(c.setPosition)
	}, a.prototype.initUI = function() {
		var c = this;
		!0 === c.options.arrows && c.slideCount > c.options.slidesToShow && (c.$prevArrow.show(), c.$nextArrow
			.show()), !0 === c.options.dots && c.slideCount > c.options.slidesToShow && c.$dots.show()
	}, a.prototype.keyHandler = function(d) {
		var c = this;
		d.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === d.keyCode && !0 === c.options.accessibility ?
			c.changeSlide({
				data: {
					message: !0 === c.options.rtl ? "next" : "previous"
				}
			}) : 39 === d.keyCode && !0 === c.options.accessibility && c.changeSlide({
				data: {
					message: !0 === c.options.rtl ? "previous" : "next"
				}
			}))
	}, a.prototype.lazyLoad = function() {
		function g(d) {
			b("img[data-lazy]", d).each(function() {
				var l = b(this),
					v = b(this).attr("data-lazy"),
					n = b(this).attr("data-srcset"),
					u = b(this).attr("data-sizes") || i.$slider.attr("data-sizes"),
					q = document.createElement("img");
				q.onload = function() {
					l.animate({
						opacity: 0
					}, 100, function() {
						n && (l.attr("srcset", n), u && l.attr("sizes", u)), l.attr("src",
							v).animate({
							opacity: 1
						}, 200, function() {
							l.removeAttr("data-lazy data-srcset data-sizes")
								.removeClass("slick-loading")
						}), i.$slider.trigger("lazyLoaded", [i, l, v])
					})
				}, q.onerror = function() {
					l.removeAttr("data-lazy").removeClass("slick-loading").addClass(
						"slick-lazyload-error"), i.$slider.trigger("lazyLoadError", [i, l, v])
				}, q.src = v
			})
		}
		var p, j, m, i = this;
		if (!0 === i.options.centerMode ? !0 === i.options.infinite ? m = (j = i.currentSlide + (i.options
				.slidesToShow / 2 + 1)) + i.options.slidesToShow + 2 : (j = Math.max(0, i.currentSlide - (i
				.options.slidesToShow / 2 + 1)), m = i.options.slidesToShow / 2 + 1 + 2 + i.currentSlide) : (j =
				i.options.infinite ? i.options.slidesToShow + i.currentSlide : i.currentSlide, m = Math.ceil(j +
					i.options.slidesToShow), !0 === i.options.fade && (j > 0 && j--, m <= i.slideCount && m++)),
			p = i.$slider.find(".slick-slide").slice(j, m), "anticipated" === i.options.lazyLoad) {
			for (var k = j - 1, h = m, f = i.$slider.find(".slick-slide"), c = 0; c < i.options
				.slidesToScroll; c++) {
				k < 0 && (k = i.slideCount - 1), p = (p = p.add(f.eq(k))).add(f.eq(h)), k--, h++
			}
		}
		g(p), i.slideCount <= i.options.slidesToShow ? g(i.$slider.find(".slick-slide")) : i.currentSlide >= i
			.slideCount - i.options.slidesToShow ? g(i.$slider.find(".slick-cloned").slice(0, i.options
				.slidesToShow)) : 0 === i.currentSlide && g(i.$slider.find(".slick-cloned").slice(-1 * i.options
				.slidesToShow))
	}, a.prototype.loadSlider = function() {
		var c = this;
		c.setPosition(), c.$slideTrack.css({
				opacity: 1
			}), c.$slider.removeClass("slick-loading"), c.initUI(), "progressive" === c.options.lazyLoad && c
			.progressiveLazyLoad()
	}, a.prototype.next = a.prototype.slickNext = function() {
		this.changeSlide({
			data: {
				message: "next"
			}
		})
	}, a.prototype.orientationChange = function() {
		var c = this;
		c.checkResponsive(), c.setPosition()
	}, a.prototype.pause = a.prototype.slickPause = function() {
		var c = this;
		c.autoPlayClear(), c.paused = !0
	}, a.prototype.play = a.prototype.slickPlay = function() {
		var c = this;
		c.autoPlay(), c.options.autoplay = !0, c.paused = !1, c.focussed = !1, c.interrupted = !1
	}, a.prototype.postSlide = function(c) {
		var d = this;
		d.unslicked || (d.$slider.trigger("afterChange", [d, c]), d.animating = !1, d.slideCount > d.options
			.slidesToShow && d.setPosition(), d.swipeLeft = null, d.options.autoplay && d.autoPlay(), !0 ===
			d.options.accessibility && (d.initADA(), d.options.focusOnChange && b(d.$slides.get(d
				.currentSlide)).attr("tabindex", 0).focus()))
	}, a.prototype.prev = a.prototype.slickPrev = function() {
		this.changeSlide({
			data: {
				message: "previous"
			}
		})
	}, a.prototype.preventDefault = function(c) {
		c.preventDefault()
	}, a.prototype.progressiveLazyLoad = function(f) {
		f = f || 1;
		var m, i, k, h, j, g = this,
			c = b("img[data-lazy]", g.$slider);
		c.length ? (m = c.first(), i = m.attr("data-lazy"), k = m.attr("data-srcset"), h = m.attr(
			"data-sizes") || g.$slider.attr("data-sizes"), (j = document.createElement("img")).onload =
			function() {
				k && (m.attr("srcset", k), h && m.attr("sizes", h)), m.attr("src", i).removeAttr(
						"data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === g.options
					.adaptiveHeight && g.setPosition(), g.$slider.trigger("lazyLoaded", [g, m, i]), g
					.progressiveLazyLoad()
			}, j.onerror = function() {
				f < 3 ? setTimeout(function() {
					g.progressiveLazyLoad(f + 1)
				}, 500) : (m.removeAttr("data-lazy").removeClass("slick-loading").addClass(
						"slick-lazyload-error"), g.$slider.trigger("lazyLoadError", [g, m, i]), g
					.progressiveLazyLoad())
			}, j.src = i) : g.$slider.trigger("allImagesLoaded", [g])
	}, a.prototype.refresh = function(c) {
		var g, d, f = this;
		d = f.slideCount - f.options.slidesToShow, !f.options.infinite && f.currentSlide > d && (f
				.currentSlide = d), f.slideCount <= f.options.slidesToShow && (f.currentSlide = 0), g = f
			.currentSlide, f.destroy(!0), b.extend(f, f.initials, {
				currentSlide: g
			}), f.init(), c || f.changeSlide({
				data: {
					message: "index",
					index: g
				}
			}, !1)
	}, a.prototype.registerBreakpoints = function() {
		var c, h, f, g = this,
			d = g.options.responsive || null;
		if ("array" === b.type(d) && d.length) {
			g.respondTo = g.options.respondTo || "window";
			for (c in d) {
				if (f = g.breakpoints.length - 1, d.hasOwnProperty(c)) {
					for (h = d[c].breakpoint; f >= 0;) {
						g.breakpoints[f] && g.breakpoints[f] === h && g.breakpoints.splice(f, 1), f--
					}
					g.breakpoints.push(h), g.breakpointSettings[h] = d[c].settings
				}
			}
			g.breakpoints.sort(function(k, j) {
				return g.options.mobileFirst ? k - j : j - k
			})
		}
	}, a.prototype.reinit = function() {
		var c = this;
		c.$slides = c.$slideTrack.children(c.options.slide).addClass("slick-slide"), c.slideCount = c.$slides
			.length, c.currentSlide >= c.slideCount && 0 !== c.currentSlide && (c.currentSlide = c
				.currentSlide - c.options.slidesToScroll), c.slideCount <= c.options.slidesToShow && (c
				.currentSlide = 0), c.registerBreakpoints(), c.setProps(), c.setupInfinite(), c.buildArrows(), c
			.updateArrows(), c.initArrowEvents(), c.buildDots(), c.updateDots(), c.initDotEvents(), c
			.cleanUpSlideEvents(), c.initSlideEvents(), c.checkResponsive(!1, !0), !0 === c.options
			.focusOnSelect && b(c.$slideTrack).children().on("click.slick", c.selectHandler), c.setSlideClasses(
				"number" == typeof c.currentSlide ? c.currentSlide : 0), c.setPosition(), c.focusHandler(), c
			.paused = !c.options.autoplay, c.autoPlay(), c.$slider.trigger("reInit", [c])
	}, a.prototype.resize = function() {
		var c = this;
		b(window).width() !== c.windowWidth && (clearTimeout(c.windowDelay), c.windowDelay = window.setTimeout(
			function() {
				c.windowWidth = b(window).width(), c.checkResponsive(), c.unslicked || c.setPosition()
			}, 50))
	}, a.prototype.removeSlide = a.prototype.slickRemove = function(d, c, g) {
		var f = this;
		if (d = "boolean" == typeof d ? !0 === (c = d) ? 0 : f.slideCount - 1 : !0 === c ? --d : d, f
			.slideCount < 1 || d < 0 || d > f.slideCount - 1) {
			return !1
		}
		f.unload(), !0 === g ? f.$slideTrack.children().remove() : f.$slideTrack.children(this.options.slide)
			.eq(d).remove(), f.$slides = f.$slideTrack.children(this.options.slide), f.$slideTrack.children(this
				.options.slide).detach(), f.$slideTrack.append(f.$slides), f.$slidesCache = f.$slides, f
			.reinit()
	}, a.prototype.setCSS = function(d) {
		var c, h, f = this,
			g = {};
		!0 === f.options.rtl && (d = -d), c = "left" == f.positionProp ? Math.ceil(d) + "px" : "0px", h =
			"top" == f.positionProp ? Math.ceil(d) + "px" : "0px", g[f.positionProp] = d, !1 === f
			.transformsEnabled ? f.$slideTrack.css(g) : (g = {}, !1 === f.cssTransitions ? (g[f.animType] =
				"translate(" + c + ", " + h + ")", f.$slideTrack.css(g)) : (g[f.animType] = "translate3d(" +
				c + ", " + h + ", 0px)", f.$slideTrack.css(g)))
	}, a.prototype.setDimensions = function() {
		var d = this;
		!1 === d.options.vertical ? !0 === d.options.centerMode && d.$list.css({
				padding: "0px " + d.options.centerPadding
			}) : (d.$list.height(d.$slides.first().outerHeight(!0) * d.options.slidesToShow), !0 === d.options
				.centerMode && d.$list.css({
					padding: d.options.centerPadding + " 0px"
				})), d.listWidth = d.$list.width(), d.listHeight = d.$list.height(), !1 === d.options
			.vertical && !1 === d.options.variableWidth ? (d.slideWidth = Math.ceil(d.listWidth / d.options
				.slidesToShow), d.$slideTrack.width(Math.ceil(d.slideWidth * d.$slideTrack.children(
				".slick-slide").length))) : !0 === d.options.variableWidth ? d.$slideTrack.width(5000 * d
				.slideCount) : (d.slideWidth = Math.ceil(d.listWidth), d.$slideTrack.height(Math.ceil(d.$slides
				.first().outerHeight(!0) * d.$slideTrack.children(".slick-slide").length)));
		var c = d.$slides.first().outerWidth(!0) - d.$slides.first().width();
		!1 === d.options.variableWidth && d.$slideTrack.children(".slick-slide").width(d.slideWidth - c)
	}, a.prototype.setFade = function() {
		var c, d = this;
		d.$slides.each(function(e, f) {
			c = d.slideWidth * e * -1, !0 === d.options.rtl ? b(f).css({
				position: "relative",
				right: c,
				top: 0,
				zIndex: d.options.zIndex - 2,
				opacity: 0
			}) : b(f).css({
				position: "relative",
				left: c,
				top: 0,
				zIndex: d.options.zIndex - 2,
				opacity: 0
			})
		}), d.$slides.eq(d.currentSlide).css({
			zIndex: d.options.zIndex - 1,
			opacity: 1
		})
	}, a.prototype.setHeight = function() {
		var d = this;
		if (1 === d.options.slidesToShow && !0 === d.options.adaptiveHeight && !1 === d.options.vertical) {
			var c = d.$slides.eq(d.currentSlide).outerHeight(!0);
			d.$list.css("height", c)
		}
	}, a.prototype.setOption = a.prototype.slickSetOption = function() {
		var c, j, g, i, f, h = this,
			d = !1;
		if ("object" === b.type(arguments[0]) ? (g = arguments[0], d = arguments[1], f = "multiple") :
			"string" === b.type(arguments[0]) && (g = arguments[0], i = arguments[1], d = arguments[2],
				"responsive" === arguments[0] && "array" === b.type(arguments[1]) ? f = "responsive" :
				void 0 !== arguments[1] && (f = "single")), "single" === f) {
			h.options[g] = i
		} else {
			if ("multiple" === f) {
				b.each(g, function(l, k) {
					h.options[l] = k
				})
			} else {
				if ("responsive" === f) {
					for (j in i) {
						if ("array" !== b.type(h.options.responsive)) {
							h.options.responsive = [i[j]]
						} else {
							for (c = h.options.responsive.length - 1; c >= 0;) {
								h.options.responsive[c].breakpoint === i[j].breakpoint && h.options.responsive
									.splice(c, 1), c--
							}
							h.options.responsive.push(i[j])
						}
					}
				}
			}
		}
		d && (h.unload(), h.reinit())
	}, a.prototype.setPosition = function() {
		var c = this;
		c.setDimensions(), c.setHeight(), !1 === c.options.fade ? c.setCSS(c.getLeft(c.currentSlide)) : c
			.setFade(), c.$slider.trigger("setPosition", [c])
	}, a.prototype.setProps = function() {
		var d = this,
			c = document.body.style;
		d.positionProp = !0 === d.options.vertical ? "top" : "left", "top" === d.positionProp ? d.$slider
			.addClass("slick-vertical") : d.$slider.removeClass("slick-vertical"), void 0 === c
			.WebkitTransition && void 0 === c.MozTransition && void 0 === c.msTransition || !0 === d.options
			.useCSS && (d.cssTransitions = !0), d.options.fade && ("number" == typeof d.options.zIndex ? d
				.options.zIndex < 3 && (d.options.zIndex = 3) : d.options.zIndex = d.defaults.zIndex),
			void 0 !== c.OTransform && (d.animType = "OTransform", d.transformType = "-o-transform", d
				.transitionType = "OTransition", void 0 === c.perspectiveProperty && void 0 === c
				.webkitPerspective && (d.animType = !1)), void 0 !== c.MozTransform && (d.animType =
				"MozTransform", d.transformType = "-moz-transform", d.transitionType = "MozTransition",
				void 0 === c.perspectiveProperty && void 0 === c.MozPerspective && (d.animType = !1)),
			void 0 !== c.webkitTransform && (d.animType = "webkitTransform", d.transformType =
				"-webkit-transform", d.transitionType = "webkitTransition", void 0 === c.perspectiveProperty &&
				void 0 === c.webkitPerspective && (d.animType = !1)), void 0 !== c.msTransform && (d.animType =
				"msTransform", d.transformType = "-ms-transform", d.transitionType = "msTransition", void 0 ===
				c.msTransform && (d.animType = !1)), void 0 !== c.transform && !1 !== d.animType && (d
				.animType = "transform", d.transformType = "transform", d.transitionType = "transition"), d
			.transformsEnabled = d.options.useTransform && null !== d.animType && !1 !== d.animType
	}, a.prototype.setSlideClasses = function(d) {
		var c, k, g, j, f = this;
		if (k = f.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr(
				"aria-hidden", "true"), f.$slides.eq(d).addClass("slick-current"), !0 === f.options
			.centerMode) {
			var h = f.options.slidesToShow % 2 == 0 ? 1 : 0;
			c = Math.floor(f.options.slidesToShow / 2), !0 === f.options.infinite && (d >= c && d <= f
				.slideCount - 1 - c ? f.$slides.slice(d - c + h, d + c + 1).addClass("slick-active").attr(
					"aria-hidden", "false") : (g = f.options.slidesToShow + d, k.slice(g - c + 1 + h, g +
					c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === d ? k.eq(k.length -
					1 - f.options.slidesToShow).addClass("slick-center") : d === f.slideCount - 1 && k.eq(f
					.options.slidesToShow).addClass("slick-center")), f.$slides.eq(d).addClass(
				"slick-center")
		} else {
			d >= 0 && d <= f.slideCount - f.options.slidesToShow ? f.$slides.slice(d, d + f.options
					.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : k.length <= f.options
				.slidesToShow ? k.addClass("slick-active").attr("aria-hidden", "false") : (j = f.slideCount % f
					.options.slidesToShow, g = !0 === f.options.infinite ? f.options.slidesToShow + d : d, f
					.options.slidesToShow == f.options.slidesToScroll && f.slideCount - d < f.options
					.slidesToShow ? k.slice(g - (f.options.slidesToShow - j), g + j).addClass("slick-active")
					.attr("aria-hidden", "false") : k.slice(g, g + f.options.slidesToShow).addClass(
						"slick-active").attr("aria-hidden", "false"))
		}
		"ondemand" !== f.options.lazyLoad && "anticipated" !== f.options.lazyLoad || f.lazyLoad()
	}, a.prototype.setupInfinite = function() {
		var c, g, d, f = this;
		if (!0 === f.options.fade && (f.options.centerMode = !1), !0 === f.options.infinite && !1 === f.options
			.fade && (g = null, f.slideCount > f.options.slidesToShow)) {
			for (d = !0 === f.options.centerMode ? f.options.slidesToShow + 1 : f.options.slidesToShow, c = f
				.slideCount; c > f.slideCount - d; c -= 1) {
				g = c - 1, b(f.$slides[g]).clone(!0).attr("id", "").attr("data-slick-index", g - f.slideCount)
					.prependTo(f.$slideTrack).addClass("slick-cloned")
			}
			for (c = 0; c < d + f.slideCount; c += 1) {
				g = c, b(f.$slides[g]).clone(!0).attr("id", "").attr("data-slick-index", g + f.slideCount)
					.appendTo(f.$slideTrack).addClass("slick-cloned")
			}
			f.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
				b(this).attr("id", "")
			})
		}
	}, a.prototype.interrupt = function(d) {
		var c = this;
		d || c.autoPlay(), c.interrupted = d
	}, a.prototype.selectHandler = function(c) {
		var g = this,
			d = b(c.target).is(".slick-slide") ? b(c.target) : b(c.target).parents(".slick-slide"),
			f = parseInt(d.attr("data-slick-index"));
		f || (f = 0), g.slideCount <= g.options.slidesToShow ? g.slideHandler(f, !1, !0) : g.slideHandler(f)
	}, a.prototype.slideHandler = function(h, g, u) {
		var m, q, k, p, j, f = null,
			c = this;
		if (g = g || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c
				.currentSlide === h)) {
			if (!1 === g && c.asNavFor(h), m = h, f = c.getLeft(m), p = c.getLeft(c.currentSlide), c
				.currentLeft = null === c.swipeLeft ? p : c.swipeLeft, !1 === c.options.infinite && !1 === c
				.options.centerMode && (h < 0 || h > c.getDotCount() * c.options.slidesToScroll)) {
				!1 === c.options.fade && (m = c.currentSlide, !0 !== u ? c.animateSlide(p, function() {
					c.postSlide(m)
				}) : c.postSlide(m))
			} else {
				if (!1 === c.options.infinite && !0 === c.options.centerMode && (h < 0 || h > c.slideCount - c
						.options.slidesToScroll)) {
					!1 === c.options.fade && (m = c.currentSlide, !0 !== u ? c.animateSlide(p, function() {
						c.postSlide(m)
					}) : c.postSlide(m))
				} else {
					if (c.options.autoplay && clearInterval(c.autoPlayTimer), q = m < 0 ? c.slideCount % c
						.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll :
						c.slideCount + m : m >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ?
						0 : m - c.slideCount : m, c.animating = !0, c.$slider.trigger("beforeChange", [c, c
							.currentSlide, q
						]), k = c.currentSlide, c.currentSlide = q, c.setSlideClasses(c.currentSlide), c.options
						.asNavFor && (j = (j = c.getNavTarget()).slick("getSlick")).slideCount <= j.options
						.slidesToShow && j.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !
						0 === c.options.fade) {
						return !0 !== u ? (c.fadeSlideOut(k), c.fadeSlide(q, function() {
							c.postSlide(q)
						})) : c.postSlide(q), void c.animateHeight()
					}!0 !== u ? c.animateSlide(f, function() {
						c.postSlide(q)
					}) : c.postSlide(q)
				}
			}
		}
	}, a.prototype.startLoad = function() {
		var c = this;
		!0 === c.options.arrows && c.slideCount > c.options.slidesToShow && (c.$prevArrow.hide(), c.$nextArrow
				.hide()), !0 === c.options.dots && c.slideCount > c.options.slidesToShow && c.$dots.hide(), c
			.$slider.addClass("slick-loading")
	}, a.prototype.swipeDirection = function() {
		var d, c, h, f, g = this;
		return d = g.touchObject.startX - g.touchObject.curX, c = g.touchObject.startY - g.touchObject.curY, h =
			Math.atan2(c, d), (f = Math.round(180 * h / Math.PI)) < 0 && (f = 360 - Math.abs(f)), f <= 45 &&
			f >= 0 ? !1 === g.options.rtl ? "left" : "right" : f <= 360 && f >= 315 ? !1 === g.options.rtl ?
			"left" : "right" : f >= 135 && f <= 225 ? !1 === g.options.rtl ? "right" : "left" : !0 === g.options
			.verticalSwiping ? f >= 35 && f <= 135 ? "down" : "up" : "vertical"
	}, a.prototype.swipeEnd = function(d) {
		var c, g, f = this;
		if (f.dragging = !1, f.swiping = !1, f.scrolling) {
			return f.scrolling = !1, !1
		}
		if (f.interrupted = !1, f.shouldClick = !(f.touchObject.swipeLength > 10), void 0 === f.touchObject
			.curX) {
			return !1
		}
		if (!0 === f.touchObject.edgeHit && f.$slider.trigger("edge", [f, f.swipeDirection()]), f.touchObject
			.swipeLength >= f.touchObject.minSwipe) {
			switch (g = f.swipeDirection()) {
				case "left":
				case "down":
					c = f.options.swipeToSlide ? f.checkNavigable(f.currentSlide + f.getSlideCount()) : f
						.currentSlide + f.getSlideCount(), f.currentDirection = 0;
					break;
				case "right":
				case "up":
					c = f.options.swipeToSlide ? f.checkNavigable(f.currentSlide - f.getSlideCount()) : f
						.currentSlide - f.getSlideCount(), f.currentDirection = 1
			}
			"vertical" != g && (f.slideHandler(c), f.touchObject = {}, f.$slider.trigger("swipe", [f, g]))
		} else {
			f.touchObject.startX !== f.touchObject.curX && (f.slideHandler(f.currentSlide), f.touchObject = {})
		}
	}, a.prototype.swipeHandler = function(d) {
		var c = this;
		if (!(!1 === c.options.swipe || "ontouchend" in document && !1 === c.options.swipe || !1 === c.options
				.draggable && -1 !== d.type.indexOf("mouse"))) {
			switch (c.touchObject.fingerCount = d.originalEvent && void 0 !== d.originalEvent.touches ? d
				.originalEvent.touches.length : 1, c.touchObject.minSwipe = c.listWidth / c.options
				.touchThreshold, !0 === c.options.verticalSwiping && (c.touchObject.minSwipe = c.listHeight / c
					.options.touchThreshold), d.data.action) {
				case "start":
					c.swipeStart(d);
					break;
				case "move":
					c.swipeMove(d);
					break;
				case "end":
					c.swipeEnd(d)
			}
		}
	}, a.prototype.swipeMove = function(d) {
		var c, m, h, k, g, j, f = this;
		return g = void 0 !== d.originalEvent ? d.originalEvent.touches : null, !(!f.dragging || f.scrolling ||
			g && 1 !== g.length) && (c = f.getLeft(f.currentSlide), f.touchObject.curX = void 0 !== g ? g[0]
			.pageX : d.clientX, f.touchObject.curY = void 0 !== g ? g[0].pageY : d.clientY, f.touchObject
			.swipeLength = Math.round(Math.sqrt(Math.pow(f.touchObject.curX - f.touchObject.startX, 2))),
			j = Math.round(Math.sqrt(Math.pow(f.touchObject.curY - f.touchObject.startY, 2))), !f.options
			.verticalSwiping && !f.swiping && j > 4 ? (f.scrolling = !0, !1) : (!0 === f.options
				.verticalSwiping && (f.touchObject.swipeLength = j), m = f.swipeDirection(), void 0 !== d
				.originalEvent && f.touchObject.swipeLength > 4 && (f.swiping = !0, d.preventDefault()), k =
				(!1 === f.options.rtl ? 1 : -1) * (f.touchObject.curX > f.touchObject.startX ? 1 : -1), !
				0 === f.options.verticalSwiping && (k = f.touchObject.curY > f.touchObject.startY ? 1 : -1),
				h = f.touchObject.swipeLength, f.touchObject.edgeHit = !1, !1 === f.options.infinite && (
					0 === f.currentSlide && "right" === m || f.currentSlide >= f.getDotCount() && "left" ===
					m) && (h = f.touchObject.swipeLength * f.options.edgeFriction, f.touchObject.edgeHit = !
					0), !1 === f.options.vertical ? f.swipeLeft = c + h * k : f.swipeLeft = c + h * (f.$list
					.height() / f.listWidth) * k, !0 === f.options.verticalSwiping && (f.swipeLeft = c + h *
					k), !0 !== f.options.fade && !1 !== f.options.touchMove && (!0 === f.animating ? (f
					.swipeLeft = null, !1) : void f.setCSS(f.swipeLeft))))
	}, a.prototype.swipeStart = function(d) {
		var c, f = this;
		if (f.interrupted = !0, 1 !== f.touchObject.fingerCount || f.slideCount <= f.options.slidesToShow) {
			return f.touchObject = {}, !1
		}
		void 0 !== d.originalEvent && void 0 !== d.originalEvent.touches && (c = d.originalEvent.touches[0]), f
			.touchObject.startX = f.touchObject.curX = void 0 !== c ? c.pageX : d.clientX, f.touchObject
			.startY = f.touchObject.curY = void 0 !== c ? c.pageY : d.clientY, f.dragging = !0
	}, a.prototype.unfilterSlides = a.prototype.slickUnfilter = function() {
		var c = this;
		null !== c.$slidesCache && (c.unload(), c.$slideTrack.children(this.options.slide).detach(), c
			.$slidesCache.appendTo(c.$slideTrack), c.reinit())
	}, a.prototype.unload = function() {
		var c = this;
		b(".slick-cloned", c.$slider).remove(), c.$dots && c.$dots.remove(), c.$prevArrow && c.htmlExpr.test(c
			.options.prevArrow) && c.$prevArrow.remove(), c.$nextArrow && c.htmlExpr.test(c.options
			.nextArrow) && c.$nextArrow.remove(), c.$slides.removeClass(
			"slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width",
			"")
	}, a.prototype.unslick = function(d) {
		var c = this;
		c.$slider.trigger("unslick", [c, d]), c.destroy()
	}, a.prototype.updateArrows = function() {
		var c = this;
		Math.floor(c.options.slidesToShow / 2), !0 === c.options.arrows && c.slideCount > c.options
			.slidesToShow && !c.options.infinite && (c.$prevArrow.removeClass("slick-disabled").attr(
					"aria-disabled", "false"), c.$nextArrow.removeClass("slick-disabled").attr("aria-disabled",
					"false"), 0 === c.currentSlide ? (c.$prevArrow.addClass("slick-disabled").attr(
					"aria-disabled", "true"), c.$nextArrow.removeClass("slick-disabled").attr(
					"aria-disabled", "false")) : c.currentSlide >= c.slideCount - c.options.slidesToShow && !
				1 === c.options.centerMode ? (c.$nextArrow.addClass("slick-disabled").attr("aria-disabled",
					"true"), c.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : c
				.currentSlide >= c.slideCount - 1 && !0 === c.options.centerMode && (c.$nextArrow.addClass(
					"slick-disabled").attr("aria-disabled", "true"), c.$prevArrow.removeClass(
					"slick-disabled").attr("aria-disabled", "false")))
	}, a.prototype.updateDots = function() {
		var c = this;
		null !== c.$dots && (c.$dots.find("li").removeClass("slick-active").end(), c.$dots.find("li").eq(Math
			.floor(c.currentSlide / c.options.slidesToScroll)).addClass("slick-active"))
	}, a.prototype.visibility = function() {
		var c = this;
		c.options.autoplay && (document[c.hidden] ? c.interrupted = !0 : c.interrupted = !1)
	}, b.fn.slick = function() {
		var c, h, e = this,
			g = arguments[0],
			d = Array.prototype.slice.call(arguments, 1),
			f = e.length;
		for (c = 0; c < f; c++) {
			if ("object" == typeof g || void 0 === g ? e[c].slick = new a(e[c], g) : h = e[c].slick[g].apply(e[
					c].slick, d), void 0 !== h) {
				return h
			}
		}
		return e
	}
});
/*
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
! function(a, b) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", b) : "object" == typeof module && module
		.exports ? module.exports = b() : a.EvEmitter = b()
}("undefined" != typeof window ? window : this, function() {
	function a() {}
	var b = a.prototype;
	return b.on = function(c, g) {
		if (c && g) {
			var d = this._events = this._events || {},
				f = d[c] = d[c] || [];
			return f.indexOf(g) == -1 && f.push(g), this
		}
	}, b.once = function(c, g) {
		if (c && g) {
			this.on(c, g);
			var d = this._onceEvents = this._onceEvents || {},
				f = d[c] = d[c] || {};
			return f[g] = !0, this
		}
	}, b.off = function(c, g) {
		var d = this._events && this._events[c];
		if (d && d.length) {
			var f = d.indexOf(g);
			return f != -1 && d.splice(f, 1), this
		}
	}, b.emitEvent = function(c, k) {
		var d = this._events && this._events[c];
		if (d && d.length) {
			d = d.slice(0), k = k || [];
			for (var f = this._onceEvents && this._onceEvents[c], g = 0; g < d.length; g++) {
				var h = d[g],
					j = f && f[h];
				j && (this.off(c, h), delete f[h]), h.apply(this, k)
			}
			return this
		}
	}, b.allOff = function() {
		delete this._events, delete this._onceEvents
	}, a
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(c) {
			return b(a, c)
		}) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter")) : a
		.imagesLoaded = b(a, a.EvEmitter)
}("undefined" != typeof window ? window : this, function(f, q) {
	function j(a, h) {
		for (var d in h) {
			a[d] = h[d]
		}
		return a
	}

	function k(a) {
		if (Array.isArray(a)) {
			return a
		}
		var d = "object" == typeof a && "number" == typeof a.length;
		return d ? c.call(a) : [a]
	}

	function l(a, i, d) {
		if (!(this instanceof l)) {
			return new l(a, i, d)
		}
		var h = a;
		return "string" == typeof a && (h = document.querySelectorAll(a)), h ? (this.elements = k(h), this.options =
				j({}, this.options), "function" == typeof i ? d = i : j(this.options, i), d && this.on("always", d),
				this.getImages(), g && (this.jqDeferred = new g.Deferred), void setTimeout(this.check.bind(this))) :
			void b.error("Bad element for imagesLoaded " + (h || a))
	}

	function m(a) {
		this.img = a
	}

	function p(a, d) {
		this.url = a, this.element = d, this.img = new Image
	}
	var g = f.jQuery,
		b = f.console,
		c = Array.prototype.slice;
	l.prototype = Object.create(q.prototype), l.prototype.options = {}, l.prototype.getImages = function() {
		this.images = [], this.elements.forEach(this.addElementImages, this)
	}, l.prototype.addElementImages = function(a) {
		"IMG" == a.nodeName && this.addImage(a), this.options.background === !0 && this
			.addElementBackgroundImages(a);
		var y = a.nodeType;
		if (y && v[y]) {
			for (var d = a.querySelectorAll("img"), h = 0; h < d.length; h++) {
				var u = d[h];
				this.addImage(u)
			}
			if ("string" == typeof this.options.background) {
				var w = a.querySelectorAll(this.options.background);
				for (h = 0; h < w.length; h++) {
					var x = w[h];
					this.addElementBackgroundImages(x)
				}
			}
		}
	};
	var v = {
		1: !0,
		9: !0,
		11: !0
	};
	return l.prototype.addElementBackgroundImages = function(a) {
		var s = getComputedStyle(a);
		if (s) {
			for (var d = /url\((['"])?(.*?)\1\)/gi, h = d.exec(s.backgroundImage); null !== h;) {
				var r = h && h[2];
				r && this.addBackground(r, a), h = d.exec(s.backgroundImage)
			}
		}
	}, l.prototype.addImage = function(a) {
		var d = new m(a);
		this.images.push(d)
	}, l.prototype.addBackground = function(a, h) {
		var d = new p(a, h);
		this.images.push(d)
	}, l.prototype.check = function() {
		function a(h, o, r) {
			setTimeout(function() {
				d.progress(h, o, r)
			})
		}
		var d = this;
		return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(
			function(e) {
				e.once("progress", a), e.check()
			}) : void this.complete()
	}, l.prototype.progress = function(a, h, d) {
		this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded, this.emitEvent("progress",
				[this, a, h]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, a),
			this.progressedCount == this.images.length && this.complete(), this.options.debug && b && b.log(
				"progress: " + d, a, h)
	}, l.prototype.complete = function() {
		var a = this.hasAnyBroken ? "fail" : "done";
		if (this.isComplete = !0, this.emitEvent(a, [this]), this.emitEvent("always", [this]), this
			.jqDeferred) {
			var d = this.hasAnyBroken ? "reject" : "resolve";
			this.jqDeferred[d](this)
		}
	}, m.prototype = Object.create(q.prototype), m.prototype.check = function() {
		var a = this.getIsImageComplete();
		return a ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage =
			new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener(
				"error", this), this.img.addEventListener("load", this), this.img.addEventListener("error",
				this), void(this.proxyImage.src = this.img.src))
	}, m.prototype.getIsImageComplete = function() {
		return this.img.complete && this.img.naturalWidth
	}, m.prototype.confirm = function(a, d) {
		this.isLoaded = a, this.emitEvent("progress", [this, this.img, d])
	}, m.prototype.handleEvent = function(a) {
		var d = "on" + a.type;
		this[d] && this[d](a)
	}, m.prototype.onload = function() {
		this.confirm(!0, "onload"), this.unbindEvents()
	}, m.prototype.onerror = function() {
		this.confirm(!1, "onerror"), this.unbindEvents()
	}, m.prototype.unbindEvents = function() {
		this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this),
			this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, p.prototype = Object.create(m.prototype), p.prototype.check = function() {
		this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this
			.url;
		var a = this.getIsImageComplete();
		a && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
	}, p.prototype.unbindEvents = function() {
		this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, p.prototype.confirm = function(a, d) {
		this.isLoaded = a, this.emitEvent("progress", [this, this.element, d])
	}, l.makeJQueryPlugin = function(a) {
		a = a || f.jQuery, a && (g = a, g.fn.imagesLoaded = function(d, n) {
			var h = new l(this, d, n);
			return h.jqDeferred.promise(g(this))
		})
	}, l.makeJQueryPlugin(), l
});
/*
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */
! function(b, a) {
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(c) {
			return a(b, c)
		}) : "object" == typeof module && module.exports ? module.exports = a(b, require("jquery")) : b.jQueryBridget =
		a(b, b.jQuery)
}(window, function(h, a) {
	function b(k, l, e) {
		function m(u, i, q) {
			var p, r = "$()." + k + '("' + i + '")';
			return u.each(function(v, w) {
				var o = e.data(w, k);
				if (!o) {
					return void f(k + " not initialized. Cannot call methods, i.e. " + r)
				}
				var n = o[i];
				if (!n || "_" == i.charAt(0)) {
					return void f(r + " is not a valid method")
				}
				var s = n.apply(o, q);
				p = void 0 === p ? s : p
			}), void 0 !== p ? p : u
		}

		function j(n, i) {
			n.each(function(r, q) {
				var p = e.data(q, k);
				p ? (p.option(i), p._init()) : (p = new l(q, i), e.data(q, k, p))
			})
		}
		e = e || a || h.jQuery, e && (l.prototype.option || (l.prototype.option = function(i) {
			e.isPlainObject(i) && (this.options = e.extend(!0, this.options, i))
		}), e.fn[k] = function(n) {
			if ("string" == typeof n) {
				var i = c.call(arguments, 1);
				return m(this, n, i)
			}
			return j(this, n), this
		}, d(e))
	}

	function d(e) {
		!e || e && e.bridget || (e.bridget = b)
	}
	var c = Array.prototype.slice,
		g = h.console,
		f = "undefined" == typeof g ? function() {} : function(e) {
			g.error(e)
		};
	return d(a || h.jQuery), b
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", a) : "object" == typeof module && module
		.exports ? module.exports = a() : b.EvEmitter = a()
}("undefined" != typeof window ? window : this, function() {
	function b() {}
	var a = b.prototype;
	return a.on = function(g, c) {
		if (g && c) {
			var d = this._events = this._events || {},
				f = d[g] = d[g] || [];
			return f.indexOf(c) == -1 && f.push(c), this
		}
	}, a.once = function(g, c) {
		if (g && c) {
			this.on(g, c);
			var d = this._onceEvents = this._onceEvents || {},
				f = d[g] = d[g] || {};
			return f[c] = !0, this
		}
	}, a.off = function(g, c) {
		var d = this._events && this._events[g];
		if (d && d.length) {
			var f = d.indexOf(c);
			return f != -1 && d.splice(f, 1), this
		}
	}, a.emitEvent = function(k, c) {
		var d = this._events && this._events[k];
		if (d && d.length) {
			d = d.slice(0), c = c || [];
			for (var g = this._onceEvents && this._onceEvents[k], f = 0; f < d.length; f++) {
				var j = d[f],
					h = g && g[j];
				h && (this.off(k, j), delete g[j]), j.apply(this, c)
			}
			return this
		}
	}, a.allOff = function() {
		delete this._events, delete this._onceEvents
	}, b
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("get-size/get-size", a) : "object" == typeof module && module
		.exports ? module.exports = a() : b.getSize = a()
}(window, function() {
	function q(h) {
		var a = parseFloat(h),
			d = h.indexOf("%") == -1 && !isNaN(a);
		return d && a
	}

	function f() {}

	function j() {
		for (var h = {
				width: 0,
				height: 0,
				innerWidth: 0,
				innerHeight: 0,
				outerWidth: 0,
				outerHeight: 0
			}, a = 0; a < g; a++) {
			var d = v[a];
			h[d] = 0
		}
		return h
	}

	function l(d) {
		var a = getComputedStyle(d);
		return a || b("Style returned " + a +
			". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), a
	}

	function k() {
		if (!c) {
			c = !0;
			var a = document.createElement("div");
			a.style.width = "200px", a.style.padding = "1px 2px 3px 4px", a.style.borderStyle = "solid", a.style
				.borderWidth = "1px 2px 3px 4px", a.style.boxSizing = "border-box";
			var d = document.body || document.documentElement;
			d.appendChild(a);
			var h = l(a);
			m = 200 == Math.round(q(h.width)), p.isBoxSizeOuter = m, d.removeChild(a)
		}
	}

	function p(r) {
		if (k(), "string" == typeof r && (r = document.querySelector(r)), r && "object" == typeof r && r.nodeType) {
			var D = l(r);
			if ("none" == D.display) {
				return j()
			}
			var i = {};
			i.width = r.offsetWidth, i.height = r.offsetHeight;
			for (var o = i.isBorderBox = "border-box" == D.boxSizing, A = 0; A < g; A++) {
				var t = v[A],
					n = D[t],
					B = parseFloat(n);
				i[t] = isNaN(B) ? 0 : B
			}
			var C = i.paddingLeft + i.paddingRight,
				H = i.paddingTop + i.paddingBottom,
				u = i.marginLeft + i.marginRight,
				F = i.marginTop + i.marginBottom,
				h = i.borderLeftWidth + i.borderRightWidth,
				J = i.borderTopWidth + i.borderBottomWidth,
				w = o && m,
				G = q(D.width);
			G !== !1 && (i.width = G + (w ? 0 : C + h));
			var E = q(D.height);
			return E !== !1 && (i.height = E + (w ? 0 : H + J)), i.innerWidth = i.width - (C + h), i.innerHeight = i
				.height - (H + J), i.outerWidth = i.width + u, i.outerHeight = i.height + F, i
		}
	}
	var m, b = "undefined" == typeof console ? f : function(a) {
			console.error(a)
		},
		v = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop",
			"marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"
		],
		g = v.length,
		c = !1;
	return p
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", a) : "object" ==
		typeof module && module.exports ? module.exports = a() : b.matchesSelector = a()
}(window, function() {
	var a = function() {
		var g = window.Element.prototype;
		if (g.matches) {
			return "matches"
		}
		if (g.matchesSelector) {
			return "matchesSelector"
		}
		for (var b = ["webkit", "moz", "ms", "o"], c = 0; c < b.length; c++) {
			var f = b[c],
				d = f + "MatchesSelector";
			if (g[d]) {
				return d
			}
		}
	}();
	return function(b, c) {
		return b[a](c)
	}
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", [
			"desandro-matches-selector/matches-selector"
		], function(c) {
			return a(b, c)
		}) : "object" == typeof module && module.exports ? module.exports = a(b, require("desandro-matches-selector")) :
		b.fizzyUIUtils = a(b, b.matchesSelector)
}(window, function(f, a) {
	var b = {};
	b.extend = function(j, g) {
		for (var h in g) {
			j[h] = g[h]
		}
		return j
	}, b.modulo = function(h, g) {
		return (h % g + g) % g
	};
	var d = Array.prototype.slice;
	b.makeArray = function(h) {
		if (Array.isArray(h)) {
			return h
		}
		if (null === h || void 0 === h) {
			return []
		}
		var g = "object" == typeof h && "number" == typeof h.length;
		return g ? d.call(h) : [h]
	}, b.removeFrom = function(j, g) {
		var h = j.indexOf(g);
		h != -1 && j.splice(h, 1)
	}, b.getParent = function(g, e) {
		for (; g.parentNode && g != document.body;) {
			if (g = g.parentNode, a(g, e)) {
				return g
			}
		}
	}, b.getQueryElement = function(e) {
		return "string" == typeof e ? document.querySelector(e) : e
	}, b.handleEvent = function(h) {
		var g = "on" + h.type;
		this[g] && this[g](h)
	}, b.filterFindElements = function(h, g) {
		h = b.makeArray(h);
		var e = [];
		return h.forEach(function(l) {
			if (l instanceof HTMLElement) {
				if (!g) {
					return void e.push(l)
				}
				a(l, g) && e.push(l);
				for (var j = l.querySelectorAll(g), k = 0; k < j.length; k++) {
					e.push(j[k])
				}
			}
		}), e
	}, b.debounceMethod = function(l, g, h) {
		h = h || 100;
		var k = l.prototype[g],
			j = g + "Timeout";
		l.prototype[g] = function() {
			var n = this[j];
			clearTimeout(n);
			var i = arguments,
				m = this;
			this[j] = setTimeout(function() {
				k.apply(m, i), delete m[j]
			}, h)
		}
	}, b.docReady = function(h) {
		var g = document.readyState;
		"complete" == g || "interactive" == g ? setTimeout(h) : document.addEventListener("DOMContentLoaded", h)
	}, b.toDashed = function(e) {
		return e.replace(/(.)([A-Z])/g, function(j, g, h) {
			return g + "-" + h
		}).toLowerCase()
	};
	var c = f.console;
	return b.htmlInit = function(g, h) {
		b.docReady(function() {
			var n = b.toDashed(h),
				m = "data-" + n,
				e = document.querySelectorAll("[" + m + "]"),
				o = document.querySelectorAll(".js-" + n),
				j = b.makeArray(e).concat(b.makeArray(o)),
				i = m + "-options",
				k = f.jQuery;
			j.forEach(function(r) {
				var p, q = r.getAttribute(m) || r.getAttribute(i);
				try {
					p = q && JSON.parse(q)
				} catch (l) {
					return void(c && c.error("Error parsing " + m + " on " + r.className +
						": " + l))
				}
				var v = new g(r, p);
				k && k.data(r, h, v)
			})
		})
	}, b
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"],
		a) : "object" == typeof module && module.exports ? module.exports = a(require("ev-emitter"), require(
		"get-size")) : (b.Outlayer = {}, b.Outlayer.Item = a(b.EvEmitter, b.getSize))
}(window, function(A, k) {
	function q(c) {
		for (var a in c) {
			return !1
		}
		return a = null, !0
	}

	function x(c, a) {
		c && (this.element = c, this.layout = a, this.position = {
			x: 0,
			y: 0
		}, this._create())
	}

	function w(a) {
		return a.replace(/([A-Z])/g, function(c) {
			return "-" + c.toLowerCase()
		})
	}
	var z = document.documentElement.style,
		y = "string" == typeof z.transition ? "transition" : "WebkitTransition",
		b = "string" == typeof z.transform ? "transform" : "WebkitTransform",
		B = {
			WebkitTransition: "webkitTransitionEnd",
			transition: "transitionend"
		} [y],
		p = {
			transform: b,
			transition: y,
			transitionDuration: y + "Duration",
			transitionProperty: y + "Property",
			transitionDelay: y + "Delay"
		},
		j = x.prototype = Object.create(A.prototype);
	j.constructor = x, j._create = function() {
		this._transn = {
			ingProperties: {},
			clean: {},
			onEnd: {}
		}, this.css({
			position: "absolute"
		})
	}, j.handleEvent = function(c) {
		var a = "on" + c.type;
		this[a] && this[a](c)
	}, j.getSize = function() {
		this.size = k(this.element)
	}, j.css = function(f) {
		var a = this.element.style;
		for (var c in f) {
			var d = p[c] || c;
			a[d] = f[c]
		}
	}, j.getPosition = function() {
		var D = getComputedStyle(this.element),
			d = this.layout._getOption("originLeft"),
			f = this.layout._getOption("originTop"),
			l = D[d ? "left" : "right"],
			h = D[f ? "top" : "bottom"],
			C = parseFloat(l),
			u = parseFloat(h),
			c = this.layout.size;
		l.indexOf("%") != -1 && (C = C / 100 * c.width), h.indexOf("%") != -1 && (u = u / 100 * c.height), C =
			isNaN(C) ? 0 : C, u = isNaN(u) ? 0 : u, C -= d ? c.paddingLeft : c.paddingRight, u -= f ? c
			.paddingTop : c.paddingBottom, this.position.x = C, this.position.y = u
	}, j.layoutPosition = function() {
		var K = this.layout.size,
			C = {},
			E = this.layout._getOption("originLeft"),
			H = this.layout._getOption("originTop"),
			G = E ? "paddingLeft" : "paddingRight",
			J = E ? "left" : "right",
			I = E ? "right" : "left",
			c = this.position.x + K[G];
		C[J] = this.getXValue(c), C[I] = "";
		var L = H ? "paddingTop" : "paddingBottom",
			D = H ? "top" : "bottom",
			f = H ? "bottom" : "top",
			F = this.position.y + K[L];
		C[D] = this.getYValue(F), C[f] = "", this.css(C), this.emitEvent("layout", [this])
	}, j.getXValue = function(c) {
		var a = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && !a ? c / this.layout.size.width * 100 + "%" : c + "px"
	}, j.getYValue = function(c) {
		var a = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && a ? c / this.layout.size.height * 100 + "%" : c + "px"
	}, j._transitionTo = function(D, d) {
		this.getPosition();
		var f = this.position.x,
			l = this.position.y,
			h = D == this.position.x && d == this.position.y;
		if (this.setPosition(D, d), h && !this.isTransitioning) {
			return void this.layoutPosition()
		}
		var C = D - f,
			u = d - l,
			c = {};
		c.transform = this.getTranslate(C, u), this.transition({
			to: c,
			onTransitionEnd: {
				transform: this.layoutPosition
			},
			isCleaning: !0
		})
	}, j.getTranslate = function(f, a) {
		var c = this.layout._getOption("originLeft"),
			d = this.layout._getOption("originTop");
		return f = c ? f : -f, a = d ? a : -a, "translate3d(" + f + "px, " + a + "px, 0)"
	}, j.goTo = function(c, a) {
		this.setPosition(c, a), this.layoutPosition()
	}, j.moveTo = j._transitionTo, j.setPosition = function(c, a) {
		this.position.x = parseFloat(c), this.position.y = parseFloat(a)
	}, j._nonTransition = function(c) {
		this.css(c.to), c.isCleaning && this._removeStyles(c.to);
		for (var a in c.onTransitionEnd) {
			c.onTransitionEnd[a].call(this)
		}
	}, j.transition = function(f) {
		if (!parseFloat(this.layout.options.transitionDuration)) {
			return void this._nonTransition(f)
		}
		var a = this._transn;
		for (var c in f.onTransitionEnd) {
			a.onEnd[c] = f.onTransitionEnd[c]
		}
		for (c in f.to) {
			a.ingProperties[c] = !0, f.isCleaning && (a.clean[c] = !0)
		}
		if (f.from) {
			this.css(f.from);
			var d = this.element.offsetHeight;
			d = null
		}
		this.enableTransition(f.to), this.css(f.to), this.isTransitioning = !0
	};
	var v = "opacity," + w(b);
	j.enableTransition = function() {
		if (!this.isTransitioning) {
			var a = this.layout.options.transitionDuration;
			a = "number" == typeof a ? a + "ms" : a, this.css({
				transitionProperty: v,
				transitionDuration: a,
				transitionDelay: this.staggerDelay || 0
			}), this.element.addEventListener(B, this, !1)
		}
	}, j.onwebkitTransitionEnd = function(a) {
		this.ontransitionend(a)
	}, j.onotransitionend = function(a) {
		this.ontransitionend(a)
	};
	var m = {
		"-webkit-transform": "transform"
	};
	j.ontransitionend = function(f) {
		if (f.target === this.element) {
			var a = this._transn,
				d = m[f.propertyName] || f.propertyName;
			if (delete a.ingProperties[d], q(a.ingProperties) && this.disableTransition(), d in a.clean && (this
					.element.style[f.propertyName] = "", delete a.clean[d]), d in a.onEnd) {
				var c = a.onEnd[d];
				c.call(this), delete a.onEnd[d]
			}
			this.emitEvent("transitionEnd", [this])
		}
	}, j.disableTransition = function() {
		this.removeTransitionStyles(), this.element.removeEventListener(B, this, !1), this.isTransitioning = !1
	}, j._removeStyles = function(d) {
		var a = {};
		for (var c in d) {
			a[c] = ""
		}
		this.css(a)
	};
	var g = {
		transitionProperty: "",
		transitionDuration: "",
		transitionDelay: ""
	};
	return j.removeTransitionStyles = function() {
		this.css(g)
	}, j.stagger = function(a) {
		a = isNaN(a) ? 0 : a, this.staggerDelay = a + "ms"
	}, j.removeElem = function() {
		this.element.parentNode.removeChild(this.element), this.css({
			display: ""
		}), this.emitEvent("remove", [this])
	}, j.remove = function() {
		return y && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd",
	function() {
			this.removeElem()
		}), void this.hide()) : void this.removeElem()
	}, j.reveal = function() {
		delete this.isHidden, this.css({
			display: ""
		});
		var d = this.layout.options,
			a = {},
			c = this.getHideRevealTransitionEndProperty("visibleStyle");
		a[c] = this.onRevealTransitionEnd, this.transition({
			from: d.hiddenStyle,
			to: d.visibleStyle,
			isCleaning: !0,
			onTransitionEnd: a
		})
	}, j.onRevealTransitionEnd = function() {
		this.isHidden || this.emitEvent("reveal")
	}, j.getHideRevealTransitionEndProperty = function(d) {
		var a = this.layout.options[d];
		if (a.opacity) {
			return "opacity"
		}
		for (var c in a) {
			return c
		}
	}, j.hide = function() {
		this.isHidden = !0, this.css({
			display: ""
		});
		var d = this.layout.options,
			a = {},
			c = this.getHideRevealTransitionEndProperty("hiddenStyle");
		a[c] = this.onHideTransitionEnd, this.transition({
			from: d.visibleStyle,
			to: d.hiddenStyle,
			isCleaning: !0,
			onTransitionEnd: a
		})
	}, j.onHideTransitionEnd = function() {
		this.isHidden && (this.css({
			display: "none"
		}), this.emitEvent("hide"))
	}, j.destroy = function() {
		this.css({
			position: "",
			left: "",
			right: "",
			top: "",
			bottom: "",
			transition: "",
			transform: ""
		})
	}, x
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter",
		"get-size/get-size", "fizzy-ui-utils/utils", "./item"
	], function(c, e, d, f) {
		return a(b, c, e, d, f)
	}) : "object" == typeof module && module.exports ? module.exports = a(b, require("ev-emitter"), require(
		"get-size"), require("fizzy-ui-utils"), require("./item")) : b.Outlayer = a(b, b.EvEmitter, b.getSize, b
		.fizzyUIUtils, b.Outlayer.Item)
}(window, function(C, k, v, z, y) {
	function B(h, a) {
		var c = z.getQueryElement(h);
		if (!c) {
			return void(D && D.error("Bad element for " + this.constructor.namespace + ": " + (c || h)))
		}
		this.element = c, q && (this.$element = q(this.element)), this.options = z.extend({}, this.constructor
			.defaults), this.option(a);
		var d = ++w;
		this.element.outlayerGUID = d, p[d] = this, this._create();
		var f = this._getOption("initLayout");
		f && this.layout()
	}

	function A(c) {
		function a() {
			c.apply(this, arguments)
		}
		return a.prototype = Object.create(c.prototype), a.prototype.constructor = a, a
	}

	function b(h) {
		if ("number" == typeof h) {
			return h
		}
		var a = h.match(/(^\d*\.?\d*)(\w*)/),
			c = a && a[1],
			f = a && a[2];
		if (!c.length) {
			return 0
		}
		c = parseFloat(c);
		var d = x[f] || 1;
		return c * d
	}
	var D = C.console,
		q = C.jQuery,
		j = function() {},
		w = 0,
		p = {};
	B.namespace = "outlayer", B.Item = y, B.defaults = {
		containerStyle: {
			position: "relative"
		},
		initLayout: !0,
		originLeft: !0,
		originTop: !0,
		resize: !0,
		resizeContainer: !0,
		transitionDuration: "0.4s",
		hiddenStyle: {
			opacity: 0,
			transform: "scale(0.001)"
		},
		visibleStyle: {
			opacity: 1,
			transform: "scale(1)"
		}
	};
	var g = B.prototype;
	z.extend(g, k.prototype), g.option = function(a) {
		z.extend(this.options, a)
	}, g._getOption = function(c) {
		var a = this.constructor.compatOptions[c];
		return a && void 0 !== this.options[a] ? this.options[a] : this.options[c]
	}, B.compatOptions = {
		initLayout: "isInitLayout",
		horizontal: "isHorizontal",
		layoutInstant: "isLayoutInstant",
		originLeft: "isOriginLeft",
		originTop: "isOriginTop",
		resize: "isResizeBound",
		resizeContainer: "isResizingContainer"
	}, g._create = function() {
		this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), z.extend(this.element.style, this
			.options.containerStyle);
		var a = this._getOption("resize");
		a && this.bindResize()
	}, g.reloadItems = function() {
		this.items = this._itemize(this.element.children)
	}, g._itemize = function(m) {
		for (var a = this._filterFindItemElements(m), c = this.constructor.Item, f = [], d = 0; d < a
			.length; d++) {
			var l = a[d],
				h = new c(l, this);
			f.push(h)
		}
		return f
	}, g._filterFindItemElements = function(a) {
		return z.filterFindElements(a, this.options.itemSelector)
	}, g.getItemElements = function() {
		return this.items.map(function(a) {
			return a.element
		})
	}, g.layout = function() {
		this._resetLayout(), this._manageStamps();
		var c = this._getOption("layoutInstant"),
			a = void 0 !== c ? c : !this._isLayoutInited;
		this.layoutItems(this.items, a), this._isLayoutInited = !0
	}, g._init = g.layout, g._resetLayout = function() {
		this.getSize()
	}, g.getSize = function() {
		this.size = v(this.element)
	}, g._getMeasurement = function(f, a) {
		var d, c = this.options[f];
		c ? ("string" == typeof c ? d = this.element.querySelector(c) : c instanceof HTMLElement && (d = c),
			this[f] = d ? v(d)[a] : c) : this[f] = 0
	}, g.layoutItems = function(c, a) {
		c = this._getItemsForLayout(c), this._layoutItems(c, a), this._postLayout()
	}, g._getItemsForLayout = function(a) {
		return a.filter(function(c) {
			return !c.isIgnored
		})
	}, g._layoutItems = function(d, a) {
		if (this._emitCompleteOnItems("layout", d), d && d.length) {
			var c = [];
			d.forEach(function(f) {
				var e = this._getItemLayoutPosition(f);
				e.item = f, e.isInstant = a || f.isLayoutInstant, c.push(e)
			}, this), this._processLayoutQueue(c)
		}
	}, g._getItemLayoutPosition = function() {
		return {
			x: 0,
			y: 0
		}
	}, g._processLayoutQueue = function(a) {
		this.updateStagger(), a.forEach(function(d, c) {
			this._positionItem(d.item, d.x, d.y, d.isInstant, c)
		}, this)
	}, g.updateStagger = function() {
		var a = this.options.stagger;
		return null === a || void 0 === a ? void(this.stagger = 0) : (this.stagger = b(a), this.stagger)
	}, g._positionItem = function(h, a, c, f, d) {
		f ? h.goTo(a, c) : (h.stagger(d * this.stagger), h.moveTo(a, c))
	}, g._postLayout = function() {
		this.resizeContainer()
	}, g.resizeContainer = function() {
		var c = this._getOption("resizeContainer");
		if (c) {
			var a = this._getContainerSize();
			a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
		}
	}, g._getContainerSize = j, g._setContainerMeasure = function(d, a) {
		if (void 0 !== d) {
			var c = this.size;
			c.isBorderBox && (d += a ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth :
					c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), d = Math.max(d,
				0), this.element.style[a ? "width" : "height"] = d + "px"
		}
	}, g._emitCompleteOnItems = function(m, a) {
		function c() {
			d.dispatchEvent(m + "Complete", null, [a])
		}

		function f() {
			h++, h == l && c()
		}
		var d = this,
			l = a.length;
		if (!a || !l) {
			return void c()
		}
		var h = 0;
		a.forEach(function(i) {
			i.once(m, f)
		})
	}, g.dispatchEvent = function(h, a, c) {
		var f = a ? [a].concat(c) : c;
		if (this.emitEvent(h, f), q) {
			if (this.$element = this.$element || q(this.element), a) {
				var d = q.Event(a);
				d.type = h, this.$element.trigger(d, c)
			} else {
				this.$element.trigger(h, c)
			}
		}
	}, g.ignore = function(c) {
		var a = this.getItem(c);
		a && (a.isIgnored = !0)
	}, g.unignore = function(c) {
		var a = this.getItem(c);
		a && delete a.isIgnored
	}, g.stamp = function(a) {
		a = this._find(a), a && (this.stamps = this.stamps.concat(a), a.forEach(this.ignore, this))
	}, g.unstamp = function(a) {
		a = this._find(a), a && a.forEach(function(c) {
			z.removeFrom(this.stamps, c), this.unignore(c)
		}, this)
	}, g._find = function(a) {
		if (a) {
			return "string" == typeof a && (a = this.element.querySelectorAll(a)), a = z.makeArray(a)
		}
	}, g._manageStamps = function() {
		this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp,
			this))
	}, g._getBoundingRect = function() {
		var c = this.element.getBoundingClientRect(),
			a = this.size;
		this._boundingRect = {
			left: c.left + a.paddingLeft + a.borderLeftWidth,
			top: c.top + a.paddingTop + a.borderTopWidth,
			right: c.right - (a.paddingRight + a.borderRightWidth),
			bottom: c.bottom - (a.paddingBottom + a.borderBottomWidth)
		}
	}, g._manageStamp = j, g._getElementOffset = function(h) {
		var a = h.getBoundingClientRect(),
			d = this._boundingRect,
			c = v(h),
			f = {
				left: a.left - d.left - c.marginLeft,
				top: a.top - d.top - c.marginTop,
				right: d.right - a.right - c.marginRight,
				bottom: d.bottom - a.bottom - c.marginBottom
			};
		return f
	}, g.handleEvent = z.handleEvent, g.bindResize = function() {
		C.addEventListener("resize", this), this.isResizeBound = !0
	}, g.unbindResize = function() {
		C.removeEventListener("resize", this), this.isResizeBound = !1
	}, g.onresize = function() {
		this.resize()
	}, z.debounceMethod(B, "onresize", 100), g.resize = function() {
		this.isResizeBound && this.needsResizeLayout() && this.layout()
	}, g.needsResizeLayout = function() {
		var c = v(this.element),
			a = this.size && c;
		return a && c.innerWidth !== this.size.innerWidth
	}, g.addItems = function(c) {
		var a = this._itemize(c);
		return a.length && (this.items = this.items.concat(a)), a
	}, g.appended = function(c) {
		var a = this.addItems(c);
		a.length && (this.layoutItems(a, !0), this.reveal(a))
	}, g.prepended = function(d) {
		var a = this._itemize(d);
		if (a.length) {
			var c = this.items.slice(0);
			this.items = a.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(a, !0), this
				.reveal(a), this.layoutItems(c)
		}
	}, g.reveal = function(c) {
		if (this._emitCompleteOnItems("reveal", c), c && c.length) {
			var a = this.updateStagger();
			c.forEach(function(e, d) {
				e.stagger(d * a), e.reveal()
			})
		}
	}, g.hide = function(c) {
		if (this._emitCompleteOnItems("hide", c), c && c.length) {
			var a = this.updateStagger();
			c.forEach(function(e, d) {
				e.stagger(d * a), e.hide()
			})
		}
	}, g.revealItemElements = function(c) {
		var a = this.getItems(c);
		this.reveal(a)
	}, g.hideItemElements = function(c) {
		var a = this.getItems(c);
		this.hide(a)
	}, g.getItem = function(d) {
		for (var a = 0; a < this.items.length; a++) {
			var c = this.items[a];
			if (c.element == d) {
				return c
			}
		}
	}, g.getItems = function(c) {
		c = z.makeArray(c);
		var a = [];
		return c.forEach(function(e) {
			var d = this.getItem(e);
			d && a.push(d)
		}, this), a
	}, g.remove = function(c) {
		var a = this.getItems(c);
		this._emitCompleteOnItems("remove", a), a && a.length && a.forEach(function(d) {
			d.remove(), z.removeFrom(this.items, d)
		}, this)
	}, g.destroy = function() {
		var c = this.element.style;
		c.height = "", c.position = "", c.width = "", this.items.forEach(function(d) {
			d.destroy()
		}), this.unbindResize();
		var a = this.element.outlayerGUID;
		delete p[a], delete this.element.outlayerGUID, q && q.removeData(this.element, this.constructor
			.namespace)
	}, B.data = function(c) {
		c = z.getQueryElement(c);
		var a = c && c.outlayerGUID;
		return a && p[a]
	}, B.create = function(d, a) {
		var c = A(B);
		return c.defaults = z.extend({}, B.defaults), z.extend(c.defaults, a), c.compatOptions = z.extend({}, B
				.compatOptions), c.namespace = d, c.data = B.data, c.Item = A(y), z.htmlInit(c, d), q && q
			.bridget && q.bridget(d, c), c
	};
	var x = {
		ms: 1,
		s: 1000
	};
	return B.Item = y, B
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], a) : "object" ==
		typeof module && module.exports ? module.exports = a(require("outlayer")) : (b.Isotope = b.Isotope || {}, b
			.Isotope.Item = a(b.Outlayer))
}(window, function(f) {
	function a() {
		f.Item.apply(this, arguments)
	}
	var b = a.prototype = Object.create(f.Item.prototype),
		d = b._create;
	b._create = function() {
		this.id = this.layout.itemGUID++, d.call(this), this.sortData = {}
	}, b.updateSortData = function() {
		if (!this.isIgnored) {
			this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math
				.random();
			var k = this.layout.options.getSortData,
				g = this.layout._sorters;
			for (var h in k) {
				var j = g[h];
				this.sortData[h] = j(this.element, this)
			}
		}
	};
	var c = b.destroy;
	return b.destroy = function() {
		c.apply(this, arguments), this.css({
			display: ""
		})
	}, a
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size",
		"outlayer/outlayer"
	], a) : "object" == typeof module && module.exports ? module.exports = a(require("get-size"), require(
		"outlayer")) : (b.Isotope = b.Isotope || {}, b.Isotope.LayoutMode = a(b.getSize, b.Outlayer))
}(window, function(f, a) {
	function b(e) {
		this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e
			.filteredItems, this.size = e.size)
	}
	var d = b.prototype,
		c = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset",
			"needsResizeLayout", "_getOption"
		];
	return c.forEach(function(e) {
		d[e] = function() {
			return a.prototype[e].apply(this.isotope, arguments)
		}
	}), d.needsVerticalResizeLayout = function() {
		var g = f(this.isotope.element),
			h = this.isotope.size && g;
		return h && g.innerHeight != this.isotope.size.innerHeight
	}, d._getMeasurement = function() {
		this.isotope._getMeasurement.apply(this, arguments)
	}, d.getColumnWidth = function() {
		this.getSegmentSize("column", "Width")
	}, d.getRowHeight = function() {
		this.getSegmentSize("row", "Height")
	}, d.getSegmentSize = function(l, g) {
		var h = l + g,
			k = "outer" + g;
		if (this._getMeasurement(h, k), !this[h]) {
			var j = this.getFirstItemSize();
			this[h] = j && j[k] || this.isotope.size["inner" + g]
		}
	}, d.getFirstItemSize = function() {
		var g = this.isotope.filteredItems[0];
		return g && g.element && f(g.element)
	}, d.layout = function() {
		this.isotope.layout.apply(this.isotope, arguments)
	}, d.getSize = function() {
		this.isotope.getSize(), this.size = this.isotope.size
	}, b.modes = {}, b.create = function(i, g) {
		function h() {
			b.apply(this, arguments)
		}
		return h.prototype = Object.create(d), h.prototype.constructor = h, g && (h.options = g), h.prototype
			.namespace = i, b.modes[i] = h, h
	}, b
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer",
		"get-size/get-size"
	], a) : "object" == typeof module && module.exports ? module.exports = a(require("outlayer"), require(
		"get-size")) : b.Masonry = a(b.Outlayer, b.getSize)
}(window, function(d, a) {
	var b = d.create("masonry");
	b.compatOptions.fitWidth = "isFitWidth";
	var c = b.prototype;
	return c._resetLayout = function() {
		this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter",
			"outerWidth"), this.measureColumns(), this.colYs = [];
		for (var e = 0; e < this.cols; e++) {
			this.colYs.push(0)
		}
		this.maxY = 0, this.horizontalColIndex = 0
	}, c.measureColumns = function() {
		if (this.getContainerWidth(), !this.columnWidth) {
			var l = this.items[0],
				f = l && l.element;
			this.columnWidth = f && a(f).outerWidth || this.containerWidth
		}
		var h = this.columnWidth += this.gutter,
			g = this.containerWidth + this.gutter,
			k = g / h,
			j = h - g % h,
			e = j && j < 1 ? "round" : "floor";
		k = Math[e](k), this.cols = Math.max(k, 1)
	}, c.getContainerWidth = function() {
		var g = this._getOption("fitWidth"),
			e = g ? this.element.parentNode : this.element,
			f = a(e);
		this.containerWidth = f && f.innerWidth
	}, c._getItemLayoutPosition = function(v) {
		v.getSize();
		var g = v.size.outerWidth % this.columnWidth,
			k = g && g < 1 ? "round" : "ceil",
			m = Math[k](v.size.outerWidth / this.columnWidth);
		m = Math.min(m, this.cols);
		for (var l = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", q =
				this[l](m, v), p = {
					x: this.columnWidth * q.col,
					y: q.y
				}, f = q.y + v.size.outerHeight, w = m + q.col, j = q.col; j < w; j++) {
			this.colYs[j] = f
		}
		return p
	}, c._getTopColPosition = function(h) {
		var f = this._getTopColGroup(h),
			g = Math.min.apply(Math, f);
		return {
			col: f.indexOf(g),
			y: g
		}
	}, c._getTopColGroup = function(j) {
		if (j < 2) {
			return this.colYs
		}
		for (var f = [], g = this.cols + 1 - j, h = 0; h < g; h++) {
			f[h] = this._getColGroupY(h, j)
		}
		return f
	}, c._getColGroupY = function(h, f) {
		if (f < 2) {
			return this.colYs[h]
		}
		var g = this.colYs.slice(h, h + f);
		return Math.max.apply(Math, g)
	}, c._getHorizontalColPosition = function(k, f) {
		var g = this.horizontalColIndex % this.cols,
			j = k > 1 && g + k > this.cols;
		g = j ? 0 : g;
		var h = f.size.outerWidth && f.size.outerHeight;
		return this.horizontalColIndex = h ? g + k : this.horizontalColIndex, {
			col: g,
			y: this._getColGroupY(g, k)
		}
	}, c._manageStamp = function(w) {
		var j = a(w),
			p = this._getElementOffset(w),
			m = this._getOption("originLeft"),
			v = m ? p.left : p.right,
			q = v + j.outerWidth,
			e = Math.floor(v / this.columnWidth);
		e = Math.max(0, e);
		var x = Math.floor(q / this.columnWidth);
		x -= q % this.columnWidth ? 0 : 1, x = Math.min(this.cols - 1, x);
		for (var g = this._getOption("originTop"), f = (g ? p.top : p.bottom) + j.outerHeight, k = e; k <=
			x; k++) {
			this.colYs[k] = Math.max(f, this.colYs[k])
		}
	}, c._getContainerSize = function() {
		this.maxY = Math.max.apply(Math, this.colYs);
		var e = {
			height: this.maxY
		};
		return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
	}, c._getContainerFitWidth = function() {
		for (var g = 0, f = this.cols; --f && 0 === this.colYs[f];) {
			g++
		}
		return (this.cols - g) * this.columnWidth - this.gutter
	}, c.needsResizeLayout = function() {
		var e = this.containerWidth;
		return this.getContainerWidth(), e != this.containerWidth
	}, b
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode",
		"masonry-layout/masonry"
	], a) : "object" == typeof module && module.exports ? module.exports = a(require("../layout-mode"), require(
		"masonry-layout")) : a(b.Isotope.LayoutMode, b.Masonry)
}(window, function(k, c) {
	var d = k.create("masonry"),
		g = d.prototype,
		f = {
			_getElementOffset: !0,
			layout: !0,
			_getMeasurement: !0
		};
	for (var j in c.prototype) {
		f[j] || (g[j] = c.prototype[j])
	}
	var h = g.measureColumns;
	g.measureColumns = function() {
		this.items = this.isotope.filteredItems, h.call(this)
	};
	var b = g._getOption;
	return g._getOption = function(a) {
		return "fitWidth" == a ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options
			.fitWidth : b.apply(this.isotope, arguments)
	}, d
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"],
		a) : "object" == typeof exports ? module.exports = a(require("../layout-mode")) : a(b.Isotope.LayoutMode)
}(window, function(c) {
	var a = c.create("fitRows"),
		b = a.prototype;
	return b._resetLayout = function() {
		this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
	}, b._getItemLayoutPosition = function(h) {
		h.getSize();
		var d = h.size.outerWidth + this.gutter,
			f = this.isotope.size.innerWidth + this.gutter;
		0 !== this.x && d + this.x > f && (this.x = 0, this.y = this.maxY);
		var g = {
			x: this.x,
			y: this.y
		};
		return this.maxY = Math.max(this.maxY, this.y + h.size.outerHeight), this.x += d, g
	}, b._getContainerSize = function() {
		return {
			height: this.maxY
		}
	}, a
}),
function(b, a) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"],
		a) : "object" == typeof module && module.exports ? module.exports = a(require("../layout-mode")) : a(b.Isotope
			.LayoutMode)
}(window, function(c) {
	var a = c.create("vertical", {
			horizontalAlignment: 0
		}),
		b = a.prototype;
	return b._resetLayout = function() {
		this.y = 0
	}, b._getItemLayoutPosition = function(g) {
		g.getSize();
		var d = (this.isotope.size.innerWidth - g.size.outerWidth) * this.options.horizontalAlignment,
			f = this.y;
		return this.y += g.size.outerHeight, {
			x: d,
			y: f
		}
	}, b._getContainerSize = function() {
		return {
			height: this.y
		}
	}, a
}),
function(b, a) {
	"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size",
		"desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item",
		"isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry",
		"isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"
	], function(d, f, e, h, g, c) {
		return a(b, d, f, e, h, g, c)
	}) : "object" == typeof module && module.exports ? module.exports = a(b, require("outlayer"), require(
		"get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require(
		"isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require(
		"isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require(
		"isotope-layout/js/layout-modes/vertical")) : b.Isotope = a(b, b.Outlayer, b.getSize, b.matchesSelector, b
		.fizzyUIUtils, b.Isotope.Item, b.Isotope.LayoutMode)
}(window, function(A, k, q, x, w, z, y) {
	function b(c, a) {
		return function(f, t) {
			for (var l = 0; l < c.length; l++) {
				var D = c[l],
					C = f.sortData[D],
					d = t.sortData[D];
				if (C > d || C < d) {
					var E = void 0 !== a[D] ? a[D] : a,
						e = E ? 1 : -1;
					return (C > d ? 1 : -1) * e
				}
			}
			return 0
		}
	}
	var B = A.jQuery,
		p = String.prototype.trim ? function(a) {
			return a.trim()
		} : function(a) {
			return a.replace(/^\s+|\s+$/g, "")
		},
		j = k.create("isotope", {
			layoutMode: "masonry",
			isJQueryFiltering: !0,
			sortAscending: !0
		});
	j.Item = z, j.LayoutMode = y;
	var v = j.prototype;
	v._create = function() {
		this.itemGUID = 0, this._sorters = {}, this._getSorters(), k.prototype._create.call(this), this
		.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
		for (var a in y.modes) {
			this._initLayoutMode(a)
		}
	}, v.reloadItems = function() {
		this.itemGUID = 0, k.prototype.reloadItems.call(this)
	}, v._itemize = function() {
		for (var d = k.prototype._itemize.apply(this, arguments), a = 0; a < d.length; a++) {
			var c = d[a];
			c.id = this.itemGUID++
		}
		return this._updateItemsSortData(d), d
	}, v._initLayoutMode = function(d) {
		var a = y.modes[d],
			c = this.options[d] || {};
		this.options[d] = a.options ? w.extend(a.options, c) : c, this.modes[d] = new a(this)
	}, v.layout = function() {
		return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this
		._layout()
	}, v._layout = function() {
		var a = this._getIsInstant();
		this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, a), this
			._isLayoutInited = !0
	}, v.arrange = function(c) {
		this.option(c), this._getIsInstant();
		var a = this._filter(this.items);
		this.filteredItems = a.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this
			._hideReveal, [a]) : this._hideReveal(a), this._sort(), this._layout()
	}, v._init = v.arrange, v._hideReveal = function(a) {
		this.reveal(a.needReveal), this.hide(a.needHide)
	}, v._getIsInstant = function() {
		var c = this._getOption("layoutInstant"),
			a = void 0 !== c ? c : !this._isLayoutInited;
		return this._isInstant = a, a
	}, v._bindArrangeComplete = function() {
		function h() {
			a && c && f && d.dispatchEvent("arrangeComplete", null, [d.filteredItems])
		}
		var a, c, f, d = this;
		this.once("layoutComplete", function() {
			a = !0, h()
		}), this.once("hideComplete", function() {
			c = !0, h()
		}), this.once("revealComplete", function() {
			f = !0, h()
		})
	}, v._filter = function(E) {
		var d = this.options.filter;
		d = d || "*";
		for (var f = [], l = [], h = [], D = this._getFilterTest(d), C = 0; C < E.length; C++) {
			var c = E[C];
			if (!c.isIgnored) {
				var F = D(c);
				F && f.push(c), F && c.isHidden ? l.push(c) : F || c.isHidden || h.push(c)
			}
		}
		return {
			matches: f,
			needReveal: l,
			needHide: h
		}
	}, v._getFilterTest = function(a) {
		return B && this.options.isJQueryFiltering ? function(c) {
			return B(c.element).is(a)
		} : "function" == typeof a ? function(c) {
			return a(c.element)
		} : function(c) {
			return x(c.element, a)
		}
	}, v.updateSortData = function(c) {
		var a;
		c ? (c = w.makeArray(c), a = this.getItems(c)) : a = this.items, this._getSorters(), this
			._updateItemsSortData(a)
	}, v._getSorters = function() {
		var d = this.options.getSortData;
		for (var a in d) {
			var c = d[a];
			this._sorters[a] = m(c)
		}
	}, v._updateItemsSortData = function(f) {
		for (var a = f && f.length, c = 0; a && c < a; c++) {
			var d = f[c];
			d.updateSortData()
		}
	};
	var m = function() {
		function c(C) {
			if ("string" != typeof C) {
				return C
			}
			var e = p(C).split(" "),
				h = e[0],
				f = h.match(/^\[(.+)\]$/),
				u = f && f[1],
				l = a(u, h),
				d = j.sortDataParsers[e[1]];
			return C = d ? function(i) {
				return i && d(l(i))
			} : function(i) {
				return i && l(i)
			}
		}

		function a(f, d) {
			return f ? function(h) {
				return h.getAttribute(f)
			} : function(h) {
				var e = h.querySelector(d);
				return e && e.textContent
			}
		}
		return c
	}();
	j.sortDataParsers = {
		parseInt: function(a) {
			return parseInt(a, 10)
		},
		parseFloat: function(a) {
			return parseFloat(a)
		}
	}, v._sort = function() {
		if (this.options.sortBy) {
			var c = w.makeArray(this.options.sortBy);
			this._getIsSameSortBy(c) || (this.sortHistory = c.concat(this.sortHistory));
			var a = b(this.sortHistory, this.options.sortAscending);
			this.filteredItems.sort(a)
		}
	}, v._getIsSameSortBy = function(c) {
		for (var a = 0; a < c.length; a++) {
			if (c[a] != this.sortHistory[a]) {
				return !1
			}
		}
		return !0
	}, v._mode = function() {
		var c = this.options.layoutMode,
			a = this.modes[c];
		if (!a) {
			throw new Error("No layout mode: " + c)
		}
		return a.options = this.options[c], a
	}, v._resetLayout = function() {
		k.prototype._resetLayout.call(this), this._mode()._resetLayout()
	}, v._getItemLayoutPosition = function(a) {
		return this._mode()._getItemLayoutPosition(a)
	}, v._manageStamp = function(a) {
		this._mode()._manageStamp(a)
	}, v._getContainerSize = function() {
		return this._mode()._getContainerSize()
	}, v.needsResizeLayout = function() {
		return this._mode().needsResizeLayout()
	}, v.appended = function(d) {
		var a = this.addItems(d);
		if (a.length) {
			var c = this._filterRevealAdded(a);
			this.filteredItems = this.filteredItems.concat(c)
		}
	}, v.prepended = function(d) {
		var a = this._itemize(d);
		if (a.length) {
			this._resetLayout(), this._manageStamps();
			var c = this._filterRevealAdded(a);
			this.layoutItems(this.filteredItems), this.filteredItems = c.concat(this.filteredItems), this
				.items = a.concat(this.items)
		}
	}, v._filterRevealAdded = function(c) {
		var a = this._filter(c);
		return this.hide(a.needHide), this.reveal(a.matches), this.layoutItems(a.matches, !0), a.matches
	}, v.insert = function(l) {
		var a = this.addItems(l);
		if (a.length) {
			var c, f, d = a.length;
			for (c = 0; c < d; c++) {
				f = a[c], this.element.appendChild(f.element)
			}
			var h = this._filter(a).matches;
			for (c = 0; c < d; c++) {
				a[c].isLayoutInstant = !0
			}
			for (this.arrange(), c = 0; c < d; c++) {
				delete a[c].isLayoutInstant
			}
			this.reveal(h)
		}
	};
	var g = v.remove;
	return v.remove = function(h) {
		h = w.makeArray(h);
		var a = this.getItems(h);
		g.call(this, h);
		for (var c = a && a.length, d = 0; c && d < c; d++) {
			var f = a[d];
			w.removeFrom(this.filteredItems, f)
		}
	}, v.shuffle = function() {
		for (var c = 0; c < this.items.length; c++) {
			var a = this.items[c];
			a.sortData.random = Math.random()
		}
		this.options.sortBy = "random", this._sort(), this._layout()
	}, v._noTransition = function(f, a) {
		var c = this.options.transitionDuration;
		this.options.transitionDuration = 0;
		var d = f.apply(this, a);
		return this.options.transitionDuration = c, d
	}, v.getFilteredItemElements = function() {
		return this.filteredItems.map(function(a) {
			return a.element
		})
	}, j
});
/*
Mailchimp Ajax Submit
jQuery Plugin
Author: Siddharth Doshi
*/
(function(a) {
	a.ajaxChimp = {
		responses: {
			"We have sent you a confirmation email": 0,
			"Please enter a value": 1,
			"An email address must contain a single @": 2,
			"The domain portion of the email address is invalid (the portion after the @: )": 3,
			"The username portion of the email address is invalid (the portion before the @: )": 4,
			"This email address looks fake or invalid. Please enter a real email address": 5
		},
		translations: {
			en: null
		},
		init: function(c, b) {
			a(c).ajaxChimp(b)
		}
	};
	a.fn.ajaxChimp = function(b) {
		a(this).each(function(f, c) {
			var e = a(c);
			var d = e.find("input[type=email]");
			var g = e.find("label[for=" + d.attr("id") + "]");
			var h = a.extend({
				url: e.attr("action"),
				language: "en"
			}, b);
			var j = h.url.replace("/post?", "/post-json?").concat("&c=?");
			e.attr("novalidate", "true");
			d.attr("name", "EMAIL");
			e.submit(function() {
				var l;

				function n(s) {
					if (s.result === "success") {
						l = "We have sent you a confirmation email";
						g.removeClass("error").addClass("valid");
						d.removeClass("error").addClass("valid")
					} else {
						d.removeClass("valid").addClass("error");
						g.removeClass("valid").addClass("error");
						var q = -1;
						try {
							var r = s.msg.split(" - ", 2);
							if (r[1] === undefined) {
								l = s.msg
							} else {
								var p = parseInt(r[0], 10);
								if (p.toString() === r[0]) {
									q = r[0];
									l = r[1]
								} else {
									q = -1;
									l = s.msg
								}
							}
						} catch (o) {
							q = -1;
							l = s.msg
						}
					}
					if (h.language !== "en" && a.ajaxChimp.responses[l] !== undefined && a
						.ajaxChimp.translations && a.ajaxChimp.translations[h.language] && a
						.ajaxChimp.translations[h.language][a.ajaxChimp.responses[l]]) {
						l = a.ajaxChimp.translations[h.language][a.ajaxChimp.responses[l]]
					}
					g.html(l);
					g.show(2000);
					if (h.callback) {
						h.callback(s)
					}
				}
				var i = {};
				var k = e.serializeArray();
				a.each(k, function(o, p) {
					i[p.name] = p.value
				});
				a.ajax({
					url: j,
					data: i,
					success: n,
					dataType: "jsonp",
					error: function(o, p) {
						console.log("mailchimp ajax submit error: " + p)
					}
				});
				var m = "Submitting...";
				if (h.language !== "en" && a.ajaxChimp.translations && a.ajaxChimp.translations[
						h.language] && a.ajaxChimp.translations[h.language]["submit"]) {
					m = a.ajaxChimp.translations[h.language]["submit"]
				}
				g.html(m).show(2000);
				return false
			})
		});
		return this
	}
})(jQuery);
/*
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
! function(b) {
	"function" == typeof define && define.amd ? define(["jquery"], b) : b(jQuery)
}(function(k) {
	function l(b) {
		if (b instanceof Date) {
			return b
		}
		if (String(b).match(q)) {
			return String(b).match(/^[0-9]*$/) && (b = Number(b)), String(b).match(/\-/) && (b = String(b).replace(
				/\-/g, "/")), new Date(b)
		}
		throw new Error("Couldn't cast `" + b + "` to a date object.")
	}

	function m(c) {
		var d = c.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
		return new RegExp(d)
	}

	function n(b) {
		return function(a) {
			var c = a.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
			if (c) {
				for (var e = 0, i = c.length; e < i; ++e) {
					var u = c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
						v = m(u[0]),
						w = u[1] || "",
						x = u[3] || "",
						y = null;
					u = u[2], s.hasOwnProperty(u) && (y = s[u], y = Number(b[y])), null !== y && ("!" === w && (
						y = o(x, y)), "" === w && y < 10 && (y = "0" + y.toString()), a = a.replace(v, y
						.toString()))
				}
			}
			return a = a.replace(/%%/, "%")
		}
	}

	function o(e, f) {
		var g = "s",
			h = "";
		return e && (e = e.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === e.length ? g = e[0] : (h = e[0], g = e[1])),
			Math.abs(f) > 1 ? g : h
	}
	var p = [],
		q = [],
		r = {
			precision: 100,
			elapse: !1,
			defer: !1
		};
	q.push(/^[0-9]*$/.source), q.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), q.push(
		/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), q = new RegExp(q.join("|"));
	var s = {
			Y: "years",
			m: "months",
			n: "daysToMonth",
			d: "daysToWeek",
			w: "weeks",
			W: "weeksToMonth",
			H: "hours",
			M: "minutes",
			S: "seconds",
			D: "totalDays",
			I: "totalHours",
			N: "totalMinutes",
			T: "totalSeconds"
		},
		t = function(a, e, f) {
			this.el = a, this.$el = k(a), this.interval = null, this.offset = {}, this.options = k.extend({}, r),
				this.firstTick = !0, this.instanceNumber = p.length, p.push(this), this.$el.data(
					"countdown-instance", this.instanceNumber), f && ("function" == typeof f ? (this.$el.on(
					"update.countdown", f), this.$el.on("stoped.countdown", f), this.$el.on(
					"finish.countdown", f)) : this.options = k.extend({}, r, f)), this.setFinalDate(e), this.options
				.defer === !1 && this.start()
		};
	k.extend(t.prototype, {
		start: function() {
			null !== this.interval && clearInterval(this.interval);
			var b = this;
			this.update(), this.interval = setInterval(function() {
				b.update.call(b)
			}, this.options.precision)
		},
		stop: function() {
			clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
		},
		toggle: function() {
			this.interval ? this.stop() : this.start()
		},
		pause: function() {
			this.stop()
		},
		resume: function() {
			this.start()
		},
		remove: function() {
			this.stop.call(this), p[this.instanceNumber] = null, delete this.$el.data()
				.countdownInstance
		},
		setFinalDate: function(b) {
			this.finalDate = l(b)
		},
		update: function() {
			if (0 === this.$el.closest("html").length) {
				return void this.remove()
			}
			var c, d = new Date;
			return c = this.finalDate.getTime() - d.getTime(), c = Math.ceil(c / 1000), c = !this
				.options.elapse && c < 0 ? 0 : Math.abs(c), this.totalSecsLeft === c || this.firstTick ?
				void(this.firstTick = !1) : (this.totalSecsLeft = c, this.elapsed = d >= this.finalDate,
					this.offset = {
						seconds: this.totalSecsLeft % 60,
						minutes: Math.floor(this.totalSecsLeft / 60) % 60,
						hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
						days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
						daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
						daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
						weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
						weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
						months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
						years: Math.abs(this.finalDate.getFullYear() - d.getFullYear()),
						totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
						totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
						totalMinutes: Math.floor(this.totalSecsLeft / 60),
						totalSeconds: this.totalSecsLeft
					}, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent(
						"update") : (this.stop(), this.dispatchEvent("finish"))))
		},
		dispatchEvent: function(a) {
			var d = k.Event(a + ".countdown");
			d.finalDate = this.finalDate, d.elapsed = this.elapsed, d.offset = k.extend({}, this
				.offset), d.strftime = n(this.offset), this.$el.trigger(d)
		}
	}), k.fn.countdown = function() {
		var a = Array.prototype.slice.call(arguments, 0);
		return this.each(function() {
			var b = k(this).data("countdown-instance");
			if (void 0 !== b) {
				var f = p[b],
					g = a[0];
				t.prototype.hasOwnProperty(g) ? f[g].apply(f, a.slice(1)) : null === String(g).match(
					/^[$A-Z_][0-9A-Z_$]*$/i) ? (f.setFinalDate.call(f, g), f.start()) : k.error(
					"Method %s does not exist on jQuery.countdown".replace(/\%s/gi, g))
			} else {
				new t(this, a[0], a[1])
			}
		})
	}
});
! function(a) {
	a.fn.niceSelect = function(d) {
		function c(h) {
			h.after(a("<div></div>").addClass("nice-select").addClass(h.attr("class") || "").addClass(h.attr(
				"disabled") ? "disabled" : "").attr("tabindex", h.attr("disabled") ? null : "0").html(
				'<span class="current"></span><ul class="list"></ul>'));
			var g = h.next(),
				f = h.find("option"),
				e = h.find("option:selected");
			g.find(".current").html(e.data("display") || e.text()), f.each(function(l) {
				var k = a(this),
					j = k.data("display");
				g.find("ul").append(a("<li></li>").attr("data-value", k.val()).attr("data-display", j ||
					null).addClass("option" + (k.is(":selected") ? " selected" : "") + (k.is(
					":disabled") ? " disabled" : "")).html(k.text()))
			})
		}
		if ("string" == typeof d) {
			return "update" == d ? this.each(function() {
				var g = a(this),
					f = a(this).next(".nice-select"),
					e = f.hasClass("open");
				f.length && (f.remove(), c(g), e && g.next().trigger("click"))
			}) : "destroy" == d ? (this.each(function() {
				var f = a(this),
					e = a(this).next(".nice-select");
				e.length && (e.remove(), f.css("display", ""))
			}), 0 == a(".nice-select").length && a(document).off(".nice_select")) : console.log('Method "' + d +
				'" does not exist.'), this
		}
		this.hide(), this.each(function() {
			var e = a(this);
			e.next().hasClass("nice-select") || c(e)
		}), a(document).off(".nice_select"), a(document).on("click.nice_select", ".nice-select", function(f) {
			var e = a(this);
			a(".nice-select").not(e).removeClass("open"), e.toggleClass("open"), e.hasClass("open") ? (e
				.find(".option"), e.find(".focus").removeClass("focus"), e.find(".selected").addClass(
					"focus")) : e.focus()
		}), a(document).on("click.nice_select", function(e) {
			0 === a(e.target).closest(".nice-select").length && a(".nice-select").removeClass("open").find(
				".option")
		}), a(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(h) {
			var g = a(this),
				f = g.closest(".nice-select");
			f.find(".selected").removeClass("selected"), g.addClass("selected");
			var e = g.data("display") || g.text();
			f.find(".current").text(e), f.prev("select").val(g.data("value")).trigger("change")
		}), a(document).on("keydown.nice_select", ".nice-select", function(j) {
			var h = a(this),
				g = a(h.find(".focus") || h.find(".list .option.selected"));
			if (32 == j.keyCode || 13 == j.keyCode) {
				return h.hasClass("open") ? g.trigger("click") : h.trigger("click"), !1
			}
			if (40 == j.keyCode) {
				if (h.hasClass("open")) {
					var e = g.nextAll(".option:not(.disabled)").first();
					e.length > 0 && (h.find(".focus").removeClass("focus"), e.addClass("focus"))
				} else {
					h.trigger("click")
				}
				return !1
			}
			if (38 == j.keyCode) {
				if (h.hasClass("open")) {
					var f = g.prevAll(".option:not(.disabled)").first();
					f.length > 0 && (h.find(".focus").removeClass("focus"), f.addClass("focus"))
				} else {
					h.trigger("click")
				}
				return !1
			}
			if (27 == j.keyCode) {
				h.hasClass("open") && h.trigger("click")
			} else {
				if (9 == j.keyCode && h.hasClass("open")) {
					return !1
				}
			}
		});
		var b = document.createElement("a").style;
		return b.cssText = "pointer-events:auto", "auto" !== b.pointerEvents && a("html").addClass(
			"no-csspointerevents"), this
	}
}(jQuery);
! function(S) {
	var at, ac, J, F, al, au, L, ag, aq, aj, ax, av, G, af, an, ah, ab, Z, aa, aB, aD, az, K, A, H, ao, T, am, Q, ai,
		ak, aw, ay, ad, aF, ar, aC, aE, ae, aA, ap;
	S.fn.extend({
		venobox: function(a) {
			var b = this,
				c = S.extend({
					arrowsColor: "#B6B6B6",
					autoplay: !1,
					bgcolor: "#fff",
					border: "0",
					closeBackground: "#161617",
					closeColor: "#d2d2d2",
					framewidth: "",
					frameheight: "",
					gallItems: !1,
					infinigall: !1,
					htmlClose: "&times;",
					htmlNext: "<span>Next</span>",
					htmlPrev: "<span>Prev</span>",
					numeratio: !1,
					numerationBackground: "#161617",
					numerationColor: "#d2d2d2",
					numerationPosition: "top",
					overlayClose: !0,
					overlayColor: "rgba(23,23,23,0.85)",
					spinner: "double-bounce",
					spinColor: "#d2d2d2",
					titleattr: "title",
					titleBackground: "#161617",
					titleColor: "#d2d2d2",
					titlePosition: "top",
					cb_pre_open: function() {
						return !0
					},
					cb_post_open: function() {},
					cb_pre_close: function() {
						return !0
					},
					cb_post_close: function() {},
					cb_post_resize: function() {},
					cb_after_nav: function() {},
					cb_init: function() {}
				}, a);
			return c.cb_init(b), this.each(function() {
				if ((Q = S(this)).data("venobox")) {
					return !0
				}

				function d() {
					aD = Q.data("gall"), ab = Q.data("numeratio"), av = Q.data("gallItems"), G = Q
						.data("infinigall"), af = av || S('.vbox-item[data-gall="' + aD + '"]'),
						az = af.eq(af.index(Q) + 1), K = af.eq(af.index(Q) - 1), az.length || !0 !==
						G || (az = af.eq(0)), af.length > 1 ? (ai = af.index(Q) + 1, J.html(ai +
							" / " + af.length)) : ai = 1, !0 === ab ? J.show() : J.hide(), "" !==
						aB ? F.show() : F.hide(), az.length || !0 === G ? (S(".vbox-next").css(
							"display", "block"), A = !0) : (S(".vbox-next").css("display", "none"),
							A = !1), af.index(Q) > 0 || !0 === G ? (S(".vbox-prev").css("display",
							"block"), H = !0) : (S(".vbox-prev").css("display", "none"), H = !1), !
						0 !== H && !0 !== A || (L.on(m.DOWN, i), L.on(m.MOVE, j), L.on(m.UP, l))
				}

				function q(w) {
					return !(w.length < 1) && (!an && (an = !0, Z = w.data("overlay") || w.data(
							"overlaycolor"), aj = w.data("framewidth"), ax = w.data(
							"frameheight"), al = w.data("border"), ac = w.data("bgcolor"),
						ag = w.data("href") || w.attr("href"), at = w.data("autoplay"), aB =
						w.attr(w.data("titleattr")) || "", w === K && L.addClass("animated")
						.addClass("swipe-right"), w === az && L.addClass("animated")
						.addClass("swipe-left"), T.show(), void L.animate({
							opacity: 0
						}, 500, function() {
							aa.css("background", Z), L.removeClass("animated")
								.removeClass("swipe-left").removeClass("swipe-right")
								.css({
									"margin-left": 0,
									"margin-right": 0
								}), "iframe" == w.data("vbtype") ? f() : "inline" == w
								.data("vbtype") ? p() : "ajax" == w.data("vbtype") ?
							k() : "video" == w.data("vbtype") ? e(at) : (L.html(
									'<img src="' + ag + '">'), u()), Q = w, d(), an = !
								1, c.cb_after_nav(Q, ai, az, K)
						})))
				}

				function r(w) {
					27 === w.keyCode && t(), 37 == w.keyCode && !0 === H && q(K), 39 == w.keyCode &&
						!0 === A && q(az)
				}

				function t() {
					if (!1 === c.cb_pre_close(Q, ai, az, K)) {
						return !1
					}
					S("body").off("keydown", r).removeClass("vbox-open"), Q.focus(), aa.animate({
						opacity: 0
					}, 500, function() {
						aa.remove(), an = !1, c.cb_post_close()
					})
				}
				b.VBclose = function() {
						t()
					}, Q.addClass("vbox-item"), Q.data("framewidth", c.framewidth), Q.data(
						"frameheight", c.frameheight), Q.data("border", c.border), Q.data("bgcolor",
						c.bgcolor), Q.data("numeratio", c.numeratio), Q.data("gallItems", c
						.gallItems), Q.data("infinigall", c.infinigall), Q.data("overlaycolor", c
						.overlayColor), Q.data("titleattr", c.titleattr), Q.data("venobox", !0), Q
					.on("click", function(w) {
						if (w.preventDefault(), Q = S(this), !1 === c.cb_pre_open(Q)) {
							return !1
						}
						switch (b.VBnext = function() {
								q(az)
							}, b.VBprev = function() {
								q(K)
							}, Z = Q.data("overlay") || Q.data("overlaycolor"), aj = Q.data(
								"framewidth"), ax = Q.data("frameheight"), at = Q.data(
								"autoplay") || c.autoplay, al = Q.data("border"), ac = Q.data(
								"bgcolor"), A = !1, H = !1, an = !1, ag = Q.data("href") || Q
							.attr("href"), aq = Q.data("css") || "", aB = Q.attr(Q.data(
								"titleattr")) || "", ao = '<div class="vbox-preloader">', c
							.spinner) {
							case "rotating-plane":
								ao += '<div class="sk-rotating-plane"></div>';
								break;
							case "double-bounce":
								ao +=
									'<div class="sk-double-bounce"><div class="sk-child sk-double-bounce1"></div><div class="sk-child sk-double-bounce2"></div></div>';
								break;
							case "wave":
								ao +=
									'<div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div><div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>';
								break;
							case "wandering-cubes":
								ao +=
									'<div class="sk-wandering-cubes"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div></div>';
								break;
							case "spinner-pulse":
								ao += '<div class="sk-spinner sk-spinner-pulse"></div>';
								break;
							case "chasing-dots":
								ao +=
									'<div class="sk-chasing-dots"><div class="sk-child sk-dot1"></div><div class="sk-child sk-dot2"></div></div>';
								break;
							case "three-bounce":
								ao +=
									'<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>';
								break;
							case "circle":
								ao +=
									'<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>';
								break;
							case "cube-grid":
								ao +=
									'<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
								break;
							case "fading-circle":
								ao +=
									'<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>';
								break;
							case "folding-cube":
								ao +=
									'<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>'
						}
						return ao += "</div>", am = '<a class="vbox-next">' + c.htmlNext +
							'</a><a class="vbox-prev">' + c.htmlPrev + "</a>", aw =
							'<div class="vbox-title"></div><div class="vbox-num">0/0</div><div class="vbox-close">' +
							c.htmlClose + "</div>", au = '<div class="vbox-overlay ' + aq +
							'" style="background:' + Z + '">' + ao +
							'<div class="vbox-container"><div class="vbox-content"></div></div>' +
							aw + am + "</div>", S("body").append(au).addClass("vbox-open"), S(
								".vbox-preloader div:not(.sk-circle) .sk-child, .vbox-preloader .sk-rotating-plane, .vbox-preloader .sk-rect, .vbox-preloader div:not(.sk-folding-cube) .sk-cube, .vbox-preloader .sk-spinner-pulse"
								).css("background-color", c.spinColor), aa = S(".vbox-overlay"),
							S(".vbox-container"), L = S(".vbox-content"), J = S(".vbox-num"),
							F = S(".vbox-title"), (T = S(".vbox-preloader")).show(), F.css(c
								.titlePosition, "-1px"), F.css({
								color: c.titleColor,
								"background-color": c.titleBackground
							}), S(".vbox-close").css({
								color: c.closeColor,
								"background-color": c.closeBackground
							}), S(".vbox-num").css(c.numerationPosition, "-1px"), S(".vbox-num")
							.css({
								color: c.numerationColor,
								"background-color": c.numerationBackground
							}), S(".vbox-next span, .vbox-prev span").css({
								"border-top-color": c.arrowsColor,
								"border-right-color": c.arrowsColor
							}), L.html(""), L.css("opacity", "0"), aa.css("opacity", "0"), d(),
							aa.animate({
								opacity: 1
							}, 250, function() {
								"iframe" == Q.data("vbtype") ? f() : "inline" == Q.data(
										"vbtype") ? p() : "ajax" == Q.data("vbtype") ? k() :
									"video" == Q.data("vbtype") ? e(at) : (L.html(
										'<img src="' + ag + '">'), u()), c.cb_post_open(Q,
										ai, az, K)
							}), S("body").keydown(r), S(".vbox-prev").on("click", function() {
								q(K)
							}), S(".vbox-next").on("click", function() {
								q(az)
							}), !1
					});
				var v = ".vbox-overlay";

				function i(w) {
					L.addClass("animated"), ad = ar = w.pageY, aF = aC = w.pageX, ak = !0
				}

				function j(w) {
					if (!0 === ak) {
						aC = w.pageX, ar = w.pageY, ae = aC - aF, aA = ar - ad;
						var x = Math.abs(ae);
						x > Math.abs(aA) && x <= 100 && (w.preventDefault(), L.css("margin-left",
							ae))
					}
				}

				function l(w) {
					if (!0 === ak) {
						ak = !1;
						var y = Q,
							x = !1;
						(aE = aC - aF) < 0 && !0 === A && (y = az, x = !0), aE > 0 && !0 === H && (
							y = K, x = !0), Math.abs(aE) >= ap && !0 === x ? q(y) : L.css({
							"margin-left": 0,
							"margin-right": 0
						})
					}
				}
				c.overlayClose || (v = ".vbox-close"), S("body").on("click", v, function(w) {
					(S(w.target).is(".vbox-overlay") || S(w.target).is(".vbox-content") ||
						S(w.target).is(".vbox-close") || S(w.target).is(".vbox-preloader")
						) && t()
				}), aF = 0, aC = 0, aE = 0, ap = 50, ak = !1;
				var m = {
						DOWN: "touchmousedown",
						UP: "touchmouseup",
						MOVE: "touchmousemove"
					},
					n = function(y) {
						var x;
						switch (y.type) {
							case "mousedown":
								x = m.DOWN;
								break;
							case "mouseup":
							case "mouseout":
								x = m.UP;
								break;
							case "mousemove":
								x = m.MOVE;
								break;
							default:
								return
						}
						var w = s(x, y, y.pageX, y.pageY);
						S(y.target).trigger(w)
					},
					h = function(z) {
						var y;
						switch (z.type) {
							case "touchstart":
								y = m.DOWN;
								break;
							case "touchend":
								y = m.UP;
								break;
							case "touchmove":
								y = m.MOVE;
								break;
							default:
								return
						}
						var x, w = z.originalEvent.touches[0];
						x = y == m.UP ? s(y, z, null, null) : s(y, z, w.pageX, w.pageY), S(z.target)
							.trigger(x)
					},
					s = function(z, y, x, w) {
						return S.Event(z, {
							pageX: x,
							pageY: w,
							originalEvent: y
						})
					};

				function k() {
					S.ajax({
						url: ag,
						cache: !1
					}).done(function(w) {
						L.html('<div class="vbox-inline">' + w + "</div>"), u()
					}).fail(function() {
						L.html(
								'<div class="vbox-inline"><p>Error retrieving contents, please retry</div>'),
							g()
					})
				}

				function f() {
					L.html('<iframe class="venoframe" src="' + ag + '"></iframe>'), g()
				}

				function e(x) {
					var z, y = function(B) {
							var C;
							B.match(
									/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
								RegExp.$3.indexOf("youtu") > -1 ? C = "youtube" : RegExp.$3.indexOf(
									"vimeo") > -1 && (C = "vimeo");
							return {
								type: C,
								id: RegExp.$6
							}
						}(ag),
						w = (x ? "?rel=0&autoplay=1" : "?rel=0") + function(D) {
							var M = "",
								E = decodeURIComponent(D).split("?");
							if (void 0 !== E[1]) {
								var C, B, I = E[1].split("&");
								for (B = 0; B < I.length; B++) {
									C = I[B].split("="), M = M + "&" + C[0] + "=" + C[1]
								}
							}
							return encodeURI(M)
						}(ag);
					"vimeo" == y.type ? z = "https://player.vimeo.com/video/" : "youtube" == y
						.type && (z = "https://www.youtube.com/embed/"), L.html(
							'<iframe class="venoframe vbvid" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" src="' +
							z + y.id + w + '"></iframe>'), g()
				}

				function p() {
					L.html('<div class="vbox-inline">' + S(ag).html() + "</div>"), g()
				}

				function u() {
					(ay = L.find("img")).length ? ay.each(function() {
						S(this).one("load", function() {
							g()
						})
					}) : g()
				}

				function g() {
					F.html(aB), L.find(">:first-child").addClass("figlio").css({
						width: aj,
						height: ax,
						padding: al,
						background: ac
					}), S("img.figlio").on("dragstart", function(w) {
						w.preventDefault()
					}), o(), L.animate({
						opacity: "1"
					}, "slow", function() {
						T.hide()
					})
				}

				function o() {
					var x = L.outerHeight(),
						w = S(window).height();
					ah = x + 60 < w ? (w - x) / 2 : "30px", L.css("margin-top", ah), L.css(
						"margin-bottom", ah), c.cb_post_resize()
				}
				"ontouchstart" in window ? (S(document).on("touchstart", h), S(document).on(
					"touchmove", h), S(document).on("touchend", h)) : (S(document).on(
					"mousedown", n), S(document).on("mouseup", n), S(document).on(
					"mouseout", n), S(document).on("mousemove", n)), S(window).resize(
			function() {
					S(".vbox-content").length && setTimeout(o(), 800)
				})
			})
		}
	})
}(jQuery);
! function(a) {
	a.fn.theiaStickySidebar = function(h) {
		function c(k, j) {
			var i = f(k, j);
			i || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), a(document).on(
				"scroll." + k.namespace,
				function(m, l) {
					return function(e) {
						var o = f(m, l);
						o && a(this).unbind(e)
					}
				}(k, j)), a(window).on("resize." + k.namespace, function(m, l) {
				return function(e) {
					var o = f(m, l);
					o && a(this).unbind(e)
				}
			}(k, j)))
		}

		function f(j, i) {
			return j.initialized === !0 || !(a("body").width() < j.minWidth) && (b(j, i), !0)
		}

		function b(k, i) {
			k.initialized = !0;
			var j = a("#theia-sticky-sidebar-stylesheet-" + k.namespace);
			0 === j.length && a("head").append(a('<style id="theia-sticky-sidebar-stylesheet-' + k.namespace +
				'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), i.each(
				function() {
					function n() {
						l.fixedScrollTop = 0, l.sidebar.css({
							"min-height": "1px"
						}), l.stickySidebar.css({
							position: "static",
							width: "",
							transform: "none"
						})
					}

					function p(r) {
						var o = r.height();
						return r.children().each(function() {
							o = Math.max(o, a(this).height())
						}), o
					}
					var l = {};
					if (l.sidebar = a(this), l.options = k || {}, l.container = a(l.options.containerSelector),
						0 == l.container.length && (l.container = l.sidebar.parent()), l.sidebar.parents().css(
							"-webkit-transform", "none"), l.sidebar.css({
							position: l.options.defaultPosition,
							overflow: "visible",
							"-webkit-box-sizing": "border-box",
							"-moz-box-sizing": "border-box",
							"box-sizing": "border-box"
						}), l.stickySidebar = l.sidebar.find(".theiaStickySidebar"), 0 == l.stickySidebar.length
						) {
						var t = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
						l.sidebar.find("script").filter(function(e, o) {
							return 0 === o.type.length || o.type.match(t)
						}).remove(), l.stickySidebar = a("<div>").addClass("theiaStickySidebar").append(l
							.sidebar.children()), l.sidebar.append(l.stickySidebar)
					}
					l.marginBottom = parseInt(l.sidebar.css("margin-bottom")), l.paddingTop = parseInt(l.sidebar
						.css("padding-top")), l.paddingBottom = parseInt(l.sidebar.css("padding-bottom"));
					var q = l.stickySidebar.offset().top,
						m = l.stickySidebar.outerHeight();
					l.stickySidebar.css("padding-top", 1), l.stickySidebar.css("padding-bottom", 1), q -= l
						.stickySidebar.offset().top, m = l.stickySidebar.outerHeight() - m - q, 0 == q ? (l
							.stickySidebar.css("padding-top", 0), l.stickySidebarPaddingTop = 0) : l
						.stickySidebarPaddingTop = 1, 0 == m ? (l.stickySidebar.css("padding-bottom", 0), l
							.stickySidebarPaddingBottom = 0) : l.stickySidebarPaddingBottom = 1, l
						.previousScrollTop = null, l.fixedScrollTop = 0, n(), l.onScroll = function(e) {
							if (e.stickySidebar.is(":visible")) {
								if (a("body").width() < e.options.minWidth) {
									return void n()
								}
								if (e.options.disableOnResponsiveLayouts) {
									var I = e.sidebar.outerWidth("none" == e.sidebar.css("float"));
									if (I + 50 > e.container.width()) {
										return void n()
									}
								}
								var H = a(document).scrollTop(),
									z = "static";
								if (H >= e.sidebar.offset().top + (e.paddingTop - e.options
									.additionalMarginTop)) {
									var w, G = e.paddingTop + k.additionalMarginTop,
										o = e.paddingBottom + e.marginBottom + k.additionalMarginBottom,
										E = e.sidebar.offset().top,
										A = e.sidebar.offset().top + p(e.container),
										C = 0 + k.additionalMarginTop,
										B = e.stickySidebar.outerHeight() + G + o < a(window).height();
									w = B ? C + e.stickySidebar.outerHeight() : a(window).height() - e
										.marginBottom - e.paddingBottom - k.additionalMarginBottom;
									var K = E - H + e.paddingTop,
										J = A - H - e.paddingBottom - e.marginBottom,
										N = e.stickySidebar.offset().top - H,
										F = e.previousScrollTop - H;
									"fixed" == e.stickySidebar.css("position") && "modern" == e.options
										.sidebarBehavior && (N += F), "stick-to-top" == e.options
										.sidebarBehavior && (N = k.additionalMarginTop), "stick-to-bottom" == e
										.options.sidebarBehavior && (N = w - e.stickySidebar.outerHeight()), N =
										F > 0 ? Math.min(N, C) : Math.max(N, w - e.stickySidebar.outerHeight()),
										N = Math.max(N, K), N = Math.min(N, J - e.stickySidebar.outerHeight());
									var D = e.container.height() == e.stickySidebar.outerHeight();
									z = (D || N != C) && (D || N != w - e.stickySidebar.outerHeight()) ? H + N -
										e.sidebar.offset().top - e.paddingTop <= k.additionalMarginTop ?
										"static" : "absolute" : "fixed"
								}
								if ("fixed" == z) {
									var L = a(document).scrollLeft();
									e.stickySidebar.css({
										position: "fixed",
										width: d(e.stickySidebar) + "px",
										transform: "translateY(" + N + "px)",
										left: e.sidebar.offset().left + parseInt(e.sidebar.css(
											"padding-left")) - L + "px",
										top: "0px"
									})
								} else {
									if ("absolute" == z) {
										var M = {};
										"absolute" != e.stickySidebar.css("position") && (M.position =
												"absolute", M.transform = "translateY(" + (H + N - e.sidebar
													.offset().top - e.stickySidebarPaddingTop - e
													.stickySidebarPaddingBottom) + "px)", M.top = "0px"), M
											.width = d(e.stickySidebar) + "px", M.left = "", e.stickySidebar
											.css(M)
									} else {
										"static" == z && n()
									}
								}
								"static" != z && 1 == e.options.updateSidebarHeight && e.sidebar.css({
									"min-height": e.stickySidebar.outerHeight() + e.stickySidebar
										.offset().top - e.sidebar.offset().top + e.paddingBottom
								}), e.previousScrollTop = H
							}
						}, l.onScroll(l), a(document).on("scroll." + l.options.namespace, function(e) {
							return function() {
								e.onScroll(e)
							}
						}(l)), a(window).on("resize." + l.options.namespace, function(e) {
							return function() {
								e.stickySidebar.css({
									position: "static"
								}), e.onScroll(e)
							}
						}(l)), "undefined" != typeof ResizeSensor && new ResizeSensor(l.stickySidebar[0],
							function(e) {
								return function() {
									e.onScroll(e)
								}
							}(l))
				})
		}

		function d(e) {
			var j;
			try {
				j = e[0].getBoundingClientRect().width
			} catch (e) {}
			return "undefined" == typeof j && (j = e.width()), j
		}
		var g = {
			containerSelector: "",
			additionalMarginTop: 0,
			additionalMarginBottom: 0,
			updateSidebarHeight: !0,
			minWidth: 0,
			disableOnResponsiveLayouts: !0,
			sidebarBehavior: "modern",
			defaultPosition: "relative",
			namespace: "TSS"
		};
		return h = a.extend(g, h), h.additionalMarginTop = parseInt(h.additionalMarginTop) || 0, h
			.additionalMarginBottom = parseInt(h.additionalMarginBottom) || 0, c(h, this), this
	}
}(jQuery);
/*
 * scrollup v2.4.1
 * Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear Ã¢â‚¬â€ @markgdyr Ã¢â‚¬â€ http://markgoodyear.com
 * License: MIT
 */
! function(b, c, a) {
	b.fn.scrollUp = function(d) {
		b.data(a.body, "scrollUp") || (b.data(a.body, "scrollUp", !0), b.fn.scrollUp.init(d))
	}, b.fn.scrollUp.init = function(o) {
		var q, u, g, k, l, e, h, m = b.fn.scrollUp.settings = b.extend({}, b.fn.scrollUp.defaults, o),
			j = !1;
		switch (h = m.scrollTrigger ? b(m.scrollTrigger) : b("<a/>", {
				id: m.scrollName,
				href: "#top"
			}), m.scrollTitle && h.attr("title", m.scrollTitle), h.appendTo("body"), m.scrollImg || m
			.scrollTrigger || h.html(m.scrollText), h.css({
				display: "none",
				position: "fixed",
				zIndex: m.zIndex
			}), m.activeOverlay && b("<div/>", {
				id: m.scrollName + "-active"
			}).css({
				position: "absolute",
				top: m.scrollDistance + "px",
				width: "100%",
				borderTop: "1px dotted" + m.activeOverlay,
				zIndex: m.zIndex
			}).appendTo("body"), m.animation) {
			case "fade":
				q = "fadeIn", u = "fadeOut", g = m.animationSpeed;
				break;
			case "slide":
				q = "slideDown", u = "slideUp", g = m.animationSpeed;
				break;
			default:
				q = "show", u = "hide", g = 0
		}
		k = "top" === m.scrollFrom ? m.scrollDistance : b(a).height() - b(c).height() - m.scrollDistance, l = b(c)
			.scroll(function() {
				b(c).scrollTop() > k ? j || (h[q](g), j = !0) : j && (h[u](g), j = !1)
			}), m.scrollTarget ? "number" == typeof m.scrollTarget ? e = m.scrollTarget : "string" == typeof m
			.scrollTarget && (e = Math.floor(b(m.scrollTarget).offset().top)) : e = 0, h.click(function(d) {
				d.preventDefault(), b("html, body").animate({
					scrollTop: e
				}, m.scrollSpeed, m.easingType)
			})
	}, b.fn.scrollUp.defaults = {
		scrollName: "scrollUp",
		scrollDistance: 300,
		scrollFrom: "top",
		scrollSpeed: 300,
		easingType: "linear",
		animation: "fade",
		animationSpeed: 200,
		scrollTrigger: !1,
		scrollTarget: !1,
		scrollText: "Scroll to top",
		scrollTitle: !1,
		scrollImg: !1,
		activeOverlay: !1,
		zIndex: 2147483647
	}, b.fn.scrollUp.destroy = function(d) {
		b.removeData(a.body, "scrollUp"), b("#" + b.fn.scrollUp.settings.scrollName).remove(), b("#" + b.fn.scrollUp
				.settings.scrollName + "-active").remove(), b.fn.jquery.split(".")[1] >= 7 ? b(c).off("scroll", d) :
			b(c).unbind("scroll", d)
	}, b.scrollUp = b.fn.scrollUp
}(jQuery, window, document);
$(function() {
	var a = $("#contact-form");
	var b = $(".form-messege");
	$(a).submit(function(c) {
		c.preventDefault();
		var d = $(a).serialize();
		$.ajax({
			type: "POST",
			url: $(a).attr("action"),
			data: d
		}).done(function(e) {
			$(b).removeClass("error");
			$(b).addClass("success");
			$(b).text(e);
			$("#contact-form input,#contact-form textarea").val("")
		}).fail(function(e) {
			$(b).removeClass("success");
			$(b).addClass("error");
			if (e.responseText !== "") {
				$(b).text(e.responseText)
			} else {
				$(b).text("Oops! An error occured and your message could not be sent.")
			}
		})
	})
});