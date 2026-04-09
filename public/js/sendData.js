export default function sendData(sheet) {
    fetch("/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheet),
    })
        .then((response) => response.text())
        .then((response) => alert(response))
        .catch((err) => {
            console.error("Erro ao finalizar tarefa");
        });
}
