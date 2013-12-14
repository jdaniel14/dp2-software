package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.content.Context;
import android.os.Bundle;

import com.actionbarsherlock.app.SherlockActivity;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.model.RecursoBean;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.view.adapter.RecursosAdapter;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.markupartist.android.widget.PullToRefreshListView;

//import android.widget.ListView;

public class ListaRecursosXProyecto extends SherlockActivity implements
		Loadingable {
	PullToRefreshListView lvRecursos;
	ArrayList<RecursoBean> recursos;
	RecursosAdapter adapter;
	Context context;
	ProyectoBean esteProyecto;
	RecursoBean esteRecurso;
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
		super.setContentView(R.layout.general_recursos_lista_layout);

		getSherlock().getActionBar().setTitle(R.string.menu_recursos);
		getSherlock().getActionBar().setIcon(R.drawable.maleta);

		try {
			esteProyecto = (ProyectoBean) getIntent().getSerializableExtra(
					"proyecto");
		} catch (Exception e) {
			e.printStackTrace();
		}
		lvRecursos = (PullToRefreshListView) findViewById(R.id.lvRecursos);
		// if (primeraCarga) {
		try {

			new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();
			
		} catch (Exception e) {

		}
		// }

	}

	@Override
	public void beforeLoadingData() {

	}

	@Override
	public void loadingData() {
		if (esteProyecto != null) {
			try {
				recursos = ProyectoController.getInstance().getRecursos(
						Integer.parseInt(esteProyecto.id));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	@Override
	public void afterLoadingData() {
		
			if (recursos != null) {
				adapter = new RecursosAdapter(this,
						R.layout.general_recursos_lista_item,
						recursos);
				lvRecursos.setAdapter(adapter);
/*
				lvRecursos.setOnItemClickListener(new OnItemClickListener() {

					@Override
					public void onItemClick(AdapterView<?> l, View v,
							int position, long id) {
						if (position > 0) {
							RecursoBean recurso = (RecursoBean) lvRecursos
									.getItemAtPosition(position);

							PopupRegistrarCosto popup = new PopupRegistrarCosto();
							popup.dialog(ListaRecursosXProyecto.this,
									"Registrar cantidad y costo", esteProyecto,
									recurso);

						}

					}
				});

				lvRecursos.setOnRefreshListener(new OnRefreshListener() {
					@Override
					public void onRefresh() {
						// Do work to refresh the list here.
						new com.dp2.framework.view.LoadTaskDialog(
								(ListaRecursosXProyecto) context,
								MensajesUtility.INFO_CARGANDO).execute();
					}
				});*/
lvRecursos.onRefreshComplete();
			}
		
	}

}
