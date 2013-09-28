package com.dp2.framework.controller;

import org.json.JSONObject;

import android.util.Log;

import com.dp2.framework.controller.internet.HttpConnector;
import com.google.gson.Gson;

public abstract class Controller {

	public static <E> E getEntityFromPOST(String url, JSONObject parameters, Class<E> classE) {
		E responseE = null;
		try {
			String response = HttpConnector.stringFromPost(url, parameters);
			responseE = new Gson().fromJson(response, classE);
		} catch (Exception e) {
			Log.e("Controller", e.getMessage());
		} catch (Throwable e) {
			Log.e("Controller", e.getMessage());
		}
		return responseE;
	}
	
	public static String getStringFromPOST(String url, JSONObject parameters) {
		String response = null;
		try {
			response = HttpConnector.stringFromPost(url, parameters);
		} catch (Exception e) {
			Log.e("Controller", e.getMessage());
		} catch (Throwable e) {
			Log.e("Controller", e.getMessage());
		}
		return response;
	}
	
	
}
