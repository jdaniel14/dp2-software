<?php
    header("Content-type: text/html; charset=utf8");
	include('routesAlcance.php');
	include ('modelAlcance.php');
	include_once '../backend/conexion.php';
	require_once("../dompdf/dompdf_config.inc.php");
	require_once ("../phpexcel/Classes/PHPExcel.php");
	require_once ("../phpexcel/Classes/PHPExcel/IOFactory.php");
	require_once ("../phpexcel/Classes/PHPExcel/Writer/Excel2007.php");

	function getConexionLocal(){
		$con=mysqli_connect("127.0.0.1:3307","usuario","usuario.2013.","dp2");
		// Verificar conexión
		if (mysqli_connect_errno()){
		  echo "Error al conectar con MySQL: " . mysqli_connect_error();
		}
		return $con;
	}

    function getDameAlgo(){
    	$sql = 'SELECT * FROM ESTADO_EDT';
    	$miconexion = new conexion();
   		var_dump($miconexion);
    	$stmt = $miconexion->query($sql);
    	echo $stmt;
    	

    	//echo "sape";
    }

    function getComboEstado(){
    	
    	$con=getConnection();
		$result= $con->query('SELECT * FROM ESTADO_EDT');

		while ($estado = $result->fetch(PDO::FETCH_ASSOC)){
			$lista[]=$estado;
		}
		echo json_encode($lista);
    }

    function detallePaquete($id_paquete){
		$con=getConnection();
		$pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
		$pstmt->execute(array($id_paquete));
		$paquete= $pstmt->fetch(PDO::FETCH_ASSOC);
		$paquete["id_empleado"]= $paquete["id_miembros_equipo"];
		echo json_encode($paquete);
	}

	function listaDiccionario($id_edt){

		$con = getConnection();
		$pstmt = $con->prepare("SELECT  P.id_paquete_trabajo, P.nombre, IFNULL(P.descripcion,''), IFNULL(P.version,'1'), P.ultima_actualizacion, E.descripcion as estado  ".
			"FROM PAQUETE_TRABAJO P , ESTADO_EDT E ".
			"WHERE E.id_estado = P.id_estado AND P.id_edt= ? 
			AND (SELECT count(*) FROM PAQUETE_TRABAJO WHERE id_componente_padre = P.id_paquete_trabajo) = 0");
		$pstmt->execute(array($id_edt));
		$lista = array();

		while ($paquete = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$lista[]=$paquete;
		}
		echo json_encode($lista);

	}
	function modificaPaquete(){

		$request = \Slim\Slim::getInstance()->request();
		$val = json_decode($request->getBody(),TRUE);
		//i integer
		//d double
		$con= getConnection();
		$pstmt = $con->prepare("UPDATE PAQUETE_TRABAJO SET 
			id_miembros_equipo=?,
			descripcion=?,
			criterios_aceptacion=?,
			entregables=?,
			supuestos=?,
			dias=?,
			hitos=?,
			costo=?,
  			interdependencias=?,
			requisitos_calidad=?,
			referencias_tecnicas=?,
			informacion_contrato=?,
			id_estado=?,
			ultima_actualizacion=?
			WHERE id_paquete_trabajo=?");
		$pstmt->execute(array(
			$val["id_empleado"],
			$val["descripcion"],
			$val["criterios_aceptacion"],
			$val["entregables"],
			$val["supuestos"],
			$val["dias"],
			$val["hitos"],
			$val["costo"],
			//$val["id_cambio_moneda"],
			$val["interdependencias"],
			$val["requisitos_calidad"],
			$val["referencias_tecnicas"],
			$val["informacion_contrato"],
			$val["id_estado"],
			date('Y-m-d H:i:s'),
			$val["id_paquete_trabajo"]
		));
		$pstmt = $con->prepare("SELECT id_componente_padre FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo = ?");
		$pstmt->execute(array($val["id_paquete_trabajo"]));
		if($res = $pstmt->fetch(PDO::FETCH_ASSOC)){
			if($res["id_componente_padre"] != null){
				actualizaPadre($res["id_componente_padre"]);
			}
		}
	}

	function actualizaPadre($id_paquete){
		$con= getConnection();
		$pstmt = $con->prepare("SELECT SUM(costo) as costo, SUM(dias) as dias, id_componente_padre FROM PAQUETE_TRABAJO WHERE id_componente_padre = ?");
		$pstmt->execute(array($id_paquete));
		if($res = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$pstmt = $con->prepare("UPDATE PAQUETE_TRABAJO SET 
			dias=?,
			costo=?
			WHERE id_paquete_trabajo=?");
			$pstmt->execute(array($res["dias"],$res["costo"],$id_paquete));
			if($res["id_componente_padre"]!= null){
				actualizaPadre($res["id_componente_padre"]);
			}
		}
	}

	function getComboMiembrosEquipo($id_proyecto){
		$con=getConnection();

		$pstmt = $con->prepare("SELECT M.id_empleado, E.nombre_corto FROM MIEMBROS_EQUIPO M, EMPLEADO E WHERE M.id_proyecto= ? AND E.id_empleado = M.id_empleado");
		$pstmt->execute(array($id_proyecto));
		$lista = array();
		while ($miembro = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$lista[]=$miembro;
		}

		echo json_encode($lista);
    }

    function getInfoProyectoFromEDT($id_edt){
    	$con=getConnection();
    	$pstmt = $con->prepare("SELECT * FROM PROYECTO P, EDT E WHERE E.id_edt=? AND E.id_proyecto = P.id_proyecto");
    	$pstmt->execute(array($id_edt));
    	$proy = $pstmt->fetch(PDO::FETCH_ASSOC);
		echo json_encode($proy);
    }

    function getIdEdtFromIdProyecto(){
    	$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$id_proyecto = $val["id_proyecto"];
		$con=getConnection();

		$pstmt = $con->prepare("SELECT id_edt FROM EDT WHERE id_proyecto =? ORDER BY id_edt DESC");
		$pstmt->execute(array($id_proyecto));

		if($result = $pstmt->fetch(PDO::FETCH_ASSOC)){
			echo json_encode($result);			
		}
		//enviar una respuesta para redirigir a la creacion de un EDT?
		return;
    }

    //SEGUNDO SPRINT
	function getListaRequisitos(){
		$request = \Slim\Slim::getInstance()->request();
     $val = $request->params();//cuando es GET usar params() en ves de body, no hay necesidad de hacer json_decode
		$id_proyecto = $val["id_proyecto"];
		$con=getConnection();
		
		//obtener id_especificacion_requisitos del proyecto
		$pstmt = $con->prepare("SELECT id_especificacion_requisitos FROM ESPECIFICACION_REQUISITOS WHERE id_proyecto =?");
		$pstmt->execute(array($id_proyecto));
		$idER = $pstmt->fetch(PDO::FETCH_ASSOC)["id_especificacion_requisitos"];
		
		//obtener lista de requisitos del idER que se obtuvo antes
		$pstmt = $con->prepare("SELECT R.id_requisito, R.descripcion, T.descripcion as tipo , R.observaciones, R.unidad_medida, R.valor 
			FROM REQUISITO R, TIPO_REQUISITO T 
			WHERE R.id_tipo_requisito = T.id_tipo_requisito AND R.id_estado_requisito <> 2 AND R.id_especificacion_requisitos =?");
		$pstmt->execute(array($idER));
		$lista = array();
    //sacar uno por uno y agregarlos a la lista
		while($req = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$lista[] = $req;
		}
		echo json_encode($lista);
	}

  function getTiposRequisito(){//obtener todos los tipos de requisito
		$con=getConnection();
		$pstmt = $con->prepare("SELECT * FROM TIPO_REQUISITO");
		$pstmt->execute();
		$listaTipos = array();
		while($tipo = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$listaTipos[] = $tipo;
		}
		echo json_encode($listaTipos);
	}

	function insertaRequisito(){
		$request = \Slim\Slim::getInstance()->request();
     $req = json_decode($request->getBody(),TRUE);//obtener todo el requisito a insertar
		$con=getConnection();
      
		//obtener id_especificacion_requisitos (a que Especificacion de Requisitos pertenece)
		$pstmt = $con->prepare("SELECT id_especificacion_requisitos FROM ESPECIFICACION_REQUISITOS WHERE id_proyecto =?");
		$pstmt->execute(array($req["id_proyecto"]));
		$idER = $pstmt->fetch(PDO::FETCH_ASSOC)["id_especificacion_requisitos"];
      
    //Si no existe una especificacion creamos una nueva
		if(is_null($idER)){
			$pstmt = $con->prepare("INSERT INTO ESPECIFICACION_REQUISITOS (id_proyecto,nombre,version,id_estado) VALUES (?,'',1,1) ");
			$pstmt->execute(array($req["id_proyecto"]));
      $idER = $con->lastInsertId();//se obtiene el id de la especificacion que acabamos de insertar
		}
     //ahora que esta asegurado que exista la ER insertamos el requisito
		$pstmt = $con->prepare("INSERT INTO REQUISITO 
								(id_especificacion_requisitos,descripcion, id_tipo_requisito, observaciones, unidad_medida, valor,id_estado_requisito,id_prioridad_requisito) 	
					   			VALUES (?,?,?,?,?,?,?,?)");
		$pstmt->execute(
			array(
				$idER,
				$req["descripcion"],
				$req["id_tipo_requisito"],
				$req["observaciones"],
				$req["unidad_medida"],
				$req["valor"],
				1,
				1
				)
		);
		$pstmt = $con->prepare("SELECT R.id_requisito, R.descripcion, T.descripcion as tipo , R.observaciones, R.unidad_medida, R.valor 
			FROM REQUISITO R, TIPO_REQUISITO T 
			WHERE R.id_tipo_requisito = T.id_tipo_requisito AND R.id_requisito =?");
		$pstmt->execute(array($con->lastInsertId()));
		$req = $pstmt->fetch(PDO::FETCH_ASSOC);
		echo json_encode($req);
	}

	function modificaRequisito(){
		$request = \Slim\Slim::getInstance()->request();
		$req = json_decode($request->getBody(),TRUE);
		$con=getConnection();
		$pstmt = $con->prepare("UPDATE REQUISITO SET descripcion =?, id_tipo_requisito =?, observaciones =?, unidad_medida =?, valor =?,id_estado_requisito =?
								WHERE id_requisito = ?");
		$pstmt->execute(array($req["descripcion"],$req["id_tipo_requisito"],$req["observaciones"],$req["unidad_medida"],
									$req["valor"],1, $req["id_requisito"]));
		echo $request->getBody();
	}

	function getRequisito(){
		$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idReq= $val["id_requisito"];
		$con=getConnection();
		//obtener requisito
		$pstmt = $con->prepare("SELECT id_requisito, descripcion, id_tipo_requisito, observaciones, unidad_medida, valor,id_estado_requisito FROM REQUISITO WHERE id_requisito =?");
		$pstmt->execute(array($idReq));
		$req = $pstmt->fetch(PDO::FETCH_ASSOC);
		echo json_encode($req);
	}

	function eliminaRequisito(){
		$request = \Slim\Slim::getInstance()->request();
		$id = json_decode($request->getBody(),TRUE)["id_requisito"];
		$con=getConnection();
     //eliminado lógico, solo se pone el estado 2
		$pstmt = $con->prepare("UPDATE REQUISITO SET id_estado_requisito = 2
								WHERE id_requisito = ?");
		$pstmt->execute(array($id));
		echo $id;
	} 

	function subirArchivo(){
		$ruta = '../files/';
		$request = \Slim\Slim::getInstance()->request();
		$archivo = json_decode($request->getBody(),TRUE);
     //creamos un archivo en la carpeta "files"
		$file = fopen($ruta.$archivo["name"],'w');
     //escribimos la data recibida
    fwrite($file, $archivo["data"]);
		fclose($file);
     //una ves que se crea el archivo, registramos la ruta en la BD
		$con=getConnection();
		$pstmt = $con->prepare("INSERT INTO COMPONENTE_GESTION_REQUISITOS
								(id_proyecto, nombre, descripcion, version, ruta) 	
					   			VALUES (?,?,?,?,?)");
		$pstmt->execute(array($archivo["id_proyecto"],"Plan de Gestión de requisitos","","",$ruta.$archivo["name"]));
		echo 200;
	}

	function obtenerArchivo(){
		$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idProy= $val["id_proyecto"];
		$con=getConnection();
     //obtener la ultima version del plan de gestion de requisitos
		$pstmt = $con->prepare("SELECT *
		 FROM COMPONENTE_GESTION_REQUISITOS
		 WHERE id_proyecto =?
		 ORDER BY id_componente DESC ");
		$pstmt->execute(array($idProy));
		if($file = $pstmt->fetch(PDO::FETCH_ASSOC)){
			echo json_encode($file);
			return;
		}
     echo "";//no se encontro nada
	}   

  function obtenerProyectoById(){//devolver la info del proyecto para llenar el titulo, etc
		$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idProy= $val["id_proyecto"];
		$con=getConnection();
		$pstmt = $con->prepare("SELECT nombre_proyecto 
			FROM PROYECTO
			WHERE id_proyecto = ? 
		");
		$pstmt->execute(array($idProy));
		if($id = $pstmt->fetch(PDO::FETCH_ASSOC)){
			echo json_encode($id);
			return;
		}
		echo "";
	}

	function getListaEstadoAlcance(){//obtener los estados del alcance
		$con=getConnection();
		$pstmt = $con->prepare("SELECT * FROM ESTADO_ALCANCE");
		$pstmt->execute();
		$listaEstados = array();
		while($estado = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$listaEstados[] = $estado;
		}
		echo json_encode($listaEstados);

	}


	 function getEstadoAlcance(){//obtener el estado del alcance dado un id_proyecto 
	 	$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idproyecto = $val["idproyecto"];

    	$con=getConnection();
		$pstmt = $con->prepare("SELECT id_estado_alcance FROM ALCANCE WHERE id_proyecto = ?");

    	$pstmt->execute(array($idproyecto));
 		if($id = $pstmt->fetch(PDO::FETCH_ASSOC)){
			echo json_encode($id);
			return;
		}
    }


	function modificarEstadoAlcance(){//se modifica el estado del alcance dado un id_proyecto y un id_estado_alcance
		$request = \Slim\Slim::getInstance()->request();
		$estado = json_decode($request->getBody(),TRUE);
		$con=getConnection();
		$pstmt = $con->prepare("UPDATE ALCANCE SET id_estado_alcance = ? WHERE id_proyecto = ?");
		$pstmt->execute(array($estado["idestado"],$estado["idproyecto"]));
	}


	function getListaEstadoEDT(){//obtener los estados del EDT
		$con=getConnection();
		$pstmt = $con->prepare("SELECT * FROM ESTADO_EDT");
		$pstmt->execute();
		$listaEstados = array();
		while($estado = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$listaEstados[] = $estado;
		}
		echo json_encode($listaEstados);

	}


	 function getEstadoEDT(){//obtener el estado del EDT dado un id_proyecto 
	 	$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idproyecto = $val["idproyecto"];

    	$con=getConnection();
		$pstmt = $con->prepare("SELECT id_estado FROM EDT WHERE id_proyecto = ?");

    	$pstmt->execute(array($idproyecto));
 		if($id = $pstmt->fetch(PDO::FETCH_ASSOC)){
			echo json_encode($id);
			return;
		}
    }


	function modificarEstadoEDT(){//se modifica el estado del EDT dado un id_proyecto y un id_estado
		$request = \Slim\Slim::getInstance()->request();
		$estado = json_decode($request->getBody(),TRUE);
		$con=getConnection();
		$pstmt = $con->prepare("UPDATE EDT SET id_estado = ? WHERE id_proyecto = ?");
		$pstmt->execute(array($estado["idestado"],$estado["idproyecto"]));

		$pstmt = $con->prepare("SELECT id_edt FROM EDT WHERE id_proyecto =? ORDER BY id_edt DESC");
		$pstmt->execute(array($estado["idproyecto"]));
		$result = $pstmt->fetch(PDO::FETCH_ASSOC);
		$id_edt = $result["id_edt"];

		$pstmt = $con->prepare("UPDATE PAQUETE_TRABAJO SET id_estado = ? WHERE id_edt = ?");
		$pstmt->execute(array($estado["idestado"],$id_edt));			
	}


	function getListaCambios(){//obtener los cambios de alcance dado un id_proyecto
		$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idproyecto = $val["id_proyecto"];
    	$con=getConnection();
		$pstmt = $con->prepare("SELECT C.id_cambios_alcance as id_cambio , C.id_proyecto, C.descripcion, C.fecha,EA.descripcion as estado, E.nombre_corto as responsable
			FROM CAMBIOS_ALCANCE C , ESTADO_ALCANCE EA, EMPLEADO E
			WHERE id_proyecto = ? AND EA.id_estado_alcance = C.id_estado_alcance AND E.id_empleado = C.id_miembros_equipo");
    	$pstmt->execute(array($idproyecto));
    	$cambios= array();
 		while($cambio = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$cambios[]=$cambio;
		}
		echo json_encode($cambios);
	}
	function registrarCambio(){//registrar un cambio en la tabla CAMBIOS_ALCANCE
		$con=getConnection();
		$request = \Slim\Slim::getInstance()->request();
		$cambio = json_decode($request->getBody(),TRUE);
		$pstmt = $con->prepare("INSERT INTO CAMBIOS_ALCANCE
								(id_proyecto, descripcion, fecha, id_estado_alcance,id_miembros_equipo) 	
					   			VALUES (?,?,?,?,?)");
		$pstmt->execute(array($cambio["idproyecto"],$cambio["descripcion"],date('Y-m-d H:i:s'),$cambio["id_estado"],$cambio["id_miembros_equipo"]));
	}

	//CUARTO SPRINT
	
	function generarPDF(){
		$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idproyecto = $val["idproyecto"];
		//obtener datos del alcance
		$con = getConnection();
    	$pstmt= $con->prepare("SELECT *  FROM ALCANCE  WHERE id_proyecto= ?");
    	$pstmt->execute(array($idproyecto));
    	$alcance = $pstmt->fetch(PDO::FETCH_ASSOC);

		$pstmt = $con->prepare("SELECT nombre_proyecto 
			FROM PROYECTO
			WHERE id_proyecto = ? 
		");
		$pstmt->execute(array($idproyecto));
		if($id = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$alcance["proyecto"] = $id["nombre_proyecto"];
		}

		//obtener el archivo plantilla
		$html = file_get_contents('../views/alcance/plantillaPDFAlcance.html');
		
		//reemplazar las variables de la plantilla
		$outputHtml = renderTemplate($html,$alcance);

		//crear el pdf
		$dompdf = new DOMPDF();
		$dompdf->load_html($outputHtml);
		$dompdf->render();

		//setear el response como stream de bytes
		\Slim\Slim::getInstance()->response->headers->set('Content-Type', 'application/pdf');
		//devolver el archivo COMO STREAM
		return $dompdf->stream("Alcance.pdf");
	}

	function renderTemplate($html , $variables){
		foreach ($variables as $key => $value) {
			$html = str_replace("{" . $key . "}", $value, $html);
		}
		return $html;
	}


	function generarExcel(){

		//Se crea el Excel

		$objPHPExcel = new PHPExcel();
		$objPHPExcel->getProperties()->setTitle("Diccionario de datos")
                 					 ->setSubject("Diccionario de datos")
                					 ->setDescription("Información del diccionario de datos");

    	$objPHPExcel->setActiveSheetIndex(0);

		//Conseguir el id de edt con el id del proyecto

    	$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$id_proyecto = $val["id_proyecto"];
		$con=getConnection();

		$pstmt = $con->prepare("SELECT id_edt FROM EDT WHERE id_proyecto =? ORDER BY id_edt DESC");
		$pstmt->execute(array($id_proyecto));

		$id_edt; 

		if($result = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$id_edt=$result["id_edt"];	
		}


		$pstmt = $con->prepare("SELECT  P.id_paquete_trabajo, P.nombre, IFNULL(P.descripcion,''), IFNULL(P.version,'1'), P.ultima_actualizacion, E.descripcion as estado  ".
			"FROM PAQUETE_TRABAJO P , ESTADO_EDT E ".
			"WHERE E.id_estado = P.id_estado AND P.id_edt= ? 
			AND (SELECT count(*) FROM PAQUETE_TRABAJO WHERE id_componente_padre = P.id_paquete_trabajo) = 0");
		//cambiar el sql anterior por el siguiente
		//hacer cruce con otras tablas para sacar las descripciones deestado o miembros_equipo
		//quitar el * y poner los campos que sean necesarios
		//$pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE (SELECT count(*) FROM PAQUETE_TRABAJO WHERE id_componente_padre = P.id_paquete_trabajo) = 0");

		$pstmt->execute(array($id_edt));
		$lista = array();

		$paquete = $pstmt->fetchall(PDO::FETCH_ASSOC);
		
		//print_r($paquete);

		$objPHPExcel->getActiveSheet()
                    ->fromArray($paquete,NULL,'B3');

        //Se crea la cabecera del documento y se da formato 

        $styleArray = array(
        'alignment' => array(
             'wrap' => true,
             'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
             'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
        ),
    	'font'  => array(
        	'bold'  => true,
        	'color' => array('rgb' => '1D56A1'),
        	'size'  => 14,
    	),
  		'borders' => array(
    		'allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN)
  		)

    	);


        $styleComun = array(
    	'borders' => array(
    		'allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN)
  		)

    	);  	

	    $objPHPExcel->getActiveSheet()->setCellValue("B3", 'Id');
	    $objPHPExcel->getActiveSheet()->setCellValue("C3", 'Paquete de trabajo');
		$objPHPExcel->getActiveSheet()->setCellValue("D3", 'Descripción');
	    $objPHPExcel->getActiveSheet()->setCellValue("E3", 'Versión');
	    $objPHPExcel->getActiveSheet()->setCellValue("F3", 'Última actualización');
	    $objPHPExcel->getActiveSheet()->setCellValue("G3", 'Estado');

	    //se puede acceder a varias celdas a la vez usando rango tipo excel ('B3:G3')
	    $objPHPExcel->getActiveSheet()->getStyle('B3')->applyFromArray($styleArray);
	    $objPHPExcel->getActiveSheet()->getStyle('C3')->applyFromArray($styleArray);
	    $objPHPExcel->getActiveSheet()->getStyle('D3')->applyFromArray($styleArray);
	    $objPHPExcel->getActiveSheet()->getStyle('E3')->applyFromArray($styleArray);
	    $objPHPExcel->getActiveSheet()->getStyle('F3')->applyFromArray($styleArray);
	    $objPHPExcel->getActiveSheet()->getStyle('G3')->applyFromArray($styleArray);


	    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(12);
	    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(30);
	    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(30);
	    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(12);
	    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(30);
	    $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(30);

        
        //echo date('H:i:s') . " Se ha generado el documento en la carpeta files\n";
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save('../files/archivoDiccionario.xlsx');
		//setear el response como stream de bytes
		\Slim\Slim::getInstance()->response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		return file_get_contents('../files/archivoDiccionario.xlsx');
	}

?>