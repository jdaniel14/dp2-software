package com.dp2.gproyectos.costos.view;

import java.util.ArrayList;
import java.util.Calendar;

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
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.AdapterView.OnItemClickListener;

public class CostosIndicadoresActivity extends FragmentActivity implements Loadingable {
	private String idProyecto;
	private String nombreProyecto;
	
	private ArrayList<IndicadorBean> indicadores;
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
		selectedMonth=currentDate.get(Calendar.MONTH);
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
		m = Integer.toString(selectedMonth+1);
		d = Integer.toString(selectedDay);
		
		if (selectedMonth + 1  < 10)
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
					selectedYear, selectedMonth, selectedDay);
		
			return dialog;
		}
		
		public void onDateSet(DatePicker view, int year, int month, int day) {
			selectedYear = year;
			selectedMonth = month;
			selectedDay = day;
			CostosIndicadoresActivity.updateDateDisplay();
		}
	}
	
	public void showDatePickerDialog(View v) {
		DialogFragment newFragment = new DatePickerFragment();
		newFragment.show(this.getSupportFragmentManager(), "datePicker");
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
					//IndicadorBean indicador = indicadores.get(position);
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
}
