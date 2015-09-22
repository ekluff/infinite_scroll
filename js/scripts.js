//modifies image list item css height to be equal to width
var autoHeight = function() {
  var lw = $('.imgli').width();
  $('.imgli').css({'height': lw + 'px' });
};

var append = function() {
  var imgsrc = Math.floor(Math.random() * 21 ) + 1;
  var imglitext = '<li class="imgli"><img src="http://www.evanclough.com/test/gallery_images/img-' + imgsrc + '.jpg"></li>';

  $(imglitext).appendTo('.imgul');
  autoHeight();
};

var prepend = function() {
  var imgsrc = Math.floor(Math.random() * 21 ) + 1;
  var imglitext = '<li class="imgli"><img src="http://www.evanclough.com/test/gallery_images/img-' + imgsrc + '.jpg"></li>';

  $(imglitext).prependTo('.imgul');
  autoHeight();
};

var forLoopAppend = function (forLoopAdjustor) {
  var iw = $('.imgul').width();
  var lw = $('.imgli').width();
  var gridwidth = Math.round(iw/lw);

  for (i = 0; i < gridwidth + forLoopAdjustor; i++) {
    append();
  };
};

var forLoopPrepend = function (forLoopAdjustor) {
  var iw = $('.imgul').width();
  var lw = $('.imgli').width();
  var gridwidth = Math.round(iw/lw);

  for (i = 0; i < gridwidth + forLoopAdjustor; i++) {
    prepend();
  };
};

var removeLastExtra = function () {
  var ih = $('.imgul').height();
  var wh = window.innerHeight;
  var lw = $('.imgli').width();

  //removing last imglis one at a time until imgul is shorter than 3x window height
  while (ih >= wh * 3) {
    $('.imgli:last').remove();
    ih = $('.imgul').height();
  };
};

var removeFirstExtra = function () {
  var ih = $('.imgul').height();
  var wh = window.innerHeight;
  var lw = $('.imgli').width();

  //removing first imglis one at a time until imgul is shorter than 3x window height
  while (ih >= wh * 3) {
    $('.imgli:first').remove();
    ih = $('.imgul').height();
  };
};

var addRowsToFill = function () {
  var wh = window.innerHeight;
  var ih = $('.imgul').height();
  var iw = $('.imgul').width();
  var lw = $('.imgli').width();
  var gridwidth = Math.round(iw/lw);

  while (ih<=wh) {
    forLoopAppend(0);
    ih+=lw;
  };
};

var imgliFillPage = function () {
  var wh = window.innerHeight;
  var ih = $('.imgul').height();
  var iw = $('.imgul').width();
  var lw = $('.imgli').width();
  var gridwidth = Math.round(iw/lw);

  addRowsToFill();

  forLoopAppend(-1);
};

var addToFillResize = function () {
  var wh = window.innerHeight;
  var ih = $('.imgul').height();
  var iw = $('.imgul').width();
  var lw = $('.imgli').width();
  var gridwidth = Math.round(iw/lw);
  var lCount = $('.imgli').length;
  var liRem = lCount % gridwidth;

  addRowsToFill();

  forLoopAppend(liRem);
};

var main = function() {

  //shows menu 400ms after cursor moved to top
  $('.navtrigger').mouseenter(function(){
    menuShowDelay=setTimeout(function(){
      $('.nav').animate({
        top: "0px"
      }, 475);
    }, 400);
  });

  //cancels menu show if cursor leaves top before 400ms
  $('.navtrigger').mouseleave(function(){
    clearTimeout(menuShowDelay);
  });

  //Hides menu 400ms after cursor leaves menu
  $('.nav').mouseleave(function(){
    menuHideDelay=setTimeout(function(){
      $('.nav').animate({
        top: "-50px"
      }, 475);
    }, 400);
  });

  //cancels menu hide if cursor leaves menu for less than 400ms
  $('.nav').mouseenter(function(){
    clearTimeout(menuHideDelay);
  });

  //loads and sizes first imgli
  append();

  //fills and sizes initial page
  imgliFillPage();

  //sets window 1px from top so you can scroll up and trigger top infinite scroll
  $(window).scrollTop(1);

  //things to do when window is resized
  $(window).resize(function() {

    //fills any blank space created by resize
    addToFillResize();

    //removes imglis lying below page height
    removeLastExtra();
  });

  window.onscroll=function() {
    var lw = $('.imgli').width();

    if ( $('.imgul').height() - window.innerHeight - $(window).scrollTop() === 0 ) {
      forLoopAppend ( 0 );
      window.scrollBy(0, -lw);
      removeFirstExtra();
    };

    if ( $(window).scrollTop() === 0 ) {
      forLoopPrepend ( 0 );
      window.scrollBy(0, lw);
      removeLastExtra();
    };
  };


  // functions to retrieve image array from folder with PHP file. PHP file reads files in its folder and returns randomized array of file names.
  function reqListener () {
    console.log(this.responseText);
  };

  var oReq = new XMLHttpRequest(); //New request object
  oReq.onload = function() {
    //This is where you handle what to do with the response.
    //The actual data is found on this.responseText
    alert(this.responseText); //Will alert: 42
  };
  oReq.open("get", "images/imgarr.php", true);
  //                               ^ Don't block the rest of the execution.
  //                                 Don't wait until the request finishes to
  //                                 continue.
  oReq.send();
};

$(document).ready(main);
