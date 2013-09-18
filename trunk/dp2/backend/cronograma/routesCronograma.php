<?php
	$app->get('/CR_getActividades/:parametro', 'CR_getActividades'); //servicio1: obtener las actividades del proyecto
	$app->get('/CR_guardarActividades/:parametro', 'CR_guardarActividades'); //servicio2: almacenar las actividades del proyecto en la BD
	$app->get('/CR_getCalendario/:parametro', 'CR_getCalendario'); //servicio3: obtener el calendario base
	$app->get('/CR_guardarCalendario/:parametro', 'CR_guardarCalendario'); //servicio4: guardar el calendario base en la BD

?>