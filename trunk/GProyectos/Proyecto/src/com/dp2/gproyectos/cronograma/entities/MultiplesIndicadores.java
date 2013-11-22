package com.dp2.gproyectos.cronograma.entities;

import java.util.ArrayList;

import com.dp2.gproyectos.costos.entities.HistorialIndicadorBean;
import com.dp2.gproyectos.costos.entities.HistorialValorBean;

public class MultiplesIndicadores {
	
	public ArrayList<HistorialIndicadorBean> listaIndicadores;
	
	public MultiplesIndicadores(ArrayList<ArrayList<IndicadorCronogramaBean>> tmp) {
		listaIndicadores = new ArrayList<HistorialIndicadorBean>();
		
		if (tmp != null) {
			for (ArrayList<IndicadorCronogramaBean> listaValores : tmp) {
				if (listaValores != null && !listaValores.isEmpty()) {
					String nombre = listaValores.get(0).nombre_indicador;
					ArrayList<HistorialValorBean> historial = new ArrayList<HistorialValorBean>();
					for (IndicadorCronogramaBean elemento : listaValores) {
						historial.add(new HistorialValorBean(elemento.fecha, elemento.valor));
					}
					
					listaIndicadores.add(new HistorialIndicadorBean(nombre, historial));
				}
			}
		}
	}
}
