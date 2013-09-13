Ext.ns('App');

//Ext.Loader.setConfig({enabled: true, disableCaching : false });
//Ext.Loader.setPath('Sch', '../../../ExtScheduler2.x/js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.data.ResourceStore',
    'Gnt.data.AssignmentStore',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Gnt.column.ResourceAssignment',
    'Gnt.column.Duration',
    'Sch.plugin.TreeCellEditing',
    'Gnt.widget.AssignmentCellEditor',
    'Gnt.widget.calendar.Calendar',
    'Gnt.widget.calendar.ResourceCalendarGrid',
    'Gnt.data.calendar.BusinessTime',
    'Gnt.panel.Gantt'
]);

Ext.define('Calendar', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: ['Id', 'Name']
});

Ext.onReady(function() {
    App.Gantt.initStores();
    App.Gantt.init();
});

App.Gantt = {

    // Initialize stores
    initStores: function () {
        var AG = App.Gantt;

        var calendarStore = Ext.create('Ext.data.Store', {
            model : 'Calendar'
        });

        var calendarsCount = 2;
        var onCalendarLoad = function(){
            if(--calendarsCount > 0) return;

            var result = [];
            Ext.Array.each(Gnt.data.Calendar.getAllCalendars(), function(cal){
                result.push({
                    Id      : cal.calendarId,
                    Name    : cal.name || cal.calendarId
                });
            });

            calendarStore.add(result);
        };


        var rootCalendar = new Gnt.data.calendar.BusinessTime({
            calendarId      : 'General',
            name            : "General",
            autoLoad        : true,
            proxy           : {
                type    : 'ajax',
                api     : { read : 'rootCalendarData.js' },
                reader  : { type : 'json' }
            },
            listeners       : {
                beforesync      : function() { return false; },
                load            : onCalendarLoad
            }
        });

        var holidaysCalendar    = new Gnt.data.calendar.BusinessTime({
            calendarId      : 'Holidays',
            name            : "Holidays",
            autoLoad        : true,
            proxy           : {
                type    : 'ajax',
                api     : { read : 'holidaysCalendarData.js' },
                reader  : { type : 'json' }
            },
            listeners       : {
                beforesync      : function() { return false; },
                load            : onCalendarLoad
            }
        });

        var nightShiftCalendar = new Gnt.data.calendar.BusinessTime({
            calendarId              : 'NightShift',
            name                    : "Night shift",
            defaultAvailability     : [ '00:00-06:00', '22:00-24:00' ]
        });

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            autoLoad        : true,
            calendar        : rootCalendar,

            proxy : {
                type    : 'ajax',
                method  : 'GET',
                url     : 'tasks.js',
                reader  : {
                    type        : 'json'
                }
            },
            sorters: [{
                property        : 'leaf',
                direction       : 'ASC'
            }]
        });

        var resourceStore = Ext.create("Gnt.data.ResourceStore", {
            model : 'Gnt.model.Resource',
            taskStore : taskStore
        });

        var assignmentStore = Ext.create("Gnt.data.AssignmentStore", {
            autoLoad        : true,
//        autoSync : true, // uncomment to send updates automatically to server

            // Must pass a reference to resource store
            resourceStore   : resourceStore,
            proxy           : {
                method  : 'GET',
                type    : 'ajax',
                api     : {
                    read : 'assignmentdata.js'
//                uncomment and provide your urls to connect with your backend
//                ,
//                create : 'create.php',
//                update : 'update.php',
//                destroy : 'delete.php'
                },
                reader  : {
                    type    : 'json',
                    root    : 'assignments'
                }
            },
            listeners       : {
                load : function() {
                    resourceStore.loadData(this.proxy.reader.jsonData.resources);
                }
            }
        });

        var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            autoLoad    : true,
            proxy       : {
                type    : 'ajax',
                url     : 'dependencies.xml',
                method  : 'GET',
                reader  : {
                    type        : 'xml',
                    root        : 'Links',
                    record      : 'Link' // records will have a 'Link' tag
                }
            }
        });

        AG.calendarStore        = calendarStore;
        AG.dependencyStore      = dependencyStore;
        AG.taskStore            = taskStore;
        AG.assignmentStore      = assignmentStore;
        AG.resourceStore        = resourceStore;
        AG.nightShiftCalendar   = nightShiftCalendar;
        AG.generalCalendar      = rootCalendar;
    },

    // Initialize application
    init: function () {
        var AG = App.Gantt;

        var startDate   = new Date(2010, 0, 11);
        var endDate     = Sch.util.Date.add(new Date(2010, 0, 11), Sch.util.Date.WEEK, 10);

        var gantt = Ext.create('Gnt.panel.Gantt', {
            height                      : ExampleDefaults.height,
            width                       : ExampleDefaults.width,
            renderTo                    : 'example-container',
            lockedGridConfig            : { width : 300 },
            leftLabelField              : 'Name',

            loadMask                    : true,
            enableProgressBarResize     : true,
            enableDependencyDragDrop    : false,
            highlightWeekends           : true,
//            weekendsAreWorkdays                : false,  // uncomment to disable the skipping weekends/holidays functionality completely (empty calendar)
                                                    // (for compatibility with 1.x)

//            skipWeekendsDuringDragDrop  : false,  // uncomment to disable the skipping weekends/holidays functionality during d&d operations

            viewPreset      : 'weekAndDayLetter',

            startDate       : startDate,
            endDate         : endDate,

            // Setup your static columns
            columns         : [
                {
                    header      : 'Calendar',
                    dataIndex   : 'CalendarId',
                    width       : 100,
                    renderer    : function(value, meta, record, col, index, store) {
                        if (!value) {
                            meta.tdCls = 'gnt-default';
                            value = store.calendar ? store.calendar.calendarId : "";
                        }

                        var rec = AG.calendarStore.getById(value);

                        return rec ? rec.get('Name') : value;
                    },
                    editor      : new Gnt.field.Calendar()
                },
                {
                    xtype       : 'namecolumn',
                    text        : 'List of tasks',
                    sortable    : true,
                    width       : 180
                },
                {
                    xtype       : 'startdatecolumn',
                    width       : 80
                },
                {
                    xtype       : 'enddatecolumn',
                    width       : 80
                },
                {
                    xtype       : 'durationcolumn',
                    width       : 70
                },
                {
                    text        : '% Done',
                    sortable    : true,
                    dataIndex   : 'PercentDone',
                    width       : 50,
                    align       : 'center'
                },
                {
                    xtype       : 'resourceassignmentcolumn',
                    text        : 'Assigned Resources',
                    width       : 150
                }
            ],

            taskStore           : AG.taskStore,
            dependencyStore     : AG.dependencyStore,
            assignmentStore     : AG.assignmentStore,
            resourceStore       : AG.resourceStore,

            plugins             : [
                Ext.create('Sch.plugin.TreeCellEditing', {
                    clicksToEdit    : 1,
                    listeners       : {
                        beforeedit : function (editing, context) {
                            if (context && context.field === 'CalendarId') {
                                if (editing.activeEditor && editing.activeEditor.field.setTask) {
                                    editing.activeEditor.field.setTask(context.record);
                                }
                            }
                        }
                    }
                })
            ],
            tbar                : [{
                iconCls : 'gnt-date',
                text : 'Edit working time',
                handler: function(){
                    var editorWindow  = new Gnt.widget.calendar.CalendarWindow({
                        calendar        : AG.generalCalendar
                    })

                    editorWindow.show()
                }
            },
            {
                iconCls : 'gnt-date',
                text : 'Resource calendars',
                handler: function(){
                    if (!gantt.calendarWindow) {
                        var grid = new Gnt.widget.calendar.ResourceCalendarGrid({
                            resourceStore: AG.resourceStore,
                            calendarStore : AG.calendarStore
                        });
                        gantt.calendarWindow = Ext.create('Ext.window.Window', {
                            title: 'Resource calendars',
                            modal: true,
                            width: 300,
                            layout : 'fit',
                            closeAction : 'hide',

                            buttons:[{
                                text: 'OK',
                                handler: function(){
                                    this.up('window').close();
                                }
                            },{
                                text: 'Cancel',
                                handler: function(){
                                    this.up('window').close();
                                }
                            }],

                            items : grid
                        });
                    }

                    gantt.calendarWindow.show();
                }
            }]
        });
    }
};
