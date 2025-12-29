var titreCarte="Carte OSM";
var nomVehicule="Véhicule";
var audioChecked="option0";
var limiteVitesse="100";
var heureArretAutomatique="none";
var repetitionAudioAlert="15";
var heureUtc="UTC+3";

var fondPlatforme="#212529";
var policePlatforme="#fff";
var fondTitreInformation="#859599";
var policeTitreInformation="#0a0000";
var fondInformation="#cdecff";
var logoVehicule="#011800";
var logoInformation="#3f2b12";
var valeurInformation="black";


$('#defaultConfig').on("click", function () 
{
  
          var exInput = document.querySelectorAll("input");
          for (var i = 0; i<exInput.length; i++) 
          {
              if(exInput[i].name=="TitreCarte")
              {
                  exInput[i].value=titreCarte;
              }
              else if(exInput[i].name=="NomVehicule")
              {
                  exInput[i].value=nomVehicule;
              }
              else if(exInput[i].name=="AudioCheck")
              {
                  setCheckedAudio(audioChecked); 
                  
              }
              else if(exInput[i].name=="LimiteVitesse")
              {
                  exInput[i].value=limiteVitesse;
              }
              else if(exInput[i].name=="HeureArretAutomatique")
              {
                
                //exInput[i].value=heureArretAutomatique;

                //Lorsqu'on clicque sur le boutton défaut, on désactive le switch, ensuite, on cache le div responsable d'heure. 
              
                //Si c'est none... il faut desactiver le switch.

                $('#divHeureArretAutomatique').css('display','none');

                            
                $("#switchActiver").prop( "checked", false );

              }
          }


          var selectOption=document.querySelectorAll('select');

          for (var i = 0; i < selectOption.length; i++) 
          {
              if(selectOption[i].name=="RepetitionAudioAlert")
              {
                  selectOption[i].value=repetitionAudioAlert; 
              }
              else if(selectOption[i].name=="HeureUtc")
              {
                  selectOption[i].value=heureUtc;

              }
          }

            var spanColor=document.querySelectorAll('span');
            for (var i = 0; i < spanColor.length; i++) 
            {
                if($(spanColor[i]).attr('name')=="FondPlatforme")
                {
                  $(spanColor[i]).css('background-color',fondPlatforme);                    
                }
                else if($(spanColor[i]).attr('name')=="PolicePlatforme")
                {
                  $(spanColor[i]).css('background-color',policePlatforme);
                }
                else if($(spanColor[i]).attr('name')=="FondTitreInformation")
                {
                  $(spanColor[i]).css('background-color',fondTitreInformation); 
                }
                else if($(spanColor[i]).attr('name')=="PoliceTitreInformation")
                {
                  $(spanColor[i]).css('background-color',policeTitreInformation); 
                }
                else if($(spanColor[i]).attr('name')=="FondInformation")
                {
                  $(spanColor[i]).css('background-color',fondInformation); 
                }
                else if($(spanColor[i]).attr('name')=="LogoVehicule")
                {
                  $(spanColor[i]).css('background-color',logoVehicule); 
                }
                else if($(spanColor[i]).attr('name')=="LogoInformation")
                {
                  $(spanColor[i]).css('background-color',logoInformation); 
                }
                else if($(spanColor[i]).attr('name')=="ValeurInformation")
                {
                  $(spanColor[i]).css('background-color',valeurInformation); 
                }

            }  

}
);

function setCheckedAudio(valueEnter) 
{
  // option1  retour de audio stocker dans les cockies.

  var inputAudio=document.querySelectorAll('input');

  for (var i = 0; i < inputAudio.length; i++) 
  {
      /*inputAudio*/
      if($(inputAudio[i]).attr('value')==valueEnter)
      {
          /*$(inputAudio[i]).parent( ".tdRadioBox" )*/


          inputAudio[i].checked=true;;          

      }
  }


}
