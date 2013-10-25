package com.dp2.gproyectos.costos.view;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import org.achartengine.ChartFactory;
import org.achartengine.chart.PointStyle;
import org.achartengine.chart.TimeChart;
import org.achartengine.model.TimeSeries;
import org.achartengine.model.XYMultipleSeriesDataset;
import org.achartengine.renderer.XYMultipleSeriesRenderer;
import org.achartengine.renderer.XYSeriesRenderer;

import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.controller.IndicadoresController;
import com.dp2.gproyectos.costos.entities.IndicadorBean;
import com.dp2.gproyectos.costos.view.adapter.IndicadorAdapter;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.view.GeneralHomeProyectosListaActivity;
import com.dp2.gproyectos.general.view.adapter.ProyectoAdapter;
import com.dp2.gproyectos.utils.MensajesUtility;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentActivity;
import android.text.InputType;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.AdapterView.OnItemClickListener;

public class CostosIndicadoresActivity extends FragmentActivity implements Loadingable {
	
	
	private String idProyecto;
	private String nombreProyecto;
	
	private static ArrayList<IndicadorBean> indicadores;
	private IndicadorAdapter adapter;
	private ListView lvIndicadores;
	
	private static EditText edtFecha;
	private static TextView txtMensaje;
	private static int selectedDay;
	private static int selectedMonth;
	private static int selectedYear;
	private Button btnVerIndicadores;
	private Calendar currentDate;
	
	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
	    // save the current data, for instance when changing screen orientation
	    outState.putSerializable("selectedDay", selectedDay);
	    outState.putSerializable("selectedMonth", selectedMonth);
	    outState.putSerializable("selectedYear", selectedYear);
	    outState.putSerializable("indicadores", indicadores);
	}
	
	@Override
	protected void onRestoreInstanceState(Bundle savedState) {
	    super.onRestoreInstanceState(savedState);
	    // restore the current data, for instance when changing the screen
	    // orientation
	    selectedDay = (Integer) savedState.getSerializable("selectedDay");
	    selectedMonth = (Integer) savedState.getSerializable("selectedMonth");
	    selectedYear = (Integer) savedState.getSerializable("selectedYear");
	    indicadores = (ArrayList<IndicadorBean>) savedState.getSerializable("indicadores");
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
//		requestWindowFeature(Window.FEATURE_LEFT_ICON);
		setContentView(R.layout.costos_indicadores_layout);
//		getWindow().setFeatureDrawableResource(Window.FEATURE_LEFT_ICON, R.drawable.maleta);
		
		findViewById(R.id.indicadoresLayout).setBackgroundColor(Color.WHITE);
		
		edtFecha = (EditText)findViewById(R.id.edtDatePicker);
		btnVerIndicadores = (Button)findViewById(R.id.btnVerIndicadores);
		txtMensaje = (TextView)findViewById(R.id.txtMensaje);
		lvIndicadores =(ListView)findViewById(R.id.lvIndicadores);
		
		txtMensaje.setTextColor(Color.RED);
		
		edtFecha.setInputType(InputType.TYPE_NULL);
		edtFecha.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				//showDialog(Date_Dialog_ID);
				DialogFragment newFragment = new DatePickerFragment();
				newFragment.show(CostosIndicadoresActivity.this.getSupportFragmentManager(), "datePicker");
			}
		});
		
		btnVerIndicadores.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {

				try {
					txtMensaje.setText("Cargando...");
					new LoadTaskDialog(CostosIndicadoresActivity.this, MensajesUtility.INFO_CARGANDO).execute();
				} catch (Exception e) {
					
				}
			}
		});
		
		//fecha actual
		currentDate =Calendar.getInstance();
		selectedDay=currentDate.get(Calendar.DAY_OF_MONTH);
		selectedMonth=currentDate.get(Calendar.MONTH) + 1;
		selectedYear=currentDate.get(Calendar.YEAR);
		
		updateDateDisplay();
		
		nombreProyecto = idProyecto = "";
		idProyecto = getIntent().getExtras().getString("idProyecto");
		nombreProyecto = getIntent().getExtras().getString("nombreProyecto");
		
		this.setTitle(nombreProyecto);
		//this.getActionBar().setIcon(R.drawable.maleta);
		
		if (isIdProyectoValido()) {
			btnVerIndicadores.setEnabled(true);
			edtFecha.setEnabled(true);
		} else {
			
		}
		
	}
	
	@Override
	protected void onResume() {
	    super.onResume();
    	if (indicadores != null) {
			
			adapter = new IndicadorAdapter(this, R.layout.costos_indicadores_lista_item, indicadores);
			lvIndicadores.setAdapter(adapter);
			lvIndicadores.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> l, View v, int position,
						long id) {
					IndicadorBean indicador = indicadores.get(position);
					
					Intent i = new Intent(CostosIndicadoresActivity.this, CostosIndicadoresChartActivity.class);
					i.putExtra("nombreIndicador", indicador.nombre);
					i.putExtra("fecha", selectedDay + "-" + selectedMonth + "-" + selectedYear);
					i.putExtra("idProyecto", idProyecto);
					overridePendingTransition(0, 0);
					startActivity(i);
					overridePendingTransition(0, 0);
				}
			});
			
			runOnUiThread(new Runnable() {
			     public void run() {
			    	 //int i = indicadores.size();
			    	 //txtMensaje.setText("# de indicadores recibidos: " + i);
			    	 txtMensaje.setText("");
			    }
			});
		}
	}
	
	private boolean isIdProyectoValido() {
		if (idProyecto.equalsIgnoreCase(""))
			return false;
		else
			return true;
	}
	
	public static void updateDateDisplay() {
		// TODO Auto-generated method stub
		String y, m, d;
		y = Integer.toString(selectedYear);
		m = Integer.toString(selectedMonth);
		d = Integer.toString(selectedDay);
		
		if (selectedMonth < 10)
			m = "0" + m;
		if (selectedDay < 10)
			d = "0" + d;
					
		edtFecha.setText(d+"/"+m+"/"+y);
	}
	
	public static class DatePickerFragment extends DialogFragment implements
	DatePickerDialog.OnDateSetListener {
		
		@Override
		public Dialog onCreateDialog(Bundle savedInstanceState) {
			DatePickerDialog dialog = new DatePickerDialog(getActivity(), this,
					selectedYear, selectedMonth-1, selectedDay);
		
			return dialog;
		}
		
		public void onDateSet(DatePicker view, int year, int month, int day) {
			selectedYear = year;
			selectedMonth = ++month;
			selectedDay = day;
			CostosIndicadoresActivity.updateDateDisplay();
		}
	}
	
	public void showDatePickerDialog(View v) {
		DialogFragment newFragment = new DatePickerFragment();
		newFragment.show(this.getSupportFragmentManager(), "datePicker");
	}

	private XYMultipleSeriesRenderer getDemoRenderer() {
	    XYMultipleSeriesRenderer renderer = new XYMultipleSeriesRenderer();
	    renderer.setAxisTitleTextSize(16);
	    renderer.setChartTitleTextSize(20);
	    renderer.setLabelsTextSize(15);
	    renderer.setLegendTextSize(15);
	    renderer.setPointSize(5f);
	    renderer.setMargins(new int[] {20, 30, 15, 0});
	    XYSeriesRenderer r = new XYSeriesRenderer();
	    r.setColor(Color.BLUE);
	    r.setPointStyle(PointStyle.SQUARE);
	    r.setFillBelowLine(true);
	    r.setFillBelowLineColor(Color.WHITE);
	    r.setFillPoints(true);
	    renderer.addSeriesRenderer(r);
	    r = new XYSeriesRenderer();
	    r.setPointStyle(PointStyle.CIRCLE);
	    r.setColor(Color.GREEN);
	    r.setFillPoints(true);
	    renderer.addSeriesRenderer(r);
	    renderer.setAxesColor(Color.DKGRAY);
	    renderer.setLabelsColor(Color.LTGRAY);
	    return renderer;
	}
	
	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadingData() {
		try {
			indicadores = IndicadoresController.getInstance().getIndicadores(idProyecto, selectedYear, selectedMonth, selectedDay);
			if (indicadores == null) {
				runOnUiThread(new Runnable() {
				     public void run() {
				    	 txtMensaje.setText("Hubo un error al procesar su solicitud.");
				    }
				});
			}
		} catch (Exception e) {
			runOnUiThread(new Runnable() {
			     public void run() {
			    	 txtMensaje.setText("Hubo un error al procesar su solicitud.");
			    }
			});
		}
	}

	@Override
	public void afterLoadingData() {
		if (indicadores != null) {
			
			adapter = new IndicadorAdapter(this, R.layout.costos_indicadores_lista_item, indicadores);
			lvIndicadores.setAdapter(adapter);
			lvIndicadores.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> l, View v, int position,
						long id) {
					IndicadorBean indicador = indicadores.get(position);
				
					Intent i = new Intent(CostosIndicadoresActivity.this, CostosIndicadoresChartActivity.class);
					String nombre = "";
					if ((indicador.nombre.compareToIgnoreCase("pv") == 0) || (indicador.nombre.compareToIgnoreCase("ev") == 0) || (indicador.nombre.compareToIgnoreCase("ac") == 0))
						nombre = "PV, EV, AC";
					else 
						nombre = indicador.nombre;
					i.putExtra("nombreIndicador", nombre);
					i.putExtra("fecha", selectedDay + "-" + selectedMonth + "-" + selectedYear);
					i.putExtra("idProyecto", idProyecto);
					overridePendingTransition(0, 0);
					startActivity(i);
					overridePendingTransition(0, 0);
				}
			});
			
			runOnUiThread(new Runnable() {
			     public void run() {
			    	 //int i = indicadores.size();
			    	 //txtMensaje.setText("# de indicadores recibidos: " + i);
			    	 txtMensaje.setText("");
			    }
			});
		}
	}
	
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			indicadores = null;
			
			return super.onKeyDown(keyCode, event);
		}
		return false;
	}
}
