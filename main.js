var akcii;
var mode = 0


fetch('akcii.json')
	.then(response => {
		if (!response.ok) {
			throw new Error('Ой, ошибка в fetch: ' + response.statusText);
		}
		return response.json();
	})
	.then(akcii => console.log(akcii.akc))
	.catch(error => console.error('Ошибка при исполнении запроса: ', error));


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
		'id': 'fastfood',
		'visibility': 'none',
		'type': 'circle',
		'source': 'places',
		filter: ["==", ["get", "type"], "фастфуд"],
		'paint': {
			'circle-color': '#4264fb',
			'circle-radius': 6,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#ffffff'
		}
	});
	map.addLayer({
		'id': 'pizza',
		'visibility': 'none',
		'type': 'circle',
		'source': 'places',
		filter: ["==", ["get", "type"], "пицца"],
		'paint': {
			'circle-color': '#4264fb',
			'circle-radius': 6,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#ffffff'
		}
	});
	map.addLayer({
		'id': 'sushi',
		'visibility': 'none',
		'type': 'circle',
		'source': 'places',
		filter: ["==", ["get", "type"], "суши"],
		'paint': {
			'circle-color': '#4264fb',
			'circle-radius': 6,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#ffffff'
		}
	});
	map.addLayer({
		'id': 'shaurma',
		'visibility': 'none',
		'type': 'circle',
		'source': 'places',
		filter: ["==", ["get", "type"], "суши"],
		'paint': {
			'circle-color': '#4264fb',
			'circle-radius': 6,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#ffffff'
		}
	});
	map.on('click', 'places', (e) => {
		console.log(e.features);
	});

});



function select(sel) {
	var eat = sel.value;
	console.log(eat);
	switch (eat){
		case "фастфуд": 
			map.setLayoutProperty("sushi", 'visibility', 'none');
			map.setLayoutProperty("pizza", 'visibility', 'none');
			map.setLayoutProperty("fastfood", 'visibility', 'visible');
			map.setLayoutProperty('shaurma', 'visibility', 'none');
			break;
		case "пицца": 
			map.setLayoutProperty("sushi", 'visibility', 'none');
			map.setLayoutProperty("pizza", 'visibility', 'visible');
			map.setLayoutProperty("fastfood", 'visibility', 'none');
			map.setLayoutProperty("shaurma", 'visibility', 'none');
			break;
		case "суши": 
			map.setLayoutProperty("sushi", 'visibility', 'visible');
			map.setLayoutProperty("pizza", 'visibility', 'none');
			map.setLayoutProperty("fastfood", 'visibility', 'none');
			map.setLayoutProperty("shaurma", 'visibility', 'none');
			break;
		case "шаурма": 
			map.setLayoutProperty("sushi", 'visibility', 'none');
			map.setLayoutProperty("pizza", 'visibility', 'none');
			map.setLayoutProperty("fastfood", 'visibility', 'none');
			map.setLayoutProperty("shaurma", 'visibility', 'visible');
			break;
	}
}

///
	
//time of a day
const hour = parseInt(event.target.value);  
// update the map  
filterHour = ['==', ['number', ['get', 'Hour']], hour];  
map.setFilter('collisions', ['all', filterHour, filterDay]);  

// converting 0-23 hour to AMPM format  
const ampm = hour >= 12 ? 'PM' : 'AM';  
const hour12 = hour % 12 ? hour % 12 : 12;  

// update text in the UI  
//document.getElementById('active-hour').innerText = hour12 + ampm;
///

var ui = document.getElementById("ui")
var foodSelect = document.getElementById("select1")

function switchMode(){
	mode = 1-mode
	if(mode) map.setStyle('mapbox://styles/mapbox/dark-v11');
	else map.setStyle('mapbox://styles/mapbox/streets-v12');
}
