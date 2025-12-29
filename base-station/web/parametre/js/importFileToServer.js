import {launchAjaxListAudio} from './ajaxRequestListAudio.js';

var regexFileValid="(\.mp3|\.wav|\.ogg|\.oga|\.ogv|\.ogx|\.spx|\.opus|\.webm|\.flac)$";

//var regexFileValid="(\.mp3)$";
/*  On a choisi seulement mp3 car le decodage de mp3 pour determiner la durée est plus facile.    */

var nameFileAudioGet="";

/*  /(\.mp3|\.wav|\.ogg|\.oga|\.ogv|\.ogx|\.spx|\.opus|\.webm|\.flac)$/   */


$('#buttonImport').on("click", function () 
{
    var formData = new FormData();
    var files = $('#filesAudio')[0].files;

    if(files.length>0 && syntaxFile(regexFileValid,nameFileAudioGet))
    {
        /*$("#fileAudio").removeClass("is-invalid").addClass("is-valid");*/

        formData.append('file', $('#filesAudio')[0].files[0]);

        $.ajax({
               url : '../parametre/php/getFileFromClient.php',
               type : 'POST',
               data : formData,
               processData: false,  // tell jQuery not to process the data
               contentType: false,  // tell jQuery not to set contentType
               success : function(result) 
               {
                    if(result.includes("fileSendSucess"))
                    {
                        //Actualiser le boutton 
                        launchAjaxListAudio();
                        //********************//
                        /*alert("Fichier bien envoyé. ");*/   
                    }
                    else if(result.includes("fileExistAlready"))
                    alert("Le fichier existe déjà. ");
                    else if(result.includes("fileSendError"))
                    alert("Erreur lors de l'importation du fichier. ");
                    else if(result.includes("fileHeightLimit"))
                    alert("Fichier volumineux dépassant 10Mo .");
                    else if(result.includes("DurationLimite"))
                    alert("Le fichier dépasse les 10 secondes. Veuillez importer un autre fichier. ");
                    else if(result.includes("serverError"))
                    alert("Erreur serveur ou fichier trop volumineux. ");
               }
        });

    }
    else
    $("#filesAudio").removeClass("is-valid").addClass("is-invalid");

}
);


$(document).ready(function() {
    $('#filesAudio').change(function(e) 
    {
        var file = document.getElementById("filesAudio");
        if(file.value.length>0)
        {

            nameFileAudioGet=e.target.files[0].name;

            if(syntaxFile(regexFileValid,nameFileAudioGet))
            {
                $("#filesAudio").removeClass("is-invalid").addClass("is-valid");
                /*alert("Bien valide. "+ nameFileAudioGet);*/
            }   
            else
            {   
                $("#filesAudio").removeClass("is-valid").addClass("is-invalid");
            }
        }
        else
            $("#filesAudio").removeClass("is-valid").addClass("is-invalid");
    });
});


function syntaxFile(regexFileValid,entrer) 
{
    if(entrer.match(regexFileValid)==null)
    return false;
    else
    return true;
}