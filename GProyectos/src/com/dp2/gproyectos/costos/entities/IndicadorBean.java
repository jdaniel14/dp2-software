package com.dp2.gproyectos.costos.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class IndicadorBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("nombre")
	public String nombre;
	@SerializedName("valor")
	public String valor;
	
	public IndicadorBean() {
		super();
	}

	public IndicadorBean(String nombre, String valor) {
		super();
		this.nombre = nombre;
		this.valor = valor;
	}
	
}