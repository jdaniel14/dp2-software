<?php
	//PRIMER SPRINT
	$app->post('/obtenerEdt','guardarEdt'); //inserta los datos de la creacion del edt
	$app->post('/traerEdt', 'getEdt'); //mostrar el edt
	$app->post('/modificaMostrar','getEdt');
	$app->post('/modificar','modificarTodoEdt');
	$app->post('/eliminarEdt',"eliminarEdt");
	
	//SEGUNDO SPRINT
	$app->post('/AL_crearAlcance','crearAlcance');
	$app->post('/AL_mostrarAlcance','mostrarAlcance');
	$app->post('/AL_modificarAlcance','modificarAlcance');
	$app->post('/AL_eliminarAlcance','eliminarAlcance');
?>