<?php

class CO_Proyecto {
	public $idProyecto;
	public $nombre;
	public $porcentajeReserva;
	public $presupuesto;
	
	//constructor
	function __construct($idProyecto, $nombre, $porcentajeReserva, $presupuesto) {
		$this->idProyecto = $idProyecto;
		$this->nombre = $nombre;
		$this->porcentajeReserva = $porcentajeReserva;
		$this->presupuesto = $presupuesto;
	}
}

class CO_Recurso {
	public $idRecurso;
	public $idUnidadMedida;
	public $unidadMedida;
	public $descripcion;
	public $idMoneda;
	public $moneda;
	public $cantidadEstimada;
	public $costoUnitario;
	
	//constructor
	function __construct($idRecurso, $idUnidadMedida, $unidadMedida, $descripcion, $idMoneda, $moneda, $cantidadEstimada, $costoUnitario) {
       $this->idRecurso = $idRecurso;
	   $this->idUnidadMedida = $idUnidadMedida;
	   $this->descripcion = $descripcion;
	   $this->idMoneda = $idMoneda;
	   $this->moneda = $moneda;
	   $this->unidadMedida = $unidadMedida;
	   $this->cantidadEstimada = $cantidadEstimada;
	   $this->costoUnitario = $costoUnitario;
   }
}

class CO_Actividad {
	public $idActividad;
	public $nombre;
	public $tipoCuenta;
	public $costoSubtotal;
	//public $costoTotal;
	public $listaRecursos = array();
	
	function __construct($idActividad, $nombre, $tipoCuenta, $costoSubtotal, /*$costoTotal,*/ $listaRecursos) {
       $this->idActividad = $idActividad;
	   $this->nombre = $nombre;
	   $this->tipoCuenta = $tipoCuenta;
	   $this->costoSubtotal = $costoSubtotal;
	   //$this->costoTotal = $costoTotal;
	   $this->listaRecursos = $listaRecursos;
	}
}

class CO_Paquete {
	public $nombre;
	public $sumaCostosPaquetesHijo;
	public $listaPaquetesHijo;
	
	function __construct($nombre, $listaPaquetesHijo) {
       $this->nombre = $nombre;
	   $this->sumaCostosPaquetesHijo = 0;
	   $this->listaPaquetesHijo = $listaPaquetesHijo;
	   
	   $this->sumarCostosPaqueteHijo();
	}
   
	function sumarCostosPaqueteHijo() {
		if (($this->listaPaquetesHijo != null) && (sizeof($this->listaPaquetesHijo) > 0)) {
			foreach ($this->listaPaquetesHijo as $paquete) {
				$this->sumaCostosPaquetesHijo += $paquete->sumaCostosPaquetesHijo;
			}
			unset($paquete);
		} else {
			$this->sumaCostosPaquetesHijo = 1; //corregir
		}
	}
}

class CO_Moneda {
	public $idMoneda;
	public $nombre;
	public $tipoCambioASoles;

	function __construct($idMoneda, $nombre, $tipoCambioASoles) {
		$this->idMoneda = $idMoneda;
		$this->nombre = $nombre;
		$this->tipoCambioASoles = $tipoCambioASoles;
	}
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