describe('TasksView',function(){
   'use strict';
    var tasksView, tasks, taskListElement;

    before(function(){
       taskListElement = document.createElement('section');
    });

    beforeEach(function(){
       tasks = [
           {
               name: "task-1"
           },
           {
               name: "task-2"
           }
       ];
       tasksView = new TasksView(taskListElement);
    });

    afterEach(function(){
       taskListElement.innerHTML = '';
    });

    describe('#bind(tasks)', function(){
        it('should bind the tasks properties with the template', function(){
            taskListElement.children.should.have.length(0);
            tasksView.bind(tasks);
            taskListElement.children.should.have.length(2);
            taskListElement.querySelector('.name').innerHTML.should().match(/task-1/);
        });

        it('should render every assignments of the task',function(){
            tasksView.bind(tasks);
            taskListElement.children[0].querySelector('section>p').innerHTML.should.match(/resource-1,resource-2/);
            taskListElement.children[1].querySelector('section>p').innerHTML.should.match(/resource-3,resource-4/);
        });
    });
});