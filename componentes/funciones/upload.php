<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

    move_uploaded_file( $tempPath, $uploadPath );
	require_once('getid3/getid3.php');

	$getID3 = new getID3;
	$ThisFileInfo = $getID3->analyze($uploadPath);
	$artista=isset($ThisFileInfo['tags']['id3v2']['artist'][0])?$ThisFileInfo['tags']['id3v2']['artist'][0]:'Desconocido';
	$titulo=isset($ThisFileInfo['tags']['id3v2']['title'][0])?$ThisFileInfo['tags']['id3v2']['title'][0]:'Desconocido';
	$album=isset($ThisFileInfo['tags']['id3v2']['album'][0])?$ThisFileInfo['tags']['id3v2']['album'][0]:'Desconocido';
	$duracion=$ThisFileInfo['playtime_string'];
	$formato=$ThisFileInfo['audio']['dataformat'];

	$reemplazados = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú","\\","/");
	// $reemplazantes = array("a", "e", "i", "o", "u", "A", "E", "I", "O", "U","","");
	$reemplazantes = array("&aacute;", "&eacute;", "&iacute;", "&oacute;", "&uacute;", "&Aacute;", "&Eacute;", "&Iacute;", "&Oacute;", "&Uacute;","","");
	$artista=str_replace($reemplazados, $reemplazantes, $artista);
	/*$song=new StdClass();
	$song->artista=$artista;
	$song->titulo=$titulo;
	$song->album=$album;
	$song->duracion=$duracion;
	$song->formato=$formato;
	$json = json_encode($song);*/

	if (!is_dir("../../media/".$artista))
	{
		if(!mkdir("../../media/".$artista, 0777))
			$error="Error al crear directorio.";
		else
			$isOk=true;
	}

	if (!is_dir("../../media/".$artista.'/'.$album))
	{
		if(!mkdir("../../media/".$artista.'/'.$album, 0777))
			$error="Error al crear directorio.";
		else
			$isOk=true;
	}

	$nu_file=0;
	$dirMedia="../../media/".$artista.'/'.$album.'/'.$titulo.'.'.$formato;	
	while (file_exists ($dirMedia)) {
		$nu_file++;
		$dirMedia="../../media/".$artista.'/'.$album.'/'.$titulo.$nu_file.'.'.$formato;
	}
	// $pathInPieces = explode(DIRECTORY_SEPARATOR , __FILE__);
	echo realpath(dirname(__FILE__) . "/../media/".$artista.'/'.$album.'/');
	// echo $pathInPieces[2].DIRECTORY_SEPARATOR;
	$nu_file=$nu_file==0?'':$nu_file;
	$dirMedia="../../media/".$artista.'/'.$album.'/'.$titulo.$nu_file.'.'.$formato;
	// echo $dirMedia;
	move_uploaded_file($uploadPath, $dirMedia );
	unlink($uploadPath);

    
    // echo $json;

} else {

    echo 'No files';

}

?>