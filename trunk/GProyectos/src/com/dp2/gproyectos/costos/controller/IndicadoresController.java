package com.dp2.gproyectos.costos.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;

import android.graphics.Color;

import com.dp2.framework.controller.Controller;
import com.dp2.framework.controller.internet.HttpConnector;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.costos.entities.IndicadorBean;
import com.dp2.gproyectos.costos.model.GetListaIndicadoresResponse;
import com.google.gson.Gson;

public class IndicadoresController extends Controller {
	public static IndicadoresController instance = null;
	private static ArrayList<IndicadorBean> listaIndicadores = null;
	
	public static IndicadoresController getInstance() {
		if (instance == null) {
			instance = new IndicadoresController();
		}
		return instance;
	}


	public ArrayList<IndicadorBean> getIndicadores(String idProyecto, int year, int month, int day) {
		String path = ServerConstants.SERVER_URL + ServerConstants.COSTOS_CO_GETLISTAINDICADORES_URL + "/";
//		String path = "http://localhost:8080/dp2/api/" + ServerConstants.COSTOS_CO_GETLISTAINDICADORES_URL + "/";
		
		Gson gs = new Gson();
		String strResponse = "";
		GetListaIndicadoresResponse objResponse = null;
		
		String json = "%7B%22idProyecto%22:" + idProyecto + ",";
		json = json + "%22year%22:" + year +",";
		json = json + "%22month%22:" + month +",";
		json = json + "%22day%22:" + day + "%7D";
		
		//strResponse = "{\"lista\":[{\"nombre\":\"PV\",\"valor\":\"4016\"},{\"nombre\":\"EV\",\"valor\":\"4016\"},{\"nombre\":\"AC\",\"valor\":\"3808\"},{\"nombre\":\"CV\",\"valor\":\"208\"},{\"nombre\":\"CPI\",\"valor\":\"1.0546218487395\"},{\"nombre\":\"SPI\",\"valor\":\"1\"},{\"nombre\":\"SV\",\"valor\":\"0\"}]}";
		//strResponse = getStringFromPOST(path, null);
		//deberia usarse metodo GET
		
		HttpResponse respuesta = HttpConnector.makeGetRequest(path, json);
		String result;
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				result = EntityUtils.toString(respuesta.getEntity());
				objResponse = gs.fromJson(result, GetListaIndicadoresResponse.class);
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
		if (i.nombre.equalsIgnoreCase("CPI") || i.nombre.equalsIgnoreCase("SPI"))
			return true;
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
}