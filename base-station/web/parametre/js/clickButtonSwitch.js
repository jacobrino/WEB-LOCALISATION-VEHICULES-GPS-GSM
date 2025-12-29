var switchStatus = false;

$('#switchActiver').on('change',function() 
{
	if ($(this).is(':checked')) 
	{
        switchStatus = $(this).is(':checked');
        //alert("Vraie"+switchStatus);

        //Afficher le div responsable pour afficher l'input heure

        $('#divHeureArretAutomatique').css('display','block');
    }
    else 
    {
        switchStatus = $(this).is(':checked');
       //alert("Faux"+switchStatus);

        $('#divHeureArretAutomatique').css('display','none');
    }

//this.value();

});


//$("#switchActiver").attr('checked','');//Pour activer le switch sur heureArretAutomatique.

//$("#switchActiver").removeAttr('checked');//Pour désactiver le switch sur heureArretAutomatique.