package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.actionbarsherlock.app.SherlockActivity;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuInflater;
import com.actionbarsherlock.view.MenuItem;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.ServerConstants;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.entities.UsuarioBean;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.utils.ValidacionesUtility;
import com.dp2.gproyectos.view.components.BotonIconTexto;

public class GeneralLoginActivity extends SherlockActivity implements Loadingable {
	public static final String PREFS_NAME = "MyPrefsFileForMenuItems";
	EditText edtUser;
	EditText edtPassword;
	BotonIconTexto btnInicio;
	UsuarioBean usuario;
	ArrayList<ProyectoBean> proyectos;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		//requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.general_login_layout);

		btnInicio = (BotonIconTexto) findViewById(R.id.btnInicio);
		edtUser = (EditText) findViewById(R.id.edtUser);
		edtPassword = (EditText) findViewById(R.id.edtPassword);

		btnInicio.setAtributos(R.drawable.maleta, "Login");
		btnInicio.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				boolean ok = validarCampos();
				
				if (ok) {
					new LoadTaskDialog(GeneralLoginActivity.this, null)
					.execute();
				}
			}
		});
		
		SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
	
		/*if(settings.getBoolean("firstAccess", true)){
	            firstAccess(settings);
	    } else {
	    */
        ServerConstants.SERVER_URL = settings.getString("rutaServidor", ServerConstants.SERVER_URL_DEFAULT);
	    //}
	}
	
	private void firstAccess(SharedPreferences settings) {
        SharedPreferences.Editor editor = settings.edit();              
        editor.putBoolean("firstAccess", false);
        editor.putString("rutaServidor", ServerConstants.SERVER_URL_DEFAULT);
        editor.commit();
}

	private int validarUsuario() {
		if (edtUser.getText().length() <= 0 || !ValidacionesUtility.validarStringConContenido(edtUser.getText().toString())) {
			edtUser.setError(MensajesUtility.GENERAL_ERROR_OBLIGATORIO_INGRESAR_USUARIO);
			return -1;
		} else {
			edtUser.setError(null);
		}
		return 1;
	}

	private int validarPassword() {
		if (edtPassword.getText().length() <= 0  || !ValidacionesUtility.validarStringConContenido(edtPassword.getText().toString())) {
			edtPassword.setError(MensajesUtility.GENERAL_ERROR_OBLIGATORIO_INGRESAR_PASSWORD);
			return -1;
		} else {
			edtPassword.setError(null);
		}
		return 1;
	}

	private boolean validarCampos() {
		int vUsuario = validarUsuario();
		if (vUsuario <= 0) {
			return false;
		} else {
			int vPassword = validarPassword();
			if (vPassword <= 0) {
				return false;
			} else {
				return true;
			}
		}

	}

	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void loadingData() {
		try {
			usuario = UsuarioController.getInstance().validarUsuario(edtUser.getText().toString(), edtPassword.getText().toString());
			if (Long.parseLong(usuario.id) >0){
				proyectos = ProyectoController.getInstance().getProyectos(
						UsuarioController.getInstance().currentUser.id);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void afterLoadingData() {
		if (usuario==null){
			//mensaje de error
			Toast.makeText(GeneralLoginActivity.this, "Error al iniciar sesión. Intente nuevamente.", Toast.LENGTH_LONG).show();
		}
		else if (Long.parseLong(usuario.id) >0){
			Intent intent = new Intent(GeneralLoginActivity.this, GeneralHomeProyectosListaActivity.class);
			intent.putExtra("proyectos", proyectos);
			startActivity(intent);
			finish();
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		MenuInflater inflater = getSupportMenuInflater();
		inflater.inflate(R.menu.menu_general_login, menu);

		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		Intent intent;
		switch (item.getItemId()) {
		case R.id.menuGeneralLogin_VerServerConfig:
			//Log.v("XXX", "--------->Ver lecciones");
			intent = new Intent(GeneralLoginActivity.this,
					GeneralServerConfigActivity.class);
			startActivityForResult(intent, 1);
			break;
		}
		return false;
	}
}
