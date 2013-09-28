package com.dp2.gproyectos.view.components;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.dp2.gproyectos.R;

public class BotonIconTexto extends LinearLayout {
	private ImageView imgIcon;
	private ImageView imgLinea;
	private TextView txtTexto;
	private LinearLayout btn;

	private void inflate() {
		LayoutInflater layoutInflater = (LayoutInflater) getContext()
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		layoutInflater.inflate(R.layout.componente_boton, this);
		this.btn = (LinearLayout) findViewById(R.id.btn);
		this.imgLinea = (ImageView) findViewById(R.id.imgLinea);
		this.imgIcon = (ImageView) findViewById(R.id.imgIcon);
		this.txtTexto = (TextView) findViewById(R.id.txtTexto);
	}

	/*public void setAtributos(int backgroundColorResource, int icon, String texto) {
		btn.setBackgroundResource(backgroundColorResource);
		imgIcon.setImageResource(icon);
		txtTexto.setText(texto);
	}*/
	
	public void setAtributos(int icon, String texto) {
		imgIcon.setImageResource(icon);
		txtTexto.setText(texto);
	}
	
	public void setAtributos(String texto) {
		imgIcon.setVisibility(View.GONE);
		imgLinea.setVisibility(View.GONE);
		txtTexto.setText(texto);
	}

	public BotonIconTexto(Context context) {
		super(context);
		inflate();
	}

	public BotonIconTexto(Context context, AttributeSet attrs) {
		super(context, attrs);
		inflate();
	}

}
