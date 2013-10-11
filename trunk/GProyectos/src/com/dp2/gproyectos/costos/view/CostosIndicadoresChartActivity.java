package com.dp2.gproyectos.costos.view;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.costos.entities.FuelChart;
import com.dp2.gproyectos.costos.entities.Result;
import com.dp2.gproyectos.utils.MensajesUtility;

import android.app.Activity;
import android.os.Bundle;

public class CostosIndicadoresChartActivity extends Activity implements Loadingable {
	private static FuelChart chart;
	
	private String nombreIndicador = "";
	private List<Result> valores;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		nombreIndicador = getIntent().getExtras().getString("nombreIndicador");
		setTitle(nombreIndicador);
		
		chart = new FuelChart(nombreIndicador);
		setContentView(chart.getView(this, new ArrayList<Result>()));
		
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
		valores = getResults();
	}

	@Override
	public void afterLoadingData() {
		// TODO Auto-generated method stub
		if (valores != null && chart != null) {
			runOnUiThread(new Runnable() {
			     public void run() {
			    	 //chart.getView(CostosIndicadoresChartActivity.this, valores).refreshDrawableState();
			    	 setContentView(chart.getView(CostosIndicadoresChartActivity.this, valores));
			    }
			});
		}
	}

}
