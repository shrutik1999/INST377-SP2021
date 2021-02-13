const allimages = document.querySelectorAll('img');

const carouselArray = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < allimages.length; i++) {
  carouselArray.push(allimages[i].src);
}

let currentslide = 0;

document.querySelector('.right').onclick = () => {
  currentslide += 3;
  if (currentslide > 6) {
    currentslide = 6;
  } else if (currentslide == 6) {
    document.getElementById('image1').src = carouselArray[currentslide - 2];
    document.getElementById('image2').src = carouselArray[currentslide - 1];
    document.getElementById('image3').src = carouselArray[currentslide];
  } else {
    document.getElementById('image1').src = carouselArray[currentslide];
    document.getElementById('image2').src = carouselArray[currentslide + 1];
    document.getElementById('image3').src = carouselArray[currentslide + 2];
  }
};

document.querySelector('.left').onclick = () => {
  currentslide -= 3;
  if (currentslide < 0) {
    currentslide = 0;
  } else {
    document.getElementById('image1').src = carouselArray[currentslide];
    document.getElementById('image2').src = carouselArray[currentslide + 1];
    document.getElementById('image3').src = carouselArray[currentslide + 2];
  }
};