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

?>