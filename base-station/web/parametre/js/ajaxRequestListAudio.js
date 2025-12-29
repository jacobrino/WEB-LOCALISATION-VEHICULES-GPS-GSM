/*Importer le module eventDisableAudio pour réattribuer des events aux audios nouveau à ajouté*/
 import {lauchEventAudio} from './eventDisableAudio.js';

export function launchAjaxListAudio()
{
  $.ajax(
      {
        type: "POST",
        url: "../parametre/php/listFileAudio.php"
      }).done(function (result) 
      {
        var tbody = document.querySelector('tbody');

        if(result.length>0)
        {                    
          tbody.innerHTML=result;

          $('#filesAudio').val("");//Pour le mise à nouveau de charger le fichier à importer
          $("#filesAudio").removeClass("is-valid");
          $("#filesAudio").removeClass("is-invalid");

          //alert("Je suis ici nouveau recuperer.")

          //On ajouter un évenement nouveau sur les audios récuperers.
          lauchEventAudio();
                    
        }  
        else
        {
          console.log("Error AJAX");
        }
      });
}