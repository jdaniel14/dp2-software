package com.dp2.gproyectos.costos.model;

import java.io.Serializable;
import java.util.ArrayList;

import com.dp2.gproyectos.costos.entities.HistorialIndicadorBean;
import com.google.gson.annotations.SerializedName;

public class GetListaHistorialIndicadoresResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("lista")
	public ArrayList<HistorialIndicadorBean> indicadores;

}