<?php  

$directory = "/var/www/html/osm/other/alert/";
$filesGet = glob ($directory . "*");

/*dirSource repertoire audio par rapport au server*/
$dirSource="../other/alert/";

//$valueFind="option1";//GetByPOST Sur l'element value à trouver.


if(isset($_POST['nameValueAudio']))
{
	foreach($filesGet as $k => $x)
	{
		if(syntaxFile($x))
	   	{
	   		if($k==getLastChar($_POST['nameValueAudio']))
	   		{
		   		/*$temps="<tr><td class='tdNomFichier'>".basename($x).
			    "</td><td class='tdContenueAudio'><span><audio src='".$dirSource.basename($x)."' controls></audio>".
			    "</span></td><td class='tdRadioBox'><input class='form-check-input' type='radio' name='AudioCheck' required value='option".$k."' ></td>
			    <td class='tdDeleteButton'><button type='button' class='btn btn-warning'><i class='fas fa-trash-alt'></i></button></i></td></tr>";*/

				//$tempsFinal=$tempsFinal.$temps;

				echo basename($x);

				exit();	  

	   		}
		}
	}

	echo "errorGetASourceAudioName";

}


function syntaxFile($nameFile='')
{
	if (preg_match("/(\.mp3|\.wav|\.ogg|\.oga|\.ogv|\.ogx|\.spx|\.opus|\.webm|\.flac)$/", $nameFile)) 
	return true;
	else 
	return false;
}

function getLastChar($strEnter='')
{
	return substr($strEnter, -1);
}

?>