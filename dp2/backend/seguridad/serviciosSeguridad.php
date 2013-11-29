<?php


include('routesSeguridad.php');
include_once '../backend/conexion.php';

function G_getMenu($id) {

	$menu=array();

	if($id==1){
		//Gerente de portafolio
		 $menu=menuGP();
	}elseif ($id==2) {
		//Jefe de proyecto
		$menu=menuJP();
	}elseif($id==3){
		//miembro equipo
		$menu=menuTM();

	}
	
    echo json_encode(array("menu"=>$menu));
}

function menuGP(){

	$menu=array();

	array_push($menu, submenuGP_general());
	array_push($menu, submenuGP_configuracion());

	return($menu);
}

function submenuGP_general(){

		$links=array();
		$link1 = array(
                "href" => "../../views/general/RegistrarProyecto.html",
                "title" => "Registrar Proyecto"
            );

		 $link2 = array(
                "href" => "../../views/general/RegistrarRecursoHumano.html",
                "title" => "Registrar Recurso Humano"
            );
		 $link3 = array(
                "href" => "../../views/general/ListaRecursosHumanos.html",
                "title" => "Ver Lista Recursos Humanos"
            );

		 $link4 = array(
                "href" => "../../views/general/RegistrarLeccionAprendida.html",
                "title" => "Registrar Leccion Aprendida"
            );

		 $link5 = array(
                "href" => "../../views/general/ListaLeccionesAprendidas.html",
                "title" => "Ver Lista de Lecciones Aprendidas"
            );

		 $link6 = array(
                "href" => "../../views/general/ListaSolicitudes.html",
                "title" => "Ver Lista de Solicitudes de Cambios"
            );

		 array_push($links, $link1);
		 array_push($links, $link2);
		 array_push($links, $link3);
		 array_push($links, $link4);
		 array_push($links, $link5);
		 array_push($links, $link6);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "General"
            );

		 return $submenu;

}

function submenuGP_configuracion(){

		$links=array();
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

		 return $submenu;


}


	
?>