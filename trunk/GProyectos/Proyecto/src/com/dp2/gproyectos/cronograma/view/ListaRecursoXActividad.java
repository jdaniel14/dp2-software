package com.dp2.gproyectos.cronograma.view;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.GProyectosConstants;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.controller.CronogramaController;
import com.dp2.gproyectos.cronograma.model.RecursoBean;
import com.dp2.gproyectos.cronograma.view.adapter.RecursosAdapter;
import com.dp2.gproyectos.general.entities.LeccionBean;
import com.dp2.gproyectos.general.view.GeneralHomeLeccionesListaActivity;
import com.dp2.gproyectos.general.view.PopupMensaje;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.view.VerticalBarraTituloActivity;
import com.markupartist.android.widget.PullToRefreshListView;
import com.markupartist.android.widget.PullToRefreshListView.OnRefreshListener;
//import android.widget.ListView;

public class ListaRecursoXActividad extends
		VerticalBarraTituloActivity implements Loadingable {
	PullToRefreshListView lvRecursos;
	ArrayList<RecursoBean> recursos;
	RecursosAdapter adapter;
	Context context;
	
	int pos;
	public static boolean primeraCarga = true;

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
	    // save the current data, for instance when changing screen orientation
	    //outState.putSerializable("proyectos", proyectos);
	}
	
	@Override
	protected void onRestoreInstanceState(Bundle savedState) {
	    super.onRestoreInstanceState(savedState);
	    // restore the current data, for instance when changing the screen
	    // orientation
	    //proyectos = (ArrayList<ProyectoBean>) savedState.getSerializable("proyectos");
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		//requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.cronograma_actividad_recursos_lista_layout);

		setAtributos(R.drawable.maleta, getString(R.string.menu_recursos),
				GProyectosConstants.FECHA_HOY);
		lvRecursos = (PullToRefreshListView) findViewById(R.id.lvRecursos);
		//if (primeraCarga) {
			try {
				new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();
				primeraCarga = false;
			}
			catch(Exception e){
				
			}
		//}
		
	}

	@Override
	public void beforeLoadingData() {

	}

	@Override
	public void loadingData() {
		try {
			recursos = CronogramaController.getInstance().getRecursos(35);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void afterLoadingData() {
		if (recursos!=null){
			adapter = new RecursosAdapter(this,
					R.layout.cronograma_actividad_recursos_lista_item, recursos);
			lvRecursos.setAdapter(adapter);
			
			
			lvRecursos.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> l, View v, int position,
						long id) {
					if (position > 0) {
						RecursoBean recurso = recursos.get(position-1);
						
						PopupRegistrarCosto popup = new PopupRegistrarCosto();
						popup.dialog(ListaRecursoXActividad.this, "Registrar cantidad y costo", recurso);
					
					}
					
				}
			});
			
			lvRecursos.setOnRefreshListener(new OnRefreshListener() {
			    @Override
			    public void onRefresh() {
			        // Do work to refresh the list here.
			    	new com.dp2.framework.view.LoadTaskDialog((ListaRecursoXActividad)context, MensajesUtility.INFO_CARGANDO).execute();
			    }
			});
			
			
		}
	}
	


}
