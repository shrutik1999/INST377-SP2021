/* Put your javascript in here */

const imgul = document.querySelector('.collection')
const allimages = document.querySelectorAll('.images');

const carouselArray = [];
for (let i = 0; i < allimages.length; i++) {
  carouselArray.push(allimages[i].src);
}

console.log(carouselArray); //doesnt work

let currentslideindex = -1;

allimages.onclick = function () {
	if (currentslideindex<3) {
  	
  }

}

/*allimages.onclick = function () {
	if (currentslideindex<=carouselArray.length) {
  	currentslideindex ++;
  
  
	}
}*/