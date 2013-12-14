package com.dp2.gproyectos.general.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dp2.framework.controller.Controller;
import com.dp2.framework.controller.internet.HttpConnector;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.cronograma.model.ActividadBean;
import com.dp2.gproyectos.cronograma.model.GetListaRecursosResponse;
import com.dp2.gproyectos.cronograma.model.RecursoBean;
import com.dp2.gproyectos.general.entities.CategoriaLeccionBean;
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
	
	public ArrayList<CategoriaLeccionBean> getCategorias() {
		String path = ServerConstants.SERVER_URL + ServerConstants.GENERAL_GETCATEGORIASLECCIONES_URL;
		String strResponse = "";
		
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
		
		ArrayList<CategoriaLeccionBean> categorias = new ArrayList<CategoriaLeccionBean>();
		CategoriaLeccionBean categoria;
		JSONObject jObj;
		JSONArray jarr;
		
		try {
			jarr = new JSONArray(result);
			for (int i=0; i<jarr.length(); i++){
				try {
					jObj = jarr.getJSONObject(i);
					categoria = new CategoriaLeccionBean();
					categoria.id = jObj.getString("idCategoria");
					categoria.nombre = jObj.getString("nom");
					categorias.add(categoria);
				} catch (Exception e) {
					
				}
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			categorias = null;
		}
		
		return categorias;
	}
	
public String registrarLeccion (CategoriaLeccionBean categoria, String descripcion, String idexp)  {
		String path = ServerConstants.SERVER_URL + ServerConstants.GENERAL_POSTREGISTRARLECCION_URL;
		
		String strResponse;
	
		JSONObject parametros = new JSONObject();
		try{
			parametros.put("idexp",idexp);
			parametros.put("cla",categoria.id);
			parametros.put("dla",descripcion);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		HttpResponse respuesta = HttpConnector.makeRequest(path, parametros.toString());
		
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				strResponse = EntityUtils.toString(respuesta.getEntity());
				//objResponse = gs.fromJson(strResponse, ValidarLoginResponse.class);
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
		return strResponse;
	}
}
