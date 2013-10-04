<?php
	//TIPO_IMPACTO
	$app->get('/R_listaTiposImpactoRiesgo/:id', 'R_getListaTipoImpactoRiesgo');
	$app->post('/R_registrarTiposImpactoRiesgo', 'R_postRegistrarTipoImpactoRiesgo');
	$app->delete('/R_eliminarTiposImpactoRiesgo/:id','R_deleteTipoImpactoRiesgo');
	$app->delete('/R_refrescarTiposImpactoRiesgo/:id','R_refreshTipoImpactoRiesgo');

	//ACUERDOS Y MODIFICACIONES
	$app->get('/R_listarAcuerdos/:id','R_getListaAcuerdos');
	$app->post('/R_registrarAcuerdos','R_postRegistrarAcuerdos');
	$app->delete('/R_refrescarAcuerdos/:id','R_refreshAcuerdos');
?>