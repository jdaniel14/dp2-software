<?php
	//TIPO_IMPACTO
	$app->get('/R_listaTiposImpactoRiesgo/:var', 'R_getListaTipoImpactoRiesgo');
	$app->post('/R_registrarTiposImpactoRiesgo', 'R_postRegistrarTipoImpactoRiesgo');
	$app->delete('/R_eliminarTiposImpactoRiesgo/:var','R_deleteTipoImpactoRiesgo');

	//ACUERDOS Y MODIFICACIONES
	$app->get('/R_listarAcuerdos/:var','R_getListaAcuerdos');
	$app->post('/R_registrarAcuerdos','R_postRegistrarAcuerdos');

	//HEADER IMPACTO
	$app->post('/R_registrarHeaderImpactoRiesgo','R_postRegistrarHeaderImpacto');
	$app->delete('/R_eliminarHeaderImpactoRiesgo/:var','R_deleteHeaderImpacto');

	//CREACION MATRIZ
	$app->get('/R_crearMatrizPositivo/:var','R_getGenerarMatrizPositivo');
	$app->get('/R_crearMatrizNegativo/:var','R_getGenerarMatrizNegativo');

	//ESTRATEGIAS
	$app->get('/R_listarEstrategiasPositivo/:var','R_getEstrategiasPositivo');
	$app->get('/R_listarEstrategiasNegativo/:var','R_getEstrategiasNegativo');
	$app->post('/R_registrarEstrategias','R_postRegistrarEstrategias');
	$app->delete('/R_eliminarEstrategiasPositivo/:var','R_deleteEstrategiasPositivo');
	$app->delete('/R_eliminarEstrategiasNegativo/:var','R_deleteEstrategiasNegativo');

	//PUNTAJE MINIMO Y MAXIMO
	$app->get('/R_obtenerPuntajes/:var','R_getPuntajes');

	//COSTO REAL
	$app->get('/R_obtenerCostoReal/:var','R_getCostoReal');

	//COSTO PROMEDIO
	//$app->post('/R_obtenerCostoContingencia','R_postCostoContingencia');
?>