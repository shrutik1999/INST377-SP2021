document.addEventListener('DOMContentLoaded' , () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');

  let birdLeft = 220;
  let birdBottom = 200; /* adjusted so bird starts higher on screen */
  let gravity = 2;
  let isGameOver = false;
  let gap = 430;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
  }

  let gameTimerID = setInterval(startGame, 20);

  function control (e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) {
      birdBottom += 50;
      bird.style.bottom = birdBottom + 'px';
      console.log(birdBottom);
    }
  }

  document.addEventListener('keyup', control);

  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * (230 - 80) + 80; /* had to be adjusted */
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.bottom = obstacleBottom + gap + 'px';

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px';
      topObstacle.style.left = obstacleLeft + 'px';

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      // eslint-disable-next-line max-len
      if ((obstacleLeft > 200) && (obstacleLeft < 280) && (birdLeft === 220)
      && ((birdBottom < obstacleBottom + 150) || (birdBottom > obstacleBottom + gap - 215))
      || (birdBottom === 80)) { /* had to adjusted from 0 from example */
        gameOver();
        clearInterval(timerId); /* not working the bar still moves */
      }
    }
    let timerID = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }
  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerID);
    console.log('game over');
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
});