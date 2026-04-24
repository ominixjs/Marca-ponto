import { db } from "../db/db.js";

export function addImage(req, res) {
    try {
        const { companyId, userId } = req.user;

        //================= Valida usuário ===================
        const company = db.find((c) => c.id === companyId);
        const user = company.collaborators.find((u) => u.id === userId);
        if (!user) return res.redirect("/login");

        const photo = req.file
            ? `uploads/users/${req.file.filename}`
            : "uploads/users/new_user.png";

        user.photo = photo;

        res.redirect("/profile");
    } catch (err) {
        res.send(err.message);
    }
}
