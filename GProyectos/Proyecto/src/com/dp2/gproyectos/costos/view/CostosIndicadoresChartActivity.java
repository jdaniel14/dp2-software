package com.dp2.gproyectos.costos.view;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.achartengine.GraphicalView;
import org.achartengine.model.SeriesSelection;

import com.actionbarsherlock.app.SherlockActivity;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.controller.IndicadoresController;
import com.dp2.gproyectos.costos.entities.FuelChart;
import com.dp2.gproyectos.costos.entities.HIndicador;
import com.dp2.gproyectos.costos.entities.HistorialIndicadorBean;
import com.dp2.gproyectos.costos.entities.Result;
import com.dp2.gproyectos.utils.MensajesUtility;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.Toast;

public class CostosIndicadoresChartActivity extends SherlockActivity implements Loadingable {
	private static FuelChart chart;
	
	private String nombreIndicador = "";
	private String titulo = "";
	private String idProyecto = "";
	private String fecha = "";
	private String descripcion = "";
	//private List<Result> valores;
	private ArrayList<HistorialIndicadorBean> historial;
	private ArrayList<HIndicador> historial2;
	
	private static GraphicalView graphicalView;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		nombreIndicador = getIntent().getExtras().getString("nombreIndicador");
		titulo = getIntent().getExtras().getString("titulo");
		fecha = getIntent().getExtras().getString("fecha");
		idProyecto = getIntent().getExtras().getString("idProyecto");

		descripcion = getIntent().getExtras().getString("descripcion");
		
		getSherlock().getActionBar().setTitle(titulo);
		getSherlock().getActionBar().setIcon(R.drawable.maleta);
		getSherlock().getActionBar().setSubtitle(descripcion);
		
		setContentView(R.layout.costos_historial_indicadores_layout);
		findViewById(R.id.historialIndicadoresLayout).setBackgroundColor(Color.WHITE);
		LinearLayout layout = (LinearLayout) findViewById(R.id.chart);
		
		chart = new FuelChart(titulo, fecha, "Valores hasta la fecha " + fecha);
		
		graphicalView = chart.getView(this, new ArrayList<HistorialIndicadorBean>());
		graphicalView.setBackgroundColor(Color.WHITE);
		graphicalView.setOnClickListener(new View.OnClickListener() {
	        public void onClick(View v) {
	            // handle the click event on the chart
	            SeriesSelection seriesSelection = graphicalView.getCurrentSeriesAndPoint();
	            if (seriesSelection == null) {
	            	Toast.makeText(CostosIndicadoresChartActivity.this, "No chart element", Toast.LENGTH_SHORT).show();
	            } else {
	              // display information of the clicked point
	              Toast.makeText(
	            		  CostosIndicadoresChartActivity.this,
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
			new LoadTaskDialog(CostosIndicadoresChartActivity.this, MensajesUtility.INFO_CARGANDO).execute();
		} catch (Exception e) {
			
		}
	}

	private List<Result> getResults() {
		List<Result> results = new ArrayList<Result>();
		results.add(new Result(new Date(108, 9, 1), 8.8));
		results.add(new Result(new Date(108, 9, 8), 9.0));
		results.add(new Result(new Date(108, 9, 15), 10.0));
		results.add(new Result(new Date(108, 9, 22), 9.5));
		return results;
	}

	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadingData() {
		// TODO Auto-generated method stub
		//valores = getResults();
		historial2 = new ArrayList<HIndicador>();
		
		historial = IndicadoresController.getInstance().getHistorialIndicadores(idProyecto, nombreIndicador, fecha);
		
		if (historial != null && !historial.isEmpty()) {
			for (HistorialIndicadorBean elemento : historial) {
				HIndicador ind = new HIndicador(elemento.nombre, elemento.historial);
				historial2.add(ind);
			}
		}
	}

	@Override
	public void afterLoadingData() {
		// TODO Auto-generated method stub
		if (historial != null && chart != null) {
			runOnUiThread(new Runnable() {
			     public void run() {
			    	 //chart.getView(CostosIndicadoresChartActivity.this, valores).refreshDrawableState();
			    	 graphicalView = chart.getView(CostosIndicadoresChartActivity.this, historial);
			    	 
			    	 graphicalView.setOnClickListener(new View.OnClickListener() {
			 	        public void onClick(View v) {
			 	            // handle the click event on the chart
			 	            SeriesSelection seriesSelection = graphicalView.getCurrentSeriesAndPoint();
			 	            if (seriesSelection == null) {
			 	            	Toast.makeText(CostosIndicadoresChartActivity.this, "No chart element", Toast.LENGTH_SHORT).show();
			 	            } else {
			 	              // display information of the clicked point
			 	              Toast.makeText(
			 	            		  CostosIndicadoresChartActivity.this,
			 	                  "Chart element in series index " + seriesSelection.getSeriesIndex()
			 	                      + " data point index " + seriesSelection.getPointIndex() + " was clicked"
			 	                      + " closest point value X=" + seriesSelection.getXValue() + ", Y="
			 	                      + seriesSelection.getValue(), Toast.LENGTH_SHORT).show();
			 	            }
			 	          }
			 	        });
			    	 
			    	 setContentView(graphicalView);
			    }
			});
		}
	}

}
