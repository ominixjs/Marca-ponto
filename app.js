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
  console.log(req.user);

  res.render("index", { user: req.user });
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

  // const passwordValide = await bcrypt(password, client.password);
  // if (!passwordValide) return res.send("Senha inválida");

  const { name, birthday } = client;

  const token = jwt.sign(
    { id: db.length + 1, email, name, birthday },
    process.env.SECRET_KEY,
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

app.get("/register", middlewareAuth, (req, res) => {
  res.render("pages/register");
});

app.post("/signup", middlewareAuth, async (req, res) => {
  const { email, password } = req.body;

  if (password.lenght < 8) return;

  const hash = bcrypt.hash(password, saltRounds);

  db.push({ id: db.length + 1, email, password: hash });
  res.json(db);
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.post("/report", middlewareAuth, (req, res) => {
  const { date, getTime } = req.body;

  // Localiza e valida o cliente
  const clientIndex = db.findIndex((c) => c.email == req.user.email);
  if (clientIndex === -1) return res.send("Falha interna!");

  // Localiza e verifica marcação do dia
  const sheetIndex = db[clientIndex].pointSheet.findIndex(
    (c) => c.date == date,
  );

  // Verifica se há marcação do dia, caso não haja,
  // cria uma primeira marcação com a data
  if (sheetIndex === -1) {
    db[clientIndex].pointSheet.push({ date, timeSheet: [getTime] });
    return res.send("Enviado o primeiro com sucesso!");
  }

  // Marca mais um até 4
  const point = db[clientIndex].pointSheet[sheetIndex];

  if (point.lenght >= 4) point.timeSheet.push(getTime);

  res.send("Enviado com sucesso!");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
