package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.view.WindowManager.LayoutParams;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.general.entities.CategoriaLeccionBean;
import com.dp2.gproyectos.general.entities.ProyectoBean;

public class PopupRegistrarLeccion {
	private Context context;
	public Dialog dialog;
	LinearLayout linContent;
	ListView lstMensajes;
	ImageView imgIcon;
	TextView txtTitulo;
	TextView txtCabecera;
	Spinner spnRegistrarleccion;
	Spinner spnProyecto;
	EditText edtDescripcionleccion;
	Button btnGrabar;
	Button btnCancelar;

	public void dialog(Context _context, String cabecera,
			final ArrayList<CategoriaLeccionBean> categorias, final ArrayList<ProyectoBean> proyectos) {
		context = _context;

		dialog = new Dialog(_context);
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
		dialog.setContentView(R.layout.pedidosespeciales_popup_barratitulo_layout);
		dialog.getWindow().setLayout(LayoutParams.FILL_PARENT,
				LayoutParams.WRAP_CONTENT);

		linContent = (LinearLayout) dialog.findViewById(R.id.linContent);
		imgIcon = (ImageView) dialog.findViewById(R.id.imgIcon);
		txtTitulo = (TextView) dialog.findViewById(R.id.txtTitulo);

		imgIcon.setImageResource(android.R.drawable.ic_menu_edit);
		txtTitulo.setText(cabecera);
		LayoutInflater vi = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		vi.inflate(R.layout.registra_leccion_layout, linContent);

		/*
		 * txtCabecera = (TextView) linContent.findViewById(R.id.txtCabecera);
		 * txtCabecera.setText(recurso.name);
		 */
		ArrayAdapter<CategoriaLeccionBean> adapter = new ArrayAdapter<CategoriaLeccionBean>(
				context, android.R.layout.simple_spinner_item, categorias);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		ArrayAdapter<ProyectoBean> adapterpro = new ArrayAdapter<ProyectoBean>(
				context, android.R.layout.simple_spinner_item, proyectos);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		spnProyecto = (Spinner) linContent
				.findViewById(R.id.spnProyecto);
		spnRegistrarleccion = (Spinner) linContent
				.findViewById(R.id.spnRegistrarleccion);
		edtDescripcionleccion = (EditText) linContent
				.findViewById(R.id.edtDescripcionleccion);
		spnRegistrarleccion.setAdapter(adapter);
		spnProyecto.setAdapter(adapterpro);

		btnGrabar = (Button) linContent.findViewById(R.id.btnGrabar);
		btnCancelar = (Button) linContent.findViewById(R.id.btnCancelar);
		btnGrabar.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				int pos = spnRegistrarleccion.getSelectedItemPosition();
				int pospro = spnProyecto.getSelectedItemPosition();
				CategoriaLeccionBean categoria = (CategoriaLeccionBean) spnRegistrarleccion
						.getItemAtPosition(pos);
				ProyectoBean proyecto = (ProyectoBean) spnProyecto
						.getItemAtPosition(pospro);
				((GeneralHomeLeccionesListaActivity) context).registrarLeccion(
						categoria, edtDescripcionleccion.getText().toString(), proyecto);
				dialog.dismiss();
			}
		});
		if (categorias!=null){
			if (proyectos!=null){
				if (categorias.size() <= 0 || proyectos.size()<=0) {
					btnGrabar.setEnabled(false);
				} else {
					btnGrabar.setEnabled(true);
				}
			}
			else {
				btnGrabar.setEnabled(false);
			}
		}
		else {
			btnGrabar.setEnabled(false);
		}
		
		btnCancelar.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				dialog.dismiss();
			}
		});
		dialog.show();

		return;
	}

}
