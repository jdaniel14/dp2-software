<?php
/*class Conexion {
	private $BaseDatos;
	private $Servidor;
	private $Usuario;
	private $Clave;
	private $Link;
	private $Error = "";

	function Conexion() {
		$this->BaseDatos = "dp2";
		$this->Servidor = "200.16.7.112";
		$this->Usuario = "dp_usuario";
		$this->Clave = "usuario.2013.";
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
}*/
        
        function getConnection() {
                
                //$dbhost="127.0.0.1:3306";/*para el servidor*/
		$dbhost="127.0.0.1";
		$dbuser="usuario";
		$dbpass="usuario.2013.";
		$dbname="dp2";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;		  
	}

	    

?>
