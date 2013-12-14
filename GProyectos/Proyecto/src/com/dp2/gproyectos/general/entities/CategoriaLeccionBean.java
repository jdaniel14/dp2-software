package com.dp2.gproyectos.general.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class CategoriaLeccionBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("idCategoria")
	public String id;
	@SerializedName("nom")
	public String nombre;
	
	public CategoriaLeccionBean() {
		super();
	}

	@Override
	public String toString(){
		return nombre;
	}
	
}
