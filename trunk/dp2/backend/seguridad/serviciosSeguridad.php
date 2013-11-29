<?php


include('routesSeguridad.php');
include_once '../backend/conexion.php';

function G_getMenu($id) {

	$menu=array();

	if($id==1){

		$menu="{
		            'submenu': [
		                {
		                    'href': '../../views/general/ListaProyectos.html', 
		                    'title': 'Ver Lista de Proyectos'
		                }
		            ], 
		            'href': '', 
		            'title': 'General'
		        }";
	}
	

	
	
   
	$menu=eregi_replace("[\n|\r|\n\r]",'', $menu);
    echo json_encode(array("menu"=>$menu));
}


	
?>