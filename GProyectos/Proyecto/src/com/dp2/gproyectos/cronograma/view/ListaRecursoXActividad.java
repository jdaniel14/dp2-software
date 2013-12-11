package com.dp2.gproyectos.cronograma.view;

import java.util.ArrayList;

import org.json.JSONObject;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Toast;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.GProyectosConstants;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.controller.CronogramaController;
import com.dp2.gproyectos.cronograma.model.ActividadBean;
import com.dp2.gproyectos.cronograma.model.RecursoBean;
import com.dp2.gproyectos.cronograma.view.adapter.RecursosAdapter;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.view.VerticalBarraTituloActivity;
import com.markupartist.android.widget.PullToRefreshListView;
import com.markupartist.android.widget.PullToRefreshListView.OnRefreshListener;

//import android.widget.ListView;

public class ListaRecursoXActividad extends VerticalBarraTituloActivity
		implements Loadingable {
	PullToRefreshListView lvRecursos;
	ArrayList<RecursoBean> recursos;
	RecursosAdapter adapter;
	Context context;
	ActividadBean estaActividad;
	ProyectoBean esteProyecto;
	RecursoBean esteRecurso;
	String estadoLineaBase;
	String estaCantidad;
	String esteCosto;
	String res = "";
	
	int pos;
	int accion = 0;
	public static boolean primeraCarga = true;

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		// save the current data, for instance when changing screen orientation
		// outState.putSerializable("proyectos", proyectos);
	}

	@Override
	protected void onRestoreInstanceState(Bundle savedState) {
		super.onRestoreInstanceState(savedState);
		// restore the current data, for instance when changing the screen
		// orientation
		// proyectos = (ArrayList<ProyectoBean>)
		// savedState.getSerializable("proyectos");
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		// requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.cronograma_actividad_recursos_lista_layout);

		setAtributos(R.drawable.maleta, getString(R.string.menu_recursos),
				GProyectosConstants.FECHA_HOY);

		try {
			estaActividad = (ActividadBean) getIntent().getSerializableExtra(
					"actividad");
			esteProyecto = (ProyectoBean) getIntent().getSerializableExtra(
					"proyecto");
		} catch (Exception e) {
			e.printStackTrace();
		}

		lvRecursos = (PullToRefreshListView) findViewById(R.id.lvRecursos);
		// if (primeraCarga) {
		try {
			accion = 1;
			new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();
			primeraCarga = false;
		} catch (Exception e) {

		}
		// }

	}

	@Override
	public void beforeLoadingData() {

	}

	@Override
	public void loadingData() {
		switch (accion) {
		case 1:
			if (estaActividad != null) {
				try {
					recursos = CronogramaController.getInstance().getRecursos(
							Integer.parseInt(estaActividad.id));
					estadoLineaBase = ProyectoController.getInstance().getEstadoLineaBase(Integer.parseInt(esteProyecto.id));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			break;
		case 2:
			res = CronogramaController.getInstance().registrarCantidadCosto(estaActividad, esteRecurso, estaCantidad, esteCosto);
			break;

		default:
			break;
		}

	}

	@Override
	public void afterLoadingData() {
		switch (accion) {
		case 1:
			if (recursos != null) {
				adapter = new RecursosAdapter(this,
						R.layout.cronograma_actividad_recursos_lista_item, recursos);
				lvRecursos.setAdapter(adapter);

				lvRecursos.setOnItemClickListener(new OnItemClickListener() {

					@Override
					public void onItemClick(AdapterView<?> l, View v, int position,
							long id) {
						if (position > 0) {
							if (estadoLineaBase.equals("false")){
								RecursoBean recurso = (RecursoBean) lvRecursos
										.getItemAtPosition(position);

								PopupRegistrarCosto popup = new PopupRegistrarCosto();
								popup.dialog(ListaRecursoXActividad.this,
										"Registrar cantidad y costo", estaActividad,
										recurso);
							}
							else if (estadoLineaBase.equals("true")){
								Toast.makeText(ListaRecursoXActividad.this, "No puede registrar cantidades y costos ya que la linea base esta establecida.", Toast.LENGTH_LONG).show();
							}
						}

					}
				});

				lvRecursos.setOnRefreshListener(new OnRefreshListener() {
					@Override
					public void onRefresh() {
						// Do work to refresh the list here.
						new com.dp2.framework.view.LoadTaskDialog(
								(ListaRecursoXActividad) context,
								MensajesUtility.INFO_CARGANDO).execute();
					}
				});

			}
			break;
		case 2:
			Toast.makeText(this, res, Toast.LENGTH_LONG).show();
			break;

		default:
			break;
		}
		
		accion = 0; //reinicio
	}

	public void registrarCantidadCosto(ActividadBean act, RecursoBean rec,
			final String cantidad, final String costo) {
		estaActividad = act;
		esteRecurso = rec;
		estaCantidad = cantidad;
		esteCosto = costo;
		
		accion = 2;
		new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();
		// RegistrarCantidadCosto a = new RegistrarCantidadCosto(estaActividad,
		// esteRecurso, cantidad, costo);
		// new LoadTaskDialog(new RegistrarCantidadCosto(),
		// MensajesUtility.INFO_CARGANDO).execute();
	}
/*
	private class RegistrarCantidadCosto implements Loadingable {
		ActividadBean estaActivity;
		RecursoBean esteRecurso;
		String estaCantidad;
		String esteCosto;
		String res = "";

		
		 * public RegistrarCantidadCosto(ActividadBean actividad, RecursoBean
		 * recurso, String cant, String cost) { estaActivity =actividad;
		 * esteResource = recurso; estaCantidad = cant; esteCosto = cost;
		 * 
		 * new LoadTaskDialog(RegistrarCantidadCosto.this,
		 * MensajesUtility.INFO_CARGANDO).execute(); }
		 

		@Override
		public void beforeLoadingData() {

		}

		@Override
		public void loadingData() {
			// Toast.makeText(ListaRecursoXActividad.this, res,
			// Toast.LENGTH_LONG).show();
			System.out.println("AAAAAAAAAA");
			// res =
			// CronogramaController.getInstance().registrarCantidadCosto(estaActivity,
			// esteResource, estaCantidad, esteCosto);
		}

		@Override
		public void afterLoadingData() {
			// Toast.makeText(ListaRecursoXActividad.this, res,
			// Toast.LENGTH_LONG).show();
		}

	}*/

}
