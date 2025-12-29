var titreCarte="",nomVehicule="",audioChecked="",repetitionAudioAlert="",heureUtc="",
    fondPlatforme="",policePlatforme="",fondTitreInformation="",policeTitreInformation="",
    fondInformation="",logoVehicule="",logoInformation="",valeurInformation="", limiteVitesse="", heureArretAutomatique="";

export function stateValidity() 
{
    /*Tester au début si un fichier audio a été importer, si non, retourne false demander de compléter le formulaire*/

    if((""+$("input[name=AudioCheck]").html()).includes("undefined")==true)
    return false;


    var exInput = document.querySelectorAll("input");

    for (var i = 0; i<exInput.length; i++) 
    {
        
        if(exInput[i].name=="TitreCarte")
        {
            if(inputIsValid(exInput[i]))
            {
                titreCarte=exInput[i].value;
                //alert("Titre recup : "+titreCarte);
                //OK
            }
            else
            {
                return false;
            } 
        }
        else if(exInput[i].name=="NomVehicule")
        {
            if(inputIsValid(exInput[i]))
            {
                nomVehicule=exInput[i].value;
            }
            else
            {
                return false;
            } 
        }
        else if(exInput[i].name=="AudioCheck")
        {
            console.log("AudioCheck html existe");
            if(inputIsValid(exInput[i]))
            {

                //getRadioCheck permet de selectionner qui est la radio box d'un input seléctionner par l'utilisateur 
                //à travers value.

                /*    TESTER DONC SI CETTE VALEUR HTML d'audio EXISTE?? SINON CA MET EN PERIL LA VALIDITE DE NOS COMPOSANTS     */
                /*METTRE EN PREMIERE POSITION LA CONDITION DE VERIFIER ELLE EXISTE OU PAS*/

                //OK

                audioChecked=getRadioCheck("AudioCheck").value;
                /*UNE FOIS VALIDER ON RECUPER LE RADIO CHECKER A TRAVERS LE NOM*/
            }
            else
            {
                return false;
            } 
        }
        else if(exInput[i].name=="LimiteVitesse")
        {
            if(inputIsValid(exInput[i]))
            {
                limiteVitesse=exInput[i].value;
            }
            else
            {
                return false;
            } 
        }

        else if(exInput[i].name=="HeureArretAutomatique")
        {

            //On teste d'abord si le switch heureArretAutomatique est activer, sinon, on le fait rien.

            if ($('#switchActiver').is(':checked')) 
            {
                if(inputIsValid(exInput[i]))
                {
                    heureArretAutomatique=exInput[i].value;
                }
                else
                {
                    return false;
                }
            }
            
        }

    }

    repetitionAudioAlert = document.getElementsByName("RepetitionAudioAlert")[0].value;
    heureUtc= document.getElementsByName("HeureUtc")[0].value;


    /*RECUPERER span name 'FondPlatforme', des couleurs*/


    var exSpan = document.querySelectorAll("span");

    for (var i = 0; i<exSpan.length; i++) 
    {
        if($(exSpan[i]).attr('name')=="FondPlatforme")
        {
            fondPlatforme=convertRGBToDecimal($(exSpan[i]).css("background-color"));
        }
        else if($(exSpan[i]).attr('name')=="PolicePlatforme")
        {
            policePlatforme=convertRGBToDecimal($(exSpan[i]).css("background-color"));
        }
        else if($(exSpan[i]).attr('name')=="FondTitreInformation")
        {
            fondTitreInformation=convertRGBToDecimal($(exSpan[i]).css("background-color"));
        }
        else if($(exSpan[i]).attr('name')=="PoliceTitreInformation")
        {
            policeTitreInformation=convertRGBToDecimal($(exSpan[i]).css("background-color"));
        }
        else if($(exSpan[i]).attr('name')=="FondInformation")
        {
            fondInformation=convertRGBToDecimal($(exSpan[i]).css("background-color"));
        }
        else if($(exSpan[i]).attr('name')=="LogoVehicule")
        {
            logoVehicule=convertRGBToDecimal($(exSpan[i]).css("background-color"));
        }
        else if($(exSpan[i]).attr('name')=="LogoInformation")
        {
            logoInformation=convertRGBToDecimal($(exSpan[i]).css("background-color"));
        }
        else if($(exSpan[i]).attr('name')=="ValeurInformation")
        {
            valeurInformation=convertRGBToDecimal($(exSpan[i]).css("background-color")); 
        }
    }

/*alert("Valeur 1 : "+titreCarte+"\n"+"Valeur 2 : "+nomVehicule+"\n"+"Valeur 3 : "+audioChecked+"\n"+"Valeur 4 : "+
    repetitionAudioAlert+"\n"+"Valeur 5 : "+heureUtc+"\n"+"Valeur 6 : "+fondPlatforme+"\n"+"Valeur 7 : "+
    policePlatforme+"\n"+"Valeur 8 : "+fondTitreInformation+
    "\n"+"Valeur 9 : "+policeTitreInformation+"\n"+"Valeur 10 : "+
    fondInformation+"\n"+"Valeur 11 : "+logoInformation+"\n"+"Valeur 12 : "+
    valeurInformation+"\n"+"Valeur 13 : "+limiteVitesse+"\n"+"Valeur 14 : "+heureArretAutomatique);*/
    

    return true;    

/************************************RETOURNER LES DONNES EN JSON A PARTIR D'UN AUTRE FONCTION**************************************/



}

export function getDataFormulaireJSON() 
{
    //Lors de l'exportation des dataForumulaire récuperer, considerer que la désactivation de switch sur heureArretAutomatique est considéré comme 'none'.

    if ($('#switchActiver').is(':checked')==false) 
    {
        heureArretAutomatique="none";
    }

    const json = '{"'+'titreCarte'+'":'+'"'+titreCarte+'"'+', "'+'nomVehicule'+'":'+'"'+nomVehicule+'"'+', "'+'audioChecked'+'":'+'"'+audioChecked+'"'+', "'+
    'repetitionAudioAlert'+'":'+'"'+repetitionAudioAlert+'"'+', "'+'heureUtc'+'":'+'"'+heureUtc+'"'+', "'+'fondPlatforme'+'":'+'"'+fondPlatforme+'"'+', "'+
    'policePlatforme'+'":'+'"'+policePlatforme+'"'+', "'+'fondTitreInformation'+'":'+'"'+fondTitreInformation+'"'+', "'+
    'policeTitreInformation'+'":'+'"'+policeTitreInformation+'"'+', "'+'fondInformation'+'":'+'"'+fondInformation+'"'+', "'+'logoVehicule'+'":'+'"'+logoVehicule+'"'+', "'+
    'logoInformation'+'":'+'"'+logoInformation+'"'+', "'+'valeurInformation'+'":'+'"'+valeurInformation+'"'+', "'+'limiteVitesse'+'":'+'"'+limiteVitesse+'"'+', "'+
    'heureArretAutomatique'+'":'+'"'+heureArretAutomatique+'"'+'}';
    
    //alert("JSON before pase getDataFormulaireJSON : "+json);

    //OK

    return JSON.parse(json);
}


function inputIsValid(inputObject) 
{
    if(inputObject.validity.valid==true)
    return true;
    else
    return false;
}


function getRadioCheck(nameRadio) 
{
    var radios = document.getElementsByName(nameRadio);
    var valeur;
    for(var i = 0; i < radios.length; i++)
    {
        if(radios[i].checked)
        return radios[i];
    }
    return false;
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