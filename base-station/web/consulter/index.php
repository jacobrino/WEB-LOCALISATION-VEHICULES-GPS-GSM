<!DOCTYPE HTML>
<html lang="en">
  
  <head>
    
    <meta charset="utf-8" />      
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
    <link rel="stylesheet" href="css/leaflet.css" />
    <link rel="stylesheet" href="jAlert/css/jAlert.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="fontAwesome/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="css/fichierConsulter.css" />


    <script src="js/leaflet.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/jquery-confirm.min.js"></script>
    <script src="jAlert/js/jAlert.min.js"></script>
    <script src="jAlert/js/jAlert-functions.min.js"></script> <!-- COMPLETELY OPTIONAL -->

  </head>
  
  <body>

    <div class="row">             

      <div id="headPage"><label class="form-label"><h3>HISTORIQUE DES DEPLACEMENTS</h3></label></div>

    </div> 

    <form class="container" onsubmit="return false;">
   
                        

                  <div class="row row-cols-1 row-cols-md-2 p-3 border bg-light">
                      
                      <div class="d-inline-flex align-items-center col-8 gx-5">
                        <label for="Date" class="form-check-label" ><span>Date</span></label>  
                      </div>
                        
                      <div class="d-inline-flex align-items-center col-4 gx-5">
                         <input type="date" class="form-control" name="Date" value="2022-10-24" required>
                      </div> 
                  
                  </div>
                  
                  <div class="row row-cols-1 row-cols-md-2 p-3 border bg-light">
                      
                      <div class="d-inline-flex align-items-center col-6 gx-5">
                        <label for="Heure" class="form-check-label col" ><span>Heure</span></label>
                        <input type="time" name="Time1" class="form-control col" value="07:10" required>
                      </div>
                        
                      <div class="d-inline-flex align-items-center col-5 gx-5">
                        <label for="Et" class="form-check-label col-1"><span >à</span></label>
                        <input type="time" name="Time2" class="form-control col" value="11:00" required>
                      </div>

                  </div>


                  <div id="map">
                    <!-- <p>BONJOUR TOUT LE MONDE. C'EST LA CARTE</p> -->

                  </div>

                  <div class="row row-cols-1 row-cols-md-2 p-3 border bg-light">
                          
                          <div class="d-inline-flex align-items-center col gx-5">
                            <label for="NiveauAffichage" class="form-check-label" ><span>Niveau d'affichage</span></label>  
                          </div>
                            
                          <div class="d-inline-flex align-items-center col gx-5">
                            <input id="rangeAffichage" type="range"  name="NiveauAffichage" min="0" max="5" value="0" class="form-range" required>
                          </div> 
                  </div>

                  <div id="showHistory">
                        <button type="submit" id="bouttonShow" class="btn btn-primary">Afficher</button>
                  </div>

                  

    </form>


      <script type="module" src="js/showMaps.js"></script>
      <script type="module" src="js/eventRange.js"></script>
      <script type="module" src="js/putLineAndPoint.js"></script>


  </body>

</html>
