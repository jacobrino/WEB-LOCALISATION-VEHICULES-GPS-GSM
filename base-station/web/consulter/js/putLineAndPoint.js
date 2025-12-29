import {updateLineHistory,updateDecalage,updatetabCircle} from './addFunctionnality.js';
import {getDecalage} from './eventRange.js';

var lineHistory='';

var rayonCouverture=25;//en mètres.

var tabCircle=[];

var zoomState=15;

var decalage=1;

//On a choisi d'exporter putLineHistory car une fois l'event range déclenché, on met à jour les lignes.
export function putLineHistory(boolInitialise,jSONData,map) 
{
    var temps=[];
    var xTab;

    decalage=getDecalage();

    console.log("decalage get LINE : "+decalage);

    updateDecalage(decalage);


    //GET COLOR BY SPAN LINE IN THE CARTE
//    convertRGBToDecimal($('#colorLigne').css('background-color'));
    
    var styleLine = {
    "color": convertRGBToDecimal($('#colorLigne').css('background-color')),
    "weight": 3,
    "opacity": 0.65
    };
    //Sur color, il faut recuperer celle de span responsable qui est #colorLigne.

    //[49.30646125190471, -12.277915726435381]
    //Longitude avant

    for (var i = 0; i < jSONData.length; i=i+decalage) 
    {
        xTab=[jSONData[i]["longitude"],jSONData[i]["latitude"]];
        temps.push(xTab);
    }

    //ALERT DONT MISS TO PUT THE LAST COORDINATION IN THE LINE SUCH AS "jSONData.length-1"
    temps.push([jSONData[jSONData.length-1]["longitude"],jSONData[jSONData.length-1]["latitude"]]);

    //Une fois les coordonnées supperposés dans temps.
    //On déclare lines et on affiche sur map les valeurs.

    var lines = [{ "type": "LineString", "coordinates": temps}];


    if(boolInitialise)
    {
        //lineHistory.remove(map);
        deleteAllLine();
        //Si on a déjà mis des lignes, il faut les enlever en avant.
    }


    lineHistory=L.geoJSON(lines, {
        style: styleLine
    }).addTo(map);


    updateLineHistory(lineHistory); 

    //[49.30646125190471, -12.277915726435381]

    //setView need a lat in thirst.
    //reverser donc le dernier élement du tableau .
    //[49.30646125190471, -12.277915726435381] devient [-12.277915726435381,49.30646125190471]

    map.setView([jSONData[jSONData.length-1]["longitude"],jSONData[jSONData.length-1]["latitude"]].reverse(),zoomState);
    //Afficher la vue de la carte sur le dernier coordonnee mis.
}

export function putPointHistory(boolAlready,jSONData,map) 
{
    //var popupTemps;
    //var contentPopUp='';
    

    console.log("decalage get POINT : "+decalage);

    var styleCircle = {
    "color": convertRGBToDecimal($('#colorPoint').css('background-color')),
    "weight": 1,
    "opacity": 1
    };

    if(boolAlready)
    {
        //****si on a déjà mis des points*****
        //Supprimer tous les points sur la carte.
        deleteAllPoint();

    }

    decalage=getDecalage();

    updateDecalage(decalage);

    //Il faut d'abord supprimer les anciens pointes avec les anciens decalages définies.
    

    for (var i = 0; i < jSONData.length; i=i+decalage) 
    {
        
        //console.log("heure : "+jSONData[i]["heure"]);
        
        finaliseAllPoint(map,i,jSONData,styleCircle);
    
    }

    //ALERT DONT MISS TO PUT THE LAST COORDINATION IN THE POINT SUCH AS "jSONData.length-1"

    finaliseAllPoint(map,jSONData.length-1,jSONData,styleCircle);
    updatetabCircle(tabCircle); 

}

export function deleteAllPoint() 
{
    //Supprimer tous les points sur la carte.

    console.log("decalage deleteAllPoint. "+decalage);


        for (var i = 0; i < tabCircle.length; i++) 
        {
            try
            {
                tabCircle[i].remove(map);
            } 
            catch (e) 
            {
              console.log("errorDelePoint");
            }

        }

        //Ensuite, vider le tableau.
        tabCircle=[];
}

export function deleteAllLine()
{
    console.log("All line removed.");
    lineHistory.remove(map);
}

function RGBToHex(r,g,b) 
{
  r = parseInt(r).toString(16);
  g = parseInt(g).toString(16);
  b = parseInt(b).toString(16);

  if (r.length == 1)
    r="0"+r;
  if (g.length == 1)
    g="0"+g;
  if (b.length == 1)
    b="0"+b;

  return "#"+r+g+b;
}

function convertRGBToDecimal(enter) 
{
    /*Convert RGB to decimal from syntax rgb(255, 12, 0) */
    /*      rgb(255, 12, 0)     */

    var castValue;

    enter=enter.replace('rgb','').replace('(','').replace(')','').replace(' ','');

    //alert("sorti après split "+enter);

    castValue=enter.split(',');

    return RGBToHex(castValue[0],castValue[1],castValue[2]); 
}
function finaliseAllPoint(map,indexPosition,jSONData,styleCircle) 
{
    var contentPopUp="<span>Heure : "+"<i>"+jSONData[indexPosition]["heure"]+"</i></span>"+"<br><br><span>Vitesse : "+"<i>"+jSONData[indexPosition]["vitesse"]+" km/h</i></span>";
    var popupTemps = L.popup()   
       .setContent(contentPopUp);
        //
        tabCircle[indexPosition]=L.circle([jSONData[indexPosition]["latitude"],jSONData[indexPosition]["longitude"]],{radius:rayonCouverture})
        .bindPopup(popupTemps)
        .on("mouseover", function(e) {
            //console.log("Put popup");
            this.openPopup();
        })  
        .on("mouseout", function(e) {
            //console.log("quitte le point.");
            //popupTemps.remove(map);
            this.closePopup()
        })
        .addTo(map);

        tabCircle[indexPosition].setStyle(styleCircle);
}