import express from "express";
const app = express();
const PORT = 8080;

// pasta para arquivos
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const db = [
  {
    id: 1,
    nome: "Ana Beatriz Lima",
    dataNascimento: "1995-04-12",
    email: "ana.lima@email.com",
    senha: "ana12345",
  },
  {
    id: 2,
    nome: "Carlos Eduardo Martins",
    dataNascimento: "1989-09-21",
    email: "carlos.martins@email.com",
    senha: "carlose89",
  },
  {
    id: 3,
    nome: "Juliana Ferreira",
    dataNascimento: "2001-01-30",
    email: "juliana.ferreira@email.com",
    senha: "juli2001",
  },
  {
    id: 4,
    nome: "Rafael Costa",
    dataNascimento: "1993-06-18",
    email: "rafael.costa@email.com",
    senha: "rafa123",
  },
  {
    id: 5,
    nome: "Mariana Oliveira",
    dataNascimento: "1998-11-05",
    email: "mariana.oliveira@email.com",
    senha: "mariolive98",
  },
];

// Renderizador para o node
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  res.json({ email, password });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
