package com.dp2.gproyectos.cronograma.model;

import java.io.Serializable;
import java.util.ArrayList;

import com.dp2.gproyectos.costos.entities.IndicadorBean;
import com.dp2.gproyectos.cronograma.entities.IndicadorCronogramaBean;
import com.google.gson.annotations.SerializedName;

public class GetListaIndicadoresCronogramaResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("indicadores")
	public ArrayList<ArrayList<IndicadorCronogramaBean>> indicadores;

}