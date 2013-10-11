package com.dp2.gproyectos.costos.entities;

import java.util.Calendar;
import java.util.Collections;
import java.util.List;

import org.achartengine.ChartFactory;
import org.achartengine.GraphicalView;
import org.achartengine.chart.PointStyle;
import org.achartengine.model.TimeSeries;
import org.achartengine.model.XYMultipleSeriesDataset;
import org.achartengine.renderer.SimpleSeriesRenderer;
import org.achartengine.renderer.XYMultipleSeriesRenderer;
import org.achartengine.renderer.XYSeriesRenderer;

import android.content.Context;
import android.graphics.Color;

public class FuelChart {
	private String nombreIndicador = "";
	
	private static final String DATE_FORMAT = "dd/MM/yyyy";
	
	public FuelChart(String nombreIndicador) {
		this.nombreIndicador = nombreIndicador;
	}

	public GraphicalView getView(Context context, List<Result> results) {
		
		String title;
		double min, max;
		long fechaMin, fechaMax;

		if (results.size() > 0) {
			title = "Valores del indicador " + nombreIndicador + " hasta la fecha " + results.get(results.size() - 1).getDate().getTime();
			max = Collections.max(results).getValue();
			min = Collections.min(results).getValue();
			fechaMin = results.get(0).getDate().getTime();
			fechaMax = results.get(results.size() - 1).getDate().getTime();
		} else {
			Calendar calendar = Calendar.getInstance(); 
			title = "";
			max = 10;
			min = 0;
			fechaMin = calendar.getTimeInMillis();
			calendar.add(Calendar.MONTH, 1);
			fechaMax = calendar.getTimeInMillis();
		}
		
		

		int[] colors = new int[] { Color.GREEN };
		PointStyle[] styles = new PointStyle[] { PointStyle.POINT};
		XYMultipleSeriesRenderer renderer = buildRenderer(colors, styles);

		

		setChartSettings(renderer,
				title, //titulo del chart
				"Fecha", "Valor", //nombre del eje X, nombre del eje Y
				fechaMin, fechaMax, //x minimo, x maximo
				min, max, //y minimo, y maximo
				Color.GRAY, Color.LTGRAY, Color.RED); //color de los ejes, color de los textos en los ejes, color del fondo del chart
		
		renderer.setXLabels(5);
		renderer.setYLabels(10);
		SimpleSeriesRenderer seriesRenderer = renderer.getSeriesRendererAt(0);
		seriesRenderer.setDisplayChartValues(true);

		return ChartFactory.getTimeChartView(context,
				buildDateDataset(title, results), renderer, DATE_FORMAT);
	}

	protected void setChartSettings(XYMultipleSeriesRenderer renderer,
			String title, String xTitle, String yTitle, double xMin,
			double xMax, double yMin, double yMax, int axesColor,
			int labelsColor, int backgroundColor) {
		renderer.setChartTitle(title);
		renderer.setXTitle(xTitle);
		renderer.setYTitle(yTitle);
		renderer.setXAxisMin(xMin);
		renderer.setXAxisMax(xMax);
		renderer.setYAxisMin(yMin);
		renderer.setYAxisMax(yMax);
		renderer.setAxesColor(axesColor);
		renderer.setLabelsColor(labelsColor);
		renderer.setBackgroundColor(backgroundColor);
	}

	protected XYMultipleSeriesRenderer buildRenderer(int[] colors,
			PointStyle[] styles) {
		XYMultipleSeriesRenderer renderer = new XYMultipleSeriesRenderer();
		setRendererProperties(renderer, colors, styles);
		return renderer;
	}

	protected XYMultipleSeriesDataset buildDateDataset(String title,
			List<Result> results) {
		XYMultipleSeriesDataset dataset = new XYMultipleSeriesDataset();
		TimeSeries series = new TimeSeries(title);
		for (Result result : results) {
			series.add(result.getDate(), result.getValue());
		}
		dataset.addSeries(series);
		return dataset;
	}

	protected void setRendererProperties(XYMultipleSeriesRenderer renderer, int[] colors,
			PointStyle[] styles) {
		renderer.setAxisTitleTextSize(16);
		renderer.setChartTitleTextSize(20);
		renderer.setLabelsTextSize(15);
		renderer.setLegendTextSize(15);
		renderer.setPointSize(5f);
		renderer.setMargins(new int[] { 20, 30, 15, 20 });
		int length = colors.length;
		for (int i = 0; i < length; i++) {
			XYSeriesRenderer r = new XYSeriesRenderer();
			r.setColor(colors[i]);
			r.setPointStyle(styles[i]);
			renderer.addSeriesRenderer(r);
		}
	}
}