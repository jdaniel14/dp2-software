package com.dp2.gproyectos.costos.view.adapter;

import java.text.DecimalFormat;
import java.util.List;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.costos.controller.IndicadoresController;
import com.dp2.gproyectos.costos.entities.IndicadorBean;

public class IndicadorAdapter extends ArrayAdapter<IndicadorBean> {
	List<IndicadorBean> indicadores;
	int resource;
	Context context;

	public IndicadorAdapter(Context context, int resource,
			List<IndicadorBean> items) {
		super(context, resource, items);
		this.context = context;
		this.resource = resource;

		indicadores = items;
	}

	public View getView(int position, View convertView, ViewGroup parent) {
		LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		IndicadorBean item = getItem(position);
		LinearLayout nuevaVista;

		if (convertView == null) {
			nuevaVista = new LinearLayout(getContext());
			inflater.inflate(resource, nuevaVista, true);

		} else {
			nuevaVista = (LinearLayout) convertView;
		}

		TextView txtNombre = (TextView) nuevaVista.findViewById(R.id.txtCostosNombreIndicador);
		TextView txtValor = (TextView) nuevaVista.findViewById(R.id.txtCostosValorIndicador);
		LinearLayout background = (LinearLayout) nuevaVista.findViewById(R.id.itemBackground);

		txtNombre.setText(item.nombre + " (" + item.nombreLargo + ")");
		txtValor.setText(new DecimalFormat("#.##").format(Double.valueOf(item.valor)));
		background.setBackgroundColor(IndicadoresController.getColor(indicadores.get(position)));
		
		return nuevaVista;
	}

	public int getCount() {
		return indicadores.size();
	}

	public IndicadorBean getItem(int position) {
		return indicadores.get(position);
	}

	public long getItemId(int position) {
		return position;
	}
}