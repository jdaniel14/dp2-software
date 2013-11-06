package com.dp2.gproyectos.general.entities;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class UsuarioBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@SerializedName("id_user")
	public String id;
	
	@SerializedName("nom_user")
	public String usuario;
	public String password;
	
	public UsuarioBean() {
		super();
	}
	
}