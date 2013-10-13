package com.dp2.framework.controller.internet;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
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
	
	public static HttpResponse makeGetRequest(String uri, String json) {
	    try {
	        HttpGet httpGet = new HttpGet(uri + json);
	        return new DefaultHttpClient().execute(httpGet);
	    } catch (UnsupportedEncodingException e) {
	        e.printStackTrace();
	    } catch (ClientProtocolException e) {
	        e.printStackTrace();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    return null;
	}
	
	public static String stringFromPost(String url, JSONObject jsonObject)
			throws Throwable {
		
		return syncHttpClient.post(url, toRequestParams(jsonObject));

	}

	public static String stringFromGet(String url, JSONObject jsonObject)
			throws Throwable {
		return syncHttpClient.get(url, toRequestParams(jsonObject));
	}
	
	
	
	//testing
	public static HttpResponse makeRequest(String uri, String json) {
	    try {
	        HttpPost httpPost = new HttpPost(uri);
	        //HttpGet httpGet = new HttpGet(uri+json);
	        
	        httpPost.setEntity(new StringEntity(json));
	        httpPost.setHeader("Accept", "application/json");
	        httpPost.setHeader("Content-type", "application/json");
	        return new DefaultHttpClient().execute(httpPost);
	        
	        //return new DefaultHttpClient().execute(httpGet);
	    } catch (UnsupportedEncodingException e) {
	        e.printStackTrace();
	    } catch (ClientProtocolException e) {
	        e.printStackTrace();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    return null;
	}
}
