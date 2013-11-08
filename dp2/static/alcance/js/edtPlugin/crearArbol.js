
 
function repaint(){
                $("#chart").html("");
                $("#org").jOrgChart({
                    chartElement : '#chart',
                    dragAndDrop  : false
                });

                $( "#chart" ).keypress(function( event ) {
                  if ( event.which == 97 ) {
                     event.preventDefault();
                  }
                    console.log("key A");
                    $( "#inputAgregarHijo" ).trigger( "click" );
                });
        }

//crearEdtPlugin();
/*
{"idproyecto":1,"title":"DP2","hijos": 3,"dias":10,"descripcion":"El proyeto",
"nodos":[
          {"title":"Analisis","hijos":0,"dias":5,"descripcion":"El analisis","nodos":[]},
          {"title":"Desarrollo","hijos":0,"dias":2,"descripcion":"El desarrollo","nodos":[]},
          {"title":"Transicion","hijos":0,"dias": 3,"descripcion":"La transicion","nodos":[]}
        ]
}

*/




 var idnodoCounter;

 function agregarPadreJson( idproyecto, title, hijos, dias, descripcion, nodos ){
                var jsonCliente = {
                                  idproyecto : idproyecto,
                                  title : title,
                                  hijos: hijos,
                                  dias: dias,
                                  descripcion: descripcion,
                                  nodos : nodos
                                  };
                return jasonCliente;
            }


$("#CrearEDTCero").click(function(){
               console.log("creando edt");
                $("#edtCrearLogError").hide("slow");
                $("#glosarioEDT").show("slow");
                idnodoCounter = 1;
                var titleParent = "Nombre Proyecto";
                var idnodo = 1;
                var idproyecto = localStorage.getItem("idProyecto");

                var html = '<li>' +'<label class = "inputEdtTitle"  id = "title-' + idnodo;
                html += '">' +titleParent + '</label> <ul id = "ul-'+ idnodo + '"></ul>';
                $("#org").html( html );
                $("#containerEdt").show("slow"); 
                repaint();

                $("#botonerasEditar").show();
                //eventsEdit();
                crearEdtPlugin();
              return false;
});


function crearEdtPlugin(){


$("#inputAgregarHijo").click(function(){
                    console.log("agregando un hijo");
                    var title = $("#inputTitulo1").val();
                    var desc =  $("#inputDescripcion1").val();

                    var tiempo = $("#inputTiempo1").val();
                    
                    var mensaje = valida (title,  desc,  tiempo );
                    console.log ( "validador", mensaje );
                    if ( mensaje ){
                      console.log("Hijo validado");
                      agregaNodoEdt(title,desc,tiempo);
                      

                    }else{
                      //muestro mensaje
                      console.log("Muestro error");


                    }


});

 function agregaNodoEdt(title,desc,tiempo){

                    $("#errorMensaje").hide();
                    var id = $("#padreEdt").val();

                    var nid = id.split("-")[1];
                    var timeE = "#tiempo-"+nid;
                    console.log("tiempo padre: ", $(timeE).html );

                    console.log("el valor es> " + id);
                    if (id == ""){
                      //alert("Escoja un padre");
                      $("#errorMensaje").html( "<strong>Escoja un Padre si desea agregar un hijo!</strong> " );
                      $("#errorMensaje").show("slow");
                      return false;
                    }

                    idnodoCounter++;

                    var html = "";  
                    html +=  '<li id = "li-'+ idnodoCounter + '">'  +'<label id = "title-'+ idnodoCounter;
                    html +='" class = "inputEdtTitle" >'+ title;
                    html += '</label> ' + '<br>';
                    html += '<label class = "inputEdtDescripcion" id = "descripcion-'+ idnodoCounter ;
                    html += '">'+ desc + '</label>';
                    html += ' <br>'  + '<label class = "inputEdtDias" id = "tiempo-';
                    html += idnodoCounter + '">'+ tiempo + '</label> ';
                    html += '<ul id = "ul-' + idnodoCounter + '">' + '</ul>';
                    html += '</li>';

                    console.log(html);

                    
                    //$("li " +"#"+id).append(html);
                    //var lis = $("li");
                    var ida = '#ul-'+id.split('-')[1];
                    console.log('#ul-'+id.split('-')[1]);
                    $("#chart").html("");
                    console.log("ID: " + ida);
                    $(ida).append(html);
                    //eventsEdit();
                    //console.log(lis);
                    // 
                    repaint();
                    repaintEdit();
  }

repaintEdit();

function valida ( title, desc, time ){

      $("#inputValidacionError").hide("slow");
      console.log("items valida: ", title, desc, time);
      var flag = true;
      if ( title == "" ){
          console.log("title vacio");
          $("#inputValidacionError").html("Ingrese Titulo");
          $("#inputValidacionError").show("slow");
          flag = false;
      }
      if ( desc == "" ){
          console.log("desc vacio");
          $("#inputValidacionError").html("Ingrese descripcion");
          $("#inputValidacionError").show("slow");
          flag = false;
      }
      if ( time == "" ){
         console.log("time vacio");
         $("#inputValidacionError").html("Ingrese Tiempo en dias (numero)");
          $("#inputValidacionError").show("slow");
         flag = false;
      }else{
         if ( isNumber( time ) ){
            if ( time > 0 ) {
              console.log("numero valido ");
            }else{
              console.log("numero invalido");
              $("#inputValidacionError").html("NO, número negativo");
              $("#inputValidacionError").show("slow");
              flag = false;
            }
            
           // $("#inputValidacionError").html("Ingrese Titulo");
          //$("#inputValidacionError").show();
         }else{
            console.log("numero invalido");
            $("#inputValidacionError").html("Número Inválido");
            $("#inputValidacionError").show("slow");
            flag = false;
         }
      }
      return flag;
}

$("#inputEliminarHijo").click(function(){
                  console.log("eliminando hijo");
                   var id = $("#padreEdt").val();
                   console.log("el valor es> " + id);

                   
                    if (id == ""){
                      //alert("Escoja un padre");
                      $("#errorMensaje").html( "<strong>Escoja un Padre si desea eliminarlo </strong> " );
                      $("#errorMensaje").show("slow");
                      return false;
                    }

                    console.log($("#padreEdt").parent());
                    console.log("elim");
                    console.log(id);
                    var idsap = "#"+id;
                    console.log(idsap);
                    $(idsap).parent().remove();
                    repaint();
                    repaintEdit();
                  return false;
                });

$("#inputModificar").click(function(){
  
  var idmodificado = localStorage.getItem("idpadreModificando");
  console.log("Modificando " + idmodificado );

                    $("#errorMensaje").hide();
                    var id = $("#padreEdt").val();
                    console.log("el valor es> " + id);
                    if (id == ""){
                      //alert("Escoja un padre");
                      $("#errorMensaje").html( "<strong>Escoja un Padre si desea modificar un item!</strong> " );
                      $("#errorMensaje").show("slow");
                      return false;
                    }else {
                      var title = "#title-"+idmodificado;
                      var desc = "#descripcion-"+idmodificado;
                      var time = "#tiempo-"+idmodificado;
                      var mensaje = validaItems( $("#inputTitulo1").val() , $("#inputDescripcion1").val(), $("#inputTiempo1").val() );  
                      console.log ("modifica flag", mensaje );

                      if ( mensaje  == true )
                      {
                          $(title).html($("#inputTitulo1").val());
                          $(desc).html($("#inputDescripcion1").val());
                          $(time).html($("#inputTiempo1").val());

                      }

                     
                      //$(title).removeAttr("readonly");
                      //$(title).val($("#inputTitulo1").val());
                      console.log($(title));
                      //$("#title-1").val("holi");
                      //$("#title-1").trigger('changue');
                      //$(title).attr('readonly', true);
                      
                      //$("#title-1").val("holi");
                    }
  repaint();
  repaintEdit();
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function validaItems( title, desc, time ){
  $("#inputValidacionError").hide("slow");
  console.log("items valida: ", title, desc, time);
      var flag = true;
      if ( title == "" ){
          console.log("title vacio");
          $("#inputValidacionError").html("Ingrese Titulo");
          $("#inputValidacionError").show("slow");
          flag = false;
      }
      if ( desc == "" ){
          console.log("desc vacio");
          $("#inputValidacionError").html("Ingrese descripcion");
          $("#inputValidacionError").show("slow");
          flag = false;
      }
      if ( time == "" ){
         console.log("time vacio");
         $("#inputValidacionError").html("Ingrese Tiempo en dias (numero)");
          $("#inputValidacionError").show("slow");
         flag = false;
      }else{
         if ( isNumber( time ) ){
            if ( time > 0 ) {
              console.log("numero valido ");
            }else{
              console.log("numero invalido");
              $("#inputValidacionError").html("NO, número negativo");
              $("#inputValidacionError").show("slow");
              flag = false;
            }
            
           // $("#inputValidacionError").html("Ingrese Titulo");
          //$("#inputValidacionError").show();
         }else{
            console.log("numero invalido");
            $("#inputValidacionError").html("Número Inválido");
            $("#inputValidacionError").show("slow");
            flag = false;
         }
      }
      return flag;
}
 
 /*
{"idnodo":"1","title":"DP2","hijos":3,"dias":"10","descripcion":"El proyeto",
    "nodos":[
      {"idnodo":"2","title":"Analisis","hijos":0,"dias":"5","descripcion":"El analisis","nodos":[]},
      {"idnodo":"3","title":"Desarrollo","hijos":0,"dias":"2","descripcion":"El desarrollo","nodos":[]},
      {"idnodo":"4","title":"Transicion","hijos":0,"dias":"3","descripcion":"La transicion","nodos":[]}]}

      <li><label class="inputEdtTitle" id="title-1">Nombre Proyecto</label>
       <ul id="ul-1">
        <li id="li-2">
          <label id="title-2" class="inputEdtTitle">Nombre Proyecto 1</label> <br>
          <label class="inputEdtDescripcion" id="descripcion-2">asd</label> <br>
          <label class="inputEdtDias" id="tiempo-2">asd</label> 
              <ul id="ul-2"></ul>
        </li>
        <li id="li-3">
              <label id="title-3" class="inputEdtTitle">Nombre Proyecto 2</label> <br>
              <label class="inputEdtDescripcion" id="descripcion-3">asd</label> <br>
              <label class="inputEdtDias" id="tiempo-3">asd</label> 
                <ul id="ul-3"></ul>
        </li>
      </ul>
    </li> 
 */

 function agregarPadreJson( idproyecto, title, hijos, dias, descripcion, nodos ){
                var jsonCliente = {
                                  idproyecto : idproyecto,
                                  title : title,
                                  hijos: hijos,
                                  dias: dias,
                                  descripcion: descripcion,
                                  nodos : nodos
                                  };
                return jsonCliente;
            }

function agregarHijoJson( idnodo, title, descripcion, hijos, dias,  nodos ){

                  var jsonCliente = {
                                  idnodo : idnodo,
                                  title : title,
                                  hijos : hijos,
                                  dias: dias,
                                  descripcion: descripcion,
                                  nodos : nodos
                                  };
                return jsonCliente;
            }



$("#guardarCambios").click(function(){
    // $("#botonerasEditar").hide("slow");
     $("#botonerasEditarControl").hide("slow");
     $("#progressEdtGuardarEdt").show("slow");
     
     console.log("guardando EDT");
     var arbol = $("#org").html();
     console.log(arbol);
     var contador = 1;
     var idProyecto = localStorage.getItem("idProyecto");
     var title = "#title-"+contador;
     var desc = "#descripcion-"+contador;
     var tiem = "#tiempo-"+contador;
     var numHijos = $("#ul-1 > li").length;
     var idnodo = "";

     var hijos = [];
     var selector = "#ul-1 > li";
     var nodos = [];
     hijos = dameHijosEDT(selector, numHijos , nodos );
    var jsonResult = agregarPadreJson( idProyecto, $(title).html() , numHijos, "", "", hijos  );
     
     $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonResult),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/obtenerEdt",
                      success: function (data) {
                          console.log(data);
                          logChange("Se creó el EDT");
                          //alert("#Edt creada");
                          //$("#progressEdtGuardarEdt").hide("slow");
                          location.reload();
                          
                      }
        });
    
    //console.log(jsonResult);
});

  function dameHijosEDT( selector, numHijos , nodos ){
    //console.log('Numero de hijos:', numHijos)
    //var nodos = [];
    var hijos = $(selector);
    console.log( hijos[0] );
    //console.log( hijos[1] );
    var i = 0;
      for ( i = 0; i < numHijos; i++ ){
          
           var id = (hijos[i].id).split('-')[1];
           var title = $("#title-"+id).html();
           var desc = $("#descripcion-"+id).html();
           var tiem = $("#tiempo-"+id).html();
           var selec = "#ul-" + id  + " > li";
           var numHijitos = $(selec).length;
           var idnodo = "";
           var nds = [];
            

           if ( numHijitos == 0 ){
              console.log("Hijo : " + i,  hijos[i], "Num hijos: ",numHijitos, "Caso Directo" );
          
              //console.log( "Pusshin a : ", nodos );
              nodos.push( agregarHijoJson( idnodo, title, desc, numHijitos, tiem, nds ) );
           }else {
              //caso recursivo 
              console.log("Hijo : " + i,  hijos[i], "Num hijos: ",numHijitos, "Caso Recursivo" );
              //console.log("caso recursivo");
              //var n1 = [];
              //var nodot = [];
              nds = dameHijosEDT( selec, numHijitos , nds );
              nodos.push( agregarHijoJson( idnodo, title, desc, numHijitos, tiem, nds ) );
           }
           //console.log( numHijitos, title, desc, tiem );
      }

    return nodos;
  }

  
function repaintEdit(){

$(".inputEdtTitle").click(function(){
                       console.log("click ");
                       var id = ((this.id).split('-'))[1];
                       console.log(this);
                       
                       localStorage.setItem( "idpadreModificando", id );

                       $("#padreEdt").val( this.id );
                       //console.log($("#descripcion-"+id).val());
                       $("#padreEdt1").val($("#"+this.id).html());
                       $("#inputTitulo1").val($("#"+this.id).html());
                       //$("#inputDescripcion1").val($("#descripcion-"+id).val());
                       //$("#inputTiempo1").val($("#tiempo-"+id).val());

                       //console.log($("#tiempo-"+id).val())

                       //title, tiempo, descripcion
                       //$("#padreEdt").html(this.value);
                      return false;
                  });
}

}





/*

            function agregarPadreJson( idproyecto, title, hijos, dias, descripcion, nodos ){
                var jsonCliente = {
                                  idproyecto : idproyecto,
                                  title : title,
                                  hijos: hijos,
                                  dias: dias,
                                  descripcion: descripcion,
                                  nodos : nodos
                                  };
                return jasonCliente;
            }

            function agregarHijoJson( title, hijos, dias, , nodos ){

                  var jsonCliente = {
                                  title : title,
                                  hijos : hijos,
                                  dias: dias,
                                  descripcion: descripcion,
                                  nodos : nodos
                                  };
                return jsonCliente;
            }
*/





/*
function eventsEdit(){

                var abolEdt;

                var idnodoCounter = 1;

                function dameArbolEdtCF( counter ){
                  //padre
                  var title = '#title-' + counter;
                  var desc  = '#descripcion-' + counter;
                  var tiempo = '#tiempo-'+counter;
                  var ul = '#ul-'+counter;
                  console.log($(ul));

                  



                }

                $("#guardarCambios").click(function(){
                    console.log("guardar");
                    //var arbol = $("#org").html();
                    //console.log(arbol);
                    dameArbolEdtCF( 1 );
                    //agregarPadreJson( "1", $("#title-1"), )


                     
                    

                });

                $("#inputEliminarHijo").click(function(){
                  console.log("eliminando hijo");
                   var id = $("#padreEdt").val();
                   if (id == ""){
                      alert("Escoja un padre");
                      return false;
                    }
                    console.log($("#padreEdt").parent());
                    console.log("elim");
                    $("#chart").html("");
                    console.log(id);
                    var idsap = "#"+id;
                    console.log(idsap);
                    $(idsap).parent().parent().remove();
                    repaint();
                    repaintEdit();
                  return false;
                });


                $("#inputAgregarHijo").click(function(){
                    console.log("agregando un hijo");
                    var title = $("#inputTitulo1").val();
                    var desc =  $("#inputDescripcion1").val();
                    var tiempo = $("#inputTiempo1").val();
                    agregaNodoEdt(title,desc,tiempo);
                });

                 
                 $( "#chart" ).keypress(function( event ) {
                  if ( event.which == 97 ) {
                     event.preventDefault();
                  }
                    console.log("key A");
                    $( "#inputAgregarHijo" ).trigger( "click" );
                });
                  

                function agregaNodoEdt(title,desc,tiempo){
                    
                    var id = $("#padreEdt").val();

                    console.log("el valor es> " + id);
                    if (id == ""){
                      alert("Escoja un padre");
                      return false;
                    }

                    idnodoCounter++;
                    var html = "";  
                    html +=  '<li id = "li-'+ idnodoCounter + '">' + '<span class = "titleEDT">' +'<input id = "title-'+ idnodoCounter;
                    html +='" class = "inputEdtTitle" type = "text" readonly = readonly" value = "'+ title;
                    html += '"> ' + '</span> <br>' + '<span class = "descripcionEDT">';
                    html += '<input class = "inputEdtDescripcion" id = "descripcion-'+ idnodoCounter ;
                    html += '" type = "text" readonly = readonly" value = "'+ desc + '"> ';
                    html += '</span> <br>' + '<span class = "diasEDT">'  + '<input class = "inputEdtDias" id = "tiempo-';
                    html += idnodoCounter + '" type = "text" readonly = readonly" value = "'+ tiempo + '"> ';
                    html += '</span>';
                    html += '<ul id = "ul-' + idnodoCounter + '">' + '</ul>';
                    html += '</li>';

                    console.log(html);

                    
                    //$("li " +"#"+id).append(html);
                    //var lis = $("li");
                    var ida = '#ul-'+id.split('-')[1];
                    console.log('#ul-'+id.split('-')[1]);
                    $("#chart").html("");
                    console.log("ID: " + ida);
                    $(ida).append(html);
                    //eventsEdit();
                    //console.log(lis);
                    // 
                    repaint();
                    repaintEdit();
                }



                $("#guardarEDT").click(function(){
                    var edtData = $("#org");
                    console.log( edtData.html() );
                    return false;
                });

                $("#CancelarEDT").click(function(){
                    console.log("cancelar");
                    return false;
                });

                $("#AgregarNodo").click(function(){
                    console.log("agregar nodo");
                });


                $(".inputEdtTitle").click(function(){
                       console.log(this);
                       var id = ((this.id).split('-'))[1];
                       console.log(id);
                       $("#padreEdt").val(this.id);
                       //console.log($("#descripcion-"+id).val());
                       $("#inputTitulo").val(this.value);
                       $("#inputDescripcion").val($("#descripcion-"+id).val());
                       $("#inputTiempo").val($("#tiempo-"+id).val());

                       console.log($("#tiempo-"+id).val())

                       //title, tiempo, descripcion
                       //$("#padreEdt").html(this.value);
                      return false;
                  });

                  $(".inputEdtDescripcion").click(function(){

                    return false;
                  });

                  $(".inputEdtDias").click(function(){

                    return false;
                  })
                  

                  //BOTON EDITAR
                $("#inputAgregar").click(function(){
                  //BOTON EDITAR
                  //$(".inputEdtTitle").removeAttr("readonly");
                  //$('.inputEdtTitle').attr('readonly', true);

                    var id = $("#padreEdt").val();
                    console.log("el valor es> " + id);

                    if (id == ""){
                      alert("Escoja un padre");
                      return false;
                    }


                  var title = $("#inputTitulo").val();
                  var desc =  $("#inputDescripcion").val();
                  var tiempo = $("#inputTiempo").val();
                  
                  
                  $("#id").val(title);

                  var numid = id.split("-")[1];
                  var idtitle = "#title-" + numid;
                  $(".inputEdtTitle").removeAttr("readonly");
                  console.log(title);

                  $(idtitle).val(title);

                  console.log($("#descripcion-"+numid).val(desc));
                  $("#tiempo-"+numid).val(tiempo);
                  
                  //repaint();
                  return false;
                });

           }

*/
