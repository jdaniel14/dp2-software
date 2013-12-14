package com.dp2.gproyectos.general.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class ProyectoBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("id")
	public String id;
	@SerializedName("nom")
	public String nombre;
	@SerializedName("jp")
	public String jefeProyecto;
	@SerializedName("tp")
	public String tipoProyecto;
	@SerializedName("fi")
	public String fechaInicio;
	@SerializedName("ff")
	public String fechaFin;
	@SerializedName("es")
	public String estado;
	
	public String idexp; //miembro eq
	
	public ProyectoBean() {
		super();
	}

	public ProyectoBean(String id, String nombre, String jefeProyecto,
			String fechaInicio, String fechaFin, String estado) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.jefeProyecto = jefeProyecto;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.estado = estado;
	}
	
	@Override
	public String toString(){
		return nombre;
	}
	
}
