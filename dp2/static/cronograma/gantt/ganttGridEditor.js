/*
 Copyright (c) 2012-2013 Open Lab
 Written by Roberto Bicchierai and Silvia Chelazzi http://roberto.open-lab.com
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:
 
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GridEditor(master) {
    this.master = master; // is the a GantEditor instance
    var gridEditor = $.JST.createFromTemplate({}, "TASKSEDITHEAD");
    gridEditor.gridify();
    this.element = gridEditor;
}


function permite(obj, elEvento, permitidos, allowDecimal) {
    var numeros = "0123456789";
    var caracteres = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúü";
    var numerosCaracteres = " 0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúü@!=+*-¿?¡-_%$.,()" + String.fromCharCode(47) + String.fromCharCode(34) + String.fromCharCode(9) + String.fromCharCode(13);
    var numeroscomas = "0123456789,";
    //+ String.fromCharCode(34) + String.fromCharCode(39) + String.fromCharCode(47);
    //var teclasEspeciales = [8, 37, 39, 46];
    switch (permitidos) {
        case 'num':
            permitidos = numeros;
            break;
        case 'car':
            permitidos = caracteres;
            break;
        case 'numCar':
            permitidos = numerosCaracteres;
            break;
        case 'dependencias':
            permitidos = numeroscomas;
            break;
    }
    if (window.event) {
        key = elEvento.keyCode;

    }
    else if (elEvento.which) {
        key = elEvento.which;
    }

    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
    var isFirstD = allowDecimal ? String.fromCharCode(key) == '.' && obj.value.indexOf('.') == -1 : false;

    return (permitidos.indexOf(caracter) != -1) || isFirstD;
//asi se llama onkeypress="return permite(this,event, 'num',true)
}


GridEditor.prototype.fillEmptyLines = function() {
    var factory = new TaskFactory();

    //console.debug("GridEditor.fillEmptyLines");
    var rowsToAdd = 30 - this.element.find(".taskEditRow").size();

    //fill with empty lines

    for (var i = 0; i < rowsToAdd; i++) {
        var emptyRow = $.JST.createFromTemplate({}, "TASKEMPTYROW");
        //click on empty row create a task and fill above
        var master = this.master;
        emptyRow.click(function(ev) {
            master.beginTransaction();
            var emptyRow = $(this);
            var lastTask;
            var start = new Date().getTime();
            var level = 0;
            if (master.tasks[0]) {
                start = master.tasks[0].start;
                level = master.tasks[0].level + 1;
            }

            //fill all empty previouses
            emptyRow.prevAll(".emptyRow").andSelf().each(function() {
                var ch = factory.build("tmp_fk" + new Date().getTime(), "", "", level, start, 1);
                var task = master.addTask(ch);
                lastTask = ch;
            });
            master.endTransaction();
            lastTask.rowElement.click();
            lastTask.rowElement.find("[name=name]").focus()//focus to "name" input
                    .blur(function() { //if name not inserted -> undo -> remove just added lines
                var imp = $(this);
                if (!imp.isValueChanged())
                    master.undo();
            });
        });
        this.element.append(emptyRow);
    }

};


GridEditor.prototype.addTask = function(task, row) {
    //console.debug("GridEditor.addTask",task,row);
    //var prof = new Profiler("editorAddTaskHtml");

    //remove extisting row
    this.element.find("[taskId=" + task.id + "]").remove();

    var taskRow = $.JST.createFromTemplate(task, "TASKROW");
    //save row element on task

    //Termina la creacion de cada fila que ingresa a la tabla al lado del Gantt

    // Bloqueo de la primera fila

    if (taskRow.attr("taskid") == -1) {

        console.log(taskRow);
        console.log("Task ID: " + taskRow[0].attributes.taskid.value);

        $.each(taskRow.children('th'), function(e, el) {
            $(el).removeClass("gdfCell edit");
        });

        $.each(taskRow.children('td'), function(e, el) {

            $.each($(el).children('div'), function(e1, el1) {
                if ($(el1).attr("class") == "taskStatus cvcColorSquare") {
                    $(this).hide();
                }
            });

            $.each($(el).children('input'), function(e1, el1) {
                if (el1.name != "end")
                    el1.readOnly = true;
            });

        });

    }

    //Fin de bloqueo de la primera fila
    if ((ge.lineabase == "true")) {

        $.each(taskRow.children('td'), function(e, el) {

            $.each($(el).children('input'), function(e1, el1) {
                el1.readOnly = true;
            });

        });



    }

//on key press ////////////////////////////////////////////////////////////



    $.each(taskRow.children('td'), function(e, el) {

        $.each($(el).children('input'), function(e1, el1) {
            if (el1.name == "duration") {
                el1.onkeypress = function(event) {

                    return permite(this, event, 'num', false)

                };




            }
            else if (el1.name == "depends") {//dependencias

                el1.onkeypress = function(event) {

                    return permite(this, event, 'dependencias', false)

                };

            }
            else if (el1.name == "name") {//dependencias

                el1.onkeypress = function(event) {

                    return permite(this, event, 'numCar', false)

                };
            }



        });

    });
//function validar ///////////////////////////////////////////////////////////
    task.rowElement = taskRow;

    this.bindRowEvents(task, taskRow);

    if (typeof(row) != "number") {
        var emptyRow = this.element.find(".emptyRow:first"); //tries to fill an empty row
        if (emptyRow.size() > 0)
            emptyRow.replaceWith(taskRow);
        else
            this.element.append(taskRow);
    } else {
        var tr = this.element.find("tr.taskEditRow").eq(row);
        if (tr.size() > 0) {
            tr.before(taskRow);
        } else {
            this.element.append(taskRow);
        }

    }
    this.element.find(".taskRowIndex").each(function(i, el) {
        $(el).html(i + 1);
    });
    //prof.stop();
    $("td[name='typeCost']").attr('disabled', true);

    if (ge.lineabase == "true") {
        $("input[name='name']").attr('disabled', true);
        $("input[name='start']").attr('disabled', true);
        $("input[name='end']").attr('disabled', true);
        $("input[name='duration']").attr('disabled', true);
        $("input[name='depends']").attr('disabled', true);
    }
    else {

    }

    return taskRow;
};


GridEditor.prototype.refreshTaskRow = function(task) {
    //console.debug("refreshTaskRow")
    //var profiler = new Profiler("editorRefreshTaskRow");
    var row = task.rowElement;

    row.find(".taskRowIndex").html(task.getRow() + 1);
    row.find(".indentCell").css("padding-left", task.level * 10);
    row.find("[name=name]").val(task.name);
    row.find("[name=code]").val(task.code);
    row.find("[status]").attr("status", task.status);

    row.find("[name=duration]").val(task.duration);
    row.find("[name=start]").val(new Date(task.start).format()).updateOldValue(); // called on dates only because for other field is called on focus event
    row.find("[name=end]").val(new Date(task.end).format()).updateOldValue();

    row.find("[name=realStart]").val(new Date(task.start).format()).updateOldValue(); // called on dates only because for other field is called on focus event
    row.find("[name=realEnd]").val(new Date(task.end).format()).updateOldValue();

    row.find("[name=depends]").val(task.depends);
    row.find(".taskAssigs").html(task.getAssigsString());

    row.find("[name=wbsNode]").val(task.wbsNode);

    //profiler.stop();
};

GridEditor.prototype.redraw = function() {
    for (var i = 0; i < this.master.tasks.length; i++) {
        this.refreshTaskRow(this.master.tasks[i]);
    }
};

GridEditor.prototype.reset = function() {
    this.element.find("[taskId]").remove();
};


GridEditor.prototype.bindRowEvents = function(task, taskRow) {
    var self = this;
    //console.debug("bindRowEvents",this,this.master,this.master.canWrite);
    if (this.master.canWrite) {
        self.bindRowInputEvents(task, taskRow);

    } else { //cannot write: disable input
        taskRow.find("input").attr("readonly", true);
    }

    taskRow.find(".edit").click(function() {
        self.openFullEditor(task, taskRow)
    });

};


GridEditor.prototype.bindRowInputEvents = function(task, taskRow) {
    var self = this;

    //bind dateField on dates
    taskRow.find(".date").each(function() {
        var el = $(this);

        el.click(function() {
            var inp = $(this);
            inp.dateField({
                inputField: el
            });
        });

        el.blur(function(date) {
            var inp = $(this);
            if (inp.isValueChanged()) {
                if (!Date.isValid(inp.val())) {
                    alert(GanttMaster.messages["INVALID_DATE_FORMAT"]);
                    inp.val(inp.getOldValue());

                } else {
                    var date = Date.parseString(inp.val());
                    var row = inp.closest("tr");
                    var taskId = row.attr("taskId");
                    var task = self.master.getTask(taskId);
                    var lstart = task.start;
                    var lend = task.end;

                    if (inp.attr("name") == "start") {
                        lstart = date.getTime();
                        if (lstart >= lend) {
                            var end_as_date = new Date(lstart);
                            lend = end_as_date.add('d', task.duration).getTime();
                        }

                        //update task from editor
                        self.master.beginTransaction();
                        self.master.moveTask(task, lstart);
                        self.master.endTransaction();

                    } else {
                        var end_as_date = new Date(date.getTime());
                        lend = end_as_date.getTime();
                        if (lstart >= lend) {
                            end_as_date.add('d', -1 * task.duration);
                            lstart = end_as_date.getTime();
                        }

                        //update task from editor
                        self.master.beginTransaction();
                        self.master.changeTaskDates(task, lstart, lend);
                        self.master.endTransaction();
                    }


                    inp.updateOldValue(); //in order to avoid multiple call if nothing changed
                }
            }
        });
    });


    //binding on blur for task update (date exluded as click on calendar blur and then focus, so will always return false, its called refreshing the task row)
    taskRow.find("input:not(.date)").focus(function() {
        $(this).updateOldValue();

    }).blur(function() {
        var el = $(this);
        if (el.isValueChanged()) {
            var row = el.closest("tr");
            var taskId = row.attr("taskId");

            var task = self.master.getTask(taskId);

            //update task from editor
            var field = el.attr("name");

            self.master.beginTransaction();

            if (field == "depends") {

                var oldDeps = task.depends;
                task.depends = el.val();
                // update links
                var linkOK = self.master.updateLinks(task);
                if (linkOK) {
                    //synchronize status fro superiors states
                    var sups = task.getSuperiors();
                    for (var i = 0; i < sups.length; i++) {
                        if (!sups[i].from.synchronizeStatus())
                            break;
                    }

                    self.master.changeTaskDates(task, task.start, task.end);
                }

            } else if (field == "duration") {

                var dur = task.duration;

                if (parseInt(el.val()) == 0) {
                    console.log("Entroooo histeando");
                    task.startIsMilestone = true;
                    task.endIsMilestone = true;
                }
                else {
                    task.startIsMilestone = false;
                    task.endIsMilestone = false;
                }

                dur = parseInt(el.val()) || 1;

                console.log(task.startIsMilestone);
                if (task.startIsMilestone == true) {
                    dur = 0;
                }

                el.val(dur);
                var newEnd = computeEndByDuration(task.start, dur);
                self.master.changeTaskDates(task, task.start, newEnd);

            } else {
                task[field] = el.val();
            }
            self.master.endTransaction();
        }
    });


    //change status
    taskRow.find(".taskStatus").click(function() {
        var el = $(this);
        var tr = el.closest("[taskId]");
        var taskId = tr.attr("taskId");
        var task = self.master.getTask(taskId);

        var changer = $.JST.createFromTemplate({}, "CHANGE_STATUS");
        changer.css("top", tr.position().top + self.element.parent().scrollTop());
        changer.find("[status=" + task.status + "]").addClass("selected");
        changer.find(".taskStatus").click(function() {
            self.master.beginTransaction();
            task.changeStatus($(this).attr("status"));
            self.master.endTransaction();
            el.attr("status", task.status);
            changer.remove();
            el.show();

        });
        el.hide().oneTime(3000, "hideChanger", function() {
            changer.remove();
            $(this).show();
        });
        el.after(changer);
    });


    /*//expand collapse todo to be completed
     taskRow.find(".expcoll").click(function(){
     //expand?
     var el=$(this);
     var taskId=el.closest("[taskId]").attr("taskId");
     var task=self.master.getTask(taskId);
     var descs=task.getDescendant();
     if (el.is(".exp")){
     for (var i=0;i<descs.length;i++)
     descs[i].rowElement.show();
     } else {
     for (var i=0;i<descs.length;i++)
     descs[i].rowElement.hide();
     }
     
     });*/

    //bind row selection
    taskRow.click(function() {
        var row = $(this);
        //var isSel = row.hasClass("rowSelected");
        row.closest("table").find(".rowSelected").removeClass("rowSelected");
        row.addClass("rowSelected");

        //set current task
        self.master.currentTask = self.master.getTask(row.attr("taskId"));

        //move highlighter
        if (self.master.currentTask.ganttElement)
            self.master.gantt.highlightBar.css("top", self.master.currentTask.ganttElement.position().top);

        //if offscreen scroll to element
        var top = row.position().top;
        if (row.position().top > self.element.parent().height()) {
            self.master.gantt.element.parent().scrollTop(row.position().top - self.element.parent().height() + 100);
        }
    });

};



GridEditor.prototype.openFullEditor = function(task, taskRow) {

    var self = this;
    //alert("11111");
    //task editor in popup
    var taskId = taskRow.attr("taskId");
    //console.debug(task);

    //make task editor
    var taskEditor = $.JST.createFromTemplate({}, "TASK_EDITOR");

    taskEditor.find("#name").val(task.name);

    /**** Asignar wbsNodes *****/
    var selectwbs = taskEditor.find("#wbsNodes");


    //console.log(selectwbs);

    $.each(ge.wbsNodes, function(e, el) {
        var escritor = "";
        escritor += '<option value ="' + el.id + '">';
        escritor += el.name;
        escritor += '</option>';
        selectwbs.append(escritor);
    });

    //console.log(task);

    selectwbs.val(task.id_Wbs);


    if (task.id_Wbs == null) {
        selectwbs.val(1);
        taskEditor.find("#colchon").text('0');
    }
    else {
        var paquetes = ge.wbsNodes;
        for (var i = 0; i < paquetes.length; i++) {
            if (paquetes[i].id == task.id_Wbs) {
                taskEditor.find("#colchon").text(paquetes[i].colchon/*'ñacañaca'+task.id_Wbs*/);

                break;
            }
        }

    }


    //console.log(selectwbs.val());
    /**** Fin Asignar wbsNodes *****/




    taskEditor.find("#description").val(task.description);
    taskEditor.find("#code").val(task.code);
    taskEditor.find("#progress").val(task.progress ? parseFloat(task.progress) : 0);
    taskEditor.find("#progress_cost").val(task.progress_cost ? parseFloat(task.progress_cost) : 0);
    taskEditor.find("#status").attr("status", task.status);
    //console.log(taskEditor.find("#colchon"));
    //console.log("dddddd");
    //console.log(ge);
    //console.log("dddddd");

    //taskEditor.find("#colchon").text('0'+task.id_Wbs);
    //nadal


    taskEditor.find("#code").keypress(function(event) {

        return permite(this, event, 'numCar', false)

    });


    taskEditor.find("#name").keypress(function(event) {

        return permite(this, event, 'numCar', false)

    });

    taskEditor.find("#description").keypress(function(event) {

        return permite(this, event, 'numCar', false)

    });


    taskEditor.find("#duration").keypress(function(event) {

        return permite(this, event, 'num', false)

    });

    taskEditor.find("#progress").keypress(function(event) {

        return permite(this, event, 'num', true)

    });


    taskEditor.find("#progress_cost").keypress(function(event) {

        return permite(this, event, 'num', true)

    });




    if (ge.lineabase == "true") {

        taskEditor.find("#code").attr("disabled", true);
        taskEditor.find("#name").attr("disabled", true);
        taskEditor.find("#wbsNodes").attr("disabled", true);
        taskEditor.find("#description").attr("disabled", true);
        taskEditor.find("#start").attr("disabled", true);
        taskEditor.find("#end").attr("disabled", true);
        taskEditor.find("#duration").attr("disabled", true);
         taskEditor.find("#addAssig").hide();
        //taskEditor.find("#duration").attr("disabled", true);
        //  taskEditor.find("#tipoCosto").attr("disabled", true);


    } else {

        taskEditor.find("#progress").attr("disabled", true);
        taskEditor.find("#progress_cost").attr("disabled", true);
        taskEditor.find("#realStart").attr("disabled", true);
        taskEditor.find("#realEnd").attr("disabled", true);

    }



    if (task.startIsMilestone)
        taskEditor.find("#startIsMilestone").attr("checked", true);
    if (task.endIsMilestone)
        taskEditor.find("#endIsMilestone").attr("checked", true);

    taskEditor.find("#duration").val(task.duration);

    taskEditor.find("#start").val(new Date(task.start).format());
    taskEditor.find("#end").val(new Date(task.end).format());

    if ((task.realStart == undefined)) {
        //Caso del lapisito de un task nuevo

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '/' + mm + '/' + yyyy;

        taskEditor.find("#realStart").val(today);
        taskEditor.find("#realEnd").val(today);
    }
    else {

        var arreglo = task.realStart.split('-');

        var anhoS = arreglo[0];
        var mesS = arreglo[1];
        var diaS = arreglo[2];

        var rS = new Date(anhoS, mesS - 1, diaS);

        var arreglo2 = task.realEnd.split('-');

        var anhoE = arreglo2[0];
        var mesE = arreglo2[1];
        var diaE = arreglo2[2];

        var rE = new Date(anhoE, mesE - 1, diaE);

        taskEditor.find("#realStart").val(rS.format());
        taskEditor.find("#realEnd").val(rE.format());

    }

    //taskEditor.find("[name=depends]").val(task.depends);

    //make assignments table
    var assigsTable = taskEditor.find("#assigsTable");
    assigsTable.find("[assigId]").remove();
    // loop on already assigned resources
    for (var i = 0; i < task.assigs.length; i++) {
        var assig = task.assigs[i];
        var assigRow = $.JST.createFromTemplate({task: task, assig: assig}, "ASSIGNMENT_ROW");
        //console.log(assigRow);

        //Carga de recursos que ya estaban asignados!!!!!!!!!!!!!!!! ***
        var addelemento = $(assigRow).children('td')[0];
        var addtd1 = $(assigRow).children('td')[2];
        var addtd2 = $(assigRow).children('td')[3];
        var addtd6 = $(assigRow).children('td')[7];
        //var addCostReal = $(assigRow).find("#costRateReal");
        //var addValue = $(assigRow).find("#value");
        //var addValueReal = $(assigRow).find("#valueReal");

        addelemento = $(addelemento).find('select').attr('value');

        //console.log(addelemento);



        /**** Asignar Tipo Costo ******/

        //console.log("Task Editor");
        //console.log(assigRow);

        var selectTCosto = assigRow.find("#tipoCosto");
        console.log("Selecttttt");
        console.log(selectTCosto);

        $.each(ge.tipoCostos, function(e, el) {
            escritor = "";
            escritor += '<option value ="' + el.id + '">';
            escritor += el.name;
            escritor += '</option>';
            selectTCosto.append(escritor);
        });

        //console.log(task);

        //selectTCosto.val(task.);

        console.log("Valorrrrr: " + assig.idTipoCosto);
        selectTCosto.val(assig.idTipoCosto);
        if (assig.idTipoCosto == null) {
            selectTCosto.val(1);
        }
        //if(task.id_Wbs == null){
        //  selectwbs.val(1);
        // }


        /***** Fin asignar Tipo Costo ****/

        var recurso = ge.resources;

        $.each(recurso, function(index, element) {
            if (addelemento == element.id) {
                console.log(element);
                $(addtd1).text(element.typeCost);
                $(addtd2).text(element.costRate);
                $(addtd6).text(element.idrecurso);
            }
        });
        //nadal

        assigRow.find("[name=value]").keypress(function(event) {

            return permite(this, event, 'num', false)

        });

        assigRow.find("[name=valueReal]").keypress(function(event) {

            return permite(this, event, 'num', false)

        });

        assigRow.find("[name=costRateReal]").keypress(function(event) {

            return permite(this, event, 'num', true)

        });



        if (ge.lineabase == "true") {
            assigRow.find("[name=value]").attr('disabled', true);//
            assigRow.find("[name=resourceId]").attr('disabled', true);
            assigRow.find("[name=tipoCosto]").attr('disabled', true);
            assigRow.find("[name=costRateReal]").attr('disabled', false);
            assigRow.find("[name=valueReal]").attr('disabled', false);//
            //$(".teamworkIcon delAssig").hide();
             //$( this ).removeClass( "teamworkIcon delAssig" );
              assigRow.find(".teamworkIcon").hide();
        }
        else {
            assigRow.find("[name=costRateReal]").attr('disabled', true);//
            assigRow.find("[name=valueReal]").attr('disabled', true);
            assigRow.find("[name=value]").attr('disabled', false);
            assigRow.find("[name=resourceId]").attr('disabled', false);
            assigRow.find("[name=tipoCosto]").attr('disabled', false);
        }

        assigsTable.append(assigRow);
    }

    if (!self.master.canWrite) {
        taskEditor.find("input,textarea").attr("readOnly", true);
        taskEditor.find("input:checkbox,select").attr("disabled", true);
    } else {

        taskEditor.find("#realStart").click(function() {
            $(this).dateField({
                inputField: $(this)
            });
        });

        taskEditor.find("#realEnd").click(function() {
            $(this).dateField({
                inputField: $(this)
            });
        });


        //bind dateField on dates
        taskEditor.find("#start").click(function() {
            $(this).dateField({
                inputField: $(this),
                callback: function(date) {
                    var dur = parseInt(taskEditor.find("#duration").val());
                    date.clearTime();
                    taskEditor.find("#end").val(new Date(computeEndByDuration(date.getTime(), dur)).format());
                }
            });

        });

        //bind dateField on dates
        taskEditor.find("#end").click(function() {
            $(this).dateField({
                inputField: $(this),
                callback: function(end) {

                    taskEditor.find("#endIsMilestone").removeAttr("checked");
                    taskEditor.find("#startIsMilestone").removeAttr("checked");

                    var start = Date.parseString(taskEditor.find("#start").val());
                    end.setHours(23, 59, 59, 999);

                    if (end.getTime() < start.getTime()) {
                        var dur = parseInt(taskEditor.find("#duration").val());
                        start = incrementDateByWorkingDays(end.getTime(), -dur);
                        taskEditor.find("#start").val(new Date(computeStart(start)).format());
                    } else {
                        taskEditor.find("#duration").val(recomputeDuration(start.getTime(), end.getTime()));
                    }



                }
            });
        });


        taskEditor.find("#endIsMilestone").click(function() {
            if ($(this).is(':checked')) {
                $(this).parent().parent().find('#startIsMilestone').attr('checked', 'checked');

                var start = Date.parseString(taskEditor.find("#start").val());
                var el = taskEditor.find("#duration");
                var dur = parseInt(el.val());
                dur = dur <= 0 ? 1 : dur;
                if (taskEditor.find("#startIsMilestone").is(":checked")) {
                    dur = 0;
                }
                el.val(dur);
                taskEditor.find("#end").val(new Date(computeEndByDuration(start.getTime(), dur)).format());
            }
            else {
                $(this).parent().parent().find('#startIsMilestone').removeAttr('checked');
                var start = Date.parseString(taskEditor.find("#start").val());
                var el = taskEditor.find("#duration");
                var dur = parseInt(el.val());
                dur = dur <= 0 ? 1 : dur;
                if (taskEditor.find("#startIsMilestone").is(":checked")) {
                    dur = 0;
                }
                el.val(dur);
                taskEditor.find("#end").val(new Date(computeEndByDuration(start.getTime(), dur)).format());
            }
        });

        //bind blur on duration
        taskEditor.find("#duration").change(function() {

            var start = Date.parseString(taskEditor.find("#start").val());
            var el = $(this);
            var dur = parseInt(el.val());

            if (dur == 0) {
                taskEditor.find("#startIsMilestone").attr("checked", "checked");
                taskEditor.find("#endIsMilestone").attr("checked", "checked");

                var start = Date.parseString(taskEditor.find("#start").val());
                var el2 = taskEditor.find("#duration");
                var dur = parseInt(el2.val());
                dur = dur <= 0 ? 1 : dur;
                if (taskEditor.find("#startIsMilestone").is(":checked")) {
                    dur = 0;
                }
                el2.val(dur);
                taskEditor.find("#end").val(new Date(computeEndByDuration(start.getTime(), dur)).format());

            }
            else {
                taskEditor.find("#startIsMilestone").removeAttr("checked");
                taskEditor.find("#endIsMilestone").removeAttr("checked");

                var start = Date.parseString(taskEditor.find("#start").val());
                var el2 = taskEditor.find("#duration");
                var dur = parseInt(el2.val());
                dur = dur <= 0 ? 1 : dur;
                if (taskEditor.find("#startIsMilestone").is(":checked")) {
                    dur = 0;
                }
                el2.val(dur);
                taskEditor.find("#end").val(new Date(computeEndByDuration(start.getTime(), dur)).format());
            }

            dur = dur <= 0 ? 1 : dur;

            if (taskEditor.find("#startIsMilestone").is(":checked")) {
                dur = 0;
            }

            el.val(dur);
            taskEditor.find("#end").val(new Date(computeEndByDuration(start.getTime(), dur)).format());
        });

        //bind add assignment
        taskEditor.find("#addAssig").click(function() {
            console.log(task);


            if (task.status == "STATUS_DONE") {
                alert("No se puede agregar recursos a una actividad completada");
            }


            else {
                var assigsTable = taskEditor.find("#assigsTable");
                var assigRow = $.JST.createFromTemplate({task: task, assig: {id: "tmp_" + new Date().getTime()}}, "ASSIGNMENT_ROW");
                //Agrego el valor determinado para cada recurso, cuando se agrega un nuevo recurso
                var addelemento = $(assigRow).children('td')[0];
                var addtd1 = $(assigRow).children('td')[2];
                var addtd2 = $(assigRow).children('td')[3];
                var addtd6 = $(assigRow).children('td')[7];

                addelemento = $(addelemento).find('select').attr('value');

                var recurso = ge.resources;

                $.each(recurso, function(index, element) {
                    if (addelemento == element.id) {
                        //console.log(element);
                        $(addtd1).text(element.typeCost);
                        $(addtd2).text(element.costRate);
                        $(addtd6).text(element.idrecurso);
                    }
                });
                //Fin inicializacion del primer recurso

                /**** Asignar Tipo Costo ******/

                //console.log("Task Editor");
                //console.log(assigRow);

                var selectTCosto = assigRow.find("#tipoCosto");
                console.log("Selecttttt");
                console.log(selectTCosto);

                $.each(ge.tipoCostos, function(e, el) {
                    escritor = "";
                    escritor += '<option value ="' + el.id + '">';
                    escritor += el.name;
                    escritor += '</option>';
                    selectTCosto.append(escritor);
                });

                //console.log(task);

                //selectTCosto.val(task.);

                //console.log("Valorrrrr: " + assig.idTipoCosto);
                //console.log(assig);

                selectTCosto.val(1);



                /***** Fin asignar Tipo Costo ****/
                //nadal
                
                 
                
                assigRow.find("[name=value]").keypress(function(event) {

                    return permite(this, event, 'num', false)

                });

                assigRow.find("[name=valueReal]").keypress(function(event) {

                    return permite(this, event, 'num', false)

                });

                assigRow.find("[name=costRateReal]").keypress(function(event) {

                    return permite(this, event, 'num', true)

                });



                if (ge.lineabase == "true") {
                    assigRow.find("[name=value]").attr('disabled', true);
                    assigRow.find("[name=resourceId]").attr('disabled', true);
                    assigRow.find("[name=tipoCosto]").attr('disabled', true);
                    assigRow.find(".teamworkIcon").hide();
                }
                else {
                    assigRow.find("[name=costRateReal]").attr('disabled', true);
                    assigRow.find("[name=valueReal]").attr('disabled', true);
                }
                assigsTable.append(assigRow);



            }
        });

        taskEditor.find("#status").click(function() {
            var tskStatusChooser = $(this);
            var changer = $.JST.createFromTemplate({}, "CHANGE_STATUS");
            changer.css("top", tskStatusChooser.position().top);
            changer.find("[status=" + task.status + "]").addClass("selected");
            changer.find(".taskStatus").click(function() {
                tskStatusChooser.attr("status", $(this).attr("status"));
                changer.remove();
                tskStatusChooser.show();
            });
            tskStatusChooser.hide().oneTime(3000, "hideChanger", function() {
                changer.remove();
                $(this).show();
            });
            tskStatusChooser.after(changer);
        });

        //save task
        taskEditor.find("#saveButton").click(function() {
            var task = self.master.getTask(taskId); // get task again because in case of rollback old task is lost
            var wbsNodes = ge.wbsNodes;

            //console.log("WBS NODES");
            //console.log(wbsNodes);

            self.master.beginTransaction();
            task.name = taskEditor.find("#name").val();

            task.id_Wbs = taskEditor.find("#wbsNodes").val();

            $.each(wbsNodes, function(e, el) {
                if (el.id == task.id_Wbs) {
                    task.wbsNode = el.name;
                }
            });


            task.description = taskEditor.find("#description").val();
            task.code = taskEditor.find("#code").val();
            task.progress = parseFloat(taskEditor.find("#progress").val());
            task.progress_cost = parseFloat(taskEditor.find("#progress_cost").val());
            task.duration = parseInt(taskEditor.find("#duration").val());
            task.startIsMilestone = taskEditor.find("#startIsMilestone").is(":checked");
            task.endIsMilestone = taskEditor.find("#endIsMilestone").is(":checked");

            var a11 = taskEditor.find("#realStart").val();
            var a22 = taskEditor.find("#realEnd").val();

            var auxA1 = a11.split('/');

            var an1 = auxA1[2];
            var me1 = auxA1[1];
            var di1 = auxA1[0];

            var auxA2 = a22.split('/');

            var an2 = auxA2[2];
            var me2 = auxA2[1];
            var di2 = auxA2[0];

            task.realStart = an1 + "-" + me1 + "-" + di1;
            task.realEnd = an2 + "-" + me2 + "-" + di2;

            //task.realStart = taskEditor.find("#realStart").val();
            //task.realEnd = taskEditor.find("#realEnd").val();

            console.log(task.realStart);
            console.log(task.realEnd);

            //set assignments
            taskEditor.find("tr[assigId]").each(function() {
                //console.log($(this));
                var trAss = $(this);
                var assId = trAss.attr("assigId");
                var resId = trAss.find("[name=resourceId]").val();
                var roleId = trAss.find("[name=roleId]").val();
                var effort = millisFromString(trAss.find("[name=effort]").val());
                var typeCost = trAss.find("[name=typeCost]").text();
                //Arreglar que no cogue porque el name esta en el td

                var costRate = trAss.find("[name=costRate]").text();
                var value = trAss.find("[name=value]").attr("value");
                var idrecurso = trAss.find("[name=idrecurso]").text();
                var costRateReal = trAss.find("[name=costRateReal]").attr("value");
                var valueReal = trAss.find("[name=valueReal]").attr("value");
                var idTipoCosto = trAss.find("[name=tipoCosto]").val();

                console.log("IDTIPOCOSTO: " + idTipoCosto);

                //check if an existing assig has been deleted and re-created with the same values
                var found = false;
                for (var i = 0; i < task.assigs.length; i++) {
                    var ass = task.assigs[i];

                    if (assId == ass.id) {
                        ass.effort = effort;
                        ass.roleId = roleId;
                        ass.resourceId = resId;
                        ass.typeCost = typeCost;
                        ass.costRate = costRate;
                        ass.value = value;
                        ass.idrecurso = idrecurso;
                        ass.costRateReal = costRateReal;
                        ass.valueReal = valueReal;
                        ass.idTipoCosto = idTipoCosto;
                        ass.touched = true;
                        found = true;
                        break;

                    } else if (roleId == ass.roleId && resId == ass.resourceId) {
                        ass.effort = effort;
                        ass.typeCost = typeCost;
                        ass.costRate = costRate;
                        if (value == "")
                            value = 0;
                        ass.value = parseInt(ass.value) + parseInt(value);
                        ass.idrecurso = idrecurso;
                        ass.costRateReal = costRateReal;
                        ass.valueReal = valueReal;
                        ass.idTipoCosto = idTipoCosto;
                        ass.touched = true;
                        found = true;
                        break;

                    }
                }

                if (!found) { //insert
                    //console.log("Valor nuevo: " + value);
                    var ass = task.createAssignment("tmp_" + new Date().getTime(), resId, roleId, effort, typeCost, costRate, value, idrecurso, costRateReal, valueReal, idTipoCosto);
                    //console.log(ass);
                    ass.touched = true;
                }

            });


            //remove untouched assigs
            task.assigs = task.assigs.filter(function(ass) {
                var ret = ass.touched;
                delete ass.touched;
                return ret;
            });



            //change dates
            task.setPeriod(Date.parseString(taskEditor.find("#start").val()).getTime(), Date.parseString(taskEditor.find("#end").val()).getTime() + (3600000 * 24));
            //task.setPeriod(Date.parseString(taskEditor.find("#realStart").val()).getTime(), Date.parseString(taskEditor.find("#realEnd").val()).getTime() + (3600000 * 24));

            //change status
            task.changeStatus(taskEditor.find("#status").attr("status"));
            var gg;
            for (var i = 0; i < task.assigs.length; i++) {
                var ass = task.assigs[i];
                if (ass.valueReal > task.duration * 8) {
                    alert("Alguno de los recursos sobrepasa la capacidad máxima de horas asignadas en la actividad");
                    return false;
                }
                for (var j = 0; j < ge.tasks.length; j++) {

                    var tsk = ge.tasks[j];
                    if (task.id == tsk.id) {
                        gg = tsk.id
                    }
                    var date_start_1 = new Date(task.start);
                    var date_end_1 = new Date(task.end);

                    var date_start_2 = new Date(tsk.start);
                    var date_end_2 = new Date(tsk.end);
                    if ((date_start_1 >= date_start_2 && date_start_1 <= date_end_2) || (date_end_1 >= date_start_2 && date_start_1 <= date_end_2)) {
                        //if ((task.startIsMilestone > tsk.startIsMilestone && task.startIsMilestone < tsk.endIsMilestone) || (task.endIsMilestone > tsk.startIsMilestone && task.endIsMilestone < tsk.endIsMilestone)){
                        for (var k = 0; k < tsk.assigs.length; k++) {
                            var asg = tsk.assigs[k];
                            if (asg.idrecurso == ass.idrecurso && ass.typeCost == "HORAS HOMBRE" && tsk.id != task.id) {

                                console.log(asg.idrecurso);
                                console.log(ass.idrecurso);
                                console.log(ass.typeCost);
                                alert('En la fila ' + (j + 1) + ', la actividad ' + tsk.name + ' ya tiene asignado al recurso ' + ((asg.descripcion_recurso == null) ? k + 1 : asg.descripcion_recurso) + ' en fechas que comparten algunos dias de trabajo');

                                return false;
                            }
                        }
                    }
                }
            }

            if (self.master.endTransaction()) {
                $("#__blackpopup__").trigger("close");
            }


        });
    }

    var ndo = createBlackPage(800, 500).append(taskEditor);

};
