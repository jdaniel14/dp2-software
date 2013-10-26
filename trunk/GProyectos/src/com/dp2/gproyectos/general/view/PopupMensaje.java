package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.view.WindowManager.LayoutParams;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.general.entities.LeccionBean;

public class PopupMensaje {
	private Context context;
	public Dialog dialog;
	LinearLayout linContent;
	ListView lstMensajes;
	ImageView imgIcon;
	TextView txtTitulo;
	TextView txtCabecera;

	
	public void dialog(Context _context, String cabecera, LeccionBean leccion) {
		context = _context;
		dialog = new Dialog(_context);
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
		dialog.setContentView(R.layout.pedidosespeciales_popup_barratitulo_layout);
		dialog.getWindow().setLayout(LayoutParams.FILL_PARENT,
				LayoutParams.WRAP_CONTENT);

		linContent = (LinearLayout) dialog.findViewById(R.id.linContent);
		imgIcon = (ImageView) dialog.findViewById(R.id.imgIcon);
		txtTitulo = (TextView) dialog.findViewById(R.id.txtTitulo);
		
		imgIcon.setImageResource(R.drawable.mensaje);
		txtTitulo.setText(cabecera);
		LayoutInflater vi = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		vi.inflate(R.layout.mensaje_cuerpo_layout,
				linContent);

		txtCabecera = (TextView) linContent.findViewById(R.id.txtCabecera);
		txtCabecera.setText(leccion.descripcionleccion);
		
		dialog.show();		

		return;
	}



}
