//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
import {setNewCoordonneeMarker} from './markerMove.js';

var checkSound=false;

var checkRepetitionCycle=true;

var pathDirectoryAudioSever="other/alert/";


var durationLaunchCycleAudio=15;
//La durée d'un cyle d'alert. ça veut dire que l'audio se lance pendant 15 secondes 
//et après il se met à stop en attendant (audioAlertRepetition) secondes

var timesWaitGetDataBdd=2;
//La requete à la base s'éffectue tous les 2 secondes.


var mySound;



function startSound() 
{
    /*        Afficher l'animation sur la partie navbar et changer la classe pour dire que le font audio doit être allumé       */

    mySound.play();
    checkSound=true;
    startAnimation();
    console.log("Son lancé. ");

}

function stopSound() 
{
    /*        Stoper l'animation et changer la classe pour dire que le font audio n'est pas allumé      */

    mySound.pause();
    checkSound=false;
    stopAnimation();
    console.log("Son stopé. ");

}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

var ex = document.getElementsByClassName('valueUnity');


/*async obliger pour retourner une récursivité combiné avec (await) sur sleepProgramm*/

export async function synchroneInformationAndAlertAudio(repetitionAudioAlertE,limiteVitesseE,heureUtcE,nameAudioGetE,instanceBoolE) 
{

    console.log("lancement sync");

    var repetitionAudioAlertI=repetitionAudioAlertE;
    var limiteVitesseI=limiteVitesseE;
    var heureUtcI=heureUtcE;
    var nameAudioGetI=nameAudioGetE;
    var instanceBoolI=instanceBoolE;

    /*Verifier déjà si on a instancié un autre sound*/

    if(instanceBoolI==false)
    {
      mySound=document.createElement("audio");
      mySound.setAttribute("preload", "auto");
      mySound.setAttribute("controls", "none");

      mySound.src = pathDirectoryAudioSever+nameAudioGetI;
      mySound.setAttribute("loop", "true");
                  //Autoriser audio en boucle.

      mySound.style.display = "none";
      document.body.appendChild(mySound);
    }

    //if(checkSound==false)
    //{

          $.ajax(
              {
                  type: "POST",
                  url: "php/getOsmByBDD.php"
              }).done( async function (result) 
              {
                  if(result.length>0)
                  {
			//On met à jour la postition, càd la carte.
			setNewCoordonneeMarker(JSON.parse(result).latitude,JSON.parse(result).longitude);

                      for (var i = 0; i<ex.length; i++) 
                      {

                          if(ex[i].getAttribute('name')=="Date")
                          {
                            /*&nbsp;10/09/2022*/
                            ex[i].innerHTML='&nbsp;&nbsp;'+JSON.parse(result).jour+'/'+JSON.parse(result).mois+'/'+JSON.parse(result).annee;
                          }
                          else if(ex[i].getAttribute('name')=="Horaire")
                          {
                            /*&nbsp;&nbsp;10h&nbsp;20m&nbsp;30s*/
                            //ex[i].innerHTML="&nbsp;&nbsp;"+JSON.parse(result).heure+"h"+JSON.parse(result).minute+"m"+JSON.parse(result).seconde+"s";

			    //13:10:00

			    //ex[i].innerHTML="&nbsp;&nbsp;"+getHourUTC(JSON.parse(result).heure,heureUtcI)+"h"+JSON.parse(result).minute+"m"+JSON.parse(result).seconde+"s";

			    ex[i].innerHTML="&nbsp;&nbsp;"+getHourUTC(JSON.parse(result).heure,heureUtcI);

			    //console.log("heure get : "+JSON.parse(result).heure);

                          }
                          else if(ex[i].getAttribute('name')=="LatitudePosition")
                          {
                            /*&nbsp;&nbsp;&nbsp;&nbsp;49.5986&nbsp;&nbsp;&nbsp;&nbsp;<span class="unity">°</span>*/
                            ex[i].innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+JSON.parse(result).latitude+"&nbsp;&nbsp;&nbsp;&nbsp;<span class='unity'>°</span>";
                          }
                          else if(ex[i].getAttribute('name')=="LongitudePosition")
                          {
                            /*&nbsp;&nbsp;&nbsp;-12.9689&nbsp;&nbsp;&nbsp;&nbsp;<span class="unity">°</span>*/
                            ex[i].innerHTML="&nbsp;&nbsp;&nbsp;"+JSON.parse(result).longitude+"&nbsp;&nbsp;&nbsp;&nbsp;<span class='unity'>°</span>";
                          }
                          else if(ex[i].getAttribute('name')=="AltitudePosition")
                          {
                            /*&nbsp;&nbsp;&nbsp;&nbsp;200&nbsp;&nbsp;&nbsp;*/
                            ex[i].innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+JSON.parse(result).altitude+"&nbsp;&nbsp;&nbsp;";
                          }
                          else if(ex[i].getAttribute('name')=="Vitesse")
                          {
                            /*&nbsp;&nbsp;&nbsp;100&nbsp;&nbsp;&nbsp;*/
                          ex[i].innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+JSON.parse(result).vitesse+"&nbsp;&nbsp;&nbsp;";
                              
                              /*        Tester la restriction sur la vitesse.       */

                              if(parseInt(JSON.parse(result).vitesse)>parseInt(limiteVitesseI))
                              {
                                  if(checkSound==false)
                                  {
                                      if(checkRepetitionCycle==true)
                                      {
                                        
                                        startSound();

                                        //console.log("Son lancé pour "+durationLaunchCycleAudio+"seconde");

                                        /*durationLaunchCycleAudio est la durée de lancement du son avant de la stopper.*/
                                        
                                        /*donc logiquement, si on a mis 10 secondes, le son se lance pendant 10 secondes pour 
                                        être stopé après et d'être relancé directement si la vitesse du véhicule ne change pas. */

                                        await sleepProgramm(durationLaunchCycleAudio*1000); 

                                        //console.log("Son terminé après "+durationLaunchCycleAudio+"seconde");

                                        stopSound();

                                        checkRepetitionCycle=false;

                                        setRepetition(repetitionAudioAlertI);

                                        //console.log("ValIII fin "+checkRepetitionCycle);


                                        return synchroneInformationAndAlertAudio(repetitionAudioAlertI,limiteVitesseI,heureUtcI,nameAudioGetI,true);


                                      }
                                      else
                                      {
                                        console.log("return 2");
                                        await sleepProgramm(timesWaitGetDataBdd*2000);
                                        return synchroneInformationAndAlertAudio(repetitionAudioAlertI,limiteVitesseI,heureUtcI,nameAudioGetI,true);
                                      }
                                  }
                                  else
                                  console.log("Son déjà lancé. ");
                              }

                              else
                              {

                                  console.log("Vitesse inférieur");
                                  if(checkSound==true)
                                  {
                                  
                                  stopSound(); 
                                  }
                                  await sleepProgramm(timesWaitGetDataBdd*2000);
                                  return synchroneInformationAndAlertAudio(repetitionAudioAlertI,limiteVitesseI,heureUtcI,nameAudioGetI,true); 
                                       
                              }
                          }

                      }
                  
                  }
                  else
                  {
                    console.log("Error AJAX");
                  }
              });

    //}        
      

      //setTimeout(synchroneInformationAndAlertAudio,5000);
      //Repeter la requete AJAX touts les 4 secondes cad la recuperation des informations via la BDD. 
      //Une fonction de récursivité.

/*      console.log("Before sleepProgramm. ");

      await sleepProgramm(5000);

      console.log("After 5 secondes après sleepProgramm. ");

      //console.log("Code after sleep . ");

      return synchroneInformationAndAlertAudio(repetitionAudioAlertI,limiteVitesseI,heureUtcI,nameAudioGetI,true);*/

}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function setRepetition(timeE) 
{
    //console.log ("Set repetition. "+timeE*1000);
    //Cette fonction attend (timeE) secondes pour pouvoir mettre checkRepetitionCycle sur true 
    //Donc valider une nouvelle fois le cycle de répetition d'audio tant que le véhicule n'a pas changé de vitesse.
    sleepProgramm(timeE*1000).then( () => { checkRepetitionCycle=true } );
}

function startAnimation() 
{
  $("#containerAlert").css("animation-name", "alertAnimation");
  $("#containerAlert").children("i").attr('class', 'fas fa-volume-up');
}
function stopAnimation() 
{
  $("#containerAlert").css("animation-name", "");
  $("#containerAlert").children("i").attr('class', 'fas fa-volume-off');
}

function getHourUTC(hoursEnter,UTC) 
{

    var sortiHours="";

    var castValue=hoursEnter.split(':');


    if(UTC=="UTC+1")
    {
      sortiHours=parseInt(castValue[0])+1;
    }
    else if(UTC=="UTC+2")
    {
      sortiHours=parseInt(castValue[0])+2;
    }
    else if(UTC=="UTC+3")
    {
      sortiHours=parseInt(castValue[0])+3;
    }
    else
    {
      console.log("UTC not defined");
      return hoursEnter;
    }

    return ""+sortiHours+":"+castValue[1]+":"+castValue[2];

}

function sleepProgramm(timeMs) 
{
    return new Promise(resolve=>setTimeout(resolve,timeMs));
}
