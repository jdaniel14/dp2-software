package com.dp2.gproyectos.cronograma.view;

import java.util.ArrayList;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.EditText;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.controller.IndicadoresController;
import com.dp2.gproyectos.costos.entities.IndicadorBean;
import com.dp2.gproyectos.costos.view.CostosIndicadoresActivity;
import com.dp2.gproyectos.cronograma.controller.CronogramaController;
import com.dp2.gproyectos.cronograma.model.ActividadBean;
import com.dp2.gproyectos.cronograma.model.ActividadesAdapter;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.view.GeneralHomeProyectosListaActivity;
import com.dp2.gproyectos.general.view.adapter.ProyectoAdapter;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.markupartist.android.widget.PullToRefreshListView;

public class ListaActividadesXProyecto extends Activity implements Loadingable{

	private static ArrayList<ActividadBean> tasks;
	String idProyecto;
	String nombreProyecto;
	
	PullToRefreshListView listActs;
	ActividadesAdapter adapter;
	
	int firstLoad = 1;
	
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
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadingData() {
		System.out.println("Cargando datos");
		try {
			tasks = CronogramaController.getInstance().getActividades(idProyecto);
			if (tasks == null) {
				System.out.println("error");
			}
		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}

	@Override
	public void afterLoadingData() {
		System.out.println("Datos Cargados");
		
		if (tasks.size() != 0){
			findViewById(R.id.btnVerGantt).setEnabled(true);
			findViewById(R.id.cr_btnGuardarCambios).setEnabled(true);
			
			//Agregar evento a un nuevo Activity donde se muestre el gantt
		}
		
		findViewById(R.id.btnVerGantt).setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent i = new Intent(ListaActividadesXProyecto.this, Gantt.class);
				i.putExtra("idProyecto", idProyecto);
				i.putExtra("nombreProyecto", nombreProyecto);
				startActivity(i);
			}
		});
		
		listActs = (PullToRefreshListView) findViewById(R.id.lvActividades);
		
		adapter = new ActividadesAdapter(this,R.layout.lista_actividades_x_proyecto_items, tasks);
		listActs.setAdapter(adapter);
		
		listActs.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> l, View v, int position,
					long id) {
				if(position > 0){					
					new PedirHoras().execute(position + "");					
				}
			}			
		});
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.lista_actividades_x_proyecto);
				
		cargarDatos();
		
		
	}	
	
	public void cargarDatos(){
		
		System.out.println("Iniciando carga de datos");
		idProyecto = getIntent().getExtras().getString("idProyecto");
		nombreProyecto = getIntent().getExtras().getString("nombreProyecto");
		
		new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();		
	}
	
	//AJAX para pedir las horas reales de una actividad
	private class PedirHoras extends AsyncTask<String, Integer, Double>{
		 
		@Override
		protected Double doInBackground(String... params) {
			// TODO Auto-generated method stub
			postData(params[0]);
			return null;
		}
 
		protected void onPostExecute(Double result){
			System.out.println("Ejecuta yei");
			
			AlertDialog.Builder dialogBuilder = new AlertDialog.Builder(ListaActividadesXProyecto.this);
			
			dialogBuilder.setTitle("Horas Reales");
			dialogBuilder.setMessage("Puede ingresar las horas reales:");
			
			final EditText input = new EditText(ListaActividadesXProyecto.this);
			input.setInputType(InputType.TYPE_CLASS_NUMBER);
								
			dialogBuilder.setView(input);
			
			dialogBuilder.setPositiveButton("Guardar", new DialogInterface.OnClickListener() {
				
				@Override
				public void onClick(DialogInterface dialog, int which) {
					
				}
			});
			
			dialogBuilder.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
				
				@Override
				public void onClick(DialogInterface dialog, int which) {
								
				}
			});
			
			AlertDialog alertDialog = dialogBuilder.create();
			alertDialog.show();	
			
		}
		protected void onProgressUpdate(Integer... progress){
			
		}
 
		public void postData(String pos) {
			System.out.println("Ejecutando ei");
			System.out.println("Datos....");
			System.out.println("Nombre: " + tasks.get(Integer.parseInt(pos) - 1).name);
			try {
				tasks = CronogramaController.getInstance().getActividades(idProyecto);
				if (tasks == null) {
					System.out.println("error");
				}
			} catch (Exception e) {
				System.out.println(e.toString());
			}
		}
 
	}
	
	
	//AJAX para guardar las horas reales cambiadas de una actividad
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
 
		public void postData(String pos) {
			System.out.println("Ejecutando ei");
			System.out.println("Datos....");
			System.out.println("Posicion: " + tasks.get(Integer.parseInt(pos) - 1).name);
			try {
				tasks = CronogramaController.getInstance().getActividades(idProyecto);
				if (tasks == null) {
					System.out.println("error");
				}
			} catch (Exception e) {
				System.out.println(e.toString());
			}
		}
 
	}
	
}
