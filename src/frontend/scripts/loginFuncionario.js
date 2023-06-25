document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o botão de login
    const loginBtn = document.getElementById('loginBtn');
  
    // Adicionar um ouvinte de evento de clique ao botão de login
    loginBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar o envio automático do formulário
  
      // Capturar os valores dos campos de email e senha
      const email = document.getElementById('loginEmail').value;
      const senha = document.getElementById('loginSenha').value;
  
      // Validar os campos do formulário (opcional)
      if (!email || !senha) {
        // Exibir uma mensagem de erro caso algum campo esteja vazio
        alert('Por favor, preencha todos os campos.');
        return; // Impedir o envio do formulário
      }
  
      // Enviar manualmente o formulário
      document.forms[0].submit();
    });
  });
  