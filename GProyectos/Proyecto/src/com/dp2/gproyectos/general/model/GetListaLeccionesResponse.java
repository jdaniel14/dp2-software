package com.dp2.gproyectos.general.model;

import java.io.Serializable;
import java.util.ArrayList;

import com.dp2.gproyectos.general.entities.LeccionBean;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.google.gson.annotations.SerializedName;

public class GetListaLeccionesResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("lecciones")
	public ArrayList<LeccionBean> lecciones;

}
