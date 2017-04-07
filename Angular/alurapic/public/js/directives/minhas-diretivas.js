angular.module('minhasDiretivas', [])
	.directive('meuPainel', function() {

		var ddo = {};

		ddo.restrict = "AE"//Atribute e Element
        ddo.transclude = true;


		ddo.scope = {
            titulo: '@'
        };

        ddo.templateUrl = 'js/directives/meu-painel.html';

		return ddo;
	})
    .directive('minhaFoto', function() {

        var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@',
            url: '@'
        };

        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';           
        
        return ddo;
    })
    .directive('meuBotaoPerigo', function(){
        var ddo = {};
        ddo.restrict = "E";
        ddo.scope = {
            nome: '@',//passa uma string
            acao: '&'//passa uma expressao para ser avaliada no scope nesse caso a referencia da função
        };
        
        ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

        return ddo;

        return ddo;
    })
    .directive('meuFocus', function(){
        var ddo = {};

        ddo.restrict = 'A';

        ddo.scope = {
            focado: '='//permite que uma comunicação bidirecional entre o controller e a directives
        };

        ddo.link = function(scope, element){//Diretivas possuem a propriedade link, cuja função nos dá acesso ao elemento do DOM 
            scope.$on('fotoCadastrada', function(){
                element[0].focus();
            });
        };

        return ddo;
    })
    .directive('meusTitulos', function(){

/*
A propriedade controller permite passarmos uma função que permite termos acesso aos injetáveis do Angular, como $scope e recursoFoto. Há outros elementos exclusivos que não abordaremos aqui. Você deve estar se perguntando: ok, você me convenceu, mas como recursoFoto foi injetado se não temos o módulo meusServicos como dependência de minhasDiretivas? Resposta elementar caro aluno: nosso módulo principal da aplicação já carrega o módulo meusServicos, inclusive o módulo minhasDiretivas, por isso recursoFoto é injetável. Porém, fica mais bonito declarar explicitamente essa dependência em nosso módulo, sem efeito colateral algum.
*/        
        var ddo = {};

        ddo.restrict = 'E'
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
        ddo.controller = function($scope, recursoFoto){
            recursoFoto.query(function(fotos){
                $scope.titulo = fotos.map(function(foto){ //A função map itera sobre nossa lista fornecendo acesso ao elemento da iteração no seu parâmetro
                    return foto.titulo;
                });
            });
        };

        return ddo;
    });


/*
Não podemos usar @ para scope.acao. Este modificador sempre passa para diretiva um valor em string . No caso da nossa diretiva, precisamos que scope.acao esteja associada à uma função de um controller, isto é, do escopo pai na qual a diretiva está inserida. Para conseguirmos isso, usamos o modificador &
*/   

/*
Usamos @ quando queremos realizar uma cópia do valor passado para a diretiva no HTML para dentro do escopo isolado na diretiva. Essa cópia é sempre um valor em string.
Usamos & geralmente quando queremos executar dentro de uma diretiva uma função que pertence a um escopo pai, o de um controller.
Usamos = quando queremos que tanto a diretiva quanto o controller acessem o mesmo dado, isto é, qualquer alteração no escopo privado da diretiva afetará a propriedade do controller e qualquer alteração nesta propriedade no controller afetará a diretiva. Temos aqui uma comunicação bidirecional.
*/