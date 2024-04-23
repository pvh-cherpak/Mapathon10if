mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYXRob24yMDI0LXRlYW02IiwiYSI6ImNsdmFtNjZnMDE1bDQyanJyeTRjbnZhNHoifQ.QnsGQhCGixoqajiUos7vfg';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [27.5667, 53.9], // starting position [lng, lat]
	zoom: 9, // starting zoom
});

var page_promoute = 0;
var promoute;
var currentPage = 0

map.on('load', () => {
	// Add geolocate control to the map.
	map.addControl(
		new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			// When active the map will receive updates to the device's location as it changes.
			trackUserLocation: true,
			// Draw an arrow next to the location dot to indicate which direction the device is heading.
			showUserHeading: true
		})
	);
	map.addSource('restarans_sourse', {
		'type': 'geojson',
		'data': './restaurants.geojson'
	});
	map.addLayer({
		'id': 'restarans',
		'visibility': 'none',
		'type': 'circle',
		'source': 'restarans_sourse',
		'paint': {
			'circle-color': '#4264fb',
			'circle-radius': 6,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#ffffff'
		}
	});

	map.on('click', 'restarans', (e) => {
		page_promoute = 0;
		promoute = e.features;
		visyal_promotion(promoute);
		// Copy coordinates array.
		const coordinates = e.features[0].geometry.coordinates.slice();
		const descriptionName = e.features[0].properties.name;
		const descriptionOpening_hours = e.features[0].properties.opening_hours;
		const descriptionStreet = e.features[0].properties.street;
		const descriptionWebsite = e.features[0].properties.website;

		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(descriptionName + descriptionOpening_hours + descriptionStreet + descriptionWebsite)
			.addTo(map);
	});
});

map.on('mouseenter', 'places', () => {
	map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', () => {
	map.getCanvas().style.cursor = '';
});




var jsonDataAkcii;

(async () => {
	let response = await fetch('./akcii.json');
	jsonDataAkcii = await response.json();
	console.log(jsonDataAkcii);

})();


function buildFilter(arr) {
	var filter = ['in', "@id"];

	if (arr.length === 0) {
		return filter;
	}

	for (var i = 0; i < arr.length; i += 1) {
		filter.push(arr[i]);
	}

	return filter;
}

function Filterbytype(jsonDataAkcii, filter) {
	var mass = [];
	for (var i = 0; i < jsonDataAkcii.promotion.length; i += 1) {
		if (jsonDataAkcii.promotion[i].type == filter) {
			for (var j = 0; j<jsonDataAkcii.promotion[i].adr_work.length; j++)
			mass.push(jsonDataAkcii.promotion[i].adr_work[j]);
		}
	}
	return mass;
}

function select(selector) {
	var eat = selector.value;
	map.setFilter('restarans', buildFilter(Filterbytype(jsonDataAkcii, eat)));
}


var ui = document.getElementById("ui")
var foodSelect = document.getElementById("select1")
var mode = 0;

function switchMode() {
	currentPage = 0
	mode = 1 - mode
	if(mode){ 
		map.setStyle('mapbox://styles/mapbox/dark-v11'),
		ui.style.background = '#404040';
		ui.style.color = 'white';
		ui.style.transition = '0.5s';

		select1.style.background = '#505050';
		select1.style.color = '#FFFFFF';
	}
	else{
		map.setStyle('mapbox://styles/mapbox/streets-v12'),
		ui.style.background = 'white';
		ui.style.color = 'black';
		ui.style.transition = '0.5s';

		select1.style.background = '#FFFFFF';
		select1.style.color = 'black';
	} 
}

function visyal_promotion(f) {
	var d = document.getElementById("sales");
	document.getElementById("buttons1").style.display = ""
	var mon = -1;
	var proms = []
	for (var i = 0; i<jsonDataAkcii.promotion.length; i++){
		if (jsonDataAkcii.promotion[i].adr_work.find(function(a, b,c){return a==f[0].id;}) != undefined){
			mon++;
			if (mon==page_promoute){
				proms.push('<div id="restNameHead">' + jsonDataAkcii.promotion[i].description + '</div>');
			}
		}
	}	
	d.innerHTML = proms[currentPage]
}

function left(){
	currentPage--
}
function right(){
	currentPage++
}

document.getElementById("buttons1").style.display = "None"
