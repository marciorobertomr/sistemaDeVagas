function Vaga(nomeVaga, descricaoVaga, dataLimite, candidatosInscritos = []) {
    this.nomeVaga = nomeVaga;
    this.descricaoVaga = descricaoVaga;
    this.dataLimite = dataLimite;
    this.candidatosInscritos = candidatosInscritos;
    this.lista = {
        indice: this.nomeVaga.toLowerCase().split(' ').join(''),
        nome: this.nomeVaga,
        descricaoVaga: this.descricaoVaga,
        dataLimite: this.dataLimite,
        candidatosInscritos: this.candidatosInscritos
    }
}

function armazenaVagas(vagaLista) {
    let objetoString = JSON.stringify(vagaLista);
    localStorage.setItem(vagaLista.indice, objetoString);
}

function recuperaItens() {
    vagasArmazenadas = []
    let chave = '';
    let objetoConvertido = {};

    for(let i = 0; i < localStorage.length; i++) {
        chave = localStorage.key(i);
        objetoConvertido = JSON.parse(localStorage.getItem(chave));
        vagasArmazenadas.push(objetoConvertido);
    }
}

function mostrarVagaSelecionada(numeroVaga) {
    alert(`Detalhes da vaga:
        \n Nome da Vaga: ${vagasArmazenadas[numeroVaga].nome}
        \n Descrição da Vaga: ${vagasArmazenadas[numeroVaga].descricaoVaga}
        \n Data Limite da Vaga: ${vagasArmazenadas[numeroVaga].dataLimite}
        \n Quantidade de Candidados Incritos: ${vagasArmazenadas[numeroVaga].candidatosInscritos.length}
        \n Candidados Incritos: ${vagasArmazenadas[numeroVaga].candidatosInscritos}
    `)
}

function listarVagas(listar) {
    let i = 0;
    let contador = 1;
    let vagasDisponiveis = 'Vagas Disponíveis: \n';

    recuperaItens();
    
    vagasArmazenadas.forEach(() => {
        vagasDisponiveis += `${contador++}. ${vagasArmazenadas[i].nome};\n`;
        i++;
    })

    if (listar === 'listar') {
        return vagasDisponiveis;
    } else {
        alert(vagasDisponiveis);
    }
}

function criarVaga() {
    let nomeVaga = prompt("Digite o nome da vaga");
    let descricaoVaga = prompt("Digite a descrição da vaga");
    let dataLimite = prompt("Digite uma data limite para a vaga");
    
    let confirmaInformacoes = confirm(`As informações em tela estão corretas?
            \n Nome da Vaga: ${nomeVaga}
            \n Descrição da Vaga: ${descricaoVaga}
            \n Data Limite da Vaga: ${dataLimite}
        `);

    if(confirmaInformacoes) {
        let vaga = new Vaga(nomeVaga, descricaoVaga, dataLimite);
        let existeVaga = localStorage.getItem(vaga.lista.indice)
        if(existeVaga === null) {
            armazenaVagas(vaga.lista);
        } else {
            let vagaExistente = JSON.parse(existeVaga);
            
            alert(`Já existe uma vaga cadastrada com o mesmo nome de vaga: \n\n
                Nome: ${vagaExistente.nome}
                Descrição da Vaga: ${vagaExistente.descricaoVaga}
                Data Limite: ${vagaExistente.dataLimite}
                Quantidade de Candidatos Inscritos: ${vagaExistente.candidatosInscritos.length}
                `)
        }
    } else {
        alert('A Vaga não foi criada.')
    }
}

function visualizarVaga() {
    let numeroVaga = parseInt(prompt(`Digite a numeração da vaga que deseja visualizar \n\n ${listarVagas("listar")}`));
    
    numeroVaga--;

    mostrarVagaSelecionada(numeroVaga);
}

function inscreverCandidato() {
    let vagaSelecionada = parseInt(prompt(`Selecione a vaga que deseja inscrever um candidato.\n 
    ${listarVagas("listar")}`))
    let nomeCandidato = prompt("Digite o nome do candidado.");

    vagaSelecionada--;

    vagasArmazenadas[vagaSelecionada].candidatosInscritos.push(nomeCandidato);
    
    armazenaVagas(vagasArmazenadas[vagaSelecionada]);

    mostrarVagaSelecionada(vagaSelecionada);
}

function excluirVaga() {
    let vagaADeletar = parseInt(prompt(`Selecione o número da vaga que deseja exluir: \n
    ${listarVagas('listar')}`));
    
    vagaADeletar--;

    let confirmaExclusaoVaga = confirm(`Confirme a exclusão da vaga abaixo:
        ${vagasArmazenadas[vagaADeletar].nome}
        `);
    
    if(confirmaExclusaoVaga) {
        localStorage.removeItem(vagasArmazenadas[vagaADeletar].indice)
        alert('Vaga excluída!');
    } else {
        alert('Vaga não excluída.')
    }
}

// MENU

let sair = false;
let vagasArmazenadas = [];

do {
    let selecao = parseInt(
        prompt(
            "Escolha o que deseja fazer:" +
            "\n 1. Listar vagas disponíveis" +
            "\n 2. Criar uma nova vaga" +
            "\n 3. Visualizar uma vaga" +
            "\n 4. Inscrever um candidato em uma vaga" +
            "\n 5. Excluir uma vaga."
        )
    );

    if (selecao === 1) {
        listarVagas();
    } else if (selecao === 2) {
        criarVaga();
    } else if (selecao === 3) {
        visualizarVaga();
    } else if (selecao === 4) {
        inscreverCandidato();
    } else if (selecao === 5) {
        excluirVaga();
    } else {
        alert('Digite uma opção válida.')
    }

    sair = confirm("Deseja sair do programa?");
} while (sair === false)