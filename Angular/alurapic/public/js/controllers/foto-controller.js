angular.module('alurapic')
    .controller('FotoController', ['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos', function($scope, recursoFoto, $routeParams, cadastroDeFotos) { //annotation system - protege na minificação
        $scope.foto = {};
        $scope.mensagem = '';

        if ($routeParams.fotoId){
            recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
                $scope.foto = foto;
            }, function(error) {
                 $scope.mensagem = 'Não foi possível obter a foto'
            });
        }

        $scope.submeter = function(){
            if ($scope.formulario.$valid){
                cadastroDeFotos.cadastrar($scope.foto)
                    .then(function(dados) {
                        $scope.mensagem = dados.mensagem;
                        // limpa o formulário se for inclusão
                        if($scope.inclusao) {
                            $scope.foto = {}; 
                        }
                    })
                    .catch(function(dados) {
                        $scope.mensagem = dados.mensagem;
                    });
            }
        };
    });