package com.dp2.gproyectos.cronograma.view;

import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;

public class Gantt extends Activity implements Loadingable{

	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);		
		super.setContentView(R.layout.cronograma_gantt);
		
		WebView myWebView = (WebView) findViewById(R.id.cr_webview);
		String summary = "<html><body>You scored <b>192</b> points.</body></html>";
		myWebView.loadData(summary, "text/html", null);
		
		
		
		
	}
	
}
