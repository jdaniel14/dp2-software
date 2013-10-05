package com.dp2.gproyectos.general.view;

import java.util.ArrayList;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.EditText;
//import android.widget.ListView;
import android.widget.Spinner;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.GProyectosConstants;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.view.CostosIndicadoresActivity;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.view.adapter.ProyectoAdapter;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.view.VerticalBarraTituloActivity;
import com.markupartist.android.widget.PullToRefreshListView;
import com.markupartist.android.widget.PullToRefreshListView.OnRefreshListener;

public class GeneralHomeProyectosListaActivity extends
		VerticalBarraTituloActivity implements Loadingable {
	PullToRefreshListView lvProyectos;
	ArrayList<ProyectoBean> proyectos;
	ProyectoAdapter adapter;
	Spinner spnBuscar;
	EditText edtBuscar;
	ArrayAdapter<String> busquedaAdapter;
	String[] items = new String[] { "Nombre", "Jefe de proyecto", "Estado" };
	public static int tipoBusqueda;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.general_home_proyectos_lista_layout);

		setAtributos(R.drawable.maleta, getString(R.string.menu_proyectos),
				GProyectosConstants.FECHA_HOY);
		lvProyectos = (PullToRefreshListView) findViewById(R.id.lvProyectos);

		spnBuscar = (Spinner) findViewById(R.id.spnBuscar);
		edtBuscar = (EditText) findViewById(R.id.edtBuscar);

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
		
		try {
			new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();
		}
		catch(Exception e){
			
		}
		
	}

	@Override
	public void beforeLoadingData() {

	}

	@Override
	public void loadingData() {
		try {
			proyectos = ProyectoController.getInstance().getProyectos();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void afterLoadingData() {
		if (proyectos!=null){
			adapter = new ProyectoAdapter(this,
					R.layout.general_home_proyectos_lista_item, proyectos);
			lvProyectos.setAdapter(adapter);
			lvProyectos.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> l, View v, int position,
						long id) {
					ProyectoBean proyecto = proyectos.get(position);
					
					Intent i = new Intent(GeneralHomeProyectosListaActivity.this, CostosIndicadoresActivity.class);
					i.putExtra("idProyecto", proyecto.id);
					i.putExtra("nombreProyecto", proyecto.nombre);
					overridePendingTransition(0, 0);
					startActivity(i);
					overridePendingTransition(0, 0);
				}
			});
			
			lvProyectos.setOnRefreshListener(new OnRefreshListener() {
			    @Override
			    public void onRefresh() {
			        // Do work to refresh the list here.
			    	new GetDataTask().execute();
			    }
			});
		}
	}
	
	private class GetDataTask extends AsyncTask<Void, Void, String[]> {

        @Override
        protected String[] doInBackground(Void... params) {
            // Simulates a background job.
            try {
                //Thread.sleep(2000);
            	proyectos = ProyectoController.getInstance().getProyectos();
            } catch (Exception e) {
                ;
            }
            return null;
        }

        @Override
        protected void onPostExecute(String[] result) {
            //mListItems.addFirst("Added after refresh...");

            if (proyectos!=null){
    			adapter = new ProyectoAdapter(GeneralHomeProyectosListaActivity.this,
    					R.layout.general_home_proyectos_lista_item, proyectos);
    			lvProyectos.setAdapter(adapter);
    			lvProyectos.setOnItemClickListener(new OnItemClickListener() {

    				@Override
    				public void onItemClick(AdapterView<?> l, View v, int position,
    						long id) {
    					ProyectoBean proyecto = proyectos.get(position);
    					
    					Intent i = new Intent(GeneralHomeProyectosListaActivity.this, CostosIndicadoresActivity.class);
    					i.putExtra("idProyecto", proyecto.id);
    					i.putExtra("nombreProyecto", proyecto.nombre);
    					overridePendingTransition(0, 0);
    					startActivity(i);
    					overridePendingTransition(0, 0);
    				}
    			});
    		}
            
            // Call onRefreshComplete when the list has been refreshed.
            lvProyectos.onRefreshComplete();

            super.onPostExecute(result);
        }
    }

}
