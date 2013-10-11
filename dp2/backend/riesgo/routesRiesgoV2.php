<?php
	//TIPO_IMPACTO
	$app->get('/R_listaTiposImpactoRiesgo/:id', 'R_getListaTipoImpactoRiesgo');
	$app->post('/R_registrarTiposImpactoRiesgo', 'R_postRegistrarTipoImpactoRiesgo');
	$app->delete('/R_eliminarTiposImpactoRiesgo/:id','R_deleteTipoImpactoRiesgo');

	//ACUERDOS Y MODIFICACIONES
	$app->get('/R_listarAcuerdos/:id','R_getListaAcuerdos');
	$app->post('/R_registrarAcuerdos','R_postRegistrarAcuerdos');

	//HEADER IMPACTO
	$app->post('/R_registrarHeaderImpactoRiesgo','R_postRegistrarHeaderImpacto');
	$app->delete('/R_eliminarHeaderImpactoRiesgo/:id','R_deleteHeaderImpacto');

	//ESTRATEGIAS
	$app->get('/R_listarEstrategias/:id','R_getEstrategias');
	$app->post('/R_registrarEstrategias','R_postRegistrarEstrategias');
	$app->delete('/R_modificarEstrategias/:id','R_postModificarEstrategias');

	//PUNTAJE MINIMO Y MAXIMO
	$app->get('/R_obtenerPuntajes/:id','R_getPuntajes');
?>