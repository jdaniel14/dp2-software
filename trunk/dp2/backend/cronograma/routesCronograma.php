<?php
	$app->get('/CR_getActividades/:parametro', 'CR_getActividades'); //servicio1: obtener las actividades del proyecto
	$app->get('/CR_guardarActividades/:parametro', 'CR_guardarActividades'); //servicio2: almacenar las actividades del proyecto en la BD
	$app->get('/CR_getCalendarioBase/:parametro', 'CR_getCalendarioBase'); //servicio3: obtener el calendario base del proyecto
	$app->post('/CR_guardarCalendarioBase/', 'CR_guardarCalendarioBase'); //servicio4: guardar el calendario base en la BD
	$app->get('/CR_getRecursos/:parametro','CR_getRecursos');//servicio5: obtener los recursos asociados a un proyecto
                $app->get('/CR_getDependencias/:parametro','CR_getDependencias');//servicio6: obtener la lista de depndencias asociados a un proyecto(OJO: No importa para el Gantt)
	
                $app->get('/CR_getPaquetesEDT/:parametro','CR_getPaquetesEDT');//servicio 7 : 
	$app->post('/CR_postActividades/', 'CR_postActividades'); //servicio8: guardar las actividades del proyecto
	$app->get('/CR_getIndicadoresFlujo/:parametro','CR_getIndicadoresFlujo'); //servicio 9 Obtener indicadores del proyecto
	
	$app->get('/CR_getListaActividad/:parametro', 'CR_getListaActividad');//servicio 10 obtener lista de actividades para riesgo
	$app->post('/CR_updateActividad/', 'CR_updateActividad');//servicio 11 modificar actividad nombre y duracion
	$app->post('/CR_updateAvanceActividad/', 'CR_updateAvanceActividad');//servicio 12 modificar avance dias de actividad
	
	
	$app->post('/CR_test/:parametro', 'hallar_fechainicio_fechafin_red');
	
	
?>