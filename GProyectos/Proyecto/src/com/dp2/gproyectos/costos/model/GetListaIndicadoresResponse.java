package com.dp2.gproyectos.costos.model;

import java.io.Serializable;
import java.util.ArrayList;

import com.dp2.gproyectos.costos.entities.IndicadorBean;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.google.gson.annotations.SerializedName;

public class GetListaIndicadoresResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("lista")
	public ArrayList<IndicadorBean> indicadores;

}