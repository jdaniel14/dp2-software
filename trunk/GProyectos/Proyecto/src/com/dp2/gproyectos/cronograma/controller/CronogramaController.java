package com.dp2.gproyectos.cronograma.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;

import com.dp2.framework.controller.Controller;
import com.dp2.framework.controller.internet.HttpConnector;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.costos.controller.IndicadoresController;
import com.dp2.gproyectos.costos.entities.IndicadorBean;
import com.dp2.gproyectos.costos.model.GetListaIndicadoresResponse;
import com.dp2.gproyectos.cronograma.model.ActividadBean;
import com.dp2.gproyectos.cronograma.model.GetListaActividadesResponse;
import com.dp2.gproyectos.cronograma.model.MensajeResponse;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.google.gson.Gson;

public class CronogramaController extends Controller{
	public static CronogramaController instance = null;
	private static ArrayList<ActividadBean> listaActividades = null;
	public static MensajeResponse mensaje = null;
	
	public static CronogramaController getInstance() {
		if (instance == null) {
			instance = new CronogramaController();
		}
		return instance;
	}
	
	public ArrayList<ActividadBean> getActividades(String idProyecto) {
		
		String path = ServerConstants.SERVER_URL + ServerConstants.CronogramaGetActividades + "/";
		
		Gson gs = new Gson();
		String strResponse = "";
		GetListaActividadesResponse objResponse = null;
		
		String json = "{\"idProyecto\":" + idProyecto + "}";
		
		HttpResponse respuesta = HttpConnector.makeGetRequest(path, json);
		String result;
		
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				result = EntityUtils.toString(respuesta.getEntity());
				objResponse = gs.fromJson(result, GetListaActividadesResponse.class);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				result = strResponse;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				result = strResponse;
			}
		} else {
			result = strResponse;
		}
		
		//objResponse = gs.fromJson(result, GetListaIndicadoresResponse.class); //temporalmente para pruebas, luego se debe borrar esta linea.
		if (objResponse!=null){
			listaActividades = objResponse.tasks;
		} else {
			listaActividades = null;
		}
		
		//System.out.println("Termino peticion de datos exitosamente");
		
		return listaActividades;
	}
	
	public MensajeResponse guardarAvance(String idActividad, String avance){
		
		String path = ServerConstants.SERVER_URL + ServerConstants.CronogramaGuardarActividades + "/";
		
		System.out.println("idActividad: " + idActividad);
		System.out.println("Avance: " + avance);
		
		Gson gs = new Gson();
		String strResponse = "";
		MensajeResponse objResponse = null;
		
		String json = "{\"id\":" + idActividad + ",";
		json = json + "\"avance\":" + avance + "}";
		
		HttpResponse respuesta = HttpConnector.makeRequest(path, json);
		String result;
		
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				result = EntityUtils.toString(respuesta.getEntity());
				objResponse = gs.fromJson(result, MensajeResponse.class);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				System.out.println(e);
				e.printStackTrace();
				result = strResponse;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println(e);
				e.printStackTrace();
				result = strResponse;
			}
		} else {
			result = strResponse;
		}
		
		mensaje = objResponse;
		
		return mensaje;
	}
	
}
