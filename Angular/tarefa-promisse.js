function exibe(texto) {
    return $q(function(resolve, reject) {

        // simulando ação assíncrona com setTimeout

        setTimeout(function() {
            if(texto == 'Alura') {
                resolve('resolvida');
            } else {
                reject('rejeitada')
            }
        }, 5000);
    });    
}

// executando nossa promise

exibe('Alura').then(function(resultado) {
    console.log(resultado);
}).catch(function(erro) {
    console.log(erro);
});
console.log('FIM');