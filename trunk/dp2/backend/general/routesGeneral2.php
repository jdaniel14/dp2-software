<?php
    //GET to retrieve and search data
    //POST to add data
    //PUT to update data
    //DELETE to delete data


    //Bonnie -- lecciones aprendidas
    $app->get('/G_devuelveCategoria', 'G_getCategoria'); //devuelve las categorias de las lecciones aprendidas
    $app->post('/G_registrarLeccionAprendida', 'G_postRegistrarLeccionAprendida'); //registrar una leccion
    $app->get('/G_devuelveProyectosXEmpleado/:id', 'G_getProyectosXEmpleado'); //devuelve la lista de proyectos por empleado
    






//jose -- RRHH

//Alfonso -- Seguridad
$app->post('/G_verificaUsuario', 'G_getUsuario'); //devuelve 1 si el usuario y pass son correctas

?>
