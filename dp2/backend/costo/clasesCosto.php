<?php

define('CO_ROL_GERENTE_PORTAFOLIO', 1);
define('CO_ROL_JEFE_PROYECTO', 2);
define('CO_ROL_TEAM_MEMBER', 3);
define('CO_ACCION_VER', 1);
define('CO_ACCION_EDITAR', 2);
define('CO_ACCION_GUARDAR', 3);


class CO_Constants {
	private static $permisos = null;

	public static function getPermisos() {
		if (self::$permisos == null) {
			self::$permisos = array(
				1 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_Permisos(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_Permisos(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_Permisos(true, false, false)),
				2 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_Permisos(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_Permisos(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_Permisos(false, false, false)),
				3 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_Permisos(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_Permisos(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_Permisos(false, false, false)),
				4 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_Permisos(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_Permisos(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_Permisos(false, false, false)),
				5 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_Permisos(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_Permisos(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_Permisos(false, false, false)),
				6 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_Permisos(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_Permisos(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_Permisos(true, false, false)),
				7 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_Permisos(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_Permisos(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_Permisos(false, false, false))
			);
		}
        return self::$permisos;
    }
}

class CO_Permisos {
	public $permiso;
	
	function __construct($ver, $editar, $guardar) {
		$this->permiso = array(
						CO_ACCION_VER => $ver,
						CO_ACCION_EDITAR => $editar,
						CO_ACCION_GUARDAR => $guardar
						);
	}

	public function getAccion($idAccion) {
		switch ($idAccion) {
			case CO_ACCION_VER:
			case CO_ACCION_EDITAR:
			case CO_ACCION_GUARDAR:
				return $this->permiso[$idAccion];
				break;
			default:
				return false;
				break;
		}
	}
}

class CO_Proyecto {
	public $idProyecto;
	public $nombre;
	public $porcentajeReserva;
	public $presupuesto;
	public $indicadorCerrado;
	public $indicadorLineaBase;
	
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
	public $costoFijoDiario;
	public $costoFijoTotal;
	public $indRRHH;

	public $fechaInicio;
	public $fechaFin;
	
	//constructor
	function __construct($idRecurso, $idUnidadMedida, $unidadMedida, $descripcion, $idMoneda, $moneda, $cantidadEstimada, $costoUnitario, $costoFijoDiario, $costoFijoTotal, $indRRHH) {
       $this->idRecurso = $idRecurso;
	   $this->idUnidadMedida = $idUnidadMedida;
	   $this->descripcion = $descripcion;
	   $this->idMoneda = $idMoneda;
	   $this->moneda = $moneda;
	   $this->unidadMedida = $unidadMedida;
	   $this->cantidadEstimada = $cantidadEstimada;
	   $this->costoUnitario = $costoUnitario;
	   $this->costoFijoDiario = $costoFijoDiario;
	   $this->costoFijoTotal = $costoFijoTotal;
	   $this->indRRHH = $indRRHH;
	   $this->fechaInicio = null;
	   $this->fechaFin = null;
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
	public $costoRealPaquete;
	public $costoTotalPaquete;
	public $costoRealTotalPaquete;
	public $listaPaquetesHijo;
	public $estado;
	public $descripcion;
	
	function __construct($idPaquete, $nombre, $costoPaquete, $listaPaquetesHijo) {
		$this->idPaquete = $idPaquete;
		$this->nombre = $nombre;
		$this->costoPaquete = $costoPaquete;
		$this->costoTotalPaquete = 0;
		$this->costoRealTotalPaquete = 0;
		$this->costoRealPaquete = 0;
		$this->listaPaquetesHijo = $listaPaquetesHijo;
		$this->estado = "";
		$this->descripcion = "";
	}
   
	function sumarCostosPaquete() {
		$this->costoTotalPaquete = $this->costoPaquete;
		$this->costoRealTotalPaquete = $this->costoRealPaquete;
		
		//en caso tenga hijos, se le suma el costo de los hijos.
		if (($this->listaPaquetesHijo != null) && (sizeof($this->listaPaquetesHijo) > 0)) {
			foreach ($this->listaPaquetesHijo as $paquete) {
				$paquete->sumarCostosPaquete();
				$this->costoTotalPaquete += $paquete->costoTotalPaquete;
				$this->costoRealTotalPaquete += $paquete->costoRealTotalPaquete;
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
	public $nombreLargo;
	
	function __construct($nombre, $valor, $nombreLargo) {
		$this->nombre = $nombre;
		$this->valor = $valor;
		$this->nombreLargo = $nombreLargo;
	}
}

class CO_Cuenta {
	public $id;
	public $nombre;
	public $costoTotalCuenta;
	public $listaActividades;
	public $mensaje;
	
	function __construct($id, $nombre, $costoTotalCuenta, $listaActividades) {
		$this->id = $id;
		$this->nombre = $nombre;
		$this->costoTotalCuenta = $costoTotalCuenta;
		$this->listaActividades= $listaActividades;
		$this->mensaje = "";
	}
}

?>