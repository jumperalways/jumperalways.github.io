var blowupFlag=false;
var overlayDone=false;
var clicking=false;
var x=500;
var y=350; // initial position
var posStr = x*(-1)+"px "+y*(-1)+"px";
var inCanvas=false;

$blowup = $("#blowupImg");
$("<div>",{id:"overlay"}).css("background-color","rgba(0,0,0,0.6)")
  .css("width","100%")
  .css("height","100%")
  .css("position","fixed")
  //fixed:relative to the browser window
  // so the overlay applies to the entire browser
  .css("top","0")
  .css("left","0")
  // above 2 lines NECESSARY to anchor the overlay
  .css("z-index","100")
  .appendTo("body");
$("#overlay").hide();

$("<div>",{id:"canvas_section"}).css("margin","auto")
  .css("display","block")
  // above 2 lines make it CENTER
  .css("position","sticky")
  // above line make it always there regardless of scrolling
  .css("background-image","url(miserereMapSigned.png)")
  .css("background-position",posStr)
  // moves the picture in the background
  // x y coords of top-left-corner *(-1)
  .css("background-size","1558px 1194px")
  // specifies how large the bg img img is
  // so use this to control the factor of blow up
  .css("width","350px")
  .css("height","350px")
  // above 2 lines control the showing 'canvas' size
  .appendTo("#overlay");
$("#canvas_section").hide();
//console.log($w);

$blowup.on("click",function(){
  if (blowupFlag===false) {
    blowupFlag=!blowupFlag;
      $("#overlay").show();
      $("#canvas_section").show();
      //console.log("overlay created");

      //$("body").text("clicked"); //debug
      /* Method 1: clip
      // shortcoming: position has to be absolute
      $blowup.css("position","absolute")
        .css("clip","rect(0px,60px,200px,0px)");
        // clip shape(top,right,bottom,left)
      */
  }
  $(this).removeClass();
}); // end of click function/event

$("#canvas_section").mouseover(function(){
  onCanvas=true;
  //console.log(onCanvas); //debug
  $(this).removeClass();
});
$("#canvas_section").mouseleave(function(){
  onCanvas=false;
  //console.log(onCanvas); //debug
  $(this).removeClass();
});

$("#overlay").on("click",function(e){
  if (blowupFlag){
    $w = $(document).width();
    //if click is outside the blowup image
    //if (e.pageX<($w-350)/2 || e.pageX>($w/2+350/2) || e.offsetY>350)
    if (!onCanvas){
        //in this case pageX = offsetX
        //but offsetY and pageY are wildly different
        //console.log("disable overlay");
        //console.log($w);
        //console.log("pageX pageY offsetX offsetY");
        //console.log(e.pageX,e.pageY,e.offsetX,e.offsetY);
        //toggle flag
        blowupFlag=!blowupFlag;
        $("#overlay").hide();
    }
  }
  $(this).removeClass();
});

$("#canvas_section").mousedown(function(){
  //console.log("click");
  clicking=true;
});

$(document).mouseup(function(){
  //console.log("click released");
  clicking=false;
});

$("#canvas_section").mousemove(function(ev){
  if (clicking===false) {
    return;
  } else {
    $w = $(document).width();
    //ev.offsetY<350&&ev.pageX>($w-350)/2&&ev.pageX<($w+350)/2
    if (onCanvas){
      console.log("holding down");
      console.log(ev.pageX,ev.offsetY);
    }
  }
  $(this).removeClass();
});
