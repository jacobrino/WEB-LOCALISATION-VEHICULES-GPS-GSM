import {synchroneInformationAndAlertAudio} from './event.js';
import {initialiseMapView} from './markerMove.js';

initialiseMapView();
//Afficher la carte pour la première fois.


//Une fois qu'on a appuiyer sur button parametre.
$('#toggleOption').on("click", function () 
{
	//rediriger vers parametre.
	changeUrlToParametre();
}
);


/*toggleOption*/


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

/*APPLIQUER LES COULEURS SUR LES COMPOSANTS ET CHARGER LES PARAMETRES COMME TITRE CARTE TITRE VEHICULE



*SOIT VENANT DES COOCKIES
*AU CAS OU UNE DES COCKIES ABSENT ON CHARGE LES PAR DEFAUT CI-DESSOUS(ILLOGIQUE) 
Car la condition au début sur php renvoie directement sur la page de parametre.
*/

var titreCarte="Carte OSM",nomVehicule="Toyxota",audioChecked="option0",repetitionAudioAlert="10",
heureUtc="UTC+2",limiteVitesse="100", heureArretAutomatique="none";


var colorFondPlatforme="#212529";
var colorPolicePlatforme="#fff";
var colorFondTitreInformation="#859599";
var colorPoliceTitreInformation="#0a0000";
var colorFondInformation="#cdecff";
var colorLogoVehicule="#011800";
var colorLogoInformation="#3f2b12";
var colorValeurInformation="black";


var nameAudioGet="DEFAULT";

			$.ajax(
		    {
		    type: "POST",
		    url: "php/getCockiesInformation.php"
		    }).done(function (result) 
		    {
			    if(result.length>0 && result.includes("oneOfCoockieNotFound")==false)
			    {
				    var xJSON=JSON.parse(result);

			        titreCarte=xJSON.titreCarte;
			        nomVehicule=xJSON.nomVehicule;
			        audioChecked=xJSON.audioChecked;
			        repetitionAudioAlert=xJSON.repetitionAudioAlert;
			        heureUtc=xJSON.heureUtc;
			        limiteVitesse=xJSON.limiteVitesse;
			        heureArretAutomatique=xJSON.heureArretAutomatique;

			        colorFondPlatforme=xJSON.fondPlatforme;
					colorPolicePlatforme=xJSON.policePlatforme;
					colorFondTitreInformation=xJSON.fondTitreInformation;
					colorPoliceTitreInformation=xJSON.policeTitreInformation;
					colorFondInformation=xJSON.fondInformation;
				
					colorLogoVehicule=xJSON.logoVehicule;
					colorLogoInformation=xJSON.logoInformation;
					colorValeurInformation=xJSON.valeurInformation;

					console.log("Color and Configuration get by coockies");


					/*Modification titreCarte*/
					$('title').html(titreCarte);

					/*Modification nomVehicule*/
					$('#nomVehicule').html(nomVehicule);


					//alert("audioChecked : "+audioChecked);
					//RECUPERER SOURCE AUDIO A TRAVERS VALUE
					//OK by lancerAjaxGetSourceAudio

					//repetitionAudioAlert
					//DEJA OK PASSER EN PARAMETRE

					//heureUtc=xJSON.heureUtc;	
					//DEJA OK PASSER EN PARAMETRE avec la fonction getHourUTC

					
					/*		heureArretAutomatique	*/
					/*requete ajax pour envoyer un code sonde pour executer le script via php*/
					//DEJA OK
					lancerAjaxHeureArretAutomatiqueViaPhp();	


					/*Une fois la requete de recupere audio terminé, on lance maintenant l'AJAX principale en 
					le passant comme parametre
					*/
					$.when(lancerAjaxGetSourceAudio(audioChecked)).done(function (result) 
					{
						if(result.length>0&&result.includes("errorGetASourceAudioName")==false)
						{
							nameAudioGet=result;

							//alert("xGet ici:"+nameAudioGet);

							//console.log("nameAudio : "+nameAudioGet);

							/*ON LANCE ICI LES AUTRES REQUETES QUI NECESSITE le nom de l'audio*/


							synchroneInformationAndAlertAudio(repetitionAudioAlert,limiteVitesse,heureUtc,nameAudioGet,false);
							
							//On lance donc une requete AJAX synchrone venant de event pour recuperer tous les informations via
							//Bdd qui est dispo en temps réelle.

						}
						else
						{
							console.log("errorGetASourceAudioName");
						}
					});
		 

					/*FOND PLATFORME*/
					definirMiseEnFormeCouleur();

			    }
			    else
			    {
			    	console.log("Error GETCOCKIES for COLOR");

			     	/*CHARGER LES CONFIGS PAR DEFAUT*/

			    	definirMiseEnFormeCouleur() 
			    }
		     });


	function definirMiseEnFormeCouleur() 
	{
		$('#containerAlert').css('background-color',colorFondPlatforme);
		$('#contenueWeb').css('background-color',colorFondPlatforme);

		/*POLICE PLATFORME*/
		$('#containerAlert').css('color',colorPolicePlatforme);
		$('.navbarToggle').css('color',colorPolicePlatforme);

		/*FOND TITRE INFORMATION*/
		$('.card-title').css('background-color',colorFondTitreInformation);

		/*POLICE TITRE INFORMATION*/
		$('.card-title').css('color',colorPoliceTitreInformation);

		/*FOND INFORMATION*/
		$('.card[name]').css('background-color',colorFondInformation);

		/*LOGO VEHICULE*/
		$('#cardTitle').css('color',colorLogoVehicule);
		console.log("logoVehicule seting: "+colorLogoVehicule);


		/*LOGO INFORMATION*/
		$('.logoUnity').css('color',colorLogoInformation);

		/*LOGO VALEUR INFORMATION*/
		$('.valueUnity').css('color',colorValeurInformation);
	}
			
	function lancerAjaxHeureArretAutomatiqueViaPhp() 
	{
		$.ajax(
		{
			type: "POST",
			url: "php/shutdownOS.php",
			data:{heureArretAutomatique:heureArretAutomatique}
		}).done(function (result) 
		{
			if(result.includes("cmdExecuted"))
			console.log("Heure d'arret automatique définie à : "+heureArretAutomatique);
			else
			console.log("heureArretAutomatique not defined");
		});
	}


	function lancerAjaxGetSourceAudio(nameValueAudio) 
	{
		return $.ajax(
		{
			type: "POST",
			url: "php/getSourceAudioNameByValue.php",
			data:{nameValueAudio:nameValueAudio}
		});
	
	}

	function changeUrlToParametre() 
	{
	window.location.href = "../parametre";//Veut dire qu'on redirige la nouvelle url vers osm.}
	}
