


$(document).ready(main);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main(){
	listarCambiosGantt();

	
		

}

function listarCambiosGantt(){

	$("#camposMaterializados").append("<div class=\"well\" id=\"prueba" + 1 + "\" ></div>");


	cadena = "<label>Se materializó el riesgo + \"ID ACA\" "+" : "+" \"NOMBRE ACA\" + </label></br>"+
                "<label>Se desea cambiar la actividad:</label></br></br> <input type=\"text\" id=\"antiguoNombre\">" +
                "<label> de </label> <input type=\"date\" id=\"antiguaFechaInicio\"> <label> hasta </label>" +
                "<input type=\"date\" id=\"antiguaFechaFin\"> <label> - Duración de:</label> <input type=\"number\" id=\"antiguaDuración\">" +
                "<label> dias</label>";

	$("#prueba1").html(cadena);
}