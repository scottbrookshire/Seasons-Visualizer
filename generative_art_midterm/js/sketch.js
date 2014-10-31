//WNM 498 Generative Art & Creative Code
//Ryan and Scotts super awesome midterm project

var two;
var input;
var analyzer;
var ellipse =[];
var moving = false;
var agent;
var theta;

 
var num=30;
var scal, sc, theta;

var sound;
var amp;
var fft;
	
function setup(){

	//Create the canvas at window height and width
	myCanvas = createCanvas(windowWidth, windowHeight);

	agent = createVector(0, 0);

	//create an audio input
	mic = new p5.AudioIn();

	//start the audio input
	mic.start();

	//creates a new fast fourier transformation that isolates individual audio
	//frequencies within a waveform. new p5.FFT([smoothing],[bins])
	fft = new p5.FFT([.8],[16]);

	//set the input for the frequency analyze to the microphone
	fft.setInput(mic);


	//set up tweening objects
	var tween1 = new TWEEN.Tween(agent);
	tween1. to ( {x: 0, y: 0}, 2000);//we initulize tweening values here followed by time in milliseconds
	tween1.easing( TWEEN.Easing.Sinusoidal.InOut );
	tween1.onStart(function(){	
		print("Agent's x: " + agent.x + " y: " + agent.y);
	});
	tween1.onUpdate(function(){});
    tween1.onComplete(function(){
        tween2.start();//chain tweens
    });

    var tween2 = new TWEEN.Tween( agent );
    tween2.to( { x: 255 , y: 255}, 2000 );
    tween2.easing( TWEEN.Easing.Sinusoidal.InOut );
    tween2.onStart(function(){
        print("Agent's x: " + agent.x + " y: " + agent.y);
    });
    tween2.onComplete(function(){
        tween1.start();
    });
	
	tween1.start();


}

function draw(){



	background(agent.x, agent.y, agent.x/2);
	
	//get the overall volume(between 0 and 1.0)
	var vol = mic.getLevel();

	//map the volume to a larger more usable number
	var m = map(vol, 0, 1, 20, 100);

	//analyze the spectum with a bin of 16
	var spectrum = fft.analyze();
	
	
	//Color Palette, example-- fill(colors[r]);
	var colors = [
	color(70,67,81),		//dark
	color(194,105,98),		//red
	color(215,129,136),		//salmon
	color(171,117,136),		//purp
	color(235,173,153)		//teal
	];
	var r = floor(random(colors.length));
	if (r <= 0){
		stop();
	}
	fill(colors[r]);

	//Setting the var time to play current time
	// var time = sound.currentTime();

//	-----------------------------------------------------------	
//Scene 1 : Shapes
  // if (time < 7.4){	
	//draws an ellipse that position is updated by tween and scale is
	//driven by the amplitude of audio
	ellipse(width / 2, height / 2,agent.x,agent.y);
	
	var tileCount = 2;
	
	//create a nested loop to draw squares on screen
	translate( width / tileCount / 2, height / tileCount / 2 );
	for (i = 0; i <  tileCount; i++){
		for(j = 0; j < tileCount; j++){

			var posX = windowWidth /tileCount* i;
			var posY = windowHeight /tileCount * j;
			rectMode(RADIUS);
			rect( posX , posY , m, m);
		}

	}
	
	

//	-----------------------------------------------------------	
//Scene 2 : 	
 // } else if (time > 8.15 && time < 15){	

// fill(100);
//   rect(0, 0, width, height);
//   scal = map(sin(theta), -1, 1, 70, 100);
//   sc = map(sin(theta), -1, 1, 3, 10);
//   for (var i = 0; i < 20; i++) {
//     var s = ((frameCount+(i*50))/100.0) % 10.0;
//     for (var j=0; j<num; j++) {
//       fill(255);
//       noStroke();
//       var x = width/2 + cos((TWO_PI/num)*j)*s*scal;
//       var y = height/2 + sin((TWO_PI/num)*j)*s*scal;
//       ellipse(x, y, sc, sc);
//     }
//   }
//   theta = TWO_PI;


//	-----------------------------------------------------------	
//Scene 3 : 	
   // } else if (time > 40.5){	

   // }


		
	TWEEN.update();

	// Window event handler when the browser window size changes
	// When resized it calls the anonymous function
	window.onresize = function(){
	myCanvas.size(windowWidth, windowHeight);
	}
	//print(m);
	
	//print(spectrum[]);

}
