package com.dp2.gproyectos;

import android.app.Application;
import android.content.Context;

import com.dp2.gproyectos.utils.DateUtility;

public class GProyectosApp extends Application {
	public static Context context;

	@Override
	public void onCreate() {
		super.onCreate();

		context = getApplicationContext();
		GProyectosConstants.FECHA_HOY = DateUtility.getFechaActual();
	}

}
