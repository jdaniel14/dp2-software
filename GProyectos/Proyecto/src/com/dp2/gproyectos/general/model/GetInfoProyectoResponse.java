package com.dp2.gproyectos.general.model;

import java.io.Serializable;
import java.util.ArrayList;

import com.dp2.gproyectos.general.entities.InfoBean;
import com.google.gson.annotations.SerializedName;

public class GetInfoProyectoResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("proyecto")
	public ArrayList<InfoBean> proyecto;

}
