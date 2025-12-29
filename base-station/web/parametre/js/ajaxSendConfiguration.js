export function updateConfiguration(dataJson)
{
  $.ajax(
      {
        type: "POST",
        url: "../parametre/php/saveConfiguration.php",
        data:dataJson
      }).done(function (result) 
      {

        if(result.length>0)
        {

          if(result.includes("coockieSet"))               
          {
            successAlert('Réussi', 'Vous allez être redirigé vers la platforme.');

            setTimeout(changeUrlToOsm,4000);

          }
          else
          alert("Erreur lors de la configuration.");        
        
        }
        
        else
        {
          console.log("Error AJAX");
        }

      });
}
function changeUrlToOsm() 
{
window.location.href = "../osm";//Veut dire qu'on redirige la nouvelle url vers osm.}
}