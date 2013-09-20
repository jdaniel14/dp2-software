<?php

class G_Proyecto {
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
?>
