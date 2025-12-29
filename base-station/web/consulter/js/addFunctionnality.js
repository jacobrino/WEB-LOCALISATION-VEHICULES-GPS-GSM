var lineHistoryI;
var tabCircleI;
var decalageI;

export function showFunctionnality(map)
{
    // Afficher la barre d'échelle coin gauche      
        var echelle=L.control.scale({imperial: false, metric: true}).addTo(map);

        //Afficher nord sud sur la carte
        var north = L.control({position: "topright"});
        north.onAdd = function(map)
        {
         var div = L.DomUtil.create("div", "northDirection");
         div.innerHTML = '<img name ="northDirection" src="img/northDirection.png">';
         return div;
        }
        north.addTo(map);

        var colorLine= L.control({
        position : 'topleft'
        });
        colorLine.onAdd = function(map) 
        {
            var div = L.DomUtil.create('div', 'myControl');
            var contentHTML = "<div class='pannelColor'>&nbsp;&nbsp;<span class='colorCircle' id='colorLigne'></span><input class='colorInput' class='form-control' type='color'  title='Choisir la couleur' value='#212529'></div>";        
            div.innerHTML = contentHTML;
            return div;
        }
        colorLine.addTo(map);

        var colorPoint= L.control({
        position : 'topleft'
        });
        colorPoint.onAdd = function(map) 
        {
            var div = L.DomUtil.create('div', 'myControl');
            var contentHTML = "<div class='pannelColor'>&nbsp;&nbsp;<span class='colorCircle' id='colorPoint'></span><input class='colorInput' class='form-control' type='color' title='Choisir la couleur' value='#198754'></div>";        
            div.innerHTML = contentHTML;
            return div;
        }
        colorPoint.addTo(map);

        setEventColorLinePoint();

        //Evenemet de couleur pour changer les lignes et les points.
}

//       COLOR LINE AND COLOR POINT        .

export function setEventColorLinePoint() 
{
    var tempsColorInput;
    var tempsColorSpan;

    $(".colorInput").change(function() {

        /*Definir et mettre à jour le span actuel vers la nouvelle input color recuperer*/
        
        $(tempsColorInput).css('background-color',$(this).val());

        /*$(this).val() est la nouvelle valeur de couleur nouvellement selectionner en héxadécimal pas comme le background de span*/
        //console.log("couleur get"+$(this).val());

    /*      Changer background du span respectif      */ 

    $(tempsColorSpan).css('background-color',$(this).val());

    //Changer si c'est la ligne ou pas.
    if($(tempsColorSpan).is($("#colorLigne")))
    {
        var styleLine = { "color": $(this).val(),"weight": 3,"opacity": 0.65 };
        //console.log("Couleur ligne");
        //console.log("length tabCircle : "+tabCircle.length);
     
        lineHistoryI.setStyle(styleLine);
    }
    else
    {
        var styleCircle = { "color": $(this).val(),"weight": 1,"opacity": 1 };

        //console.log("Couleur point");
        //console.log("length tabCircle : "+tabCircle.length);
        for (var i=0; i < tabCircleI.length; i=i+decalageI) 
        {
            //console.log("ICICIRCLE");
            tabCircleI[i].setStyle(styleCircle);
        }
    }
        
    });

    $(".colorCircle").click(function() 
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
}
export function updateLineHistory(lineHistory) 
{
    lineHistoryI=lineHistory;
}
export function updatetabCircle(tabCircle) 
{
    tabCircleI=tabCircle;
}
export function updateDecalage(decalage) 
{
    decalageI=decalage;
}










