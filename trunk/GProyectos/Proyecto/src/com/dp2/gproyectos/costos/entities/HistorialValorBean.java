package com.dp2.gproyectos.costos.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class HistorialValorBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("fecha")
	public String fecha;
	@SerializedName("valor")
	public String valor;
	
	public HistorialValorBean() {
		super();
	}

	public HistorialValorBean(String fecha, String valor) {
		super();
		this.fecha = fecha.replaceAll("-", "/");
		this.valor = valor;
	}
	
}