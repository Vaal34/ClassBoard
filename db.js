// seed.js
import { PrismaClient } from "@prisma/client";
import { listClasses } from "./src/data/dataClass.js"

const prisma = new PrismaClient();

async function main() {
  for (const key in listClasses) {
    const classeData = listClasses[key];
    const classe = await prisma.classe.create({
      data: {
        name: classeData.name,
        path: classeData.path,
      },
    });

    for (const eleve of classeData.data) {
      await prisma.eleve.create({
        data: {
          prenom: eleve.prenom,
          nom: eleve.nom,
          checked: eleve.checked,
          classeId: classe.id,
        },
      });
    }
  }
  console.log("Seed terminé !");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
