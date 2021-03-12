// Create a new map with a fullscreen button:
var map = new L.Map('mapid', {
    minZoom: 6,
    maxZoom: 19
}).setView([41.29246, 12.5736108], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.Icon.Default.imagePath = 'img/';
var customIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [25, 20],
    shadowUrl: 'img/marker-icon-2x.png',
    shadowSize: [0, 0],
    tooltipAnchor: [0, -20]
});

// Markers
var markers = L.markerClusterGroup({
    showCoverageOnHover: false
});

function clearMapFromMarkers() {
    markers.clearLayers();
}

function addMarkerToCluster(lat, lon, cellId) {
    desc = generateCellDescription(selectedMcc, selectedMnc, cellId);
    markers.addLayer(L.marker([lat, lon], {
            icon: customIcon
        })
        .bindTooltip(desc, {
            permanent: true,
            direction: 'auto'
        })
        .openTooltip()
        .addTo(map)
        .on('click', function () {
            console.log("Click su marker");
        })
    );
}

function showMarkerCluster() {
    map.addLayer(markers);
    // Fly to markers bounds
    map.flyToBounds(markers.getBounds(), {
        padding: [100, 100],
        duration: 2
    });
}