import {putLineHistory,putPointHistory,deleteAllPoint,deleteAllLine} from './putLineAndPoint.js';
import {getBoolInitialise,getJSONData,getMap} from './showMaps.js';




/*                  LOGIQUE LIES A L'AFFICHAGE DES COORDONNES

RANGE       0       DECALAGE    0 (afficher tout)
RANGE       1       DECALAGE    2 (afficher coordonéees séparer de 2 entités)
RANGE       2       DECALAGE    4 (afficher coordonéees séparer de 4 entités)
RANGE       3       DECALAGE    6 (afficher coordonéees séparer de 6 entités)
RANGE       4       DECALAGE    8(afficher coordonéees séparer de 8 entités)
RANGE       5       DECALAGE    10(afficher coordonéees séparer de 10 entités)

*/

/*		RANGE SHOWING LINE		*/


/*			AFFICHER VALEUR $("#rangeAffichage").val()		*/

var decalage=1;

$("#rangeAffichage").on("change", function() 
{

	var rangeGet=parseInt($("#rangeAffichage").val());

	if(rangeGet==0&&getBoolInitialise())
	{
		decalage=1;
		updateLineAndPointByRange();

	}
	else if(rangeGet==1&&getBoolInitialise())
	{
		decalage=rangeGet*2;
		updateLineAndPointByRange();
	}
	else if(rangeGet==2&&getBoolInitialise())
	{
		decalage=rangeGet*2;
		updateLineAndPointByRange();
	}
	else if(rangeGet==3&&getBoolInitialise())
	{
		decalage=rangeGet*2;
		updateLineAndPointByRange();
	}
	else if(rangeGet==4&&getBoolInitialise())
	{
		decalage=rangeGet*2;
		updateLineAndPointByRange();
	}
	else if(rangeGet==5&&getBoolInitialise())
	{
		decalage=rangeGet*2;
		updateLineAndPointByRange();
	}


});

export function getDecalage()
{
	console.log("decalage return : "+decalage);
	return decalage;
}

function updateLineAndPointByRange() 
{
		deleteAllLine();
        deleteAllPoint();
        putLineHistory(getBoolInitialise(),getJSONData(),getMap());
        putPointHistory(getBoolInitialise(),getJSONData(),getMap());
}