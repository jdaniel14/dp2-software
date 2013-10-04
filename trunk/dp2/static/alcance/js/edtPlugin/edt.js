 jQuery(document).ready(function() {
    /*
        crear EDT
        editar EDT
        eliminar EDT
        validado
    */

    //getVersionEdt
    var jsonCliente = {
                  idproyecto : "1"
                  };
    $.ajax({
                      type: "get",
                      data: JSON.stringify(jsonCliente),

                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/dameVersionEdt",
                      success: function (data) {
                          console.log(data.version);
                          if (data.version){
                            console.log("mostrar");
                            $("#CrearEDTCero").show();

                          }else{
                            console.log("crear");
                            $("#CrearEDTCero").show();
                          }


                      }
        });







        //localStorage.removeItem("mostrarEdt");
        Object.size = function(obj) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key)) size++;
          }
          return size;
      };


        function repaint(){
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



        /* Crear EDT */

          $("#CrearEDTCero").click(function(){
              console.log("creando edt");
                var titleParent = "Nombre Proyecto";
                var idnodo = 1;
                var html = '<li>' +'<input class = "inputEdtTitle"  id = "title-' + idnodo;
                html += '" type = "text" readonly = "readonly" value = "'+ titleParent + '"> <ul id = "ul-'+ idnodo + '"></ul>';
                $("#org").html( html );
                $("#containerEdt").show("slow"); 
                repaint();

                $("#botonerasEditar").show();
                eventsEdit();
              return false;
          });
          


        /* FIN CREAR EDT */

        function edtAlgorithm( data ){
            var titleParent = data.title;
            var hijos = parseInt(data.hijos);
            var html = '<li>' +'<input class = "inputEdtTitle"  id = "title-"' + data.idnodo+ '" type = "text" readonly = "readonly" value = "'+ titleParent + '"> ';
            if ( hijos == 0 ){
              //entonces no tiene hijos 
              html += '</li>';
            }else{
               //html += '<ul>';
               console.log('nodo R');
               var hfinal = nodoRecursivo ( data.nodos , html);
               //html += '</ul>';
            }
            html = hfinal;
            html += '</li>';
            $("#org").html( hfinal );
            //console.log( hfinal );
            repaint();
        }


        function nodoRecursivo( nodos , html ){
           var i = 0;
           //console.log( html );
           //console.log("tam nodos: " + nodos.length );
           html += '<ul>';
            for ( i = 0; i < nodos.length; i++ ){
               //por cada hijo
                console.log(nodos[i].idnodo);
                html +=  '<li>' + '<span class = "titleEDT">' +'<input id = "title-'+ nodos[i].idnodo +'" class = "inputEdtTitle" type = "text" readonly = readonly" value = "'+ nodos[i].title + '"> ' + '</span> <br>' + '<span class = "descripcionEDT">'  + '<input class = "inputEdtDescripcion" id = "descripcion-'+ nodos[i].idnodo + '" type = "text" readonly = readonly" value = "'+ nodos[i].descripcion + '"> ' + '</span> <br>' + '<span class = "diasEDT">'  + '<input class = "inputEdtDias" id = "tiempo-'+ nodos[i].idnodo + '" type = "text" readonly = readonly" value = "'+ nodos[i].dias + '"> ' + '</span>';
                var hijos = parseInt( nodos[i].hijos );
                if ( hijos > 0 ){
                  //console.log("recursivo caso");
                  //console.log("html antes: ", html);
                  var sape = nodoRecursivo( nodos[i].nodos, html );
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
            $("#progressEdt").show("slow");
            var jsonCliente = {
                  idproyecto : "1"
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
                  console.log("sape");
                  $('#myModal').modal('hide');
                  $("#controllerButton").hide("slow");
                  $("#containerEdt").hide("slow");
                  $("#MostrarEdt").text("Crear EDT");
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

           function eventsEdit(){
                var idnodoCounter = 1;
                $("#inputAgregarHijo").click(function(){
                    console.log("agregando un hijo");
                    var title = $("#inputTitulo1").val();
                    var desc =  $("#inputDescripcion1").val();
                    var tiempo = $("#inputTiempo1").val();
                    agregaNodoEdt(title,desc,tiempo);
                });

                 /*
                 $( "#chart" ).keypress(function( event ) {
                  if ( event.which == 97 ) {
                     event.preventDefault();
                  }
                    console.log("key A");
                    $( "#inputAgregarHijo" ).trigger( "click" );
                });
                  */
                  
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

          
         

    });

  
  