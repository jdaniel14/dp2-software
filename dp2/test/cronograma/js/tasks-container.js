!(function(module) {
    'use strict';
    var TasksContainer = function(tasksRepository) {
        var tasks = [],
            repository = tasksRepository;
        this.fetch = function (callback) {
            repository.list(function(fetchedTasks) {
                tasks = fetchedTasks;
                callback();
            });
        };
        this.__defineGetter__("tasks", function(){
            return tasks;
        });
    };
    module.TasksContainer = TasksContainer;
})(this);