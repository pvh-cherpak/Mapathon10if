mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYXRob24yMDI0LXRlYW02IiwiYSI6ImNsdmFtNjZnMDE1bDQyanJyeTRjbnZhNHoifQ.QnsGQhCGixoqajiUos7vfg';
const map = new mapboxgl.Map({
 container: 'map', // container ID
 style: 'mapbox://styles/mapbox/streets-v12', // style URL
 center: [-74.5, 40], // starting position [lng, lat]
 zoom: 9, // starting zoom
});

function checkForm (forma){
	var Name = forma.name.value;
	var Password = forma.pass.value;
	var state = forma.state.value;

	var fail = "";
	if (Name == "" || Password == "" || state =="")
		fail = "заполните все поля";
	else if (Name.length <=1 || Name.length > 50)
		fail = "Введите коректное имя";

	if (fail!=""){
		document.getElementById("error").innerHTML = fail;
		return false;
	}
	
	return true;
}
