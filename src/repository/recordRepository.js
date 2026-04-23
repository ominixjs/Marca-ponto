import { db } from "../db/db.js";

// verifica se o usuario fez alguma marcação do dia
export default function getPointDay(companyId, userId) {
    const company = db.find((c) => c.id === companyId);
    const user = company.collaborators.find((c) => c.id === userId);
    if (!user) return res.redirect("/login");

    const currentDate = new Date().toLocaleDateString();

    const sheet = user.pointSheet.find((p) => p.date === currentDate);

    return sheet || [];
}
