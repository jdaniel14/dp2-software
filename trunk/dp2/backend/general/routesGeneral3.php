<?php

//Bonnie -- cierre de proyecto
$app->post('/G_cerrarProyecto', 'G_postCerrarProyecto');
$app->get('/G_devuelveValidarCierreProyecto/:id', 'G_getValidarSuccess');
$app->get('/G_listarObjetivosPorProyecto/:id', 'G_getObjetivosPorProyecto');
$app->post('/G_registrarObjetivosPorProyecto', 'G_postObjetivosPorProyecto');
$app->post('/G_actualizarCumpObjetivosPorProyecto', 'G_postCumpObjetivosPorProyecto');

$app->post('/G_verificaUsuarioPruebaBoni/:id', 'G_prueba'); //devuelve 1 si el usuario y pass son correctas
//
//servicios de gestion de cambios
?>
