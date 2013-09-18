Ext.ns('App');

var taskStore;
var dependencyStore;
var resourceStore;
var assignmentStore;

Ext.Loader.setConfig({
    enabled: true,
    disableCaching : true,
    paths : {
        'Gnt'   : '../../js/Gnt',
        'Sch'   : '../../../ExtScheduler2.x/js/Sch',
        'MyApp' : './js'
    }
});

Ext.require([
    'MyApp.DemoGanttPanel'
]);

Ext.onReady(function() {
    App.Gantt.init();

    Ext.QuickTips.init();
    
    //alert("done");
    //console.log(taskStore.toArray());
});
//$('bryntum-trial').hide();
App.Gantt = {

    // Initialize application
    init : function(serverCfg) {
        this.gantt = this.createGantt();

        var vp = Ext.create("Ext.Viewport", {
            layout  : 'fit',
            items   : this.gantt
        });
    },

    createGantt : function() {

        Ext.define('MyTaskModel', {
            extend : 'Gnt.model.Task',

            // A field in the dataset that will be added as a CSS class to each rendered task element
            clsField : 'TaskType',
            fields : [
                { name : 'TaskType', type : 'string' },
                { name : 'Color', type : 'string'}
            ]
        });

        taskStore = Ext.create("Gnt.data.TaskStore", {
            model : 'MyTaskModel',
            proxy : {
                type    : 'ajax',
                method  : 'GET',
                url     : 'data/tasks.js',
                reader  : {
                    type : 'json'
                }
            },
            rootVisible : false,
            root : {
                Id          : '',
                Name        : 'Create awesome product',
                expanded    : true
            }
        });

        dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            autoLoad : true,
            proxy: {
                type : 'ajax',
                url: 'data/dependencies.js',
                method: 'GET',
                reader: {
                    type : 'json'
                }
            }
        });

        resourceStore = Ext.create('Gnt.data.ResourceStore', {
            model : 'Gnt.model.Resource'
        });

        assignmentStore = Ext.create('Gnt.data.AssignmentStore', {
            autoLoad    : true,
            // Must pass a reference to resource store
            resourceStore : resourceStore,
            proxy : {
                type    : 'ajax',
                url     : 'data/assignmentdata.js',
                method  : 'GET',
                reader  : {
                    type : 'json',
                    root : 'assignments'
                }
            },
            listeners : {
                load : function() {
                    resourceStore.loadData(this.proxy.reader.jsonData.resources);
                    
                }
            }
        });
        
        

        var g = Ext.create("MyApp.DemoGanttPanel", {
            region          : 'center',
            rowHeight       : 26,
            selModel        : new Ext.selection.TreeModel({
                ignoreRightMouseSelection   : false,
                mode                        : 'MULTI'
            }),
            taskStore       : taskStore,
            dependencyStore : dependencyStore,
            assignmentStore : assignmentStore,
            resourceStore   : resourceStore,

            //snapToIncrement : true,    // Uncomment this line to get snapping behavior for resizing/dragging.
            columnLines     : false,

            startDate       : new Date(2010,0,11),
            endDate         : Sch.util.Date.add(new Date(2010,0,4), Sch.util.Date.WEEK, 20),

            viewPreset      : 'weekAndDayLetter'
        });

        g.on({
            dependencydblclick : function(ga, rec) {
                var from    = taskStore.getNodeById(rec.get('From')).get('Name'),
                    to      = taskStore.getNodeById(rec.get('To')).get('Name');

                Ext.Msg.alert('Hey', Ext.String.format('You clicked the link between "{0}" and "{1}"', from, to));
            },
            timeheaderdblclick : function(col, start, end) {
                Ext.Msg.alert('Hey', 'You click header cell : ' + Ext.Date.format(start, 'Y-m-d') + ' - ' + Ext.Date.format(end, 'Y-m-d'));
            }
        });
        
        
        //console.log(assignmentStore.getTaskStore());
        //alert(g);
        //console.log(taskStore.toArray());
        return g;
    }
};



