<?php


//Jose
$app->post('/G_listaJefeProyectos', 'G_getListaJP'); //lista de los jefes de projectos
$app->get('/G_registrarProyecto', 'G_putProyecto'); //registrar un proyecto
$app->get('/G_listaProyecto', 'G_getListaProyecto'); //lista de los proyectos 

//Alfonso
$app->get('/G_registrarActa', 'G_putActa'); //registar un acta de constitucion
$app->get('/G_vizualizarActa', 'G_getActa'); //registar un acta de constitucion


	
?>
