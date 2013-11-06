package com.dp2.gproyectos.general.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class LeccionBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("id")
	public String id;
	@SerializedName("ne")
	public String registrante;
	@SerializedName("dla")
	public String descripcionleccion;
	@SerializedName("np")
	public String nombreproyecto;
	@SerializedName("cla")
	public String clase;
	
	public LeccionBean() {
		super();
	}

	public LeccionBean(String id, String registrante,
			String descripcionleccion, String nombreproyecto, String clase) {
		super();
		this.id = id;
		this.registrante = registrante;
		this.descripcionleccion = descripcionleccion;
		this.nombreproyecto = nombreproyecto;
		this.clase = clase;
	}

	
	
}
