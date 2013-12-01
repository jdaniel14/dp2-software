package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

import com.actionbarsherlock.app.SherlockActivity;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuInflater;
import com.actionbarsherlock.view.MenuItem;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.GProyectosConstants;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.view.CostosIndicadoresActivity;
import com.dp2.gproyectos.cronograma.view.ListaActividadesXProyecto;
import com.dp2.gproyectos.cronograma.view.ListaRecursoXActividad;
import com.dp2.gproyectos.cronograma.view.PopupOpciones;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.entities.UsuarioBean;
import com.dp2.gproyectos.general.view.adapter.ProyectoAdapter;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.view.InterfazPopupMenus;
import com.dp2.gproyectos.view.VerticalBarraTituloActivity;
import com.markupartist.android.widget.PullToRefreshListView;
import com.markupartist.android.widget.PullToRefreshListView.OnRefreshListener;

//import android.widget.ListView;

public class GeneralHomeProyectosListaActivity extends
		SherlockActivity implements Loadingable, InterfazPopupMenus {
	PullToRefreshListView lvProyectos;
	ArrayList<ProyectoBean> proyectos;
	ProyectoAdapter adapter;
	Spinner spnBuscar;
	EditText edtBuscar;
	ArrayAdapter<String> busquedaAdapter;
	int pos;
	String[] items = new String[] { "Nombre", "Jefe de proyecto", "Estado" };
	ArrayList<String> opciones = new ArrayList<String>();
	int posicionPasar = 0;

	public static int tipoBusqueda;
	public static boolean primeraCarga = true;

	private static final int CONST_MENU_VERLECCIONES = 0;
	private static final int CONST_MENU_LOGOUT = 1;

	private static final String MENUACT_OP_DETALLE = "Detalle del proyecto";
	private static final String MENUACT_OP_LISTARREC = "Listar recursos";
	private static final String MENUACT_OP_CRONOGRAMA = "Cronograma";
	private static final String MENUACT_OP_INDICADORES = "Indicadores de costos";

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		// save the current data, for instance when changing screen orientation
		outState.putSerializable("proyectos", proyectos);
	}

	@Override
	protected void onRestoreInstanceState(Bundle savedState) {
		super.onRestoreInstanceState(savedState);
		// restore the current data, for instance when changing the screen
		// orientation
		proyectos = (ArrayList<ProyectoBean>) savedState
				.getSerializable("proyectos");
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		// requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.general_home_proyectos_lista_layout);
/*
		setAtributos(R.drawable.maleta, getString(R.string.menu_proyectos),
				GProyectosConstants.FECHA_HOY);*/

    	getSherlock().getActionBar().setTitle("PROYECTOS");
		getSherlock().getActionBar().setIcon(R.drawable.maleta);
		getSherlock().getActionBar().setBackgroundDrawable(getResources().getDrawable(R.color.gproyectos_actionbar));
		
		
		lvProyectos = (PullToRefreshListView) findViewById(R.id.lvProyectos);

		spnBuscar = (Spinner) findViewById(R.id.spnBuscar);
		edtBuscar = (EditText) findViewById(R.id.edtBuscar);
		opciones.clear();
		opciones.add(MENUACT_OP_DETALLE);
		opciones.add(MENUACT_OP_LISTARREC);
		opciones.add(MENUACT_OP_CRONOGRAMA);
		opciones.add(MENUACT_OP_INDICADORES);

		busquedaAdapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_spinner_item, items);
		busquedaAdapter
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		spnBuscar.setAdapter(busquedaAdapter);
		spnBuscar.setOnItemSelectedListener(new OnItemSelectedListener() {

			@Override
			public void onItemSelected(AdapterView<?> arg0, View arg1,
					int arg2, long arg3) {
				tipoBusqueda = arg2;
			}

			@Override
			public void onNothingSelected(AdapterView<?> arg0) {

			}
		});

		edtBuscar.addTextChangedListener(new TextWatcher() {

			@Override
			public void onTextChanged(CharSequence s, int start, int before,
					int count) {
				if (adapter != null)
					adapter.getFilter().filter(s.toString());
			}

			@Override
			public void beforeTextChanged(CharSequence s, int start, int count,
					int after) {

			}

			@Override
			public void afterTextChanged(Editable s) {

			}
		});

		// if (primeraCarga) {
		try {
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
		try {
			proyectos = ProyectoController.getInstance().getProyectos(
					UsuarioController.getInstance().currentUser.id);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void afterLoadingData() {
		if (proyectos != null) {
			adapter = new ProyectoAdapter(this,
					R.layout.general_home_proyectos_lista_item, proyectos);
			lvProyectos.setAdapter(adapter);

			lvProyectos.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> l, View v, int position,
						long id) {
					posicionPasar = position;
					if (position > 0) {

						/* Modificado por Pancho */
						String rpta = "";

						PopupOpciones popup = new PopupOpciones();
						popup.dialog(GeneralHomeProyectosListaActivity.this,
								"Menú", opciones, rpta);

					}

				}
			});

			lvProyectos.setOnRefreshListener(new OnRefreshListener() {
				@Override
				public void onRefresh() {
					// Do work to refresh the list here.
					new LoadTaskDialog(GeneralHomeProyectosListaActivity.this,
							MensajesUtility.INFO_CARGANDO).execute();
				}
			});

			adapter.getFilter().filter(edtBuscar.getText().toString());
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		MenuInflater inflater = getSupportMenuInflater();
		inflater.inflate(R.menu.menu_general_lista_proyectos, menu);

		// menu.add(0, CONST_MENU_VERLECCIONES, 0,
		// "Ver lecciones").setIcon(
		// R.drawable.maleta);
		// menu.add(1, CONST_MENU_LOGOUT, 1,
		// "Logout").setIcon(
		// R.drawable.maleta);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.menuGeneralListaProyectos_VerLeccionesAprendidas:
			Log.v("XXX", "--------->Ver lecciones");
			Intent intent = new Intent(GeneralHomeProyectosListaActivity.this,
					GeneralHomeLeccionesListaActivity.class);
			overridePendingTransition(0, 0);
			startActivityForResult(intent, 1);
			overridePendingTransition(0, 0);
			break;
		case R.id.menuGeneralListaProyectos_Logout:
			Log.v("XXX", "--------->Logout");
			UsuarioController.getInstance().currentUser = null;
			finish();
			break;
		}
		return false;
	}

	@Override
	public void accionSeleccionOpcion(String rpta) {
		ProyectoBean proyecto = (ProyectoBean) lvProyectos
				.getItemAtPosition(posicionPasar);
		if (rpta.equals(MENUACT_OP_DETALLE)) {
			Intent intent = new Intent(GeneralHomeProyectosListaActivity.this,
					GeneralHomeProyectoAdministracionS.class);
			intent.putExtra("proyecto", proyecto);
			startActivityForResult(intent, 1);

		} else if (rpta.equals(MENUACT_OP_LISTARREC)) {
			Intent intent = new Intent(GeneralHomeProyectosListaActivity.this,
					ListaRecursosXProyecto.class);
			intent.putExtra("proyecto", proyecto);
			startActivityForResult(intent, 2);
		} else if (rpta.equals(MENUACT_OP_CRONOGRAMA)) {
			Intent intent = new Intent(GeneralHomeProyectosListaActivity.this,
					ListaActividadesXProyecto.class);
			intent.putExtra("idProyecto", proyecto.id);
			intent.putExtra("nombreProyecto", proyecto.nombre);
			startActivityForResult(intent, 3);
		} else if (rpta.equals(MENUACT_OP_INDICADORES)) {
			Intent intent = new Intent(GeneralHomeProyectosListaActivity.this,
					CostosIndicadoresActivity.class);
			intent.putExtra("idProyecto", proyecto.id);
			intent.putExtra("nombreProyecto", proyecto.nombre);
			startActivityForResult(intent, 4);
		}

	}

}
