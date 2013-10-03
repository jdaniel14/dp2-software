<?php
    //GET to retrieve and search data
    //POST to add data
    //PUT to update data
    //DELETE to delete data


    //Bonnie -- lecciones aprendidas
    $app->get('/G_devuelveCategoria', 'G_getCategoria'); //devuelve las categorias de las lecciones aprendidas
    $app->post('/G_registrarLeccionAprendida', 'G_postRegistrarLeccionAprendida'); //registrar una leccion
    $app->get('/G_devuelveProyectosXEmpleado/:id', 'G_getProyectosXEmpleado'); //devuelve la lista de proyectos por empleado
    $app->post('/G_cambiaEstadoLeccionAprendida', 'G_postBorrarLeccionAprendida'); //borra (de modo logico) la leccion aprendida
    $app->post('/G_actualizarLeccionAprendida', 'G_postActualizarLeccionAprendida');
    $app->get('/G_devuelveLeccionesAprendidas', 'G_getLeccionesAprendidas'); //leer todas las lecciones aprendidas
    $app->get('/G_devuelveLeccionAprendidaById/:id', 'G_getLeccionAprendidasById');



		//jose -- RRHH
    $app->post('/G_asignarRecursoProyecto', 'G_getAsignarRecProy'); 
    $app->get('/G_listarRecursoDisponible', 'G_getListarRecDisp'); 
    $app->get('/G_listaRecursoxProyecto', 'G_getListaRecXProyecto'); 

		//Alfonso -- Seguridad
		$app->post('/G_verificaUsuario', 'G_getUsuario'); //devuelve 1 si el usuario y pass son correctas
?>
