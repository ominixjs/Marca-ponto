import express from "express";
const app = express();
const PORT = 8080;

// Informações
import dotenv from "dotenv";
dotenv.config();

import session from "express-session";

// pasta para arquivos
app.use(express.static("public"));

// Decodifica URL
app.use(express.urlencoded({ extended: true }));

// Renderizador para o node
app.set("view engine", "ejs");

// Memoria temporária
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 5000 * 60 * 60,
    },
  }),
);

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
    password: "mariolive98",
  },
];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

// autenticar dados
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  const client = db.find((c) => c.email == email);

  if (!client) res.send("Usuário não encontrado");

  if (client.password != password) res.send("Senha inválida!");

  const { name, birthday } = client;

  req.session.loggedUser = {
    name,
    email,
    birthday,
  };

  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
