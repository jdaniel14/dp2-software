 jQuery(document).ready(function() {

        localStorage.removeItem("mostrarEdt");
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

        function armaNodo(){

        }

        function recursiveArbol(){
          
        }

        /*
          {"title":"DP2","hijos":"5",
            "nodos":[
                {"title":"Inicio","hijos":"0","nodos":[]},
                {"title":"Planificacion","hijos":"0","nodos":[]},
                {"title":"Ejecucion","hijos":"0","nodos":[]},
                {"title":"Seguimiento","hijos":"0","nodos":[]},
                {"title":"Cierre","hijos":"0","nodos":[]}]}
        */


        function recursivoNodes( nodos, html, flag ){
            var i = 0;
            console.log(nodos);
            console.log("tam nodos: " + nodos.length + ' it: ' + flag );
            
            html += '<ul>';
            for ( i = 0; i < nodos.length; i++ ){
                html +=  '<li>' + nodos[i].title + '</li>'

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


        function formaEdtEdit( data ){
            var html = "";
            var titleParent = data.title;
            var hijos = parseInt( data.hijos );
            var i = '0';
            html += '<input type = "text" id = "data-0" value = "'+ titleParent + '">';
            if ( hijos != 0 ){
              html += recursivoNodes1( data.nodos , "", 0); 
            }
            $("#cuerpoEditar").html(html);
        }
  
        $("#MostrarEdt").click(function(){
            //$(".container").show("slow");

            if ( $("#MostrarEdt").html() == "Crear EDT" ){
                 console.log("sape crear");
            }

            if ( localStorage.getItem("mostrarEdt") ){
                return false;
            }else {
               localStorage.setItem("mostrarEdt", 0);
            }
            var jsonCliente = {
                  idcliente : "1"
                  };

                  $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/traerEdt",
                      success: function (data) {
                          /* Custom jQuery for the example */
                            armarEdt( data, 0 );
                            console.log("sape1");
                            $('#list-html').text($('#org').html());
                            
                            $("#org").bind("DOMSubtreeModified", function() {
                                console.log("sape");
                                $('#list-html').text('');
                                
                                $('#list-html').text($('#org').html());
                                
                                prettyPrint();                
                            });
                           // prettyPrint();
                           $("#containerEdt").show("slow"); 
                           $("#controllerButton").show("slow");
                      }
                  });
          });

          $("#editarEdt").click(function(){
              console.log("editar");
              //modalEditar
              var jsonCliente = {
                  idcliente : "1"
                  };

              $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/traerEdt",
                      success: function (data) {
                          /* Custom jQuery for the example */
                           
                        //prettyPrint();   

                         formaEdtEdit( data );
                         $("#modalEditar").modal();              
                           
                      }
                  });

              $("#modalEditar").modal(); 
              
              
              //$("#cuerpoEditar").html();

              return false;
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

         

    });

  
  