

function TodoCtrl($scope) {

    $scope.todos = [
        {
            name : 'Tâche incomplète',
            completed : false
        },
        {
            name : 'Tâche complète',
            completed : true
        }
    ]

    $scope.removeTodo = function(index) {
        $scope.todos.splice(index,1);
    }

    $scope.addTodo = function() {
        $scope.todos.push({
            name : $scope.newtodo,
            completed : false
        });

        $scope.newtodo = '';
    }
}