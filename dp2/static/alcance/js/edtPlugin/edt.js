 jQuery(document).ready(function() {

        $("#org").jOrgChart({
            chartElement : '#chart',
            dragAndDrop  : true
        });
  
        $("#MostrarEdt").click(function(){
            //$(".container").show("slow");

            var jsonCliente = {
                  nombre : "sape",
                  email  : "hola",
                  fono   : "1234",
                  mensaje : "hola"
                  };

                  $.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/traerEdt",
                      success: function (data) {
                          /* Custom jQuery for the example */
                           
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

  
  