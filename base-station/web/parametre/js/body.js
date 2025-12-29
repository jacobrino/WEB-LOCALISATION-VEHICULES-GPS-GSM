 /*Importer le module eventDisableAudio pour lancer l'évenement au démmarage de DOM*/
 import {lauchEventAudio} from './eventDisableAudio.js';

 lauchEventAudio();


 /*Pour mettre vide les values au début de lancement de DOM*/
 import {setDefaultConfiguration} from './ajaxGetConfiguration.js';
 
 setDefaultConfiguration();
/*Definir les configurations par défaut via cockies*/
