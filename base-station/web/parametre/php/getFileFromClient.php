<?php

error_reporting(E_ALL & ~E_DEPRECATED);

ini_set("display_errors", 0);

$reponse = "";

$limiteSecondAudio=10;

$dirTarget = "/var/www/html/osm/other/alert/";
/*On change directement vers le repertoire du platforme osm*/

/*IL FAUT MODIFIER PHP.INI A AUTORISER 10Mo AU MAXIMUM SUR L'UPLOAD CAR PAR DEFAUT C'EST 2Mo SEULEMENT*/
/*upload_max_filesize*/

if ((isset($_FILES["file"])))
{
            /*$files = "nomdufichier";*/
            $files="".basename($_FILES["file"]["name"]);
            $pathFinal=$dirTarget."".$files;

            if (file_exists($pathFinal))
            {
                $reponse="fileExistAlready";
                echo $reponse;
                exit();
            }

            else if(filesize($_FILES["file"]["tmp_name"])>10000000)
            {
                $reponse="fileHeightLimit";
                echo $reponse;
                exit();
            }

            /*Dependance du paquet ffmpeg, grep, cut, sed pour que la recuperation de la longueur de fichier marche*/

            $time=exec("ffmpeg -i ".escapeshellarg($_FILES["file"]["tmp_name"])." 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//");


            if (getDurationFileAudio($time)>$limiteSecondAudio)
            {
                $reponse="DurationLimite";
                echo $reponse;
                exit();
            }

            if (move_uploaded_file($_FILES["file"]["tmp_name"], $pathFinal))
            {
                $reponse = "fileSendSucess";
            }
            else
            {
                $reponse = "fileSendError";
            }

            //echo $_FILES["file"]["name"];


            

}
else
{
    $reponse="serverError";
}

echo $reponse;


/*
$filename = '/path/to/foo.txt';

if (file_exists($filename)) {
    echo "Le fichier $filename existe.";
} else {
    echo "Le fichier $filename n'existe pas.";
}
*/

/*$valid_extensions = array("mp3","wav","ogg","oga","ogv","ogx","spx","opus","webm","flac");*/


/*$fileExtension = pathinfo($fileTarget,PATHINFO_EXTENSION);    /*Nom extension fichier */ 
/*$fileTarget = $dirTarget . basename($_FILES["file"]["name"]);   /*Nom fichier brute avec extension*/


function getDurationFileAudio($entrer='')
{

    //$entrer="00:04:04.48";

    $hours="";
    $minutes="";
    $secondes="";

    list ($hours,$minutes,$secondes)=explode(':', $entrer);

    /*echo $hours."\n";

    echo $minutes."\n";

    echo $secondes."\n";
    */

    $totalSeconds=($hours*3600)+($minutes*60)+$secondes;


    return intval($totalSeconds);
}

?>

