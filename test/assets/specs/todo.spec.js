/*
 * Copyright (c) 2013 Pere Villega
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

// Jasmine test, see http://pivotal.github.com/jasmine/for more information
describe('TodoCtrl controllers', function() {

    //We don't have a running Play server in here so we need to define a hardcoded route (unless I find a fix for this issue)
    var tasksUrl = '/tasks/all';

    // Add matchers
    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    // Import the definition of the services to the test, to be able to test the REST calls
    beforeEach(module('todoServices'));

    // Run test
    describe('TodoCtrl', function(){

        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET(tasksUrl).
                respond([{id: 1, text: 'task1', done: true}, {id: 2, text: 'task2', done: false}]);

            scope = $rootScope.$new();
            ctrl = $controller(TodoCtrl, {$scope: scope});
        }));

        it('should create "tasks" model with 2 tasks fetched via xhr ', function() {
            expect(scope.todos).toEqual([]); //notice that default state is not undefined, but empty!
            $httpBackend.flush();
            expect(scope.todos.length).toBe(2);
        });
    });
});



