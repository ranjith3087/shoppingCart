var shoppingCart = angular.module("ShoppingApp");

shoppingCart.controller("shoppingCntrl", ['$scope','$rootScope','cartFactory','shoppingService','$timeout', function($scope,$rootScope,cartFactory,shpSer,timeout){
	$scope.productList=[];
	//$scope.productList= shpSer.getProductList();
	/*timeout(function() {
		$scope.productList= shpSer.getProductList();
	}, 100);*/

	cartFactory.getDta().then(function(response){
		console.log("inisde callback")
		angular.forEach(response.data.ListOfPrdts.allprdts, function(t){
			$scope.productList.push(angular.copy(t))
		})
	},function(){

	})
	console.log("this is before call back")
	
	$scope.choosenPrdts = function(selItem){	
		shpSer.addChoosenPrdt($scope.productList[selItem]);
	}
}])

shoppingCart.controller('allprdtCntrl', function($scope,cartFactory,gettoken,$http){
	console.log(gettoken.getuid())
	url= "https://www.google.com?token=" + gettoken.getuid();
	$http.get(url).then(function(response){
		console.log(response);
		}, function(response){
		console.log(response);
	})

	$scope.prdtList = [];
	cartFactory.getDta().then(function(response){
		angular.forEach(response.data.ListOfPrdts.allprdts, function(t){
			$scope.prdtList.push(angular.copy(t))
		})
	},function(){

	})
})
shoppingCart.controller("cartCntrl", function($scope, $rootScope,$filter,shoppingService){
	$scope.tabTilte = "Selected Products";
	$scope.selPrtList = shoppingService.getChoosenPrdts();
	$scope.finalTotalCost = function(){
		var totalCost = 0;
		angular.forEach($scope.selPrtList, function(selPrdt){
			totalCost += selPrdt.qty * selPrdt.price;
		});
		return $filter('currency','$')(totalCost);
	}

	$scope.removeSelectedItem = function(removeItem){
		shoppingService.removeChoosenPrdt(removeItem);
	}
})
function customFilter(){
	
	return function(inpt,positiontxt){
		var formatedText = "", splittedText = inpt.split(""),
		posAt = positiontxt ? positiontxt-1 : 0,
		upperLetter = splittedText[posAt] || isNaN(splittedText[posAt]) ? splittedText[posAt].toUpperCase() : splittedText[0].toUpperCase();

		if(isNaN(inpt)) {
			for(var i=0;i<splittedText.length;i++){
				if(i == posAt){
					formatedText += upperLetter;
				} else {
					formatedText += splittedText[i];
				}
			}
		} else {
			formatedText = inpt;
		}

		return formatedText;
	}
}
shoppingCart.filter("captilizing", customFilter)
