var shoppingCart = angular.module("ShoppingApp",['ngMessages','ngSanitize', 'externalMod','ngRoute'],function(){
	//console.log("successfully created");
});

shoppingCart.value("dbServer", {
	"prdtDBserverName":"vmth01",
	"testDBserverName":"vmtest01",
	"devDBserverName":"vmdev01",
})
shoppingCart.constant("dbName", "ShoppingDB")

//constant and providers can only be injected in config and run phase
//where as value cannot be injectd in config 
shoppingCart.config(function($routeProvider, gettokenProvider){
	gettokenProvider.setuid(12345678);

	$routeProvider
	.when('/home', {
		template:'<div>this is home page - {{welcomemessage}}</div>',
		controller:function($scope){
			$scope.welcomemessage = "Hello varun and ranjith"
		}
	})
	.when('/direc', {
		templateUrl:'partials/custdirec.html',
		controller: 'customdirect'
	})
	.when('/allprdt', {
		templateUrl:'partials/prdtList.html',
		controller: 'allprdtCntrl'
	})
	.when('/shop', {
		templateUrl:'partials/shopping.html'
	})
	.when('/newprdt', {
		templateUrl:'partials/addprdt.html',
		controller:'addprdtCntrl'

	})
	.otherwise({redirectTo: '/home'})
})

shoppingCart.run(function($rootScope){
	$rootScope.appheading = "My <u>Shopping Cart</u> Application";
})


