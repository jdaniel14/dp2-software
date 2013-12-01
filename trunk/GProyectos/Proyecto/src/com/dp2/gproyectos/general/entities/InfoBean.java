package com.dp2.gproyectos.general.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class InfoBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("npr") //nombre del proyecto
	public String nombre;
	@SerializedName("npri") //nombre de la prioridad
	public String prioridad;
	@SerializedName("ntp")
	public String tipoproyecto;
	@SerializedName("dpr")
	public String descripcion;
	@SerializedName("fi")
	public String fechainicio;
	@SerializedName("ff")
	public String fechafin;
	
	public InfoBean() {
		super();
	}


	
	
}
