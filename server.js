const PORT = 5000;

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/health", (req, res) => {
  res.json({ message: "server is alive" });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Invalid or Missing JSON body" });
  }

  const trimmedTitle = (title || "").trim();
  const trimmedDescription = (description || "").trim();

  if (!trimmedTitle || !trimmedDescription) {
    return res
      .status(400)
      .json({ message: "title and description are required" });
  }

  const allowedStatuses = ["pending", "in-progress", "done"];
  const finalStatus = allowedStatuses.includes(status) ? status : "pending";

  if (!finalStatus) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const newTasks = {
    id: String(Date.now()),
    title: trimmedTitle,
    description: trimmedDescription,
    status: finalStatus,
  };

  tasks.push(newTasks);

  return res.status(201).json(newTasks);
});

//PUT ROUTE

app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "task not found" });
  }

  const { title, description, status } = req.body;

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Invalid or messing JSON body" });
  }

  if (title !== undefined) {
    const trimmedTitle = String(title).trim();
    if (!trimmedTitle) {
      return res.status(400).json({ message: "Title is required" });
    }

    task.title = trimmedTitle;
  }

  if (description !== undefined) {
    const trimmedDescription = String(description).trim();
    if (!trimmedDescription) {
      return res.status(400).json({ message: "Description is required" });
    }

    task.description = trimmedDescription;
  }

  if (status !== undefined) {
    const allowedStatuses = ["pending", "in-progress", "done"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    task.status = status;
  }

  return res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params

    const initialLength = tasks.length;

    tasks =  tasks.filter(task => task.id !== id)

    if(tasks.length === initialLength){
        return res.status(404).json({message: "Task not found"})
    }

    return res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
