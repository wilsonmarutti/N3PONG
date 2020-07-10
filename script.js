let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2; // inicial horizontal
let y = canvas.height / 2; // inicial vertical
let dx = 2; // variação horizontal
let dy = -2 // variação vertical;
let ballRadius = 10;
//BARRA DA DIREITA
let paddleHeight = 75;
let paddleWidth = 10;
let paddleX = (canvas.width - paddleWidth) - 50;
let paddleY = (canvas.height - paddleHeight) / 2;
let rightPressed = false;
let leftPressed = false;
//BARRA DA ESQUERDA
let paddleHeight2 = 75;
let paddleWidth2 = 10;
let paddleX2 = 50;
let paddleY2 = (canvas.height - paddleHeight2) / 2;
let rightPressed2 = false;
let leftPressed2 = false;
//PONTUAÇÃO
let score = 0;
let score2 = 0;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle2() {
  ctx.beginPath();
  ctx.rect(paddleX2, paddleY2, paddleWidth2, paddleHeight2);
  ctx.fillStyle = "green";
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

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Pontuação: " + score, canvas.width / 2 - 150, 20);
  ctx.fillStyle = "red";
  ctx.fillText("Pontuação: " + score2, canvas.width / 2 + 50, 20);

}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawPaddle2();
  drawScore();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    if (x + dx == 8) {
      score2++;
      reinicia_round();
    } else if(x + dx == 592) {
      score++;
      reinicia_round();
    }

    if (score == 3) {
      alert("VERDE VENCEU");
      document.location.reload();
      clearInterval(interval);
    } else if(score2 == 3){
      alert("VERMELHO VENCEU");
      document.location.reload();
      clearInterval(interval);
    }

    dx = -dx;
  }
   
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if(x > paddleX && x < paddleX + paddleWidth && y < paddleY + paddleHeight && y + ballRadius >= paddleY){
    dx = -dx;
  }else if( y + dy > canvas.height - ballRadius){
    dy = -dy;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if(x > paddleX2 && x < paddleX2 + paddleWidth2 && y < paddleY2 + paddleHeight2 && y + ballRadius >= paddleY2){
    dx = -dx;
  }else if( y + dy > canvas.height - ballRadius){
    dy = -dy;
  }

  if (rightPressed) {
    paddleY += 7;
    if (paddleY + paddleHeight > canvas.height) {
      paddleY = canvas.height - paddleHeight;
    }
  } else if(leftPressed){
    paddleY -= 7;
    if (paddleY < 0) {
      paddleY = 0;
    }
  }

  if (rightPressed2) {
    paddleY2 += 7;
    if (paddleY2 + paddleHeight2 > canvas.height) {
      paddleY2 = canvas.height - paddleHeight2;
    }
  } else if(leftPressed2){
    paddleY2 -= 7;
    if (paddleY2 < 0) {
      paddleY2 = 0;
    }
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);

function keyUpHandler(e) {
  if(e.key == "ArrowUp"){
    leftPressed = false;
  }
  if(e.key == "ArrowDown"){
    rightPressed = false;
  }
}

function keyDownHandler(e) {
  if (e.key == "ArrowUp") {
    leftPressed = true;
  }
  if(e.key == "ArrowDown"){
    rightPressed = true;
  }
}

function keyUpHandler2(e) {
  if(e.keyCode == 87){
    leftPressed2 = false;
  }
  if(e.keyCode == 83){
    rightPressed2 = false;
  }
}

function keyDownHandler2(e) {
  if(e.keyCode == 87){
    leftPressed2 = true;
  }
  if(e.keyCode == 83){
    rightPressed2 = true;
  }
}

function reinicia_round(){
  x = canvas.width / 2;
  y = canvas.height / 2;
  dx = 2;
  dy = -2;
  paddleY = (canvas.height - paddleHeight) / 2;
  paddleY2 = (canvas.height - paddleHeight2) / 2;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("keydown", keyDownHandler2, false);
document.addEventListener("keyup", keyUpHandler2, false);