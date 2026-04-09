// Validar marcação
export default function ValidateRecord(prevRecord, currentTime) {
    const [h, m] = currentTime.split(":").map(Number);
    const [prevH, prevM] = prevRecord.timeSheet[prevRecord.timeSheet.length - 1]
        .split(":")
        .map(Number);

    const startMs = new Date(0, 0, 0, h, m);
    const endMs = new Date(0, 0, 0, prevH, prevM);

    const diffMs = (startMs - endMs) / 1000 / 60;

    // Intervalo para cada marcação
    const timeInterval = 1;

    if (diffMs < timeInterval) return false;

    // Tudo ok
    return true;
}
