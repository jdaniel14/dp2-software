<?php

//Bonnie -- cierre de proyecto
$app->post('/G_cerrarProyecto', 'G_postCerrarProyecto');
$app->get('/G_devuelveValidarCierreProyecto/:id', 'G_getValidarSuccess');
$app->get('/G_listarObjetivosPorProyecto/:id', 'G_getObjetivosPorProyecto');
$app->post('/G_registrarObjetivosPorProyecto', 'G_postObjetivosPorProyecto');
$app->post('/G_actualizarCumpObjetivosPorProyecto', 'G_postCumpObjetivosPorProyecto');
$app->get('/G_devuelveCostoPorProyecto/:id', 'G_consultarListaPaquetes');
//$app->get('/G_devuelveCostoPorProyectoPrueba/:id', 'G_getCostoPorProyectoPrueba');
//$app->get('/G_devuelveCostoPorProyectoPrueba2/:id', 'G_consultarListaPaquetes');

//sprint 4
$app->get('/G_listaProfesionRecurso', 'G_getProfesiones');


//
//servicios de gestion de cambios
?>
