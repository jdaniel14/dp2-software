package com.dp2.gproyectos.cronograma.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.dp2.framework.controller.Controller;
import com.dp2.framework.controller.internet.HttpConnector;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.cronograma.model.ActividadBean;
import com.dp2.gproyectos.cronograma.model.GetListaActividadesResponse;
import com.dp2.gproyectos.cronograma.model.GetListaRecursosResponse;
import com.dp2.gproyectos.cronograma.model.MensajeResponse;
import com.dp2.gproyectos.cronograma.model.RecursoBean;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.google.gson.Gson;

public class CronogramaController extends Controller{
	public static CronogramaController instance = null;
	private static ArrayList<ActividadBean> listaActividades = null;
	public static MensajeResponse mensaje = null;
	private static final int IO_BUFFER_SIZE = 4 * 1024;
	
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
	
	public ArrayList<RecursoBean> getRecursos(int idActividad) {
		String path = ServerConstants.SERVER_URL + ServerConstants.CronogramaGetRecursosPorActividad +"/";
		ArrayList<RecursoBean> listaRecursos = null;
		
		Gson gs = new Gson();
		String strResponse = "";
		GetListaRecursosResponse objResponse = null;
		
		JSONObject parametros = new JSONObject();
		try {
			parametros.put("id", idActividad);
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		HttpResponse respuesta = HttpConnector.makeGetRequest(path, parametros.toString());
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
		
		objResponse = gs.fromJson(result, GetListaRecursosResponse.class);
		if (objResponse!=null){
			listaRecursos  = objResponse.recursos;
		}
		return listaRecursos ;
	}
	
	
	public String getGanttHtml() {
		String strRespuesta = "";
		String path = ServerConstants.SERVER_URL + ServerConstants.COSTOS_CO_YOLO_URL + "/";
		
		JSONObject json = new JSONObject();
		try {
//			json.put("idProyecto", idProyecto);
//			json.put("indicador", indicador);
//			json.put("fecha", strFecha);
			json.put("idUsuario", UsuarioController.getInstance().currentUser.id);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		HttpResponse respuesta = HttpConnector.makeGetRequest(path, "");
		
		if ((respuesta != null) && respuesta.getStatusLine().getStatusCode() == 200) {
			try {
				strRespuesta = EntityUtils.toString(respuesta.getEntity());
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			strRespuesta = "";
		}
		
		return strRespuesta;
	}
	
//	public Bitmap getGanttImage() {
//		Bitmap bitmap = null;
//	    InputStream in = null;
//	    BufferedOutputStream out = null;
//	    String url = ServerConstants.COSTOS_TEST_IMAGE;
//
//	    try {
//	        in = new BufferedInputStream(new URL(url).openStream(), IO_BUFFER_SIZE);
//
//	        final ByteArrayOutputStream dataStream = new ByteArrayOutputStream();
//	        out = new BufferedOutputStream(dataStream, IO_BUFFER_SIZE);
//	        copy(in, out);
//	        out.flush();
//
//	        final byte[] data = dataStream.toByteArray();
//	        BitmapFactory.Options options = new BitmapFactory.Options();
//	        //options.inSampleSize = 1;
//
//	        bitmap = BitmapFactory.decodeByteArray(data, 0, data.length,options);
//	    } catch (IOException e) {
//	        //Log.e(TAG, "Could not load Bitmap from: " + url);
//	    } finally {
//	        closeStream(in);
//	        closeStream(out);
//	    }
//
//	    return bitmap;
//	}
	
	public Bitmap getGanttImage() {
		BitmapFactory.Options bmOptions;
	    bmOptions = new BitmapFactory.Options();
	    bmOptions.inSampleSize = 1;
		Bitmap bm = LoadImage(ServerConstants.COSTOS_TEST_IMAGE, bmOptions);
		
		return bm;
	}

	private Bitmap LoadImage(String URL, BitmapFactory.Options options)
	{       
		Bitmap bitmap = null;
		InputStream in = null;       
		try {
			in = OpenHttpConnection(URL);
			bitmap = BitmapFactory.decodeStream(in, null, options);
			in.close();
		} catch (IOException e1) {
		}
		return bitmap;               
	}

	private InputStream OpenHttpConnection(String strURL) throws IOException{
		InputStream inputStream = null;
		URL url = new URL(strURL);
		URLConnection conn = url.openConnection();

		try{
			HttpURLConnection httpConn = (HttpURLConnection)conn;
			httpConn.setRequestMethod("GET");
			httpConn.connect();

			if (httpConn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				inputStream = httpConn.getInputStream();
			}
		}
		catch (Exception ex)
		{
		}
		return inputStream;
	}
}
