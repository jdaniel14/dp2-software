!(function(module) {
    'use strict';
    var TasksRepository = function(tasksUri, jsonFetcher) {
        var fetcher = jsonFetcher;
        this.list = function(callback) {
            fetcher.getJSON(tasksUri, function(data) {
                callback(data.tasks);
            });
        };
    };
    module.TasksRepository = TasksRepository;
})(this);