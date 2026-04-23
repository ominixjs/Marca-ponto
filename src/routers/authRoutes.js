import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../db/db.js";

const router = express.Router();

//========== Criptografia de senhas ===========
const saltRounds = 10;

// Login
router.get("/login", (req, res) => {
    const companyId = req.session.sessionId;
    const company = db.find((c) => c.id === companyId);
    if (!company) return res.redirect("/company-acess");

    res.render("pages/login", { companyName: company.name });
});

// Autenticação
router.post("/auth", (req, res) => {
    //============= Seção com ID da companhia ======================
    const companyId = req.session.sessionId;
    const company = db.find((c) => c.id === companyId);
    if (!companyId) return res.redirect("/company-acess");

    //===================== Buscar cliente =========================
    const { email, password } = req.body;
    const client = company.collaborators.find((c) => c.email == email);
    if (!client) return res.send("Usuário não encontrado");
    console.log(client);

    //================ Validação temporária ========================
    if (password != client.password) return res.send("Senha inválida");

    //================== Validação com bcrypt ======================
    // const validePassword = await bcrypt(password, client.password);
    // if (!validePassword) return res.send("Senha inválida");

    //=========== Gerando token ======================
    const token = jwt.sign(
        { companyId, userId: client.id },
        process.env.JWT_KEY,
        {
            expiresIn: "1h",
        },
    );

    //========== Guardando token =====================
    res.cookie("token", token, {
        httpOnly: true, // impede acesso via JS
        secure: false, // true em produção HTTPS
        sameSite: "strict", // evita CSRF
    });

    res.redirect("/dashboard");
});

// Primeiro acesso
router.get("/register", (req, res) => {
    res.render("pages/register");
});

// Autenticar primeiro acesso
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (password.lenght < 8) return;

    const hash = bcrypt.hash(password, saltRounds);

    db.push({ id: db.length + 1, email, password: hash });
    res.json(db);
});

// Sair do login
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

export default router;
