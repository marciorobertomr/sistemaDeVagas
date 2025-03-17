function trataNomeVaga() {
    return nomeVaga.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toLowerCase();
}

function trataDataLimite(data) {
    let dataAjustada = new Date(data);
    dataAjustada = `${dataAjustada.getUTCDate()}-${(dataAjustada.getUTCMonth() + 1).toString().padStart(2, '0')}-${dataAjustada.getUTCFullYear()}`;
    return dataAjustada;
}

let salvar = document.getElementById('salvar');
salvar.addEventListener('click', (event) => {
    event.preventDefault();

    let nomeVagaInput = document.getElementById('nomeVaga');
    let descricaoVagaInput = document.getElementById('descricaoVaga');
    let dataInput = document.getElementById('dataLimite');

    nomeVaga = nomeVagaInput.value;
    descricaoVaga = descricaoVagaInput.value;
    dataLimite = dataInput.value;

    if(nomeVaga === '' || descricaoVaga === '' || dataLimite === '') {
        alert('Dados não preenchidos ou incompletos. Preencha todos os campos para salvar a vaga.')
        return;
    }

    let nomeVagaIndice = trataNomeVaga();
    dataLimite = trataDataLimite(dataLimite);

    let vaga = {
        nomeVaga: nomeVaga,
        descricaoVaga: descricaoVaga,
        dataLimite: dataLimite,
        candidatos: []
    }

    localStorage.setItem(nomeVagaIndice, JSON.stringify(vaga));

    nomeVagaInput.value = '';
    descricaoVagaInput.value = '';
    dataInput.value = '';
})