package com.dp2.gproyectos.cronograma.model;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class RecursoBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("idrecurso")
	public String id;
	@SerializedName("descripcion_recurso")
	public String name;
	
	public RecursoBean() {
		super();
	}

	public RecursoBean(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
}
