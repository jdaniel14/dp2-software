package com.dp2.gproyectos.cronograma.view;

import java.util.ArrayList;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager.LayoutParams;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.view.adapter.StringAdapter;
import com.dp2.gproyectos.view.InterfazPopupMenus;

public class PopupOpciones {
	private Context context;
	public Dialog dialog;
	LinearLayout linContent;
	ListView lstMensajes;
	ImageView imgIcon;
	TextView txtTitulo;
	ListView lvOpciones;
	 String rpta;
	
	public void dialog(Context _context, String cabecera, ArrayList<String> elemento, String respuesta) {
		rpta = respuesta;
		context = _context;
		dialog = new Dialog(_context);
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
		dialog.setContentView(R.layout.pedidosespeciales_popup_barratitulo_layout);
		dialog.getWindow().setLayout(LayoutParams.FILL_PARENT,
				LayoutParams.WRAP_CONTENT);

		linContent = (LinearLayout) dialog.findViewById(R.id.linContent);
		imgIcon = (ImageView) dialog.findViewById(R.id.imgIcon);
		txtTitulo = (TextView) dialog.findViewById(R.id.txtTitulo);
		
		imgIcon.setImageResource(R.drawable.ic_action_user);
		txtTitulo.setText(cabecera);
		LayoutInflater vi = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		vi.inflate(R.layout.menu_opciones,
				linContent);

		lvOpciones = (ListView) linContent.findViewById(R.id.lvOpciones);
		StringAdapter adapter = new StringAdapter(context, R.layout.cronograma_actividad_recursos_lista_item, elemento);
		lvOpciones.setAdapter(adapter);
		
		dialog.show();		

		lvOpciones.setOnItemClickListener(new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				rpta = (String) lvOpciones.getItemAtPosition(arg2);
				//Toast.makeText(context, a, Toast.LENGTH_LONG).show();
				//rpta = (String) lvOpciones.getItemAtPosition(arg2);
				dialog.dismiss();
				((InterfazPopupMenus) context).accionSeleccionOpcion(rpta);
			}
		});
		
	}
	

}
