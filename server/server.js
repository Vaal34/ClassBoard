import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// GET
app.get("/api/classes", async (req, res) => {
  const classes = await prisma.classe.findMany();
  res.json(classes);
});

app.get("/api/classes/:path", async (req, res) => {
  const { path } = req.params;
  const classe = await prisma.classe.findUnique({
    where: { path },
    include: { eleves: true },
  });
  res.json(classe);
});

// POST
app.post("/api/classes", async (req, res) => {
  if (req.body == undefined) {
    return res.status(401).send({ error: "test" });
  }

  const newClasse = await prisma.classe.create({
    data: {
      name: req.body.name,
      path: req.body.path,
    },
  });

  return res.status(201).json(newClasse);
});

app.post("/api/classes/:path", async (req, res) => {
  const { path } = req.params;

  const classe = await prisma.classe.findUnique({
    where: { path },
  });

  const newEleve = await prisma.eleve.create({
    data: {
      prenom: req.body.prenom,
      nom: req.body.nom,
      classeId: parseInt(classe.id),
    },
  });

  return res.status(201).json(newEleve);
});

// DELETE
app.delete("/api/classes/", async (req, res) => {
  const deleteClasse = await prisma.classe.delete({
    where: {
      name: req.body.name,
      path: req.body.path
    },
  });

  return res.status(201).json(deleteClasse);
});

app.delete("/api/classes/:path", async (req, res) => {
  const { path } = req.params;
  const { prenom, nom } = req.body;

  const classe = await prisma.classe.findUnique({
    where: { path },
    select: { id: true },
  });

  console.log(path, prenom, nom, classe.id);

  const deleteEleve = await prisma.eleve.deleteMany({
    where: {
      prenom,
      nom,
      classeId: classe.id,
    },
  });

  return res.status(201).json(deleteEleve);
});

// UPDATE
app.put("/api/classes/:path", async (req, res) => {
  const { path } = req.params;
  const { name, newPath } = req.body;

  const updatedClasse = await prisma.classe.update({
    where: { path },
    data: {
      name,
      path: newPath,
    },
  });

  res.status(201).json(updatedClasse);
});

app.put("/api/eleves/:id", async (req, res) => {
  const { id } = req.params;
  const { prenom, nom } = req.body;

  const updatedEleve = await prisma.eleve.update({
    where: { id: Number(id) },
    data: {
      prenom,
      nom,
    },
  });

  res.status(201).json(updatedEleve);
});

app.put("/api/classes/:path/eleves/:id", async (req, res) => {
  const { id } = req.params;
  const { prenom, nom } = req.body;

  const updatedEleve = await prisma.eleve.update({
    where: { id: Number(id) },
    data: { prenom, nom },
  });

  res.status(201).json(updatedEleve);
});


app.listen(3001, () => console.log("Server running on http://localhost:3001"));
