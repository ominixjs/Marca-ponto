// verifica se há marcação do dia
export default function getPointDay(user, db) {
    const email = user.email;

    const client = db.find((c) => c.email === email);
    if (!client) return [];

    const date = new Date().toLocaleDateString();

    const sheet = client.pointSheet.find((p) => p.date === date);

    if (!sheet) return [];

    return sheet;
}
