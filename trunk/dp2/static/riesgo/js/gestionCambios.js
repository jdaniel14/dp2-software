


$(document).ready(main);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main(){
	listarCambiosGantt();

	
		

}

function listarCambiosGantt(){

 var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    console.log(data);
    //Object {idProyecto: "8"} 
    $.ajax({
        type: 'GET',
        url: '../../api/R_obtenerAccionesParaAprobar' + '/' + data.idProyecto,
         dataType: "json",
        success: function(data) {
          
       console.log(data);
          
          for(obj in data){
          var idActividadCronograma= data[obj]["idActividadCronograma"];
          var nombreActividadCronograma=data[obj]["nombreActividadCronograma"];
          var fechaInicioActividadCronograma=data[obj]["fechaInicioActividadCronograma"];
          var duracionActividadCronograma=data[obj]["duracionActividadCronograma"];
          var nombreAccionRiesgo=data[obj]["nombreAccionRiesgo"];
          var fechaInicioAccionRiesgo=data[obj]["fechaInicioAccionRiesgo"];
          var tiempo=data[obj]["tiempo"];
                
          $("#camposMaterializados").append("<div class=\"well\" id=\"prueba" + 1 + "\" ></div>");

	cadena = "<div class=\"well\"><input id='id' type='text' style='display:none;' value='"+idActividadCronograma+"'>\n\
                <label >Se materializó el riesgo "+idActividadCronograma  +" : "+ nombreActividadCronograma+" </label></br>"+
                "<label>Se desea cambiar la actividad:</label></br></br>\n\
                <div class=\"col-lg-12 control-label\"> \n\
                 <div class=\"col-lg-4 control-label\"> <input type=\"text\" id=\"antiguoNombre\" value=\""+nombreActividadCronograma+"\"></div>" +
                " <div class=\"col-lg-4 control-label\"><label> Fecha:  </label><input type=\"date\" id=\"antiguaFechaInicio\" value=\""+fechaInicioActividadCronograma+"\">"+
                " </div> <div class=\"col-lg-4 control-label\"> <label> Duración de:</label>  <input type=\"number\" id=\"antiguaDuracion\" value=\""+duracionActividadCronograma+"\">" +
                "<label> dias</label><br></div></div>";
        
        cadena=cadena+""+
                    "<label>Por la siguiente actividad:</label></br></br>\n\
                <div class=\"col-lg-12 control-label\">  <div class=\"col-lg-4 control-label\"> \n\
            <input type=\"text\" id=\"nuevoNombre\" value=\""+nombreAccionRiesgo+"\"></div>" +
                " <div class=\"col-lg-4 control-label\"><label> Fecha:  </label>\n\
            <input type=\"date\" id=\"nuevoFechaInicio\" value=\""+fechaInicioAccionRiesgo+"\">"+
                " </div> <div class=\"col-lg-4 control-label\"> <label> Duración de:</label>  \n\
            <input type=\"number\" id=\"nuevoDuracion\" value=\""+tiempo+"\">" +
                "<label> dias</label><br></div><br>";
        
        cadena=cadena +'<button type="button" class="btn btn-primary rigth" id="btnGrabar" onclick="guardar_cambios();">Cambiar</button></div></div></div>';
	$("#prueba1").html(cadena);
          }
        }
        //"+ idActividadCronograma + ",'"+fechaInicioActividadCronograma+"',"+duracionActividadCronograma+",'"+nombreActividadCronograma+"'
        });
}

function guardar_cambios(){
    

        var data = {
            id:$("#id").val(),
            name: $("#nuevoNombre").val(),
            duration:$("#nuevoDuracion").val(),
            fecha_inicio:$("#nuevoFechaInicio").val()
               
        };
       
        var data2 = {
          idActividad : $("#id").val(),
          idProyecto : idProyectoLocal
        }

        var jsonData2 = JSON.stringify(data2);

        $.ajax({
            async: false,
            type: 'GET',
            url: "../../api/R_obtenerCostoReal/" + jsonData2,
             success: function(data3) {
                console.log(data3);
           
            },
            fail : alert("xD")
            
        });

       console.log(data);
     var jsonData = JSON.stringify(data);
     $.ajax({
            type: 'POST',
            url: "../../api/CR_updateActividad/",
            data: jsonData,
             success: function() {
                alert("Registrado con éxito");
           
            }
            
        });

     $.ajax({
            async: false,
            type: 'GET',
            url: "../../api/R_obtenerCostoReal/" + jsonData2,
             success: function(data3) {
                console.log(data3);
           
            },
            fail : alert("xD") 
            
        });

       console.log(data);
    
    
}