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
	
	//Fases
	$app->post('/AL_guardarFases','guardarFases'); //ver esto bien ya que uso row y row2 y no se si funciona
	$app->post('AL_mostrarFases','mostrarFases');
	$app->post('AL_modificarFases','modificarFases');
	$app->post('AL_eliminarFase','eliminarFase');
	
	$app->post('AL_mostrarRequisitoXFase','requisitoXFase');
	$app->post('AL_modificarRequistoXFase','modificarRequisitoXFase');
?>