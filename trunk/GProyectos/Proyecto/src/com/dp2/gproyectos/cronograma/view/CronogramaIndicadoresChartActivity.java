package com.dp2.gproyectos.cronograma.view;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.achartengine.GraphicalView;
import org.achartengine.model.SeriesSelection;

import com.actionbarsherlock.app.SherlockActivity;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuInflater;
import com.actionbarsherlock.view.MenuItem;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.controller.IndicadoresController;
import com.dp2.gproyectos.costos.entities.FuelChart;
import com.dp2.gproyectos.costos.entities.HIndicador;
import com.dp2.gproyectos.costos.entities.HistorialIndicadorBean;
import com.dp2.gproyectos.costos.entities.Result;
import com.dp2.gproyectos.cronograma.controller.CronogramaController;
import com.dp2.gproyectos.cronograma.entities.IndicadorCronogramaBean;
import com.dp2.gproyectos.cronograma.entities.MultiplesIndicadores;
import com.dp2.gproyectos.general.controller.UsuarioController;
import com.dp2.gproyectos.general.view.GeneralHomeLeccionesListaActivity;
import com.dp2.gproyectos.general.view.GeneralHomeProyectosListaActivity;
import com.dp2.gproyectos.utils.MensajesUtility;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.Toast;

public class CronogramaIndicadoresChartActivity extends SherlockActivity implements Loadingable {
	private static FuelChart chart;
	
	private String titulo = "";
	private String idProyecto = "";
//	private String fecha = "";
//	private String descripcion = "";
	//private List<Result> valores;
	private ArrayList<ArrayList<IndicadorCronogramaBean>> historial;
	private MultiplesIndicadores indicadores;
	private static int indicadorSeleccionado = 0;
	
	private static GraphicalView graphicalView;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		titulo = getIntent().getExtras().getString("nombreProyecto");
//		fecha = getIntent().getExtras().getString("fecha");
		idProyecto = getIntent().getExtras().getString("idProyecto");
		
//		descripcion = getIntent().getExtras().getString("descripcion");
		
		getSherlock().getActionBar().setTitle(titulo);
		getSherlock().getActionBar().setIcon(R.drawable.maleta);
//		getSherlock().getActionBar().setSubtitle(descripcion);
		
		setContentView(R.layout.costos_historial_indicadores_layout);
		findViewById(R.id.historialIndicadoresLayout).setBackgroundColor(Color.WHITE);
		LinearLayout layout = (LinearLayout) findViewById(R.id.chart);
		
		chart = new FuelChart(titulo, "", "");
		
		graphicalView = chart.getView(this, new ArrayList<HistorialIndicadorBean>());
		graphicalView.setBackgroundColor(Color.WHITE);
		graphicalView.setOnClickListener(new View.OnClickListener() {
	        public void onClick(View v) {
	            // handle the click event on the chart
	            SeriesSelection seriesSelection = graphicalView.getCurrentSeriesAndPoint();
	            if (seriesSelection == null) {
	            	Toast.makeText(CronogramaIndicadoresChartActivity.this, "No chart element", Toast.LENGTH_SHORT).show();
	            } else {
	              // display information of the clicked point
	              Toast.makeText(
	            		  CronogramaIndicadoresChartActivity.this,
	                  "Chart element in series index " + seriesSelection.getSeriesIndex()
	                      + " data point index " + seriesSelection.getPointIndex() + " was clicked"
	                      + " closest point value X=" + seriesSelection.getXValue() + ", Y="
	                      + seriesSelection.getValue(), Toast.LENGTH_SHORT).show();
	            }
	          }
	        });
		
		layout.addView(graphicalView, new LayoutParams
				(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
		//setContentView(graphicalView);
		
		try {
			new LoadTaskDialog(CronogramaIndicadoresChartActivity.this, MensajesUtility.INFO_CARGANDO).execute();
		} catch (Exception e) {
			
		}
	}

	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadingData() {
		// TODO Auto-generated method stub
		//valores = getResults();
		
		historial = CronogramaController.getInstance().getHistorialIndicadores(idProyecto);
		indicadores = new MultiplesIndicadores(historial);
		
		runOnUiThread(new Runnable() {
		     public void run() {
		    	 invalidateOptionsMenu();
		    }
		});
		
	}

	@Override
	public void afterLoadingData() {
		// TODO Auto-generated method stub
		if (indicadores != null && chart != null && indicadores.listaIndicadores != null && !indicadores.listaIndicadores.isEmpty()) {
			repintar();
		}
	}
	
	public void repintar() {
		runOnUiThread(new Runnable() {
		     public void run() {
		    	 //chart.getView(CostosIndicadoresChartActivity.this, valores).refreshDrawableState();
		    	 final ArrayList<HistorialIndicadorBean> temp = new ArrayList<HistorialIndicadorBean>();
		    	 int indice = (indicadorSeleccionado < indicadores.listaIndicadores.size()) ? indicadorSeleccionado : 0;
		    	 temp.add(indicadores.listaIndicadores.get(indice));
		    	 
		    	 graphicalView = chart.getView(CronogramaIndicadoresChartActivity.this, temp);
		    	 
		    	 graphicalView.setOnClickListener(new View.OnClickListener() {
		 	        public void onClick(View v) {
		 	            // handle the click event on the chart
		 	            SeriesSelection seriesSelection = graphicalView.getCurrentSeriesAndPoint();
		 	            if (seriesSelection == null) {
		 	            	//Toast.makeText(CostosIndicadoresChartActivity.this, "No chart element", Toast.LENGTH_SHORT).show();
		 	            } else {
		 	              // display information of the clicked point
		 	            	Toast.makeText(
		 	            			CronogramaIndicadoresChartActivity.this,
		 	            		 //nombres.get(seriesSelection.getSeriesIndex()) +
		 	            			temp.get(seriesSelection.getSeriesIndex()).nombre + 
		 	            		 ". Fecha: " + temp.get(seriesSelection.getSeriesIndex()).historial.get(seriesSelection.getPointIndex()).fecha +
		 	            		 ". Valor: " + temp.get(seriesSelection.getSeriesIndex()).historial.get(seriesSelection.getPointIndex()).valor, Toast.LENGTH_SHORT).show();
		 	            }
		 	          }
		 	        });
		    	 
		    	 setContentView(graphicalView);
		    }
		});
	}
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		
//		MenuInflater inflater = getSupportMenuInflater();
//		inflater.inflate(R.menu.menu_general_lista_proyectos, menu);
		
//		menu.add(0, CONST_MENU_VERLECCIONES, 0,
//				"Ver lecciones").setIcon(
//				R.drawable.maleta);
//		menu.add(1, CONST_MENU_LOGOUT, 1,
//				"Logout").setIcon(
//				R.drawable.maleta);
		
//		if (getSupportActionBar().getSelectedNavigationIndex() == 1) {
//            menu.add("Share")
//            .setIcon(android.R.drawable.ic_menu_share)
//            .setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM | MenuItem.SHOW_AS_ACTION_WITH_TEXT);
//        }
//        if (getSupportActionBar().getSelectedNavigationIndex() == 0) {
//            menu.add("Settings")
//        .setIcon(android.R.drawable.ic_menu_manage)
//            .setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM | MenuItem.SHOW_AS_ACTION_WITH_TEXT);      
//        }

		int i = 0;
		if (indicadores != null && indicadores.listaIndicadores != null && !indicadores.listaIndicadores.isEmpty()) {
			for (HistorialIndicadorBean indicador : indicadores.listaIndicadores) {
				menu.add(i, indicadores.listaIndicadores.indexOf(indicador), i, "Ver " + indicador.nombre)
	            .setIcon(android.R.drawable.ic_menu_share)
	            .setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM | MenuItem.SHOW_AS_ACTION_WITH_TEXT);
				
				i++;
			}
		}
		
        return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
//		switch (item.getItemId()) {
//		case R.id.menuGeneralListaProyectos_VerLeccionesAprendidas:
//
//			break;
//		case R.id.menuGeneralListaProyectos_Logout:
//
//
//			break;
//		}
		
		if (indicadores != null && indicadores.listaIndicadores != null && item.getItemId() < indicadores.listaIndicadores.size()) {
//			Toast.makeText(CronogramaIndicadoresChartActivity.this, "id: <" + item.getItemId() + ">", Toast.LENGTH_SHORT).show();
			indicadorSeleccionado = item.getItemId();
			repintar();
		}
		return false;
	}	
}
