
/*
$(window).bind('beforeunload',function(){

     //save info somewhere
    
    return 'No ha guardado los cambios está seguro que quiere refrescar?';

});
*/

if ( localStorage.getItem("seguridadEDT") == "#fgh2" ){
    //redirect
    window.location.href = 'index.html';
    alert("Advertencia: uso no autorizado, no lo vuelva hacer. Gracias");
}
var np = localStorage.getItem("nombreProyectoEDT");
var arrNombres = [];
var autoGenerados = [];
var errorSuma = false;

$("#edtTitleWeb").append(" " + np);

function Nodo ( dias, padre, actual, valoranterior) {
   this.dias = dias;
   this.valoranterior = valoranterior;
   this.padre = padre;
   this.actual = actual;
}

var edtValidator = [];

localStorage.setItem("cambios", false);

$(window).bind('beforeunload',function(){

     //save info somewhere
    cambios = localStorage.getItem("cambios" );
    if ( cambios == "true" )
    return 'No ha guardado los cambios está seguro que quiere refrescar?';
    else return;
});


var idnodoParam = 10000;
localStorage.setItem("idcontador", idnodoParam);

/* Repaint Chart */
  function repaint(){
  				console.log("re-pintando");
  				$("#chart").html("");
                $("#org").jOrgChart({
                    chartElement : '#chart',
                    dragAndDrop  : true
                });
                $("#containerEdt").show();
                repaintUtils();
        }
/* Fin Repaint */



//cuando la web esté cargada
jQuery(document).ready(function() {
	console.log("Script EDT mostrar loaded");
	//configuraciones generales
	
	

  if ( localStorage.getItem("edtedesdecero") == "1" ){
   console.log("desdecero");
   $("#CrearEDTCero").hide();
   $("#CrearEDTCero").trigger("click");
   
  }else{
    var idproyecto = localStorage.getItem("idProyecto");
    var me = mostrarEDT( idproyecto );
  }

  $("#regresarEDT").click(function(){
    window.location.href = 'index.html';
  });

  $("#ocultarGlosario").click(function(){
    $(".glosarioEDT").hide("slow");
    $("#mostrarGlosario").show();
  })

  $("#mostrarGlosario").click(function(){
      $(".glosarioEDT").show("slow");
      $("#mostrarGlosario").hide();
  });
});





/* Mostrar EDT plugin Algoritm */

function mostrarEDT( idproyecto ){
	var mensaje = "";
	var jsonCliente = {
                  	idproyecto : idproyecto
                  };
    ajaxMostrar( jsonCliente );              
	return mensaje;
}

function ajaxMostrar ( jsonCliente ){
	 //console.log( jsonCliente );
	 $("#progressEdt").show("slow");
	 $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/traerEdt",
                      success: function (data) {
                      		console.log( data );
                           if ( !data.idnodo ){
                              $("#progressEdt").hide("slow");
                              $("#edtCrearLogError").show("slow");
                              $("#CrearEDTCero").show("slow");
                              //pintarOneNodoEDT( idnodoParam );
                              //$("#guardarCambios").show();
                              //console.log("sape");
                              //window.location.href = 'edt.html';

                            }else{

                                pintarEDT( data );
                               $("#progressEdt").hide("slow");
                               $("#containerEdt").show("slow"); 
                               $("#controllerButton").show("slow");
                               $("#guardarCambios").show();

                            }
                            
                      }
                  });
}


$("#CrearEDTCero").click(function(){
                console.log("EDT DESDE EL edtMostrar");
                $("#guardarCambios").show("slow");
                $("#edtCrearLogError").hide("slow");
                var titleParent = np;
                var html = pintarOneNodoEDT( titleParent, idnodoParam , 0, 0);
                $("#org").html( html );
                repaint();
              return false;
});


function pintarOneNodoEDT( title, id, dias  ){
   console.log("Pintando AL PADRE  ", title, id);
       var html = "";  
                    //html += '<ul>';
                    /*
                      html += '<input class = "inputEdtTitle"  id = "title-' 
    html += idnodo
    html += '" type = "text" value = "'
    html += title
    html += '"> ';
                    */
          var idfin = '#titlePadre-' + id;
          html +=  '<li>';
          html += '<span class = "titleEDT" id = "';
          html += 'titlePadre-'+ id + '" >';
          html += title;
          html += '</span><br/>';
          
          html +='<span class = "diasEDT" id = "';
          html += 'dias-'+ id + '" >';
          html += dias + '</span>';

          html += '<ul>' + '</ul>';
          html += '</li>';
          console.log(html);
          
          var n = new Nodo(dias, id, id, dias);

          edtValidator.push( n );
          
          arrNombres.push(title);
        return html;
}

function pintarEDT ( data ){
	console.log( "pintando data" );
	/* Datos Padre */
	var titleParent = data.title;
	var descripcionParent = data.descripcion;
	var diasParent = data.dias;
    /* Fin Padre */        
  arrNombres.push(titleParent);
            var hijos = parseInt(data.hijos);
            var html = armaNodoEdt( titleParent, descripcionParent, diasParent, data.idnodo , 0);
            console.log("armaNodoEdt", html);
            if ( hijos == 0 ){
              html += '</li>';
            }else{
               var hfinal = nodoRecursivo (titleParent, data.nodos , html);
            }
            html = hfinal;
            html += '</li>';
            //console.log(html);
            $("#org").html( html );
            //console.log(html);
            repaint();
}

function nodoRecursivo( padre, nodos , html ){
           var i = 0;
           
           html += '<ul>';
            for ( i = 0; i < nodos.length; i++ ){
                console.log(nodos[i].idnodo);
                if (localStorage.getItem("queueEstado") == "mostrando"){
                  //html +=  '<li>' + '<span class = "titleEDT">' +'<input id = "title-'+ nodos[i].idnodo +'" class = "inputEdtTitle" type = "text" value = "'+ nodos[i].title + '"> ' + '</span> <br>' + '<span class = "descripcionEDT">'  + '<input class = "inputEdtDescripcion" id = "descripcion-'+ nodos[i].idnodo + '" type = "text" value = "'+ nodos[i].descripcion + '"> ' + '</span> <br>' + '<span class = "diasEDT">'  + '<input class = "inputEdtDias" id = "tiempo-'+ nodos[i].idnodo + '" type = "text" value = "'+ nodos[i].dias + '"> ' + '</span>';
                  
                  if ( nodos[i].descripcion == "Autogenerado" ) autoGenerados.push(padre);
                  html += armaNodoHijo( nodos[i].idnodo, nodos[i].title , nodos[i].descripcion, nodos[i].dias );
                
                }else if (localStorage.getItem("queueEstado") == "editando"){
                  html += armaNodoHijo( nodos[i].idnodo, nodos[i].title , nodos[i].descripcion, nodos[i].dias );
                
                }
                var hijos = parseInt( nodos[i].hijos );
                if ( hijos > 0 ){
                  var sape = nodoRecursivo(nodos[i].title, nodos[i].nodos, html );
                  html = sape;
                  html += '</li>';
                }else{
                  html += '<ul></ul></li>';
                }
            }
             html += '</ul>';
             return html;
        }

function armaNodoHijo ( id, title, descripcion, dias ){
	var html = "";
	/*
	html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
	html += '<span class = "titleEDT">' +'<input id = "title-'+ id +'" class = "inputEdtTitle" type = "text"  value = "';
	html += title + '"> ';
	html += '</span> <br>' + '<span class = "descripcionEDT">'  + '<input class = "inputEdtDescripcion" id = "descripcion-'+ id;
	html += '" type = "text"  value = "'+ descripcion + '"> ' + '</span> <br>' + '<span class = "diasEDT">'  + '<input class = "inputEdtDias" id = "tiempo-';
	html += id + '" type = "text" value = "'
	html += dias + '"> ' + '</span>';
	*/
  /*
	
	html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
	html += '<span class = "titleEDT" id = "';
	html += 'title-'+ id + '" >';
	html += title;
	html += '</span> <br>' + '<span class = "descripcionEDT">';
	html += descripcion + '</span> <br>' + '<span class = "diasEDT">';
	html += dias + '</span>';
*/
   var html = "";  
                    //html += '<ul>';
          html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
          html += '<span class = "titleEDT" id = "';
          html += 'title-'+ id + '" >';
          html += title;

          html += '</span> <br>' + '<span class = "descripcionEDT" id = "';
          html += 'descripcion-'+ id + '" >';
          html += descripcion + '</span> <br>' + '<span class = "diasEDT" id = "';
          html += 'dias-'+ id + '" >';
          html += dias + '</span>';
          arrNombres.push(title);
	return html;
}

function armaNodoEdt ( title, descripcion, dias , idnodo, flag ){
  var html = '<li>'

/*
	  html += '<input class = "inputEdtTitle"  id = "title-' 
	  html += idnodo
	  html += '" type = "text" value = "'
	  html += title
	  html += '"> ';

    */

     //html +=  '<li>';
          html += '<span class = "titleEDT" id = "';
          html += 'titlePadre-'+ idnodo + '" >';
          html += title;
          html += '</span><br/>';
          html +='<span class = "diasEDT" id = "';
          html += 'dias-'+ idnodo + '" >';
          html += dias + '</span>';
          console.log("armaNodoEdt", html);

	return html;          
}

/* Fin Mostrar EDT plugin Algoritm */

function editable ( ){
	 var input = $('<input />');
                    input.width("100%"); 
                    input.height("100%"); 
                    input.attr('autocomplete','off');
                    $(this).append(input);
                    return(input);
}

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


  function dameHijosEDT( diasp, title, selector, numHijos , nodos){
    
    var hijos = $(selector);
    console.log( hijos[0] );
    var i = 0;
    diasp = parseInt(diasp);

   $(selector).each(function (i) {
        //console.log($(this)); 
        var title = $(this).find('.titleEDT').html();
        var desc = $(this).find('.descripcionEDT').html();
        var time = $(this).find('.diasEDT').html();
        diasp -= parseInt(time);
        //console.log("diasp:",diasp)
        //console.log(title, desc, time);
        var arrayLI = [];
        //console.log($(this))
        //console.log("idactual", $(this).id);
        var selec = $(this).find("ul:first >li").get();

        var numHijitos = $(this).find("ul:first > li").length;
        var idnodo = "";
        var nds = [];
        if ( numHijitos == 0 ){
        	    //console.log("hijo agregado caso directo");
              nodos.push( agregarHijoJson( idnodo, title, desc, numHijitos, time, nds ) );
           }else{
           	//caso recursivo
           	nds = dameHijosEDT( time, title, selec, numHijitos , nds );
            nodos.push( agregarHijoJson( idnodo, title, desc, numHijitos, time, nds ) );
           }
    });
     if ( diasp != 0 ){
        //suma bien
        console.log("error de suma", diasp, title);
        if ( diasp > 0 ){
            //excedente
            var msg = "Error en la suma del padre: " + title + " hay un faltante de: " + diasp;
            errorSuma = true;
            showMessage1(msg);
        }else if ( diasp < 0 ){
            var msg = "Error en la suma del padre: " + title + " hay un exceso de: " + diasp;
            errorSuma = true;
            showMessage1(msg);
        }
     }
    return nodos;
  }

	$("#guardarCambios").click(function(){
     // $("#botonerasEditar").hide("slow");
     //$("#botonerasEditarControl").hide("slow");
     //$("#progressEdtGuardarEdt").show("slow");
     cambios = localStorage.getItem("cambios");
     $(".consoleLog").html("");

     if ( cambios == "true" ){
      $("#guardarCambios").hide();
     $("#guardarEDTLoading").show("slow");

     console.log("guardando Cambios");
     var arbol = $("#org").html();
     console.log(arbol);
     var idproyecto = localStorage.getItem("idProyecto");

     /*
    Datos Padre
     */
     var inp = $("#org li span")[0];
     var diasp = $("#org li span")[1];
     //console.log(inp);
     //return 0;
     var titleparent = inp.innerHTML;
     var diasparent = diasp.innerHTML;
     //console.log(titleparent);
     /* Fin datos de padre */
     //return 0;
      var numHijos = $("#org ul:first > li").length;
      var idnodo = "";
      var hijos = [];
      var selector = "#org ul:first > li";
      var nodos = [];
      errorSuma = false;
      hijos = dameHijosEDT(diasparent, titleparent, selector, numHijos , nodos);
      var jsonResult = agregarPadreJson( idproyecto, titleparent , numHijos, diasparent, "", hijos  );
      //console.log( jsonResult );
     
      //console.log("HijosPadre",diasparent );
      
      //console.log("error", error);
      if ( errorSuma == true ){
        $("#guardarCambios").show();
        $("#guardarEDTLoading").hide("slow");
      }else if ( errorSuma == false) {
          console.log("listo para guardar sin problemas :p");
        $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonResult),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/AL_recontruirEdt",
                      success: function (data) {
                          console.log(data);
                          $("#guardarEDTLoading").hide("slow");
                          localStorage.setItem("cambios", false);
                          //location.reload();
                          window.location.href = 'index.html';

                      },
                      failure: function ( data ){
                          console.log("failure");
                      }
        });
      }
     }else{
        console.log("no se guarda pq no hubo cambios");
        window.location.href = 'index.html';
     }
    
	 
	});


//static
function agregaNodo( id, title, descripcion, dias ){
	var html = "";
	html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
	html += '<span class = "titleEDT" id = "';
	html += 'title-'+ id + '" >';
	html += title;
	html += '</span> <br>' + '<span class = "descripcionEDT">';
	html += descripcion + '</span> <br>' + '<span class = "diasEDT">';
	html += dias + '</span>';
}

function showMessage( msg ){
  //alert(msg);
   var html =    '<div class="alert alert-danger alert-dismissable">';
          html += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
          html += '<strong>Advertencia!&nbsp;</strong>';
          html += msg;
          html += '</div>';
          $(".consoleLog").html(html);
          $(".consoleLog").fadeIn(5000);
          $(".consoleLog").fadeOut(5000);
}

function showMessage1( msg ){
  //alert(msg);
  //$(".consoleLog").html("");
          
   var html =    '<div class="alert alert-danger alert-dismissable">';
          html += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
          html += '<strong>Advertencia!&nbsp;</strong>';
          html += msg;
          html += '</div>';
          $(".consoleLog").append(html);
          $(".consoleLog").fadeIn(5000);
          //$(".consoleLog").fadeOut(5000);
}

function funcionesCajaFlotante(){

  $("#imgAgregar1").click(function(){
  		var title = "default";
  		var descripcion = "default";
  		var dias = 0;
  		agregaNodo( title, descripcion, dias );
  		repaint();
      $("#cont_caja_flotante").hide("slow");
  });

  $("#imgEliminar1").click(function(){
  	console.log("eliminar");
  	var idt = localStorage.getItem("idnodoActualClick");
    var  idtsplit = idt.split("-")[0];

    if ( idtsplit == "#titlePadre"){
      console.log("quieres eliminar al padre? bitch please");
      showMessage( " No puedes eliminar el paquete principal ");
      return;
    }else{
      $(idt).parent().remove();
      repaint();
      $("#cont_caja_flotante").hide("slow");
    }
  	
  })

}



$("#imgAgregar").click(function(){
    localStorage.setItem("cambios", true);
		var ident = parseInt(localStorage.getItem("idcontador"));
		ident++;
		localStorage.setItem("idcontador", ident);

  		var id = localStorage.getItem("idnodoActualClick");
  		var idp = id.split("-")[1];     	
  		//var idfinal = id + ' ul';
  		//console.log(idfinal, agregarNodoHijoDefault( ident ));
      	//$("#title-83").parent().find("ul");
      	$(id).parent().find("ul:first").append(agregarNodoHijoDefault( idp, ident ));
        repaint();
        $("#caja_flotante").hide("slow");
  });

  $("#imgEliminar").click(function(){
    localStorage.setItem("cambios", true);
  	console.log("eliminar");
  	var idt = localStorage.getItem("idnodoActualClick");
    var  idtsplit = idt.split("-")[0];

    if ( idtsplit == "#titlePadre"){
      console.log("quieres eliminar al padre? bitch please");
      showMessage( " No puedes eliminar el paquete principal ");
      return;
    }else{
     $(idt).parent().remove();
      repaint();
     $("#caja_flotante").hide("slow");
    }


  })


function agregarNodoHijoDefault( padre, id ){
       var title = "default";
       var desc = "default";
       var tiempo = 0;
       var html = "";  
                    //html += '<ul>';
          var titlefin = title +  ( parseInt(localStorage.getItem("idcontador")) - idnodoParam );
          html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
					html += '<span class = "titleEDT" id = "';
					html += 'title-'+ id + '" >';
          html +=  titlefin;

					html += '</span> <br>' + '<span class = "descripcionEDT" id = "';
          html += 'descripcion-'+ id + '" >';
					html += desc + '</span> <br>' + '<span class = "diasEDT" id = "';
          html += 'dias-'+ id + '" >';
					html += tiempo + '</span>';
          html += '<ul>' + '</ul>';
          html += '</li>';
          //html += '</ul>';
          var idfin = '#title-'+id;
          arrNombres.push(titlefin);
          edtValidator.push(new Nodo( 0, padre,  id, 0));
      return html;
  }




$("#editarEdtNew").click(function(){
	console.log("a");
	//$(".titleEDT").mask();
	//$(".descripcionEDT").mask();
});


  function validaNombre( nombre ){
    for ( i = 0; i < arrNombres.length; i++ ){
        if ( arrNombres[i] == nombre ){
          return false;
        }
    }
    return true;
  }


  function actualizaNodosSuma(hijo, padre, dias, valant ){
      hijo = parseInt( hijo );
      padre = parseInt( padre );
      dias = parseInt( dias );
      valant = parseInt( valant );
      console.log( hijo , padre , dias ,valant);
      var i = 0;
      var flag = 1;
      nuevoPadre = padre;
      while ( flag != 0){
        flag = 0;
        for ( i = 0; i < edtValidator.length ; i++ ){
           if ( edtValidator[i].actual == nuevoPadre ){
                //si es el padre, entonces resto y sumo
                edtValidator[i].dias = parseInt(edtValidator[i].dias) -  valant + dias;
                nuevoPadre = parseInt(edtValidator[i].padre);
                console.log("nuevoPadre",nuevoPadre);
                flag = 1;
                if (  edtValidator[i].actual ==  edtValidator[i].padre ){
                  //es el padre
                  flag = 0;
                }
                var idd = "#dias-"+nuevoPadre;
                console.log(idd);
                $(idd).html(edtValidator[i].dias);
           }
        }
      }
      
      //$(sape).html();
    repaint();
  }

  function modificarNodo( nodoactual, value ){
    console.log( nodoactual, value );
    var padre = 0
    var valant = 0
      var i = 0;
      for ( i = 0; i < edtValidator.length; i++ ){
        if ( edtValidator[i].actual == nodoactual ){
              padre = edtValidator[i].padre;
              edtValidator[i].valoranterior = edtValidator[i].dias;
              edtValidator[i].dias = value;
              valant = edtValidator[i].valoranterior;
              break;
        }
      }
      //una vez hecho esto, se verifica la suma del padre -> padre -> padre....oh my
      actualizaNodosSuma( nodoactual, padre , value, valant);
  }

  function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

     $('span').live('dblclick', function () {
         $("#caja_flotante").hide();
          console.log($(this).html());
          localStorage.setItem("nombreActualEDT", $(this).html());
          var id = $(this).attr("id");
          var tipospan = id.split("-")[0];
          localStorage.setItem("tipospan", tipospan);
          console.log(id);
          var input = $('<input />', {'type': 'text', 'id': 'idinput', 'value': $(this).html()});
          $(this).parent().append(input);
          $(this).remove();
          input.focus(); 

          var fin = "#"+id;
          localStorage.setItem("modificandoNodoActual", fin);
      });
    

      $('input').live('blur', function () {
          //$("#caja_flotante").hide("slow")
          flagnum = 0;
          var inputValidar = $(this).val();
          if ( localStorage.getItem("tipospan") == "dias" ){
            console.log("numero");
            if ( isNumber( parseInt(inputValidar) ) ){
              if ( parseInt(inputValidar) >= 0 ) {
                  flagnum = 1;
                  console.log("modificando nodo");
                  //modificarNodo( localStorage.getItem("modificandoNodoActual").split("-")[1], inputValidar );
              }else{
                //alert("Ingrese un numero");
                showMessage("Ingrese un número válido >= 0");
                repaint()
                return;
              }
            }
            else{
                showMessage("Ingrese un número válido >= 0");
                repaint()
                return;
            }
          }

          if ( localStorage.getItem("tipospan") == "title" ){
              console.log("cosas para dias");
              var flag = validaNombre( inputValidar );
                if ( flag ){
                    $(this).parent().append($('<span />').html($(this).val()));
                    var sape = localStorage.getItem("modificandoNodoActual");
                    $(sape).html($(this).val());
                    $(this).remove();
                    localStorage.setItem("cambios", true);
                    arrNombres.push($(this).val());
                    console.log("blur");
                    repaint();
                }else{
                  //nombreActualEDT
                  //alert ("nombre repetido");
                  showMessage("El nombre que ingresó está repetido");
                  //$(this).parent().append($('<span />').html($(this).val()));
                  //var sape = localStorage.getItem("modificandoNodoActual");
                  //$(sape).html(localStorage.getItem("modificandoNodoActual"));
                  //$(this).remove();
                  repaint();
                }
                return;
          }
            //other whise
                    $(this).parent().append($('<span />').html($(this).val()));
                    var sape = localStorage.getItem("modificandoNodoActual");
                    $(sape).html($(this).val());
                    $(this).remove();
                    localStorage.setItem("cambios", true);
                    repaint();
  
      });


/*
$(".titleEDT").hover( function(){
      console.log("click title normal");
      var idnodo = '#' + $(this).attr('id');
      localStorage.setItem("idnodoActualClick", idnodo);
      var p = $(idnodo);
      var offset = $( this ).offset();
      var position = p.position();
      var cntWidth = $(this).css("height").split("p")[0];
      var topfin = offset.top;
      var leftfin = offset.top + parseInt(cntWidth)*3;
      $( "#caja_flotante" ).offset({ top: leftfin, left: offset.left });
      $("#caja_flotante").show("slow");
      $("#controlesSpan").html($(this).val());
      var id = $(this).attr('id').split("-")[1];
      localStorage.setItem("idmodificadoCurrent", id);
      //funcionesCajaFlotante();

  });

*/

function repaintUtils () {
	console.log("repintando eventos");


	$(".titleEDT").hover( function(){
      console.log("click title repaint");
      var idnodo = '#' + $(this).attr('id');
      localStorage.setItem("idnodoActualClick", idnodo);
      var p = $(idnodo);
      var offset = $( this ).offset();
      var position = p.position();
      var cntWidth = $(this).css("height").split("p")[0];
      var topfin = offset.top + 30;
      var leftfin = offset.top + parseInt(cntWidth)*4;
      $( "#caja_flotante" ).offset({ top: leftfin, left: offset.left });
      $("#caja_flotante").show("slow");
      $("#controlesSpan").html($(this).val());
      var id = $(this).attr('id').split("-")[1];
      localStorage.setItem("idmodificadoCurrent", id);
      //funcionesCajaFlotante();

	});


	// $('.titleEDT')
}

