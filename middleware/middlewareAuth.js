import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export default function middlewareAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded);

    next();
  } catch (err) {
    return res.redirect("/login");
  }
}
