<?php

//Bonnie - sprint 4
$app->get('/G_listaProfesionRecurso', 'G_getProfesiones');
$app->post('/G_registrarRecurso', 'G_postRegistrarRecurso');
$app->post('/G_actualizarRecurso', 'G_postActualizarRecurso');
$app->get('/G_devuelveListaEmpleados', 'G_getListaEmpleados');
$app->post('/G_darbajaEmpleado', 'G_postDarbajaEmpleado');
$app->get('/G_devuelveProfesion/:id', 'G_getProfesion');

//alfonso
$app->get('/G_verificaLineaBase/:id', 'G_getLineaBase');
$app->get('/G_establecerLineaBase/:id', 'G_setLineaBase');

//jose
$app->get('/G_devuelveListaLineaBase/:id', 'G_getListaLineaBase');
$app->get('/G_listaRecursosDelProyecto/:id', 'G_getListaRecursoProyecto');

//Rodolfo - #YOLO


?>
