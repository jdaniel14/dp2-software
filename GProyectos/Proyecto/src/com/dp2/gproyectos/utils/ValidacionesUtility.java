package com.dp2.gproyectos.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import android.text.TextUtils;

public class ValidacionesUtility {
	public static Pattern pattern = null;

	public static boolean validarEmail(String email) {
		String regex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

		pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(email);
		return matcher.matches();
	}

	public static boolean validarTelefono(String telefono) {
		String regex = "^(\\+)*([\\d]+[\\d\\-]*)$";

		pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(telefono);
		return matcher.matches();
	}

	public static boolean validarStringConContenido(String texto) {
		if (TextUtils.isEmpty(texto)) {
			return false; // no es valido
		} else if ((texto.trim().length() == 0)) {
			return false;
		}
		return true; // es valido
	}
}
