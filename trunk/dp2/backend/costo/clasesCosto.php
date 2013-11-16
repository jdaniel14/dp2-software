<?php

define('CO_ROL_GERENTE_PORTAFOLIO', 1);
define('CO_ROL_JEFE_PROYECTO', 2);
define('CO_ROL_TEAM_MEMBER', 3);

define('CO_ACCION_VER', 1);
define('CO_ACCION_EDITAR', 2);
define('CO_ACCION_GUARDAR', 3);

define('CO_SERVICIO_1', 1);
define('CO_SERVICIO_2', 2);
define('CO_SERVICIO_3', 3);
define('CO_SERVICIO_4', 4);
define('CO_SERVICIO_5', 5);
define('CO_SERVICIO_6', 6);
define('CO_SERVICIO_7', 7);
define('CO_SERVICIO_8', 8);
define('CO_SERVICIO_9', 9);
define('CO_SERVICIO_10', 10);
define('CO_SERVICIO_11', 11);
define('CO_SERVICIO_12', 12);
define('CO_SERVICIO_13', 12);
define('CO_SERVICIO_14', 13);
define('CO_SERVICIO_15', 14);
define('CO_SERVICIO_16', 15);
define('CO_SERVICIO_17', 17);
define('CO_SERVICIO_18', 18);
define('CO_SERVICIO_19', 19);
define('CO_SERVICIO_20', 20);
define('CO_SERVICIO_21', 21);
define('CO_SERVICIO_22', 22);
define('CO_SERVICIO_23', 23);
define('CO_SERVICIO_24', 24);
define('CO_SERVICIO_25', 25);
define('CO_SERVICIO_26', 26);
define('CO_SERVICIO_27', 27);

class CO_Constants {
	private static $permisosVista = null;
	private static $permisosServicio = null;

	public static function getPermisosVista() {
		if (self::$permisosVista == null) {
			self::$permisosVista = array(
				1 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(true, false, false)),
				2 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(false, false, false)),
				3 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(false, false, false)),
				4 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(false, false, false)),
				5 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(false, false, false)),
				6 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(true, false, false)),
				7 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(false, false, false)),
				8 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(false, false, false)),
				9 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(true, false, false)),
				10 => array(
					CO_ROL_GERENTE_PORTAFOLIO => new CO_PermisosVista(true, false, false),
					CO_ROL_JEFE_PROYECTO => new CO_PermisosVista(true, true, true),
					CO_ROL_TEAM_MEMBER => new CO_PermisosVista(true, false, false))
			);
		}
        return self::$permisosVista;
    }

    public static function getPermisosServicio() {
    	if (self::$permisosServicio == null) {
    		self::$permisosServicio = array( //gerente portafolio, jefe proyecto, team member
    			CO_SERVICIO_1 => new CO_PermisosServicio(true, true, true),
    			CO_SERVICIO_2 => new CO_PermisosServicio(true, true, true),
    			CO_SERVICIO_3 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_4 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_5 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_6 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_7 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_8 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_9 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_10 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_11 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_12 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_13 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_14 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_15 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_16 => new CO_PermisosServicio(true, true, true),
    			CO_SERVICIO_17 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_18 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_19 => new CO_PermisosServicio(true, true, true),
    			CO_SERVICIO_20 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_21 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_22 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_23 => new CO_PermisosServicio(false, true, false),
    			CO_SERVICIO_24 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_25 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_26 => new CO_PermisosServicio(true, true, false),
    			CO_SERVICIO_27 => new CO_PermisosServicio(true, true, false)
    		);
    	}
    	return self::$permisosServicio;
    }
}

class CO_PermisosVista {
	private $permiso;
	
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

class CO_PermisosServicio {
	private $permiso;

	function __construct($gerenteProy, $jefeProy, $teamMember) {
		$this->permiso = array(
						CO_ROL_GERENTE_PORTAFOLIO => $gerenteProy,
						CO_ROL_JEFE_PROYECTO => $jefeProy,
						CO_ROL_TEAM_MEMBER => $teamMember
						);
	}

	public function getPermiso($idRol) {
		switch ($idRol) {
			case CO_ROL_GERENTE_PORTAFOLIO:
			case CO_ROL_JEFE_PROYECTO:
			case CO_ROL_TEAM_MEMBER:
				return $this->permiso[$idRol];
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
	public $porcentajeContingencia;
	
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