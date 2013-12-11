package com.dp2.gproyectos.general.model;

import java.io.Serializable;
import java.util.ArrayList;

import com.dp2.gproyectos.general.entities.InfoBean;
import com.google.gson.annotations.SerializedName;

public class GetEstadoLineaBaseResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("estado_linea_base")
	public String estado; // "true" o "false"

}
