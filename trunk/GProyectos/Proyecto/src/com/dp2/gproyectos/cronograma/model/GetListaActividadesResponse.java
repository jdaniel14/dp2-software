package com.dp2.gproyectos.cronograma.model;

import java.io.Serializable;
import java.util.ArrayList;

import com.google.gson.annotations.SerializedName;

public class GetListaActividadesResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("tasks")
	public ArrayList<ActividadBean> tasks;

}