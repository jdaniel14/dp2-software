package com.dp2.gproyectos.general.controller;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import com.dp2.framework.controller.Controller;
import com.dp2.framework.controller.internet.HttpConnector;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.costos.model.GetListaIndicadoresResponse;
import com.dp2.gproyectos.general.entities.UsuarioBean;
import com.dp2.gproyectos.general.model.ValidarLoginResponse;
import com.google.gson.Gson;

public class UsuarioController extends Controller {
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
		String path = ServerConstants.SERVER_URL + ServerConstants.GENERAL_VALIDARLOGIN_URL;
		//String path = ServerConstants.SERVER_URL + "G_verificaUsuarioPruebaBoni";
		Gson gs = new Gson();
		String strResponse;
		ValidarLoginResponse objResponse = null;
		
		JSONObject parametros = new JSONObject();
		try {
			parametros.put("p_user", usuario);
			parametros.put("p_pass", password);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		HttpResponse respuesta = HttpConnector.makeRequest(path, gs.toJson(parametros));
		
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				strResponse = EntityUtils.toString(respuesta.getEntity());
				objResponse = gs.fromJson(strResponse, ValidarLoginResponse.class);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				strResponse = "";
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				strResponse = "";
			}
		} else {
			strResponse = "";
		}
		objResponse = gs.fromJson(strResponse, ValidarLoginResponse.class);
		if (objResponse!=null){
			if (objResponse.usuario.id == null){
				currentUser = null;
			}
			else 
				currentUser = objResponse.usuario;
		}
		else currentUser = null;
		
		return currentUser;
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
