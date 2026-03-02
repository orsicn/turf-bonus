// Add all scripts to the JS folder

var map =  L.map('map').setView([15, -15], 2
); 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
console.log("Map1 initialized");





fetch("/data/eqpacific.geojson")
  .then(response => response.json())
  .then(data => {
    var vorP = turf.voronoi(data);

    L.geoJSON(data).addTo(map);
    })