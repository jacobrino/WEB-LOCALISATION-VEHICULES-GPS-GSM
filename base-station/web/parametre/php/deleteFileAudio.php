<?php 


$dirTarget = "/var/www/html/osm/other/alert/";
/*Pointer avec le dossier d'osm directement*/

if(isset($_POST['nameFileDelete']))
{
	$files="".$_POST['nameFileDelete'];
	$pathFinal=$dirTarget."".$files;

    if (file_exists($pathFinal))
    {
        $status=unlink($pathFinal);    
		
		if($status)
		{  
			/*echo "deleteFileSucess"; */
			echo "raffraich";  
			/*	RAFFRAICHIR LA LISTE DES AUDIOS	*/
			exit();
		}

		else
		echo "deleteFileUnSucess";
    }

    else
    {
    	/*	RAFFRAICHIR LA LISTE DES AUDIOS	*/
    	echo "raffraich";
    	exit(); 
    }
            
}
else
{
	echo "errorAJAX";
}


?>

