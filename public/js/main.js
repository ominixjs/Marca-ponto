import ValidateBooking from "./ValidateBooking.js";
import CreateList from "./CreateList.js";
import sendData from "./sendData.js";

// Obtem o horario atualizado
// Salvar no banco de dados a cada marcação
export const timeSheet = [];

// Variavel padrão para salvar a marcação temporariamente
let getTime = null;

// Imprimir valor no frontend
const timeTxt = document.getElementById("time");
if (timeTxt) {
  // Atualizar o horario
  setInterval(() => {
    getTime = new Date().toLocaleTimeString();
    timeTxt.textContent = getTime;
  }, 1000);
}

// Limita marcações diarias
const markingLimit = 4;

// Marcar o horario
const btnSave = document.getElementById("btn_save_time");
if (btnSave) {
  btnSave.addEventListener("click", () => {
    // Verifica se esta marcando o horario
    if (!getTime) return;

    // Evita mais de x marcações
    if (timeSheet.length >= markingLimit) return;

    // Validar se a marcação teve um intervalo de tempo
    if (!ValidateBooking(getTime, timeSheet)) return;

    // Salva marcação
    timeSheet.push(getTime);

    // Cria uma lista nova sempre que houver uma marcação
    CreateList(timeSheet);

    sendData({
      date: new Date().toLocaleDateString(),
      getTime,
    });

    getTime = null;
  });
}
