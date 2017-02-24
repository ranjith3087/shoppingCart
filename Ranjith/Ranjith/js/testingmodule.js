var testapp = angular.module("calculatorApp", ['ngMock']);

testapp.controller('calCntrl', function($scope){
	$scope.result;
	$scope.summation = function(){
		$scope.result = $scope.firstNum + $scope.secondNum;
	}
})