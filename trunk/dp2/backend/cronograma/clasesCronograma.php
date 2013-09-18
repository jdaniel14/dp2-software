<?php

class CR_Proyecto {
	public $idProyecto;
	public $nombre;
	public $presupuestoTotal;
	public $porcentajeReserva;
	
	//constructor
	function __construct($idProyecto, $nombre, $presupuestoTotal, $porcentajeReserva) {
		$this->idProyecto = $idProyecto;
		$this->nombre = $nombre;
		$this->presupuestoTotal = $presupuestoTotal;
		$this->porcentajeReserva = $porcentajeReserva;
	}
}

class CR_Recurso {
	public $idRecurso;
	public $unidadMedida;
	public $nombre;
	public $costoUnitario;
	public $moneda;
	public $cantidadUsada;
	
	//constructor
	function __construct($idRecurso, $unidadMedida, $nombre, $costoUnitario, $moneda, $cantidadUsada) {
       $this->idRecurso = $idRecurso;
	   $this->unidadMedida = $unidadMedida;
	   $this->nombre = $nombre;
	   $this->costoUnitario = $costoUnitario;
	   $this->moneda = $moneda;
	   $this->cantidadUsada = $cantidadUsada;
   }
}

class CR_Actividad {
	public $idActividad;
	public $nombre;
	public $tipoCuenta;
	public $costoSubtotal;
	public $costoTotal;
	public $listaRecursos = array();
	public $dependencias = array();
	
	function __construct($idActividad, $nombre, $tipoCuenta, $costoSubtotal, $costoTotal, $listaRecursos) {
           $this->idActividad = $idActividad;
	   $this->nombre = $nombre;
	   $this->tipoCuenta = $tipoCuenta;
	   $this->costoSubtotal = $costoSubtotal;
	   $this->costoTotal = $costoTotal;
	   $this->listaRecursos = $listaRecursos;
	}
}


class CR_CalendarioBase {
	public $idCalendarioBase;
	public $horaInicioUno;
	public $horaFinUno;
	public $horaInicioDos;
	public $horaFinDOs;	
	public $horasDia;
	public $diasMes;
	public $mesesAnho;

	function __construct($idCalendarioBase,$horaInicioUno,$horaFinUno,$horaInicioDos,$horaFinDos,$horasDia,$diasMes,$mesesAnho){
       $this->idCalendarioBase = $idCalendarioBase;
	   $this->horaInicioUno = $horaInicioUno;
	   $this->horaFinUno = $horaFinUno;
	   $this->horaInicioDos = $horaInicioDos;
	   $this->horaFinDos = $horaFinDos;
	   $this->horasDia = $horasDia;
	   $this->diasMes = $diasMes;
	   $this->mesesAnho = $mesesAnho;

	}

}







?>