import express from "express";
const app = express();
const PORT = 8080;

// Informações
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
const saltRounds = 10;

import cookieParser from "cookie-parser";
app.use(cookieParser());

import middlewareAuth from "./middleware/middlewareAuth.js";

import validatePoint from "./js/getPointDay.js";
import validateRecord from "./js/ValidateRecord.js";

// pasta para arquivos
app.use(express.static("public"));

// Decodifica URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Renderizador para o node
app.set("view engine", "ejs");

const db = [
    {
        id: 1,
        name: "Ana Beatriz Lima",
        birthday: "1995-04-12",
        email: "ana.lima@email.com",
        password: "ana12345",
        pointSheet: [],
    },
    {
        id: 2,
        name: "Carlos Eduardo Martins",
        birthday: "1989-09-21",
        email: "carlos.martins@email.com",
        password: "carlose89",
        pointSheet: [
            {
                date: "03/04/2026",
                timeSheet: ["16:16:37", "16:16:39", "16:17:13", "16:17:16"],
            },
            {
                date: "04/04/2026",
                timeSheet: ["16:16:37", "16:16:39", "16:17:13", "16:17:16"],
            },
        ],
    },
    {
        id: 3,
        name: "Juliana Ferreira",
        birthday: "2001-01-30",
        email: "juliana.ferreira@email.com",
        password: "juli2001",
        pointSheet: [],
    },
    {
        id: 4,
        name: "Rafael Costa",
        birthday: "1993-06-18",
        email: "rafael.costa@email.com",
        password: "rafa123",
        pointSheet: [],
    },
    {
        id: 5,
        name: "Mariana Oliveira",
        birthday: "1998-11-05",
        email: "mariana.oliveira@email.com",
        password: "mariaoliver123",
        pointSheet: [],
    },
];

app.get("/", middlewareAuth, (req, res) => {
    const sheet = validatePoint(req.user, db);
    const point = sheet.timeSheet || [];

    res.render("index", { user: req.user, point: point });
});

app.get("/login", (req, res) => {
    res.render("pages/login");
});

// autenticar cliente
app.post("/auth", (req, res) => {
    const { email, password } = req.body;

    const client = db.find((c) => c.email == email);

    if (!client) return res.send("Usuário não encontrado");

    if (password != client.password) return res.send("Senha inválida");

    // const validePassword = await bcrypt(password, client.password);
    // if (!validePassword) return res.send("Senha inválida");

    const { name, birthday, pointSheet } = client;

    const token = jwt.sign(
        { id: db.length + 1, email, name, birthday, pointSheet },
        process.env.JWT_KEY,
        {
            expiresIn: "1h",
        },
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true em produção HTTPS
        sameSite: "strict",
    });

    res.redirect("/");
});

app.get("/register", (req, res) => {
    res.render("pages/register");
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (password.lenght < 8) return;

    const hash = bcrypt.hash(password, saltRounds);

    db.push({ id: db.length + 1, email, password: hash });
    res.json(db);
});

app.get("/logout", middlewareAuth, (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

app.post("/report", middlewareAuth, (req, res) => {
    const { date, markingRecord } = req.body;
    const { email } = req.user;

    // Procura pelo cliente para manuseio de dados
    const client = db.find((c) => c.email === email);
    if (!client) return res.send("usuário não encontrado");

    // Busca no DB se há registro do dia
    const verifyRecord = client.pointSheet.find((p) => p.date === date);

    // Primeira marcação do dia
    if (!verifyRecord) {
        client.pointSheet.push({ date, timeSheet: [markingRecord] });
        return res.send("Primeira marcação do dia");
    }

    // Verfica se ja foram os 4 registros do dia
    if (verifyRecord.timeSheet.length >= 4) {
        return res.send("Marcaçõe do dia já foram feitas");
    }

    // Envio a array de marcações e a marcação atual
    if (!validateRecord(verifyRecord, markingRecord)) {
        return res.send("Aguarde alguns minutos!");
    }

    // Caso ocorra tudo Ok, marca o segundo registro
    verifyRecord.timeSheet.push(markingRecord);
    res.send("Enviado com sucesso!");
});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
