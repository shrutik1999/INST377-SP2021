document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = 150;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerID;

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodler.style.left = doodlerLeftSpace + 'px'; /*adding this line creates issues, left off at 30 mins*/
    doodler.style.bottom = doodlerBottomSpace + 'px';
  }
  createDoodler();

  class Platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement('div');

      const visual = this.visual;
      visual.classList.add('platform');
      visual.style.left = this.left + 'px';
      visual.style.bottom = this.bottom + 'px';
      grid.appendChild(visual);
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platGap = 600 / platformCount;
      let newPlatBottom = 100 + i * platGap;
      let newPlatform = new Platform(newPlatBottom);
      platforms.push(newPlatform);
    }
  }

  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach(platform => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + 'px';
      });
    }
  }

  function jump() {
    clearInterval(downTimerID);
    upTimerId = setInterval(function () {
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + 'px';
      if (doodlerBottomSpace > 350) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    downTimerID = setInterval(function () {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + 'px';
      if (doodlerBottomSpace <= 0) {
        gameOver()
      }
    },30);
  }

  function gameOver() {
    console.log('game over');
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerID);
  }

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
    }
  }
  // attach to button
  start();
});