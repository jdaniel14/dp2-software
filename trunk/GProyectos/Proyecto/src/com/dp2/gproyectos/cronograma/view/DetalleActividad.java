package com.dp2.gproyectos.cronograma.view;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.actionbarsherlock.app.SherlockFragmentActivity;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.controller.CronogramaController;
import com.dp2.gproyectos.cronograma.model.ActividadDetalleBean;
import com.dp2.gproyectos.cronograma.model.MensajeResponse;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.view.InterfazPopupMenus;
import com.google.gson.annotations.SerializedName;

public class DetalleActividad extends SherlockFragmentActivity implements Loadingable, InterfazPopupMenus{

	String id_actividad = "";
	String nombre_actividad = "";
	String idProyecto = "";
	String nombreProyecto = "";
	ActividadDetalleBean detalleActividad = null;
	MensajeResponse mensaje;
	
	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
	    // save the current data, for instance when changing screen orientation
		
	}
	
	@Override
	protected void onRestoreInstanceState(Bundle savedState) {
	    super.onRestoreInstanceState(savedState);
	    // restore the current data, for instance when changing the screen
	    // orientation
	    
	}
	
	@Override
	public void accionSeleccionOpcion(String rpta) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.cronograma_detalle_actividad);
		
		id_actividad = getIntent().getExtras().getString("id_actividad");
		nombre_actividad = getIntent().getExtras().getString("nombre_actividad");
		idProyecto = getIntent().getExtras().getString("idProyecto");
		nombreProyecto = getIntent().getExtras().getString("nombreProyecto");
		
		findViewById(R.id.buttonAtras).setOnClickListener(new Button.OnClickListener() {
		    public void onClick(View v) {
		    	Intent i = new Intent(DetalleActividad.this, ListaActividadesXProyecto.class);
				i.putExtra("idProyecto", idProyecto);
				i.putExtra("nombreProyecto", nombreProyecto);
				startActivityForResult(i, 1);
		    }
		});		
		
		//System.out.println("Ultimo vieww");
		System.out.println("Actividad: " + id_actividad);
		new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();
	}

	@Override
	public void loadingData() {
		// TODO Auto-generated method stub
		
		System.out.println("Cargando datos");
		try {
			detalleActividad = CronogramaController.getInstance().getDetalleActividad(id_actividad);
			if (detalleActividad == null) {
				System.out.println("error");
			}
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		
	}

	@Override
	public void afterLoadingData() {
		// TODO Auto-generated method stub
		
		System.out.println("Datos Cargados");
		
		TextView t;
		
		t = (TextView)findViewById(R.id.txtPaqueteEDT);
		t.setText(detalleActividad.wbsNode);
		
		t = (TextView)findViewById(R.id.txtDuracionEstimada);
		t.setText(detalleActividad.duration);
		
		t = (TextView)findViewById(R.id.txtInicioPlan);
		t.setText(detalleActividad.fecha_inicio);
		
		t = (TextView)findViewById(R.id.txtFinPlan);
		t.setText(detalleActividad.fecha_fin);
		
		EditText e;
		e = (EditText)findViewById(R.id.txtPorcentajeAvance);
		e.setText(detalleActividad.avance);
				
		Button b;
		b = (Button)findViewById(R.id.buttonGuardarDetalle);
		
		b.setOnClickListener(new Button.OnClickListener() {
		    public void onClick(View v) {
		    	new GuardarHoras().execute(id_actividad + "");
		    }
		});
		
		//System.out.println("Imprimiendo desde el servicio");
		//System.out.println("nombre rest: " + detalleActividad.name);
		
	}
	
	private class GuardarHoras extends AsyncTask<String, Integer, Double>{
		 
		@Override
		protected Double doInBackground(String... params) {
			// TODO Auto-generated method stub
			postData(params[0]);
			return null;
		}
 
		protected void onPostExecute(Double result){
			System.out.println("Ejecuta yei");
		}
		protected void onProgressUpdate(Integer... progress){
			
		}
 
		public void postData(String task) {
			//EditText mEdit = (EditText) findViewById(avanceId);
			//System.out.println("33333");
			String valorAvance = ((EditText)(findViewById(R.id.txtPorcentajeAvance))).getText().toString();
			//System.out.println("44444");
			System.out.println("Avance ingresado: " + valorAvance);
			System.out.println("Task pasada: " + task);
			//System.out.println("555555");
			
			try {
				mensaje = CronogramaController.getInstance().guardarAvance(task, valorAvance);
				if (mensaje == null) {
					System.out.println("error");
				}
				else{
					Intent i = new Intent(DetalleActividad.this, ListaActividadesXProyecto.class);
					i.putExtra("idProyecto", idProyecto);
					i.putExtra("nombreProyecto", nombreProyecto);
					startActivity(i);
				}
			} catch (Exception e) {
				System.out.println(e.toString());
			}
		}
 
	}

}
