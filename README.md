color.js
========

*Version 0.1*

Create and manipulate [RGBA](http://en.wikipedia.org/wiki/RGBA_color_space) colors with ease.

Examples
--------

### Making violet (#EE82EE):

    Color(0xEE82EE)         == "#EE82EE"
    Color("#EE82EE")        == "#EE82EE"
    Color("EE82EE")         == "#EE82EE"
    Color(0xEE, 0x82, 0xEE) == "#EE82EE"
    Color("EE", "82", "EE") == "#EE82EE"
    Color(238, 130, 238)    == "#EE82EE"

### Shorthand color notation:

    Color("#ABC") == "#AABBCC"
    Color("ABC")  == "#AABBCC"

### Convert a hex color to RGBA:

    var c = new Color('#ABC123', 0.6);
    c.getRGBA(); // rgba(171,193,35,0.6)

### `setValue` and `channels`

    var myColor = new Color;
    myColor.setValue(0xAA7F00);
    myColor == "#AA7F00"
    myColor.channels.red = 0xFF;
    myColor == "#FF7F00" // orange

### Defining a custom color:

    Color.define("rind", [92, 163, 16])
    Color.get("rind") == "#5CA310"


Supported Browsers
------------------

 * Firefox 1+
 * Safari 2+
 * IE 6+ (Color.get can't compute CSS color values)
 * Opera 8+
 * Google Chrome 0.1+

API
---

### Instantiation

color.js is flexible enough to allow you to instantiate color objects however you please:

<pre><code>color = [new ]Color(<strong>color</strong>:int | string, [, <strong>alpha</strong>:float])
color = [new ]Color(<strong>red</strong>:int | string, <strong>green</strong>:int | string, <strong>blue</strong>:int | string [, <strong>alpha</strong>:float])</code></pre>

<h3>Instance methods and properties</h3>

<dl>
  <dt><code>channels</code></dt>
  <dd>
    An object containing red, green, blue, and alpha properties which
    represent the corresponding channels.
  </dd>
  
  <dt><code>getRGB()</code></dt>
  <dd>
    Returns a CSS rgb() function representing the color.
  </dd>
  
  <dt><code>getRGBA()</code></dt>
  <dd>
    Return a CSS rgba() function representing the color.
  </dd>
  
  <dt><code>getValue()</code></dt>
  <dd>
    Returns an integer representation of the color.
  </dd>
  
  <dt><code>setValue(<strong>value</strong>:int)</code></dt>
  <dd>
    Set the current color based on an integer value.
  </dd>
  
  <dt><code>toString([<strong>noHash</strong>:bool])</code> and <code>valueOf([<strong>noHash</strong>:bool])</code></dt>
  <dd>
    Returns the string representation of the color excluding the alpha channel.
    If noHash is true, the hash (#) is not included.
  </dd>
</dl>

<h3>Class methods</h3>

<dl>
  <dt><code>Color.define(<strong>colorName</strong>:string, <strong>RGB</strong>:array)</code></dt>
  <dd>
    Saves the specified RGB color under colorName, for later retrieval.
  </dd>
  
  <dt><code>Color.get(<strong>colorName</strong>:string)</code></dt>
  <dd>
    Will attempt to return any predefined colors before falling back and retrieving the computed CSS color where available (read: not IE).
  </dd>
  
  <dt><code>Color.random()</code></dt>
  <dd>
    Returns a random Color instance from #000000 to #FFFFFF.
  </dd>
</dl>

