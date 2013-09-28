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
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.general.view.GeneralHomeProyectosListaActivity;

public class ProyectoAdapter extends ArrayAdapter<ProyectoBean> {
	List<ProyectoBean> originalData, filteredData;
	int resource;
	Context context;

	public ProyectoAdapter(Context context, int resource,
			List<ProyectoBean> items) {
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
		ProyectoBean item = getItem(position);
		LinearLayout nuevaVista;

		if (convertView == null) {
			nuevaVista = new LinearLayout(getContext());
			inflater.inflate(resource, nuevaVista, true);

		} else {
			nuevaVista = (LinearLayout) convertView;
		}

		TextView txtNombre = (TextView) nuevaVista.findViewById(R.id.txtNombre);
		TextView txtJp = (TextView) nuevaVista.findViewById(R.id.txtJp);
		TextView txtEstado = (TextView) nuevaVista.findViewById(R.id.txtEstado);

		txtNombre.setText(item.nombre);
		txtJp.setText(item.jefeProyecto);
		txtEstado.setText(item.estado);

		return nuevaVista;
	}

	// For this helper method, return based on filteredData
	public int getCount() {
		return filteredData.size();
	}

	// This should return a data object, not an int
	public ProyectoBean getItem(int position) {
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
					List<ProyectoBean> filterResultsData = new ArrayList<ProyectoBean>();

					for (ProyectoBean data : originalData) {
						if (GeneralHomeProyectosListaActivity.tipoBusqueda == 0) {
							boolean fullContainsSub = data.nombre.toUpperCase()
									.indexOf(
											charSequence.toString()
													.toUpperCase()) != -1;
							if (fullContainsSub) {
								filterResultsData.add(data);
							}
						} else if (GeneralHomeProyectosListaActivity.tipoBusqueda == 1) {
							boolean fullContainsSub = data.jefeProyecto.toUpperCase()
									.indexOf(
											charSequence.toString()
													.toUpperCase()) != -1;
							if (fullContainsSub) {
								filterResultsData.add(data);
							}

						} else if (GeneralHomeProyectosListaActivity.tipoBusqueda == 2) {
							boolean fullContainsSub = data.estado
									.toUpperCase().indexOf(
											charSequence.toString()
													.toUpperCase()) != -1;
							if (fullContainsSub) {
								filterResultsData.add(data);
							}
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
				filteredData = (List<ProyectoBean>) filterResults.values;
				notifyDataSetChanged();
			}
		};
	}

}
