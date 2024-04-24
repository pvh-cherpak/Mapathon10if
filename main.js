mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYXRob24yMDI0LXRlYW02IiwiYSI6ImNsdmFtNjZnMDE1bDQyanJyeTRjbnZhNHoifQ.QnsGQhCGixoqajiUos7vfg';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [27.5667, 53.9], // starting position [lng, lat]
	zoom: 9, // starting zoom
});

var page_promoute = 0;
var promoute;
var currentPage = 0;
var max_page_prompte = 0;

var popup = new mapboxgl.Popup();

function loadMap(){
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
		
		max_page_prompte = count_promotion_pages (promoute);
		visyal_promotion(promoute);
		document.getElementById("salesFound").innerHTML = "Акция: " + (page_promoute + 1) + " из " + (max_page_prompte + 1);
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

		popup = new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(descriptionName + descriptionOpening_hours + descriptionStreet + descriptionWebsite)
			.addTo(map);
	});
}

map.on('load', () => {
	loadMap()
});

map.on('style.load', () => {
	loadMap()
});

map.on('mouseenter', 'places', () => {
	map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', () => {
	map.getCanvas().style.cursor = '';
});




var jsonDataAkcii;
var jsonDataAkcii_is_load = false;

(async () => {
	let response = await fetch('./akcii.json');
	jsonDataAkcii = await response.json();
	jsonDataAkcii_is_load = true ;
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
	if (eat=="всё"){
		map.setFilter('restarans', buildFilter(
			[...Filterbytype(jsonDataAkcii, "фастфуд"), ...Filterbytype(jsonDataAkcii, "пицца"), ...Filterbytype(jsonDataAkcii, "суши")]));
	}
	else{
	popup.remove();
	document.getElementById("buttons1").style.display = "None";
	document.getElementById("sales").innerHTML = '<div>' +"Нажмите на ресторан, чтобы увидеть действующие акции и предложения"+ '</div>';
	
	map.setFilter('restarans', buildFilter(Filterbytype(jsonDataAkcii, eat)));
	}
}




var ui = document.getElementById("ui")
var foodSelect = document.getElementById("select1")

function switchMode(slider) {
	currentPage = 0;
	var mode = slider.checked;
	var header = document.getElementById("head")
	if(mode){ 
		map.setStyle('mapbox://styles/mapbox/dark-v11'),
		ui.style.background = '#404040';
		ui.style.color = 'white';
		ui.style.transition = '0.5s';

		select1.style.background = '#505050';
		select1.style.color = '#FFFFFF';
		select1.style.transition = '0.5s';

		header.style.background = "#333333"
		header.style.transition = '0.5s';
	}
	else{
		map.setStyle('mapbox://styles/mapbox/streets-v12'),
		ui.style.background = 'white';
		ui.style.color = 'black';
		ui.style.transition = '0.5s';

		select1.style.background = '#FFFFFF';
		select1.style.color = 'black';
		select1.style.transition = '0.5s';

		header.style.background = "#AAAAAA"
		header.style.transition = '0.5s';
	} 
}



function count_promotion_pages(f){
	var mon = -1;
	for (var i = 0; i<jsonDataAkcii.promotion.length; i++)
		if (jsonDataAkcii.promotion[i].adr_work.find(function(a, b,c){return a==f[0].id;}) != undefined){
			mon++;
		}
	return mon;
}

function visyal_promotion(f) {
	var d = document.getElementById("sales");
	document.getElementById("buttons1").style.display = "";
	var mon = -1;

	for (var i = 0; i<jsonDataAkcii.promotion.length; i++){
		if (jsonDataAkcii.promotion[i].adr_work.find(function(a, b,c){return a==f[0].id;}) != undefined){
			mon++;
			if (mon==page_promoute){
				d.innerHTML = "<img width=\"250px\" src=" + jsonDataAkcii.promotion[i].picture+">" +
				'<div id="restNameHead">' + jsonDataAkcii.promotion[i].description + '</div>';
			}
		}
	}	
}

function left(){
	if (page_promoute>0){
	page_promoute--;
	document.getElementById("salesFound").innerHTML = "Акция: " + (page_promoute + 1) + " из " + (max_page_prompte + 1);
	visyal_promotion(promoute);
	}
}
function right(){
	if (page_promoute<max_page_prompte){
	page_promoute++;
	document.getElementById("salesFound").innerHTML = "Акция: " + (page_promoute + 1) + " из " + (max_page_prompte + 1);
	visyal_promotion(promoute);
	}
}



map.on('click', (event) => {
	document.getElementById("buttons1").style.display = "None";
	document.getElementById("sales").innerHTML = '<div>' +"Нажмите на ресторан, чтобы увидеть действующие акции и предложения"+ '</div>';
});

switchMode(document.getElementById("slider_nith_day"));
document.getElementById("buttons1").style.display = "None";


var interval = setInterval(function () {
	if (jsonDataAkcii_is_load){
		map.on('load', () => {
			console.log("акции загружены");
			select (document.getElementById("select1"));
			clearInterval(interval);
		});
	}
	else
		console.log("акции не ещё не загружены");
},100);
	
