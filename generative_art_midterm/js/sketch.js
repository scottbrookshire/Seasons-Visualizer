//WNM 498 Generative Art & Creative Code
//Ryan and Scotts super awesome midterm project

var two;
var input;
var analyzer;
var fft;
var ellipse =[];
var moving = false;
var agent;

var theta;

var accum =01;



	
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
		//print("Agent's x: " + agent.x + " y: " + agent.y);
	});
	tween1.onUpdate(function(){});
    tween1.onComplete(function(){
        tween2.start();//chain tweens
    });

    var tween2 = new TWEEN.Tween( agent );
    tween2.to( { x: 255 , y: 255}, 2000 );
    tween2.easing( TWEEN.Easing.Sinusoidal.InOut );
    tween2.onStart(function(){
        //print("Agent's x: " + agent.x + " y: " + agent.y);
    });
    tween2.onComplete(function(){
        tween1.start();
    });
	
	tween1.start();


}

function draw(){




	background(agent.x, agent.y, agent.x/2);

	// Blend the old frames into the background
  	blendMode( BLEND );
  	fill( agent.x, agent.y);
  	rect( 0, 0, width, height );
  	rad = radians( frameCount );
	//background(agent.x, agent.y, agent.x/2);

	
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



//	-----------------------------------------------------------	
//Scene 1 : Shapes
  if (time < 7.4){	
	//draws an ellipse that position is updated by tween and scale is
	//driven by the amplitude of audio

	ellipse(width / 2, height / 2,agent.x,agent.y);
	

	print(spectrum[1]);
	
	if (spectrum[1]>=200){
	push();
	
	translate(width / 2, height / 2);
	var circleResolution = 10;
	var numVertices = 36;
	var radius = spectrum[5]*2;
	strokeWeight( 20 );
	stroke( m, m );
	//fill(100,100,100);
	
	if( radius % 2 ){
		rotate( PI / circleResolution / 2 );
	}else{
		rotate( PI / circleResolution );
	}
	beginShape();
	for ( var i = 0; i <= circleResolution; i++){
		
		var theta = i * TWO_PI / numVertices + accum;
		var x = 0 + cos(theta + m  ) * radius ;
		var y = 0 + sin(theta + m )  * radius ;
		vertex( x , y );

	
	}
	endShape();
	pop();
	}
	accum += 1;

	//ellipse(width / 2, height / 2,agent.x,agent.y);


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
 } else if (time > 8.15 && time < 40.5){	




//	-----------------------------------------------------------	
//Scene 3 : 	
   } else if (time > 40.5){	

   }


		
	TWEEN.update();

	// Window event handler when the browser window size changes
	// When resized it calls the anonymous function
	window.onresize = function(){
	myCanvas.size(windowWidth, windowHeight);
	}
	//print(m);
	
	//print(spectrum[]);

}
