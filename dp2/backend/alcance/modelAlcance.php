<?php

/*
Precondicion -> EDTARBOL
	[
        {
          title : DP2,
          hijos : 1,
          nodos : [ 
              {
                 title : Estudio del Pmbook,
                 hijos : 0,
                 nodos : []
              }
          ]

        }        
    ]
*/
	class EdtArbol {
		public $idnodo;
		public $title;
		public $hijos;
		public $dias;
		public $descripcion;
		public $nodos;
		
	function __construct($idnodo, $title, $hijos, $dias, $descripcion ,$nodos) {
			$this->idnodo = $idnodo;
			$this->title = $title;
			$this->hijos = $hijos;
			$this->dias = $dias;			
			$this->descripcion = $descripcion;
			$this->nodos = $nodos;
		}
	}
	
	class Prioridad {
		public $idprioridad;
		public $descripcion;
		
		function __construct($id,$des){
			$this->idprioridad=$id;
			$this->descripcion=$des;
		}
	}
	
	class Estado {
		public $idestado;
		public $descripcion;
	
		function __construct($id,$des){
			$this->idestado=$id;
			$this->descripcion=$des;
		}
	}

	class Requisito {
		public $idrequisito;
		public $descripcion;
		public $fecha;
		public $solicitado;
		public $cargo;
		public $fundamento;
		public $idprioridadR;
		public $idestadoR;
		public $entregable;
		public $criterioAceptacion;
		public $idmiembros;
		public $nombre;
		public $apellido;
		
		function __construct($id_requisito,$descripcion,$fecha_termino,$solicitud,$cargo,$fundamento_incorporacion,
    			$id_prioridad_requisito,$id_estado_requisito,$entregable,$criterio_aceptacion,$id_miembros_equipo,$nombre,$apellido){
			$this->idrequisito=$id_requisito;
			$this->descripcion=$descripcion;
			$this->fecha=$fecha_termino;
			$this->solicitado=$solicitud;
			$this->cargo=$cargo;
			$this->fundamento=$fundamento_incorporacion;
			$this->idprioridadR=$id_prioridad_requisito;
			$this->idestadoR=$id_estado_requisito;
			$this->entregable=$entregable;
			$this->criterioAceptacion=$criterio_aceptacion;
			$this->idmiembros=$id_miembros_equipo;
			$this->nombre=$nombre;
			$this->apellido=$apellido;
		}
	}
		
	class Miembro {
			public $idMiembro;
			public $nombre;
			public $apellido;
			public $telefono;
			public $email;
		
			function __construct($id,$nombre,$apellido,$tele,$email){
				$this->idMiembro=$id;
				$this->nombre=$nombre;
				$this->apellido=$apellido;
				$this->telefono=$tele;
				$this->email=$email;
			}
		}

?>