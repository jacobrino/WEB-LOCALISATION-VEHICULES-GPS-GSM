<?php 
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=Coordonnee', 'rino', '0000');
}
catch (Exception $e)
{
	die("Erreur lors de la connexion au serveur Mysql .$e");
}
?>
