 localStorage.setItem("queueEstado", "mostrando");
 autoGenerados = [];
 jQuery(document).ready(function() {

        //localStorage.removeItem("mostrarEdt");
        Object.size = function(obj) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key)) size++;
          }
          return size;
      };



        function showMessage( msg ){

          alert ( msg );

        }

        function repaint(){
          $("#chart").html("");
                $("#org").jOrgChart({
                    chartElement : '#chart',
                    dragAndDrop  : true
                });
        }

      
        /*
          2do sprint
          review 1er sprint
          funcionality validation required
          nonintegrated
          collapse fk.
        */



          $("#CrearEDTCero").click(function(){
            
            window.location.href = 'edt.html';
          });


        /* FIN CREAR EDT */

        function edtAlgorithm( data ){
            var titleParent = data.title;
            var hijos = parseInt(data.hijos);
            var html = '<li>' +'<input class = "inputEdtTitle"  id = "title-' + data.idnodo+ '" type = "text" value = "'+ titleParent + '"> ';
            if ( hijos == 0 ){
              //entonces no tiene hijos 
              html += '</li>';
            }else{
               //html += '<ul>';
               console.log('nodo R');
               var hfinal = nodoRecursivo ( titleParent, data.nodos , html);
               //html += '</ul>';
            }
            html = hfinal;
            html += '</li>';
            $("#org").html( hfinal );
            //console.log( hfinal );
            repaint();
        }


        function nodoRecursivo( padre, nodos , html ){
           var i = 0;
           //console.log( html );
           //console.log("tam nodos: " + nodos.length );
           //
           html += '<ul>';
            for ( i = 0; i < nodos.length; i++ ){
               //por cada hijo
                console.log(nodos[i].idnodo);
                if (localStorage.getItem("queueEstado") == "mostrando"){
                  if ( nodos[i].descripcion == "Autogenerado" ) autoGenerados.push(padre);
                  html +=  '<li>' + '<span class = "titleEDT">' +'<input id = "title-'+ nodos[i].idnodo +'" class = "inputEdtTitle" type = "text" value = "'+ nodos[i].title + '"> ' + '</span> <br>' + '<span class = "descripcionEDT">'  + '<input class = "inputEdtDescripcion" id = "descripcion-'+ nodos[i].idnodo + '" type = "text" value = "'+ nodos[i].descripcion + '"> ' + '</span> <br>' + '<span class = "diasEDT">'  + '<input class = "inputEdtDias" id = "tiempo-'+ nodos[i].idnodo + '" type = "text" value = "'+ nodos[i].dias + '"> ' + '</span>';
                
                }else if (localStorage.getItem("queueEstado") == "editando"){
                  html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>' + '<span class = "titleEDT">' +'<input id = "title-'+ nodos[i].idnodo +'" class = "inputEdtTitle" type = "text"  value = "'+ nodos[i].title + '"> ' + '</span> <br>' + '<span class = "descripcionEDT">'  + '<input class = "inputEdtDescripcion" id = "descripcion-'+ nodos[i].idnodo + '" type = "text"  value = "'+ nodos[i].descripcion + '"> ' + '</span> <br>' + '<span class = "diasEDT">'  + '<input class = "inputEdtDias" id = "tiempo-'+ nodos[i].idnodo + '" type = "text" value = "'+ nodos[i].dias + '"> ' + '</span>';
                
                }

                var hijos = parseInt( nodos[i].hijos );
                if ( hijos > 0 ){
                  //console.log("recursivo caso");
                  //console.log("html antes: ", html);
                  var sape = nodoRecursivo( nodos[i].title,nodos[i].nodos, html );
                  html = sape;
                  html += '</li>';
                  //console.log("html despues: ", sape );
                }else{
                  html += '</li>';
                }
            }
             html += '</ul>';
             //console.log( html );
             return html;
        }


        function recursivoNodes( nodos, html, flag ){
            var i = 0;
            console.log(nodos);
            console.log("tam nodos: " + nodos.length + ' it: ' + flag );
            
            html += '<ul>';
            for ( i = 0; i < nodos.length; i++ ){
                html +=  '<li>' + nodos[i].title + ' ' + nodos[i].descripcion + '</li>'

                var hijos = parseInt( nodos[i].hijos );
                if ( hijos == 0 ){
                    console.log("directo");
                    //html += '</ul>';
                }else{
                   console.log("recursivo");
                   recursivoNodes( nodos[i].nodos, html, i );
                }
            
            }
            html += '</ul>';
            //console.log(html);
            return html;
        }

        function armarEdt( data , flag ){
          if ( flag == 0 ){
      
            var titleParent = data.title;
            var hijos = parseInt(data.hijos);
            var html = '<li>' + titleParent;
            if ( hijos == 0 ){
              //entonces no tiene hijos 
              html += '</li>';
            }
             console.log( data.nodos );
             //var arrNodo = new Array();
             //arrNodo = data.nodos;

             html += recursivoNodes( data.nodos , "", 0); 
          }
            $("#org").html(html);
            console.log(html);
            repaint();
        }



        function recursivoNodes1( nodos, html, flag ){
            var i = 0;
           
            for ( i = 0; i < nodos.length; i++ ){
                html += '<input type = "text" id = "data-0" value = "'+ nodos[i].title + '">';
                var hijos = parseInt( nodos[i].hijos );
                if ( hijos == 0 ){
                    console.log("directo");
                    //html += '</ul>';
                }else{
                   console.log("recursivo");
                   recursivoNodes( nodos[i].nodos, html, i );
                }
            
            }
            return html;
        }


        function nodoRecursivo1( nodos , html ){
          //EDITAR
           var i = 0;
            for ( i = 0; i < nodos.length; i++ ){
               //por cada hijo
                var hijos = parseInt( nodos[i].hijos );
                if ( hijos == 0 ){
                    console.log('hijos ' + nodos[i].title);
                    html += 'Hijo: <input type = "text" id = "data-0" value = "'+ nodos[i].title + '">';
                
                }

                if ( hijos > 0 ){
                  html += 'Padre: <input type = "text" id = "data-0" value = "'+ nodos[i].title + '">';
                
                  //console.log("recursivo caso");
                  //console.log("html antes: ", html);
                  var sape = nodoRecursivo1( nodos[i].nodos, html);
                  html = sape;
                  //console.log("html despues: ", sape );
                }else{
                 }
            }
             return html;
        }



        function formaEdtEdit( data ){
            var html = "";
            var titleParent = data.title;
            var hijos = parseInt( data.hijos );
            var i = '0';
            html += ' Nombre: <input type = "text" id = "data-0" value = "'+ titleParent + '"> <br>';
            if ( hijos != 0 ){
              html += nodoRecursivo1( data.nodos , "", 0); 
            }
            $("#cuerpoEditar").html(html);
        }
  
        $("#MostrarEdt").click(function(){
            //$(".container").show("slow");

            
             /*

            if ( $("#MostrarEdt").html() == "Crear EDT" ){
                 console.log("sape crear");
            }

            if ( localStorage.getItem("mostrarEdt") ){
                return false;
            }else {
               localStorage.setItem("mostrarEdt", 0);
            }
            */
            console.log("Mostrando EDT loading....");

            $("#progressEdt").show("slow");
            var jsonCliente = {
                  idproyecto : localStorage.getItem("idProyecto")
                  };
                   console.log("sape1");
                  $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),

                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/traerEdt",
                      success: function (data) {
                          /* Custom jQuery for the example */
                            //armarEdt( data, 0 );

                            if ( !data.idnodo ){
                              console.log("nulo", data.idnodo );
                              $("#progressEdt").hide("slow");
                              $("#edtCrearLogError").show("slow");
                              $("#CrearEDTCero").show("slow");
                              //window.location.href = 'edt.html';
                              return;
                            }else{
                              console.log("not null", data.idnodo );
                              localStorage.setItem( "idedt", data.idedt );
                                edtAlgorithm( data );
                                localStorage.setItem("navegacionEDT","actual");
                                console.log("sape1");
                                $('#list-html').text($('#org').html());
                                
                                $("#org").bind("DOMSubtreeModified", function() {
                                    console.log("sape");
                                    $('#list-html').text('');
                                    
                                    $('#list-html').text($('#org').html());
                                    
                                    prettyPrint();                
                                });
                               // prettyPrint();
                               $("#progressEdt").hide("slow");
                               $("#containerEdt").show("slow"); 
                               $("#controllerButton").show("slow");
                               repaint_eventsEdtNew();
                               $('.inputEdtTitle').attr('readonly', true);
                               $('.inputEdtDescripcion').attr('readonly', true);
                               $('.inputEdtDias').attr('readonly', true);
                               var it = 0;
                               console.log("cantidad de autogenerados " + autoGenerados.length);
                               for ( it = 0; it < autoGenerados.length; it++ ){
                                   var autog = autoGenerados[it];
                                   showMessage( "Se autogenero 1 nodo del padre: " + autog );
                               }
                            }
                            
                      }
                  });
          });





          $("#eliminarEdt").click(function(){
             console.log("eliminar");
             $("#myModal").modal();  
             return false;
             //$('#eliminarEdtModal').modal('show');
          });


           $("#eliminarConfirmacion").click(function(){
                  console.log("sape 1");
                  $('#myModal').modal('hide');
                  $("#controllerButton").hide("slow");
                  $("#containerEdt").hide("slow");
                  $("#MostrarEdt").text("Crear EDT");
                  //eliminarEdr
                   var jsonCliente = {
                                  idedt : localStorage.getItem("idedt"),
                                  };
                    $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/eliminarEdt",
                      success: function (data) {
                          console.log(data, "eliminado");
                          $("#CrearEDTCero").show("slow");
                          $("#edtCrearLogError").show("slow");
                          logChange("Se eliminó el EDT");
                      }
                       
                    });
                    $("#CrearEDTCero").show("slow");
                       $("#edtCrearLogError").show("slow");
           });


          $("#editarEdt").click(function(){
              console.log("editar");

              //$(".inputEdtTitle").removeAttr("readonly");
              //$(".inputEdtDescripcion").removeAttr("readonly");
              //$(".inputEdtDias").removeAttr("readonly");



              $("#botonerasEditar").show();
              

              eventsEdit();
              return false;
          });


          function repaintEdit(){
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
            }

      //trigger a Mostrar EDT    
     $("#MostrarEdt").trigger('click');       
  
    });

function agregarNodoHijoDefault(){
       var title = "default";
       var desc = "default";
       var tiempo = 0;
       var html = "";  
                    html += '<ul>';
                    html +=  '<li>'  +'<label';
                    html +=' class = "inputEdtTitle" >'+ title;
                    html += '</label> ' + '<br>';
                    html += '<label class = "inputEdtDescripcion"';
                    html += '>'+ desc + '</label>';
                    html += ' <br>'  + '<label class = "inputEdtDias"' ;
                    html += '>'+ tiempo + '</label> ';
                    html += '<ul>' + '</ul>';
                    html += '</li>';
                    html += '</ul>';
      return html;
  }


function repaint_eventsEdtNew(){


  function guardarModificadoID( id ){
      var i = 0;
      for ( i = 0; i < idModificadosCurrent.length; i++ ){
        if ( idModificadosCurrent[i] == id ) return;
      }
      idModificadosCurrent.push( id );
  }

  $(".inputEdtTitle").click(function(){
      console.log("click edttitle sape 1");
       //$(".inputEdtTitle").removeAttr("readonly");
       //$(".inputEdtDescripcion").removeAttr("readonly");
       //$(".inputEdtDias").removeAttr("readonly");
      //var p = $( '#'+$(this).id );
      
      var idnodo = '#' + $(this).attr('id');
      console.log("idactual", idnodo);
      localStorage.setItem("idnodoActualClick", idnodo);
      var p = $(idnodo);
      //console.log(p, $(this).id);
      var offset = $( this ).offset();
      console.log(offset);
      var position = p.position();
      console.log("pos top", position.top);

      console.log($(this).css("width"));
      var cntWidth = $(this).css("height").split("p")[0];
      console.log(cntWidth);

      var topfin = offset.top;

      var leftfin = offset.top + parseInt(cntWidth)*3;
      console.log("leftFin",leftfin);
      $( "#caja_flotante" ).offset({ top: leftfin, left: offset.left });
      //$("#caja_flotante").css( "top": position );

      //$("#caja_flotante").css("top", position.top);
      
      $("#caja_flotante").show("slow");
      $("#controlesSpan").html($(this).val());
      //$(this).removeAttr("readonly");
      //$(this).attr('id').removeAttr("readonly");
      //$("#descripcion-317").removeAttr("readonly");2
      //var idcurrent = '#'+ $(this).attr('id');
      //$(idcurrent).removeAttr("readonly");

      var id = $(this).attr('id').split("-")[1];


      localStorage.setItem("idmodificadoCurrent", id);
      
      //var iddes = "#descripcion-" + id;
      //var idtime = "#tiempo-" + id;
      //$(iddes).removeAttr("readonly");
      //$(idtime).removeAttr("readonly");
      //console.log(iddes, idtime);
      //console.log($(this).attr('id'));
      //repaintEDIT();

      guardarModificadoID(id);
      console.log('objeto editado id: ', id);
      console.log(idModificadosCurrent);
      return false;

    });

  

   $("#imgAgregar").click(function(){
      console.log("agregandoNodo");
      var id = localStorage.getItem("idnodoActualClick");
      //console.log("padre", $(id).parent().parent());
      $(id).parent().parent().append(agregarNodoHijoDefault());
      //console.log($(id).parent().parent().append(agregarNodoHijoDefault()));
      
      repaint_eventsEdtNew();

      repaint();

      //$('#modalEditarNew').modal('show');

   });

   $("#imgEliminar").click(function(){
      console.log("eliminandoNodo");
      //modalEliminarNew
      $('#modalEliminarNew').modal('show');
   });
   
   $("#imgEditar").click(function(){
    //editarNodoNew
    var idactual = localStorage.getItem("idmodificadoCurrent");
    var title = "#title-"+idactual;
    var descripcion ="#descripcion-" + idactual ;
    var tiempo = "#tiempo-" + idactual ;

    $('#editarNodoNew').modal('show');
    $('#title-editar').val($(title).val());
    $('#descripcion-editar').val($(descripcion).val());
    $('#tiempo-editar').val($(tiempo).val());
   
      console.log("editandoNodo");
   });

   $("#eliminarConfirmacionNew").click(function(){
    var idactual = localStorage.getItem("idmodificadoCurrent");

   });

   $("#editarConfirmacionNew").click(function(){
      var title = $("#title-editar").val();
      var descripcion = $("#descripcion-editar").val();
      var tiempo = $("#tiempo-editar").val();

      var idactual = localStorage.getItem("idmodificadoCurrent");
      
      var title1 = "#title-"+idactual;
      var descripcion1 ="#descripcion-" + idactual ;
      var tiempo1 = "#tiempo-" + idactual ;

        

      $(title1).val(title);
      $(descripcion1).val(descripcion);
      $(tiempo1).val(tiempo);
      
      

       var json = armaJsonNodo(idactual, title, tiempo, descripcion);
       console.log(json);
       //repaintEDIT();

      console.log(title,descripcion, tiempo);
      $('#editarNodoNew').modal('hide');

      return false;
   });

   function agregaNodoEdtNew(title,desc,tiempo){

                    //$("#errorMensaje").hide();
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


}

  
  