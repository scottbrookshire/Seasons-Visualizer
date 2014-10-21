//WNM 498 Generative Art & Creative Code
//Ryan and Scotts super awesome midterm project

var two;
var input;
var analyzer;
var fft;
var group;
var circle =[];
var moving = false;

function setup(){

	//p5.js call to not load canvas
	noCanvas();

	//two constructor sets the drawing area to the browser window
	two = new Two({
		fullscreen:true,
	// type: Two.Types.svg || Two.Types.canvas || Two.Types.webgl
	});
	two.appendTo(document.body); //append the two instance to the body of the docement

	//override the default width and height with the size of Two.js renderer size
	width = two.width;
	height = two.height;

	//Bind the "resize" event to the two instance when the window is resized 
	//.bind takes a string as its first parameter indicating what event to listen 
	//to and a function as its second argument delineating what to do when the event 
	//described in the first parameter happens.
	two.bind("resize", function(){
		width = two.width;
		height = two.height;
		two.scene.translation.set( two.width / 2, two.height / 2);
		two.update();
	});

	//create an audio input
	mic = new p5.AudioIn();

	//start the audio input
	mic.start();

	//creates a new fast fourier transformation that isolates individual audio
	//frequencies within a waveform. new p5.FFT([smoothing],[bins])
	fft = new p5.FFT([.8],[16]);

	//set the input for the frequency analyze to the microphone
	fft.setInput(mic);

	// Create a shape group to that we will add each path to
    group = two.makeGroup();

    //draw a circle
    circle = two.makeCircle(0, 0, 25);
    circle.fill = 'ff8000';
    group.add(circle);

   

    two.update();

}

function draw(){

	
	//get the overall volume(between 0 and 1.0)
	var vol = mic.getLevel();

	//map the volume to a larger more usable number
	var m = map(vol, 0, 1, 0, 100);

	//analyze the spectum with a bin of 16
	var spectrum = fft.analyze();

	//draws a circle that scales with audio level 
	var numCircle = 15;
	
	for(i = 0; i < numCircle; i++ ){
		circle.scale += map( vol / 10, -1, 1, -1, 1 );
	}
	
	
	

	//update our instance of two and all of it's contents
	two.update();

	//print(spectrum[]);
	

}
