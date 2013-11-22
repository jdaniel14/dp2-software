
/*
$(window).bind('beforeunload',function(){

     //save info somewhere
    
    return 'No ha guardado los cambios está seguro que quiere refrescar?';

});
*/

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
	var idproyecto = localStorage.getItem("idProyecto");
	var me = mostrarEDT( idproyecto );
	if ( me == "" ){

	}

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

                            }else{

                                pintarEDT( data );
                               $("#progressEdt").hide("slow");
                               $("#containerEdt").show("slow"); 
                               $("#controllerButton").show("slow");

                            }
                            
                      }
                  });
}


$("#CrearEDTCero").click(function(){
                console.log("EDT DESDE EL edtMostrar");
                $("#edtCrearLogError").hide("slow");
                var titleParent = "Nombre Proyecto";
                var html = pintarOneNodoEDT( titleParent, idnodoParam );
                $("#org").html( html );
                repaint();
              return false;
});


function pintarOneNodoEDT( title, id  ){
   console.log("Pintando AL PADRE  ");
       var html = "";  
                    //html += '<ul>';
                    /*
                      html += '<input class = "inputEdtTitle"  id = "title-' 
    html += idnodo
    html += '" type = "text" value = "'
    html += title
    html += '"> ';
                    */
          html +=  '<li>';
          html += '<span class = "titleEDT" id = "';
          html += 'title-'+ id + '" >';
          html += title;
          html += '</span>'
          html += '<ul>' + '</ul>';
          html += '</li>';
        return html;
}

function pintarEDT ( data ){
	console.log( "pintando data" );
	/* Datos Padre */
	var titleParent = data.title;
	var descripcionParent = data.descripcion;
	var diasParent = data.dias;
    /* Fin Padre */        

            var hijos = parseInt(data.hijos);
            var html = armaNodoEdt( titleParent, descripcionParent, diasParent, data.idnodo , 0)
            if ( hijos == 0 ){
              html += '</li>';
            }else{
               var hfinal = nodoRecursivo ( data.nodos , html);
            }
            html = hfinal;
            html += '</li>';
            //console.log(html);
            $("#org").html( html );
            console.log(html);
            repaint();
}

function nodoRecursivo( nodos , html ){
           var i = 0;
           
           html += '<ul>';
            for ( i = 0; i < nodos.length; i++ ){
                console.log(nodos[i].idnodo);
                if (localStorage.getItem("queueEstado") == "mostrando"){
                  //html +=  '<li>' + '<span class = "titleEDT">' +'<input id = "title-'+ nodos[i].idnodo +'" class = "inputEdtTitle" type = "text" value = "'+ nodos[i].title + '"> ' + '</span> <br>' + '<span class = "descripcionEDT">'  + '<input class = "inputEdtDescripcion" id = "descripcion-'+ nodos[i].idnodo + '" type = "text" value = "'+ nodos[i].descripcion + '"> ' + '</span> <br>' + '<span class = "diasEDT">'  + '<input class = "inputEdtDias" id = "tiempo-'+ nodos[i].idnodo + '" type = "text" value = "'+ nodos[i].dias + '"> ' + '</span>';
                  html += armaNodoHijo( nodos[i].idnodo, nodos[i].title , nodos[i].descripcion, nodos[i].dias );
                
                }else if (localStorage.getItem("queueEstado") == "editando"){
                  html += armaNodoHijo( nodos[i].idnodo, nodos[i].title , nodos[i].descripcion, nodos[i].dias );
                
                }
                var hijos = parseInt( nodos[i].hijos );
                if ( hijos > 0 ){
                  var sape = nodoRecursivo( nodos[i].nodos, html );
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
	
	html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
	html += '<span class = "titleEDT" id = "';
	html += 'title-'+ id + '" >';
	html += title;
	html += '</span> <br>' + '<span class = "descripcionEDT">';
	html += descripcion + '</span> <br>' + '<span class = "diasEDT">';
	html += dias + '</span>';
	

	return html;
}

function armaNodoEdt ( title, descripcion, hijos , idnodo, flag ){
  var html = '<li>'

	  html += '<input class = "inputEdtTitle"  id = "title-' 
	  html += idnodo
	  html += '" type = "text" value = "'
	  html += title
	  html += '"> ';

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


  function dameHijosEDT( selector, numHijos , nodos ){
    
    var hijos = $(selector);
    console.log( hijos[0] );
    var i = 0;

   $(selector).each(function (i) {
        //console.log($(this)); 
        var title = $(this).find('.titleEDT').html();
        var desc = $(this).find('.descripcionEDT').html();
        var time = $(this).find('.diasEDT').html();
        console.log(title, desc, time);
        var arrayLI = [];
        //console.log($(this))
        console.log("idactual", $(this).id);
        var selec = $(this).find("ul:first >li").get();

        var numHijitos = $(this).find("ul:first > li").length;
        var idnodo = "";
        var nds = [];
        if ( numHijitos == 0 ){
        	  console.log("hijo agregado caso directo");
              nodos.push( agregarHijoJson( idnodo, title, desc, numHijitos, time, nds ) );
           }else{
           	//caso recursivo
           	nds = dameHijosEDT( selec, numHijitos , nds );
            nodos.push( agregarHijoJson( idnodo, title, desc, numHijitos, time, nds ) );
           }
    });
    return nodos;
  }



	$("#guardarCambios").click(function(){
     // $("#botonerasEditar").hide("slow");
     //$("#botonerasEditarControl").hide("slow");
     //$("#progressEdtGuardarEdt").show("slow");
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
     //console.log(inp);
     //return 0;
     var titleparent = inp.innerHTML;
     //console.log(titleparent);
     /* Fin datos de padre */
     //return 0;
      var numHijos = $("#org ul:first > li").length;
      var idnodo = "";
      var hijos = [];
      var selector = "#org ul:first > li";
      var nodos = [];
      hijos = dameHijosEDT(selector, numHijos , nodos );
      var jsonResult = agregarPadreJson( idproyecto, titleparent , numHijos, "", "", hijos  );
      console.log( jsonResult );
      
      $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonResult),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/AL_recontruirEdt",
                      success: function (data) {
                          console.log(data);
                          $("#guardarEDTLoading").hide("slow");
                          location.reload();

                      },
                      failure: function ( data ){
                          console.log("failure");
                      }
        });
	  
/*

     console.log("guardando EDT");
     var arbol = $("#org").html();
     //console.log(arbol);
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
     console.log( jsonResult );
     */
     /*
     $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonResult),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/AL_recontruirEdt",
                      success: function (data) {
                          console.log(data);
                          location.reload();
                      }
        });
	*/
    
    //console.log(jsonResult);
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
  	$(idt).parent().remove();
    repaint();
    $("#cont_caja_flotante").hide("slow");
  })

}

$("#imgAgregar").click(function(){
		var ident = parseInt(localStorage.getItem("idcontador"));
		ident++;
		localStorage.setItem("idcontador", ident);

  		var id = localStorage.getItem("idnodoActualClick");
  		      	
  		//var idfinal = id + ' ul';
  		//console.log(idfinal, agregarNodoHijoDefault( ident ));
      	//$("#title-83").parent().find("ul");
      	$(id).parent().find("ul:first").append(agregarNodoHijoDefault( ident ));
        repaint();
        $("#caja_flotante").hide("slow");
  });

  $("#imgEliminar").click(function(){
  	console.log("eliminar");
  	var idt = localStorage.getItem("idnodoActualClick");
  	$(idt).parent().remove();
    repaint();
    $("#caja_flotante").hide("slow");
  })


function agregarNodoHijoDefault( id ){
       var title = "default";
       var desc = "default";
       var tiempo = 0;
       var html = "";  
                    //html += '<ul>';
          html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
					html += '<span class = "titleEDT" id = "';
					html += 'title-'+ id + '" >';
          html += title;

					html += '</span> <br>' + '<span class = "descripcionEDT" id = "';
          html += 'descripcion-'+ id + '" >';
					html += desc + '</span> <br>' + '<span class = "diasEDT" id = "';
          html += 'dias-'+ id + '" >';
					html += tiempo + '</span>';
          html += '<ul>' + '</ul>';
          html += '</li>';
          //html += '</ul>';
      return html;
  }




$("#editarEdtNew").click(function(){
	console.log("a");
	//$(".titleEDT").mask();
	//$(".descripcionEDT").mask();
});




     $('span').live('dblclick', function () {
         $("#caja_flotante").hide();
          var id = $(this).attr("id");
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
          $(this).parent().append($('<span />').html($(this).val()));
          var sape = localStorage.getItem("modificandoNodoActual");
          $(sape).html($(this).val());
          $(this).remove();
          console.log("blur");
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

