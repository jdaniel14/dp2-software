package com.dp2.gproyectos.cronograma.model;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class ActividadBean implements Serializable {
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
	@SerializedName("real_hours")	
	public String horasReales;
	
	public ActividadBean() {
		super();
	}

	public ActividadBean(String id, String name, String idWbs, String wbsNode,
			String duration) {
		super();
		this.id = id;
		this.name = name;
		this.idWbs = idWbs;
		this.wbsNode = wbsNode;
		this.duration = duration;		
	}
	
}
