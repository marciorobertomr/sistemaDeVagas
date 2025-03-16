function mostrarDetalhesVaga(vagaEscolhida) {
    let nome = document.getElementById('nome');
    let descricao = document.getElementById('descricao');
    let data = document.getElementById('data');

    let vaga = JSON.parse(localStorage.getItem(vagaEscolhida));
    
    nome.innerText = vaga.nomeVaga;
    descricao.innerText = vaga.descricaoVaga;
    data.innerText = vaga.dataLimite;

    tela.style.display = 'block';
}

let chaves = Object.keys(localStorage);
let tableBody = document.getElementById('tabela-corpo');

let vagas = chaves.map((chave) => {
    let vaga = JSON.parse(localStorage.getItem(chave));
    
    let tableRow = document.createElement('tr');
    let tableColumnID = document.createElement('td');
    let tableColumnVaga = document.createElement('td');
    let tableColumnData = document.createElement('td')
    let tableIcons = document.createElement('td')

    tableColumnID.innerText = chaves.indexOf(chave);
    tableColumnVaga.innerText = vaga.nomeVaga;
    tableColumnData.innerText = vaga.dataLimite;
    tableIcons.innerHTML = `
    <a href="" id="${chave}" class="visualiza"><ion-icon name="search-outline"></ion-icon></a>
    <a href="" id="${chave}" class=cadastrar'}"><ion-icon name="person-add-outline"></ion-icon></a>`;
    tableIcons.className = 'p-2'

    tableRow.append(tableColumnID);
    tableRow.append(tableColumnVaga);
    tableRow.append(tableColumnData)
    tableRow.append(tableIcons);

    tableBody.appendChild(tableRow);
})

let visualizaVaga = document.querySelectorAll('.visualiza');
visualizaVaga.forEach((visualiza) => {
    visualiza.addEventListener('click', (event) => {
        event.preventDefault();
        let elementoPai = event.currentTarget;
        mostrarDetalhesVaga(elementoPai.id)
    })
})

let cadastraCandidato = document.querySelectorAll('.cadastrar');
cadastraCandidato.forEach((cadastra) => {
    visualiza.addEventListener('click', (event) => {
        event.preventDefault();
        let elementoPai = event.currentTarget;
    })
})

let tela = document.getElementById('visualizarVaga');
let fechar = document.getElementById('fechar');
fechar.addEventListener('click', () => {
    tela.style.display = 'none';
})