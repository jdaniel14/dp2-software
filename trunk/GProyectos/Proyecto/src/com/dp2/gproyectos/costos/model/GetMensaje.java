package com.dp2.gproyectos.costos.model;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class GetMensaje implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("codRespuesta")
	public int codRespuesta;
	@SerializedName("mensaje")
	public String mensaje;
}