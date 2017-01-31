var boxcutter = require('./');

b = new boxcutter({
    fullscreen : true, //take a fullscreen screenshot
    X1:null, // do a screenshot between X1/Y1 and X2/Y2
    Y1:null,
    X2:null,
    Y2:null,
    fastMode:null, // fastmode don't support any options, is fullscreen and in BMP, but faster
    outputFormat:null
});


b.shot(function(err, file){
    try{
        console.log(b);
        console.log(file);
    }
    catch(e){
        console.log(e);
    }
});