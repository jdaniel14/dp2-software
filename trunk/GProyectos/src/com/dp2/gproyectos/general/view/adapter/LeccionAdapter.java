package com.dp2.gproyectos.general.view.adapter;

import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Filter;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.general.entities.LeccionBean;

public class LeccionAdapter extends ArrayAdapter<LeccionBean> {
	List<LeccionBean> originalData, filteredData;
	int resource;
	Context context;

	public LeccionAdapter(Context context, int resource, List<LeccionBean> items) {
		super(context, resource, items);
		this.context = context;
		this.resource = resource;

		// To start, set both data sources to the incoming data
		originalData = items;
		filteredData = items;
	}

	public View getView(int position, View convertView, ViewGroup parent) {
		LayoutInflater inflater = (LayoutInflater) getContext()
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		LeccionBean item = getItem(position);
		LinearLayout nuevaVista;

		if (convertView == null) {
			nuevaVista = new LinearLayout(getContext());
			inflater.inflate(resource, nuevaVista, true);

		} else {
			nuevaVista = (LinearLayout) convertView;
		}

		TextView txtNombre = (TextView) nuevaVista
				.findViewById(R.id.txtNombre);
		TextView txtCategoria = (TextView) nuevaVista.findViewById(R.id.txtCategoria);

		txtNombre.setText(item.descripcionleccion);
		txtCategoria.setText(item.clase);

		return nuevaVista;
	}

	// For this helper method, return based on filteredData
	public int getCount() {
		return filteredData.size();
	}

	// This should return a data object, not an int
	public LeccionBean getItem(int position) {
		return filteredData.get(position);
	}

	public long getItemId(int position) {
		return position;
	}

	@Override
	public Filter getFilter() {
		return new Filter() {
			@Override
			protected FilterResults performFiltering(CharSequence charSequence) {
				FilterResults results = new FilterResults();

				// If there's nothing to filter on, return the original data for
				// your list
				if (charSequence == null || charSequence.length() == 0) {
					results.values = originalData;
					results.count = originalData.size();
				} else {
					List<LeccionBean> filterResultsData = new ArrayList<LeccionBean>();

					for (LeccionBean data : originalData) {

						boolean fullContainsSub = data.clase.toUpperCase()
								.indexOf(charSequence.toString().toUpperCase()) != -1;
						if (fullContainsSub) {
							filterResultsData.add(data);
						}

					}

					results.values = filterResultsData;
					results.count = filterResultsData.size();
				}

				return results;
			}

			@Override
			protected void publishResults(CharSequence charSequence,
					FilterResults filterResults) {
				filteredData = (List<LeccionBean>) filterResults.values;
				notifyDataSetChanged();
			}
		};
	}

}
