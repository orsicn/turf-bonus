// Add all scripts to the JS folder

var map =  L.map('map').setView([15, -15], 2
); 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
console.log("Map1 initialized");

// Function to scale circle radius by magnitude
function getRadius(mag) {
  // Linear scaling with multiplier
  return (mag - 7.5) * 10; // subtract baseline 7.5 to exaggerate differences
  // Example: mag 8 → (8-7.5)*10 = 5
  //          mag 9 → (9-7.5)*10 = 15
}

fetch("data/eqpacific.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: getRadius(feature.properties.mag),
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          fillOpacity: 0.7
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`
          <strong>${feature.properties.place}</strong><br>
          Magnitude: ${feature.properties.mag}<br>
          Depth: ${feature.geometry.coordinates[2]} km
        `);
      }
    }).addTo(map);
  })
  .catch(error => console.error('Error loading GeoJSON:', error));