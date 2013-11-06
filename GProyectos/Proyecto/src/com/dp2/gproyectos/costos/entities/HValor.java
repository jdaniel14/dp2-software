package com.dp2.gproyectos.costos.entities;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class HValor {
	public Date date;
	public Double valor;
	public String strDate;
	
	public HValor(String date, String valor) {
		try {
			this.valor = Double.valueOf(valor);
		} catch (Exception e) {
			this.valor = 0.0;
		}
		
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("dd-mm-yyyy");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(sdf.parse(date));
			this.date = calendar.getTime();
			
			sdf = new SimpleDateFormat("yyyymmdd");
			strDate = sdf.format(calendar.getTime());
		} catch  (Exception e){
			
		}
		
	}
}
