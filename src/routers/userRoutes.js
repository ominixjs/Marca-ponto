import express from "express";
import middlewareAuth from "../middleware/middlewareAuth.js";
import { upload } from "../configs/upload.js";
import { addImage } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/user", middlewareAuth, upload.single("photo"), addImage);

export default router;
