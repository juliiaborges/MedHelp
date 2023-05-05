//Equipamentos em estoque
let equipamentos = [
    { id: 1, nome: 'Esfigmomanômetro', descricao: 'Aparelho utilizado para medir a pressão arterial', disponibilidade: "Livre" },
    { id: 2, nome: 'Estetoscópio', descricao: 'Aparelho utilizado para ouvir sons vasculares, respiratórios ou de outras naturezas em diferentes partes do corpo do paciente.', disponibilidade: "Ocupado" }

]

//Função PESQUISAR esquipamentos
function pesquisaEquipamento() {
    var codigo = document.getElementById("codigo").value;
    var nome = document.getElementById("nome").value
    var equipamentoEncontrado = null;

    //procurar equipamento por ID ou Nome
    for (var i = 0; i < equipamentos.length; i++) {
        if (equipamentos[i].id == codigo || equipamentos[i].nome == nome) {
            equipamentoEncontrado = equipamentos[i];
            break;
        }
    }

    //Exibindo resultados da pesquisa na tela
    if (equipamentoEncontrado != null) {
        var divResultado = document.getElementById("resultado")

        //Exibir resultado na tela
        divResultado.innerHTML = "<p>ID: " + equipamentoEncontrado.id + "</p>"
            + "<p>Nome: " + equipamentoEncontrado.nome + "</p>"
            + "<p>Descrição: " + equipamentoEncontrado.descricao + "</p>"
            + "<p>Disponibilidade: " + equipamentoEncontrado.disponibilidade + "</p>";
    }

    else {
        alert("Equipamento não encontrado!");
    }
}

// função pra não recarregar página ao enviar novo médico
const sendBtn = document.querySelector('#btn_envio');

sendBtn.addEventListener('click', function (event) {

    pesquisaEquipamento();

    event.preventDefault();

})





//Função ATUALIZAR esquipamentos

function addEquipamentoTabela(equipamento) {
    const tableBody = document.querySelector('#equipamentos-table tbody')
    const row = tableBody.innerRow();

    const idCell = row.insertCell(0);
    const nomeCell = row.insertCell(1);
    const disponibilidadeCell = row.insertCell(2);
    const descricaoCell = row.insertCell(3);
    const buttonCell = row.insertCell(4);

    idCell.innerText = equipamento.id;
    nomeCell.innerText = equipamento.nome;
    disponibilidadeCell.innerText = equipamento.disponibilidade;
    descricaoCell.innerText = equipamento.descricao;

    //Botão excluir equipamento
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir';
    deleteButton.onclick = () => {
        excluirEquipamento(equipamento.id);
    }
    buttonCell.appendChild(deleteButton);
    ;
}

//Função para excluir equipamento do array e da tabela
function excluirEquipamento(id) {
    equipamentos = equipamentos.filter(equipamento => equipamento.id !== id);
    atualizarTabela();
}

//Função para atualizar a tabela 
function atualizarTabela() {
    const tableBody = document.querySelector('#equipamentos-table tbody');
    tableBody.innerHTML = '';

    equipamentos.forEach(equipamento => {
        addEquipamentoTabela(equipamento);
    })
}

//função adicionar novo equipamento e atualizar tabela
function addEquipamento() {
    const id = document.querySelector('#id').value
    const nome = document.querySelector('#nome').value
    const descricao = document.querySelector('#descricao').value
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

const uptadeBtn = document.querySelector('#btn_uptade');

sendBtn.addEventListener('click', function (event) {

    addEquipamento()

    event.preventDefault();

})