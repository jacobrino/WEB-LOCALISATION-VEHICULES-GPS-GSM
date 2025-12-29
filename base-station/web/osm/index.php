<?php

    if(!isset($_COOKIE['SESS_TITRE_CARTE']) || !isset($_COOKIE['SESS_NOM_VEHICULE']) || !isset($_COOKIE['SESS_AUDIO_CHECKED']) || !isset($_COOKIE['SESS_REPETITION_AUDIO']) ||
    !isset($_COOKIE['SESS_HEURE_UTC']) || !isset($_COOKIE['SESS_FOND_PLATFORME']) || !isset($_COOKIE['SESS_POLICE_PLATFORME']) ||
    !isset($_COOKIE['SESS_FOND_TITRE_INFORMATION']) || !isset($_COOKIE['SESS_POLICE_TITRE_INFORMATION']) || !isset($_COOKIE['SESS_FOND_INFORMATION']) ||
    !isset($_COOKIE['SESS_LOGO_INFORMATION']) || !isset($_COOKIE['SESS_VALEUR_INFORMATION']) || !isset($_COOKIE['SESS_LIMITE_VITESSE']) ||
    !isset($_COOKIE['SESS_HEURE_ARRET_AUTOMATIQUE']) ) 
    {
    	
        header("location: ../parametre/index.php");
        exit();//Au cas ou les sessions ne sont pas initialisés, 
        //celà veut dire que la plarforme est mal configuré. Il faut rediriger le client vers la page de Configuration.
   }

?>

<!DOCTYPE html>
<html>
<head>
        <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Carte OSM</title>
        <link rel="stylesheet" type="text/css" href="css/leaflet.css"/>
        <link rel="stylesheet" type="text/css" href="css/body.css"/>
        <link rel="stylesheet" type="text/css" href="css/responsive.css"/>


        <link href="bootstrap5/css/bootstrap.min.css" rel="stylesheet">
        <link href="fontAwesome/css/all.css" rel="stylesheet">

        <script type="text/javascript" src="js/leaflet.js"></script>
        <script type="text/javascript" src="bootstrap5/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="bootstrap5/js/jquery-3.6.0.min.js"></script>

</head>

<nav class="navbar navbar-dark" id="containerAlert">
      <p></p>
      <i class="fas fa-volume-off"></i>
      <button id="toggleOption" class="navbarToggle" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-cog"></i>
      </button>
</nav>

<body class="wrapper row">
    
  <div id="contenueWeb">
      <div id="colmd10">
        <div id="map"></div>
        <!-- La partie de la carte -->
      </div>

      <div id="colmd2" class="offcanvasBody">
              
              <div class="card" name="Car">
                  <span id="cardTitle"><i class="fas fa-car"></i></span>
                  <span id="nomVehicule">404 T</i></span>
              </div>

              <div class="card" name="DateT">
                  <div><span class="card-title">&nbsp;&nbsp;Date&nbsp;&nbsp;</span></div>
                  <div class="form-group">
                            <div class="d-inline-flex align-items-center">
                                    <span class="logoUnity"><i class="fas fa-calendar-day"></i></span>
                                    <span class="valueUnity" name="Date">&nbsp;&nbsp;10/09/2022</span>
                                    <!-- <div class="spinner-border m-5" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div> -->
                            </div>
                  </div>
              </div>

              <div class="card colorX" name="HoraireT" >
                <div><span class="card-title">&nbsp;&nbsp;Horaire&nbsp;&nbsp;</span></div>
                <div class="form-group">
                          <div class="d-inline-flex align-items-center">
                                  <span class="logoUnity"><i class="fas fa-clock"></i></span>
                                  <span class="valueUnity" name="Horaire">&nbsp;&nbsp;10h&nbsp;20m&nbsp;30s</span>
                          </div>
                </div>
              </div>

              <div class="card" name="LatitudeT" >
                <div><span class="card-title">&nbsp;&nbsp;Latitude&nbsp;&nbsp;</span></div>
                <div class="form-group">
                          <div class="d-inline-flex align-items-center">
                                  <span class="logoUnity"><i class="fas fa-map-marker-alt"></i></span>
                                  <span class="valueUnity" name="LatitudePosition">&nbsp;&nbsp;&nbsp;&nbsp;49.5986&nbsp;&nbsp;&nbsp;<span class="unity">°</span></span>
                          </div>
                </div>
              </div>
              
              <div class="card" name="LongitudeT" >
                <div><span class="card-title">&nbsp;&nbsp;Longitude&nbsp;&nbsp;</span></div>
                <div class="form-group">
                          <div class="d-inline-flex align-items-center">
                                  <span class="logoUnity"><i class="fas fa-map-marker-alt"></i></span>
                                  <span class="valueUnity" name="LongitudePosition">&nbsp;&nbsp;&nbsp;&nbsp;-12.9689&nbsp;&nbsp;&nbsp;<span class="unity">°</span></span>
                          </div>
                </div>
              </div>

              <div class="card" name="AltitudeT" >
                <div><span class="card-title">&nbsp;&nbsp;Altitude&nbsp;&nbsp;</span></div>
                <div class="form-group">
                          <div class="d-inline-flex align-items-center">

                                  <span class="logoUnity"><i class="fas fa-highlighter"></i></span>
                                  <span class="valueUnity" name="AltitudePosition">&nbsp;&nbsp;&nbsp;&nbsp;200&nbsp;&nbsp;&nbsp;</span>
                                  <span class="unity"><strong>Mètres</strong></span>
                          </div>
                </div>
              </div>
              <div class="card" name="VitesseT" >
                <div><span class="card-title">&nbsp;&nbsp;Vitesse&nbsp;&nbsp;</span></div>
                <div class="form-group">
                          <div class="d-inline-flex align-items-center">
                                  <span class="logoUnity"><i class="fas fa-tachometer-alt"></i></span>
                                  <span class="valueUnity" name="Vitesse">&nbsp;&nbsp;&nbsp;&nbsp;100&nbsp;&nbsp;&nbsp;</span>
                                  <span class="unity"><strong>KM/H</strong></span>
                          </div>
                </div>
              </div>  

      </div>

  </div>


</body>

<script type="module" src="js/body.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>

<script type="module" src="js/markerMove.js?v=<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>

</html>
