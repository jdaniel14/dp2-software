<?php

class Perfil{
	//Gerente de Portafolio, Jefe de Proyecto, Team member
	private $id;
	private $nombreRol;	

}

class SubMenu{

	private $id;
	private $url;
	private $perfil; //listade Roles
}

class Menu {
	
	private $id;
	private $title;
	private $url;
	private $perfil;
	private $listaSubmenu;
	
	function Menu() {
		
	}

	
}


	
?>