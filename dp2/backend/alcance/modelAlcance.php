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
		public $title;
		public $hijos;
		public $nodos;
		public $descripcion;
		public $diasEDT;
		public $idnodo;
		
	function __construct($title, $hijos, $nodos, $descripcion, $diasEDT, $idnodo ) {
			$this->title = $title;
			$this->hijos = $hijos;
			$this->nodos = $nodos;
			$this->descripcion = $descripcion;
			$this->diasEDT = $diasEDT;
			$this->idnodo = $idnodo;
		}
	}

?>