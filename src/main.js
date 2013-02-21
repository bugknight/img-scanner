define(function(require, exports, module) {
     var ImgScan =  require("./img-scanner.js");
	    
	  var temp = new ImgScan({ dateList: dateList, fixedNum: 2, speed:4000});
  $( "#yyp" ).html( temp.block );
   temp.glass.scrollLeft(0);
});