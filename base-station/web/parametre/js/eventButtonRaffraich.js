import {launchAjaxListAudio} from './ajaxRequestListAudio.js';

$('table').on("click",'#buttonRaffraichir',function () 
{
      launchAjaxListAudio();
}
);