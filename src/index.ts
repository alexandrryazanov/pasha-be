import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  const list = await prisma.list.findMany({ orderBy: { createdAt: "desc" } });
  res.send(list);
});

app.post("/todos", async (req, res) => {
  try {
    const response = await prisma.list.create({
      data: { name: req.body.name },
    });
    res.status(201).send(response);
  } catch (e) {
    res.status(400).send("Вы прислали некорректные данные");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    await prisma.list.delete({ where: { id: todoId } });
    res.send("Мы только что удалили элемент с id = " + todoId);
  } catch (e) {
    res.status(404).send("Такого элемента нет с id = " + Number(req.params.id));
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    const response = await prisma.list.update({
      where: { id: todoId },
      data: {
        name: req.body.name,
        completed: req.body.completed,
      },
    });
    res.send(response);
  } catch (e) {
    res.status(500).send("Ошибка");
  }
});

app.listen(port, () => {
  console.log(`app has been started on port ${port}`);
});
