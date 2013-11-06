package com.dp2.gproyectos.general.controller;

import com.dp2.framework.controller.Controller;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.general.model.PruebaResponse;
import com.google.gson.Gson;

public class PruebaController extends Controller {
	public static PruebaController instance = null;
	
	public static PruebaController getInstance() {
		if (instance == null) {
			instance = new PruebaController();
		}
		return instance;
	}
	
	public PruebaResponse getPrueba(){
		String path = ServerConstants.SERVER_URL + ServerConstants.GET_PRUEBA_URL;
		PruebaResponse objResponse = null;
		String strResponse = null;
		Gson gs = new Gson();
		
		try {
			//strResponse = getStringFromPOST(path, null);
			String a = "{\"me\":\"sape\"}";
			objResponse = gs.fromJson(a, PruebaResponse.class);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return objResponse;
	}
}
