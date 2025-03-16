let listarVagas = document.getElementById('listar-vagas');
if(listarVagas) {
    listarVagas.addEventListener('click', () => {
        window.location.href = './listarVagas.html';
    })
}

let criarVaga = document.getElementById('criar-vaga');
if(criarVaga) {
    criarVaga.addEventListener('click', () => {
        window.location.href = './criarVaga.html'
    })
}

let menu = document.getElementById('menu');
if(menu) {
    menu.addEventListener('click', () => {
        window.location.href = './index.html'
    })
}

let visualizarVaga = document.getElementById('visualizar-vaga');
if(visualizarVaga) {
    visualizarVaga.addEventListener('click', () => {
        window.location.href = './visualizarVaga.html'
    })
}