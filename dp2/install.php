<?php 
	function conexion($dbhost,$dbname,$dbuser,$dbpass) {
		  $dbhost="127.0.0.1:3306";
		  $dbuser="usuario";
		  $dbpass="usuario.2013.";
		  $dbname="dp2";
		  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  return $dbh;

	}

	$app->get('/IN_permisosCarpetas', 'getPermisosCarpetas');
	$app->post('/IN_probarConexion', 'probarConexion');
	$app->post('/IN_crearEsquemas', 'crearEsquemas');
	$app->post('/IN_restaurarBase', 'restaurarBase');
	$app->post('/IN_crearUsuario', 'crearUsuario');
	$app->post('/IN_personalizarAplicacion', 'personalizarAplicacion');

function getPermisosCarpetas(){
	$dir = scandir("..");
	$lista = array();
	foreach ($dir as $nombre) {
		if($nombre == "..")continue;
		$filename="../".$nombre;
		if(is_dir($filename)){
			$estado = is_readable($filename);
			$permisos = "read";
			switch ($nombre) {
				case "files":
				case ".":
				case "backend":
					$estado = $estado && is_writable($filename);
					$permisos = $permisos . "/". "write";
					break;
			}
			$lista[] = array(
				"nombre" => $nombre,
				"estado" => $estado,
				"permisos"=>$permisos
				);
		}
	}
	echo json_encode($lista);
}

function probarConexion(){

}

function crearEsquemas(){

}

function restaurarBase(){

}

function crearUsuario(){

}

function personalizarAplicacion(){

}

?>