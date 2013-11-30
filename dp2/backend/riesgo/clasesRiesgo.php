<?php

define('R_ROL_GERENTE_PORTAFOLIO', 1);
define('R_ROL_JEFE_PROYECTO', 2);
define('R_ROL_TEAM_MEMBER', 3);

define('R_ACCION_VER', 1);
define('R_ACCION_EDITAR', 2);
define('R_ACCION_GUARDAR', 3);

define('R_SERVICIO_1', 1);
define('R_SERVICIO_2', 2);
define('R_SERVICIO_3', 3);
define('R_SERVICIO_4', 4);
define('R_SERVICIO_5', 5);
define('R_SERVICIO_6', 6);
define('R_SERVICIO_7', 7);
define('R_SERVICIO_8', 8);
define('R_SERVICIO_9', 9);
define('R_SERVICIO_10', 10);
define('R_SERVICIO_11', 11);
define('R_SERVICIO_12', 12);
define('R_SERVICIO_13', 12);
define('R_SERVICIO_14', 13);
define('R_SERVICIO_15', 14);
define('R_SERVICIO_16', 15);
define('R_SERVICIO_17', 17);
define('R_SERVICIO_18', 18);
define('R_SERVICIO_19', 19);
define('R_SERVICIO_20', 20);
define('R_SERVICIO_21', 21);
define('R_SERVICIO_22', 22);
define('R_SERVICIO_23', 23);
define('R_SERVICIO_24', 24);
define('R_SERVICIO_25', 25);
define('R_SERVICIO_26', 26);
define('R_SERVICIO_27', 27);
define('R_SERVICIO_28', 28);
define('R_SERVICIO_29', 29);
define('R_SERVICIO_30', 30);
define('R_SERVICIO_31', 31);
define('R_SERVICIO_32', 32);
define('R_SERVICIO_33', 33);
define('R_SERVICIO_34', 34);
define('R_SERVICIO_35', 35);
define('R_SERVICIO_36', 36);
define('R_SERVICIO_37', 37);
define('R_SERVICIO_38', 38);

class R_Constants {
	private static $permisosVista = null;
	private static $permisosServicio = null;

	public static function getPermisosVista() {
		if (self::$permisosVista == null) {
			self::$permisosVista = array(
				1 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(true, false, false)),
				2 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(false, false, false)),
				3 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(false, false, false)),
				4 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(false, false, false)),
				5 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(false, false, false)),
				6 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(true, false, false)),
				7 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(false, false, false)),
				8 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(false, false, false)),
				9 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(true, false, false)),
				10 => array(
					R_ROL_GERENTE_PORTAFOLIO => new R_PermisosVista(true, false, false),
					R_ROL_JEFE_PROYECTO => new R_PermisosVista(true, true, true),
					R_ROL_TEAM_MEMBER => new R_PermisosVista(true, false, false))
			);
		}
        return self::$permisosVista;
    }

    public static function getPermisosServicio() {
    	if (self::$permisosServicio == null) {
    		self::$permisosServicio = array( //gerente portafolio, jefe proyecto, team member
    			R_SERVICIO_1 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_2 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_3 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_4 => new R_PermisosServicio(true, true, true),
    			R_SERVICIO_5 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_6 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_7 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_8 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_9 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_10 => new R_PermisosServicio(true, true, true),
    			R_SERVICIO_11 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_12 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_13 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_14 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_15 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_16 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_17 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_18 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_19 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_20 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_21 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_22 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_23 => new R_PermisosServicio(true, true, true),
    			R_SERVICIO_24 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_25 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_26 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_27 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_28 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_29 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_30 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_31 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_32 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_33 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_34 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_35 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_36 => new R_PermisosServicio(false, true, true),
    			R_SERVICIO_37 => new R_PermisosServicio(true, true, true),
    			R_SERVICIO_38 => new R_PermisosServicio(true, true, true),

				R_SERVICIO_100 => new R_PermisosServicio(true, true, true),
    			R_SERVICIO_101 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_102 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_103 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_104 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_105 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_106 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_107 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_108 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_109 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_110 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_111 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_112 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_113 => new R_PermisosServicio(false, true, false),
    			R_SERVICIO_114 => new R_PermisosServicio(true, true, false),
    			R_SERVICIO_115 => new R_PermisosServicio(true, true, true)


    			
    		);
    	}
    	return self::$permisosServicio;
    }

}

class R_PermisosVista {
	private $permiso;
	
	function __construct($ver, $editar, $guardar) {
		$this->permiso = array(
						R_ACCION_VER => $ver,
						R_ACCION_EDITAR => $editar,
						R_ACCION_GUARDAR => $guardar
						);
	}

	public function getAccion($idAccion) {
		switch ($idAccion) {
			case R_ACCION_VER:
			case R_ACCION_EDITAR:
			case R_ACCION_GUARDAR:
				return $this->permiso[$idAccion];
				break;
			default:
				return false;
				break;
		}
	}
}

class R_PermisosServicio {
	private $permiso;

	function __construct($gerenteProy, $jefeProy, $teamMember) {
		$this->permiso = array(
						R_ROL_GERENTE_PORTAFOLIO => $gerenteProy,
						R_ROL_JEFE_PROYECTO => $jefeProy,
						R_ROL_TEAM_MEMBER => $teamMember
						);
	}

	public function getPermiso($idRol) {
		switch ($idRol) {
			case R_ROL_GERENTE_PORTAFOLIO:
			case R_ROL_JEFE_PROYECTO:
			case R_ROL_TEAM_MEMBER:
				return $this->permiso[$idRol];
				break;
			default:
				return false;
				break;
		}
	}
}


?>