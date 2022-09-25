// grabbing the canvas element in html to  render graphics in javascript
var canvas = document.getElementById("myCanvas");
// storing the reference to the <canvas> element from html to the canvas variable
var ctx = canvas.getContext("2d");
// creating a ctx var to store 2D rendering context (the tool used to paint on the canvas)
var x = canvas.width / 2;
var y = canvas.height - 30;
// defining x and y


// BALL variables
var ballRadius = 10;
// defining a variable that holds the radius of the circle to use for calculations
var dx = 1.5, dy = -1.5;
// add a small value to x and y after every frame has been drawn to make it appear that the ball is moving
// defined as dx and dy, values determines the speed
// declared as a const var to only apply this on the top, left and right walls of the canvas


// PADDLE variables
const paddleHeight = 10, paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// defining the height and width of the paddle and its starting point on the x axis to start at the
// centre of the canvas 


// USER CONTROL BOOLEANS
var rightPressed = false, leftPressed = false;
// variable that stores info on whether the left or right button is pressed
// default values are set to false as controls aren't pressed at the start
// for these to turn on, event listeners must be added (see lines 40-41)


// EVENT LISTENERS FOR CONTROLS
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//   When the keydown/keyup event is fired on any of the keys on your keyboard (when they are pressed), 
// the keyDownHandler() function will be executed
document.addEventListener("mousemove", mouseMoveHandler, false);
// enables a feature that follows mouse movement


// THESE ARE THE BRICKS VARIABLES
    // defined number of rows and columns of bricks, to their width and height and their padding
    // therefore they wont touch 
    // there is a top and left offset so they aren't drawn off the canvas 
var brickRowCount = 3, brickColumnCount = 5, brickWidth = 75, brickHeight = 20, brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 30;


// SCORE VARIABLE
var score = 0;


// LIVES VARIABLE
var lives = 3;

// this is to hold bricks in a 2D array which contains the
    // c for brick colums
        // which will contain the brick rows (r)
            // which will contain the x and y position painted on the screen
var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 /* status indicates its presence on screen
        set to 1 on default so bricks show on start up */ };
      }
    }
// this code will LOOP the rows and columns and create ALL bricks



///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function draw() {
//     // drawing code
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // removes a trail left by the painted circle
//     ctx.beginPath();
//     ctx.arc(x, y, 10, 0, Math.PI * 2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
//     x += dx;
//     y += dy;
//   }
//   setInterval(draw, 10);
// //   draw function will be executed within the setInterval of every 10 milliseconds infinitely

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SPLIT THE FUNCTIONS FOR NEATER CODE



// THESE FUNCTIONS ARE TO CONTROL THE PADDLE
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
// both fn use an event as a parameter (represented by the e var) which can be used to get information:
//  the key holds the information about the key that was pressed
// most browsers use ArrowLeft and ArrowRight for left/right keys
// but Right and Left is included to support Internet Explorer/Edge browsers
// if the left key is pressed, leftPressed will be set to true
// when released, leftPressed is set to false
// applies for rightPressed var respectively
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    // uses the relativeX value (horizontal mouse position) to the viewport (e.clientX) minus the distance 
    // between the left edge of the canvas and left edge of the viewport (canvas.offsetLeft)
    // this is equal to the distance between the canvas left edge and the mouse pointer
    if (relativeX > 0 && relativeX < canvas.width) {
        // if the relativeX position is greater than zero and lower than the Canvas width... (see line 139)
      paddleX = relativeX - paddleWidth / 2;
        // pointer is in the canvas
        // paddleX position is set to the relativeX value minus half the width of the paddle to allow movement 
        // that's relative to the middle of the paddle
    }
  }


// FN FOR COLLISION DETECTION
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            // calculations
            // b is the var for storing a brick object in every loop
            if (b.status == 1) /* if b.status is 1, brick is drawn and active */ {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                //   Allows the direction of the ball to change its direction when the center of the ball
                //   is within the coordinates of one of the bricks
                //   For this to occur, these statements need to be true
                        // x position of the ball is GREATER than x position of the brick
                        // x position of the ball is LESS than x position of the brick plus its width
                        // y position of the ball is greater than y position of the brick
                        // y position of the ball is less than y position of the brick plus its height
                b.status = 0;
                // if these conditions were met (where the ball collides with the brick), 
                // remove the brick (b.status=0)
                score++;
                // increments the value of the score var whenever a collision is detected
                    if (score === brickRowCount * brickColumnCount) /* if all the bricks are cleared */{
                    alert("Wow, you actually finished this game.");
                    document.location.reload();
                    } // displays WIN message to complete the game 
                }
            }
        }
    }
  }
//   LOOPS thorugh all the bricks and compares every brick's position with the ball's coordinates
//  for each frame drawn



// THIS FN DRAWS THE SCORE
function drawScore() {
    ctx.font = "16px Arial";
    // defines style of a text (font size and font)
    ctx.fillStyle = "#0095DD";
    // picks the colour
    ctx.fillText(`Score: ${score}`, 8, 20);
    // sets the text placed on the canvas, the first parameter is the text itself and the last two
    // parameters are coordinates of where the text is on the canvas
  }



//   THIS FN DRAWS LIVES
  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
  }



// THIS FUNCTION (FN) DRAWS THE BALL
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    // properties of the ball defined by variables from the global scope
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  


//   THIS FN DRAWS THE PADDLE
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    // sets the dimensions, using paddleX var to allow change in position by user
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }



//   THIS FN DRAWS THE BRICKS
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        // variables declared within the function so it only applies locally (within the fn)
        if (bricks[c][r].status === 1) /* if status is 1, draw brick */ {
            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                // X coordinates is calculated by brickWidth +  brickPadding
                // multiplied by column number (c) + brickOffsetLeft
            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                // Y coordinates is calculated by brickHeight +  brickPadding
                // multiplied by row number (r) + brickOffsetTop
            // this allows for every single brick to be placed within the right position
            // as well as padding between the bricks, drawn with offset from the left
            // and the top of the canvas
            bricks[c][r].x = brickX;
            // calculates the x position of the bricks and declared as brickX
            bricks[c][r].y = brickY;
            // calculates the y position of the bricks and declared as brickY
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
      }
    }
  }
  // LOOPS the columns (c) and rows (r) to
  // set the x and y positions of each brick
//   line and line calculates 



//   THIS FN IS THE MAIN DRAW FN
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    // draws the bricks in the canvas
    drawBall();
    // draws the ball in the canvas
    drawPaddle();
    // draws the paddle in the canvas
    drawScore();
    // draws the score in the canvas
    drawLives();
    // draws the number of lives in the canvas
    collisionDetection();
    // calls and activates collision detection

    if(x + dx > canvas.width-ballRadius 
        // If the ball's x position is greater than the width of the canvas minus the ballRadius... (see line 285)
        || x + dx < ballRadius) 
        // If the x value of the ball position is lower than the ballRadius, change the direction 
        // of the movement on the x axis by setting it equal to itself, reversed
        {
        dx = -dx;
        // bounce it off by reversing the x axis movement
        }
    if(y + dy < ballRadius) {
        dy = -dy;
        // if the ball's y pos is less than the ballRadius, reverse direction
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                // enables the ball to collide with the paddle and bounce off
            }
            else { // This is the lose state
                lives--;
                    if(!lives) {
                        alert("You could have won if you tried harder.");
                        document.location.reload(); // Reloads current page if ball flies beyond bounds of canvas 
                    }
                    else {
                        x = canvas.width/2;
                        y = canvas.height-30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width-paddleWidth)/2;
                    }
            }
            // if the ball hits the bottom of the Canvas we need to check whether it hits the paddle
            // if so, then it bounces off just like you'd expect; if not, then lives decrease 
            // if lives reach 0, game is over
        }


    if(rightPressed) {
        paddleX += 2;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 2;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
    // makes the draw() FN to loop, giving the frame rate control to the browser and allows for smooth animation
  }

  draw();