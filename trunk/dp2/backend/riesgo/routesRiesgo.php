<?php
	//$app->get('/', '');

	//Activando Slim (?)

	//$app = new Slim();

	//Henry

	//Registrar riesgo
	$app->get('/R_listaRiesgos', 'R_getListaRiesgos'); // Prueba


	$app->get('/R_listaPaquetesEDT/:idProyecto', 'R_getListaPaquetesEDT');//Obtener los paquetes de un proyecto
	$app->get('/R_listaObjetosAfectados/:idProyecto', 'R_getListaObjetosAfectados');//Obtener la lista de objetos afectados de un proyecto
	$app->get('/R_listaNivelesImpacto/:idProyecto', 'R_getListaNivelesImpacto');//Obtener la lista de niveles de impacto
	$app->get('/R_listaEquipoRiesgo/:idProyecto', 'R_getListaEquipoRiesgo');//Obtener la lista de equipos de riesgo
	$app->get('/R_eliminarRiesgo/:id','R_deleteRiesgo');

	$app->post('/R_registrarRiesgo', 'R_postRegistrarRiesgo');//Registrar un riesgo
	
	$app->get('/R_modificarRiesgo/:id','R_putRiesgo');
	


	//Registrar configuracion riesgo
	$app->post('/R_registrarRiesgo', 'R_postRegistrarRiesgo');//Registrar un riesgo

	//Julio

	//Listar Riesgos Comunes
	//$app->get('/R_listarRiesgoComun/:id', 'R_getListaRiesgoComun');//Obtener la lista de riesgos comunes

	//Asignar Riesgos Comunes
	//$app->post('/R_asignarRiesgoComun/:id', 'R_postAsignarRiesgoComun');//Asignar un riesgo comun
?>