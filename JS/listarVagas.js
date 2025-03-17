function mostrarDetalhesVaga(vagaEscolhida) {
    let nome = document.getElementById('nome');
    let descricao = document.getElementById('descricao');
    let data = document.getElementById('data');
    let candidatos = document.getElementById('candidatos');

    let vaga = JSON.parse(localStorage.getItem(vagaEscolhida));

    let candidatosVaga = vaga.candidatos.join(', ');
    
    nome.innerText = vaga.nomeVaga;
    descricao.innerText = vaga.descricaoVaga;
    data.innerText = vaga.dataLimite;
    candidatos.innerText = candidatosVaga;

    tela.style.display = 'block';
}

function cadastrarCandidatoVaga(vagaEscolhida) {
    mostrarDetalhesVaga(vagaEscolhida);
    candidato.style.display = 'block';
}

let chaves = Object.keys(localStorage);
let tableBody = document.getElementById('tabela-corpo');

let vagas = chaves.map((chave) => {
    let vaga = JSON.parse(localStorage.getItem(chave));
    
    let tableRow = document.createElement('tr');
    let tableColumnVaga = document.createElement('td');
    let tableColumnData = document.createElement('td')
    let tableIcons = document.createElement('td')

    tableColumnVaga.innerText = vaga.nomeVaga;
    tableColumnData.innerText = vaga.dataLimite;
    tableIcons.innerHTML = `
    <a href="" title="Visualizar vaga" data-chave="${chave}" class="visualiza"><ion-icon name="search-outline"></ion-icon></a>
    <a href="" title="Cadastrar candidato" data-chave="${chave}" class="cadastrar"><ion-icon name="person-add-outline"></ion-icon></a>
    <a href="" title="Excluir vaga" data-chave="${chave}" class="excluir-vaga"><ion-icon name="trash-outline"></ion-icon></a>`;
    tableIcons.className = 'p-2'

    tableRow.append(tableColumnVaga);
    tableRow.append(tableColumnData)
    tableRow.append(tableIcons);

    tableBody.appendChild(tableRow);
})

let visualizaVaga = document.querySelectorAll('.visualiza');
visualizaVaga.forEach((visualiza) => {
    visualiza.addEventListener('click', (event) => {
        event.preventDefault();
        let chave = event.currentTarget.getAttribute('data-chave');
        mostrarDetalhesVaga(chave)
    })
})

let chaveCadastroCandidato = '';

let cadastraCandidato = document.querySelectorAll('.cadastrar');
cadastraCandidato.forEach((cadastra) => {
    cadastra.addEventListener('click', (event) => {
        event.preventDefault();
        let chave = event.currentTarget.getAttribute('data-chave');
        cadastrarCandidatoVaga(chave);
        chaveCadastroCandidato = chave;
    })
})

let tela = document.getElementById('visualizarVaga');
let candidato = document.getElementById('cadastraCandidato');
let fechar = document.getElementById('fechar');
fechar.addEventListener('click', () => {
    tela.style.display = 'none';
    candidato.style.display = 'none';
    chaveCadastroCandidato = '';
})

let registrarCandidato = document.getElementById('salvar');
registrarCandidato.addEventListener('click', () => {
    let nomeCandidato = document.getElementById('nomeCandidato');
    let vaga = JSON.parse(localStorage.getItem(chaveCadastroCandidato));
    vaga.candidatos.push(nomeCandidato.value);
    localStorage.setItem(chaveCadastroCandidato, JSON.stringify(vaga));
    alert(`Candidato(a) ${nomeCandidato.value} incluso(a) com sucesso!`);
    nomeCandidato.value = '';
})

let exluirVaga = document.querySelectorAll('.excluir-vaga');
exluirVaga.forEach((vaga) => {
    vaga.addEventListener('click', (event) => {
        let chave = event.currentTarget.getAttribute('data-chave');
        let vaga = JSON.parse(localStorage.getItem(chave));
        let confirma = confirm(`Deseja excluir a vaga cadastrada: ${vaga.nomeVaga} ?`);
        if(confirma) {
            localStorage.removeItem(chave);
        }
    })
});