document.addEventListener("DOMContentLoaded", function () {
  const calendarDays = document.querySelectorAll("#calendar .day");
  const overlay = document.querySelector(".overlay");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");
  let horarioConsulta = ""; // Variável para armazenar o horário selecionado
  let selectedDate = ""; // Variável para armazenar o dia selecionado

  function handleDayClick(event) {
    const selectedDay = event.target;
    selectedDate = selectedDay.getAttribute("value");

    // Adicionar classe "active" ao overlay para torná-lo visível
    overlay.classList.add("active");

    console.log("Data selecionada:", selectedDate);
  }

  function handleConfirmButtonClick() {
    const selectedHorario = document.querySelector("input:checked");

    if (selectedHorario) {
      horarioConsulta = selectedHorario.value; // Armazena o horário selecionado na variável
      console.log("Horário selecionado:", horarioConsulta);

      if (selectedDate) {
        // Envia uma requisição POST para a rota '/agosto' apenas quando o botão de confirmação for clicado
        fetch("/agosto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            diaConsulta: selectedDate,
            horarioConsulta: horarioConsulta
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              // Exibe a mensagem de erro no elemento HTML
              const mensagemErroElemento = document.getElementById('mensagem-erro');
              mensagemErroElemento.innerHTML = `<p>${data.error}</p>`;
            } else if (data.success) {
              // Exibe a mensagem de sucesso no elemento HTML
              const mensagemErroElemento = document.getElementById('mensagem-erro');
              mensagemErroElemento.innerHTML = `<p>${data.success}</p>`;
            }
          })
          .catch(error => {
            console.log("Erro:", error);
          });
      }
    }

    // Remove a classe "active" do overlay para torná-lo invisível
    overlay.classList.remove("active");
  }

  function handleCancelButtonClick() {
    // Remove a classe "active" do overlay para torná-lo invisível
    overlay.classList.remove("active");
  }

  // Adiciona um evento de clique para cada dia do calendário
  calendarDays.forEach(function (day) {
    day.addEventListener("click", handleDayClick);
  });

  // Adiciona eventos de clique aos botões do overlay
  confirmButton.addEventListener("click", handleConfirmButtonClick);
  cancelButton.addEventListener("click", handleCancelButtonClick);
});
