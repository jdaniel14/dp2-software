package com.dp2.gproyectos.costos.entities;

import java.io.Serializable;
import java.text.SimpleDateFormat;

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
		//this.fecha = fecha.replaceAll("-", "/");
//		this.fecha = fecha;
		this.valor = valor;
		this.fecha = "";
		try {
			if (fecha.charAt(2) == '-')
				this.fecha = fecha;
			else
				this.fecha = fecha.substring(8, 10) + "-" + fecha.substring(5, 7) + "-" + fecha.substring(0, 4);
		} catch (Exception e) {
			e.printStackTrace();
			try {
				this.fecha = fecha.substring(8, 10) + fecha.substring(5, 7) + fecha.substring(0, 4);
			} catch (Exception e2) {
				e.printStackTrace();
			}
		}
	}
	
}