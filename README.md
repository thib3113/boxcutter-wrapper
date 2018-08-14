# boxcutter

[![Greenkeeper badge](https://badges.greenkeeper.io/thib3113/boxcutter-wrapper.svg)](https://greenkeeper.io/)

BoxCutter is a windows screenshot tools write in C++ https://github.com/mdrasmus/boxcutter

This tools is a wrapper in node.JS

## How To Use ##

    var boxcutter = require('boxcutter-wrapper');

	boxcutter = new boxcutter({
    fullscreen : true, //take a fullscreen screenshot
    X1:null, // do a screenshot between X1/Y1 and X2/Y2
    Y1:null,
    X2:null,
    Y2:null,
    fastMode:null, // fastmode don't support any options, is fullscreen and in BMP, but faster
    outputFormat:null
	});


	boxcutter.shot(function(err, file){
    try{
        console.log(b);
        console.log(file);
    }
    catch(e){
        console.log(e);
    }
	});
## Parameters ##
**X1/X2/Y1/Y2** : The coords of the rectangle for the screenshot

**fullscreen** : take a fullscreen screenshot (coords have priority)

**outputFormat** : select the outputFormat of the image . PNG or BMP

**fastMode** : Skip configuration, take a fast screenshot in BMP
