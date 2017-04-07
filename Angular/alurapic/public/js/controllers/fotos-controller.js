angular.module('alurapic').controller('FotosController', function($scope, recursoFoto) {
	
	$scope.fotos = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	recursoFoto.query(function(fotos){
		$scope.fotos = fotos;
	}, function(error){
		console.log(error)
	});

	$scope.remover = function(foto){
		recursoFoto.delete({ fotoId: foto._id }, function(){
			var indiceFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indiceFoto, 1);//A função splice recebe dois parâmetros. O primeiro é o índice da posição que desejamos partir. Dado uma foto, conseguimos descobrir seu índice através da função do array indexOf, que recebe como parâmetro a foto. O segundo parâmetro de splice é a quantidade de elementos que desejamos remover, em nosso caso, apenas um
			$scope.mensagem = 'Foto ' + foto.titulo + ' foi removida com sucesso';
		}, function(error){
			console.log(error);
			$scope.mensagem ='Não foi possível remover a foto ' + foto.titulo;
		});
		
	};

});