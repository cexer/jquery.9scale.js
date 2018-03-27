/*!
 * jQuery 9-slice Scaling Plugin v1.0
 * https://github.com/cexer/jquery.9scale.js
 *
 * Copyright (c) 2018 cexer
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2018-08-27 10:49
 * QQ: 41086722
 * Email:cexer@qq.com
*/

/*

### Syntax: 

The simple way, without CSS selector:

```
jQueryElement.borderImageSprite(imageUrl, {
	clip: clip argument,
	slice: slice argument,
	fill : fill argument 
});
```

The complicated but more flexiable way, with CSS selector:

```
jQueryElement.borderImageSprite(imageUrl, {
	"CSS selector 1" : {
		clip: clip argument,
		slice: slice argument,
		fill : fill argument 
	},
	"CSS selector 2" : {
		clip: clip argument,
		slice: slice argument,
		fill : fill argument 
	},
	...
});
```

In this way, different backgrounds can be applied to different states of an element, for 
example, creating a three-states button.

The placeholder "#ID" can be used in selectors to represent the ID of element, it will be 
replaced by the real ID. If element dosen't has an ID, it'll be assigned one.


** The `clip` Argument: **

The `clip` argument defines the rectangle sub area in the sprite image, which will act as 
the "reall" border image source, can be in one of following forms:

```
clip: {
	x : x argument,
	y : y argument,
	width : width argument,
	height : height argument
}
```

The `x` defines the X coordinate clipping will begins at , if this field not exist, 0 will be used.
The `y` defines the Y coordinate clipping will begins at , if this field not exist, 0 will be used.
The `width` defines the clipping width, if this field not exists, imageWidth - x will be used.
The `height` defines the clipping height, if this field not exists, imageHeight - y will be used.


```
clip: [ 
	x, 
	y, 
	width, 
	height 
]
```

All arguments mean the same as above.


```
clip: x
```

All arguments mean the same as above.


** The `slice` Argument: ** 

The `slice` argument specifies how to slice the image clipped from the sprite image, just like the 
`border-image-slice` directive, but only accepts numberic values, this argument can be in one of 
following forms:

```
slice: {
	top : top argument,
	right : right argument,
	left : left argument,
	bottom : bottom argument
}
```

```
slice: [
	top, 
	right, 
	left, 
	bottom 
]
```

```
slice: top
```

All arguments mean the same as arguments of `border-image-slice` directive.


** The `fill` Argument: ** 

The `fill` argument specifices whether fill the centeral area or leave it blank, acts the same of the 
`fill` field of `border-image-slice` directive.


### Examples:

** Apply 9-slice scaling background image to an element: **

```javascript
$("#button").borderImageSprite("round_button.png", {
	clip: { x:185, y:0, width:93 },
	slice: { top:2, right:2, bottom:2, left:2 }
	fill : true
});
```

The above can be simplified as follow:

```javascript
$("#button").borderImageSprite("round_button.png", {
	clip: [185, 0, 93]
	slice: 2
	fill : true
});
```

** Apply 9-sclie scaling background to different states of an element: ** 

$("#button").borderImageSprite("round_button.png", {
	"#ID, #ID:link, #ID:visited" : {
		clip: [0, 0, 93],
		slice: 2,
		fill: true
	},
	"#ID:hover" : {
		clip: [93, 0, 93],
		slice: 2,
		fill: true
	},
	"#ID:active" : {
		clip: [186, 0, 93],
		slice: 2,
		fill : true
	}
});
 */

 
function drawImage9Scale(image, options, context, x, y, width, height) {

	function _validateArgs(image, options) {
		if (!options) options = {};

		//clip
		if (!options.clip) options.clip = {};
		if ($.isNumeric(options.clip)){
			options.clip = { x: options.clip };
		}
		else if ($.isArray(options.clip)){
			var clipObj = {};
			if (options.clip.length > 0)
				clipObj.x = options.clip[0];
			if (options.clip.length > 1)
				clipObj.y = options.clip[1];
			if (options.clip.length > 2)
				clipObj.width = options.clip[2];
			if (options.clip.length > 3)
				clipObj.height = options.clip[3];
			options.clip = clipObj;
		}

		//slice
		if (!options.slice) options.slice = {};
		if ($.isNumeric(options.slice)){
			options.slice = { top: options.slice };
		}
		else if ($.isArray(options.slice)){
			var clipObj = {};
			if (options.clip.length > 0)
				clipObj.top = options.clip[0];
			if (options.clip.length > 1)
				clipObj.right = options.clip[1];
			if (options.clip.length > 2)
				clipObj.bottom = options.clip[2];
			if (options.clip.length > 3)
				clipObj.left = options.clip[3];
		}

		if (!options.clip.x) options.clip.x = 0;
		if (!options.clip.y) options.clip.y = 0;
		if (!options.clip.width) options.clip.width = image.width;
		if (!options.clip.height) options.clip.height = image.height;

		if (!options.slice.bottom) options.slice.bottom = options.slice.top;
		if (!options.slice.top) options.slice.top = options.slice.bottom;
		if (!options.slice.left) options.slice.left = options.slice.right;
		if (!options.slice.right) options.slice.right = options.slice.left;

		if (!options.slice.top) options.slice.top = options.slice.left;
		if (!options.slice.bottom) options.slice.bottom = options.slice.left;
		if (!options.slice.left) options.slice.left = options.slice.bottom;
		if (!options.slice.right) options.slice.right = options.slice.bottom;
	}

	_validateArgs(image, options);

	var leftWidth = options.slice.left;
	var rightWidth = options.slice.right;
	var topHeight = options.slice.top;
	var bottomHeight = options.slice.bottom;

	var imageLeft = options.clip.x;
	var imageRight = options.clip.x + options.clip.width - rightWidth;
	var imageTop = options.clip.y;
	var imageBottom = options.clip.y + options.clip.height - bottomHeight;

	var imageCenterX = imageLeft + leftWidth;
	var imageCenterY = imageTop + topHeight;
	var imageCenterWidth = options.clip.width - (leftWidth + rightWidth);
	var imageCenterHeight = options.clip.height - (topHeight + bottomHeight);

	var destLeft = x;
	var destRight = width - rightWidth;
	var destTop = y;
	var destBottom = height - bottomHeight;

	var destCenterX = destLeft + leftWidth;
	var destCenterY = destTop + topHeight;
	var destCenterWidth = width - leftWidth - rightWidth;
	var destCenterHeight = height - topHeight - bottomHeight;

	if (leftWidth > 0) {
		if (topHeight > 0) {
			context.drawImage(image, imageLeft, imageTop, leftWidth, topHeight, destLeft, destTop, leftWidth, topHeight);
		}
		if (imageCenterHeight > 0) {
			context.drawImage(image, imageLeft, imageCenterY, leftWidth, imageCenterHeight, destLeft, destCenterY, leftWidth, destCenterHeight);
		}
		if (bottomHeight > 0) {
			context.drawImage(image, imageLeft, imageBottom, leftWidth, bottomHeight, destLeft, destBottom, leftWidth, bottomHeight);
		}
	}
	if (imageCenterWidth > 0) {
		if (topHeight > 0) {
			context.drawImage(image, imageCenterX, imageTop, imageCenterWidth, topHeight, destCenterX, destTop, destCenterWidth, topHeight);
		}
		if (imageCenterHeight > 0) {
			context.drawImage(image, imageCenterX, imageCenterY, imageCenterWidth, imageCenterHeight, destCenterX, destCenterY, destCenterWidth, destCenterHeight);
		}
		if (bottomHeight > 0) {
			context.drawImage(image, imageCenterX, imageBottom, imageCenterWidth, bottomHeight, destCenterX, destBottom, destCenterWidth, bottomHeight);
		}
	}
	if (rightWidth > 0) {
		if (topHeight > 0) {
			context.drawImage(image, imageRight, imageTop, rightWidth, topHeight, destRight, destTop, rightWidth, topHeight);
		}
		if (imageCenterHeight > 0) {
			context.drawImage(image, imageRight, imageCenterY, rightWidth, imageCenterHeight, destRight, destCenterY, rightWidth, destCenterHeight);
		}
		if (bottomHeight > 0) {
			context.drawImage(image, imageRight, imageBottom, rightWidth, bottomHeight, destRight, destBottom, rightWidth, bottomHeight);
		}
	}
}
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

$.fn.borderImageSprite = function(src, opts){
	var self = $(this);
	if (!self.attr('id'))
		self.attr('id', uuidv4());
	var selfId = self.attr('id');

	var width = 0;
	var height = 0;
	var source = null;

	var canvasId = sprintf("%s-bkgnd-canvas", selfId);
	var canvas = $("#" + canvasId).get(0);
	if (!canvas) {
		var canvasHTML = sprintf('<canvas id="%s" style="display:none"></canvas>', canvasId);
		self.after(canvasHTML);
		canvas = $("#" + canvasId).get(0);
	}

	var styleId = sprintf("%s-bkgnd-style", selfId);
	var style = $("#" + styleId).get(0);
	if (!style){
		var styleHtml = sprintf('<style id="%s" type="text/css"></style>', styleId);
		self.after(styleHtml);
		style = $("#" + styleId).get(0);
	}

	var image = new Image();
	image.setAttribute("crossOrigin",'anonymous');

	function applyBorderImageCSS() {
		var newWidth = self.outerWidth();
		var newHeight = self.outerHeight();
		var newSource = src;

		if (width == newWidth && height == newHeight && source == newSource)
			return;

		width = newWidth;
		height = newHeight;
		canvas.width = width;
		canvas.height = height;

		function getBorderImageCSS(selector, opts, url) {
			selector = selector.replace(/#ID/g, "#" + selfId);
			return sprintf("%s { border-image: %s %d %d %d %d %s; }\n ", selector, url, 
				opts.slice.top, 
				opts.slice.right, 
				opts.slice.bottom, 
				opts.slice.left, 
				opts.fill?"fill":"");
		}

		function applyCSSForSelector(selector, opts){
			drawImage9Scale(image, opts, canvas.getContext("2d"), 0, 0, width, height);
			var base64Url = "url(" + canvas.toDataURL("image/png", 1) + ")";
			style.innerHTML += getBorderImageCSS(selector, opts, base64Url);
		}

		if (opts.clip || opts.slice) {
			var selector = "#" + selfId;
			applyCSSForSelector(selector, opts);
		}
		else {
			for (var selector in opts) {
				applyCSSForSelector(selector, opts[selector]);
			}
		}
	}

	image.onload = function(){
		applyBorderImageCSS();
	}

	image.src = src;
};


