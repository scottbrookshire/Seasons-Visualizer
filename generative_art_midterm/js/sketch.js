//WNM 498 Generative Art & Creative Code
//Ryan and Scotts super awesome midterm project

var numColors = 5;
var scenes;
var input;
var fft;
var theta;
var agent;
var colors = [	
	[	//Spring
		[239, 128, 67], //deep orange
		[237, 154, 98], //muted orange
		[104, 214, 147], //light green
		[63, 154, 130], //dark green
		[160, 215, 226] //light blue
	],
	[	//Summer
		[ 196, 87, 87], //red
		[ 249, 115, 115], //red orange
		[ 255, 153, 102], //orange
		[ 255, 204, 102], // yellow
		[ 255, 255, 153]  //light yellow
	],
	[	//Fall
		[70, 67, 81], //dark
		[194, 105, 98], //red
		[215, 129, 136], //salmon
		[171, 117, 136], //purp
		[235, 173, 153] //teal
	],
	[	//Winter
		[ 34, 72, 96], //dark blue
		[ 66, 107, 131], //navy blue
		[ 55, 134, 153], //middle blue
		[ 168, 202, 218], //light blue
		[ 160, 215, 226]  //lighter blue
	]  	 
];

var s1colors;
var s2colors;
var s3colors;
var s4colors;


function setup(){
	//Create the canvas at window height and width
	myCanvas = createCanvas(windowWidth, windowHeight);
	
	//create an audio input
	mic = new p5.AudioIn();
	
	//start the audio input
	mic.start();


	s1colors = colors[0][int(random(0,4))];
	s2colors = colors[0][int(random(0,4))];
	s3colors = colors[0][int(random(0,4))];
	s4colors = colors[0][int(random(0,4))];

	//creates a new fast fourier transformation that isolates individual audio
	//frequencies within a waveform. new p5.FFT([smoothing],[bins])
	fft = new p5.FFT([.8],[16]);

	//set the input for the frequency analyze to the microphone
	fft.setInput(mic);

	// //set up tweening objects
	// var tween1 = new TWEEN.Tween(agent);
	// tween1. to ( {x: 0, y: 0}, 2000);//we initulize tweening values here followed by time in milliseconds
	// tween1.easing( TWEEN.Easing.Sinusoidal.InOut );
	// tween1.onStart(function(){	
	// 	//print("Agent's x: " + agent.x + " y: " + agent.y);
	// });
	// tween1.onUpdate(function(){});
 //    tween1.onComplete(function(){
 //        tween2.start();//chain tweens
 //    });

 //    var tween2 = new TWEEN.Tween( agent );
 //    tween2.to( { x: 255 , y: 255}, 2000 );
 //    tween2.easing( TWEEN.Easing.Sinusoidal.InOut );
 //    tween2.onStart(function(){
 //        //print("Agent's x: " + agent.x + " y: " + agent.y);
 //    });
 //    tween2.onComplete(function(){
 //        tween1.start();
 //    });
	
	// tween1.start();




	scenes = createScenes();

}


function createScenes(){
		var s = [
		{
			ellipsexPos: 0,
			position: createVector(),

			update: function(){ 
				// if not loaded, then transition
				//xPosition

			},
			
			draw: function(){
				// draw your shape

				
			}
		},{
			update: function(){
			}
		}
	]
	return s;

}

function draw(){

	
	//background(100,50,50);

	// Blend the old frames into the background
	blendMode( BLEND );
  	fill( s1colors);
  	rect( 0, 0, width, height );
  	rad = radians( frameCount );
				
  	//get the overall volume(between 0 and 1.0)
	var vol = mic.getLevel();

	//map the volume to a larger more usable number
	var m = map(vol, 0, 1, 20, 100);

	//analyze the spectum with a bin of 16
	var spectrum = fft.analyze();

	ellipse(width/2,height/2, 255,255);
				
	TWEEN.update();

	// Window event handler when the browser window size changes
	// When resized it calls the anonymous function
	window.onresize = function(){
	myCanvas.size(windowWidth, windowHeight);
	}

}

// if mic amplitude is greater than .75 micCount += 1;
// if micCount > 4 then sceneNumber += 1;
// show scenes[sceneNumber].update().transition();

//scenes[0].draw();
//scenes[0].update();



// sceneNumber += 1;
// if sceneNumber > 3 then sceneNumber = 0;

// if scene 0
//scenes[0].update();

// if scene 1

//scenes[1].update();




// [1, 2, 3, 4, 5 ];

// seasons.length 
// seasons[0].length
// seasons[0][0].animate();

// seasons[1][0]