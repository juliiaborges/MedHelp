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
          // Envia uma requisição POST para a rota '/setembro' apenas quando o botão de confirmação for clicado
          fetch("/setembro", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              diaConsulta: selectedDate,
              horarioConsulta: horarioConsulta // Inclui o horário selecionado na requisição
            })
          })
            .then(response => response.json())
            .then(data => {
              // Ação após salvar a consulta
              console.log(data);
            })
            .catch(error => {
              //console.error(error);
            });
        } else {
          console.log("Nenhum dia selecionado.");
          // Exiba uma mensagem de erro ou tome outra ação apropriada
        }
      }
  
      // Remover classe "active" do overlay para escondê-lo
      overlay.classList.remove("active");
    }
  
    function handleCancelButtonClick() {
      // Remover classe "active" do overlay para escondê-lo
      overlay.classList.remove("active");
    }
  
    calendarDays.forEach(day => {
      day.addEventListener("click", handleDayClick);
    });
  
    confirmButton.addEventListener("click", handleConfirmButtonClick);
    cancelButton.addEventListener("click", handleCancelButtonClick);
  });
  