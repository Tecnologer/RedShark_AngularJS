<?php
	$con=mysqli_connect("127.0.0.1","root","","redshark");
	
	$result = mysqli_query($con,"CALL upL_canciones;");
	

	$json="[";
	$i=1;
	if($result)
	{
		while($row = mysqli_fetch_array($result)){
			$cancion='{
				"nombre": "'.$row[3].'",
			    "artista": "'.$row[6].'",
			    "archivo":"'.$row[7].'",
			    "album":"'.$row[5].'",
			    "select":true
			}';

			$json.=$cancion;
			$i++;
			if($i>1 && $i<=mysqli_num_rows($result))
				$json.=',';
		}

		
	}
	$json.="]";
	mysqli_close($con);
	echo $json;
?>