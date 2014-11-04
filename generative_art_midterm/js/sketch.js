//WNM 498 Generative Art & Creative Code
//Ryan and Scotts super awesome midterm project
//with guidance and code help from the Masterfull Ryan Berkey

var numColors = 5;
var scenes;
var input;
var fft;
var theta;
var agent;

var num = 7;
var sw = 100;
var r = 0;
var scenes = [];
var activeScene = 0;
var season = 0;


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

var s1colors; //spring
var s2colors; //summer
var s3colors; // fall 
var s4colors; //winter


function setup(){
	//Create the canvas at window height and width
	myCanvas = createCanvas(windowWidth, windowHeight);
	
	//create an audio input
	mic = new p5.AudioIn();
	
	//start the audio input
	mic.start();


	s1colors = colors[0][int(random(0,4))];
	s2colors = colors[1][int(random(0,4))];
	s3colors = colors[2][int(random(0,4))];
	s4colors = colors[3][int(random(0,4))];

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
	var scene1 = {
		rectPos: createVector( width / 2, height / 2),
		rectWidth: 200,
		rectHeight: 100,
		rectRotation: 0,
		r: colors[season][0][0],
		g: colors[season][0][1],
		b: colors[season][0][2],
		animating: false,
		update: function(){
			this.rectRotation += radians(1);
			this.r = colors[season][0][0];
			this.g = colors[season][0][1];
			this.b = colors[season][0][2];
		},
		display: function(){
			push();
			rectMode(CENTER);
			translate( this.rectPos.x, this.rectPos.y );

			fill( this.r, this.g, this.b);
			rotate( this.rectRotation );
			rect( 0, 0, this.rectWidth, this.rectHeight) ;
			pop();
		}
	};

	scenes.push(scene1);

	var scene2 = {
		ellipsePos: createVector( width / 2, height / 2),
		ellipseWidth: 200,
		ellipseDiameter: 100,
		r: colors[season][0][0],
		g: colors[season][0][1],
		b: colors[season][0][2],
		animating: false,

		update: function(){
			this.rectRotation += radians(1);
			this.r = colors[season][0][0];
			this.g = colors[season][0][1];
			this.b = colors[season][0][2];
		},

		display: function(){
			push();
			translate( this.ellipsePos.x, this.ellipsePos.y );
			rotate( this.rectRotation );
			fill( this.r, this.g, this.b);

			ellipse( 0, 0, this.ellipseDiameter, this.ellipseDiameter) ;
			pop();
		}
	};

	scenes.push(scene2);
}






function draw(){
	background(255);
	scenes[activeScene].update();
	scenes[activeScene].display();
	
	//background(100,50,50);

	// Blend the old frames into the background
	blendMode( BLEND );
  	fill( s3colors);
  	rect( 0, 0, width, height );
  	rad = radians( frameCount );
				
  	//get the overall volume(between 0 and 1.0)
	var vol = mic.getLevel();

	//map the volume to a larger more usable number
	var m = map(vol, 0, 1, 1, 50);
	//print(m);

	//analyze the spectum with a bin of 16
	var spectrum = fft.analyze();

	stroke(colors[1][3]);
	noFill();
	strokeWeight(30);
	strokeCap(SQUARE);	
	
	//draw an arc to screen
	for (i = 0; i<2; i++){
		arcs(900,900);
	}

	
	// ellipse(width/2,height/2, 255,255);
				
	TWEEN.update();

	// Window event handler when the browser window size changes
	// When resized it calls the anonymous function
	window.onresize = function(){
	myCanvas.size(windowWidth, windowHeight);
	}

}

function arcs(){
		stroke(s1colors);

		//get the overall volume(between 0 and 1.0)
		var vol = mic.getLevel();

		//map the volume to a larger more usable number
		var m = map(vol, 0, 1, 1, 5);

		push();
		translate(width/2, height/2);
		rotate(TWO_PI);
		for (i=0; i < num; i++){
			stroke(360/num*i, 100/m, 100/m, 140/m);
			var start = TWO_PI+i*r+m;
			var end = start + TWO_PI * m;
			var scale = map(sin(r+TWO_PI/num+i), -1, 1, .1, .5);
			
			
			arc(0, 0, 700 -i * sw, 700 - i *sw, start, end*scale);
			//arc(0, 0, width*.9 -i * sw , height*.9-i*3*sw, start, end*scale);

		}
		r += .0323/2;
		pop();
	}
function keyTyped(){
	switch( key ){
		case "1":
			activeScene = 0;
			print(activeScene);
			break;
		case "2":
			activeScene = 1;
			print(activeScene);
			break;
		case " ": // Space Bar
			if (season >= colors.length - 1){
				season = 0;
			}else{
				season++;
			}
			break;
		default:
			break;
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