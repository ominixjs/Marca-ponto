import sendData from "./sendData.js";

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

// Marcar o horario
const btnSave = document.getElementById("btn_save_time");
if (btnSave) {
    btnSave.addEventListener("click", () => {
        // Verifica se esta marcando o horario
        if (!getTime) return;

        sendData({
            date: new Date().toLocaleDateString(),
            markingRecord: getTime,
        });

        // Atualiza a seção
        window.location.reload();

        getTime = null;
    });
}
