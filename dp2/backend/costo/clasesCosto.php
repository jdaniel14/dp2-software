<?php

class CO_Proyecto {
	public $idProy;
	public $nombre;
	public $presupuestoTotal;
	public $porcentajeReserva;
}

class CO_Recurso {
	public $idRecurso;
	public $unidadMedida;
	public $nombre;
	public $costoUnitario;
	public $moneda;
	public $cantidadUsada;
}

class CO_Actividad {
	public $idActividad;
	public $nombre;
	public $tipoCuenta;
	public $costoSubtotal;
	public $costoTotal;
	public $listaRecursos;
}

class CO_ContenedorCUR { //Costo Unitario de Recursos + porcentaje de reserva
	public $idProyecto;
	public $listaRecursos;
	public $listaCUR;
	public $porcReserva;
}

class CO_ContenedorTiposCuenta {
	public $idProyecto;
	public $listaActividades;
	public $listaTipoCuenta;
}

/*
class Proyecto {
	public $subtotalERS;
	public $subtotalDocArq;
	public $subtotalModeloDatos;
	public $subtotalAnalisisDiseno;
	public $subtotalImplementacion;
	public $subtotalPruebas
	
	public function calcularSubtotalAnalisisDiseno() {
		$subtotalAnalisisDiseno = $subtotalERS + $subtotalDocArq + $subtotalModeloDatos;
	}
}

function getPresupuesto(){
	$proyecto = new Proyecto();//array(array("Pintura","1","Litros"), array("Cemento","","Litros"));
	$proyecto->subtotalERS = 100;
	$proyecto->subtotalDocArq = 100;
	$proyecto->subtotalModeloDatos = 100;
	$proyecto->subtotalImplementacion = 100;
	$proyecto->subtotalPruebas = 100;
	$proyecto->calcularSubtotalAnalisisDiseno();
	echo json_encode($proyecto);	
}
*/

?>