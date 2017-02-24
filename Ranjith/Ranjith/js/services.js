var externalMod = angular.module("externalMod", []);
//$rootScope, $http
externalMod.provider('gettoken', function(){
	var uid;
	this.initval = function(){
		return "the value of uid is yet to set" + uid + " -- not set";
	}
	this.setuid = function(val){
		uid = val;
	}
	this.getdetail = function(){
		return "the uid value has been modified"
	}
	this.$get = function(){
		return {
			getuid:function(){
				return uid;
			},
			getTimeWithUid:function(){
				return new Date().toString()+uid;
			}
		}
	}

})
//service follows constructor pattern
externalMod.service("shoppingService", function($rootScope){
	var choosenPrdts = [],
		productList = [];
			
	this.getProductList = function(){
		return productList;
	}
	this.addNewProduct = function(newprodtObj){
		var tmpObj = angular.copy(newprodtObj)
		productList.push(tmpObj)
	}
	this.addChoosenPrdt = function(prdt){
		var tmpObj = angular.copy(prdt);
		tmpObj.qty = 1;
		choosenPrdts.push(tmpObj);
	}
	this.getChoosenPrdts = function(){
		return choosenPrdts;
	}

	this.removeChoosenPrdt = function(prdtIndex){
		choosenPrdts.splice(prdtIndex, 1);
	}
	this.setIntialData = function(data){
		angular.forEach(data, function(t){
			productList.push(angular.copy(t))
		})
	}
});

externalMod.factory("cartFactory", function(shoppingService,$http){
	var a =["a","b","c","d"];
	var prjctApi = {};
	var configObj = {
		method:'GET',
		url:'./prdt.json'
		}
	var prdtList = [];
	//prjctApi.getData = function(){
		$http(configObj).then(function(response){
			shoppingService.setIntialData(response.data.ListOfPrdts.allprdts)
		}, function(){
			console.log("data failed")
		});
	//}
	prjctApi.getDta = function(){
		//return promise object
		return $http(configObj);

	}
	prjctApi.getA = function(){
		return a;
	}
	prjctApi.getPrdtFromFactory = function(){
		return shoppingService.getProductList();
	}
	prjctApi.name ="This is a factory";

	return prjctApi;
})



