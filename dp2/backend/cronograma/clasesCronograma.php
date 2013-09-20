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

    //constructor
    function __construct($tasks, $selectedRow, $deletedTaskIds, $canWrite, $canWriteOnParent, $roles, $resources) {
        $this->tasks = $tasks;
        $this->selectedRow = $selectedRow;
        $this->deletedTaskIds = $deletedTaskIds;
        $this->canWrite = $canWrite;
        $this->canWriteOnParent = $canWriteOnParent;
        $this->roles = $roles;
        $this->resources = $resources;
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

    //constructor
    function __construct($id, $name) {
        $this->id = $id;
        $this->name = $name;
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

    //constructor
    function __construct($id, $effort, $resourceId, $roleId) {
        $this->id = $id;
        $this->effort = $effort;
        $this->resourceId = $resourceId;
        $this->roleId = $roleId;
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

    function __construct($id, $name, $code, $level, $status, $start, $duration, $end, $startIsMilestone, $endIsMilestone, $assigs, $depends, $description, $progress, $cost) {
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