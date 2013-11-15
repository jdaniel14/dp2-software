package com.dp2.gproyectos.costos.entities;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;

import org.achartengine.ChartFactory;
import org.achartengine.GraphicalView;
import org.achartengine.chart.PointStyle;
import org.achartengine.model.SeriesSelection;
import org.achartengine.model.TimeSeries;
import org.achartengine.model.XYMultipleSeriesDataset;
import org.achartengine.renderer.SimpleSeriesRenderer;
import org.achartengine.renderer.XYMultipleSeriesRenderer;
import org.achartengine.renderer.XYSeriesRenderer;

import android.content.Context;
import android.graphics.Color;
import android.util.DisplayMetrics;
import android.view.View;
import android.widget.Toast;

public class FuelChart {
	
	public static final int TEXT_SIZE_XHDPI = 24;
	public static final int TEXT_SIZE_HDPI = 20;
	public static final int TEXT_SIZE_MDPI = 18;
	public static final int TEXT_SIZE_LDPI = 13;
	
	private String nombreIndicador = "";
	private String fecha = "";
	private String desripcion = "";
	
	//private static GraphicalView graphicalView;
	
	private static final String DATE_FORMAT = "dd-MM-yyyy";
	
	public FuelChart(String nombreIndicador, String fecha, String descripcion) {
		this.nombreIndicador = nombreIndicador;
		this.fecha = fecha;
		this.desripcion = descripcion;
	}

	public GraphicalView getView(final Context context, ArrayList<HistorialIndicadorBean> results) {
		
		String title;
		double min, max;
		long fechaMin, fechaMax;

		if (results.size() > 0) {
			title = desripcion;
			max = HistorialIndicadorBean.getMaxValue(results);
			min = HistorialIndicadorBean.getMinValue(results, max);
			fechaMin = HistorialIndicadorBean.getMinDate(results);
			fechaMax = HistorialIndicadorBean.getMaxDate(results);
		} else {
			Calendar calendar = Calendar.getInstance(); 
			title = "";
			max = 10;
			min = 0;
			fechaMin = calendar.getTimeInMillis();
			calendar.add(Calendar.MONTH, 1);
			fechaMax = calendar.getTimeInMillis();
		}
		
		
		
		int[] colors = new int[] { Color.RED };
		PointStyle[] styles = new PointStyle[] { PointStyle.POINT};
		
		if (results.size() > 1) {
			colors = new int[] { Color.RED, Color.BLUE, Color.MAGENTA };
			styles = new PointStyle[] { PointStyle.POINT, PointStyle.TRIANGLE, PointStyle.SQUARE};
		}
		
		XYMultipleSeriesRenderer renderer = buildRenderer(colors, styles);

		

		setChartSettings(context, renderer,
				title, //titulo del chart
				"Fecha (dd-mm-aaaa)", "Valor", //nombre del eje X, nombre del eje Y
				fechaMin, fechaMax, //x minimo, x maximo
				min, max, //y minimo, y maximo
				Color.CYAN, Color.GREEN, Color.WHITE); //color de los ejes, color de los textos en los ejes, color del fondo del chart
		
		renderer.setXLabels(5);
		renderer.setYLabels(10);
		
		for (int i = 0; i < results.size(); i++) {
			SimpleSeriesRenderer seriesRenderer = renderer.getSeriesRendererAt(i);
			seriesRenderer.setDisplayChartValues(true);
	    }
		
		if (results.size() == 0) {
			SimpleSeriesRenderer seriesRenderer = renderer.getSeriesRendererAt(0);
			seriesRenderer.setDisplayChartValues(true);
		}

		
		
		
		
		
		return ChartFactory.getTimeChartView(context,
				buildDateDataset(title, results), renderer, DATE_FORMAT);
	}

	protected void setChartSettings(Context context, XYMultipleSeriesRenderer renderer,
			String title, String xTitle, String yTitle, double xMin,
			double xMax, double yMin, double yMax, int axesColor,
			int labelsColor, int backgroundColor) {
		renderer.setChartTitle(title);
		renderer.setClickEnabled(true);
		renderer.setXTitle(xTitle);
		renderer.setYTitle(yTitle);
		renderer.setXAxisMin(xMin);
		renderer.setXAxisMax(xMax);
		renderer.setYAxisMin(yMin);
		renderer.setYAxisMax(yMax);
		renderer.setAxesColor(axesColor);
		renderer.setLabelsColor(labelsColor);
		renderer.setApplyBackgroundColor(true);
		renderer.setDisplayValues(true);
		renderer.setBackgroundColor(backgroundColor);
		renderer.setLabelsTextSize(21);
		renderer.setChartValuesTextSize(20);
		//renderer.setExternalZoomEnabled(true);
		//double[] d = {xMin-1, xMax+1, yMin-1, yMax+1};
		//renderer.setPanLimits(d);
//		switch (context.getResources().getDisplayMetrics().densityDpi) {
//	        case DisplayMetrics.DENSITY_XHIGH:
//	                renderer.setMargins(new int[] { 40, 90, 25, 10 });
//	                renderer.setAxisTitleTextSize(TEXT_SIZE_XHDPI);
//	                renderer.setChartTitleTextSize(TEXT_SIZE_XHDPI);
//	                renderer.setLabelsTextSize(TEXT_SIZE_XHDPI);
//	                renderer.setLegendTextSize(TEXT_SIZE_XHDPI);
//	                break;
//	        case DisplayMetrics.DENSITY_HIGH:
//	                renderer.setMargins(new int[] { 30, 50, 20, 10 });
//	                renderer.setAxisTitleTextSize(TEXT_SIZE_HDPI);
//	                renderer.setChartTitleTextSize(TEXT_SIZE_HDPI);
//	                renderer.setLabelsTextSize(TEXT_SIZE_HDPI);
//	                renderer.setLegendTextSize(TEXT_SIZE_HDPI);
//	                break;
//	        default:
//	                renderer.setMargins(new int[] { 30, 50, 20, 10 });
//	                renderer.setAxisTitleTextSize(TEXT_SIZE_LDPI);
//	                renderer.setChartTitleTextSize(TEXT_SIZE_LDPI);
//	                renderer.setLabelsTextSize(TEXT_SIZE_LDPI);
//	                renderer.setLegendTextSize(TEXT_SIZE_LDPI);
//	                break;
//	    }
	}

	protected XYMultipleSeriesRenderer buildRenderer(int[] colors,
			PointStyle[] styles) {
		XYMultipleSeriesRenderer renderer = new XYMultipleSeriesRenderer();
		setRendererProperties(renderer, colors, styles);
		return renderer;
	}

	protected XYMultipleSeriesDataset buildDateDataset(String title,
			List<HistorialIndicadorBean> results) {
		XYMultipleSeriesDataset dataset = new XYMultipleSeriesDataset();
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		
		for (HistorialIndicadorBean result : results) {
			TimeSeries series = new TimeSeries(result.nombre);
			for (HistorialValorBean valor : result.historial) {
				try {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(sdf.parse(valor.fecha));
					
					series.add(calendar.getTime(), Double.valueOf(valor.valor));
				} catch (Exception e) {}
			}
				
			dataset.addSeries(series);
		}
		
		if (results.isEmpty()) {
			TimeSeries series = new TimeSeries("");
			dataset.addSeries(series);
		}
		
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