package com.dp2.gproyectos.general.view;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.dp2.gproyectos.GProyectosConstants;
import com.dp2.gproyectos.R;

public class SplashActivity extends Activity {
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.general_splash_layout);

		new Handler().postDelayed(new Runnable() {

			@Override
			public void run() {
				Intent mainIntent = new Intent(SplashActivity.this,
						GeneralLoginActivity.class);
				SplashActivity.this.startActivity(mainIntent);

				SplashActivity.this.finish();
			}
		}, GProyectosConstants.SPLASH_LENGTH);

	}

}
