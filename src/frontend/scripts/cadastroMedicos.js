// array para armazenar os médicos cadastrados
let medicos = [];

// função para adicionar um médico na tabela
function adicionarMedicoNaTabela(medico) {
  const tableBody = document.querySelector('#medicos-table tbody');
  const row = tableBody.insertRow();

  const nomeCell = row.insertCell(0);
  const ufCell = row.insertCell(1)
  const crmCell = row.insertCell(2);
  const especialidadeCell = row.insertCell(3)
  const situacaoCell = row.insertCell(4);
  const telefoneCell = row.insertCell(5);
  const emailCell = row.insertCell(6);
  const actionsCell = row.insertCell(7);

  nomeCell.innerText = medico.nome;
  ufCell.innerText = medico.uf;
  crmCell.innerText = medico.crm;
  especialidadeCell.innerText = medico.especialidade
  situacaoCell.innerText = medico.situacao;
  telefoneCell.innerText = medico.telefone;
  emailCell.innerText = medico.email;
  
  // botão de excluir médico
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Excluir';
  deleteButton.onclick = () => {
    excluirMedico(medico.crm);
  }
  actionsCell.appendChild(deleteButton);
}

// função para excluir um médico do array e da tabela
function excluirMedico(crm) {
  medicos = medicos.filter(medico => medico.crm !== crm);
  atualizarTabela();
}

// função para atualizar a tabela com os dados do array de médicos
function atualizarTabela() {
  const tableBody = document.querySelector('#medicos-table tbody');
  tableBody.innerHTML = '';

  medicos.forEach(medico => {
    adicionarMedicoNaTabela(medico);
  });
}

// função limpar formulário
function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("crm").value = "";
    document.getElementById("especialidade") = "";
    document.getElementById("situacao").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
  }


// função pra não recarregar página ao enviar novo médico
  const form = document.querySelector('form');
  const sendBtn = document.querySelector('#btn_envio');
  
  form.addEventListener('submit', function(event) {
  
      adicionarMedico()
  
      event.preventDefault();
  
  })

// função para adicionar um médico ao array e atualizar a tabela
function adicionarMedico() {
  const nome = document.querySelector('#nome').value;
  const uf = document.querySelector('#uf').value
  const crm = document.querySelector('#crm').value;
  const especialidade = document.querySelector('#especialidade').value 
  const situacao = document.querySelector('#situacao').value;
  const telefone = document.querySelector('#telefone').value;
  const email = document.querySelector('#email').value;

  const medico = {
    nome: nome,
    uf: uf,
    crm: crm,
    especialidade: especialidade,
    situacao: situacao,
    telefone: telefone,
    email: email
  };

  medicos.push(medico);
  atualizarTabela();

}
