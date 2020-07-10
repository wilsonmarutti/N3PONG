let canvas = document.getElementById("myCanvas");
let ctx = canvas. getContext("2d");

//bolinha
let x = canvas.width /2;    // inicial horizontal
let y = canvas.height - 35; // inicial vertical
let dx = 2;                 // variação horizontal
let dy = -2;                // variação vertical
let ballRadius = 10;        // raio da bola

// barra de baixo 
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 3;
let paddleY = (canvas.height - paddleHeight) - 10;
let rightPressed = false;
let leftPressed = false;

//barra de cima 
let paddleHeightUP = 10;
let paddleWidthUP = 75;
let paddleXUP = (canvas.width + paddleWidthUP) / 3;
let paddleYUP = (canvas.height + paddleHeightUP) - 310;
let rightPressed2 = false;
let leftPressed2 = false;

//pontuação e vida
let score = 0;
let life = 3;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Pontuação: 1" + score, 8, 20);
  }

function drawlifes() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: " + life, canvas.width -65, 20);
  }

function drawPaddleDonw() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

function drawPaddleUp(){
    ctx.beginPath();
    ctx.rect(paddleXUP, paddleYUP, paddleWidthUP, paddleHeightUP);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

  //função principal 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddleUp();
    drawPaddleDonw();
    drawScore();
    drawlifes();
    // verifica se a bola sai na horizontal
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx; // inverte o sinal de dx
    }
    // verifica se a bola sai na vertical
    if (y + dy < ballRadius ||
      x > paddleX && x < paddleX + paddleWidth && // entre a barra (eixo x)
      y + ballRadius >= paddleY) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        life--;// quantidade de vidas, chegou a zero morre
        if(life == 0){
          //alert("Game Over!");
          document.location.reload();
        }else{//jogador morreu, reseta tudo 
          x = canvas.width / 2; // inicial horizontal
          y = canvas.height - 35; // inicial vertical
          dx = 2; // variação horizontal
          dy = -2
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      
    }
  
    if (rightPressed) {
      paddleX += 7;
      if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
      }
    } else if (leftPressed) {
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    }

    if (rightPressed2) {
      paddleXUP += 7;
      if (paddleXUP + paddleWidthUP > canvas.width) {
        paddleXUP = canvas.width - paddleWidthUP;
      }
    } else if (leftPressed2) {
      paddleXUP -= 7;
      if (paddleXUP < 0) {
        paddleXUP = 0;
      }
    }
  
    x += dx;
    y += dy;
  
    requestAnimationFrame(draw);
 }
  
  //let interval = setInterval(draw, 10);
  draw()    

 function keyDownHandler(e) {
  if (e.key == "ArrowRight") {
    rightPressed = true;
  }
  if (e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "ArrowRight") {
    rightPressed = false;
  }
  if (e.key == "ArrowLeft") {
    leftPressed = false;
  }
} 

function keyDownHandler2(e) {
  if(e.keyCode == 65){
    leftPressed2 = true;
  }
  if(e.keyCode == 68){
    rightPressed2 = true;
  }
}
function keyUpHandler2(e) {
  if (e.keyCode == 65) {
    rightPressed2 = false;
  }
  if (e.keyCode == 68) {
    leftPressed2 = false;
  }
}

// adiciona eventos de controle para o teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler2,false);
document.addEventListener("keyup", keyUpHandler2,false)