package com.dp2.gproyectos.cronograma.model;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class ActividadDetalleBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("id")
	public String id;
	@SerializedName("name")
	public String name;
	@SerializedName("idWbs")
	public String idWbs;
	@SerializedName("wbsNode")
	public String wbsNode;
	@SerializedName("duration")	
	public String duration;
	@SerializedName("fecha_inicio")	
	public String fecha_inicio;
	@SerializedName("fecha_fin")	
	public String fecha_fin;
	@SerializedName("avance")	
	public String avance;
	
	public ActividadDetalleBean() {
		super();
	}

	public ActividadDetalleBean(String id, String name, String idWbs, String wbsNode,
			String duration, String fecha_inicio, String fecha_fin) {
		super();
		this.id = id;
		this.name = name;
		this.idWbs = idWbs;
		this.wbsNode = wbsNode;
		this.duration = duration;
		this.fecha_inicio = fecha_inicio;
		this.fecha_fin = fecha_fin;
	}
	
}

