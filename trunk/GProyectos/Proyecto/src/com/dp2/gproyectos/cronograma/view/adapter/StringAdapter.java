package com.dp2.gproyectos.cronograma.view.adapter;

import java.util.List;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.dp2.gproyectos.R;

public class StringAdapter extends ArrayAdapter<String> {
	List<String> originalData;
	int resource;
	Context context;

	public StringAdapter(Context context, int resource, List<String> items) {
		super(context, resource, items);
		this.context = context;
		this.resource = resource;

		// To start, set both data sources to the incoming data
		originalData = items;
	
	}

	public View getView(int position, View convertView, ViewGroup parent) {
		LayoutInflater inflater = (LayoutInflater) getContext()
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		String item = getItem(position);
		LinearLayout nuevaVista;

		if (convertView == null) {
			nuevaVista = new LinearLayout(getContext());
			inflater.inflate(resource, nuevaVista, true);

		} else {
			nuevaVista = (LinearLayout) convertView;
		}

		TextView txtNombre = (TextView) nuevaVista
				.findViewById(R.id.txtNombre);
		
		txtNombre.setText(item);

		return nuevaVista;
	}

	// For this helper method, return based on filteredData
	public int getCount() {
		return originalData.size();
	}

	// This should return a data object, not an int
	public String getItem(int position) {
		return originalData.get(position);
	}

	public long getItemId(int position) {
		return position;
	}


}
