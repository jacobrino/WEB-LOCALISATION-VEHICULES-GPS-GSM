export function lauchEventAudio(argument) {
    $('audio').on("play", function () 
    {
        var ex = document.querySelectorAll('audio');

        for (var i = 0; i <ex.length; i++) 
        {
          if(ex[i] != this)
          {
            /*ex[i].pause();*/
            ex[i].pause();

          }

        }    
    }
    );
}