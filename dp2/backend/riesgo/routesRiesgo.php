<?php
	//$app->get('/', '');

	//Henry

	//Registrar riesgo
	$app->get('/R_listaRiesgos', 'R_getListaRiesgos'); // Prueba


	$app->get('/R_listaPaquetesEDT/:id', 'R_getListaPaquetesEDT');//Obtener los paquetes de un proyecto
	$app->get('/R_listaObjetosAfectados', 'R_getListaObjetosAfectados');//Obtener la lista de objetos afectados de un proyecto
	$app->get('/R_listaNivelesImpacto', 'R_getListaNivelesImpacto');//Obtener la lista de niveles de impacto
	$app->get('/R_listaEquipoRiesgo', 'R_getListaEquipoRiesgo');//Obtener la lista de equipos de riesgo
	$app->post('/R_registrarRiesgo', 'R_postRegistrarRiesgo');//Registrar un riesgo
	

?>