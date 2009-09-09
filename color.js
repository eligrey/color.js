/*
 * color.js
 * Version 0.1
 *
 * 2009-09-08
 * 
 * By Elijah Grey, http://eligrey.com
 *
 * Implements a `Color' constructor.
 * 
 * License: GNU GPL v3 and the X11/MIT license
 *   See COPYING.md
 */

var Color = (function () {
	var Color = function Color (red, green, blue, alpha) {
		var color   = this,
		strType     = "string",
		args        = arguments.length,
		parseHex    = function (h) {
			return parseInt(h, 16);
		};
		
		args < 4 &&
			(alpha = 1);
		
		if (args < 3) { // called as Color(color [, alpha])
			if (typeof red === strType) {
				red = red.substr(red.indexOf("#") + 1);
				var threeDigits = red.length === 3;
				red = parseHex(red);
				threeDigits &&
					(red = (((red & 0xF00) * 0x1100) | ((red & 0xF0) * 0x110) | ((red & 0xF) * 0x11)));
			}
			
			args === 2 && // alpha specifed
				(alpha = green);
			
			green = (red & 0xFF00) / 0x100;
			blue  =  red & 0xFF;
			red   =  red >>> 0x10;
		}
		
		if (!(color instanceof Color)) {
			return new Color(red, green, blue, alpha);
		}
		
		typeof red === strType &&
			(red = parseHex(red));
		typeof green === strType &&
			(green = parseHex(green));
		typeof blue === strType &&
			(blue = parseHex(blue));
		
		this.channels = {
			red  : red,
			green: green,
			blue : blue,
			alpha: alpha
		};
	},
	proto       = Color.prototype,
	doc         = document,
	docEl       = doc.documentElement,
	defaultView = doc.defaultView,
	False       = false;
	
	Color.table = {};
	
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
		
		var el = doc.createElement("div"),
		style = el.style,
		bgColor = "backgroundColor",
		i,
		rgb;
		
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
		
		if (i < 3) {
			return False;
		}
		
		while (i--) {
			rgb[i] = parseInt(rgb[i], 10);
		}
		
		return Color.apply(null, rgb);
	};
	
	Color.random = function () {
		// random color from #000000 to #FFFFFF
		return new Color(Math.floor(Math.random() * 0x1000000));
	};
	
	proto.getValue = function () {
		var channels = this.channels;
		return (
			(channels.red   * 0x10000) |
			(channels.green * 0x100  ) |
			 channels.blue
		);
	};
	
	proto.setValue = function (value) {
		this.channels = {
			red  :  value >>> 0x10,
			green: (value & 0xFF00) / 0x100,
			blue :  value & 0xFF,
			alpha:  this.channels.alpha
		};
	};
	
	proto.getRGB = function () {
		var channels = this.channels;
		return "rgb(" + channels.red + "," + channels.green + "," + channels.blue + ")";
	};
	
	proto.getRGBA = function () {
		var channels = this.channels;
		return "rgba(" + channels.red + "," + channels.green + "," + channels.blue + "," + channels.alpha + ")";
	};
	
	proto.valueOf = proto.toString = ("01".substr(-1) === "1" ?
		function (noHash) {
			// pad value 6 zeros to the left
			return (noHash ? "" : "#") + ("00000" + this.getValue().toString(16)).substr(-6);
		}
	: // IE doesn't support substr with negative numbers
		function (noHash) {
			// pad value 6 zeros to the left
			// return (noHash ? "" : "#") + ("00000" + this.getValue().toString(16)).substr(-6);
			var str = this.getValue().toString(16),
				width = 6,
				f = (new Array( str.length < Math.abs(width) ? Math.abs(width) - str.length + 1 : 0)).join("0");
		
			return (noHash ? "" : "#") + (width > 0 ? f + str : str + f);
		}
	);
	
	return Color;
}());
