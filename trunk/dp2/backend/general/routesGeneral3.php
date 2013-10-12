<?php

//servicios de cierre de proyecto

$app->get('/G_listarObjetivosPorProyecto/:id', 'G_getObjetivosPorProyecto');
$app->post('/G_registrarObjetivosPorProyecto', 'G_postObjetivosPorProyecto');


//servicios de gestion de cambios
?>
