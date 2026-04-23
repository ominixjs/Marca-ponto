import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/users");
    },
    filename: (req, file, cb) => {
        const hash = crypto.randomBytes(16).toString("hex");
        const ext = path.extname(file.originalname);
        cb(null, `${hash}${ext}`);
    },
});

export const upload = multer({
    storage,

    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Tipo de arquivo inválido"));
        }

        cb(null, true);
    },

    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
});
