/*
 * color.js
 * Version 0.2
 *
 * 2009-09-11
 * 
 * By Elijah Grey, http://eligrey.com
 *
 * License: GNU GPL v3 and the X11/MIT license
 *   See COPYING.md
 */

var Color = (function () {
	var Color = function Color (r, g, b, a) {
		var
		color    = this,
		strType  = "string",
		args     = arguments.length,
		parseHex = function (h) {
			return parseInt(h, 16);
		};
		
		args < 4 &&
			(a = 1);
		
		if (args < 3) { // called as Color(color [, alpha])
			if (typeof r === strType) {
				r = r.substr(r.indexOf("#") + 1);
				var threeDigits = r.length === 3;
				r = parseHex(r);
				threeDigits &&
					(r = (((r & 0xF00) * 0x1100) | ((r & 0xF0) * 0x110) | ((r & 0xF) * 0x11)));
			}
			
			args === 2 && // alpha specifed
				(a = g);
			
			g = (r & 0xFF00) / 0x100;
			b =  r & 0xFF;
			r =  r >>> 0x10;
		}
		
		if (!(color instanceof Color)) {
			return new Color(r, g, b, a);
		}
		
		this.channels = [
			typeof r === strType && parseHex(r)   || r,
			typeof g === strType && parseHex(g)   || g,
			typeof b === strType && parseHex(b)   || b,
			typeof a === strType && parseFloat(a) || a
		];
	},
	proto       = Color.prototype,
	math        = Math,
	doc         = document,
	docEl       = doc.documentElement,
	defaultView = doc.defaultView,
	False       = false;
	
	Color.table = {
		"transparent": [0, 0, 0, 0]
	};
	
	// RGB to HSL and HSL to RGB code from
	// http://www.mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	
	Color.RGBtoHSL = function (rgb) {
		// in JS 1.7 use: var [r, g, b] = rgb;
		var r = rgb[0],
		    g = rgb[1],
		    b = rgb[2];
		
		r /= 255;
		g /= 255;
		b /= 255;
		
		var max = math.max(r, g, b),
		    min = math.min(r, g, b),
		h, s, l = (max + min) / 2;

		if (max === min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
			    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			    case g: h = (b - r) / d + 2; break;
			    case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}

		return [h, s, l];

	};
	
	Color.HSLtoRGB = function (hsl) {
		// in JS 1.7 use: var [h, s, l] = hsl;
		var h = hsl[0],
		    s = hsl[1],
		    l = hsl[2],
		
		r, g, b,
		
		hue2rgb = function (p, q, t){
		    if (t < 0) t += 1;
		    if (t > 1) t -= 1;
		    if (t < 1/6) return p + (q - p) * 6 * t;
		    if (t < 1/2) return q;
		    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
		    return p;
		};
		
		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			var
			q = l < 0.5 ? l * (1 + s) : l + s - l * s,
			p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [r * 0xFF, g * 0xFF, b * 0xFF];
	};
	
	Color.rgb = function (r, g, b, a) {
		return new Color(r, g, b, typeof a !== "undefined" ? a : 1)
	};
	
	Color.hsl = function (h, s, l, a) {
		var rgb = Color.HSLtoRGB([h, s, l]),
		   ceil = math.ceil;
		return new Color(ceil(rgb[0]), ceil(rgb[1]), ceil(rgb[2]), typeof a !== "undefined" ? a : 1);
	};
	
	Color.TOSTRING = "hexTriplet"; // default toString method used
	
	Color.define = function (color, rgb) {
		Color.table[color] = rgb;
	};
	
	Color.get = function (color) {
		if (color in Color.table) {
			return Color.apply(null, Color.table[color]);
		}
		
		if (typeof defaultView === "undefined" || typeof defaultView.getComputedStyle === "undefined") {
			return False;
		}
		
		var
		el      = doc.createElement("div"),
		style   = el.style,
		bgColor = "backgroundColor",
		rgb,
		i;
		
		color = color.replace(/[^a-zA-Z]/g, "").toLowerCase();
		
		style.display = "none";
		
		try {
			style[bgColor] = color;
		} catch (e) {
			return False;
		}
		
		if (!style[bgColor] || style[bgColor] === "transparent") {
			return False;
		}
		
		docEl.appendChild(el);
		
		rgb = defaultView.getComputedStyle(el, null)[bgColor].replace(/[^\d,]/g, "").split(",");
		
		style.removeProperty(bgColor);
		style.removeProperty("display");
		
		docEl.removeChild(el);
		
		i = rgb.length;
		
		while (i--) {
			rgb[i] = rgb[i] && parseInt(rgb[i], 10) || 0;
		}
		
		return Color.apply(null, rgb);
	};
	
	Color.random = function (rangeStart, rangeEnd) {
		typeof rangeStart === "string" &&
			(rangeStart = Color.get(rangeStart)) &&
			(rangeStart = rangeStart.getValue());
		typeof rangeEnd === "string" &&
			(rangeEnd = Color.get(rangeEnd)) &&
			(rangeEnd = rangeEnd.getValue());
		
		var floor = math.floor,
		   random = math.random;
		
		rangeEnd = (rangeEnd || 0xFFFFFF) + 1;
		if (!isNaN(rangeStart)) {
			return new Color(floor((random() * (rangeEnd - rangeStart)) + rangeStart));
		}
		// random color from #000000 to #FFFFFF
		return new Color(floor(random() * rangeEnd));
	};
	
	proto.toString = function () {
		return this[Color.TOSTRING]();
	};
	
	proto.valueOf = proto.getValue = function () {
		var channels = this.channels;
		return (
			(channels[0] * 0x10000) |
			(channels[1] * 0x100  ) |
			 channels[2]
		);
	};
	
	proto.setValue = function (value) {
		this.channels.splice(
			0, 3,
			
			value >>> 0x10,
			(value & 0xFF00) / 0x100,
			value & 0xFF
		);
	};
	
	proto.hexTriplet = ("01".substr(-1) === "1" ?
	// pad 6 zeros to the left
		function () {
			return "#" + ("00000" + this.getValue().toString(16)).substr(-6);
		}
	: // IE doesn't support substr with negative numbers
		function () {
			var str = this.getValue().toString(16);
			return "#" + (new Array( str.length < 6 ? 6 - str.length + 1 : 0)).join("0") + str;
		}
	);
	
	proto.css = function () {
		var color = this;
		return color.channels[3] === 1 ? color.hexTriplet() : color.rgba();
	};
	
	proto.rgbData = function () {
		return this.channels.slice(0, 3);
	};
	
	proto.hslData = function () {
		return Color.RGBtoHSL(this.rgbData());
	};
	
	// TODO: get rid of redundancy in the following methods
	
	proto.rgb = function () {
		return "rgb(" + this.rgbData().join(",") + ")";
	};
	
	proto.rgba = function () {
		return "rgba(" + this.channels.slice(0, 4).join(",") + ")";
	};
	
	proto.hsl = function () {
		var hsl = this.hslData();
		return "hsl(" + hsl[0] * 360 + "," + (hsl[1] * 100) + "%," + (hsl[2] * 100) + "%)";
	};
	
	proto.hsla = function () {
		var hsl = this.hslData();
		return "hsla(" + hsl[0] * 360 + "," + (hsl[1] * 100) + "%," + (hsl[2] * 100) + "%," + this.channels[3] + ")";
	};
	
	return Color;
}());
