package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.actionbarsherlock.app.SherlockActivity;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuInflater;
import com.actionbarsherlock.view.MenuItem;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.view.PopupRegistrarCosto;
import com.dp2.gproyectos.general.controller.LeccionController;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.dp2.gproyectos.general.entities.CategoriaLeccionBean;
import com.dp2.gproyectos.general.entities.LeccionBean;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.entities.UsuarioBean;
import com.dp2.gproyectos.general.view.adapter.LeccionAdapter;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.markupartist.android.widget.PullToRefreshListView;
import com.markupartist.android.widget.PullToRefreshListView.OnRefreshListener;

//import android.widget.ListView;

public class GeneralHomeLeccionesListaActivity extends SherlockActivity
		implements Loadingable {
	PullToRefreshListView lvLecciones;
	ArrayList<LeccionBean> lecciones;
	LeccionAdapter adapter;
	Spinner spnBuscar;
	EditText edtBuscar;
	ArrayAdapter<String> busquedaAdapter;
	CategoriaLeccionBean estaCategoria;
	String estaDescripcion;
	String esteIdexp;
	ArrayList<CategoriaLeccionBean> categorias;
	String[] items = new String[] { "Categoría" };
	public static boolean primeraCarga = true;
	ArrayList<ProyectoBean> proyectos;
	int accion = 0;

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		// save the current data, for instance when changing screen orientation
		outState.putSerializable("lecciones", lecciones);
	}

	@Override
	protected void onRestoreInstanceState(Bundle savedState) {
		super.onRestoreInstanceState(savedState);
		// restore the current data, for instance when changing the screen
		// orientation
		lecciones = (ArrayList<LeccionBean>) savedState
				.getSerializable("lecciones");
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		// requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.general_home_lecciones_lista_layout);

		getSherlock().getActionBar().setTitle(
				getString(R.string.menu_leccionesaprendidas));
		getSherlock().getActionBar().setIcon(
				R.drawable.foco_nocaigasenlatentacion);
		getSherlock().getActionBar().setBackgroundDrawable(
				getResources().getDrawable(R.color.gproyectos_actionbar));

		/*
		 * setAtributos(R.drawable.foco_nocaigasenlatentacion,
		 * getString(R.string.menu_leccionesaprendidas),
		 * GProyectosConstants.FECHA_HOY);
		 */
		lvLecciones = (PullToRefreshListView) findViewById(R.id.lvProyectos);

		spnBuscar = (Spinner) findViewById(R.id.spnBuscar);
		edtBuscar = (EditText) findViewById(R.id.edtBuscar);

		try {
			proyectos = (ArrayList<ProyectoBean>) getIntent()
					.getSerializableExtra("proyectos");
		} catch (Exception e) {
			proyectos = null;
		}

		busquedaAdapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_spinner_item, items);
		busquedaAdapter
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		spnBuscar.setAdapter(busquedaAdapter);

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
			try {
				lecciones = LeccionController.getInstance().getLecciones();
				categorias = LeccionController.getInstance().getCategorias();
				proyectos = ProyectoController
						.getInstance()
						.getProyectosXEmp(
								Integer.valueOf(UsuarioController.getInstance().currentUser.id));

			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		case 2:
			try {
				LeccionController.getInstance().registrarLeccion(estaCategoria,
						estaDescripcion, esteIdexp);
				lecciones = LeccionController.getInstance().getLecciones();
			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		}

	}

	@Override
	public void afterLoadingData() {
		if (lecciones != null) {
			adapter = new LeccionAdapter(this,
					R.layout.general_home_lecciones_lista_item, lecciones);
			lvLecciones.setAdapter(adapter);
			lvLecciones.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> l, View v, int position,
						long id) {
					if (position > 0) {
						LeccionBean leccion = (LeccionBean) lvLecciones
								.getItemAtPosition(position);

						PopupMensaje popup = new PopupMensaje();
						popup.dialog(GeneralHomeLeccionesListaActivity.this,
								"Lección", leccion);
					}
				}
			});

			lvLecciones.setOnRefreshListener(new OnRefreshListener() {
				@Override
				public void onRefresh() {
					// Do work to refresh the list here.
					new LoadTaskDialog(GeneralHomeLeccionesListaActivity.this,
							MensajesUtility.INFO_CARGANDO).execute();
				}
			});

			adapter.getFilter().filter(edtBuscar.getText().toString());
			lvLecciones.onRefreshComplete();
		}
		accion = 0; //reinicio
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		MenuInflater inflater = getSupportMenuInflater();
		inflater.inflate(R.menu.menu_general_adm_leccion, menu);

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
		case R.id.menuGeneralLecciones_RegistrarLeccionesAprendidas:
			Log.v("XXX", "--------->Registrar lecciones");

			// popup
			if (categorias == null || proyectos == null) {
				lvLecciones.setOnRefreshListener(new OnRefreshListener() {
					@Override
					public void onRefresh() {
						// Do work to refresh the list here.
						new LoadTaskDialog(
								GeneralHomeLeccionesListaActivity.this,
								MensajesUtility.INFO_CARGANDO).execute();
					}
				});
			}

			if (categorias != null && proyectos != null) {
				PopupRegistrarLeccion popup = new PopupRegistrarLeccion();
				popup.dialog(GeneralHomeLeccionesListaActivity.this,
						"Registrar lección aprendida", categorias, proyectos);
			} else {
				Toast.makeText(
						GeneralHomeLeccionesListaActivity.this,
						"Hubo un error al intentar procesar su solicitud. Intentelo nuevamente mas tarde.",
						Toast.LENGTH_LONG).show();
			}
			break;
		}
		return false;
	}

	/*
	 * private class GetDataTask extends AsyncTask<Void, Void, String[]> {
	 * 
	 * @Override protected String[] doInBackground(Void... params) { //
	 * Simulates a background job. try { //Thread.sleep(2000); lecciones =
	 * LeccionController.getInstance().getLecciones(); } catch (Exception e) { ;
	 * } return null; }
	 * 
	 * @Override protected void onPostExecute(String[] result) {
	 * //mListItems.addFirst("Added after refresh...");
	 * 
	 * if (lecciones!=null){ adapter = new
	 * LeccionAdapter(GeneralHomeLeccionesListaActivity.this,
	 * R.layout.general_home_lecciones_lista_item, lecciones);
	 * lvLecciones.setAdapter(adapter); lvLecciones.setOnItemClickListener(new
	 * OnItemClickListener() {
	 * 
	 * @Override public void onItemClick(AdapterView<?> l, View v, int position,
	 * long id) { if (position > 0) { LeccionBean leccion =
	 * lecciones.get(position-1); PopupMensaje popup = new PopupMensaje();
	 * popup.dialog(GeneralHomeLeccionesListaActivity.this, "Mensaje", leccion);
	 * 
	 * } } });
	 * 
	 * lvLecciones.setOnRefreshListener(new OnRefreshListener() {
	 * 
	 * @Override public void onRefresh() { // Do work to refresh the list here.
	 * new GetDataTask().execute(); } });
	 * 
	 * }
	 * 
	 * 
	 * adapter.getFilter().filter(edtBuscar.getText().toString());
	 * 
	 * // Call onRefreshComplete when the list has been refreshed.
	 * lvLecciones.onRefreshComplete();
	 * 
	 * super.onPostExecute(result); } }
	 */

	public void registrarLeccion(CategoriaLeccionBean categoria,
			String descripcionleccion, ProyectoBean proyecto) {
		estaCategoria = categoria;
		estaDescripcion = descripcionleccion;
		esteIdexp = proyecto.idexp;
		accion = 2;
		new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();

	}

}
