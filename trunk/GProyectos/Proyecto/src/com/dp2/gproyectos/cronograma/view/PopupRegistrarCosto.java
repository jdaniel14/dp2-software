package com.dp2.gproyectos.cronograma.view;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.Window;
import android.view.WindowManager.LayoutParams;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.model.RecursoBean;

public class PopupRegistrarCosto {
	private Context context;
	public Dialog dialog;
	LinearLayout linContent;
	ListView lstMensajes;
	ImageView imgIcon;
	TextView txtTitulo;
	TextView txtCabecera;
	EditText edtCantidad;
	EditText edtCosto;

	
	public void dialog(Context _context, String cabecera, RecursoBean recurso) {
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
		vi.inflate(R.layout.cronograma_recurso_costo_form_layout,
				linContent);

		/*txtCabecera = (TextView) linContent.findViewById(R.id.txtCabecera);
		txtCabecera.setText(recurso.name);*/
		edtCantidad = (EditText) linContent.findViewById(R.id.edtCantidaad);
		edtCosto = (EditText) linContent.findViewById(R.id.edtCosto);
		dialog.show();		

		return;
	}



}
