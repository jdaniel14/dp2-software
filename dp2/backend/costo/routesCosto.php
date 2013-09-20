<?php
	$app->get('/CO_obtenerInfoProyecto/:parametro', 'CO_getInfoProyecto'); //servicio1
	$app->get('/CO_obtenerListaRecursos/:parametro', 'CO_getListaRecursos'); //servicio2
	$app->get('/CO_obtenerListaActividades/:parametro', 'CO_getListaActividades'); //servicio3
	$app->get('/CO_obtenerInfoActividad/:parametro', 'CO_getInfoActividad'); //servicio4
	$app->get('/CO_enviarCURecursos/:parametro', 'CO_saveCURecursos'); //servicio5
	$app->get('/CO_obtenerListaPaquetes/:parametro', 'CO_getListaPaquetes'); //servicio6
	$app->get('/CO_enviarTipoCuenta/:parametro', 'CO_saveTipoCuenta'); //servicio7
	$app->get('/CO_obtenerListaMonedas/', 'CO_getListaMonedas'); //servicio8
?>