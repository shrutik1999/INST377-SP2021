function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
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

  const restaurants = [];

  fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => restaurants.push(...data))

  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.category.match(regex)
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const nameName = place.name.replace(regex, `<span class="h1">${this.value}</span>`);
      const categoryName = place.category.replace(regex, `<span class="h1">${this.value}</span>`);
      return `
          <li class="box has-background-success-light"> 
            <span class="name">${nameName}</span><br>
            <span class="category">${categoryName}</span><br>
            <span class="address">${place.address_line_1} </span>
          </li>
          `;
    }).join('');
    // eslint-disable-next-line no-use-before-define
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;