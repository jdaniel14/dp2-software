<?php
	$app->get('/R_prueba', 'R_prueba'); // Prueba
	$app->get('/R_pruebaR/:params', 'R_pruebaR');

	//Riesgo
	$app->post('/R_registrarRiesgo', 'R_postRegistrarRiesgo');//Registrar un riesgo

	$app->get('/R_listaRiesgo/:var', 'R_getListaRiesgo');
	$app->get('/R_obtenerRiesgo/:id', 'R_getRiesgo');//Obtener 1 riesgo
	$app->get('/R_listaPaquetesEDT/:id', 'R_getListaPaquetesEDT');//Obtener los paquetes de un proyecto
	$app->get('/R_listaNivelesImpacto/:id', 'R_getListaNivelesImpacto');//Obtener la lista de niveles de impacto
	

	//Actualizando Sprint 1
	//$app->get('/R_obtenerNivelImpactoTipoImpacto1/:var', 'R_getNivelImpactoTipoImpacto1');
	$app->get('/R_obtenerNivelImpactoTipoImpacto1/:var', 'R_getNivelImpactoTipoImpacto1');
	$app->get('/R_obtenerNivelImpactoTipoImpacto2/:var', 'R_getNivelImpactoTipoImpacto2');
	$app->get('/R_obtenerProbabilidadRiesgo/:var', 'R_getProbabilidadRiesgo');
	$app->get('/R_obtenerDescripcionNivelImpactoTipoImpacto/:var', 'R_getDescripcionNivelImpactoTipoImpacto');


	$app->get('/R_obtenerEstadoLogicoRiesgo/:id', 'R_getEstadoLogicoRiesgo');
	$app->delete('/R_eliminarFisicoRiesgo/:id', 'R_deleteFisicoRiesgo');
	$app->put('/R_eliminarLogicoRiesgo/:id', 'R_deleteLogicoRiesgo');

	$app->put('/R_confirmarRiesgo/:id', 'R_setConfirmarRiesgo');


	$app->put('/R_modificarRiesgo/:id','R_updateRiesgo');

	

	//Registrar configuracion 
	$app->post('/R_registrarConfiguracionProyecto', 'R_postRegistrarConfiguracionProyecto');//Registrar configuracion

	//Listar Riesgos Comunes
	$app->get('/R_listarRiesgoComun', 'R_getListaRiesgoComun');//Obtener la lista de riesgos comunes
	$app->post('/R_asignarRiesgoComun', 'R_postAsignarRiesgoComun');//Asignar un riesgo comun

	//Header de Probabilidad
	$app->post('/R_registrarHeaderProbabilidadRiesgo', 'R_postRegistrarHeaderProbabilidadRiesgo');//Registrar una fila del header de probabilidad
	$app->get('/R_listaHeadersProbabilidadRiesgo/:id', 'R_getListaHeadersProbabilidadRiesgo');
	$app->delete('/R_eliminarHeaderProbabilidadRiesgo/:id', 'R_deleteListaHeadersProbabilidadRiesgo');

	//TIPO IMPACTO X NIVEL IMPACTOR_registrarTipoImpactoXNivelImpacto1
	$app->post('/R_registrarTipoImpactoXNivelImpacto1', 'R_postRegistrarTipoImpactoNivelImpacto1');//
	$app->post('/R_registrarTipoImpactoXNivelImpacto2', 'R_postRegistrarTipoImpactoNivelImpacto2');//
	$app->get('/R_listarTipoImpactoXNivelImpacto/:id', 'R_getListaTipoImpactoXNivelImpacto');
	$app->get('/R_listaTipoImpacto/:id', 'R_getListaTipoImpacto');
	$app->get('/R_listaHeadersImpactoRiesgo/:id', 'R_getListaHeadersImpactoRiesgo');
	$app->delete('/R_eliminarTipoImpactoxNivelImpacto/:id','R_deleteTipoImpactoxNivelImpacto');
	


	//Equipo Riesgo
	
	$app->post('/R_registrarComiteRiesgo', 'R_postRegistrarComiteRiesgo');
	$app->get('/R_listarIntegrantesProyecto/:id', 'R_getListaIntegrantesProyecto');	
	$app->get('/R_listarComiteRiesgo/:id', 'R_getComiteRiesgo');	

	//Variado
	$app->get('/R_obtenerProbabilidadRiesgoMaxima/:id', 'R_getProbabilidadRiesgoMaxima');
	

?>
