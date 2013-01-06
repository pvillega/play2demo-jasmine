/*
 * Copyright (c) 2013 Pere Villega
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Dependencies for the unit test via Jasmine
EnvJasmine.loadGlobal(EnvJasmine.libDir + "jquery-1.8.3.min.js");
EnvJasmine.loadGlobal(EnvJasmine.libDir + "angular.min.js");
EnvJasmine.loadGlobal(EnvJasmine.libDir + "angular-resource.min.js");
EnvJasmine.loadGlobal(EnvJasmine.testDir + "config/angular-mocks.js");

// Import all modules (in theory this should be done with RequireJs, but it fails for some reason)
// FIXME: check why we can't use RequireJs instead of manually importing files
EnvJasmine.loadGlobal(EnvJasmine.rootDir + "todo.js");
