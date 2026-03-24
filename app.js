import express from "express";
const app = express();
const PORT = 8080;

// Informações
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

// Cryptar
import bcrypt from "bcrypt";
const saltRounds = 10;

import cookieParser from "cookie-parser";
app.use(cookieParser());

import middlewareAuth from "./middleware/middlewareAuth.js";

// pasta para arquivos
app.use(express.static("public"));

// Decodifica URL
app.use(express.urlencoded({ extended: true }));

// Renderizador para o node
app.set("view engine", "ejs");

const db = [
  {
    id: 1,
    name: "Ana Beatriz Lima",
    birthday: "1995-04-12",
    email: "ana.lima@email.com",
    password: "ana12345",
  },
  {
    id: 2,
    name: "Carlos Eduardo Martins",
    birthday: "1989-09-21",
    email: "carlos.martins@email.com",
    password: "carlose89",
  },
  {
    id: 3,
    name: "Juliana Ferreira",
    birthday: "2001-01-30",
    email: "juliana.ferreira@email.com",
    password: "juli2001",
  },
  {
    id: 4,
    name: "Rafael Costa",
    birthday: "1993-06-18",
    email: "rafael.costa@email.com",
    password: "rafa123",
  },
  {
    id: 5,
    name: "Mariana Oliveira",
    birthday: "1998-11-05",
    email: "mariana.oliveira@email.com",
    password: "mariaoliver123",
  },
];

app.get("/", middlewareAuth, (req, res) => {
  res.render("index");
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
      expiresIn: "1m",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true em produção HTTPS
    sameSite: "strict",
  });

  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
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

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
