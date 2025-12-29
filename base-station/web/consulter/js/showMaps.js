import {showFunctionnality} from './addFunctionnality.js';
import {putLineHistory,putPointHistory,deleteAllPoint,deleteAllLine} from './putLineAndPoint.js';

var lat = -12.285;
var lon = 49.3081;

var zoomState=15;

var date="",time1="",time2="",range="";

var map;

var jSONData;

var alreadyInitialise=false;


/*                  LOGIQUE LIES A L'AFFICHAGE DES COORDONNES

RANGE       0       DECALAGE    0 (afficher tout)
RANGE       1       DECALAGE    2 (afficher coordonéees séparer de 2 entités)
RANGE       2       DECALAGE    4 (afficher coordonéees séparer de 4 entités)
RANGE       3       DECALAGE    6 (afficher coordonéees séparer de 6 entités)
RANGE       4       DECALAGE    8(afficher coordonéees séparer de 8 entités)
RANGE       5       DECALAGE    10(afficher coordonéees séparer de 10 entités)

*/


$('#bouttonShow').on('click',function() 
{

    if(stateValidity())
    {
            
        $.when(lancerAjaxGetOsm()).done(function (result) 
        {
               //alert("Reponse bdd from php."+result);
                if(result.includes('dataMiss'))
                {
                    alert("Erreur server .");
                }
                else if (result.includes("coordonneIntrouvable"))
                {
                    alert("Aucun trajet disponible pour l'information entrer. ");

                    //Mettez à vide tous les valeurs de chaque composants.

                    if(alreadyInitialise)
                    {
                        //console.log("supp ICIXXXX");
                        

                        //lineHistory.remove(map);
                        deleteAllLine();
                        

                        deleteAllPoint();
                        alreadyInitialise=true;
                    }
                    else
                    alreadyInitialise=false;

                }
                else
                {
                    //Celà veut dire qu'on a une réponse valide...
                    //Il faut donc afficher le trajet du véhicule.

                    jSONData=JSON.parse(result);

                    //x[0]["latitude"]
                    //0 Pour recuperer la valeur premier contenue du premier tableau JSON by php.
                    initialiseMap(lat,lon,jSONData);

                }
        });

    }

})



function inputIsValid(inputObject) 
{
    if(inputObject.validity.valid)
    return true;
    else
    return false;
}
function stateValidity()
{
    var exInput = document.querySelectorAll("input");

    for (var i = 0; i<exInput.length; i++) 
    {
        if(exInput[i].name=="Date")
        {
            if(!inputIsValid(exInput[i]))
            return false;
            else
            date=exInput[i].value;   
        }
        else if(exInput[i].name=="Time1")
        {
            if(!inputIsValid(exInput[i]))
            return false;
            else
            time1=exInput[i].value;
        }
        else if(exInput[i].name=="Time2")
        {
            if(!inputIsValid(exInput[i]))
            return false;
            else
            time2=exInput[i].value;
        }
        else if(exInput[i].name=="NiveauAffichage")
        {
            if(!inputIsValid(exInput[i]))
            return false;
            else
            range=exInput[i].value;
        }
    }

    return true;
}

function lancerAjaxGetOsm() 
{
    return $.ajax(
    {
        type: "POST",
        url: "php/getOsmFromBdd.php",
        data:getJsonAllInput()
    });
}

function getJsonAllInput() 
{

    //      date="2022-11-22",time1="12:00",time2="12:00",range="4"

    var castDate=date.split('-');
    
    //castDate[0]---->annee
    //castDate[1]---->mois
    //castDate[2]---->jour
    
    //alert("Time before send: "+time1+"\n"+time2);

    const json = '{"'+'annee'+'":'+'"'+castDate[0]+'"'+', "'+'mois'+'":'+'"'+castDate[1]+'"'+
    ', "'+'jour'+'":'+'"'+castDate[2]+'"'+', "'+'heure1'+'":'+'"'+time1+'"'+
    ', "'+'heure2'+'":'+'"'+time2+'"'+', "'+'range'+'":'+'"'+range+'"'+'}';   

    return JSON.parse(json);

}

function initialiseMap(latitude,longitude,jSONData) 
{


    if(!alreadyInitialise)
    {
        $("#map").show();

        //console.log("Ici create wap.");

        map = L.map('map').setView([latitude,longitude],zoomState);
        //Initialisation de la carte avec un coordonnée par défaut.
        //Et aussi le niveau de zoom qui est 15.

        //var map = L.map('map').setView([latitude,longitude],8);26
        var tilePlayer=L.tileLayer('http://localhost/hot/{z}/{x}/{y}.png',
        {
        attribution:'Ds Informatique',minZoom:5,maxZoom:20
        }).addTo(map);

        //Afficher les échelles d'altitudes, direction nord, et les deux couleurs de Lignes et Points et aussi lancer l'évenement couleur sur addFunctionnality,
        showFunctionnality(map);

        putLineHistory(alreadyInitialise,jSONData,map);

        putPointHistory(alreadyInitialise,jSONData,map);

        alreadyInitialise=true;

    }
    else
    {
        putLineHistory(alreadyInitialise,jSONData,map);
        putPointHistory(alreadyInitialise,jSONData,map);

        alreadyInitialise=true;

    }

}

export function getBoolInitialise() 
{
    return alreadyInitialise;
}

export function getJSONData() 
{
    return jSONData;
}

export function getMap() 
{
    return map;
}


//On a choisi d'exporter putPointHistory car une fois l'event range déclenché, on change à nouveau le point.
