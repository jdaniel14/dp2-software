<?php
	$app->get('/CR_getActividades/:parametro', 'CR_getActividades'); //servicio1: obtener las actividades del proyecto
        $app->post('/CR_postActividades/', 'CR_postActividades'); //servicio1: obtener las actividades del proyecto
	
	$app->get('/CR_guardarActividades/:parametro', 'CR_guardarActividades'); //servicio2: almacenar las actividades del proyecto en la BD
	$app->get('/CR_getCalendarioBase/:parametro', 'CR_getCalendarioBase'); //servicio3: obtener el calendario base del proyecto
	$app->get('/CR_guardarCalendarioBase/:parametro', 'CR_guardarCalendarioBase'); //servicio4: guardar el calendario base en la BD
	$app->get('/CR_getRecursos/:parametro','CR_getRecursos');//servicio5: obtener los recursos asociados a un proyecto
                $app->get('/CR_getDependencias/:parametro','CR_getDependencias');//servicio6: obtener la lista de depndencias asociados a un proyecto(OJO: No importa para el Gantt)
?>