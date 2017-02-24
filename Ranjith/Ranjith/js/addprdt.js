var shoppingCart = angular.module("ShoppingApp");

shoppingCart.controller('addprdtCntrl', function($scope){
	$scope.newPrdtDetails = {};
})

shoppingCart.controller('customdirect', function($scope){
	$scope.heading = "This is custom directive page";
	$scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.updateName = function (firstName, lastName){
      $scope.firstName = firstName;
      $scope.lastName = lastName;
      console.log('calling')
    };
})

shoppingCart.directive('myCustDirect', function(){
	return {
		restrict:'EAC', // E- element , a- attribute, c-class/comment
		template:'<div><label>First name: <input type="text" id="fname" ng-model="firstName"/></label><br />' +
        '<label>Last name: <input type="text" ng-model="lastName"/></label><br />' +
        '<br /><button ng-click="isoupdatename()">click</button>' +
        '<strong>First name:</strong> {{firstName}}<br />' +
        '<strong>Last name:</strong> {{lastName}}</strong></div>',
        replace:true,
        link: function(scope,element,attrs){
        	/*console.log(scope)
        	if(attrs.someattr == 'varun'){
        		element[0].querySelector('#fname').onclick=function(){
        		alert('clicked');
        	}*/
        },
        scope:{
        	firstName:'@isoFirstName',
        	lastName:'=isoLastName',
        	isoupdatename: '&updateName'
        }

	}
})


