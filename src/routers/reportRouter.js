import express from "express";
import { db } from "../db/db.js";
import middlewareAuth from "../middleware/middlewareAuth.js";
import pointService from "../service/pointService.js";

const router = express.Router();

// Registrar marcação de ponto
router.post("/report", middlewareAuth, (req, res) => {
    // Procura pelo cliente para manuseio de dados
    const company = db.find((c) => c.id === req.user.companyId);
    const user = company.collaborators.find((c) => c.id === req.user.userId);
    if (!user) return res.redirect("/login");

    const { date, currentRecord } = req.body;

    const result = pointService(user, date, currentRecord);

    if (result.error) return res.send(result.error);
    res.send(result.message);
});

export default router;
