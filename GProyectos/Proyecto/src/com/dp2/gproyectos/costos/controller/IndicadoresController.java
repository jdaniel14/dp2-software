package com.dp2.gproyectos.costos.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import android.graphics.Color;

import com.dp2.framework.controller.Controller;
import com.dp2.framework.controller.internet.HttpConnector;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.costos.entities.HistorialIndicadorBean;
import com.dp2.gproyectos.costos.entities.Result;
import com.dp2.gproyectos.costos.entities.IndicadorBean;
import com.dp2.gproyectos.costos.model.GetListaHistorialIndicadoresResponse;
import com.dp2.gproyectos.costos.model.GetListaIndicadoresResponse;
import com.dp2.gproyectos.costos.model.GetMensaje;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.google.gson.Gson;

public class IndicadoresController extends Controller {
	public static IndicadoresController instance = null;
	private static ArrayList<IndicadorBean> listaIndicadores = null;
	private static ArrayList<HistorialIndicadorBean> listaHistorialIndicadores = null;
	private static GetMensaje mensaje = null;
	
	public static IndicadoresController getInstance() {
		if (instance == null) {
			instance = new IndicadoresController();
		}
		return instance;
	}

	public static GetMensaje getMensaje() {
		GetMensaje temp = mensaje;
		mensaje = null;
		return temp;
	}
	
	public ArrayList<IndicadorBean> getIndicadores(String idProyecto, int year, int month, int day) {
		String path = ServerConstants.SERVER_URL + ServerConstants.COSTOS_CO_GETLISTAINDICADORES_URL + "/";
//		String path = "http://localhost:8080/dp2/api/" + ServerConstants.COSTOS_CO_GETLISTAINDICADORES_URL + "/";
		
		Gson gs = new Gson();
		String strResponse = "";
		GetListaIndicadoresResponse objResponse = null;
		
		String json = "{\"idProyecto\":" + idProyecto + ",";
		json = json + "\"idUsuario\":" + UsuarioController.getInstance().currentUser.id + ",";
		json = json + "\"year\":" + year +",";
		json = json + "\"month\":" + month +",";
		json = json + "\"day\":" + day + "}";
		
		//strResponse = "{\"lista\":[{\"nombre\":\"PV\",\"valor\":\"4016\"},{\"nombre\":\"EV\",\"valor\":\"4016\"},{\"nombre\":\"AC\",\"valor\":\"3808\"},{\"nombre\":\"CV\",\"valor\":\"208\"},{\"nombre\":\"CPI\",\"valor\":\"1.0546218487395\"},{\"nombre\":\"SPI\",\"valor\":\"1\"},{\"nombre\":\"SV\",\"valor\":\"0\"}]}";
		//strResponse = getStringFromPOST(path, null);
		//deberia usarse metodo GET
		
		HttpResponse respuesta = HttpConnector.makeGetRequest(path, json);
		String result;
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				result = EntityUtils.toString(respuesta.getEntity());
				objResponse = gs.fromJson(result, GetListaIndicadoresResponse.class);
				if (objResponse.indicadores == null) {
					mensaje = gs.fromJson(result, GetMensaje.class);
				}
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
			listaIndicadores = objResponse.indicadores;
		} else {
			listaIndicadores = null;
			
		}
		return listaIndicadores;
	}
	
	public static boolean isSpecial(IndicadorBean i) {
//		if (i.nombre.equalsIgnoreCase("CPI") || i.nombre.equalsIgnoreCase("SPI"))
//			return true;
		return false;
	}
	
	public static int getColor(IndicadorBean i) {
		if (isSpecial(i)) {
			try {
				if (Double.valueOf(i.valor) < 1)
					return Color.RED;
			} catch(Exception e) {
				e.printStackTrace();
			}
			return Color.GREEN;
		} else {
			return Color.WHITE;
		}
	}
	
	public ArrayList<HistorialIndicadorBean> getHistorialIndicadores(String idProyecto, String indicador, String fecha) {
		String path = ServerConstants.SERVER_URL + ServerConstants.COSTOS_CO_GETHISTORIALINDICADOR_URL + "/";
		
		String strFecha = "";
		Gson gs = new Gson();
		String strResponse = "";
		GetListaHistorialIndicadoresResponse objResponse = null;
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		Calendar calendar = Calendar.getInstance();
		
		try {
			calendar.setTime(sdf.parse(fecha));
			sdf = new SimpleDateFormat("yyyyMMdd");
			strFecha = sdf.format(calendar.getTime());
		} catch (java.text.ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		JSONObject json = new JSONObject();
		try {
			json.put("idProyecto", idProyecto);
			json.put("indicador", indicador);
			json.put("fecha", strFecha);
			json.put("idUsuario", UsuarioController.getInstance().currentUser.id);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		HttpResponse respuesta = HttpConnector.makeGetRequest(path, json.toString());
		String result;
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				result = EntityUtils.toString(respuesta.getEntity());
				objResponse = gs.fromJson(result, GetListaHistorialIndicadoresResponse.class);
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
			listaHistorialIndicadores = objResponse.indicadores;
		} else {
			listaHistorialIndicadores = null;
		}
		return listaHistorialIndicadores;
	}
	
	//ya no se usan
	public ArrayList<Double> getValoresIndicador() {
		return llenarDataFalsaIndicadores();
	}
	
	private ArrayList<Double> llenarDataFalsaIndicadores() {
		ArrayList<Double> lista = new ArrayList<Double>();
		lista.add(Double.valueOf(100));
		lista.add(Double.valueOf(150));
		lista.add(Double.valueOf(125));
		lista.add(Double.valueOf(250));
		lista.add(Double.valueOf(200));
		return lista;
	}
}