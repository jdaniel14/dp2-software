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
	
	//TERCER SPRINT
	$app->post('/AL_mostrarMatriz','mostrarMatriz');
	$app->post('/AL_modificarRequisitoM','modificarRequisitoM');
	$app->post('/AL_buscarMiembro','buscarMiembros');
?>