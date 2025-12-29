<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
	<title>Configuration</title>
</head>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/fichierParametre.css">
	<link href="fontAwesome/css/all.css" rel="stylesheet">

	<link rel="stylesheet" href="jAlert/css/jAlert.css">


	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery-3.6.0.min.js"></script>
	<script src="js/jquery-confirm.min.js"></script>

	<script src="jAlert/js/jAlert.min.js"></script>
	<script src="jAlert/js/jAlert-functions.min.js"></script> <!-- COMPLETELY OPTIONAL -->


	<body>

		<div class="row">							

			<div id="headPage"><label class="form-label"><h3>CONFIGURATION DE LA PLATFORME</h3></label></div>

		</div>		

		<div id="contenueOption">

			<form class="container" method="post" action="" onsubmit="return false;">

									<div class="row row-cols-1 row-cols-md-2 p-3 border bg-light">

										<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-5"><label class="form-label">Titre carte</label></span>	
											<span class="col-7"><input class="form-control" name="TitreCarte" maxlength="20" required></span>
										</div>
											
										<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-5"><label class="form-label">Nom véhicule</label></span>	
											<span class="col-7"><input class="form-control" name="NomVehicule" maxlength="10" required></span>
										</div> 

				  					</div>

				  					<div class="row p-3 border bg-light">
										
										<div name="divAudioAlert" class="d-inline-flex align-items-center col-md-4 gx-5" >
											<span id="spanAudioAlert" class="col-12"><label class="form-label">Définir audio alert</label></span>
										</div>

										<div name="divContenueAudioAlert" class="d-inline-flex align-items-center col-sm-7 col-md-8 gx-5">
													
											<table class="table">

												<thead>
													<tr>
														<td>
															<span >Ajouter un fichier</span>
														</td>
														<td colspan="2">
												  			<input id="filesAudio" class="form-control" type="file" name="files" value="" />
														</td>
														<td>
												  			<button id="buttonImport" type='button' class='btn btn-secondary'><i class="fas fa-plus"></i></button></i>
														</td>
													</tr>
												</thead>

												<tbody>

													<!-- CONTENUE DES LISTES AUDIOS A AFFICHER ET BOUTTON RAFFRAICHIR DELETE -->
													<?php include 'php/listFileAudio.php'; ?>
														   	  
												</tbody>

											</table>										
										
										</div>
									
									</div>				  					
																						
				  					<div class="row row row-cols-1 row-cols-lg-2 p-3 border bg-light">

										<div class="d-inline-flex align-items-center gx-5">
											<span class="col-8"><label class="form-label">Répétition audio alert (secondes)</label></span>
											<span class="col-4">
												<select name="RepetitionAudioAlert" class="form-select" aria-label="Default select example">
													  <option value="5">5</option>
													  <option value="10">10</option>
													  <option value="15">15</option>
													  <option value="20">20</option>													  
												</select>
											</span>
										</div>

										<div class="d-inline-flex align-items-center gx-5">
											<span class="col-4"><label class="form-label">Heure UTC</label></span>
											<span class="col-4">
												<select name="HeureUtc" class="form-select" aria-label="Default select example">
													  <option value="UTC+1">UTC+1</option>
													  <option value="UTC+2">UTC+2</option>
													  <option value="UTC+3">UTC+3</option>
												</select>
											</span>
										</div> 

				  					</div>

				 					<div class="row row-cols-1 row-cols-md-2 p-3 border bg-light">

										<div class="d-inline-flex align-items-center gx-5">

											<span class="col-11"><label class="form-label">Couleur fond platforme</label></span>	
											<span class="colorCircle col-1" name="FondPlatforme"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur FondPlatforme">

										</div>

										<div class="d-inline-flex align-items-center gx-5">
											<span class="col-11"><label class="form-label">Couleur police platforme </label></span>	
											<span class="colorCircle col-1" name="PolicePlatforme"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur">
											
										</div> 

				  					</div>


				  					<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 p-3 border bg-light">

										<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-11"><label class="form-label">Couleur fond titre information </label></span>	
											<span class="colorCircle col-1" name="FondTitreInformation"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur">

										</div> 

										<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-11"><label class="form-label">Couleur police titre information </label></span>	
											<span class="colorCircle col-1" name="PoliceTitreInformation"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur">

										</div>

										<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-11"><label class="form-label">Couleur fond information </label></span>	
											<span class="colorCircle col-1" name="FondInformation"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur">

										</div> 

				  					</div>

				  				

				  					<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 p-3 border bg-light">

				  						<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-11"><label class="form-label">Couleur logo véhicule</label></span>	
											<span class="colorCircle col-1" name="LogoVehicule"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur">

										</div> 

				  						<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-11"><label class="form-label">Couleur logo information</label></span>	
											<span class="colorCircle col-1" name="LogoInformation"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur">

										</div> 

										<div class="d-inline-flex align-items-center col gx-5">
											<span class="col-11"><label class="form-label">Couleur valeur information</label></span>	
											<span class="colorCircle col-1" name="ValeurInformation"></span>
											<input class="colorInput" class="form-control" type="color"  title="Choisir la couleur">

										</div> 

				  					</div>

				  					<div class="row row-cols-1 row-cols-md-2 p-3 border bg-light">

										<div class="d-inline-flex align-items-center gx-5">
											<span class="col-4"><label class="form-label">Limite vitesse (Km)</label></span>
											<span class="col-4">
												<input class="form-control" type="text" name="LimiteVitesse" maxlength="4" required>
											</span>
										</div>

										<div class="d-inline-flex align-items-center gx-5">
											<span class="col-8"><label class="form-label">Heure d'arrêt automatique</label></span>
											<span class="col-4">
												<div id="divHeureArretAutomatique">
													<input name="HeureArretAutomatique" class="form-control" type="time" required>
												</div>
												<div id="divSwitchActiver" class="form-check form-switch">
												  	<input id="switchActiver" class="form-check-input" type="checkbox">
												  	<label class="form-check-label" for="flexSwitchCheckDefault">Activer</label>
												</div>
											</span>
										</div> 
				  					</div>

				  					<div class="row row-cols-1 row-cols-md-2 p-3 border bg-light">
										<div class="d-inline-flex align-items-center gx-5">
											<span class="col-10"><label class="form-label">Définir zone à ne pas franchir</label></span>
											<!--		<input type="text" class="form-control" name="Telephone" required>		-->
											<!-- 		CODE A ORGANISER		 -->
										</div> 
				  					</div>


				  					<div id="divValider" class="row row-cols-1 row-cols-sm-2">
				  						<div class="col g-4">
				  							<button type="submit" id="bouttonValider" class="btn btn-primary">Valider</button>
				  						</div>
				  						<div class="col g-4">
				  							<button id="defaultConfig" class="btn btn-secondary">Default</button>
				  						</div>									    
									    <!-- Faire un margin entre les deux. -->
									</div>	
						
			</form>

														
		</div>


	<script src="js/eventColor.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>
	<script src="js/clickButtonDefault.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>
	<script src="js/clickButtonSwitch.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>


	<script type="module" src="js/clickButtonValid.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>
	<script type="module" src="js/eventButtonDelete.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>
	<script type="module" src="js/importFileToServer.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>
	<script type="module" src="js/eventButtonRaffraich.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>


	<script type="module" src="js/body.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>	


	</body>

</html>
