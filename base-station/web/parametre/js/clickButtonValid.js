import {stateValidity,getDataFormulaireJSON} from './checkValidityForm.js';
import {updateConfiguration} from './ajaxSendConfiguration.js';


$('#bouttonValider').on("click", function () 
{
    if(stateValidity())
    {
        /*Lancer une requete pour transmettre les donnees et stocker vers le cookie du navigateur*/

        updateConfiguration(getDataFormulaireJSON());
        
        /*alert("Les paramètres bien mis à jours ");*/

        console.log("Les paramètres bien mis à jours ");

    }
    else
    {
        errorAlert('Erreur', 'Veuillez de bien remplir les paramètres .'); //red alert
    }

});



/*alert("Formulaires manquants. "+getDataFormulaireJSON().titreCarte+"\n"+getDataFormJSON().nomVehicule+
            "\n"+getDataFormJSON().audioChecked+"\n"+getDataFormJSON().repetitionAudioAlert+"\n"+getDataFormJSON().heureUtc+
            "\n"+getDataFormJSON().heureUtc+"\n"+getDataFormJSON().fondPlatforme+"\n"+getDataFormJSON().policePlatforme+
            "\n"+getDataFormJSON().policeTitreInformation+"\n"+getDataFormJSON().fondInformation+
            "\n"+getDataFormJSON().logoInformation+"\n"+getDataFormJSON().valeurInformation+"\n"+getDataFormJSON().limiteVitesse+
            "\n"+getDataFormJSON().heureArretAutomatique)*/




/*----------------------------------------------------------------------------------------------------------------------------*/





