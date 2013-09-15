<?php
class Conexion {
	private $BaseDatos;
	private $Servidor;
	private $Usuario;
	private $Clave;
	private $Link;
	private $Error = "";

	function Conexion() {
		$this->BaseDatos = "";
		$this->Servidor = "";
		$this->Usuario = "root";
		$this->Clave = "";
	}

	function conectar(){
		$this->link = mysql_connect($this->Servidor, $this->Usuario,$this->Clave);
		if (!$this->link){
			$this->Error = "Ha fallado la conexión";
			return 0;
		}
		if (!@mysql_select_db($this->BaseDatos, $this->link)){
			$this->Error = "Bd no se puede abrir";
			return 0;
		}
		return $this->link;
	}
}

?>