package com.dp2.gproyectos.costos.view;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.dp2.gproyectos.costos.entities.FuelChart;
import com.dp2.gproyectos.costos.entities.Result;

import android.app.Activity;
import android.os.Bundle;

public class CostosIndicadoresChartActivity extends Activity {
	private String nombreIndicador = "";
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		nombreIndicador = getIntent().getExtras().getString("nombreIndicador");
		
		FuelChart chart = new FuelChart(nombreIndicador);
		setContentView(chart.getView(this, getResults()));
	}

	private List<Result> getResults() {
		List<Result> results = new ArrayList<Result>();
		results.add(new Result(new Date(108, 9, 1), 8.8));
		results.add(new Result(new Date(108, 9, 8), 9.0));
		results.add(new Result(new Date(108, 9, 15), 10.0));
		results.add(new Result(new Date(108, 9, 22), 9.5));
		return results;
	}

}
