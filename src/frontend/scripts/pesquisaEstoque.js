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