package com.dp2.gproyectos.costos.entities;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import com.google.gson.annotations.SerializedName;

public class HistorialIndicadorBean implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@SerializedName("nombre")
	public String nombre;
	@SerializedName("historial")
	public ArrayList<HistorialValorBean> historial;
	
	public HistorialIndicadorBean() {
		super();
	}

	public HistorialIndicadorBean(String nombre, ArrayList<HistorialValorBean> historial) {
		super();
		this.nombre = nombre;
		this.historial = historial;
	}

	public static double getMaxValue(ArrayList<HistorialIndicadorBean> valores) {
		double max = 1;
		
		if (valores != null && !valores.isEmpty()) {
			for (HistorialIndicadorBean valor : valores) {
				if (valor.historial != null && !valor.historial.isEmpty()) {
					for (HistorialValorBean elemento : valor.historial) {
						if (elemento.valor != null) {
							try {
								if (Double.valueOf(elemento.valor) > max) {
									max = Double.valueOf(elemento.valor);
								}
							} catch (Exception e) {}
						}
					}
				}
			}
		}
		
		return max;
	}
	
	public static double getMinValue(ArrayList<HistorialIndicadorBean> valores, double max) {
		double min = max;
		
		if (valores != null && !valores.isEmpty()) {
			for (HistorialIndicadorBean valor : valores) {
				if (valor.historial != null && !valor.historial.isEmpty()) {
					for (HistorialValorBean elemento : valor.historial) {
						if (elemento.valor != null) {
							try {
								if (Double.valueOf(elemento.valor) < min) {
									min = Double.valueOf(elemento.valor);
								}
							} catch (Exception e) {}
						}
					}
				}
			}
		}
		
		return min;
	}
	
	public static long getMinDate(ArrayList<HistorialIndicadorBean> valores) {
		
		Calendar calendar = Calendar.getInstance();
		long min = 0;
		
		
		if (valores != null && !valores.isEmpty()) {
			if (valores.get(0) != null && !valores.get(0).historial.isEmpty()) {
				String strFrecha = valores.get(0).historial.get(0).fecha;
				SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
				try {
					calendar.setTime(sdf.parse(strFrecha));
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				min = calendar.getTimeInMillis();
			}
			
			
			/*
			for (HistorialIndicadorBean valor : valores) {
				if (valor.historial != null && !valor.historial.isEmpty()) {
					if (valor.historial.get(valor.historial.size()-1).fecha != null) {
						String strFrecha = valor.historial.get(valor.historial.size()-1).fecha;
						SimpleDateFormat sdf = new SimpleDateFormat("dd-mm-yyyy");
						try {
							if (min == 0) {
								calendar.setTime(sdf.parse(strFrecha));
								min = calendar.getTimeInMillis();
							} else {
								Calendar calendar2 = Calendar.getInstance();
								calendar2.setTime(sdf.parse(strFrecha));
								if (calendar.compareTo(calendar2) > 0) {
									calendar = calendar2;
									min = calendar.getTimeInMillis();
								}
							}
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
			*/
		}

		//calendar.add(Calendar.MONTH, -1);
		min = calendar.getTimeInMillis();
		
		return min;
	}
	
public static long getMaxDate(ArrayList<HistorialIndicadorBean> valores) {
		
		Calendar calendar = Calendar.getInstance();
		long max = 0;
		
		
		if (valores != null && !valores.isEmpty()) {
			
			if (valores.get(0) != null && !valores.get(0).historial.isEmpty()) {
				String strFrecha = valores.get(0).historial.get(valores.get(0).historial.size()-1).fecha;
				SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
				try {
					calendar.setTime(sdf.parse(strFrecha));
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				max = calendar.getTimeInMillis();
			}
			
			/*
			for (HistorialIndicadorBean valor : valores) {
				if (valor.historial != null && !valor.historial.isEmpty()) {
					if (valor.historial.get(valor.historial.size()-1).fecha != null) {
						String strFrecha = valor.historial.get(valor.historial.size()-1).fecha;
						SimpleDateFormat sdf = new SimpleDateFormat("dd-mm-yyyy");
						try {
							if (max == 0) {
								calendar.setTime(sdf.parse(strFrecha));
								max = calendar.getTimeInMillis();
							} else {
								Calendar calendar2 = Calendar.getInstance();
								calendar2.setTime(sdf.parse(strFrecha));
								if (calendar.compareTo(calendar2) < 0) {
									calendar = calendar2;
									max = calendar.getTimeInMillis();
								}
							}
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
			*/
		}
		if (max == 0) {
			calendar.add(Calendar.MONTH, 1);
			max = calendar.getTimeInMillis();
		}
		
		return max;
	}
}