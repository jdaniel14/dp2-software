<?php

class G_Proyecto {
	public $idProyecto;
	public $nombreProyecto;
	public $jefeProyecto;
	public $fecha_ini;
        public $fecha_fin;
	
	//constructor
	function __construct($idProyecto, $nombreProyecto, $jefeProyecto, $fecha_ini,$fecha_fin) {
		$this->idProyecto = $idProyecto;
                $this->nombreProyecto = $nombreProyecto;
		$this->jefeProyecto = $jefeProyecto;
		$this->fecha_ini = $fecha_ini;
		$this->fecha_fin = $fecha_fin;
	}
}

class G_Acta {
	public $idProyecto;
	public $patrocinador;
	public $jefeProyecto;
	public $fecha_ini;
        public $fecha_fin;
	
	//constructor
	function __construct($idProyecto, $patrocinador, $jefeProyecto, $fecha_ini,$fecha_fin) {
		$this->idProyecto = $idProyecto;
                $this->patrocinador = $patrocinador;
		$this->jefeProyecto = $jefeProyecto;
		$this->fecha_ini = $fecha_ini;
		$this->fecha_fin = $fecha_fin;
	}
}
?>
