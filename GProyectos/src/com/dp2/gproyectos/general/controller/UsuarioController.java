package com.dp2.gproyectos.general.controller;

import com.dp2.gproyectos.general.entities.UsuarioBean;

public class UsuarioController {
	public static UsuarioController instance = null;
	public UsuarioBean currentUser = null;
	//private static ArrayList<AgenciaTransporteBean> listaTransportes = new ArrayList<AgenciaTransporteBean>();
	
	public static UsuarioController getInstance() {
		if (instance == null) {
			instance = new UsuarioController();
		}
		return instance;
	}

	public UsuarioController() {
		loadCombos();
	}
	
	private void loadCombos(){
		//Datos que no necesitan estar recargandose
		//getTransportes();
	}
	
	public UsuarioBean validarUsuario (String usuario, String password)  {
		limpiarVariables();

		if (true) {
			currentUser = new UsuarioBean();
			currentUser.usuario = usuario;
			return currentUser;
		}
		return null;
	}
	
	private static void limpiarVariables() {
		UsuarioController.getInstance().currentUser = null;
	}
	
	/*public ArrayList<AgenciaTransporteBean> getTransportes() {

		if(listaTransportes.size() > 0)
			return listaTransportes;
		
		//cargo la lista conectando con el servidor
		
		return listaTransportes;
	}*/


}
