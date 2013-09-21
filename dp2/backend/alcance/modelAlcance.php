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
		
	function __construct($title, $hijos, $nodos) {
			$this->title = $title;
			$this->hijos = $hijos;
			$this->nodos = $nodos;
		}
	}

?>