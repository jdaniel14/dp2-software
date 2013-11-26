<?php 
	function conexion($dbhost,$dbname,$dbuser,$dbpass) {
		  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  return $dbh;
	}

	$app->get('/IN_permisosCarpetas', 'getPermisosCarpetas');
	$app->post('/IN_probarConexion', 'probarConexion');
	$app->post('/IN_restaurarBD', 'restaurarBD');
	$app->post('/IN_restaurarBDLineaBase', 'restaurarBDLineaBase');
	$app->post('/IN_crearUsuario', 'crearUsuario');
	$app->post('/IN_personalizarAplicacion', 'personalizarAplicacion');
	$app->post('/IN_eliminarArchivos', 'eliminarArchivos');

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
	$lista[]= array(
			"nombre" => "backend/conexion.php",
			"estado" => is_readable("../backend/conexion.php") && is_writable("../backend/conexion.php"),
			"permisos"=> "read/write"
		);
	echo json_encode($lista);
}

function probarConexion(){
	$request = \Slim\Slim::getInstance()->request();
	$val = json_decode($request->getBody(),TRUE);
	$result["conexion"]=TRUE;
	$result["conexionLineaBase"]=TRUE;
	$result["permisos"]=TRUE;
	$result["mensajesError"]="<ul>";
	//checkear conexion 
	try{
		$con = conexion($val["url"],$val["esquema"],$val["usuario"],$val["password"]);
	}
	catch(PDOException $e){
		$result["conexion"]=FALSE;
		$result["mensajesError"]= $result["mensajesError"] ."<li>".$e->getMessage()."</li>";
	}
	//checkear conexion linea base
	try{
		$con = conexion($val["url"],$val["esquema"].'_lineabase',$val["usuario"],$val["password"]);
	}
	catch(PDOException $e){
		$result["conexionLineaBase"]=FALSE;
		$result["mensajesError"]= $result["mensajesError"] ."<li>".$e->getMessage()."</li>";
	}
	if($result["conexion"] AND $result["conexionLineaBase"]){
		//checkear Permisos
	}

	$result["mensajesError"]=$result["mensajesError"] ."</ul>";
	echo json_encode($result);
}

function restaurarBDLineaBase(){
	$request = \Slim\Slim::getInstance()->request();
	$val = json_decode($request->getBody(),TRUE);
	$con = conexion($val["url"],$val["esquema"].'_lineabase',$val["usuario"],$val["password"]);
	//leer archivo sql
	$sql = file_get_contents('../bd_lineabase.sql');
	$con->exec($sql);

	//crear sp

	echo 200;
}

function restaurarBD(){
	$request = \Slim\Slim::getInstance()->request();
	$val = json_decode($request->getBody(),TRUE);
	$con = conexion($val["url"],$val["esquema"],$val["usuario"],$val["password"]);
	//leer archivo sql
	$sql = file_get_contents('../bd.sql');
	$con->exec($sql);
	//cambiar el archivo de conexion
	//obtener el archivo plantilla
	$code = file_get_contents('../conexion.tpl.php');
	//reemplazar las variables de la plantilla
	$outputCode = renderHeader($code,$val);
	//escribir el archivo
	file_put_contents('../backend/conexion.php',$outputCode);

	echo 200;
}

function crearUsuario(){
	$request = \Slim\Slim::getInstance()->request();
	$val = json_decode($request->getBody(),TRUE);
	$user = $val["usuarioInicial"];
	$pass = $val["passwordInicial"];
	//ejecutar query;

	echo 200;
}

function personalizarAplicacion(){
	$request = \Slim\Slim::getInstance()->request();
	$val = json_decode($request->getBody(),TRUE);
	//obtener el archivo plantilla
	$html = file_get_contents('../header.tpl.html');
	//reemplazar las variables de la plantilla
	$outputHtml = renderHeader($html,$val);
	//escribir el archivo
	file_put_contents('../header.html',$outputHtml);
	//obtener el archivo plantilla
	$html = file_get_contents('../headerGeneral.tpl.html');
	//reemplazar las variables de la plantilla
	$outputHtml = renderHeader($html,$val);
	//escribir el archivo
	file_put_contents('../headerGeneral.html',$outputHtml);
	echo 200;
}

function renderHeader($html , $variables){
		foreach ($variables as $key => $value) {
			$html = str_replace("{" . $key . "}", $value, $html);
		}
		return $html;
}

function eliminarArchivos(){
	/*unlink("../install.js");
	unlink("../install.html");
	unlink("../headerGeneral.tpl.html");
	unlink("../header.tpl.html");
	unlink("../conexion.tpl.html");*/
}

?>