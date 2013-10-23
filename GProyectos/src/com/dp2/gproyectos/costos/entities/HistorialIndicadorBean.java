package com.dp2.gproyectos.costos.entities;

import java.io.Serializable;
import java.util.ArrayList;

import com.google.gson.annotations.SerializedName;

public class HistorialIndicadorBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("nombre")
	public String nombre;
	@SerializedName("historial")
	public ArrayList<HistorialValorBean> historial;
	
	public HistorialIndicadorBean() {
		super();
	}

	public HistorialIndicadorBean(String nombre, ArrayList<HistorialValorBean> historial) {
		super();
		this.nombre = nombre;
		this.historial = historial;
	}
	
}