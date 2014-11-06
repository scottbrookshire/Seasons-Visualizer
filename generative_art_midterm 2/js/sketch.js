//WNM 498 Generative Art & Creative Code
//Ryan and Scotts super awesome midterm project
//with guidance and code help from the Masterfull Ryan Berkey

var numColors = 5;
var scenes;
var input;
var fft;
var theta;
var agent;
var accum = 0;
var amp;

var time;

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

var agent;

function setup(){
	//Create the canvas at window height and width
	myCanvas = createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
	mic.start();

	//creates a new fast fourier transformation that isolates individual audio
	//frequencies within a waveform. new p5.FFT([smoothing],[bins])
	fft = new p5.FFT([.8],[16]);
	fft.setInput(mic);


	amp = new p5.Amplitude();


	// COLORS! To randomly set colors just put s1colors. Example: fill(s3colors). Randomly chooes colors from season 3 (Fall).
	s1colors = colors[0][int(random(0,4))];
	s2colors = colors[1][int(random(0,4))];
	s3colors = colors[2][int(random(0,4))];
	s4colors = colors[3][int(random(0,4))];

	agent = colors[0][0];
	//print(agent);

	//set up the tweening for fall colors
	var tween1 = new TWEEN.Tween( agent );
    tween1.to( { r: 70, g:67, b: 98 }, 3000 );
    tween1.easing( TWEEN.Easing.Sinusoidal.InOut );
    tween1.onStart(function(){
        print("color: " + agent.r);
    });
    tween1.onUpdate(function(){});
    tween1.onComplete(function(){
        tween2.start();
    });

    var tween2 = new TWEEN.Tween( agent );
    tween2.to( { r:194, g:105, b:98 }, 3000 );
    tween2.easing( TWEEN.Easing.Sinusoidal.InOut );
    tween2.onStart(function(){
        print("color: " + agent.r);
    });
    tween2.onComplete(function(){
        tween3.start();
    });

    var tween3 = new TWEEN.Tween( agent );
    tween3.to( { r:215, g:129, b:136 }, 3000 );
    tween3.easing( TWEEN.Easing.Sinusoidal.InOut );
    tween3.onStart(function(){
        print("color: " + agent.r);
    });
    tween3.onComplete(function(){
        tween4.start();
    });

    var tween4 = new TWEEN.Tween( agent );
    tween4.to( { r:171, g:117, b:136 }, 3000 );
    tween4.easing( TWEEN.Easing.Sinusoidal.InOut );
    tween4.onStart(function(){
        // print("color: " + agent.r);
    });
    tween4.onComplete(function(){
        tween5.start();
    });

    var tween5 = new TWEEN.Tween( agent );
    tween5.to( { r:235, g:173, b:153 }, 3000 );
    tween5.easing( TWEEN.Easing.Sinusoidal.InOut );
    tween5.onStart(function(){
        print("color: " + agent.r);
    });
    tween5.onComplete(function(){
        tween1.start();
    });


	

	tween1.start();





	var scene1 = {
		ellipseSize: null, 
		elNumb: 25,
		amplitude: 30,
		r: colors[season][02][0],
		g: colors[season][2][1],
		b: colors[season][2][2],
		animating: false,
		theta: 0,

		update: function(){
			this.ellipseSize = width/this.elNumb-25;
			this.r = colors[season][2][0];
			this.g = colors[season][2][1];
			this.b = colors[season][2][2];
		},
		display: function(){

			var vol = mic.getLevel();
			var m = map(vol, 0, 1, 1, 5);
			var mStroke = map(vol, 0, 1, .5, 15);
			
			for(i = 0; i<(this.elNumb + 2); i++){
				var offset = (TWO_PI/this.elNumb*i)*2;
				var xPos = width/this.elNumb *i;
				var yPos = y = map(sin( this.theta+offset), -1, 1, height/2-this.amplitude/2*mStroke, height/2+this.amplitude/2*mStroke);
				var f = map(sin(this.theta/2+offset/4),-1,1,0,255);
				fill(360/num*i, 100/m, 100/m, 190/m);
				noStroke();
				ellipse(xPos, yPos, this.ellipseSize*m, this.ellipseSize*m );
			
			}	
		
			
			this.theta += 0.06;
		
		}

	};

	scenes.push(scene1);

	
	var scene2 = {
		update: function(){
		},

		display: function(){
			drawRaster();
		}
	};

	scenes.push(scene2);

	var scene3 = {
		
		animating: false,
		update: function(){
		},
		display: function(){
			var num = 10;
			var maxFrameCount = 120;
			var t = frameCount/maxFrameCount;
			var theta = TWO_PI*t;
			translate(width/2, height/2);
			rotate(theta/num);
			var vol = mic.getLevel();
			var m = map(vol, 0, 1, 1, 4);
			var mVol = map(vol, 0, 1, .4, 1);

			 for (var i=0; i<num; i++) {
			    push();
			    var offSet = TWO_PI/num*i;
			    rotate(offSet);
			    var sz = map(sin(theta+offSet), -1, 1, 150, 200);
			    var x = 300;
			    fill(360/num*i, 100/m, 100/m, 120/m);
			    noStroke();
			    ellipse(x, 0, sz*mVol, sz*mVol);
			    var sz2 = map(sin(-theta+offSet), -1, 1, 90, 100);
			    var x2 = 150;
			    ellipse(x2, 0, sz2*mVol, sz2*mVol);
			    pop();
			  }
			


			// rectMode(CENTER);
			// translate( this.rectPos.x, this.rectPos.y );
			// fill( this.r, this.g, this.b);
			// rotate( this.rectRotation );
			// rect( 0, 0, this.rectWidth, this.rectHeight) ;
			
		}
	};

	scenes.push(scene3);



	var scene4 = {
		
		animating: false,
		
		update: function(){
		
		},
		
		display: function(){
			//draw arcs to screen
			for (i = 0; i<2; i++){
			arcs(900,900);
			}		
		}
	};
	
	scenes.push(scene4);

	var scene5 = {
		
		animating: false,
		update: function(){

			
		},
		display: function(){
			var minRes = 3;
			var maxRes = 3;
			var vol = mic.getLevel();
			var m = map(vol, 0, 1, 1, 4);
			var mStroke = map(vol, 0, 1, .5, 15);

			translate( width / 2, height / 2+50 );
			// Set how many points the circle will have
			var circleResolution = floor( map( vol, 0, 1, minRes, maxRes ) );
			var radius = 300*m;
			var angle = TWO_PI / circleResolution;
			strokeWeight(30 *mStroke );
			stroke(360/num, 100/m, 100/m, 140/m);
			rotate( PI / circleResolution / 2 );
			
			beginShape();
			for ( var i = 0; i <= circleResolution; i++ ){

				var x = 0 + cos( angle * i ) * radius;
				var y = 0 + sin( angle * i ) * radius;
				vertex ( x, y );

			}
			endShape();
		}
	};

	scenes.push(scene5);

	//begin scene 6
	var scene6 = {
		
		animating: false,
		
		update: function(){
		
		},
		
		display: function(){

			var vol = mic.getLevel();
			var m = map(vol, 0, 1, 1, 3);
			var mCircle = map(vol, 0, 1, .0045, .005);
			var mStroke = map(vol, 0, 1, 50, 100);
			for(i=0; i<20; i++){
				var s = (frameCount + (i*100))*mCircle %5;
				var offset = width/2 ;
				stroke(360/num, 100/m, 100/m, 140/m);
				strokeWeight(10*m);
				ellipse(0+offset, height/2 , s*300, s*300);

			}
		}
	};
	
	scenes.push(scene6);

}







function draw(){

	// Blend the old frames into the background
	blendMode( BLEND );
  	fill( agent.r, agent.g, agent.b);
  	TWEEN.update();
  	rect( 0, 0, width, height );
  	rad = radians( frameCount );
				
  	//get the overall volume(between 0 and 1.0)
	var vol = mic.getLevel();

	var m = map(vol, 0, 1, 1, 5);
	// print(m);


	//analyze the spectum with a bin of 16
	var spectrum = fft.analyze();

	stroke(colors[1][3]);
	noFill();
	strokeWeight(30);
	strokeCap(SQUARE);	

	
	






	// var loud = m>1.5;
	// if (loud ){	
	// 	accum++;
	// } 
	// print(accum);
	// if (m < 1.5){	
	// 	activeScene = 0;
	// 	print(activeScene);

	// } else if (m > 2 ){
	// 	activeScene = 1;
	// 	print(activeScene);

	// }


	// var t = map(vol, 0, 1, .1  , .9);
	// time = floor(second()/5 %5);
	// print(time);



	switch( time ){
		case 1:
			activeScene = 0;
			print(activeScene);
			break;
		case 2:
			activeScene = 1;
			print(activeScene);
			break;
		case 3:
			activeScene = 2;
			print(activeScene);
			break;
		case 4:
			activeScene = 3;
			print(activeScene);
			break;
		case 5:
			activeScene = 4;
			print(activeScene);
			break;
		case 6:
			activeScene = 5;
			print(activeScene);
			break;
				default:
			break;
	}



	// necessary for tween animations			
	TWEEN.update();

	//Correlation between scenes[]; and activeScene change.
	scenes[activeScene].update();
	scenes[activeScene].display();

	// Window resizes
	window.onresize = function(){
	myCanvas.size(windowWidth, windowHeight);
	}
}

// draws arcing rings to screen
function arcs(){
		stroke(s1colors);

		//get the overall volume(between 0 and 1.0)
		var vol = mic.getLevel();
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

//draws squares

function drawRaster ()
{
  var rows = 7;
  var columns = 5;
 
  var margin = 100;    
  var padding = 45;    
 
  var totalSpaceWidth = width - 2*margin - (columns-1)*padding;
  var totalSpaceHeight = height - 2*margin - (rows-1)*padding;
 
  var rectWidth = float(totalSpaceWidth) / columns;
  var rectHeight = float(totalSpaceHeight) / rows;

  var spectrum = fft.analyze();

  var i = 0;

var vol = mic.getLevel();

		//map the volume to a larger more usable number
		var m = map(vol, 0, 1, 5, 15)
 
  while (i < rows)
  {
    var y = margin + i * (rectHeight + padding) ;
    var j = 0;
    // var f = lerpColor(#FFEC39, #FF6439, 1.0/rows*i);

    while (j < columns)
    {
      var x = margin + j*(rectWidth+padding);
      fill(360/num*i, 500/m, 500/m, 500/m);
      noStroke();
      var offSet = TWO_PI/columns*(j+i);
      var h = 50;
      rect (x, rectHeight+y-h, rectWidth, m*10 );
      fill (20);
      j = j +1;
    }
 
    i = i + 1;
  }
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
		case "3":
			activeScene = 2;
			print(activeScene);
			break;
		case "4":
			activeScene = 3;
			print(activeScene);
			break;
		case "5":
			activeScene = 4;
			print(activeScene);
			break;
		case "6":
			activeScene = 5;
			print(activeScene);
			break;
		case " ": // Space Bar
			if (season >= colors.length - 1){
				season = 0;
			}else{
				season++;
				//reminder to input text that says what season user changed to
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

// Scotts super secret note to self on Tues Nov 4th.
// Make two scenes that both TWEEN!!! 
// Include draw script Icon in at least 1!!!