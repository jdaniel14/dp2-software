var x;
x = $(document);
x.ready(inicializarEventos);

function inicializarEventos() {    
    $("#btnBuscar").click(iniciarFlujo);
    $("#resultados").hide();

   // $("#fechaInicio").change(filtrarOtraFecha)
}

function filtrarOtraFecha() {

    $("#fechaFin").attr("value", "");
    var fecha = new Date();
    fecha = $("#fechaInicio").datepicker("getDate");

    var ddd = fecha.getDate();
    ddd += 14;
    if (ddd < 10)
        ddd = "0" + ddd;
    
    $("#fechaFin").datepicker("option", "maxDate", new Date(year, (month - 1), ddd));

}
var fechaInicio = null;
var fechaFinal = null;

function iniciarFlujo() {
    fechaInicio = $("#fechaInicio").val();
    fechaFinal = $("#fechaFin").val();

    if ((fechaInicio != "") && (fechaFinal != "")) {

        var ListaRecursos = {
            fechaIni: fechaInicio,
            fechaFin: fechaFinal
        }
        var jsonData = JSON.stringify(ListaRecursos);
        console.log(jsonData);

        $.ajax({
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            url: "../../api/G_listaTodosRecurso",
            beforeSend: esperaDatos(),
            success: llegadaDatos
        });
    }
    else {
        //mostrarError("Faltan Datos");
    	alert("Ingrese Datos");
        $("#resultados").hide("slow");
    }
}


function esperaDatos() {
}
var meses = new Array();
meses[0] = "Enero";
meses[1] = "Febrero";
meses[2] = "Marzo";
meses[3] = "Abril";
meses[4] = "Mayo";
meses[5] = "Junio";
meses[6] = "Julio";
meses[7] = "Agosto";
meses[8] = "Setiembre";
meses[9] = "Octubre";
meses[10] = "Noviembre";
meses[11] = "Dciembre";

function llegadaDatos(data) {

    console.log(data);
    $("#resultados").hide("slow");
    
    //if (data.me == "") {    
        var result = "";
        var cantDias = 0;
        var j = 0;
        /*console.log("aqui");
        console.log(data[1]["detalle_dias"]);
        console.log("sale");*/
        $.each(data[1].detalle_dias, function (i, item) {
            cantDias++;            
        });
        console.log(cantDias);
        
        result += '<table cellpadding = "0" cellspacing = "0" width = "100%">';
        result += '<thead><tr align = "center">';
        result += '<td align = "center">Nombre</td>';
        //alert(fechaInicio);
        str = fechaInicio+"";
        
        var year = parseInt(str.substr(0,4));
        var month = parseInt(str.substr(5,2)) - 1;
        var day = parseInt(str.substr(8,2));
        var date = new Date(year, month, day);
        var mes = 0;
        var indices = new Array();
        
        numeros = '<td align = "center"></td>';
        var ind = 0
        var cont = 0;
        var css_style = ' style="border-left: 2px groove #733366;" ';
        var cad_style = "";
        for (j = 0; j < cantDias; j++){
        	if(date.getDate() == 1 && cont > 1) {
        		 result += '<td align = "center" colspan = '+ cont +' style=" border-right: 2px groove #733366;">' + meses[mes] + '</td>';
        		 //alert(date.getMonth());
        		 indices[ind] = cont;
        		 ind++;
        		cont = 1;
        		cad_style = css_style;
        	}
        	else{
        		cont++;
        		cad_style = "";
        	}
            numeros += '<td align = "center" '+ cad_style +'>' + date.getDate() + '</td>';
            mes = parseInt(date.getMonth());
            date.setDate(date.getDate() + 1);
        }
        
        result += '<td align = "center" colspan = '+ cont +' >' + meses[mes] + '</td>';
        //alert(date.getMonth());
        result += '</tr><tr>' + numeros + '</tr></thead>';        
        result += '<tbody>';
        
        prim = true;

       // alert(indices[0]);
       // alert(indices[1]);
        $.each(data, function (i, item) {
        	console.log("entra");
        	if(prim == true) prim = false;
        	else {
        		result += '<tr>';
        		result += '<td align = "center">' + item.nom + '</td>';

        		var fechas = item.detalle_dias;

                ind = 0
                cont = 0;
        		$.each(fechas, function (i, led) {
        			cont++;
        			
        			if (led != 0) {
        				result += '<td align = "center" style="background-color:red; ';
        			}
        			else {
        				result += '<td align = "center" style="background-color:blue; ';
        			}
        			if(cont == indices[ind]){
        				alert(cont);
        				alert(ind);
        				cont = 0;
        				ind++;
        				result += ' border-right: 2px groove #733366; ';
        			}
        			result += ' " ></td>';
        		});
        		result += '</tr>';
        	}
        });

        result += '</tbody>';
        result += '</table>';
        result += '</div>';

        $("#resultados").html(result);
        $("#resultados").show("slow");
}