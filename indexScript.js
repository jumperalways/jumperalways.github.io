var blowupFlag=false;
var overlayDone=false;
var clicking=false;
var x=500;
var y=350; // initial position
var posStr = x*(-1)+"px "+y*(-1)+"px";
var inCanvas=false;
var xPrev;
var yPrev;
var xCurr;
var yCurr;

$blowup = $("#blowupImg");
// Creating an OVERLAY that is shaded.
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

// creating a CANVAS_SECTION that shows the blownup image ON OVERLAY
$("<div>",{id:"canvas_section"})
  .css("margin-left","auto")
  .css("margin-right","auto")
  .css("display","block")
  // above 2 lines make it CENTER
  .css("position","sticky")
  // above line make it always there regardless of scrolling
  .css("background-image","url(miserereMapSigned.png)")
  .css("background-position",posStr)
  // Above line specifies which section of orig image to show
  // moves the picture in the background
  // x y coords of top-left-corner *(-1)
  .css("background-size","1558px 1194px")
  // specifies how large the bg img is
  // so use this to control the factor of blow up
  // orig img size is 3116x2388, 1558x1194 is half the orig size
  .css("width","400px")
  .css("height","400px")
  // above 2 lines control the showing 'canvas' size
  .css("top","50px")
  .appendTo("#overlay");
$("#canvas_section").hide();
//console.log($w);

// click on the image
$blowup.on("click",function(){
  if (blowupFlag===false) {
    blowupFlag=!blowupFlag; // if the blownup is not open, OPEN it
    posStr = x*(-1)+"px "+y*(-1)+"px";
    $("#canvas_section").css("background-position",posStr);
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

// click on the overlay to CLOSE blownup image
$("#overlay").on("click",function(e){
  if (blowupFlag){
    $w = $(document).width();
    //if click is outside the blowup image
    //if (e.pageX<($w-350)/2 || e.pageX>($w/2+350/2) || e.offsetY>350)
    if (!onCanvas){
        $("#overlay").hide();
        x=500;
        y=350; // return to original location (center of img)
        blowupFlag=!blowupFlag;
    }
  }
  $(this).removeClass();
});

$("#canvas_section").mousedown(function(e){
  //console.log("click");
  if (blowupFlag){
    clicking=true;
    xPrev = e.pageX;
    yPrev = e.pageY;
  }
  $(this).removeClass();
});

$(document).mouseup(function(e){
  //console.log("click released");
  if (blowupFlag) {
    clicking=false;
    xCurr = e.pageX;
    yCurr = e.pageY;
    dx = xPrev- xCurr;
    dy = yPrev- yCurr;
    console.log(dx);
    console.log(dy);
    xPrev = xCurr;
    yPrev = yCurr;
    x=x+dx;
    y=y+dy;
    // boundary conditions
    if (x<0) {
      x=0;
    }
    if (y<0) {
      y=0;
    }
    if (x>(1558-400)){
      x=1558-400;
    }
    if (y>(1194-400)){
      y=1194-400;
    }
    posStr = x*(-1)+"px "+y*(-1)+"px";
    $("#canvas_section").css("background-position",posStr);
    //$("#canvas_section").hide();
    //$("#canvas_section").show(); // these two lines unnecessary
  }
  $(this).removeClass();
});
/*
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
*/
