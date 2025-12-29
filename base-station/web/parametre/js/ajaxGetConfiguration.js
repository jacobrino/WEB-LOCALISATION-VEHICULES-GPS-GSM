export function setDefaultConfiguration()
{

  $.ajax(
      {
        type: "POST",
        url: "../parametre/php/getDataFromCockies.php",
      }).done(function (result) 
      {

        if(result.length>0 && result.includes("oneOfCoockieNotFound")==false)
        {

          var inputCockies=JSON.parse(result);
  
          var exInput = document.querySelectorAll("input");
          for (var i = 0; i<exInput.length; i++) 
          {
              if(exInput[i].name=="TitreCarte")
              {
                  exInput[i].value=inputCockies.titreCarte;
              }
              else if(exInput[i].name=="NomVehicule")
              {
                  exInput[i].value=inputCockies.nomVehicule;
              }
              else if(exInput[i].name=="AudioCheck")
              {
                  /*exInput[i].value=inputCockies.audioChecked; */
                  /*    A CODER   */

                  setCheckedAudio(inputCockies.audioChecked); 
              }
              else if(exInput[i].name=="LimiteVitesse")
              {
                  exInput[i].value=inputCockies.limiteVitesse;
              }
              else if(exInput[i].name=="HeureArretAutomatique")
              {

                if(inputCockies.heureArretAutomatique.includes("none"))
                {
                    //Si c'est none... il faut desactiver le switch.
                    $("#switchActiver").prop( "checked", false );

                    $('#divHeureArretAutomatique').css('display','none');
                }
                else
                {
                    $("#switchActiver").prop( "checked", true );
                    exInput[i].value=inputCockies.heureArretAutomatique;

                    $('#divHeureArretAutomatique').css('display','block');
                }
              


              }
          }


          var selectOption=document.querySelectorAll('select');

          for (var i = 0; i < selectOption.length; i++) 
          {
              if(selectOption[i].name=="RepetitionAudioAlert")
              {
                  selectOption[i].value=inputCockies.repetitionAudioAlert; 
              }
              else if(selectOption[i].name=="HeureUtc")
              {
                  selectOption[i].value=inputCockies.heureUtc;

              }
          }

            var spanColor=document.querySelectorAll('span');
            for (var i = 0; i < spanColor.length; i++) 
            {
                //alert("boucle");
                if($(spanColor[i]).attr('name')=="FondPlatforme")
                {
                  $(spanColor[i]).css('background-color',inputCockies.fondPlatforme);                    
                }
                else if($(spanColor[i]).attr('name')=="PolicePlatforme")
                {
                  $(spanColor[i]).css('background-color',inputCockies.policePlatforme);
                }
                else if($(spanColor[i]).attr('name')=="FondTitreInformation")
                {
                  $(spanColor[i]).css('background-color',inputCockies.fondTitreInformation); 
                }
                else if($(spanColor[i]).attr('name')=="PoliceTitreInformation")
                {
                  $(spanColor[i]).css('background-color',inputCockies.policeTitreInformation); 
                }
                else if($(spanColor[i]).attr('name')=="FondInformation")
                {
                  $(spanColor[i]).css('background-color',inputCockies.fondInformation); 
                }
                else if($(spanColor[i]).attr('name')=="LogoVehicule")
                {
                  $(spanColor[i]).css('background-color',inputCockies.logoVehicule); 
                }
                else if($(spanColor[i]).attr('name')=="LogoInformation")
                {
                  $(spanColor[i]).css('background-color',inputCockies.logoInformation); 
                }
                else if($(spanColor[i]).attr('name')=="ValeurInformation")
                {
                  $(spanColor[i]).css('background-color',inputCockies.valeurInformation); 
                }

            }

        }
        else if(result.includes("oneOfCoockieNotFound"))
        {
          console.log("oneOfCoockieNotFound");
          return;
        }
        else
        {
          console.log("Error AJAX");
        }

      });


}

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