package com.dp2.gproyectos.cronograma.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class IndicadorCronogramaBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("idindicadorxproyecto")
	public String idindicadorxproyecto;
	@SerializedName("id_indicador")
	public String id_indicador;
	@SerializedName("nombre_indicador")
	public String nombre_indicador;
	@SerializedName("fecha")
	public String fecha;
	@SerializedName("valor")
	public String valor;
	
	public IndicadorCronogramaBean() {
		super();
	}

	public IndicadorCronogramaBean(String idindicadorxproyecto,
			String id_indicador, String nombre_indicador, String fecha,
			String valor) {
		super();
		this.idindicadorxproyecto = idindicadorxproyecto;
		this.id_indicador = id_indicador;
		this.nombre_indicador = nombre_indicador;
		this.fecha = fecha;
		this.valor = valor;
	}

}