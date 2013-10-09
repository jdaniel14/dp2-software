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
	public $idPaquete;
	public $nombre;
	public $costoPaquete;
	public $costoTotalPaquete;
	public $listaPaquetesHijo;
	
	function __construct($idPaquete, $nombre, $costoPaquete, $listaPaquetesHijo) {
		$this->idPaquete = $idPaquete;
		$this->nombre = $nombre;
		$this->costoPaquete = $costoPaquete;
		$this->costoTotalPaquete = 0;
		$this->listaPaquetesHijo = $listaPaquetesHijo;
	}
   
	function sumarCostosPaquete() {
		$this->costoTotalPaquete = $this->costoPaquete;
		
		//en caso tenga hijos, se le suma el costo de los hijos.
		if (($this->listaPaquetesHijo != null) && (sizeof($this->listaPaquetesHijo) > 0)) {
			foreach ($this->listaPaquetesHijo as $paquete) {
				$paquete->sumarCostosPaquete();
				$this->costoTotalPaquete += $paquete->costoTotalPaquete;
			}
			unset($paquete);
		}
	}
	
	/*
	function obtenerCosto() {
		$costo = $costoPaquete;
		if ($this->listaPaquetesHijo != null) {
			foreach ($this->listaPaquetesHijo as $paquete) {
				$costo += $paquete->costoTotalPaquete;
			}
			unset($paquete);
		}
	}
	*/
}

class CO_Moneda {
	public $idMoneda;
	public $nombre;
	public $tipoCambioASol;
	public $tipoCambioDesdeSol;

	function __construct($idMoneda, $nombre, $tipoCambioASol, $tipoCambioDesdeSol) {
		$this->idMoneda = $idMoneda;
		$this->nombre = $nombre;
		$this->tipoCambioASoles = $tipoCambioASol;
		$this->tipoCambioDesdeSol = $tipoCambioDesdeSol;
	}
}

class CO_UnidadMedida {
	public $idUM;
	public $descripcion;
	
	function __construct($idUM, $descripcion) {
		$this->idUM = $idUM;
		$this->descripcion = $descripcion;
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

class CO_AsientoContable {
	public $id;
	public $descripcion;
	
	function __construct($id, $descripcion) {
		$this->id = $id;
		$this->descripcion = $descripcion;
	}
}

class CO_Indicador {
	public $nombre;
	public $valor;
	
	function __construct($nombre, $valor) {
		$this->nombre = $nombre;
		$this->valor = $valor;
	}
}

class CO_Cuenta {
	public $nombre;
	public $costoCuenta;
	public $costoTotalCuenta;
	public $listaCuentasHijo;
	
	function __construct($nombre, $costoCuenta, $listaCuentasHijo) {
		$this->nombre = $nombre;
		$this->costoCuenta = $costoCuenta;
		$this->costoTotalCuenta= 0;
		$this->listaCuentasHijo= $listaCuentasHijo;
	}
   
	function sumarCostosCuenta() {
		$this->costoTotalPaquete = $this->costoPaquete;
		
		//en caso tenga hijos, se le suma el costo de los hijos.
		if (($this->listaCuentasHijo!= null) && (sizeof($this->listaCuentasHijo) > 0)) {
			foreach ($this->listaCuentasHijo as $cuenta) {
				$cuenta->sumarCostosCuenta();
				$this->costoTotalCuenta+= $cuenta->costoTotalCuenta;
			}
			unset($cuenta);
		}
	}
}

?>