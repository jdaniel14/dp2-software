<?php

//Sprint 1!
	$app->get('/dameAlgo', 'getDameAlgo'); // traer info
	$app->get('/comboEstado','getComboEstado');
	$app->get('/detallePaquete/:id_paquete', 'detallePaquete');
	$app->get('/listaDiccionario/:id_edt', 'listaDiccionario');
	$app->post('/modificaPaquete', 'modificaPaquete');
	$app->get('/comboMiembrosEquipo/:id_proyecto', 'getComboMiembrosEquipo');
	$app->get('/infoProyectoFromEDT/:id_edt','getInfoProyectoFromEDT');
	$app->get('/idEdtFromIdProyecto','getIdEdtFromIdProyecto');

//Sprint 2!
	//Lista de requisitos
	$app->get('/AL_getListaRequisitos','getListaRequisitos');
	$app->get('/AL_getTiposRequisito','getTiposRequisito');
	$app->post('/AL_insertaRequisito','insertaRequisito');
	$app->post('/AL_modificaRequisito','modificaRequisito');
	$app->get('/AL_getRequisito','getRequisito');
	$app->post('/AL_eliminaRequisito','eliminaRequisito');
	
	//Documento de gestion de alcance
	$app->post('/AL_subirArchivo','subirArchivo');
	$app->get('/AL_obtenerArchivo','obtenerArchivo');
	$app->get('/AL_obtenerProyectoById','obtenerProyectoById');

//Sprint 3!
	$app->get('/AL_getListaEstadoAlcance','getListaEstadoAlcance');
	$app->get('/AL_getEstadoAlcance','getEstadoAlcance');
	$app->post('/AL_modificarEstadoAlcance','modificarEstadoAlcance');
	$app->get('/AL_getListaEstadoEDT','getListaEstadoEDT');
	$app->get('/AL_getEstadoEDT','getEstadoEDT');
	$app->post('/AL_modificarEstadoEDT','modificarEstadoEDT');

	$app->post('/AL_getListaCambios','getListaCambios');

?>