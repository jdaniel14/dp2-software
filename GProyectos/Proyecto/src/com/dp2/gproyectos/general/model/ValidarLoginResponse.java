package com.dp2.gproyectos.general.model;

import com.dp2.gproyectos.general.entities.UsuarioBean;
import com.google.gson.annotations.SerializedName;

public class ValidarLoginResponse {
	@SerializedName("me")
	public UsuarioBean usuario;

}
