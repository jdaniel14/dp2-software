var updateStatus= "../../api/R_actualizarEstadoRiesgoProyecto";


$(document).ready(main);
var idProyectoLocal = localStorage.getItem("idProyecto");
var idAct;

function main(){
	listarCambiosGantt();

	
		

}

function listarCambiosGantt(){

 var data = {
        idProyecto: idProyectoLocal,
        idUsuario: localStorage.getItem("idUsuario")
    };
    var jsonData = JSON.stringify(data);
    console.log(data);
    var i=0;
    $.ajax({
        type: 'GET',
        // url: '../../api/R_obtenerAccionesParaAprobar' + '/' + data.idProyecto,
        url: '../../api/R_obtenerAccionesParaAprobar' + '/' + jsonData,
         dataType: "json",
         
        success: function(data) {
           
            if(data==null){
                 $("#camposMaterializados").append("<b>No hay acciones para aprobar<b>");
                
            }
          
       console.log(data);
          
          for(obj in data){
          var idAccionRiesgo = data[obj]["idAccionesRiesgo"];
          var idActividadCronograma= data[obj]["idActividadCronograma"];
          var nombreActividadCronograma=data[obj]["nombreActividadCronograma"];
          var fechaInicioActividadCronograma=data[obj]["fechaInicioActividadCronograma"];
          var duracionActividadCronograma=data[obj]["duracionActividadCronograma"];
          var nombreAccionRiesgo=data[obj]["nombreAccionRiesgo"];
          var fechaInicioAccionRiesgo=data[obj]["fechaInicioAccionRiesgo"];
          var tiempo=data[obj]["tiempo"];
                
                i++;
          $("#camposMaterializados").append("<div class=\"well\" id=\"prueba" + idActividadCronograma + "\" ></div>");

	cadena = "<div class=\"well\"><input id='id' type='text' style='display:none;' value='"+idActividadCronograma+"'>\n\
                <label >Se materializó el riesgo "+idActividadCronograma  +" : "+ nombreActividadCronograma+" </label></br>"+
                "<label class=\"control-label\">Se desea cambiar: </label></br></br>\n\
                <div class=\"col-lg-12\"> \n\
                 <div class=\"col-lg-4 control-label\"> <label class=\"control-label\"> Actividad:  </label><input readonly type=\"text\" class=\"form-control\" id=\"antiguoNombre\" value=\""+nombreActividadCronograma+"\"></div>" +
                " <div class=\"col-lg-4 control-label\"><label class=\"control-label\"> Fecha:  </label><input class=\"form-control\" readonly type=\"date\" id=\"antiguaFechaInicio\" value=\""+fechaInicioActividadCronograma+"\">"+
                " </div> <div class=\"col-lg-4 control-label\"> <label class=\"control-label\"> Duración de:</label>  <input class=\"form-control\" readonly type=\"number\" id=\"antiguaDuracion\" value=\""+duracionActividadCronograma+"\">" +
                "<label> dias</label><br></div></div>";
        
        cadena=cadena+""+
                    "<label>Por la siguiente:</label></br></br>\n\
                <div class=\"col-lg-12 control-label\">  <div class=\"col-lg-4 control-label\"> \n\
            <label class=\"control-label\"> Actividad:  </label><input class=\"form-control\" readonly type=\"text\" id=\"nuevoNombre_"+idActividadCronograma  +"\" value=\""+nombreActividadCronograma+"\"></div>" +
                " <div class=\"col-lg-4 control-label\"><label> Fecha:  </label>\n\
            <input class=\"form-control\" readonly type=\"date\" id=\"nuevoFechaInicio_"+idActividadCronograma +"\" value=\""+fechaInicioAccionRiesgo+"\">"+
                " </div> <div class=\"col-lg-4 control-label\"> <label> Duración de:</label>  \n\
            <input class=\"form-control\" readonly type=\"number\" id=\"nuevoDuracion_"+idActividadCronograma +"\" value=\""+tiempo+"\">" +
                "<label> dias</label><br></div><br><div></div><br>";
        
        cadena=cadena +'<div class="col-md-12"  style="text-align:center"><button type="button" class="btn btn-primary rigth" id="btnGrabar" onclick="guardar_cambios('+idActividadCronograma  +','+idAccionRiesgo+');">Cambiar</button>';
	cadena=cadena +'&nbsp<button type="button" class="btn btn-primary rigth" id="btnRechazar" onclick="rechazar_cambios('+idActividadCronograma  +','+idAccionRiesgo+');">Rechazar</button></div></div></div>';
	
                $("#prueba"+idActividadCronograma).html(cadena);
          }
        }
        //"+ idActividadCronograma + ",'"+fechaInicioActividadCronograma+"',"+duracionActividadCronograma+",'"+nombreActividadCronograma+"'
        });
}


function rechazar_cambios(id,idAccionRiesgo){
    
     var data = {
            
            idAccionesRiesgo:idAccionRiesgo,
            flagAceptadoRechazado:0,
            idProyecto : idProyectoLocal,
            idUsuario: localStorage.getItem("idUsuario")
               
        };
        
        console.log(data);
        var jsonData = JSON.stringify(data);
        $.ajax({
            type: 'PUT',
            url: updateStatus,
            data: jsonData,
             success: function(data) {
                var item=JSON.parse(data);
                $("#prueba"+idAct).hide();
                $("#labelExitoModal").html("");
                $("#labelExitoModal").append("Rechazado");
                $('#modalExito').modal('show');

                 }
            
        });

    
}



function guardar_cambios(id,idAccionRiesgo){
    
            
        var data = {
            id:id,
            name: $("#nuevoNombre_"+id).val(),
            duration:$("#nuevoDuracion_"+id).val(),
            fecha_inicio:$("#nuevoFechaInicio_"+id).val(),
            idProyecto : idProyectoLocal,
            idUsuario: localStorage.getItem("idUsuario")
               
        };
       idAct=data.id;

        var data1 = {
            idAccionesRiesgo:idAccionRiesgo,
            flagAceptadoRechazado:1,
            idProyecto : idProyectoLocal,
            idUsuario: localStorage.getItem("idUsuario")
               
        };

       console.log(data);
     var jsonData = JSON.stringify(data);
     
     
      var jsonData1 = JSON.stringify(data1);
     $.ajax({
        type: 'POST',
        url: "../../api/CR_updateActividad/",
        data: jsonData,
        success: function(data) {
            var item=JSON.parse(data);
           // alert(item['codRespuesta']);
            // alert("Registrado con éxito");
            
            $("#prueba"+idAct).hide();

            $.ajax({
                type: 'PUT',
                url: updateStatus,
                data: jsonData1,
                success: function(data1) {
                    
                  $("#labelExitoModal").html("");
                  $("#labelExitoModal").append("Registrado con éxito");
                  $('#modalExito').modal('show');
                }                        
            });
        }
      });
      console.log(data);
    
    
}