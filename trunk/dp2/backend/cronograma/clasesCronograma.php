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

class CR_ProyectoJSON {//$actividades, 0, array(), true, true, $roles, $recursos

    public $tasks = array();
    public $selectedRow;
    public $deletedTaskIds = array();
    public $roles = array();
    public $resources = array();
    public $canWrite;
    public $canWriteOnParent;
    public $wbsNodes=array();
	public $calendarBase;
	public $tipoCostos=array();
    //constructor
    function __construct($tasks, $selectedRow, $deletedTaskIds, $canWrite, $canWriteOnParent, $roles, $resources,$wbsNodes,$calendarBase,$tipoCostos) {
        $this->tasks = $tasks;
        $this->selectedRow = $selectedRow;
        $this->deletedTaskIds = $deletedTaskIds;
        $this->canWrite = $canWrite;
        $this->canWriteOnParent = $canWriteOnParent;
        $this->roles = $roles;
        $this->resources = $resources;
        $this->wbsNodes = $wbsNodes;
		$this->calendarBase = $calendarBase;
		$this->tipoCostos=$tipoCostos;
    }

}

class CR_IndicadoresJSON{
    
        public $indicadores = array();

    //constructor
    function __construct($indicadores) {
        $this->indicadores = $indicadores;

    }
}

class CR_DependenciasJSON{
    
        public $listaRed = array();
        public $cantBloques;

    //constructor
    function __construct($listaRed,$cantBloques) {
        $this->listaRed = $listaRed;
        $this->cantBloques=$cantBloques;

    }
}

 class Activity
{
  public $id;
  public $id_real;
  public $duration;
  public $est;
  public $lst;
  public $eet;
  public $let;
  public $successors = array();
  public $predecessors = array();
 
   function __construct($id,$id_real,$duration,$est,$lst,$eet,$let,$successors,$predecessors) {
        $this->id = $id;
        $this->id_real=$id_real;
        $this->duration=$duration;
        $this->est = $est;
        $this->lst=$lst;
        $this->eet = $eet;
        $this->let=$let;
        $this->successors = $successors;
        $this->predecessors=$predecessors;

    }
}


class CR_Rol {

    public $id;
    public $name;

    //constructor
    function __construct($id, $name) {
        $this->id = $id;
        $this->name = $name;
    }

}

class CR_Recurso {

    public $id;
    public $name;
	public $typeCost;
	public $costRate;
    //constructor
    function __construct($id, $name,$typeCost,$costRate) {
        $this->id = $id;
        $this->name = $name;
		$this->typeCost=$typeCost;
		$this->costRate=$costRate;
    }

}

class CR_Dependencia {//("1", "11-11-2013","14-11-2013","0");

    public $id;
    public $fecha_ini;
    public $fecha_fin;
    public $id_padres; //separados por comas todos los padres

    //constructor

    function __construct($id, $fecha_ini,$fecha_fin,$id_padres) {
        $this->id = $id;
        $this->fecha_ini = $fecha_ini;
        $this->fecha_fin = $fecha_fin;
        $this->id_padres = $id_padres;
    }

}

class CR_RecursoAsignado {

    public $id;
    public $effort;
    public $resourceId;
    public $roleId;
	public $typeCost;
	public $costRate;
	public $value;
	public $totalValue;
    //constructor
    function __construct($id, $effort, $resourceId, $roleId,$typeCost,$costRate,$value,$totalValue) {
        $this->id = $id;
        $this->effort = $effort;
        $this->resourceId = $resourceId;
        $this->roleId = $roleId;
		$this->typeCost=$typeCost;
		$this->costRate=$costRate;
		$this->value=$value;
		$this->totalValue=$totalValue;
    }

}

class CR_Actividad {

    public $id;
    public $name;
    public $code;
    public $level;
    public $status;
    public $start;
    public $duration;
    public $end;
    public $startIsMilestone;
    public $endIsMilestone;
    public $assigs = array();
    public $description;
    public $depends;
    public $progress;
    public $cost;
	public $wbsNode;

    function __construct($id, $name, $code, $level, $status, $start, $duration, $end, $startIsMilestone, $endIsMilestone, $assigs, $depends, $description, $progress, $cost,$wbsNode) {
        $this->id = $id;
        $this->name = $name;
        $this->code = $code;
        $this->level = $level;
        $this->status = $status;
        $this->start = $start;
        $this->duration = $duration;
        $this->end = $end;
        $this->startIsMilestone = $startIsMilestone;
        $this->endIsMilestone = $endIsMilestone;
        $this->assigs = $assigs;
        $this->description = $description;
        $this->depends = $depends;
        $this->progress = $progress;
        $this->cost = $cost;
		$this->wbsNode=$wbsNode;
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

    function __construct($idCalendarioBase, $horaInicioUno, $horaFinUno, $horaInicioDos, $horaFinDos, $horasDia, $diasMes, $mesesAnho) {
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