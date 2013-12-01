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
		public $nombre;
		public $idnodo;
		public $title;
		public $hijos;
		public $dias;
		public $descripcion;
		public $nodos;
		
	function __construct($no,$idnodo, $title, $hijos, $dias, $descripcion ,$nodos) {
			$this->nombre=$no;
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
		public $solicitado;
		public $cargo;
		public $fundamento;
		public $idprioridadR;
		public $idestadoR;
		public $criterioAceptacion;
		public $idmiembros;
		public $nombre;
		public $idcategoriaR;
		public $nomPrioridad;
		public $nomEstado;
		public $nomCategoria;
		
		function __construct($id_requisito,$descripcion,$solicitud,$cargo,$fundamento_incorporacion,
    			$id_prioridad_requisito,$id_estado_requisito,$criterio_aceptacion,$id_miembros_equipo,$nombre,$cate,$a,$b,$c){
			$this->idrequisito=$id_requisito;
			$this->descripcion=$descripcion;
			$this->solicitado=$solicitud;
			$this->cargo=$cargo;
			$this->fundamento=$fundamento_incorporacion;
			$this->idprioridadR=$id_prioridad_requisito;
			$this->idestadoR=$id_estado_requisito;
			$this->criterioAceptacion=$criterio_aceptacion;
			$this->idmiembros=$id_miembros_equipo;
			$this->nombre=$nombre;
			$this->idcategoriaR=$cate;
			$this->nomPrioridad=$a;
			$this->nomEstado=$b;
			$this->nomCategoria=$c;
					
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
		
		
	class RequisitoXFase{	
		public $idRequisito;
		public $entregable;
		public $fecha;
		public $idFase;
		public $descFase;
		
		function __construct($id,$entre,$fecha,$idFase,$desc){
			$this->idRequisito=$id;
			$this->entregable=$entre;
			$this->fecha=$fecha;
			$this->idFase=$idFase;
			$this->descFase=$desc;
		}
	}
	
	class Fase{
		public $id_fase;
		public $descripcion;
		
		function __construct($id,$desc){
			$this->id_fase=$id;
			$this->descripcion=$desc;
		}
	}
	
	
	class FaseXRequisito{
		public $id_fase;
		public $entregable;
		public $fecha;
		
		function __construct($id,$en,$fe){
			$this->id_fase=$id;
			$this->entregable=$en;
			$this->fecha=$fe;
		}
	}
	
	

?>