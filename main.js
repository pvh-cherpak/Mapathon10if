var akcii;
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
	map.addSource('places', {
		'type': 'geojson',
		'data': './restaurants.geojson'
	});
	map.addLayer({
		'id': 'places',
		'type': 'circle',
		'source': 'places',
		filter: ["==", ["get", "name"], "Хинкальня"],
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




function checkForm(forma) {
	var Name = forma.name.value;
	var Password = forma.pass.value;
	var state = forma.state.value;

	var fail = "";
	if (Name == "" || Password == "" || state == "")
		fail = "заполните все поля";
	else if (Name.length <= 1 || Name.length > 50)
		fail = "Введите коректное имя";

	if (fail != "") {
		document.getElementById("error").innerHTML = fail;
		return false;
	}

	return true;
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
document.getElementById('active-hour').innerText = hour12 + ampm;

///
