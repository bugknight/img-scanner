define("http://wres.mangocity.com/js/lib/img-scanner/1.0/dis/img-scanner.js",function(require, exports, module) {//"http://wres.mangocity.com/js/lib/img-sanner/1.0/dis/img-scanner.js",
 require("../css/img-scanner.css");
var ImgScan = function( options ){
	   var options = $.extend( {
				dateList : [],
				skin : 1,
				speed:1000,
				canvasH : 230,
				canvasW: 730,
				width: 160,//每块的宽度
				spacing : 5,//块与块的间距
				showNum : 4,//每一屏显示几个
				fixedNum : 2//始终在第几个位置显示当前选中的块
			 }, options || {} ),
	    index = 0 ,tag = true, timer, dre = "+";
		
	   	this.block = $( "<div class=\"imgScaner  imgScaner_skin_"+ options.skin +"\" >"
					+"		  <div class=\"upPart\">"
					+"			   <div class=\"imgPackage\" style=\"width:"+ options.canvasW +"px;height:"+ options.canvasH +"px;\">"
					+"					 <a class=\"imgBlock\"></a>"
					+"			   </div>"
					+"		  </div>"
					+"		  <div class=\"downPart\">"
					+"			  <div class=\"btnLeft leftNo\"></div>"
					+"			  <div class=\"glass\">"
					+"					<div class=\"adjust\">"
					+"                       <div class=\"preImgCell\"></div>"
					+"                  </div>"
					+"			  </div>"
					+"			  <div class=\"btnRight rightNo\"></div>"
					+"		  </div>"     
					+"	</div>" );
	    this.imgPackage = $( ".imgPackage", this.block );
		this.imgBlock = $( ".imgBlock", this.block );
		this.btnLeft = $( ".btnLeft", this.block );
		this.btnRight = $( ".btnRight", this.block );
		this.glass = $( ".glass", this.block );
		this.adjust = $( ".adjust", this.block );
		this.cell = $( ".preImgCell", this.block );
		this.list = null;
		this.referLine = options.fixedNum * (options.width + options.spacing);
		
		this.setIndex = function( value ){
			   index = parseInt(value);
			}
		this.init = function(){
			  var i = 0, str = "";
			  for( ; i < options.dateList.length; i++){
				   str+=" <a  href=\"javascript:void(0)\">"
                        +"       <img src=\""+ options.dateList[ i ].smallSrc +"\" alt = \" "+ options.dateList[ i ].smallInfo +" \" />"
                        +"</a>";  
				  }
			  // this.cell.html( str ).width( ( options.width + options.spacing ) * options.dateList.length + 10 );
			   this.cell.html( str );
			   this.adjust.width( ( options.width + options.spacing ) * options.dateList.length - options.spacing);
			   this.glass.width( ( options.width + options.spacing ) * options.showNum - options.spacing ).scrollLeft( 0 );
			   this.list = this.cell.children();
			   this.freshInfo();
			   this.freshBtn();
			  
			};
		this.freshInfo = function( num ){
		   //  try{
			     var num = num || index;
			     //this.imgBlock.html( "<img src=\""+ options.dateList[ num ].bigSrc +"\" alt = \" "+ options.dateList[ num ].bigInfo +" \" />" );
				 this.handleImg( num );
			     this.list.filter( ".on" ).removeClass( "on" ).end().eq( index ).addClass( "on" );
			// }catch( er ){}  
			};
	    this.handleImg = function( num ){
		    var img ;
			    img = new Image();
				img.alt = options.dateList[ num ].bigInfo;
				img.src = options.dateList[ num ].bigSrc;
				img.style.display = "none";
				this.imgBlock.html( img ).attr("href", options.dateList[ num ].aHref );
				if( img.complete ){
				     this.imgPackage.removeClass("preLoading");
					 $( img ).fadeIn( 600 );
					 //this.imgPackage.removeClass( "preLoading" );
					 
				}else{
				   this.imgPackage.addClass("preLoading");
				   (function( self ){
				         img.onload = function(){
							// self.imgBlock.html( this );
							 self.imgPackage.removeClass("preLoading");
							$( img ).fadeIn( 600 );
						 };
						 img.onerror = function(){
						      self.imgPackage.removeClass("preLoading");
							  alert( "此图片加载错误" );
						 } 
				   })( this );
				  
				}
		};
		this.freshBtn = function(){
				
			if( this.glass.scrollLeft() > 0)
			    this.btnLeft.removeClass( "leftNo" );
			else
			     this.btnLeft.addClass( "leftNo" );
				 
			if( this.glass.scrollLeft() < ( ( options.width + options.spacing ) * (options.dateList.length - options.showNum)) )
			    this.btnRight.removeClass( "rightNo" );
			else
			     this.btnRight.addClass( "rightNo" );
				
		};
		this.fixed = function( num ){ //this.adjust.scrollLeft() + distance
		     var num = num || ( index + 1 ), distance =  num * ( options.width + options.spacing ) - ( this.glass.scrollLeft() + this.referLine ), temp = this.glass.scrollLeft() + distance; ( function( obj ){
			       obj.glass.animate( { scrollLeft : temp }, 300, "swing", function(){
					obj.freshBtn();																				  
			     });
			 })( this )
			 
			 
		};
		
		
		this.init();
		//绑定事件；
		( function( obj ){
		   // alert( obj );
		     obj.list.click(function(){
		     index = $( this ).prevAll().length;
			 obj.freshInfo();
			 obj.fixed();
			 
		   });
		   

			 obj.btnLeft.click( function(){
			    if( !tag ) return;
				   tag = false;
			     obj.glass.animate({scrollLeft:"-="+(( options.width + options.spacing ) * options.showNum )}, 800, "swing",function(){
				     obj.freshBtn();
					 tag = true;
				 });
			 });
		     obj.btnRight.click( function(){
			     if( !tag ) return;
				     tag = false;
			     obj.glass.animate({scrollLeft:"+="+(( options.width + options.spacing ) * options.showNum )}, 800, "swing",function(){
				     obj.freshBtn();
					 tag = true;
				 });
			 });
			 obj.block.hover(function(){
			     clearInterval( timer );
			 },function(){
			      timer = setInterval(function(){
				 if( dre == "+" ){
					if( ++index >= options.dateList.length - 1){
					    index = options.dateList.length - 2;
						dre = "-";
					}    
				 }else{
					 if( --index <= 0){ 
					    index = 1;
						dre = "+";
					 }
				 }
				
					obj.freshInfo();
					obj.fixed();
				}, options.speed );
			 }).trigger("mouseout");
			 
			
		
		})( this );
		
		//ie缓存图片
		if( $.browser.msie && $.browser.version < 7 )
		 document.execCommand("BackgroundImageCache", false, true);
		
		
		 
	   
}
module.exports = ImgScan;
})