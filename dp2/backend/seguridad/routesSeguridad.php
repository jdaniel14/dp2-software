<?php

//GET to retrieve and search data
//POST to add data
//PUT to update data
//DELETE to delete data

$app->get('/S_obtenerMenuGeneral/:id', 'G_getMenuGeneral'); //devuelve el menuGeneral dado un rol
$app->get('/S_obtenerMenu/:id', 'G_getMenu'); //devuelve el menu dado un rol




	
?>