package com.dp2.gproyectos.view;

import java.util.Calendar;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.view.WindowManager.LayoutParams;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;

import com.dp2.gproyectos.R;

public class CalendarioPruebaActivity extends FragmentActivity {

	private Context context;
	public Dialog dialog;
	LinearLayout linContent;
	static EditText edtFecha;

	public void dialog(Context _context, final int flag) {

		context = _context;
		dialog = new Dialog(_context);
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
//		dialog.setContentView(R.layout.visita_popup_barratitulo_layout);
//		dialog.getWindow().setLayout(LayoutParams.FILL_PARENT,
//				LayoutParams.WRAP_CONTENT);
//
//		edtFecha = (EditText) linContent.findViewById(R.id.edtFecha);

		popular();

		edtFecha.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				showDatePickerDialog(edtFecha);
			}
		});

		dialog.show();
	}

	private void popular() {
		//edtFecha.setText(estaVisita.getFechaVisita());
	}

	public static class DatePickerFragment extends DialogFragment implements
			DatePickerDialog.OnDateSetListener {

		@Override
		public Dialog onCreateDialog(Bundle savedInstanceState) {
			// Use the current date as the default date in the picker
			final Calendar c = Calendar.getInstance();
			int year = c.get(Calendar.YEAR);
			int month = c.get(Calendar.MONTH);
			int day = c.get(Calendar.DAY_OF_MONTH);
			// Create a new instance of DatePickerDialog and return it
			DatePickerDialog dialog = new DatePickerDialog(getActivity(), this,
					year, month, day);

			return dialog;
		}

		public void onDateSet(DatePicker view, int year, int month, int day) {
			// Do something with the date chosen by the user
			month++;
			edtFecha.setText(day + "/" + month + "/" + year);
		}
	}

	public void showDatePickerDialog(View v) {
		DialogFragment newFragment = new DatePickerFragment();
		newFragment.show(((CalendarioPruebaActivity) context)
				.getSupportFragmentManager(), "datePicker");
	}
}
