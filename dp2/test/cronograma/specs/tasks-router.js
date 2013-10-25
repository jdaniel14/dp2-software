describe('TasksRouter', function(){
    var tasksRouter, eventEmitter, pageLocation;

    beforeEach(function(){
        eventEmitter = (function(){
            var listeners = {};
            return {
                dispatchEvent: function(event){
                    listeners[event.type]();
                },
                addEventListener: function(eventName, listener){
                    listeners[eventName] = listener;
                }
            };
        })();
        pageLocation = {pathname: '/task-2'};
        tasksRouter = new TasksRouter(eventEmitter, pageLocation);
    });

    describe('#onSelected(handler)',function(){
        beforeEach(function(){

        });

        it('should call the registered handler when a task is selected select', function(done){
            tasksRouter.onSelected(function(){
               done();
            });
            tasksRouter.select();
        });

        it('should send the label to the handler', function(done){
            tasksRouter.onSelected(function(label){
                label.should.match(/task-1/);
            });
            tasksRouter.select('task-1');
        });

        it('should call the registered handler when the popstate event is dispatched', function(done){
            tasksRouter.onSelected(function(label){
                label.should.match(/task-2/);
                done();
            });
            eventEmitter.dispatchEvent(({type: 'popstate'}))
        });
    });
});