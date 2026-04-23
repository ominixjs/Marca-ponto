import validateRecord from "../validators/validateRecord.js";

export default function pointService(user, date, currentRecord) {
    // Busca no DB se há registro do dia
    const verifyRecord = user.pointSheet.find((p) => p.date === date);

    // Primeira marcação do dia
    if (!verifyRecord) {
        user.pointSheet.push({ date, timeSheet: [currentRecord] });
        return { message: "Primeira marcação do dia" };
    }

    // Verfica se ja foram os 4 registros do dia
    if (verifyRecord.timeSheet.length >= 4) {
        return { error: "Marcaçõe do dia já foram feitas" };
    }

    // Envio a array de marcações e a marcação atual
    if (!validateRecord(verifyRecord, currentRecord)) {
        return { error: "Aguarde alguns minutos!" };
    }

    // Caso ocorra tudo Ok, marca o segundo registro
    verifyRecord.timeSheet.push(currentRecord);
    return { message: "Enviado com sucesso!" };
}
