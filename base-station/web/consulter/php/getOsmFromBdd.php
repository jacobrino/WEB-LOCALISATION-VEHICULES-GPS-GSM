<?php  

require 'connectMysql.php';

/*$tab1=array("nom"=> "Jacob","chaine" => "TF18","debut" => "21:00","duree" => "30");
$tab2=array("nom" => "Rino","chaine" => "M54","debut" => "20:00","duree" =>"60");

$Jx=array($tab1);

array_push($Jx, $tab2);	*/

/*			[0]["powers"][0] for getting this in js  			*/


$JSONTemps=array();

if (isset($_POST['annee'])&&isset($_POST['mois'])&&isset($_POST['jour'])&&
	isset($_POST['heure1'])&&isset($_POST['heure2'])&&isset($_POST['range'])) 
{
	$annee=$_POST['annee'];
	$mois=$_POST['mois'];
	$jour=$_POST['jour'];
	$heure1=$_POST['heure1'];
	$heure2=$_POST['heure2'];

	$postReponse = $bdd->query("SELECT * FROM Valeur WHERE annee=$annee AND mois=$mois AND jour=$jour AND( heure BETWEEN \"$heure1\" AND \"$heure2\" ) ");
	//Tester si on a recuperer des données sur la BDD.

	$postDonnees = $postReponse->fetch();
	$postReponse->closeCursor();    
  	

	$reponse = $bdd->query("SELECT * FROM Valeur WHERE annee=$annee AND mois=$mois AND jour=$jour AND( heure BETWEEN \"$heure1\" AND \"$heure2\" ) ");
	//	La requete pour recuperer les valeurs correspondants au info entrer par l'utilisateur	.
    if (isset($postDonnees['id'])) 
	{
		//echo "coordonneValide";

		while ($donnees = $reponse->fetch()) 
		{
			$mois=$donnees['mois'];
			$jour=$donnees['jour'];
			$annee=$donnees['annee'];
			$heure=$donnees['heure'];
			$latitude=$donnees['latitude'];
			$longitude=$donnees['longitude'];
			$altitude=$donnees['altitude'];
			$vitesse=$donnees['vitesse'];

			//Recuperer 		mois	jour	annee	heure	latitude	longitude	altitude	vitesse
			$tab=array("mois"=> "$mois","jour" => "$jour","annee" => "$annee","heure" => "$heure","latitude" => "$latitude","longitude" => "$longitude","altitude" => "$altitude","vitesse" => "$vitesse");

			array_push($JSONTemps, $tab);

		}

	}
    else
    {
    	echo "coordonneIntrouvable";
    	exit();	
    }

    $reponse->closeCursor();

}
else
{
	echo "dataMiss";
}

$bdd=null;

echo json_encode($JSONTemps);


/*
CREATE TABLE Valeur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    annee INT(4) NOT NULL,
    mois INT(2) NOT NULL,
    jour INT(2) NOT NULL,
    
    heure TIME NOT NULL,
    
    latitude FLOAT(10) NOT NULL,
    longitude FLOAT(10) NOT NULL,
    altitude INT(8) NOT NULL,
    vitesse INT(4) NOT NULL)

INSERT INTO Valeur (annee,mois,jour,heure,latitude,longitude,altitude,vitesse) VALUES ('2022','10','24','08:10:00','49.6858','-12.989878','200','800');
*/



/*

$programmes = 

array
(
	array
	("nom"=> "Simpsons","chaine" => "TF18","debut" => "21:00","duree" => "30"),
	    
	array
	("nom" => "Blake et Mortimer","chaine" => "M54","debut" => "20:00","duree" =>"60")
);


print(json_encode($programmes, JSON_PRETTY_PRINT));


*/

?>