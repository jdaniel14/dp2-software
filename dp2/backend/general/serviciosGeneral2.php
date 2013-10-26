<?php

include('routesGeneral2.php');
include_once '../backend/conexion.php';

function G_getCategoria() {
    $sql = " SELECT id_categoria_lec, nombre_categoria_lec, descripcion_categoria_lec from CATEGORIA_LEC_APRENDIDA ";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $lista_cats = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cat = array("idCategoria" => $j["id_categoria_lec"],
                "nom" => $j["nombre_categoria_lec"]);
            array_push($lista_cats, $cat);
        }
        $db = null;
        echo json_encode($lista_cats);
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getUsuario() {
    $request = \Slim\Slim::getInstance()->request();
    $acta = json_decode($request->getBody());
    $sql = "SELECT e.nombre_corto,e.id_empleado
                        FROM SEGURIDAD s, EMPLEADO e 
                        WHERE s.user=:p_user
                        and s.password=:p_pass
                        and s.id_empleado=e.id_empleado";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("p_user", $acta->p_user);
        $stmt->bindParam("p_pass", $acta->p_pass);
        $stmt->execute();
        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        $usuario = array("nom_user" => $p["nombre_corto"],
            "id_user" => $p["id_empleado"]);
        $db = null;
        echo json_encode(array("me" => $usuario));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postRegistrarLeccionAprendida() {
    $request = \Slim\Slim::getInstance()->request();
    $proj = json_decode($request->getBody());

    try {
        $sql = " INSERT INTO LECCION_APRENDIDA (id_MIEMBROS_EQUIPO, id_categoria_lec_aprendidas, descripcion, estado, fecha_registro, fecha_actualizacion) VALUES (:idexp, :cla, :dla, 1, SYSDATE(), SYSDATE())";
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idexp", $proj->idexp);
        $stmt->bindParam("cla", $proj->cla);
        $stmt->bindParam("dla", $proj->dla);
        $stmt->execute();

        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getProyectosXEmpleado($id) {
    $sql = " SELECT ID_MIEMBROS_EQUIPO, nombre_proyecto 
                 FROM MIEMBROS_EQUIPO EXP, PROYECTO P
                 WHERE EXP.id_proyecto = P.id_proyecto and EXP.id_empleado =:id ";
    try {
        $db = getConnection();

        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $l_proyxemp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $proy = array(
                "idProxEmp" => $j["ID_MIEMBROS_EQUIPO"],
                "nomProy" => $j["nombre_proyecto"]
            );
            array_push($l_proyxemp, $proy);
        }
        $db = null;
        echo json_encode($l_proyxemp);
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postBorrarLeccionAprendida() {
    $request = \Slim\Slim::getInstance()->request();
    $leccion = json_decode($request->getBody());
    $sql = " UPDATE LECCION_APRENDIDA SET estado=0
	    WHERE id_leccion_aprendida=:id ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $leccion->id);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postActualizarLeccionAprendida() {
    $request = \Slim\Slim::getInstance()->request();
    $leccion = json_decode($request->getBody());
    $sql = " UPDATE LECCION_APRENDIDA SET id_MIEMBROS_EQUIPO=:idexp, id_categoria_lec_aprendidas =:cla, descripcion =:dla, fecha_actualizacion=SYSDATE()
	     WHERE id_leccion_aprendida=:id and estado=1 ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idexp", $leccion->idexp);
        $stmt->bindParam("cla", $leccion->cla);
        $stmt->bindParam("dla", $leccion->dla);
        $stmt->bindParam("id", $leccion->id);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getLeccionesAprendidas() {
    $sql = " 
select LA.id_leccion_aprendida as id, CONCAT(E.apellidos, ', ', E.nombres) as empleado, 
LA.descripcion as descr, P.id_proyecto, P.nombre_proyecto as np, CLA.ID_CATEGORIA_LEC, 
CLA.nombre_categoria_lec as cla, LA.fecha_actualizacion
from LECCION_APRENDIDA LA, EMPLEADO E, PROYECTO P, MIEMBROS_EQUIPO EP, CATEGORIA_LEC_APRENDIDA CLA
where E.id_empleado = EP.id_empleado and P.id_proyecto = EP.id_proyecto 
and CLA.ID_CATEGORIA_LEC = LA.id_categoria_lec_aprendidas 
and EP.ID_MIEMBROS_EQUIPO = LA.id_MIEMBROS_EQUIPO and LA.estado=1 order by LA.fecha_actualizacion
 ";
    try {
        $db = getConnection();

        $stmt = $db->query($sql);
        $lista = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $leccion = array(
                "id" => $j["id"],
                "ne" => $j["empleado"],
                "dla" => $j["descr"],
                "np" => $j["np"],
                "cla" => $j["cla"]
            );
            array_push($lista, $leccion);
        }
        $db = null;
        echo json_encode(array("lecciones" => $lista));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getLeccionAprendidasById($id) {
    $sql = " 
select LA.id_leccion_aprendida as id, CONCAT(E.apellidos, ', ', E.nombres) as empleado, LA.descripcion as descr, P.id_proyecto, P.nombre_proyecto as np, CLA.ID_CATEGORIA_LEC as cla, CLA.nombre_categoria_lec, LA.fecha_actualizacion, EP.ID_MIEMBROS_EQUIPO as idexp
from LECCION_APRENDIDA LA, EMPLEADO E, PROYECTO P, MIEMBROS_EQUIPO EP, CATEGORIA_LEC_APRENDIDA CLA
where E.id_empleado = EP.id_empleado and P.id_proyecto = EP.id_proyecto and CLA.ID_CATEGORIA_LEC = LA.id_categoria_lec_aprendidas and EP.ID_MIEMBROS_EQUIPO = LA.id_MIEMBROS_EQUIPO 
and LA.id_leccion_aprendida =:id order by LA.fecha_actualizacion
 ";
    try {
        $db = getConnection();

        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        $item = array(
            "id" => $p["id"],
            "ne" => $p["empleado"],
            "dla" => $p["descr"],
            "np" => $p["np"],
            "cla" => $p["cla"],
            "idexp" => $p["idexp"]
        );
        $db = null;
        echo json_encode(array("leccion" => $item));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}


/********************************************recuros humanos*/
function G_postAsignarRecProy() {
    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());
    //$request = "{ \"id_proy\": 4,\"l_rrhhxpr\":[{\"idr\": \"1\",\"costo\": \"100\"},{\"idr\": \"2\",\"costo\": \"150\"}]}";
    //$body = json_decode($request);
    $id_proy = $body->id_proy;
    $l_rrhhxpr = $body->l_rrhhxpr;
    try {
        for ($i = 0; $i < count($l_rrhhxpr); $i++) {
            $idr = $l_rrhhxpr[$i]->idr;
            $costo = $l_rrhhxpr[$i]->costo;

            $db = getConnection();
            $query = "  SELECT count(*) as cantidad FROM MIEMBROS_EQUIPO where id_proyecto = :idproy and id_empleado = :idemp ";
            $stmt = $db->prepare($query);
            $stmt->bindParam("idproy", $id_proy);
            $stmt->bindParam("idemp", $idr);
            $stmt->execute();

            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            $cantidad = $res["cantidad"];

            if ($cantidad > 0) {
                //UPDATE
                $update = " UPDATE MIEMBROS_EQUIPO SET COSTO_EMPLEADO = :costo WHERE id_proyecto = :idproy and id_empleado = :idemp ";
                // $db = getConnection();
                $stmt = $db->prepare($update);
                $stmt->bindParam("costo", $costo);
                $stmt->bindParam("idproy", $id_proy);
                $stmt->bindParam("idemp", $idr);
                $stmt->execute();
                
            } else {
                //INSERT
                $insert = " INSERT INTO MIEMBROS_EQUIPO (id_proyecto, id_empleado, COSTO_EMPLEADO) values (:idproy, :idemp, :costo) ";
                // $db = getConnection();
                $stmt = $db->prepare($insert);
                $stmt->bindParam("idproy", $id_proy);
                $stmt->bindParam("idemp", $idr);
                $stmt->bindParam("costo", $costo);
                $stmt->execute();
            }
        }
         $db = null;
         echo json_encode(array("me" => "Beleza"));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getListarRecDisp() {


        try {
            $request = \Slim\Slim::getInstance()->request();
	    $body = json_decode($request->getBody());
 
			$str1 = $body->fechaIni;
			$str2 = $body->fechaFin;
                        $fecha_Inicio = new DateTime($str1);
                        $f_ini=$fecha_Inicio->format('Y-m-d');
                        
			$fecha_Fin = new DateTime($str2);
                        $f_fin=$fecha_Fin->format('Y-m-d');
                        
            /*$sql = "SELECT M.id_empleado as id
                      FROM MIEMBROS_EQUIPO M
                      WHERE ( fecha_entrada <= DATE(NOW()) 
                      AND DATE(NOW()) <= fecha_salida )";*/

            $sql="  SELECT E.ID_EMPLEADO as id, E.NOMBRE_CORTO,A.FECHA_PLAN_INICIO,A.FECHA_PLAN_FIN,M.ID_PROYECTO
                    FROM MIEMBROS_EQUIPO M,
                    ACTIVIDAD A,
                    ACTIVIDAD_X_RECURSO AR,
                    RECURSO R,
                    EMPLEADO E
                    WHERE M.ID_MIEMBROS_EQUIPO=R.ID_MIEMBROS_EQUIPO
                    AND AR.ID_RECURSO=R.ID_RECURSO
                    AND AR.ID_ACTIVIDAD=A.ID_ACTIVIDAD
                    AND R.ID_PROYECTO=M.ID_PROYECTO
                    AND R.ID_PROYECTO=A.ID_PROYECTO
                    AND E.ID_EMPLEADO=M.ID_EMPLEADO
                    AND A.FECHA_PLAN_INICIO>=:FI
                    AND A.FECHA_PLAN_FIN<=:FF
                    ";

            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("FI", $f_ini);
            $stmt->bindParam("FF", $f_fin);
            $stmt->execute();
            
            
            $lista_falsa = array();
            while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $id = $j["id"];
                $lista_falsa[$id] = true;
            }

            $sql = "SELECT E.id_empleado as id, E.nombre_corto as nom, PR.DESCRIPCION as PROF
                    FROM EMPLEADO E, PROFESION PR
                    WHERE PR.ID_PROFESION = E.ID_PROFESION";
            $stmt = $db->query($sql);
            $lista = array();

            while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $id = $j["id"];
                if( ! array_key_exists($id, $lista_falsa) ){
                    $lista[$id] = array("id"=>$j["id"],
                                        "nom"=> $j["nom"],
                                        "prof"=> $j["prof"]
                            );
                }
            }
            
                        
            /*$sql="SELECT A.ID_EMPLEADO AS id,A.NOMBRE_CORTO as nom,A.NOMBRE_ROL as rol, 100-A.POR AS porc_libre FROM (
                    SELECT E.ID_EMPLEADO, E.NOMBRE_CORTO,M.ID_PROYECTO,R.NOMBRE_ROL,SUM(M.PORCENTAJE) AS POR
                    FROM MIEMBROS_EQUIPO M,
                    EMPLEADO E,
                    ROL_EMPLEADO R
                    WHERE  E.ID_EMPLEADO=M.ID_EMPLEADO
                    GROUP BY E.ID_EMPLEADO)A WHERE A.POR<100 ";
            $db = getConnection();
            $stmt = $db->query($sql);
            $lista = array();
            while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $recurso = array(
                    "id" => $j["id"],
                    "nom" => $j["nom"],
                    "rol" => $j["rol"],
                    "porc" => $j["porc_libre"]
                );
                array_push($lista, $recurso);
            }*/
            
            $db = null;
            echo json_encode(array("l_recurso" => array_values($lista)));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

	function G_postListaTodosRecurso() {
	    $request = \Slim\Slim::getInstance()->request();
	    $body = json_decode($request->getBody());
 
			$str1 = $body->fechaIni;
			$str2 = $body->fechaFin;
			//echo json_encode(array($str1, $str2));

			$fecha_Inicio_IN = strtotime($str1);
			$fecha_Fin_IN = strtotime($str2);
			//echo $fecha_Inicio_IN->format('Y-m-d')." ".$fecha_Fin_IN->format('Y-m-d')."<br>";

			$interval = ($fecha_Fin_IN - $fecha_Inicio_IN);
			$num_dias = $interval/(60*60*24);
			//echo $num_dias;
//			echo $fecha_Inicio_IN." ".$fecha_Fin_IN. " ". $num_dias;
			$sql_empleados = "SELECT * FROM EMPLEADO ORDER BY id_empleado";
			$db = getConnection();
		  $stmt = $db->query($sql_empleados);

			$lista_empleados = array();
			while ($emp = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$empleado = array();
		    $empleado["id_emp"] = $emp["id_empleado"];
				$id = $empleado["id_emp"];
		    $empleado["nom"] = $emp["NOMBRE_CORTO"];
		    $empleado["rol"] = $emp["ID_ROL"];
		    $empleado["detalle_dias"] = new SplFixedArray($num_dias+1);
	      for ($i = 0; $i < $num_dias; $i++) {
		        $empleado["detalle_dias"][$i] = 0;
		    }
				$lista_empleados[$id] = $empleado;
			}

			$k = 0;
			$size = count($lista_empleados);
			while($k<$size){
//	    	if (hayconexion(listaHab.ElementAt(k).idHabit, fechaIni, fechaFin)){
	              
		      $sql_proy_emp = "	SELECT A.ID_ACTIVIDAD,A.FECHA_PLAN_INICIO,A.FECHA_PLAN_FIN,M.ID_PROYECTO
														FROM 
															MIEMBROS_EQUIPO M,
															ACTIVIDAD A,
															ACTIVIDAD_X_RECURSO AR,
															RECURSO R,
															EMPLEADO E
														WHERE 
																E.ID_EMPLEADO = :id_emp AND
																E.ID_EMPLEADO = M.ID_EMPLEADO AND
																M.ID_MIEMBROS_EQUIPO = R.ID_MIEMBROS_EQUIPO AND
																AR.ID_RECURSO = R.ID_RECURSO AND 
																AR.ID_ACTIVIDAD = A.ID_ACTIVIDAD AND 
																R.ID_PROYECTO = M.ID_PROYECTO AND 
																R.ID_PROYECTO = A.ID_PROYECTO AND 
																( A.FECHA_PLAN_INICIO BETWEEN :fecha_ini AND :fecha_fin OR
																  A.FECHA_PLAN_FIN BETWEEN :fecha_ini AND :fecha_fin )
														ORDER BY A.FECHA_PLAN_INICIO
														";

          $stmt = $db->prepare($sql_proy_emp);
          $stmt->bindParam("id_emp", $lista_empleados[$k]["id_emp"]);
          $stmt->bindParam("fecha_ini", $str1);
          $stmt->bindParam("fecha_fin", $str2);
					$stmt->execute();

		      while ($proy_emp = $stmt->fetch(PDO::FETCH_ASSOC)) {
	          $fecha_Inicio = $proy_emp["FECHA_PLAN_INICIO"];
	          $fecha_Final = $proy_emp["FECHA_PLAN_FIN"];
						//echo $proy_emp["ID_ACTIVIDAD"]." ".$fecha_Inicio." ".$fecha_Final."<br>";
						$interval = (strtotime($fecha_Inicio) - $fecha_Inicio_IN)/(60*60*24);
//						echo "interval1 ".$interval."<br>";
						$a = $interval;

//	          $dife = $fecha_Inicio_IN - $fecha_Inicio;
//	          $a = Math.Abs(dife.Days);
						$interval = (strtotime($fecha_Final)-strtotime($fecha_Inicio))/(60*60*24);
//						echo "interval2 ".$interval."<br>";
						$b = $interval + $a;

//	          $dife =  $fecha_Final - $fecha_Inicio;
//	          $b = $dife.Days + a;
	          if ($b > $num_dias)
	              $b = $num_dias;
	          for ($j = $a; $j < $b; $j++) {
							$lista_empleados[$k]["detalle_dias"][$j] = $proy_emp["ID_ACTIVIDAD"];
	          }//for
		      }//while
//        }//if
				$k++;
			}//while
			echo json_encode($lista_empleados);
	}	


	function G_getListaRecursosEnProyecto($id) {
		  $sql = " SELECT E.ID_EMPLEADO,
		E.NOMBRE_CORTO ,
		PR1.DESCRIPCION PROFESION_BASE,		
		PR.DESCRIPCION PROFESION_ACTUAL,
		RE.NOMBRE_ROL,
		M.COSTO_EMPLEADO,
		P.nombre_proyecto,
		M.PORCENTAJE
		          FROM MIEMBROS_EQUIPO  M,
		          EMPLEADO E,
		          ROL_EMPLEADO RE, 
				  PROYECTO P,
				  PROFESION PR,
				  PROFESION PR1
		          WHERE P.id_proyecto =:id
                          AND E.ID_EMPLEADO=M.ID_EMPLEADO
						  AND M.ID_PROFESION_ACTUAL=PR.ID_PROFESION
						  AND M.ID_ROL=RE.ID_ROL
						  AND M.ID_PROYECTO=P.id_proyecto
						  AND PR1.ID_PROFESION=E.ID_PROFESION";
		  try {
		      $db = getConnection();

		      $stmt = $db->prepare($sql);
		      $stmt->bindParam("id", $id);
		      $stmt->execute();

		      $l_recxpro = array();
		      while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
							$nom_proy = $j["nombre_proyecto"];
		          $rec = array(
		              "id" => $j["ID_EMPLEADO"],
		              "nom" => $j["NOMBRE_CORTO"],
		              "rol" => $j["NOMBRE_ROL"],
		              "costo" => $j["COSTO_EMPLEADO"],
                              "porc"=>$j["PORCENTAJE"],
                              "prof_base"=>$j["PROFESION_BASE"],
                              "prof_act"=>$j["PROFESION_BASE"]
		          );
		          array_push($l_recxpro, $rec);
		      }
		      $db = null;
		      echo json_encode(array("nom_proy"=>$nom_proy,"l_recurso"=>$l_recxpro));
		  } catch (PDOException $e) {
		      echo json_encode(array("me" => $e->getMessage()));
		  }
		  
	}
        
        
function G_prueba() {
    $request = \Slim\Slim::getInstance()->request();
    $acta = json_decode($request->getBody());
   
    echo json_encode($acta);
}
?>
