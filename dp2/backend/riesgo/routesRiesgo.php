<?php
	$app->get('/R_prueba', 'R_prueba'); // Prueba
	$app->get('/R_pruebaR/:params', 'R_pruebaR');

	//Riesgo
	$app->post('/R_registrarRiesgo', 'R_postRegistrarRiesgo');//Registrar un riesgo
	$app->get('/R_obtenerRiesgo/:id', 'R_getRiesgo');//Obtener 1 riesgo
	$app->put('/R_modificarRiesgo/:id','R_updateRiesgo');
	$app->get('/R_listaRiesgo/:var', 'R_getListaRiesgo');
	$app->get('/R_listaPaquetesEDT/:id', 'R_getListaPaquetesEDT');//Obtener los paquetes de un proyecto
	//$app->get('/R_listaNivelesImpacto/:id', 'R_getListaNivelesImpacto');//Obtener la lista de niveles de impacto
	$app->get('/R_obtenerNivelImpactoTipoImpacto1/:var', 'R_getNivelImpactoTipoImpacto1');
	$app->get('/R_obtenerNivelImpactoTipoImpacto2/:var', 'R_getNivelImpactoTipoImpacto2');
	$app->get('/R_obtenerProbabilidadRiesgo/:var', 'R_getProbabilidadRiesgo');
	$app->get('/R_obtenerDescripcionNivelImpactoTipoImpacto/:var', 'R_getDescripcionNivelImpactoTipoImpacto');
	$app->get('/R_obtenerEstadoLogicoRiesgo/:id', 'R_getEstadoLogicoRiesgo');
	$app->put('/R_confirmarRiesgo/:id', 'R_setConfirmarRiesgo');
	$app->put('/R_confirmarRiesgos/:var', 'R_setConfirmarRiesgos');
	$app->put('/R_eliminarLogicoRiesgo/:id', 'R_deleteLogicoRiesgo');
	$app->delete('/R_eliminarFisicoRiesgo/:id', 'R_deleteFisicoRiesgo');


	//Registrar configuracion 
	//$app->post('/R_registrarConfiguracionProyecto', 'R_postRegistrarConfiguracionProyecto');//Registrar configuracion

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
	$app->delete('/R_eliminarTodosTipoImpactoXNivelImpacto/:id','R_deleteTipoImpactoxNivelImpacto');
	
	//Equipo Riesgo
	
	$app->post('/R_registrarComiteRiesgo', 'R_postRegistrarComiteRiesgo');
	$app->get('/R_listarIntegrantesProyecto/:id', 'R_getListaIntegrantesProyecto');	
	$app->get('/R_listarComiteRiesgo/:id', 'R_getComiteRiesgo');	

	//Plan de contigencia
	$app->post('/R_registrarActividadContingencia', 'R_postRegistrarActividadContingencia');
	$app->put('/R_actualizarCostoTiempoRiesgo','R_updateCostoTiempoRiesgo');
	$app->get('/R_obtenerPlanContingenciaRiesgo/:id', 'R_getPlanContingenciaRiesgo');
	$app->get('/R_obtenerAccionesParaAprobar/:id', 'R_getAccionesParaAprobar');


	//$app->get('/R_listarActividadContigencia', 'R_getlistarActividadContigencia');

	//Variado
	$app->get('/R_obtenerProbabilidadRiesgoMaxima/:id', 'R_getProbabilidadRiesgoMaxima');

	//
	$app->put('/R_registrarMaterializacion','R_updateMaterializacion');
    $app->get('/R_obtenerRiesgoMaterializado/:id', 'R_getRiesgoMaterializado');

	//Integracion Cronograma
	$app->get('/R_obtenerCantidadDiasAproximadoxPaquete/:var', 'R_getCantidadDiasAproximadoxPaquete');

?>
