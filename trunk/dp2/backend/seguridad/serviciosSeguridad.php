<?php


include('routesSeguridad.php');
include_once '../backend/conexion.php';

function G_getMenu($id) {

	$menu=array();
	$submenu=array();
	$links=array();

	if($id==1){

		//general
		 $link1 = array(
                "href" => "../../views/general/RegistrarProyecto.html",
                "title" => "Registrar Proyecto"
            );

		 $link2 = array(
                "href" => "../../views/general/RegistrarRecursoHumano.html",
                "title" => "Registrar Recurso Humano"
            );

		 array_push($links, $link1);
		 array_push($links, $link2);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "General"
            );
		 array_push($menu, $submenu);
		
		 unset($links);
		$links = array();

		 //Configuraciones

		 $link1 = array(
                "href" => "",
                "title" => "Sprint 5"
            );		 

		 array_push($links, $link1);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Configuraciones"
            );
		 array_push($menu, $submenu);



	}
	

	
	
   
	//$menu=eregi_replace("[\n|\r|\n\r]",'', $menu);
	//$menu=eregi_replace("[\t]",'', $menu);
    echo json_encode(array("menu"=>$menu));
}


	
?>