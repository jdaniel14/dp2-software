package com.dp2.gproyectos.general.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;

import com.dp2.framework.controller.Controller;
import com.dp2.framework.controller.internet.HttpConnector;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.general.entities.LeccionBean;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.model.GetListaLeccionesResponse;
import com.dp2.gproyectos.general.model.GetListaProyectosResponse;
import com.dp2.gproyectos.general.model.PruebaResponse;
import com.google.gson.Gson;

public class LeccionController extends Controller {
	public static LeccionController instance = null;
	private static ArrayList<LeccionBean> listaLecciones = null;
	
	public static LeccionController getInstance() {
		if (instance == null) {
			instance = new LeccionController();
		}
		return instance;
	}

	public ArrayList<LeccionBean> getLecciones() {
		String path = ServerConstants.SERVER_URL + ServerConstants.GENERAL_GETLISTALECCIONES_URL;

		Gson gs = new Gson();
		String strResponse = "";
		GetListaLeccionesResponse objResponse = null;
		
		HttpResponse respuesta = HttpConnector.makeGetRequest(path, "");
		String result;
		if (respuesta != null) {
			try {
				result = EntityUtils.toString(respuesta.getEntity());
			} catch (ParseException e) {
				e.printStackTrace();
				result = strResponse;
			} catch (IOException e) {
				e.printStackTrace();
				result = strResponse;
			}
		} else {
			result = strResponse;
		}
		
		objResponse = gs.fromJson(result, GetListaLeccionesResponse.class);
		if (objResponse!=null){
			listaLecciones = objResponse.lecciones;
		}
		return listaLecciones;
	}
}
