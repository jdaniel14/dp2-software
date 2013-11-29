<?php


include('routesSeguridad.php');
include_once '../backend/conexion.php';

function G_getMenuGeneral($id) {

	$menu=array();

	if($id==1){
		//Gerente de portafolio
		 $menu=menuGeneralGP();
	}elseif ($id==2) {
		//Jefe de proyecto
		$menu=menuGeneralJP();
	}elseif($id==3){
		//miembro equipo
		$menu=menuGeneralTM();

	}
	
    echo json_encode(array("menu"=>$menu));
}

function menuGeneralGP(){

	$menu=array();

	array_push($menu, submenuGeneralGP_general());
	array_push($menu, submenuGeneralGP_configuracion());

	return($menu);
}

function submenuGeneralGP_general(){

		include('linksGeneral.php');

		$links=array();
		
		 array_push($links, $link_G_RegPro);
		 array_push($links, $link_G_RegRRHH);
		 array_push($links, $link_G_ListRRHH);
		 array_push($links, $link_G_RegLec);
		 array_push($links, $link_G_ListLec);
		 array_push($links, $link_G_ListSol);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "General"
            );

		 return $submenu;

}

function submenuGeneralGP_configuracion(){

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


function menuGeneralJP(){

	$menu=array();

	array_push($menu, submenuGeneralJP_general());
	array_push($menu, submenuGeneralGP_configuracion());

	return($menu);
}

function submenuGeneralJP_general(){

		include('linksGeneral.php');

		$links=array();
		
		 
		 array_push($links, $link_G_RegLec);
		 array_push($links, $link_G_ListLec);
		

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "General"
            );

		 return $submenu;

}

function menuGeneralTM(){

	$menu=array();
	$menu=menuGeneralJP();

	return($menu);
}



//*******************************************//////

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
	array_push($menu, submenuGP_alcance());
	array_push($menu, submenuGP_cronograma());
	array_push($menu, submenuGP_costos());
	array_push($menu, submenuGP_riesgos());
	

	return($menu);
}

function submenuGP_general(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_G_RegAct);
		 array_push($links, $link_G_VerAct);
		 array_push($links, $link_G_ListRRHHXPro);
		 array_push($links, $link_G_MatriRRHH);
		 array_push($links, $link_G_ListLinBase);
		 array_push($links, $link_G_RegSol);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "General"
            );

		 return $submenu;

}

function submenuGP_alcance(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_A_RegEDT);
		 array_push($links, $link_A_RegDic);
		 array_push($links, $link_A_GestAlc);
		 array_push($links, $link_A_GesReq);
		 array_push($links, $link_A_MatriRas);
		 array_push($links, $link_A_VerFase);
		 array_push($links, $link_A_PlanAlc);
		 array_push($links, $link_A_PlanReq);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Alcance"
            );

		 return $submenu;

}

function submenuGP_cronograma(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_CR_VerGantt);
		 array_push($links, $link_CR_VerRed);
		 array_push($links, $link_CR_VerGesCam);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Cronograma"
            );

		 return $submenu;

}

function submenuGP_costos(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_CO_RegRec);
		 array_push($links, $link_CO_AsigCost);
		 array_push($links, $link_CO_AsigCta);
		 array_push($links, $link_CO_VerPre);
		 array_push($links, $link_CO_VerInd);
		 array_push($links, $link_CO_VerIndGra);
		 array_push($links, $link_CO_RegCostReal);
		 array_push($links, $link_CO_RegCostCta);
		 array_push($links, $link_CO_RegCostIndPla);
		 array_push($links, $link_CO_RegCostIndReal);
		 array_push($links, $link_CO_VerPreReal);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Costos"
            );

		 return $submenu;

}

function submenuGP_riesgos(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_R_Config);
		 array_push($links, $link_R_PlanRiesgo);
		 array_push($links, $link_R_ComiRiesgo);
		 array_push($links, $link_R_VerRiesgo);
		 array_push($links, $link_R_AcuModif);
		 array_push($links, $link_R_MatriRiesgo);
		 array_push($links, $link_R_RiesMateri);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Riesgos"
            );

		 return $submenu;

}




function menuJP(){

	$menu=array();

	array_push($menu, submenuJP_general());
	array_push($menu, submenuJP_alcance());
	array_push($menu, submenuJP_cronograma());
	array_push($menu, submenuJP_costos());
	array_push($menu, submenuJP_riesgos());

	return($menu);
}

function submenuJP_general(){

		include('linksMenu.php');

		$links=array();
		
		 
		 array_push($links, $link_G_RegAct);
		 array_push($links, $link_G_VerAct);
		 array_push($links, $link_G_ListRRHHXPro);
		 array_push($links, $link_G_RegSol);
		

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "General"
            );

		 return $submenu;

}

function submenuJP_alcance(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_A_RegEDT);
		 array_push($links, $link_A_RegDic);
		 array_push($links, $link_A_GestAlc);
		 array_push($links, $link_A_GesReq);
		 array_push($links, $link_A_MatriRas);
		 array_push($links, $link_A_VerFase);
		 array_push($links, $link_A_PlanAlc);
		 array_push($links, $link_A_PlanReq);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Alcance"
            );

		 return $submenu;

}

function submenuJP_cronograma(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_CR_VerGantt);
		 array_push($links, $link_CR_VerRed);
		 array_push($links, $link_CR_VerGesCam);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Cronograma"
            );

		 return $submenu;

}

function submenuJP_costos(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_CO_RegRec);
		 array_push($links, $link_CO_AsigCost);
		 array_push($links, $link_CO_AsigCta);
		 array_push($links, $link_CO_VerPre);
		 array_push($links, $link_CO_VerInd);
		 array_push($links, $link_CO_VerIndGra);
		 array_push($links, $link_CO_RegCostReal);
		 array_push($links, $link_CO_RegCostCta);
		 array_push($links, $link_CO_RegCostIndPla);
		 array_push($links, $link_CO_RegCostIndReal);
		 array_push($links, $link_CO_VerPreReal);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Costos"
            );

		 return $submenu;

}

function submenuJP_riesgos(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_R_Config);
		 array_push($links, $link_R_PlanRiesgo);
		 array_push($links, $link_R_ComiRiesgo);
		 array_push($links, $link_R_VerRiesgo);
		 array_push($links, $link_R_AcuModif);
		 array_push($links, $link_R_MatriRiesgo);
		 array_push($links, $link_R_RiesMateri);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Riesgos"
            );

		 return $submenu;

}

function menuTM(){

	$menu=array();

	array_push($menu, submenuTM_general());
	array_push($menu, submenuTM_alcance());
	array_push($menu, submenuTM_cronograma());
	array_push($menu, submenuTM_costos());
	array_push($menu, submenuTM_riesgos());

	return($menu);
}

function submenuTM_general(){

		include('linksMenu.php');

		$links=array();
		
		 
		
		 array_push($links, $link_G_ListRRHHXPro);
		

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "General"
            );

		 return $submenu;

}

function submenuTM_alcance(){

		include('linksMenu.php');

		$links=array();
		
		 
		 array_push($links, $link_A_RegDic);
		 array_push($links, $link_A_GestAlc);
		 array_push($links, $link_A_GesReq);
		 array_push($links, $link_A_MatriRas);
		 array_push($links, $link_A_PlanAlc);
		 array_push($links, $link_A_PlanReq);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Alcance"
            );

		 return $submenu;

}

function submenuTM_cronograma(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_CR_VerGantt);
		 array_push($links, $link_CR_VerRed);
		 array_push($links, $link_CR_VerGesCam);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Cronograma"
            );

		 return $submenu;

}

function submenuTM_costos(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_CO_RegRec);
		 array_push($links, $link_CO_RegCostReal);
		 array_push($links, $link_CO_VerPreReal);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Costos"
            );

		 return $submenu;

}

function submenuTM_riesgos(){

		include('linksMenu.php');

		$links=array();
		
		 array_push($links, $link_R_PlanRiesgo);
		 array_push($links, $link_R_VerRiesgo);
		 array_push($links, $link_R_MatriRiesgo);

		 $submenu = array(
                "submenu" => $links,
                "href" => "",
                "title" => "Riesgos"
            );

		 return $submenu;

}


	
?>