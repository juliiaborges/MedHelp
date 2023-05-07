//Função ATUALIZAR esquipamentos

//Equipamentos em estoque
let equipamentos = [
    { id: 1, nome: 'Esfigmomanômetro', descricao: 'Aparelho utilizado para medir a pressão arterial', disponibilidade: "Livre" },
    { id: 2, nome: 'Estetoscópio', descricao: 'Aparelho utilizado para ouvir sons vasculares, respiratórios ou de outras naturezas em diferentes partes do corpo do paciente.', disponibilidade: "Ocupado" }

]


// função para adicionar um médico na tabela
function adicionarEquipamentoTabela(equipamento) {
    const tableBody = document.querySelector('#equipamentos-table tbody');
    const row = tableBody.insertRow();

    const idCell = row.insertCell(0);
    const nomeCell = row.insertCell(1)
    const descricaoCell = row.insertCell(2);
    const disponibilidadeCell = row.insertCell(3)

    idCell.innerText = equipamento.id;
    nomeCell.innerText = equipamento.nome;
    descricaoCell.innerText = equipamento.descricao;
    disponibilidadeCell.innerText = equipamento.disponibilidade


    // botão de excluir equipamento
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir';
    deleteButton.onclick = () => {
        excluirEquipamento(equipamento.id);
    }
    actionsCell.appendChild(deleteButton);
}

// função para excluir um médico do array e da tabela
function excluirEquipamento(id) {
    equipamentos = equipamentos.filter(equipamento => equipamento.id !== id);
    atualizarTabela();
}

// função para atualizar a tabela com os dados do array de médicos
function atualizarTabela() {
    const tableBody = document.querySelector('#equipamentos-table tbody');
    tableBody.innerHTML = '';

    equipamentos.forEach(equipamento => {
        adicionarEquipamentoTabela(equipamento);
    });
}

// função limpar formulário
function limpar() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("disponibilidade").value = "";
}


// função pra não recarregar página ao enviar novo médico
const form = document.querySelector('form');

form.addEventListener('submit', function (event) {

    adicionarEquipamento()

    event.preventDefault();

})

// função para adicionar um médico ao array e atualizar a tabela
function adicionarEquipamento() {
    const id = document.querySelector('#id').value;
    const nome = document.querySelector('#nome').value
    const descricao = document.querySelector('#descricao').value;
    const disponibilidade = document.querySelector('#disponibilidade').value

    const equipamento = {
        id: id,
        nome: nome,
        descricao: descricao,
        disponibilidade: disponibilidade,
    };

    equipamentos.push(equipamento);
    atualizarTabela();

}

// função pra não recarregar página ao enviar novo médico

const updateBtn = document.querySelector('#btn_atualizar');

updateBtn.addEventListener('click', function (event) {
    atualizarTabela();
    event.preventDefault();
})