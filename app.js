var app = angular.module('app', []);
app.controller('ctrl', function($scope, $interval) {
    $scope.newTaskName = ''
    $scope.currentTasks = []
    $scope.timers = []
    $scope.completedTasks = []

    $scope.addTask = function() {
        if ($scope.newTaskName) {
            $scope.currentTasks.push({
                name: $scope.newTaskName,
                elapsedTime: 0,
                stopped: true,
                completed: false
            })
            $scope.startCounting($scope.currentTasks.length - 1);
        }
        $("body").css('background-color', 'white');
        $("input").css('color', '#D9D9D9');
        $("input").css('border-bottom', '1px solid #D9D9D9');
        $("input").removeClass('white-placeholder');
        $("input").addClass('grey-placeholder');
    }

    $scope.startCounting = function(index) {
        $scope.currentTasks[index].stopped = false;
        var newTimer = $interval(function() {
            $scope.currentTasks[index].elapsedTime += 1;
        }, 1000)
        $scope.timers[index] = newTimer;
    }

    $scope.stopCounting = function(index) {
        $scope.currentTasks[index].stopped = true;
        $interval.cancel($scope.timers[index]);
    }

    $scope.finishTask = function(index) {
        $scope.stopCounting(index);
        $scope.currentTasks[index].completed = true;
        $scope.completedTasks.push($scope.currentTasks[index]);
    }
});
