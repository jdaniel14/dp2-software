<?php

//Sprint 1!
	$app->get('/AL_getComboEstado','getComboEstado');
	$app->get('/AL_getDetallePaquete/:id_paquete', 'detallePaquete');
	$app->get('/AL_getListaDiccionario/:id_edt', 'listaDiccionario');
	$app->post('/AL_modificaPaquete', 'modificaPaquete');
	$app->get('/AL_getComboMiembrosEquipo/:id_proyecto', 'getComboMiembrosEquipo');
	$app->get('/AL_getInfoProyectoFromEDT/:id_edt','getInfoProyectoFromEDT');
	$app->get('/AL_getIdEdtFromIdProyecto','getIdEdtFromIdProyecto');

//Sprint 2!
	//Lista de requisitos
	$app->get('/AL_getListaRequisitos','getListaRequisitos');
	$app->get('/AL_getTiposRequisito','getTiposRequisito');
	$app->post('/AL_insertaRequisito','insertaRequisito');
	$app->post('/AL_modificaRequisito','modificaRequisito');
	$app->get('/AL_getRequisito','getRequisito');
	$app->post('/AL_eliminaRequisito','eliminaRequisito');
	$app->get('/AL_getCategoriasRequisito','getCategoriasRequisito');
	
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

	$app->get('/AL_getListaCambios','getListaCambios');
	$app->post('/AL_registrarCambio','registrarCambio');

//Sprint 4!
	$app->get('/AL_getPDF','generarPDF');
	$app->get('/AL_getExcel','generarExcel');

//Sprint 5!
	$app->post('/AL_mostrarPlanGestionRequisitos','mostrarPlanGestionRequisitos');
	$app->post('/AL_crearPlanGestionRequisitos','crearPlanGestionRequisitos');
	$app->post('/AL_modificarPlanGestionRequisitos','modificarPlanGestionRequisitos');
?>