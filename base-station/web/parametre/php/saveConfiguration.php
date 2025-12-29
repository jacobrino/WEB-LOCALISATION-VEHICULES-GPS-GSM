<?php

$hourCookieValid=172800;


/*      COMMENT DEFINIR COOCKIE ILLIMITER DE VALIDITER        */


/*      PARAMETRE PAR DEFAUT DE LA PLATFORME       */


    if(isset($_POST['titreCarte'])&&($_POST['nomVehicule'])&&($_POST['audioChecked'])&&($_POST['repetitionAudioAlert'])&&
        ($_POST['heureUtc'])&&($_POST['fondPlatforme'])&&($_POST['policePlatforme'])&&($_POST['fondTitreInformation'])&&
        ($_POST['policeTitreInformation'])&&($_POST['fondInformation'])&&($_POST['logoVehicule'])&&($_POST['logoInformation'])&&($_POST['valeurInformation'])&&
        ($_POST['limiteVitesse'])&&($_POST['heureArretAutomatique']))
    {


        $titreCarte=$_POST['titreCarte'];
        $nomVehicule=$_POST['nomVehicule'];
        $audioChecked=$_POST['audioChecked'];
        $repetitionAudioAlert=$_POST['repetitionAudioAlert'];
        $heureUtc=$_POST['heureUtc'];
        $fondPlatforme=$_POST['fondPlatforme'];
        $policePlatforme=$_POST['policePlatforme'];
        $fondTitreInformation=$_POST['fondTitreInformation'];
        $policeTitreInformation=$_POST['policeTitreInformation'];
        $fondInformation=$_POST['fondInformation'];
        $logoVehicule=$_POST['logoVehicule'];
        $logoInformation=$_POST['logoInformation'];
        $valeurInformation=$_POST['valeurInformation'];
        $limiteVitesse=$_POST['limiteVitesse'];
        $heureArretAutomatique=$_POST['heureArretAutomatique'];


        setcookie('SESS_TITRE_CARTE', $titreCarte, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_NOM_VEHICULE', $nomVehicule, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_AUDIO_CHECKED', $audioChecked, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_REPETITION_AUDIO', $repetitionAudioAlert, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_HEURE_UTC', $heureUtc, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_FOND_PLATFORME', $fondPlatforme, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_POLICE_PLATFORME', $policePlatforme, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_FOND_TITRE_INFORMATION', $fondTitreInformation, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_POLICE_TITRE_INFORMATION', $policeTitreInformation, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_FOND_INFORMATION', $fondInformation, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_LOGO_VEHICULE', $logoVehicule, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_LOGO_INFORMATION', $logoInformation, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_VALEUR_INFORMATION', $valeurInformation, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_LIMITE_VITESSE', $limiteVitesse, time()+ $hourCookieValid, '/', null, false, true);
        setcookie('SESS_HEURE_ARRET_AUTOMATIQUE', $heureArretAutomatique, time()+ $hourCookieValid, '/', null, false, true);


        echo "coockieSet";

    }
    else
    {
        echo "JSON failed";
    }


?>


 <!-- 

    if(isset($_COOKIE['SESS_FIRST_NAME']) && isset($_COOKIE['SESS_SECOND_NAME']))


    ERROR Certains cookies utilisent incorrectement l’attribut recommandé « SameSite » 

  -->