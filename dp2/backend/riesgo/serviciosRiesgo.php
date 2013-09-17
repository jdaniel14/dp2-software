<?php

	include('routesRiesgo.php');

    function R_getListaRiesgos(){
        echo "Probando :D";
	}

    function R_getListaPaquetesEDT($idProyecto){

        $arregloListaPaquetesEDT= array(
            array('1'.'alcance'),
            array('2'.'alcance2')
        );
                
        echo json_encode($arregloListaPaquetesEDT);       
    }

    function R_getListaObjetosAfectados(){

    }

    function R_getListaNivelesImpacto(){

    }

    function R_getListaEquipoRiesgo(){

    }

    function R_postRegistrarRiesgo(){

    }
?>