var ge;  //this is the hugly but very friendly global var for the gantt editor
		$(function() {
		
		  //load templates
		  $("#ganttemplates").loadTemplates();
		
		  // here starts gantt initialization
		  ge = new GanttMaster();
		  var workSpace = $("#workSpace");
		  workSpace.css({width:$(window).width() - 20,height:$(window).height() - 100});
		  ge.init(workSpace);
		
		  //inject some buttons (for this demo only)
		  $(".ganttButtonBar div").append("<button onclick='clearGantt();' class='button'>clear</button>")
		          .append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
		          .append("<button onclick='openResourceEditor();' class='button'>edit resources</button>")
		          .append("<button onclick='getFile();' class='button'>export</button>");
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
		
		
		  /*/debug time scale
		  $(".splitBox2").mousemove(function(e){
		    var x=e.clientX-$(this).offset().left;
		    var mill=Math.round(x/(ge.gantt.fx) + ge.gantt.startMillis)
		    $("#ndo").html(x+" "+new Date(mill))
		  });*/
		
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
	  		  
			var idProyecto = 1;
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
			console.log(data);
            ret = data;
            
            var offset=new Date().getTime()-ret.tasks[0].start;
		    for (var i=0;i<ret.tasks.length;i++)
		      ret.tasks[i].start=ret.tasks[i].start+offset;
		
		    ge.loadProject(ret);
		    ge.checkpoint(); //empty the undo stack	
		}
		
		
		function saveGanttOnServer() {
		
		  //this is a simulation: save data to the local storage or to the textarea
		  saveInLocalStorage();
		
		
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
		  GanttMaster.messages = {
		    "CHANGE_OUT_OF_SCOPE":"NO_RIGHTS_FOR_UPDATE_PARENTS_OUT_OF_EDITOR_SCOPE",
		    "START_IS_MILESTONE":"START_IS_MILESTONE",
		    "END_IS_MILESTONE":"END_IS_MILESTONE",
		    "TASK_HAS_CONSTRAINTS":"TASK_HAS_CONSTRAINTS",
		    "GANTT_ERROR_DEPENDS_ON_OPEN_TASK":"GANTT_ERROR_DEPENDS_ON_OPEN_TASK",
		    "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK":"GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK",
		    "TASK_HAS_EXTERNAL_DEPS":"TASK_HAS_EXTERNAL_DEPS",
		    "GANTT_ERROR_LOADING_DATA_TASK_REMOVED":"GANTT_ERROR_LOADING_DATA_TASK_REMOVED",
		    "ERROR_SETTING_DATES":"ERROR_SETTING_DATES",
		    "CIRCULAR_REFERENCE":"CIRCULAR_REFERENCE",
		    "CANNOT_DEPENDS_ON_ANCESTORS":"CANNOT_DEPENDS_ON_ANCESTORS",
		    "CANNOT_DEPENDS_ON_DESCENDANTS":"CANNOT_DEPENDS_ON_DESCENDANTS",
		    "INVALID_DATE_FORMAT":"INVALID_DATE_FORMAT",
		    "TASK_MOVE_INCONSISTENT_LEVEL":"TASK_MOVE_INCONSISTENT_LEVEL",
		
		    "GANTT_QUARTER_SHORT":"trim.",
		    "GANTT_SEMESTER_SHORT":"sem."
		  };
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
		
		  var sv = $("<div>save</div>").css("float", "right").addClass("button").click(function() {
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
		
		
		
		
		
		function saveInLocalStorage() {
		  var prj = ge.saveProject();
		  if (localStorage) {
		    localStorage.setObject("teamworkGantDemo", prj);
		  } else {
		    $("#ta").val(JSON.stringify(prj));
		  }
		}