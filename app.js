import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import { db } from "./src/db/db.js";
import middlewareAuth from "./src/middleware/middlewareAuth.js";
import validateRecord from "./src/validators/validateRecord.js";
import getPointDay from "./src/repository/recordRepository.js";
import userRoutes from "./src/routers/userRoutes.js";
import authRoutes from "./src/routers/authRoutes.js";
import reportRouter from "./src/routers/reportRouter.js";

//========= Servidor =============================
const app = express();
const PORT = 8080;

//=========== Dados entre rotas ==================
app.use(cookieParser());

//========= pasta para arquivos ==================
app.use(express.static("public"));

//========== Decodificação da URL ================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//============ Senhas ============================
dotenv.config();

//=========== Seção temporária ===================
app.use(
    session({
        name: "session-id",
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // true se usar HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 15, // 15 hora
        },
    }),
);

//============= Renderizador HTML ================
app.set("view engine", "ejs");

//================================================
app.set("views", path.resolve("views"));

//============== Routes ==========================
app.use(authRoutes);
app.use(userRoutes);
app.use(reportRouter);

// Homepage
app.get("/dashboard", middlewareAuth, (req, res) => {
    const { companyId, userId } = req.user;
    const company = db.find((c) => c.id === companyId);
    const user = company.collaborators.find((c) => c.id === userId);
    if (!user) return res.redirect("/login");

    const sheet = getPointDay(companyId, userId);
    const point = sheet.timeSheet || [];

    res.render("index", {
        name: user.name,
        photo: user.photo,
        point: point,
    });
});

// Perfil
app.get("/profile", middlewareAuth, (req, res) => {
    const { companyId, userId } = req.user;
    const company = db.find((c) => c.id === companyId);
    const user = company.collaborators.find((c) => c.id === userId);
    if (!user) return res.redirect("/login");

    res.render("pages/profile", {
        photo: user.photo,
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        cpf: user.cpf,
        pis: user.pis,
        nationality: user.nationality,
        address: user.address,
    });
});

app.get("/company-acess", (req, res) => {
    res.render("pages/company");
});

app.post("/identify-company", (req, res) => {
    const { hostname } = req.body;

    const company = db.find((c) => c.hostname === hostname);
    if (!company) return res.redirect("/company-acess");

    req.session.sessionId = company.id;

    res.redirect("/login");
});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
