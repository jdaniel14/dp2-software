describe('TasksContainer', function(){
    "use strict";

    var tasksContainer, tasksRepository;
    beforeEach(function () {
        tasksRepository = {};
        tasksRepository.list = function(callback) {
            var tasks = [
                {
                    name: "task-1",
                    description: "task-1 description",
                    resources: [
                        {
                            name: "resource-1"
                        },
                        {
                            name: "resource-2"
                        }
                    ]
                },
                {
                    name: "task-2",
                    description: "task-2 description",
                    resources: [
                        {
                            name: "resource-3"
                        },
                        {
                            name: "resource-4"
                        }
                    ]
                }
            ];
            callback(tasks);
        };
        tasksContainer = new TasksContainer(tasksRepository);
    });

    it('should start with zero tasks', function(){
        tasksContainer.tasks.should.have.length(0);
    });

    describe('#fetch(callback)', function(){
        it('should load the given tasks from the repository', function (done){
            tasksContainer.fetch(function(){
                tasksContainer.tasks.should.have.length(2);
                done();
            });
        });
    });
});