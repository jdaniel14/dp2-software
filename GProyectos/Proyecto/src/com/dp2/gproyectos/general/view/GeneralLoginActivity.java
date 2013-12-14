package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.entities.UsuarioBean;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.utils.ValidacionesUtility;
import com.dp2.gproyectos.view.components.BotonIconTexto;

public class GeneralLoginActivity extends Activity implements Loadingable {
	EditText edtUser;
	EditText edtPassword;
	BotonIconTexto btnInicio;
	UsuarioBean usuario;
	ArrayList<ProyectoBean> proyectos;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		requestWindowFeature(Window.FEATURE_NO_TITLE);
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
			startActivityForResult(intent, 1);
		}
	}

	
}
