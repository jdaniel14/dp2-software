package com.dp2.gproyectos.costos.entities;

import java.util.ArrayList;

public class HIndicador {
	public String nombre;
	public ArrayList<HValor> historial;
	
	public HIndicador(String nombre, ArrayList<HistorialValorBean> historial) {
		this.nombre = nombre;
		this.historial = new ArrayList<HValor>();
		
		if (historial != null) {
			for (HistorialValorBean historialValorBean : historial) {
				HValor valor = new HValor(historialValorBean.fecha, historialValorBean.valor);
				this.historial.add(valor);
			}
		}
	}
}
