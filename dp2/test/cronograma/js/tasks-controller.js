!(function (module) {
    var TasksController = function(params) {
        var tasksContainer = params.tasksContainer,
            tasksView = params.tasksView;
            
        this.loadTasks = function() {
            tasksContainer.fetch(function() {
                tasksView.bind(tasksContainer.tasks);
            });
        };
    };
    module.TasksController = TasksController;
})(this);