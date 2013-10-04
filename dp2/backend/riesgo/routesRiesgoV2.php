<?php
	//TIPO_IMPACTO
	$app->get('/R_listaTiposImpactoRiesgo/:id', 'R_getListaTipoImpactoRiesgo');
	$app->post('/R_registrarTiposImpactoRiesgo', 'R_postRegistrarTipoImpactoRiesgo');
	$app->delete('/R_eliminarTiposImpactoRiesgo/:id','R_deleteTipoImpactoRiesgo');

	//ACUERDOS Y MODIFICACIONES
	$app->get('/R_listarAcuerdos/:id','R_getListaAcuerdos');
	$app->post('/R_registrarAcuerdos','R_postRegistrarAcuerdos');
?>