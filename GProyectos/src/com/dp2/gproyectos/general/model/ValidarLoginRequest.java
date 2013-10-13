package com.dp2.gproyectos.general.model;

import com.google.gson.annotations.SerializedName;

public class ValidarLoginRequest {
	@SerializedName("p_user")
	public String usuario;

	@SerializedName("p_pass")
	public String pass;
}
