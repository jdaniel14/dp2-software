<?php

//GET to retrieve and search data
//POST to add data
//PUT to update data
//DELETE to delete data

//Jose
$app->get('/G_listaJefeProyectos', 'G_getListaJP'); //lista de los jefes de projectos
$app->get('/G_registrarProyecto', 'G_postRegistrarProyecto'); //registrar un proyecto
$app->get('/G_listaProyecto', 'G_getListaProyecto'); //lista de los proyectos
$app->get('/G_listaTipoProyecto', 'G_getListaTipoProyecto'); //lista de los proyectos  

//Alfonso
$app->put('/G_registrarActa', 'G_addActa'); //registar un acta de constitucion
$app->get('/G_vizualizarActa/:id', 'G_getActa'); //registar un acta de constitucion


	
?>
