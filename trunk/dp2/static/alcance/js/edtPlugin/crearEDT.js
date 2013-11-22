 
$('.newBox').draggable({
    cursor: 'move',
    revert: true
});

$('.bolitaEdt').droppable({
    accept: '.newBox',
    drop: handleDropEvent
});




function handleDropEvent(event, ui) {
    //$(this).append($('#HeaderDrag'));
    console.log("sape");
}


 function armaNodoPadre ( title, descripcion, hijos , idnodo, flag ){
  var html = '<li>'
	  html += '<span class = "titleEDT">';
	  html += title
	  html += '</span>';
	return html;         
}

function armaNodoHijoCrear ( id, title, descripcion, dias ){
	var html = "";

	html +=  '<li> <div class = "bolitaEdt"> <img style = "width:16px; height: 16px;" src = "../../static/alcance/img/icon_bola.png" /> </div>';
	html += '<span class = "titleEDT" id = "';
	html += 'title-'+ id + '" >';
	html += title;
	html += '</span> <br>' + '<span class = "descripcionEDT">';
	html += descripcion + '</span> <br>' + '<span class = "diasEDT">';
	html += dias + '</span>';
	

	return html;
}

function repaint_events_crear(){
	$(".titleEDT").click(function(){
    //creamos botonera.

   	  var idnodo = '#' + $(this).attr('id');
      console.log("idactual", idnodo);
      localStorage.setItem("idnodoActualClick", idnodo);
      var p = $(idnodo);
      //console.log(p, $(this).id);
      var offset = $( this ).offset();
      console.log(offset);
      var position = p.position();
      //console.log("pos top", position.top);

      console.log($(this).css("width"));
      var cntWidth = $(this).css("height").split("p")[0];
      console.log(cntWidth);

      var topfin = offset.top;

      var leftfin = offset.top + parseInt(cntWidth)*3;
      console.log("leftFin",leftfin);
      $( "#caja_flotante" ).offset({ top: leftfin, left: offset.left });
     
      $("#caja_flotante").show("slow");

   });

	$("#imgEliminar").click(function(){

	});


}


function repaintCharts(){
                $("#chart").html("");
                $("#org").jOrgChart({
                    chartElement : '#chart',
                    dragAndDrop  : true
                });
                repaint_events_crear();
                //repaint eventos too
                /*
                $("#utilsChart").html();
                $("#utilOrg").jOrgChart({
                    chartElement : '#utilsChart',
                    dragAndDrop  : true
                });
 			  */

        }


 jQuery(document).ready(function(){
   console.log( "CrearEDT its loaded ");

   //events
   $("#CrearEDTCero1").click(function(){

   	localStorage.setItem("estado", "creando");

   	//creamos la edt
   	//Primero se crea un Padre y un nodo para arrastrar.
    $("#edtCrearLogError").hide("slow");
    		var titleParent = "Nombre Proyecto";
        	var idnodo = 1;
            var idproyecto = localStorage.getItem("idProyecto");

            var html = armaNodoPadre( titleParent, "", "", "", "" );
            html += '<ul>';
            html += armaNodoHijoCrear("","default", "default", 0);
            html += armaNodoHijoCrear("","default", "default", 0);
            html += '</ul>';

                $("#org").html( html );
                $("#containerEdt").show("slow"); 
                $("#utils_flotante").portamento();
                 repaintCharts();

   });

 });