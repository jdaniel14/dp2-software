<?php

//Bonnie -- cierre de proyecto
$app->post('/G_cerrarProyecto', 'G_postCerrarProyecto');
//$app->get('/G_devuelveValidarCierreProyecto/:id', 'G_getValidarSuccess');
$app->get('/G_listarObjetivosPorProyecto/:id', 'G_getObjetivosPorProyecto');
$app->post('/G_registrarObjetivosPorProyecto', 'G_postObjetivosPorProyecto');
$app->post('/G_actualizarCumpObjetivosPorProyecto', 'G_postCumpObjetivosPorProyecto');
$app->get('/G_devuelveCostoPorProyecto/:id', 'G_consultarListaPaquetes');
//$app->get('/G_devuelveCostoPorProyectoPrueba/:id', 'G_getCostoPorProyectoPrueba');
//$app->get('/G_devuelveCostoPorProyectoPrueba2/:id', 'G_consultarListaPaquetes');

//Jose -- Solicitud de Cambio
$app->post('/G_registrarSolicitudCambio', 'G_postRegistraSolicitud');
$app->get('/G_listarSolicitudesCambio', 'G_getListaSolicitud');
$app->post('/G_solicitudCambioAceptDeneg', 'G_postAceptDenegSolicitud');

//
//servicios de gestion de cambios


?>
