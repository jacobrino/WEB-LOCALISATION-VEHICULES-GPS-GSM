$(function() {

    var tempsColorInput="";
    var tempsColorSpan="";

    $(".colorInput").change(function(event) {

        /*Definir et mettre à jour le span actuel vers la nouvelle input color recuperer*/
        
        $(tempsColorInput).css('background-color',$(this).val());

        /*$(this).val() est la nouvelle valeur de couleur nouvellement selectionner*/

    console.log($(this).val());
   
    /*      Changer background du span respectif      */ 

    $(tempsColorSpan).css('background-color',$(this).val());
        
    });

    $(".colorCircle").click(function(event) 
    {        
        tempsColorSpan=this;
        /*      Selectionner l'élement frere contenant la classe .colorInput      */

        $(this).siblings('input').each(function()
        {
            if($(this).attr('class')=="colorInput")
            {
                $(this).click();
                //alert("colorInput trouvé: "+this.value);
                tempsColorInput=this;

                //tempsColorInput stocke colorInput correspondant.
            }
        });


    });

})