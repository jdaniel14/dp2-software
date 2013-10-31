package com.dp2.framework.view;

import com.dp2.gproyectos.utils.MensajesUtility;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;

public class LoadTaskDialog extends AsyncTask<Void, Integer, Void> {
	// Before running code in the separate thread
	Loadingable component;

	private ProgressDialog pd;
	private String message;
	private Activity context;

	public LoadTaskDialog(Loadingable component, String message,
			ProgressDialog pd) {
		this.component = component;
		this.pd = pd;
		try {
			this.context = (Activity) component;
		} catch (Exception e) {
			this.context = null;
		}

		if (message == null) {
			this.message = MensajesUtility.INFO_CARGANDO;
		} else {
			this.message = message;
		}
	}

	public LoadTaskDialog(Loadingable component, String message) {
		this.component = component;
		this.pd = null;
		try {
			this.context = (Activity) component;
		} catch (Exception e) {
			this.context = null;
		}

		if (message == null) {
			this.message = MensajesUtility.INFO_CARGANDO;
		} else {
			this.message = message;
		}
	}

	@Override
	protected void onPreExecute() {
		component.beforeLoadingData();
		if (component != null) {
			if (pd == null) {
				pd = new ProgressDialog(context);
			}
			pd.setCancelable(false);
			pd.setMessage(message);
			try {
				pd.show();
			} catch(Exception e) {
				e.printStackTrace();
			}
		}

	}

	@Override
	protected Void doInBackground(Void... params) {
		// Get the current thread's token
		synchronized (this) {
			component.loadingData();
		}

		return null;

	}

	@Override
	protected void onPostExecute(Void result) {

		component.afterLoadingData();

		if (pd != null && pd.isShowing()) {
			pd.dismiss();
		}
	}

}