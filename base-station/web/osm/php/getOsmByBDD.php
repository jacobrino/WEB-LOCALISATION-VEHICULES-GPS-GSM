<?php  

require 'connectMysql.php';

	$reponse = $bdd->query("Select * from Valeur where id = (SELECT MAX(id) from Valeur);");
    
    $donnees = $reponse->fetch();

    /*annee 	mois 	jour 	heure 	minute 	seconde 	latitude 	longitude 	altitude 	vitesse */

	$JSON_data = array
		('annee'=> $donnees['annee'],'mois'=> $donnees['mois'],'jour'=> $donnees['jour'],'heure'=> $donnees['heure'],
		'latitude'=> $donnees['latitude'],'longitude'=> $donnees['longitude'],
		'altitude'=> $donnees['altitude'],'vitesse'=> $donnees['vitesse']);

	echo json_encode($JSON_data);

$bdd=null;//On se déconnecte, cad quitter le PDA qu'on vient d'initialiser sur connexionMysql.php 

?>
