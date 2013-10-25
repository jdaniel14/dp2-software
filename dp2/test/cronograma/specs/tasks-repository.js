describe('TasksRepository',function(){
   var tasksRepository, data, tasksUri = '/ws/tasks';
   'use strict';

    beforeEach(function(){
        var jsonFetcher = {
            getJSON : function(url, success){
                if(url !== tasksUri){
                    return;
                }
                success(data);
            }
        };
        data = {};
        tasksRepository = new TasksRepository(tasksUri,jsonFetcher);
    });

    describe('#list(callback)', function(){
        it('should retrieve all the tasks', function(done){
            data.tasks = [{},{}];
            tasksRepository.list(function(fetchedTasks){
                fetchedTasks.should.have.length(2);
                done();
            });
        });
    });
});