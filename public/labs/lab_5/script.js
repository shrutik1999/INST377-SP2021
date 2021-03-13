function mapInit() {
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  // follow the Leaflet Getting Started tutorial here
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2hydXRpa3VtYXI5OSIsImEiOiJja20zd2J6OXowYXpsMm9vYTlxaDgwbWt2In0.k9O3LYXlgB5gC855Nz8yTA' /* check abt this */
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) { /* pasted in assignment 1 code */
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  
  const request = await fetch(endpoint)
  	const restaurants = await request.json();

  /*function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex)
    });
  }*/ /*repetitive and unnecessary */

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  const buttonEvent = document.getElementById('submit');

  function displayMatches() {
  	const filtered = restaurants.filter((record) => record.zip.includes(searchInput.value) && record.geocoded_column_1);
    const sliced = filtered.slice(0, 5);
    
    sliced.forEach((item) => {
    	const longLat = item.geocoded_column_1.coordinates;
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);
      
    	const html = sliced.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const nameName = place.name.replace(regex, `<span class="h1">${this.value}</span>`);
      const categoryName = place.category.replace(regex, `<span class="h1">${this.value}</span>`);
      return `
          <li class="box has-background-success-light"> 
            <span class="name">${nameName}</span><br>
            <span class="category">${categoryName}</span><br>
            <span class="address">${place.address_line_1} </span>
            <span class="zip">${place.zip}</span>
          </li>
          `;
    }).join('');
    // eslint-disable-next-line no-use-before-define
    suggestions.innerHTML = html;  
    });
  }
    buttonEvent.addEventListener('submit', displayMatches);
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;