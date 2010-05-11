color.js
========

*Version 0.2.1.2*

Create and manipulate colors with ease.

Examples
--------

### Making violet (#EE82EE):

    Color.get("violet")
    Color(0xEE82EE)
    Color("#EE82EE")
    Color("EE82EE")
    Color(0xEE, 0x82, 0xEE)
    Color("EE", "82", "EE")
    Color(238, 130, 238)
    Color.rgb(238, 130, 238)
    Color.hsl(0.8333333333333334, 0.7605633802816902, 0.7215686274509804)
    // 300°, 75.88652482269505%, 72.35294117647058%

### Shorthand color notation:

    Color("#ABC") // "#AABBCC"
    Color("ABC")  // "#AABBCC"

### Convert a hex color to RGBA:

    var c = new Color('#ABC123', 0.6);
    c.getRGBA(); // rgba(171,193,35,0.6)

### `setValue` and `channels`

    var myColor = new Color;
    myColor.setValue(0xAA7F00);
    myColor.hexTriplet() === "#aa7f00";
    myColor.channels[0] = 0xFF;
    myColor.hexTriplet() === "#ff7f00"; // orange

### Defining a custom color:

    Color.define("rind", [92, 163, 16])
    Color.get("rind").hexTriplet() === "#5ca310"

### Get a random color between green and blue

    Color.random("green", "blue");

### Parsing CSS color values

    red   = Color.parse("rgb(255, 0, 0)");
    green = Color.parse("rgb ,128"); // shorthand
    blue  = Color.parse("hsl(240, 100%, 50%)");
    
    red.hexTriplet()   === "#ff0000";
    green.hexTriplet() === "#008000";
    blue.hexTriplet()  === "#0000ff";

Supported Browsers
------------------

 * Firefox 1+
 * Safari 2+
 * IE 6+
 * Opera 7+
 * Google Chrome 0.1+


Usage
-----

color.js can be used in any ECMAScript environment as it does not make
use of the DOM. color.js is very useful on the server-side and the
client-side.


color.js CSS Module
-------------------

The [color.js CSS module](http://github.com/eligrey/color.js/blob/master/css.color.js)
defines all of the standard CSS colors for use in color.js.


API
---

**Note:** HSL values are in the form of fractions (0 to 1). A hue value of 0.5 is equivalent to a hue of 180&deg;.


### Instantiation

Color objects can be instantiated in any of the following ways:

<pre><code>color = [new ]Color(<strong>color</strong>:int | string, [, <strong>alpha</strong>:float])
color = [new ]Color(<strong>red</strong>:int | string, <strong>green</strong>:int | string, <strong>blue</strong>:int | string [, <strong>alpha</strong>:float | string])
color = Color.rgb(<strong>red</strong>:int, <strong>green</strong>:int, <strong>blue</strong>:int [, <strong>alpha</strong>:float])
color = Color.hsl(<strong>hue</strong>:float, <strong>saturation</strong>:float, <strong>lightness</strong>:float [, <strong>alpha</strong>:float])</code></pre>

<h3>Instance methods and properties</h3>

<dl>
  <dt><code>channels : array</code></dt>
  <dd>
    An array containing a color's red, green, blue,
    and alpha channels in that order.
  </dd>
  
  <dt><code>rgb()</code></dt>
  <dd>
    Returns a CSS rgb() function representing the color.
  </dd>
  
  <dt><code>rgba()</code></dt>
  <dd>
    Returns a CSS rgba() function representing the color.
  </dd>
  
  <dt><code>hsl()</code></dt>
  <dd>
    Returns a CSS hsl() function representing the color.
  </dd>
  
  <dt><code>hsla()</code></dt>
  <dd>
    Returns a CSS hsla() function representing the color.
  </dd>
  
  <dt><code>css()</code></dt>
  <dd>
    If the alpha channel is 1, this returns <code>hexTriplet()</code>.
    Otherwise, this returns <code>rgba()</code>.
  </dd>
  
  <dt><code>getValue()</code> and <code>valueOf()</code></dt>
  <dd>
    Returns an integer representation of the color.
  </dd>
  
  <dt><code>setValue(<strong>value</strong>:int)</code></dt>
  <dd>
    Sets the to <code>value</code>.
  </dd>
  
  <dt><code>hexTriplet()</code></dt>
  <dd>
    Returns the hex triplet (#RRGGBB) representation of the color.
  </dd>
  
  <dt><code>rgbData()</code></dt>
  <dd>
    Returns an array containing the color's red, green, and
    blue channels in that order.
  </dd>
  
  <dt><code>hslData()</code></dt>
  <dd>
    Returns an array containing the color's hue, saturation, and
    lightness channels in that order.
  </dd>
  
  <dt><code>toString()</code></dt>
  <dd>
    Returns <code>this[Color.TO_STRING_METHOD]()</code>.
  </dd>
</dl>

<h3>Constructor methods</h3>

<p>Color names are case-insensitive.</p>

<dl>
  <dt><code>Color.define(<strong>colorName</strong>:string, <strong>RGB</strong>:array | string)</code></dt>
  <dd>
    Saves the specified RGB color under colorName, for later retrieval.
  </dd>
  
  <dt><code>Color.get(<strong>colorName</strong>:string)</code></dt>
  <dd>
    Returns a new color instance instance using the RGB data from a
    previously defined color with the name, <code>colorName</code>.
  </dd>
  
  <dt><code>Color.del(<strong>colorName</strong>:string)</code></dt>
  <dd>
    Deletes a previously defined color with the name of <code>colorName</code>.
  </dd>
  
  <dt><code>Color.clearColors()</code></dt>
  <dd>
    Clears all color definitions.
  </dd>
  
  <dt><code>Color.parse(<strong>cssFunction</strong>:string)</code></dt>
  <dd>
    Returns the color represented by a CSS function (eg. <code>hsl(0, 100%, 50%)</code>)
    or hex triplet. If no color could be parsed, this returns null.
    This function intentionally allows invalid syntax when parsing
    css functions. As long as the first three non-whitespace characters
    (case-insensitive) are "rgb" or "hsl" and the arguments (which are
    all optional and default to zero) are separated by commas, this
    function will be able to parse the CSS function.
  </dd>
  
  <dt><code>Color.random([<strong>rangeStart</strong>:int | string] [, <strong>rangeEnd</strong>:int | string])</code></dt>
  <dd>
    Returns a random color from rangeStart to rangeEnd. If rangeStart is not
    specified, this returns a random color from #000000 to #FFFFFF. rangeStart
    and rangeEnd can also be color names.
  </dd>
  
  <dt><code>Color.rgb(<strong>red</strong>:int, <strong>green</strong>:int, <strong>blue</strong>:int [, <strong>alpha</strong>:float])</code></dt>
  <dd>
    Returns a color constructed from the specified RGB values.
  </dd>
  
  <dt><code>Color.hsl(<strong>hue</strong>:float, <strong>hue</strong>:float, <strong>hue</strong>:float [, <strong>alpha</strong>:float])</code></dt>
  <dd>
    Returns a color constructed from the specified HSL values.
  </dd>
  
  <dt><code>Color.RGBtoHSL(<strong>rgb</strong>:array)</code></dt>
  <dd>
    Returns the array of RGB values converted to HSL values.
  </dd>
  
  <dt><code>Color.HSLtoRGB(<strong>hsl</strong>:array)</code></dt>
  <dd>
    Returns the array of HSL values converted to RGB values.
  </dd>
</dl>

<h3>Configuration properties</h3>
<dl>
  <dt><code>Color.TO_STRING_METHOD : string</code></dt>
  <dd>
    The method name of which to call when a color instance's
    <code>toString()</code> method is called. This defaults to
    <code>hexTriplet</code>.
  </dd>
</dl>


![Tracking image](//in.getclicky.com/212712ns.gif =1x1)
