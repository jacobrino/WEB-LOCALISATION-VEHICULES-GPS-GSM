var lat = -12.287502;
var lon = 49.308117;
//Latitude et longitude par défaut. on centre la carte sur cette position et mettre un marqueur de position

var zoomState=18

//A AMELIORER, LE NIVEAU DE ZOOM DOIT ETRE SYNCHRONE AVEC LE CLICK D'UTILISATEUR.

var marker;

var map;

export function initialiseMapView()
{
	map = L.map('map').setView([lat,lon],zoomState);
	//Initialisation de la carte avec un coordonnée par défaut.
	//Et aussi le niveau de zoom qui est 12.

	//var map = L.map('map').setView([lat,lon],8);26
	L.tileLayer('http://10.42.0.254/hot/{z}/{x}/{y}.png',
	{
	attribution:'Ds Informatique',minZoom:7,maxZoom:20
	}).addTo(map);
	marker = L.marker([lat,lon]).addTo(map);
	//Ajout d'un marqueur de localisation....
	
	// Afficher la barre d'échelle coin gauche      
	L.control.scale({imperial: false, metric: true}).addTo(map);

	//Afficher nord sud sur la carte
	var north = L.control({position: "topright"});
      	north.onAdd = function(map) 
      	{
         var div = L.DomUtil.create("div", "northDirection");
         div.innerHTML = '<img name ="northDirection" src="other/images/northDirection.png">';
         return div;
      	}
      	north.addTo(map);

}


/*var myLines = [{
    "type": "LineString",
    "coordinates": [[49.30646125190471, -12.277915726435381], [49.306256913281715, -12.280336891391675], 
[49.3089554564294, -12.284693902585143], [49.3089554564294, -12.284693902585143], 
[49.30612311167667, -12.290826177584536], [49.304063175153175, -12.292209920361135], 
[49.30212125582634, -12.294757245976571], [49.30212125582634, -12.294757245976571], [49.29756160639724, -12.29235683943095]]
}];

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};


L.geoJSON(myLines, {
    style: myStyle
}).addTo(map);
*/


//L.geoJSON(myLines).addTo(map);


//marker = L.marker([lat,lon]).addTo(map);
//Ajout d'un marqueur de localisation....


//L.marker([-12.29235683943095,49.29756160639724]).addTo(map);

//setNewCoordonneeMarker(-12.29235683943095,49.29756160639724);

//alert("Type marker:"+typeof marker);

export function setNewCoordonneeMarker(lati,longi)
{

marker.remove(map);

//on supprimer l'ancien marker.

marker=L.marker([lati,longi]).addTo(map);

//Et on ajoute à nouveau.

map.setView([lati,longi],zoomState);
}
