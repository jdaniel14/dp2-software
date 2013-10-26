package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.GProyectosConstants;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.view.CostosIndicadoresActivity;
import com.dp2.gproyectos.general.controller.LeccionController;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.entities.LeccionBean;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.view.adapter.LeccionAdapter;
import com.dp2.gproyectos.general.view.adapter.ProyectoAdapter;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.view.VerticalBarraTituloActivity;
import com.markupartist.android.widget.PullToRefreshListView;
import com.markupartist.android.widget.PullToRefreshListView.OnRefreshListener;
//import android.widget.ListView;

public class GeneralHomeLeccionesListaActivity extends
		VerticalBarraTituloActivity implements Loadingable {
	PullToRefreshListView lvLecciones;
	ArrayList<LeccionBean> lecciones;
	LeccionAdapter adapter;
	Spinner spnBuscar;
	EditText edtBuscar;
	ArrayAdapter<String> busquedaAdapter;
	String[] items = new String[] { "Categoría"};
	public static boolean primeraCarga = true;
	
	private static final int CONST_MENU_VERLECCIONES = 0;
	private static final int CONST_MENU_LOGOUT= 1;

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
	    lecciones = (ArrayList<LeccionBean>) savedState.getSerializable("lecciones");
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.general_home_lecciones_lista_layout);

		setAtributos(R.drawable.foco_nocaigasenlatentacion, getString(R.string.menu_leccionesaprendidas),
				GProyectosConstants.FECHA_HOY);
		lvLecciones = (PullToRefreshListView) findViewById(R.id.lvProyectos);

		spnBuscar = (Spinner) findViewById(R.id.spnBuscar);
		edtBuscar = (EditText) findViewById(R.id.edtBuscar);

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
			lecciones = LeccionController.getInstance().getLecciones();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void afterLoadingData() {
		if (lecciones!=null){
			adapter = new LeccionAdapter(this,
					R.layout.general_home_lecciones_lista_item, lecciones);
			lvLecciones.setAdapter(adapter);
			lvLecciones.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> l, View v, int position,
						long id) {
					if (position > 0) {
						LeccionBean leccion = lecciones.get(position-1);
						
						PopupMensaje popup = new PopupMensaje();
						popup.dialog(GeneralHomeLeccionesListaActivity.this, "Lección :3", leccion);
					}
				}
			});
			
			lvLecciones.setOnRefreshListener(new OnRefreshListener() {
			    @Override
			    public void onRefresh() {
			        // Do work to refresh the list here.
			    	new GetDataTask().execute();
			    }
			});
			
			adapter.getFilter().filter(edtBuscar.getText().toString());
		}
	}
	
	
	private class GetDataTask extends AsyncTask<Void, Void, String[]> {

        @Override
        protected String[] doInBackground(Void... params) {
            // Simulates a background job.
            try {
                //Thread.sleep(2000);
            	lecciones = LeccionController.getInstance().getLecciones();
            } catch (Exception e) {
                ;
            }
            return null;
        }

        @Override
        protected void onPostExecute(String[] result) {
            //mListItems.addFirst("Added after refresh...");

        	if (lecciones!=null){
    			adapter = new LeccionAdapter(GeneralHomeLeccionesListaActivity.this,
    					R.layout.general_home_lecciones_lista_item, lecciones);
    			lvLecciones.setAdapter(adapter);
    			lvLecciones.setOnItemClickListener(new OnItemClickListener() {

    				@Override
    				public void onItemClick(AdapterView<?> l, View v, int position,
    						long id) {
    					if (position > 0) {
    						LeccionBean leccion = lecciones.get(position-1);
    						PopupMensaje popup = new PopupMensaje();
    						popup.dialog(GeneralHomeLeccionesListaActivity.this, "Mensaje", leccion);
    						
    					}
    				}
    			});
    			
    			lvLecciones.setOnRefreshListener(new OnRefreshListener() {
    			    @Override
    			    public void onRefresh() {
    			        // Do work to refresh the list here.
    			    	new GetDataTask().execute();
    			    }
    			});
    			
        	}
    		
            
            adapter.getFilter().filter(edtBuscar.getText().toString());
            
            // Call onRefreshComplete when the list has been refreshed.
            lvLecciones.onRefreshComplete();

            super.onPostExecute(result);
        }
    }
	
	
	

}
