!(function(module) {
    'use strict';
    var TasksView = function(element) {
        var taskTemplate = 
                        '<header><h1 class="name">{{name}}</h1><p>{{description}}</p></header><section><h2>Assignments resources</h2><p>{{resources}}</p></section>';
                        
        this.bind = function(tasks) {
            var tasksBounded = [];
            
            for(var index = 0, len = tasks.length; index < len; index++) {
                var task = tasks[index];
                var taskBounded = taskTemplate
                            .replace(/{{name}}/g, task.name)
                            .replace(/{{description}}/g, task.description)
                            .replace(/{{resources}}/g, resourcesToHtml(task.resources));
                tasksBounded.push(taskBounded);
            }
            element.innerHTML = tasksBounded.join('');
        };

        function resourcesToHtml(resources){
            var resourcesNames = resources.map(function(resource){
               return resource.name;
            });
            return resourcesNames.join(', ');
        }
    };
    module.TasksView = TasksView;
})(this);