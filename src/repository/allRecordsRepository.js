import { db } from "../db/db.js";

//   const dateNow = new Date();

//   if (dateNow.getHours == 0) {
//       console.log("Meia noie");
//   }

// Verificação de registros ao final do dia
export default function allRecords() {
    db.forEach((company) => {
        company.collaborators.forEach((collaborator) => {
            const lastIndexRecords =
                collaborator.pointSheet[collaborator.pointSheet.length - 1]
                    .date;

            const dailyLogValidation =
                lastIndexRecords === dateNow.toLocaleDateString();

            if (!dailyLogValidation) {
                // Registrar na folha a falta ou folga
                console.log(dailyLogValidation);
            }
        });
    });
}

