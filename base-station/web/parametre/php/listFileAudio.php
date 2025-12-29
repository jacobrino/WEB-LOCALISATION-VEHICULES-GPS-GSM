<?php  

$directory = "/var/www/html/osm/other/alert/";
$filesGet = glob ($directory . "*");

/*dirSource repertoire audio par rapport au server*/
$dirSource="../..//osm/other/alert/";

/*$files = array();*/

$tempsFinal="";
$temps="";
$bouttonRaffraichir="<tr><td colspan='4'><span id='buttonRaffraichir'><button type='button' class='btn btn-primary'>&nbsp;&nbsp;Rafraichir&nbsp;&nbsp;<i class='fas fa-sync-alt'></button></i></span> </td></tr>";

//$chooseFile="<td colspan='3'><label for='formFile' class='form-label'>Choisir un fichier</label><input class='form-control' type='file' id='formFile'></td>";

foreach($filesGet as $k => $x)
{
	if(syntaxFile($x))
   {
   	//$files[] = basename($x);

		$temps="<tr><td class='tdNomFichier'>".basename($x).
      "</td><td class='tdContenueAudio'><span><audio src='".$dirSource.basename($x)."' controls></audio>".
      "</span></td><td class='tdRadioBox'><input class='form-check-input' type='radio' name='AudioCheck' required value='option".$k."' ></td>
      <td class='tdDeleteButton'><button type='button' class='btn btn-warning'><i class='fas fa-trash-alt'></i></button></i></td></tr>";

		$tempsFinal=$tempsFinal.$temps;
	}
}


echo $tempsFinal.$bouttonRaffraichir;


/*echo json_encode($tempsFinal.$bouttonRaffraichir);*/

function syntaxFile($nameFile='')
{
	if (preg_match("/(\.mp3|\.wav|\.ogg|\.oga|\.ogv|\.ogx|\.spx|\.opus|\.webm|\.flac)$/", $nameFile)) 
	return true;
	else 
	return false;
}

?>