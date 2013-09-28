package com.dp2.gproyectos.general.controller;

import java.util.ArrayList;

import com.dp2.framework.controller.Controller;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.model.GetListaProyectosResponse;
import com.dp2.gproyectos.general.model.PruebaResponse;
import com.google.gson.Gson;

public class ProyectoController extends Controller {
	public static ProyectoController instance = null;
	private static ArrayList<ProyectoBean> listaProyectos = null;
	
	public static ProyectoController getInstance() {
		if (instance == null) {
			instance = new ProyectoController();
		}
		return instance;
	}

	/*public ArrayList<ProyectoBean> getProyectos() {
		listaProyectos = new ArrayList<ProyectoBean>(); 
		listaProyectos.add(new ProyectoBean("1", "Proyecto 1", "Alfonso Bedoya", "15/09/2013", "15/12/2013", "En proceso"));
		listaProyectos.add(new ProyectoBean("2", "Proyecto 2", "Hector Gomez", "15/09/2013", "15/12/2013","En proceso"));
		listaProyectos.add(new ProyectoBean("3", "Proyecto 3", "Irvin Vargas", "18/09/2013", "18/12/2013","En proceso"));
		listaProyectos.add(new ProyectoBean("4", "Proyecto 4", "Alfonso Bedoya", "19/07/2013", "19/09/2013","Cerrado"));
		listaProyectos.add(new ProyectoBean("5", "Proyecto 5", "Hector Gomez", "19/07/2013", "19/09/2013","Cerrado"));
		
		return listaProyectos;
	}*/

	public ArrayList<ProyectoBean> getProyectos() {
		String path = ServerConstants.SERVER_URL + ServerConstants.GENERAL_GETLISTAPROYECTOS_URL;
		Gson gs = new Gson();
		String strResponse;
		GetListaProyectosResponse objResponse = null;
		
		strResponse = "{\"prs\":[{\"id\":\"1\",\"nom\":\"P1\",\"jp\":\"JP\",\"tp\":\"TP\",\"fi\":\"\",\"ff\":\"\",\"es\":\"Ok\"},{\"id\":\"1\",\"nom\":\"P1\",\"jp\":\"JP\",\"tp\":\"TP\",\"fi\":\"\",\"ff\":\"\",\"es\":\"Ok\"}]}";
		//strResponse = getStringFromPOST(path, null);
		//deberia usarse metodo GET
		objResponse = gs.fromJson(strResponse, GetListaProyectosResponse.class);
		if (objResponse!=null){
			listaProyectos = objResponse.proyectos;
		}
		return listaProyectos;
	}
}
