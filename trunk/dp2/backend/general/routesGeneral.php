<?php

//GET to retrieve and search data
//POST to add data
//PUT to update data
//DELETE to delete data

//Jose
$app->get('/G_listaJefeProyectos', 'G_getListaJP'); //lista de los jefes de projectos
$app->post('/G_registrarProyecto', 'G_postRegistrarProyecto'); //registrar un proyecto
$app->get('/G_listaProyecto', 'G_getListaProyecto'); //lista de los proyectos
$app->get('/G_listaTipoProyecto', 'G_getListaTipoProyecto'); //lista de los proyectos  

//Alfonso -- acta de constitucion
$app->post('/G_registrarInformacionActa', 'G_addInformacionActa'); //registar la informacion general 
$app->post('/G_registrarDescripcionActa', 'G_addDescripcionActa'); //registar descripcion del proyecto
$app->post('/G_registrarObjetivosActa', 'G_addObjetivosActa'); //registar objetivos del proyecto
$app->post('/G_registrarAutoridadActa', 'G_addAutoridadActa'); //registar Autoridad del proyecto
$app->get('/G_devuelveActa/:id', 'G_getActa'); //devuelve el acta de constitucion de un proyecto


	
?>
