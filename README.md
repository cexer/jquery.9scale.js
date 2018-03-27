
### Motivation:

I was supprised when I relized that there is no way to do 9-slice scaling with sprite image in pure CSS. There is `border-image` directive in CSS which can do 9-slice scaling with image, but it can't use sprite image as image source. There is also `background` directive which can use sprite image as image source, but it can't do 9-slice scaling. I searched the whole internet and found nothing, so I have to do this on my own, despite that I'm not even a web programmer.

### Syntax: 

The simple way, without CSS selector:

```javascript
jQueryElement.borderImageSprite(imageUrl, {
	clip: clip argument,
	slice: slice argument,
	fill : fill argument 
});
```

The complicated but more flexiable way, with CSS selector:

```javascript
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

```javascript
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


```javascript
clip: [ 
	x, 
	y, 
	width, 
	height 
]
```

All arguments mean the same as above.


```javascript
clip: x
```

All arguments mean the same as above.


** The `slice` Argument: ** 

The `slice` argument specifies how to slice the image clipped from the sprite image, just like the 
`border-image-slice` directive, but only accepts numberic values, this argument can be in one of 
following forms:

```javascript
slice: {
	top : top argument,
	right : right argument,
	left : left argument,
	bottom : bottom argument
}
```

```javascript
slice: [
	top, 
	right, 
	left, 
	bottom 
]
```

```javascript
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

```javascript
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
```

### Contact Me

Please feel free contact us, if you have any suggestion or new idea.

QQ: 41086722
Email: cexer@qq.com