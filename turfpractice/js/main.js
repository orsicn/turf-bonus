var map = L.map('map').setView([15, -15], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

console.log("Map initialized");

function getRadius(mag) {
  return Math.max((mag - 7.5) * 10, 2); // minimum radius 2
}

fetch("data/eqpacific1.geojson")
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