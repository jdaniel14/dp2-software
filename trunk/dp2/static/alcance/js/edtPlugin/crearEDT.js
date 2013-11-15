 
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


function repaintCharts(){
                $("#chart").html("");
                $("#org").jOrgChart({
                    chartElement : '#chart',
                    dragAndDrop  : true
                });
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
   $("#CrearEDTCero").click(function(){

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
                repaintCharts();
                $("#utils_flotante").portamento();
   });

 });