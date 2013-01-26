/* @license
 * Copyright (c) 2013 Pere Villega
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


// Define a Module 'todoList' for Angular that will load the views. In this example the views are very simple, it's just to show
// the concept
angular.module('todoList', ['taskDoneFilter', 'todoControllers']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/all', {templateUrl: '/assets/angular/all.html',   controller: 'TodoCtrl'}).
            when('/task/:id', {templateUrl: '/assets/angular/task.html', controller: 'TaskDetailCtrl'}).
            otherwise({redirectTo: '/all'});

        // configure html5 to get links working
        // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
        $locationProvider.html5Mode(true);
    }]);


// This filter allows us to convert strings. In this case, it adds an extra tick besides a task indicating if it's done or no
angular.module('taskDoneFilter', []).filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});


// When running tests with Jasmine the jsRoutes object is not defined, which means we need to use a default route for the http call below
// This kind of defeats the purpose of retrieving the routes via Play instead of hardcoding them, as we need a fallback for the tests
// but I decided to leave the code just to see that we have the possibility, in case I find a way to improve this.
var tasksUrl = '/tasks/all';
if(!(typeof jsRoutes === "undefined")) {
  tasksUrl = jsRoutes.controllers.Application.tasks().url ;
}

// Definition of a Service, that stores all the REST requests independently from the controllers, facilitating change
angular.module('todoServices', ['ngResource']).
    factory('All', ['$resource', function ($resource) {
        return $resource(tasksUrl, {}, {
            //The data model is loaded via a GET request to the app
            query: {method: 'GET', params: {}, isArray: true}
        });
    }])
    .factory('Task', ['$resource', function ($resource) {
        return $resource('tasks', {}, {
            add: {method: 'POST'}
        });
    }]);

/**
 * This is the controller behind the view, as declared by ng-controller
 * All references to methods and data model in the view map to this controller
 * @param $scope model data injected into the controller
 * @constructor
 */
angular.module('todoControllers', ['todoServices']).controller('TodoCtrl', ['$scope', 'All', 'Task', function($scope, All, Task) {
    // We use the service to query for the data
    $scope.todos = All.query();

    //when submitting the form, this is called. Model in the form is referenced (todoText) and we add the task to
    //the data model
    $scope.addTodo = function() {
        var txt = $scope.todoText;
        $scope.todos.push({text: txt, done: false});
        Task.save({msg: txt});
        $scope.todoText = '';  //clear the input!
    };

    // calculates the remaining todos, automatically called when the model changes to update the view
    // notice the use of 'angular' component for functional approach
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    //another acton triggered by click (in this case on an anchor), which archives completed tasks
    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
}]).controller('TaskDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.id = $routeParams.id;
}]);

