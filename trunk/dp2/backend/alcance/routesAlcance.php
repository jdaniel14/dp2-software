<?php
	$app->get('/dameAlgo', 'getDameAlgo'); // traer info
	$app->get('/comboEstado','getComboEstado');
	$app->get('/detallePaquete/:id_paquete', 'detallePaquete');
	$app->get('/listaDiccionario/:id_edt', 'listaDiccionario');
	$app->post('/modificaPaquete', 'modificaPaquete');
	$app->get('/comboMiembrosEquipo/:id_proyecto', 'getComboMiembrosEquipo');
	$app->get('/infoProyectoFromEDT/:id_edt','getInfoProyectoFromEDT');
	
	//Nadya
	//$app->get('/obtenerEdt/:idProyecto/:version','guardarEdt');
	//$app->get('/mostrarEdt/:idProyecto/:version','mostrarEdt');
	//$app->get('/obtenerComboVersion/:idProyecto','getComboVersion');
?>