<?php
	$app->post('/traerEdt', 'getEdt'); //inserta

	$app->post('/mostrarEdt','mostrarEdt');
	$app->get('/obtenerEdt/:idProyecto/:version','guardarEdt');
	$app->get('/obtenerComboVersion/:idProyecto','getComboVersion');
?>
