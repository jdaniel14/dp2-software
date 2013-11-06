package com.dp2.gproyectos.view;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.actionbarsherlock.app.SherlockActivity;
import com.dp2.gproyectos.R;

public class VerticalBarraTituloActivity extends SherlockActivity {
	ImageView imgIcon;
	TextView txtTitulo;
	TextView txtFecha;
	LinearLayout linContent;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		//requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.vertical_barratitulo_layout);

//		imgIcon = (ImageView) findViewById(R.id.imgBarraIcon);
//		txtTitulo = (TextView) findViewById(R.id.txtBarraTitulo);
//		txtFecha = (TextView) findViewById(R.id.txtBarraFecha);
		
		getSherlock().getActionBar().setTitle("");
		
		linContent = (LinearLayout) findViewById(R.id.linContent);
		
	}
	
	protected void setAtributos(int icon, String titulo, String fecha){
//		imgIcon.setImageResource(icon);
//		txtTitulo.setText(titulo);
//		txtFecha.setText(fecha);
		
		getSherlock().getActionBar().setTitle(titulo);
		getSherlock().getActionBar().setIcon(icon);
		getSherlock().getActionBar().setSubtitle(fecha);
	}
	
	protected void setAtributos(String titulo, String fecha){
//		imgIcon.setVisibility(View.GONE);
//		txtTitulo.setText(titulo);
//		txtFecha.setText(fecha);
		getSherlock().getActionBar().setTitle(titulo);
		getSherlock().getActionBar().setSubtitle(fecha);
	}
	
	@Override
	public void setContentView(int layoutResID) {
		linContent.removeAllViews();
		LinearLayout.inflate(this, layoutResID, linContent);
	}

	@Override
	public void setContentView(View view) {
		linContent.removeAllViews();
		linContent.addView(view);
	}

	@Override
	public void setContentView(View view, LayoutParams params) {
		linContent.removeAllViews();
		linContent.addView(view, params);
	}

}
