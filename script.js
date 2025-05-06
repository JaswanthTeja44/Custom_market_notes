let map = L.map('map').setView([20.5937, 78.9629], 5); // India Center
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let isAddingMarker = false;

function enableAddMarker() {
  const title = document.getElementById('markerTitle').value.trim();
  const note = document.getElementById('markerNote').value.trim();
  if (!title || !note) {
    showToast('Please provide both a title and a note.');
    return;
  }
  isAddingMarker = true;
  showToast('Click on the map to place your marker.');
}

map.on('click', function (e) {
  if (!isAddingMarker) return;
  const title = document.getElementById('markerTitle').value.trim();
  const note = document.getElementById('markerNote').value.trim();

  const marker = L.marker(e.latlng).addTo(map);
  marker.bindPopup(`<div class='note-popup'><strong>${title}</strong><br/>${note}</div>`);
  marker.openPopup();

  // Reset
  isAddingMarker = false;
  document.getElementById('markerTitle').value = '';
  document.getElementById('markerNote').value = '';
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}