package com.dp2.gproyectos.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtility {
    /**
    *
    * @return date
    */
   public static Date getDate(){
       return Calendar.getInstance().getTime( );
   }
 
   public static String getFechaActual(){
       return convertTimeLongToString(Calendar.getInstance().getTime().getTime())[0];
   }
   
   public static String getHoraActual(){
       return convertTimeLongToString(Calendar.getInstance().getTime().getTime())[1];
   }
   
   public static String getFechaActualCompleta(){
       String[] fecha = convertTimeSSLongToString(Calendar.getInstance().getTime().getTime());
       return fecha[0] + " " + fecha[1]; 
   }
   
   
   public static Date getDateSiguiente(){
       Calendar calendar = Calendar.getInstance();
       
       long DAY = 24*60*60*1000;
       
       Date date = calendar.getTime();
       long lDate = date.getTime();
       lDate += (DAY * 1);     // date 1 day from current date.
       date.setTime(lDate);
       return date;
   }
   
   
   public static Date getDateDDMMYYYY(String date){
       Calendar calendar = Calendar.getInstance();
       int dia = Integer.parseInt(date.substring(0,2));
       int mes = Integer.parseInt(date.substring(3,5)) - 1;
       int anio = Integer.parseInt(date.substring(6));
       
       calendar.set(Calendar.YEAR, anio);
       calendar.set(Calendar.MONTH,mes);
       calendar.set(Calendar.DAY_OF_MONTH, dia);
       
       return calendar.getTime();
   }
   
   
   public static String formatDDMMYYYY(String separador,Date date){
       if(date == null)
           date = getDate();
       
       Calendar calendar = Calendar.getInstance();
       calendar.setTime(date);
       
       String fecha;
       
       String strDia;
       int dia = calendar.get(Calendar.DAY_OF_MONTH);
       if(dia < 10)
           strDia = "0" + dia ;
       else
           strDia = dia + "";
       fecha = strDia + separador;
       
       String strMes;
       int mes = calendar.get(Calendar.MONTH) + 1;
       if(mes < 10)
           strMes = "0" + mes ;
       else
           strMes = mes + "";
       fecha = fecha + strMes + separador;
       
       fecha = fecha + calendar.get(Calendar.YEAR);
       
       return fecha;
   }
   
   public static String[] convertTimeSSLongToString(long time) {
       String data[] = new String[2];
       
       Calendar calendar = Calendar.getInstance();
       calendar.setTime(new Date(time));
       
       StringBuffer buffer = new StringBuffer();
       
       if (calendar.get(Calendar.DAY_OF_MONTH) < 10) {
           buffer.append(0);
       }
       buffer.append(calendar.get(Calendar.DAY_OF_MONTH));
       buffer.append("/");
       
       if ((calendar.get(Calendar.MONTH) +1) < 10) {
           buffer.append(0);
       }
       buffer.append((calendar.get(Calendar.MONTH) +1));
       buffer.append("/");
       
       buffer.append(calendar.get(Calendar.YEAR));
       
       data[0] = buffer.toString();
       
       buffer = new StringBuffer();
       
       if (calendar.get(Calendar.HOUR_OF_DAY) < 10) {
           buffer.append(0);
       }
       buffer.append(calendar.get(Calendar.HOUR_OF_DAY));
       buffer.append(":");
       
       if (calendar.get(Calendar.MINUTE) < 10) {
           buffer.append(0);
       }
       buffer.append(calendar.get(Calendar.MINUTE));
       buffer.append(":");
       
       if (calendar.get(Calendar.SECOND) < 10) {
           buffer.append(0);
       }
       buffer.append(calendar.get(Calendar.SECOND));
       
       data[1] = buffer.toString();
       
       return data;
   }
   
   public static String[] convertTimeLongToString(long time) {
       String data[] = new String[2];
       
       Calendar calendar = Calendar.getInstance();
       calendar.setTime(new Date(time));
       
       StringBuffer buffer = new StringBuffer();
       
       if (calendar.get(Calendar.DAY_OF_MONTH) < 10) {
           buffer.append(0);
       }
       buffer.append(calendar.get(Calendar.DAY_OF_MONTH));
       buffer.append("/");
       
       if ((calendar.get(Calendar.MONTH) +1) < 10) {
           buffer.append(0);
       }
       buffer.append((calendar.get(Calendar.MONTH) +1));
       buffer.append("/");
       
       buffer.append(calendar.get(Calendar.YEAR));
       
       data[0] = buffer.toString();
       
       buffer = new StringBuffer();
       
       if (calendar.get(Calendar.HOUR_OF_DAY) < 10) {
           buffer.append(0);
       }
       buffer.append(calendar.get(Calendar.HOUR_OF_DAY));
       buffer.append(":");
       
       if (calendar.get(Calendar.MINUTE) < 10) {
           buffer.append(0);
       }
       buffer.append(calendar.get(Calendar.MINUTE));
       
       data[1] = buffer.toString();
       
       return data;
   }
   
   /**
    * Determines if the given month, day, and year combination is valid.
    *
    * @return true if the date is valid
    */
   public static boolean isValid( int day, int month,int year) {
       
       if ( !( month >= 1 && month <= 12 )
       || !(day >=1 && day <= 31)
       || !(year >= 1000 && year <= 9999)
       || ( day == 31 &&
               ( month == 4 /*april*/ || month == 6  /*june*/ ||
               month == 9 /*sept*/  || month == 11 /*nov*/ ) ) ||
               ( month == 2 /*feb*/ && day > 29 ) ) {
           
           return false;
       }
       
       if ( month == 2 && day == 29 ) {   // if a year is divisible by 4 it is a leap year UNLESS it is also
           // divisible by 100 AND is not divisible by 400
           if ( year % 4 > 0
                   || ( ( year % 100 == 0 ) && ( year % 400 > 0 ) ) ) {
               
               return false;
           }
       }
       
       return true;
   }
   
}
