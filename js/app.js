var app = angular.module('todo', []);

app.directive('ngBlur', function() {
    return function(scope, elem, attrs) {
        elem.bind('blur', function() {
            console.warn(attrs.ngBlur);
            scope.$apply(attrs.ngBlur);
        })
    };
});

app.controller('TodoCtrl',function ($scope, filterFilter, $http) {

    $scope.todos = [];
    $scope.placeholder = "Chargement...";

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