<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

// GET route
$app->get('/efectopucp', 'getPhotos');

// POST route
$app->post(
    '/post',
    function () {
        echo 'This is a POST route';
    }
);

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/delete',
    function () {
        echo 'This is a DELETE route';
    }
);

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();

function getPhotos(){
    $cats=array("http://2.bp.blogspot.com/_7Dz2jUSPC1E/TDYR5gq_eaI/AAAAAAAAEN8/ZbZ4LDNfnIs/s400/gato-malo.jpg","http://www.pueblagentegrande.com/imgs/art/ctpmtxvsh49fh5xrngnt6xchrk.jpg","http://animalmascota.com/wp-content/2013/02/Curar-una-herida-a-un-gato.jpg","http://images02.olx.com.pe/ui/18/66/32/1375842123_183916432_2-Fotos-de--Gato-macho-persa-legitimo-blanco-para-monta.jpg");
    echo json_encode($cats);
    //http://2.bp.blogspot.com/_7Dz2jUSPC1E/TDYR5gq_eaI/AAAAAAAAEN8/ZbZ4LDNfnIs/s400/gato-malo.jpg
    //http://www.pueblagentegrande.com/imgs/art/ctpmtxvsh49fh5xrngnt6xchrk.jpg
    //http://animalmascota.com/wp-content/2013/02/Curar-una-herida-a-un-gato.jpg
    //http://images02.olx.com.pe/ui/18/66/32/1375842123_183916432_2-Fotos-de--Gato-macho-persa-legitimo-blanco-para-monta.jpg
}
?>