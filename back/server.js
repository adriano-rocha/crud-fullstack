import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// GET - Buscar todos os estudantes
app.get("/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    console.log("Erro ao buscar estudantes:", error);
    res.status(500).json({ error: "Erro ao buscar estudantes" });
  }
});

// POST - Criar novo estudante
app.post("/students", async (req, res) => {
  console.log("🔵 POST /students recebido");
  console.log("📝 Dados recebidos:", req.body);
  
  try {
    const student = await prisma.student.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        sr: parseInt(req.body.sr),
        course: req.body.course,
      },
    });
    
    console.log("✅ Estudante criado:", student);
    res.status(201).json(student);
  } catch (error) {
    console.log("❌ Erro ao criar estudante:", error);
    res.status(500).json({ error: "Erro ao criar estudante" });
  }
});

// DELETE - Limpar todos os estudantes (deve vir antes da rota com :id)
app.delete("/students/clean", async (req, res) => {
  try {
    await prisma.student.deleteMany({});
    res.json({ message: "Todos os estudantes foram deletados!" });
  } catch (error) {
    console.log("Erro ao limpar dados:", error);
    res.status(500).json({ error: "Erro ao limpar dados" });
  }
});

// 

// PUT - Atualizar estudante
app.put("/students/:id", async (req, res) => {
  try {
    const student = await prisma.student.update({
      where: {
        id: req.params.id,
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        sr: parseInt(req.body.sr),
        course: req.body.course,
      },
    });
    
    res.status(200).json(student);
  } catch (error) {
    console.log("Erro ao atualizar estudante:", error);
    res.status(500).json({ error: "Erro ao atualizar estudante" });
  }
});

// DELETE - Deletar estudante específico
app.delete("/students/:id", async (req, res) => {
  try {
    await prisma.student.delete({
      where: {
        id: req.params.id,
      },
    });
    
    res.status(200).json({ message: "Student sucessfully removed!" });
  } catch (error) {
    console.log("Erro ao deletar estudante:", error);
    res.status(500).json({ error: "Erro ao deletar estudante" });
  }
});



const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
