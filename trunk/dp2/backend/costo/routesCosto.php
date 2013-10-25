<?php
	$app->get('/CO_obtenerInfoProyecto/:parametro', 'CO_getInfoProyecto'); //servicio1
	$app->get('/CO_obtenerListaRecursos/:parametro', 'CO_getListaRecursos'); //servicio2
	$app->get('/CO_obtenerListaActividades/:parametro', 'CO_getListaActividades'); //servicio3
	$app->get('/CO_obtenerInfoActividad/:parametro', 'CO_getInfoActividad'); //servicio4
	$app->post('/CO_enviarCURecursos/', 'CO_saveCURecursos'); //servicio5
	$app->get('/CO_obtenerListaPaquetes/:parametro', 'CO_getListaPaquetes'); //servicio6
	$app->get('/CO_enviarTipoCuenta/:parametro', 'CO_saveTipoCuenta'); //servicio7
	$app->get('/CO_obtenerListaMonedas/', 'CO_getListaMonedas'); //servicio8
	$app->get('/CO_obtenerUnidadesMedidas/', 'CO_getListaUnidadesMedidas'); //servicio9
	$app->post('/CO_enviarPorcReserva/', 'CO_saveReserva'); //servicio10
	$app->get('/CO_obtenerAsientosContables/', 'CO_getAsientosContables'); //servicio11

	$app->post('/CO_obtenerIndicadores/', 'CO_getIndicadores'); //servicio12
	$app->get('/CO_enviarIndicadores/:parametro', 'CO_saveIndicadores'); //servicio13
   
	$app->get('/CO_obtenerListaCuentasDesglozable/:parametro', 'CO_getListaCuentasDesglozable'); //servicio14
	$app->get('/CO_obtenerCostoFijoPlaneadoProyecto/:parametro', 'CO_getCostoFijoPlaneado'); //servicio15
	$app->get('/CO_obtenerCostoFijoRealProyecto/:parametro', 'CO_getCostoFijoReal'); //servicio16
	$app->get('/CO_enviarCostoFijoRealProyecto/:parametro', 'CO_saveCostoFijoRealProyecto'); //servicio17
	$app->get('/CO_obtenerHistorialIndicador/:parametro', 'CO_getHistorialIndicador'); //servicio18
	

	$app->get('/CO_test/', 'CO_testFunction');
	$app->post('/CO_yolo/', 'CO_testFunctionPOST');

?>