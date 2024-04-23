mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYXRob24yMDI0LXRlYW02IiwiYSI6ImNsdmFtNjZnMDE1bDQyanJyeTRjbnZhNHoifQ.QnsGQhCGixoqajiUos7vfg';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [27.5667, 53.9], // starting position [lng, lat]
	zoom: 9, // starting zoom
});


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
	map.addSource('places', {
		'type': 'geojson',
		'data': './restaurants.geojson'
	});
	map.addLayer({
		'id': 'restarans',
		'visibility': 'none',
		'type': 'circle',
		'source': 'places',
		'paint': {
			'circle-color': '#4264fb',
			'circle-radius': 6,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#ffffff'
		}
	});
	map.on('click', 'restarans', (e) => {
		visyal_promotion(e.features);
	});
});


function visyal_promotion(name_restaran) {

}


function buildFilter(arr) {
	var filter = ['in', "name"];

	if (arr.length === 0) {
		return filter;
	}

	for (var i = 0; i < arr.length; i += 1) {
		filter.push(arr[i]);
	}

	return filter;
}

var jsonDataAkcii = {
    "data": 22,
    "promotion":[
        {
            "name_of_restaurant":"Додо Пицца",
            "description":"купон 2099",
            "type" : "фастфуд",
        }
    ]
};


function Filterbytype(jsonDataAkcii, filter) {
	var mass=[];
	for (var i = 0; i < jsonDataAkcii.promotion.length; i += 1) {
		if (jsonDataAkcii.promotion[i].type == filter){
				console.log(jsonDataAkcii.promotion[i].name_of_restaurant);
				mass.push(jsonDataAkcii.promotion[i].name_of_restaurant);
			}
	}

	return mass;
}

function select(selector) {
	var eat = selector.value;
	console.log(eat);

	map.setFilter('restarans', buildFilter(Filterbytype(jsonDataAkcii, eat)));
}

var ui = document.getElementById("ui")
var foodSelect = document.getElementById("select1")
var mode = 0;

function switchMode(){
	mode = 1-mode
	if(mode){ 
		map.setStyle('mapbox://styles/mapbox/dark-v11'),
		document.ui.className = 'dark-theme';
	}
	else{
		map.setStyle('mapbox://styles/mapbox/streets-v12'),
		document.ui.className = 'light-theme';
	} 
	if(mode) map.setStyle('mapbox://styles/mapbox/dark-v11');

	else map.setStyle('mapbox://styles/mapbox/streets-v12');
}
