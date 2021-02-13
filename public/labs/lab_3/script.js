const imgul = document.querySelector('.collection')
const allimages = document.querySelectorAll('.images');

const carouselArray = [];
for (let i = 0; i < allimages.length; i++) {
  carouselArray.push(allimages[i].src);
}

let currentslide = 0;

document.querySelector('.left').onclick = () => {
  if (currentslide = 0) {
    gallery.style.marginRight = '260px';
    currentslide += 3;
  }
}