<?php

//Bonnie -- Lecciones aprendidas
$app->get('/G_devuelveCategoria', 'G_getCategoria'); //devuelve las categorias de las lecciones aprendidas
$app->post('/G_registrarLecApren', 'G_getCategoria'); //devuelve las categorias de las lecciones aprendidas



//jose -- RRHH

//Alfonso -- Seguridad
$app->post('/G_verificaUsuario', 'G_getUsuario'); //devuelve 1 si el usuario y pass son correctas

?>
