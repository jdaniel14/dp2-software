<?php
	//$app->get('/', '');

	//Activando Slim (?)

	//$app = new Slim();
	$app->get('/R_prueba', 'R_prueba'); // Prueba
	//Henry

	//Registrar riesgo
	$app->post('/R_registrarRiesgo', 'R_postRegistrarRiesgo');//Registrar un riesgo


	$app->get('/R_listaPaquetesEDT/:id', 'R_getListaPaquetesEDT');//Obtener los paquetes de un proyecto
	$app->get('/R_listaCategoriaRiesgo', 'R_getListaCategoriaRiesgo');//Obtener la lista de objetos afectados de un proyecto
	$app->get('/R_listaNivelesImpacto/:id', 'R_getListaNivelesImpacto');//Obtener la lista de niveles de impacto
	$app->get('/R_listaEquipoRiesgo/:id', 'R_getListaEquipoRiesgo');//Obtener la lista de equipos de riesgo
	$app->get('/R_estadoLogicoRiesgo/:id', 'R_getEstadoLogicoRiesgo');
	$app->get('/R_listaRiesgo/:id', 'R_getListaRiesgo');


	$app->put('/R_cambiarEstadoLogicoRiesgo/:id', 'R_setEstadoLogicoRiesgo');
	$app->put('/R_modificarRiesgo/:id','R_setRiesgo');

	$app->delete('/R_eliminarRiesgo/:id', 'R_deleteRiesgo');

	
	//Registrar configuracion riesgo
		//Registrar configuracion 
	$app->post('/R_registrarConfiguracionProyecto', 'R_postRegistrarConfiguracionProyecto');//Registrar configuracion



	//Julio

	//Listar Riesgos Comunes
	//$app->get('/R_listarRiesgoComun/:id', 'R_getListaRiesgoComun');//Obtener la lista de riesgos comunes

	//Asignar Riesgos Comunes
	//$app->post('/R_asignarRiesgoComun/:id', 'R_postAsignarRiesgoComun');//Asignar un riesgo comun
?>