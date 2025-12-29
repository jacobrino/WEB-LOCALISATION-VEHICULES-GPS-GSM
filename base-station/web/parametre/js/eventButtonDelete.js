import {launchAjaxListAudio} from './ajaxRequestListAudio.js';

/*import {launchAjaxListAudio} from './ajaxRequestListAudio.js';
*/
$('body').on("click",'.tdDeleteButton',function ()
{
    /*$(this).parents('tr').remove();    */
    $(this).siblings('td').each(function()
    {
      if($(this).attr('class')=="tdNomFichier")
      {
          /*$(this).html() c'est le conenue de la classe tdNomfichier*/
          /*Il faut envoyer cette information pour une requete au serveur*/

          $.ajax(
          {
            type: "POST",
            url: "php/deleteFileAudio.php",
            data:{ nameFileDelete:$(this).html() }
          }).done(function (result) 
          {
            
            //var tbody = document.querySelector('tbody');

            if(result.length>0)
            {                    
              if(result.includes("raffraich"))
              launchAjaxListAudio();
              else if(result.includes("deleteFileUnSucess"))
              console.log("Error for deleting");

            }
            else
            {
              console.log("Error AJAX");
            }

          });

          /*UNE FOIS SUPPRESSION TERMINER, ON RAFFRAICHISSE LA PAGE ET ON REMET A VIDE LA VALEUR DE INPUT ET LANCER A NOUVEAU L'EVENT SUR PAUSE AUDIO A NOUVEAU*/

      }
});
}
);