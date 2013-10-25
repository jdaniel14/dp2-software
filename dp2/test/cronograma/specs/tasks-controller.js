describe('TasksController', function (){
    'use strict';
    var tasksController, tasksView, tasksContainer;

    beforeEach(function (){
        tasksContainer = {
            tasks: [],
            fetch: function(callback){
                this.tasks = [
                    {name: "task-1"}, {name: "task-2"}
                ];
                callback();
            }
        };
        tasksView = {
            bind: function(tasks){
                this.tasks = tasks;
            },
            tasks: []
        };
        tasksController = new TasksController({
            tasksContainer: tasksContainer,
            tasksView: tasksView
        });
    });

    describe('#loadTasks()', function(){
       it('should pass the tasks from the container to the view', function(){
           tasksController.loadTasks();
           tasksView.tasks.should.have.length(2);
       });
    });
});