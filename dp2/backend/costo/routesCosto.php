<?php
	$app->get('/CO_obtenerInfoProyecto', 'CO_getInfoProyecto'); //servicio1
	$app->get('/CO_obtenerListaRecursos', 'CO_getRecursos'); //servicio2
	$app->get('/CO_obtenerListaActividades', 'CO_getListaActividades'); //servicio3
	$app->get('/CO_obtenerInfoActividad', 'CO_getInfoActividad'); //servicio4
	$app->get('/CO_enviarCURecursos', 'CO_saveCURecursos'); //servicio5
	$app->get('/CO_obtenerListaPaquetes', 'CO_getListaPaquetes'); //servicio6
	$app->get('/CO_enviarTipoCuenta', 'CO_saveTipoCuenta'); //servicio7
?>