<?php  

$filePathService="/lib/systemd/system/heureArret.service";
$filecontentService="[Unit]\nDescription=Configuration d arrêt automatique de Raspberry Pi\n[Service]\nType=oneshot\nRemainAfterExit=yes\nExecStart=/var/www/html/osm/other/sh/heureArret.sh\n\n[Install]\nWantedBy=multi-user.target";

$cmdActiveService="/usr/bin/sudo systemctl enable heureArret.service";

$cmdStartService="/usr/bin/sudo systemctl start heureArret.service";

$cmdRestartService="/usr/bin/sudo systemctl restart heureArret.service";

$cmdStopService="/usr/bin/sudo systemctl stop heureArret.service";

$cmdChangeAccessFile="chmod 777 ";

$pathFileBash="/var/www/html/osm/other/sh/heureArret.sh";

$hourShutdown="22:00";



if(isset($_POST['heureArretAutomatique']))
{

		/*		Modifier directement le fichier bash contenant heure obtenue lors de l'éxecution de ce script php		*/


		$hourShutdown=$_POST['heureArretAutomatique'];

		$contentFileBash="#!/bin/bash\nshutdown -P ".$hourShutdown;

		file_put_contents($pathFileBash, $contentFileBash);


		/*	Pour rendre le fichier accessible par l'OS	*/
		shell_exec($cmdChangeAccessFile.$pathFileBash);

		/*		Tester si fichier service existe		*/

		if(!file_exists($filePathService))
		{

			/*Si existe pas on introduit la configuration ensuite on lance la commande pour activer et lancer*/

			/*		WARNING MODIFIER LA PERMISSION DE /lib/systemd/system	DEJA REGLE AVEC 	$cmdChangeAccessFile/*/
			/*		WARNING AJOUTER www-data PARMIS LES MEMBRES SUDO		*/


			file_put_contents($filePathService, $filecontentService);


			shell_exec($cmdChangeAccessFile.$filePathService);


			shell_exec($cmdActiveService);


			shell_exec($cmdStartService);

		}
		else if($hourShutdown=="none")
		{

			//Stoper le service responsable pour arreter le serveur automatiquement.

			shell_exec($cmdStopService);

		}

		else
		{

		/*Lancer la commande pour relancer le service responsable car le fichier service existe déjà et qu'il n'est pas none*/

		shell_exec($cmdRestartService);
		}

	echo "cmdExecuted";

}
else
{
	echo "varHeureAutomatiqueNotFound";
}

/* CONFIG DANS /etc/sudoers
www-data ALL=NOPASSWD: /bin/systemctl enable heureArret.service

www-data ALL=NOPASSWD: /bin/systemctl start heureArret.service

www-data ALL=NOPASSWD: /bin/systemctl restart heureArret.service

www-data ALL=NOPASSWD: /bin/systemctl restart heureArret.service

Put chmod 777 /lib/systemd/system/

fichier heureArret.sh
#!/bin/bash
shutdown -P 22:51
*/


?>
