<?php
    
    /*      Verifier si tous touts les cockies ne sont pas présents      */

    if(!isset($_COOKIE['SESS_TITRE_CARTE']) || !isset($_COOKIE['SESS_NOM_VEHICULE']) || !isset($_COOKIE['SESS_AUDIO_CHECKED']) || !isset($_COOKIE['SESS_REPETITION_AUDIO']) ||
    !isset($_COOKIE['SESS_HEURE_UTC']) || !isset($_COOKIE['SESS_FOND_PLATFORME']) || !isset($_COOKIE['SESS_POLICE_PLATFORME']) ||
    !isset($_COOKIE['SESS_FOND_TITRE_INFORMATION']) || !isset($_COOKIE['SESS_POLICE_TITRE_INFORMATION']) || !isset($_COOKIE['SESS_FOND_INFORMATION']) ||
    !isset($_COOKIE['SESS_LOGO_VEHICULE']) ||
    !isset($_COOKIE['SESS_LOGO_INFORMATION']) || !isset($_COOKIE['SESS_VALEUR_INFORMATION']) || !isset($_COOKIE['SESS_LIMITE_VITESSE']) ||
    !isset($_COOKIE['SESS_HEURE_ARRET_AUTOMATIQUE']))
    {
        echo "oneOfCoockieNotFound";
    }
    else
    {
        $JSON_data = array
        ('titreCarte'=> $_COOKIE['SESS_TITRE_CARTE'],'nomVehicule'=> $_COOKIE['SESS_NOM_VEHICULE'],'audioChecked'=> $_COOKIE['SESS_AUDIO_CHECKED'],
        'repetitionAudioAlert'=> $_COOKIE['SESS_REPETITION_AUDIO'],'heureUtc'=> $_COOKIE['SESS_HEURE_UTC'],'fondPlatforme'=> $_COOKIE['SESS_FOND_PLATFORME'],
        'policePlatforme'=> $_COOKIE['SESS_POLICE_PLATFORME'],'fondTitreInformation'=> $_COOKIE['SESS_FOND_TITRE_INFORMATION'],
        'policeTitreInformation'=> $_COOKIE['SESS_POLICE_TITRE_INFORMATION'],'fondInformation'=> $_COOKIE['SESS_FOND_INFORMATION'],
        'logoVehicule'=> $_COOKIE['SESS_LOGO_VEHICULE'],'logoInformation'=> $_COOKIE['SESS_LOGO_INFORMATION'],'valeurInformation'=> $_COOKIE['SESS_VALEUR_INFORMATION'],'limiteVitesse'=> $_COOKIE['SESS_LIMITE_VITESSE'],
        'heureArretAutomatique'=> $_COOKIE['SESS_HEURE_ARRET_AUTOMATIQUE']

        );

        echo json_encode($JSON_data);

        /*print_r($JSON_data);*/
    }

?>



