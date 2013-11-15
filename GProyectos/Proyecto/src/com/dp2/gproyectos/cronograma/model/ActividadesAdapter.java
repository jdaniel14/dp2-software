package com.dp2.gproyectos.cronograma.model;

import java.util.List;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.cronograma.view.ListaActividadesXProyecto;
import com.dp2.gproyectos.general.entities.ProyectoBean;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

public class ActividadesAdapter extends ArrayAdapter<ActividadBean>{
	List<ActividadBean> originalData, filteredData;
	int resource;
	Context context;
	
	public ActividadesAdapter(Context context, int resource,List<ActividadBean> items) {
		super(context, resource, items);
		this.context = context;
		this.resource = resource;

		// To start, set both data sources to the incoming data
		originalData = items;
		filteredData = items;
	}
	
	public View getView(int position, View convertView, ViewGroup parent) {
		LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		ActividadBean item = getItem(position);
		LinearLayout nuevaVista;

		if (convertView == null) {
			nuevaVista = new LinearLayout(getContext());
			inflater.inflate(resource, nuevaVista, true);
		} 
		else {
			nuevaVista = (LinearLayout) convertView;
		}
		
		TextView listActs_act = (TextView) nuevaVista.findViewById(R.id.listActs_act);
		TextView listActs_wbs = (TextView) nuevaVista.findViewById(R.id.listActs_wbs);
		TextView listActs_dur = (TextView) nuevaVista.findViewById(R.id.listActs_dur);

		listActs_act.setText(item.name);
		listActs_wbs.setText(item.wbsNode);
		listActs_dur.setText(item.duration);
		
		return nuevaVista;
	}

}
