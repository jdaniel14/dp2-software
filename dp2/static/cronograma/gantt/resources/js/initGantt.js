var ge;  //this is the hugly but very friendly global var for the gantt editor
var idProyecto;
var holidays;
if (localStorage.getItem("idProyecto")){
	idProyecto = localStorage.getItem("idProyecto");
}
else {
	idProyecto = "1";
}
var currentDate = new Date();
		  var currentMonth = currentDate.getMonth() + 1;
		  var currentDay = currentDate.getDate();

		  var output = (currentMonth<10 ? '0' : '') + currentMonth + '/' + (currentDay<10 ? '0' : '') + currentDay + '/' + currentDate.getFullYear();
		$(function() {
		  

		  //load templates
		  $("#ganttemplates").loadTemplates();
		
		  // here starts gantt initialization
		  ge = new GanttMaster();
		  var workSpace = $("#workSpace");
		  workSpace.css({width:$(window).width() - 20,height:$(window).height() - 100});
		  ge.init(workSpace);
		
		  //inject some buttons (for this demo only)
		  
		  //Borrado : .append("<button onclick='clearGantt();' class='button'>Limpiar</button>")
		  
		  $(".ganttButtonBar div")
		          .append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
		          .append("<button onclick='openResourceEditor();' class='button'>Editar Recursos</button>")
				  .append("<button  class='button'>Exportar</button>")
				  .append("<button data-toggle='modal' href='#myModal' class='button' onclick='getCalendar();'>Tiempo de Trabajo</button>")
				  .append("<button data-toggle='modal' href='#myModalIndicador' class='button' id='btnIndicador'>Indicadores</button>");
		          //.append("<button onclick='getFile();' class='button'>Exportar</button>");
		  $(".ganttButtonBar h1").html("<img src='twGanttSmall.png'>");
		  $(".ganttButtonBar div").addClass('buttons');
		  //overwrite with localized ones
		  loadI18n();
		
		  //simulate a data load from a server.
		  loadGanttFromServer();
		
		
		  //fill default Teamwork roles if any
		  if (!ge.roles || ge.roles.length == 0) {
		    setRoles();
		  }
		
		  //fill default Resources roles if any
		  if (!ge.resources || ge.resources.length == 0) {
		    setResource();
		  }
		/*
		  if (!ge.calendarBase || ge.calendarBase.length == 0){
		  	setCalendarBase();
		  }
		  else {
		  	alert("No me mandas nada de calendario");
		  }*/
		  /*/debug time scale
		  $(".splitBox2").mousemove(function(e){
		    var x=e.clientX-$(this).offset().left;
		    var mill=Math.round(x/(ge.gantt.fx) + ge.gantt.startMillis)
		    $("#ndo").html(x+" "+new Date(mill))
		  });*/
		  $("#btnEliminarFecha").click(function(){
		  	var checkbox = $("input[name='rowTable']:checked");
			checkbox.closest("tr").remove();
		  });
		});
		
		
		function loadGanttFromServer(taskId, callback) {
		
			/* Ejemplo del JSON
			 * 
			 * 
			{"tasks":[
		    {"id":-1,"name":"Gantt editor","code":"","level":0,"status":"STATUS_ACTIVE","start":1346623200000,"duration":16,"end":1348523999999,"startIsMilestone":true,"endIsMilestone":false,"assigs":[]},
		    {"id":-2,"name":"coding","code":"","level":1,"status":"STATUS_ACTIVE","start":1346623200000,"duration":10,"end":1347659999999,"startIsMilestone":false,"endIsMilestone":false,"assigs":[],"description":"","progress":0},
		    {"id":-3,"name":"gant part","code":"","level":2,"status":"STATUS_ACTIVE","start":1346623200000,"duration":2,"end":1346795999999,"startIsMilestone":false,"endIsMilestone":false,"assigs":[],"depends":""},
		    {"id":-4,"name":"editor part","code":"","level":2,"status":"STATUS_SUSPENDED","start":1346796000000,"duration":4,"end":1347314399999,"startIsMilestone":false,"endIsMilestone":false,"assigs":[],"depends":"3"},
		    {"id":-5,"name":"testing","code":"","level":1,"status":"STATUS_SUSPENDED","start":1347832800000,"duration":6,"end":1348523999999,"startIsMilestone":false,"endIsMilestone":false,"assigs":[],"depends":"2:5","description":"","progress":0},
		    {"id":-6,"name":"test on safari","code":"","level":2,"status":"STATUS_SUSPENDED","start":1347832800000,"duration":2,"end":1348005599999,"startIsMilestone":false,"endIsMilestone":false,"assigs":[],"depends":""},
		    {"id":-7,"name":"test on ie","code":"","level":2,"status":"STATUS_SUSPENDED","start":1348005600000,"duration":3,"end":1348264799999,"startIsMilestone":false,"endIsMilestone":false,"assigs":[],"depends":"6"},
		    {"id":-8,"name":"test on chrome","code":"","level":2,"status":"STATUS_SUSPENDED","start":1348005600000,"duration":2,"end":1348178399999,"startIsMilestone":false,"endIsMilestone":false,"assigs":[],"depends":"6"}
		    ],"selectedRow":0,"deletedTaskIds":[],"canWrite":true,"canWriteOnParent":true }
			 * 
			 */
			
			
			var ret;
	  		  
			var objProy ={
				idProyecto : idProyecto
			}
			
			var rootURL = "../../../api/CR_getActividades/"+JSON.stringify(objProy);
			$.ajax({
				type: 'GET',
				url: rootURL,
				dataType: "json", 
		        success: completadoAJAX				
			});		
		}
		
		function completadoAJAX(data){
			console.log("Data recibida del servidor:");
			console.log(data);
			
            ret = data;
            
//            var offset=new Date().getTime()-ret.tasks[0].start;
//		    for (var i=0;i<ret.tasks.length;i++)
//		      ret.tasks[i].start=ret.tasks[i].start+offset;
		
		    ge.loadProject(ret);
		    ge.checkpoint(); //empty the undo stack
		    console.log("Variable Global ge:");
		    console.log(ge);
		    
		}

		function getCalendar(){
			$("#NombreWT").val(ge.calendarBase.name);
			var feriados = ge.calendarBase.holidays;
			var diasferiados = feriados.split('#');
			$("#tableHolidayDay").empty();
			for (var i=1; i < diasferiados.length - 1; i++){
				var fechitaslash = diasferiados[i].split("_").join("/");
				$("#tableHolidayDay").append("<tr><td><input type='radio' name='rowTable'/></td><td>" + fechitaslash+"</td></tr>")
			}

		}		
		
		function saveGanttOnServer() {
			//console.log(ge);
			
			if(confirm("Esta seguro que desea guardar los cambios?")){
				var prj = ge.saveProject();    
				console.log("Guardando...");
				console.log(prj);
				var objProy ={
					idProyecto: idProyecto,
					task:prj.tasks
				};
				var rootURL = "../../../api/CR_postActividades/";
				$.ajax({
					type: 'POST',
					url: rootURL,
	                data: JSON.stringify(objProy),
					dataType: "json",
					beforeSend:function(){
						console.log("Enviando...")
					},
					fail:function(data){
						console.log("Error");
						console.log(data);
					},
			        success: function(data){
			        	console.log("Recibido...")
			        	console.log(data);
						if (data.me!="")alert(data.me);
						else alert("Los datos se almacenaron con éxito");
						
			        }				
				});		
			}
				  
			
			
		  //this is a simulation: save data to the local storage or to the textarea
		  //saveInLocalStorage();
		
		
		  /*
		  var prj = ge.saveProject();
		
		  delete prj.resources;
		  delete prj.roles;
		
		  var prof = new Profiler("saveServerSide");
		  prof.reset();
		
		  if (ge.deletedTaskIds.length>0) {
		    if (!confirm("TASK_THAT_WILL_BE_REMOVED\n"+ge.deletedTaskIds.length)) {
		      return;
		    }
		  }
		
		  $.ajax("ganttAjaxController.jsp", {
		    dataType:"json",
		    data: {CM:"SVPROJECT",prj:JSON.stringify(prj)},
		    type:"POST",
		
		    success: function(response) {
		      if (response.ok) {
		        prof.stop();
		        if (response.project) {
		          ge.loadProject(response.project); //must reload as "tmp_" ids are now the good ones
		        } else {
		          ge.reset();
		        }
		      } else {
		        var errMsg="Errors saving project\n";
		        if (response.message) {
		          errMsg=errMsg+response.message+"\n";
		        }
		
		        if (response.errorMessages.length) {
		          errMsg += response.errorMessages.join("\n");
		        }
		
		        alert(errMsg);
		      }
		    }
		
		  });
		  */
		}
		
		
		//-------------------------------------------  Create some demo data ------------------------------------------------------
		function setRoles() {
		  ge.roles = [
		    {
		      id:"tmp_1",
		      name:"Project Manager"
		    },
		    {
		      id:"tmp_2",
		      name:"Worker"
		    },
		    {
		      id:"tmp_3",
		      name:"Stakeholder/Customer"
		    }
		  ];
		}
		function setCalendarBase(){
			
		}	

		function setResource() {
		  var res = [];
		  for (var i = 1; i <= 10; i++) {
		    res.push({id:"tmp_" + i,name:"Resource " + i});
		  }
		  ge.resources = res;
		}
		
		
		function clearGantt() {
		  ge.reset();
		}
		
		function loadI18n() {
		  GanttMaster.messages = {//MENSAJES PARA SER CAMBIADOS AL ESPAÑOL
		    "CHANGE_OUT_OF_SCOPE":"Ningún derecho para actualizar a los padres fuera del alcance editor",
		    "START_IS_MILESTONE":"Inicio es hito",
		    "END_IS_MILESTONE":"Fin es hito",
		    "TASK_HAS_CONSTRAINTS":"Actividad tiene restricciones",
		    "GANTT_ERROR_DEPENDS_ON_OPEN_TASK":"Error en el Gantt: dependencia de un actividad abierta",
		    "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK":"Error en el Gantt: descendiente de una actividad cerrada",
		    "TASK_HAS_EXTERNAL_DEPS":"Actividad tiene dependencias externas",
		    "GANTT_ERROR_LOADING_DATA_TASK_REMOVED":"Error en el Gantt: Cargando datos de una actividad removida",
		    "ERROR_SETTING_DATES":"Error configurando fechas",
		    "CIRCULAR_REFERENCE":"Referencia circular: Una actvidad no puede depender de si misma",
		    "CANNOT_DEPENDS_ON_ANCESTORS":"No se puede depender de sus antecesores",
		    "CANNOT_DEPENDS_ON_DESCENDANTS":"No se puede depender de sus descendientes",
		    "INVALID_DATE_FORMAT":"Formato de fecha invalido",
		    "TASK_MOVE_INCONSISTENT_LEVEL":"Movimiento de nivel inconsistente de una actividad",
		    "GANTT_QUARTER_SHORT":"Gantt trimestral",
		    "GANTT_SEMESTER_SHORT":"Gantt semestral"
		  };
		}
		function editWorkingTimeDay(){
			var checkbox = $("input[name='rowTable']:checked");
			var tds = checkbox.closest("tr").find("td");
			//var fecha = tds[2];
			console.log(tds);
			//alert(fecha);
			//var nombre = tds[1].chidren().val();
			

			console.log(checkbox);
		}
		function addWorkingTimeDay(){
			var fechita =  $("#FechaWT").val();
			if (fechita != ""){				
				var fechitaparse=fechita.split('-').join('/');
				var auxiliar = fechita.split('-').join('_').split('_');
				var fechitaEncontrado = auxiliar[1] + "_" + auxiliar[2];
				console.log(fechitaEncontrado);
				if (holidays.indexOf(fechitaEncontrado) >= 0){
					alert("La fecha ya está incluida en el calendario");
				}
				else {
					$("#tableHolidayDay").prepend("<tr><td><input type='radio' name='rowTable'/></td><td>" + fechitaparse +"</td></tr>");	
				}			
				//<td><input type='text' placeholder='Ingrese el nombre de la fecha' style='width:400px;'/></td>
			}else{
				alert("Debe seleccionar una fecha primero");
			}			
		}

		function openWorkingTimeEditor(){
		  var editor = $("<div class='form-horizontal' role='form'>");
		  editor.append("<h2>Editar Tiempo de Trabajo</h2>");
		  //editor.addClass("resEdit");
		  editor.append("<div class='form-group'><label class='col-lg-2 control-label'>Fecha</label><div class='col-lg-4'><input type='date' class='form-control' id='FechaWT'></div></div>");
		  editor.append("<div class='row'><div class='tabbable'><ul class='nav nav-tabs'><li class='active'><a href='#pane1' data-toggle='tab'>Day overrides</a></li><li><a href='#pane2' data-toggle='tab'>Week overrides</a></li></ul><button type='button' class='btn btn-default btn-lg' onclick='addWorkingTimeDay();'><span class='glyphicon glyphicon-plus-sign'></span> Agregar</button><button type='button' class='btn btn-default btn-lg' onclick='editWorkingTimeDay();'><span class='glyphicon glyphicon-pencil'></span> Editar</button><button type='button' class='btn btn-default btn-lg'><span class='glyphicon glyphicon-minus-sign'></span> Eliminar</button><div class='tab-content'><div id='pane1' class='tab-pane active'><table class='table table-stripped' style='margin-left:10px;'><thead><th></th><th>  Nombre</th><th>  Fecha</th></thead><tbody id='tableHolidayDay'></tbody></table></div><div id='pane2' class='tab-pane'><table class='table table-stripped' style='margin-left:10px;'><thead><th>  Nombre</th><th>Fecha Inicio</th><th>Fecha Fin</th></thead><tbody></tbody></table></div></div></div></div>");
//		  for (var i in ge.resources) {
//		    var res = ge.resources[i];
//		    var inp = $("<input type='text'>").attr("pos", i).addClass("resLine").val(res.name);
//		    editor.append(inp).append("<br>");
//		  }

		  var sv = $("<div>Guardar</div>").css("float", "right").addClass("button").click(function() {
		    $(this).closest(".resEdit").find("input").each(function() {
		      var el = $(this);
		      var pos = el.attr("pos");
		      ge.resources[pos].name = el.val();
		    });
		    ge.editor.redraw();
		    closeBlackPopup();
		  });
		  editor.append(sv);
		  
		  var ndo = createBlackPage(800, 500).append(editor);



		}
		
		//-------------------------------------------  Open a black popup for managing resources. This is only an axample of implementation (usually resources come from server) ------------------------------------------------------
		function openResourceEditor() {
		  var editor = $("<div>");
		  editor.append("<h2>Resource editor</h2>");
		  editor.addClass("resEdit");
		
		  for (var i in ge.resources) {
		    var res = ge.resources[i];
		    var inp = $("<input type='text'>").attr("pos", i).addClass("resLine").val(res.name);
		    editor.append(inp).append("<br>");
		  }
		
		  var sv = $("<div>Guardar</div>").css("float", "right").addClass("button").click(function() {
		    $(this).closest(".resEdit").find("input").each(function() {
		      var el = $(this);
		      var pos = el.attr("pos");
		      ge.resources[pos].name = el.val();
		    });
		    ge.editor.redraw();
		    closeBlackPopup();
		  });
		  editor.append(sv);
		
		  var ndo = createBlackPage(800, 500).append(editor);
		}
		
		//-------------------------------------------  Get project file as JSON (used for migrate project from gantt to Teamwork) ------------------------------------------------------
		function getFile() {
		  $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
		  $("#gimmeBack").submit();
		  $("#gimBaPrj").val("");
		
		  /*  var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(JSON.stringify(prj));
		   console.debug(uriContent);
		   neww=window.open(uriContent,"dl");*/
		}
		
		
		//-------------------------------------------  LOCAL STORAGE MANAGEMENT (for this demo only) ------------------------------------------------------
		Storage.prototype.setObject = function(key, value) {
		  this.setItem(key, JSON.stringify(value));
		};
		
		
		Storage.prototype.getObject = function(key) {
		  return this.getItem(key) && JSON.parse(this.getItem(key));
		};
		
		$("#btnGuardar").click(function(){
			//ge.gantt.refreshGantt();
			var filas = $("#tableHolidayDay").find("tr");
			holidays = "#";
			for (var i=0; i < filas.length; i++){
				var fechaFila = filas[i].cells.item(1).innerHTML;
				var fechaHol = fechaFila.split("/").join("_");
				holidays += fechaHol + "#";
			}
			ge.calendarBase.holidays = holidays;
			ge.calendarBase.name = $("#NombreWT").val();
			var objWorkTime = {
			  id: ge.calendarBase.id,
			  name: ge.calendarBase.name,
			  holidays:  holidays,
			};
			var ruta = "../../../api/CR_guardarCalendarioBase/";
			$.ajax({
			  type: 'POST',
			  url: ruta,
			  data: JSON.stringify(objWorkTime),
			  dataType: 'json',
			  success: refrescarTodo/*{
			    ge.redraw();
				//ge.gantt.refreshGantt();
				if (localStorage && localStorage.getItem("feriados")){
					localStorage.setItem("feriados",item.holidays);
				}
			  }*/
			});
		});

		function refrescarTodo(data){
			/*if (localStorage && localStorage.getItem("feriados")){
					localStorage.setItem("feriados",holidays);
				}*/
			ge.loadProject(ge);	
			ge.redraw();
		
		}
		
		
		function saveInLocalStorage() {
		  var prj = ge.saveProject();
		  console.log("JSON prj");
		  console.log(prj);
		  if (localStorage) {
		    localStorage.setObject("teamworkGantDemo", prj);
		  } else {
		    $("#ta").val(JSON.stringify(prj));
		  }
		}