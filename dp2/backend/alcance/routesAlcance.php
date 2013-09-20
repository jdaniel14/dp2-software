<?php
	$app->post('/traerEdt', 'getEdt'); //insertar
	$app->get('/dameAlgo', 'getDameAlgo'); // traer info
	$app->get('/comboEstado','getComboEstado');
	$app->get('/detallePaquete/:id_paquete', 'detallePaquete');
	$app->get('/listaDiccionario/:id_edt', 'listaDiccionario');
	$app->post('/modificaPaquete', 'modificaPaquete');
	$app->get('/comboMiembrosEquipo/:id_proyecto', 'getComboMiembrosEquipo');
	$app->get('/infoProyectoFromEDT/:id_edt','getInfoProyectoFromEDT');
?>