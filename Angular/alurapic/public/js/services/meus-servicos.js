angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function($resource){
        return $resource('v1/fotos/:fotoId', null, {
            update: {
                method: 'PUT'
            }
        });            
    })
    .factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope){//$q - permite criar uma promessa
        var servico = {};
        var evento = 'fotoCadastrada';
        servico.cadastrar = function(foto){
            return $q(function(resolve, reject){
                if(foto._id){
                    //alteração
                    recursoFoto.update({ fotoId: foto._id}, foto, function(){
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso',
                            inclusao: false
                        });
                    }, function(error){
                        console.log(error)
                        reject({
                            mensagem: 'Não foi possível alterar a foto ' + foto.titulo});
                    });
                } else{
                    //Inclusão
                    $rootScope.$broadcast(evento);
                    recursoFoto.save(foto, function(){
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' incluida com sucesso',
                            inclusao: true
                        });
                    }, function(error){
                        console.log(error)
                        reject({
                            mensagem: 'Não foi possível incluir a foto ' + foto.titulo
                        });
                    });
                }//else
            });//fim function $q
        }//fin function cadastrar

        return servico;
    });