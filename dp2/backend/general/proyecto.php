<?php

            function getListaJP(){
	       $request = \Slim\Slim::getInstance()->request(); //json parameters
	       $edt = json_decode($request->getBody()); //object convert
	       //var_dump($wine);
	       echo json_encode($edt); //json return
	    }


	    function G_getListaJP(){
	    	//$miconexion = new conexion();
	    	echo "listaJP";
	    }
            
            function G_putProyecto(){
	    	//$miconexion = new conexion();
	    	echo "put Proyecto";
	    }
            
            function G_getListaProyecto(){
	    	//$miconexion = new conexion();
	    	$arregloProyecto= array(
                array('Proyecto1','Bonnie Carranza','13/05/2013','23/06/2013'),
                array('Proyecto2','Alfonso Bedoya','01/06/2013','14/10/2013'),
                array('Proyecto3','Jose Astuvilca','15/06/2013','13/09/2013'),
                array('Proyecto4','Bonnie Carranza','21/08/2013','21/10/2013')
                );
                
                echo json_encode($arregloProyecto);
	    }
?>
