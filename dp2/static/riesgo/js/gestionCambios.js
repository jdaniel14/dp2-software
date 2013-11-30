


$(document).ready(main);
var idProyectoLocal = localStorage.getItem("idProyecto");
var idAct;

function main(){
	listarCambiosGantt();

	
		

}

function listarCambiosGantt(){

 var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    console.log(data);
    var i=0;
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
                
                i++;
          $("#camposMaterializados").append("<div class=\"well\" id=\"prueba" + idActividadCronograma + "\" ></div>");

	cadena = "<div class=\"well\"><input id='id' type='text' style='display:none;' value='"+idActividadCronograma+"'>\n\
                <label >Se materializó el riesgo "+idActividadCronograma  +" : "+ nombreActividadCronograma+" </label></br>"+
                "<label>Se desea cambiar la actividad:</label></br></br>\n\
                <div class=\"col-lg-12 control-label\"> \n\
                 <div class=\"col-lg-4 control-label\"> <input readonly type=\"text\" id=\"antiguoNombre\" value=\""+nombreActividadCronograma+"\"></div>" +
                " <div class=\"col-lg-4 control-label\"><label> Fecha:  </label><input readonly type=\"date\" id=\"antiguaFechaInicio\" value=\""+fechaInicioActividadCronograma+"\">"+
                " </div> <div class=\"col-lg-4 control-label\"> <label> Duración de:</label>  <input readonly type=\"number\" id=\"antiguaDuracion\" value=\""+duracionActividadCronograma+"\">" +
                "<label> dias</label><br></div></div>";
        
        cadena=cadena+""+
                    "<label>Por la siguiente actividad:</label></br></br>\n\
                <div class=\"col-lg-12 control-label\">  <div class=\"col-lg-4 control-label\"> \n\
            <input readonly type=\"text\" id=\"nuevoNombre_"+idActividadCronograma  +"\" value=\""+nombreActividadCronograma+"\"></div>" +
                " <div class=\"col-lg-4 control-label\"><label> Fecha:  </label>\n\
            <input readonly type=\"date\" id=\"nuevoFechaInicio_"+idActividadCronograma +"\" value=\""+fechaInicioAccionRiesgo+"\">"+
                " </div> <div class=\"col-lg-4 control-label\"> <label> Duración de:</label>  \n\
            <input readonly type=\"number\" id=\"nuevoDuracion_"+idActividadCronograma +"\" value=\""+tiempo+"\">" +
                "<label> dias</label><br></div><br>";
        
        cadena=cadena +'<button type="button" class="btn btn-primary rigth" id="btnGrabar" onclick="guardar_cambios('+idActividadCronograma  +');">Cambiar</button></div></div></div>';
	$("#prueba"+idActividadCronograma).html(cadena);
          }
        }
        //"+ idActividadCronograma + ",'"+fechaInicioActividadCronograma+"',"+duracionActividadCronograma+",'"+nombreActividadCronograma+"'
        });
}

function guardar_cambios(id){
    
            
        var data = {
            id:id,
            name: $("#nuevoNombre_"+id).val(),
            duration:$("#nuevoDuracion_"+id).val(),
            fecha_inicio:$("#nuevoFechaInicio_"+id).val()
               
        };
       idAct=data.id;
        var data2 = {
          idActividad : id,
          idProyecto : idProyectoLocal
        };

        var jsonData2 = JSON.stringify(data2);

        $.ajax({
            async: false,
            type: 'GET',
            url: "../../api/R_obtenerCostoReal/" + jsonData2,
             success: function(data3) {
                console.log(data3);
           
            },
       
            
        });

       console.log(data);
     var jsonData = JSON.stringify(data);
     $.ajax({
            type: 'POST',
            url: "../../api/CR_updateActividad/",
            data: jsonData,
             success: function(data) {
                var item=JSON.parse(data);
               // alert(item['codRespuesta']);
                alert("Registrado con éxito");
                
                $("#prueba"+idAct).hide();

                 }
            
        });

           
     $.ajax({
            async: false,
            type: 'GET',
            url: "../../api/R_obtenerCostoReal/" + jsonData2,
             success: function(data3) {
                console.log(data3);
           
            },
        
            
        });

       console.log(data);
    
    
}