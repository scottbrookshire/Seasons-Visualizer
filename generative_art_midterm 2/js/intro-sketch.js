var titleScreen;
var myDiv1;
var myDiv2;

function setup() {
	myCanvas = createCanvas(windowWidth, windowHeight);
  titleScreen = createDiv('<h1>seasons</h1><h2>A browser enabled music visualizer </h2><a href="seasons.html">fall</a>');
  myDiv1 = createDiv('this is div 1');
  myDiv2 = createDiv('this is div 2');

  // Here we call methods of each element to set the position and class.
  // Let's give the first two canvases class donkey, and the third class yogurt.
  titleScreen.position(0, 0);
  titleScreen.class('titleScreen');
}

function draw(){
	background(63, 154, 130);
}

// On key press, hide all elements with class donkey.
function keyPressed() {
  // getElements() returns an array of elements with class donkey. 
  // If none are found, it returns an empty array [].
  var test = getElement('test');
  // We can then iterate through the array and hide all the elements.
  for (var i=0; i<test.length; i++) {
    test[i].hide();
  }
}