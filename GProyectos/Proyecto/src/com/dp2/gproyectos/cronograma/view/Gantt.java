package com.dp2.gproyectos.cronograma.view;

import com.actionbarsherlock.app.SherlockFragmentActivity;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.costos.view.CostosIndicadoresActivity;
import com.dp2.gproyectos.cronograma.controller.CronogramaController;
import com.dp2.gproyectos.utils.MensajesUtility;

import android.app.Activity;
import android.app.ProgressDialog;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;

public class Gantt extends SherlockFragmentActivity implements Loadingable{

	private String idProyecto;
	private String nombreProyecto = "";
	private String html = "";
	private WebView myWebView;
	
	private Bitmap bMapGantt;
//	private ImageView imgGantt;
	private ProgressDialog pd;
	
	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadingData() {
		// TODO Auto-generated method stub
		try {
			html = CronogramaController.getInstance().getGanttHtml();
//			bMapGantt = CronogramaController.getInstance().getGanttImage();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void afterLoadingData() {
		// TODO Auto-generated method stub
		//String summary = "<html><body>You scored <b>192</b> points.</body></html>";
		try {
			myWebView.loadData(html, "text/html", null);
//			myWebView.loadUrl(ServerConstants.COSTOS_TEST_IMAGE);
//			imgGantt.setImageBitmap(bMapGantt);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);		
		super.setContentView(R.layout.cronograma_gantt);
		
		idProyecto = getIntent().getExtras().getString("idProyecto");
		nombreProyecto = getIntent().getExtras().getString("nombreProyecto");
		
		getSherlock().getActionBar().setLogo(R.drawable.maleta);
		getSherlock().getActionBar().setTitle(nombreProyecto);
		
		myWebView = (WebView) findViewById(R.id.cr_webview);
//		myWebView.setWebViewClient(new WebViewClient(){
//	        @Override
//	        public boolean shouldOverrideUrlLoading(WebView view, String url) {
//	        	if (pd == null) {
//					pd = new ProgressDialog(Gantt.this);
//				}
//				pd.setCancelable(false);
//				pd.setMessage("Cargando...");
//	            pd.show();
//	            view.loadUrl(url);
//	            return true;                
//	        }
//	        @Override
//	        public void onPageFinished(WebView view, final String url) {
//	            try {
//	            	pd.dismiss();
//	            } catch (Exception e) {
//	            	e.printStackTrace();
//	            }
//	        }
//	    });
//		imgGantt = (ImageView) findViewById(R.id.cr_gantt);
		
		try {
			new LoadTaskDialog(Gantt.this, MensajesUtility.INFO_CARGANDO).execute();
		} catch (Exception e) {
			
		}
	}
	
}
