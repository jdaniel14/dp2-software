package com.dp2.framework.controller.internet;

import java.util.Iterator;

import org.json.JSONObject;

import com.loopj.android.http.RequestParams;
import com.loopj.android.http.SyncHttpClient;

public abstract class HttpConnector {

	private static SyncHttpClient syncHttpClient = new SyncHttpClient() {

		@Override
		public String onRequestFailed(Throwable error, String content) {
			return null;
		}
	};
	

	public final String JSON_TYPE = "application/json";

	private static RequestParams toRequestParams(JSONObject jsonObject) throws Throwable {
		RequestParams params = null;

		if (jsonObject != null) {
			Iterator<?> itKeys = jsonObject.keys();
			if (itKeys.hasNext()) {
				params = new RequestParams();

				while (itKeys.hasNext()) {
					String key = (String) itKeys.next();
					String value = String.valueOf(jsonObject.get(key));
					params.put(key, value);
				}
			}
		}
		return params;
	}
	
	
	public static String stringFromPost(String url, JSONObject jsonObject)
			throws Throwable {
		
		return syncHttpClient.post(url, toRequestParams(jsonObject));

	}

	public static String stringFromGet(String url, JSONObject jsonObject)
			throws Throwable {
		return syncHttpClient.get(url, toRequestParams(jsonObject));
	}
	
}
