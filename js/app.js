var app = angular.module('todo', []);

app.directive('ngBlur', function() {
    return function(scope, elem, attrs) {
        elem.bind('blur', function() {
            console.warn(attrs.ngBlur);
            scope.$apply(attrs.ngBlur);
        })
    };
});

app.controller('TodoCtrl',function ($scope, filterFilter, $http, $location) {
    console.log($location);
    $scope.todos = [];
    $scope.placeholder = "Chargement...";
    $scope.statusFilter = '';

    $http.get('data/json/todos.json').success(function(data) {
        console.log('ajax request in success.');

        $scope.todos = data;
        $scope.placeholder = 'Ajouter une nouvelle tâche';
    });

    $scope.$watch('todos', function() {
        console.log('$watch event triggered.');

        $scope.remaining = filterFilter($scope.todos, {completed:false}).length;
        $scope.allchecked = !$scope.remaining;
    }, true);

    if($location.path == ''){ $location.path('/') }
    $scope.location = $location;

    $scope.$watch('location.path()', function(path) {
        $scope.statusFilter =
            (path == '/active') ? {completed: false} :
            (path == '/done') ? {completed: true} :
            null;
    });

    $scope.removeTodo = function(index) {
        console.log('removeTodo called.');

        $scope.todos.splice(index,1);
    }

    $scope.addTodo = function() {
        console.log('addTodo called.');

        $scope.todos.push({
            name : $scope.newtodo,
            completed : false
        });

        $scope.newtodo = '';
    }

    $scope.editTodo = function(todo) {
        console.log('editTodo called.');
        todo.editing = false;
    }

    $scope.checkAllTodo = function(allchecked){
        console.log('checkAllTodo called.');
        $scope.todos.forEach(function(todo){
            todo.completed = allchecked;
        });
    }
});