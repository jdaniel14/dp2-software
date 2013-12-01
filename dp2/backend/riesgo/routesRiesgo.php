<?php
	$app->get('/R_prueba', 'R_prueba'); // Prueba
	$app->get('/R_pruebaR/:params', 'R_pruebaR');

	//Riesgo
	$app->post('/R_registrarRiesgo', 'R_postRegistrarRiesgo');//Registrar un riesgo
	$app->get('/R_obtenerRiesgo/:var', 'R_getRiesgo');//Obtener 1 riesgo
	$app->put('/R_modificarRiesgo/','R_updateRiesgo');
	$app->get('/R_listaRiesgo/:var', 'R_getListaRiesgo');
	$app->get('/R_listaPaquetesEDT/:var', 'R_getListaPaquetesEDT');//Obtener los paquetes de un proyecto
	//$app->get('/R_listaNivelesImpacto/:id', 'R_getListaNivelesImpacto');//Obtener la lista de niveles de impacto
	$app->get('/R_obtenerNivelImpactoTipoImpacto1/:var', 'R_getNivelImpactoTipoImpacto1');
	$app->get('/R_obtenerNivelImpactoTipoImpacto2/:var', 'R_getNivelImpactoTipoImpacto2');
	$app->get('/R_obtenerProbabilidadRiesgo/:var', 'R_getProbabilidadRiesgo');
	$app->get('/R_obtenerDescripcionNivelImpactoTipoImpacto/:var', 'R_getDescripcionNivelImpactoTipoImpacto');
	$app->get('/R_obtenerEstadoLogicoRiesgo/:var', 'R_getEstadoLogicoRiesgo');
	$app->put('/R_confirmarRiesgo/:var', 'R_setConfirmarRiesgo');
	$app->put('/R_confirmarRiesgos/:var', 'R_setConfirmarRiesgos');
	$app->put('/R_eliminarLogicoRiesgo/:var', 'R_deleteLogicoRiesgo');
	$app->delete('/R_eliminarFisicoRiesgo/:var', 'R_deleteFisicoRiesgo');


	//Registrar configuracion 
	//$app->post('/R_registrarConfiguracionProyecto', 'R_postRegistrarConfiguracionProyecto');//Registrar configuracion

	//Listar Riesgos Comunes
	$app->get('/R_listarRiesgoComun/:var', 'R_getListaRiesgoComun');//Obtener la lista de riesgos comunes
	$app->post('/R_asignarRiesgoComun', 'R_postAsignarRiesgoComun');//Asignar un riesgo comun

	//Header de Probabilidad
	$app->post('/R_registrarHeaderProbabilidadRiesgo', 'R_postRegistrarHeaderProbabilidadRiesgo');//Registrar una fila del header de probabilidad
	$app->get('/R_listaHeadersProbabilidadRiesgo/:var', 'R_getListaHeadersProbabilidadRiesgo');
	$app->delete('/R_eliminarHeaderProbabilidadRiesgo/:var', 'R_deleteListaHeadersProbabilidadRiesgo');

	//TIPO IMPACTO X NIVEL IMPACTOR_registrarTipoImpactoXNivelImpacto1
	$app->post('/R_registrarTipoImpactoXNivelImpacto1', 'R_postRegistrarTipoImpactoNivelImpacto1');//20
	$app->post('/R_registrarTipoImpactoXNivelImpacto2', 'R_postRegistrarTipoImpactoNivelImpacto2');//21
	$app->get('/R_listarTipoImpactoXNivelImpacto/:var', 'R_getListaTipoImpactoXNivelImpacto');//22
	$app->get('/R_listaTipoImpacto/:var', 'R_getListaTipoImpacto');//23
	$app->get('/R_listaHeadersImpactoRiesgo/:var', 'R_getListaHeadersImpactoRiesgo');//24
	$app->delete('/R_eliminarTodosTipoImpactoXNivelImpacto/:var','R_deleteTipoImpactoxNivelImpacto');//25
	
	//Equipo Riesgo
	
	$app->post('/R_registrarComiteRiesgo', 'R_postRegistrarComiteRiesgo');
	$app->get('/R_listarIntegrantesProyecto/:var', 'R_getListaIntegrantesProyecto');	
	$app->get('/R_listarComiteRiesgo/:var', 'R_getComiteRiesgo');	

	//Plan de contigencia
	$app->post('/R_registrarActividadContingencia', 'R_postRegistrarActividadContingencia');
	$app->delete('/R_eliminarActividadContingencia/:id','R_deleteActividadContingencia');
	$app->put('/R_actualizarCostoTiempoRiesgo','R_updateCostoTiempoRiesgo');
	$app->get('/R_obtenerPlanContingenciaRiesgo/:var', 'R_getPlanContingenciaRiesgo');
	$app->get('/R_obtenerAccionesParaAprobar/:var', 'R_getAccionesParaAprobar');
	$app->put('/R_actualizarEnviarCambio','R_updateEnviarCambio');


	//$app->get('/R_listarActividadContigencia', 'R_getlistarActividadContigencia');

	//Variado
	$app->get('/R_obtenerProbabilidadRiesgoMaxima/:var', 'R_getProbabilidadRiesgoMaxima');

	//
	$app->put('/R_registrarMaterializacion','R_updateMaterializacion');
    $app->get('/R_obtenerRiesgoMaterializado/:var', 'R_getRiesgoMaterializado');

	//Integracion Cronograma
	$app->get('/R_obtenerCantidadDiasAproximadoxPaquete/:var', 'R_getCantidadDiasAproximadoxPaquete');

	//________
	$app->put('/R_actualizarEstadoRiesgoProyecto','R_updateEstadoRiesgoProyecto');
	$app->put('/R_cancelarMaterializacion','R_cancelMaterializacion');

?>
