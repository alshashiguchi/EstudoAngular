angular.module('alurapic', ['minhasDiretivas','ngAnimate', 'ngRoute', 'meusServicos'])
	.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);//Ativa o modulo do HTML 5 (o backend deve estar preparado pra trabalhar assim)

		$routeProvider.when('/fotos', {
			templateUrl: 'partials/principal.html',
			controller: 'FotosController'
		});

		$routeProvider.when('/fotos/new', {
			templateUrl: 'partials/foto.html',
			controller: 'FotoController'
		});

		$routeProvider.when('/fotos/edit/:fotoId', {
			templateUrl: 'partials/foto.html',
			controller: 'FotoController'
		});		

		$routeProvider.otherwise({redirectTo: '/fotos'});//Redireciona para uma pasta quando não existe

	});