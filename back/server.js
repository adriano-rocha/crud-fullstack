// server.js
import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ['https://crud-fullstack-ivory.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Rota raiz - IMPORTANTE para evitar erro 502
app.get("/", (req, res) => {
  res.json({ 
    message: "API funcionando!", 
    status: "OK",
    timestamp: new Date()
  });
});

// Rota de health check
app.get("/health", async (req, res) => {
  try {
    // Testa conexão com o banco
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: "OK", 
      database: "connected",
      timestamp: new Date()
    });
  } catch (error) {
    console.log("Erro de conexão com banco:", error);
    res.status(500).json({ 
      status: "ERROR", 
      database: "disconnected",
      error: error.message 
    });
  }
});

// ROTAS DOS ESTUDANTES

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

// DELETE - Limpar todos os estudantes
app.delete("/students/clean", async (req, res) => {
  try {
    await prisma.student.deleteMany({});
    res.json({ message: "Todos os estudantes foram deletados!" });
  } catch (error) {
    console.log("Erro ao limpar dados:", error);
    res.status(500).json({ error: "Erro ao limpar dados" });
  }
});

// PUT - Atualizar estudante
app.put("/students/:id", async (req, res) => {
  try {
    const student = await prisma.student.update({
      where: { id: req.params.id },
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
    await prisma.student.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Student successfully removed!" });
  } catch (error) {
    console.log("Erro ao deletar estudante:", error);
    res.status(500).json({ error: "Erro ao deletar estudante" });
  }
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error("Erro não tratado:", error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// Rota 404 - deve ser a última
app.use("*", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

//  START SERVER
const PORT = process.env.PORT || 3020;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});