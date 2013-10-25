!(function(module) {
    'use strict';
    var TasksView = function(element) {
        var taskTemplate = 
                        '<header><h1 class="name">{{name}}</h1><p>{{description}}</p></header>';
                        
        this.bind = function(tasks) {
            var tasksBounded = [];
            
            for(var index = 0, len = tasks.length; index < len; index++) {
                var task = tasks[index];
                var taskBounded = taskTemplate
                            .replace(/{{name}}/g, task.name)
                            .replace(/{{description}}/g, task.description)
                tasksBounded.push(taskBounded);
            }
            element.innerHTML = tasksBounded.join('');
        };
    };
    module.TasksView = TasksView;
})(this);