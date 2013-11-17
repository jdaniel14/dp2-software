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

	//CREACION MATRIZ
	$app->get('/R_crearMatrizPositivo/:id','R_getGenerarMatrizPositivo');
	$app->get('/R_crearMatrizNegativo/:id','R_getGenerarMatrizNegativo');

	//ESTRATEGIAS
	$app->get('/R_listarEstrategiasPositivo/:id','R_getEstrategiasPositivo');
	$app->get('/R_listarEstrategiasNegativo/:id','R_getEstrategiasNegativo');
	$app->post('/R_registrarEstrategias','R_postRegistrarEstrategias');
	$app->delete('/R_eliminarEstrategiasPositivo/:id','R_deleteEstrategiasPositivo');
	$app->delete('/R_eliminarEstrategiasNegativo/:id','R_deleteEstrategiasNegativo');

	//PUNTAJE MINIMO Y MAXIMO
	$app->get('/R_obtenerPuntajes/:id','R_getPuntajes');

	//COSTO REAL
	$app->get('/R_obtenerCostoReal/:var','R_getCostoReal');

	//COSTO PROMEDIO
	$app->get('/R_obtenerCostoPromedio/:var','R_getCostoPromedio');
?>