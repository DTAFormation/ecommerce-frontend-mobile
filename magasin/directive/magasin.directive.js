angular.module('ecMobileApp.magasin')
	
	.directive('myTab',function(){
		return{
			replace: true,
			transclude: true,
			templateUrl: 'myTab.html',

		}

	})