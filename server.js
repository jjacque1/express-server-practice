const PORT = 5000;

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const tasks = [];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//GET ALL TASKS

app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

//POST ROUTE 

app.post("/api/tasks", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Invalid or missing request body" });
  }

  const { title, description, status } = req.body;

  const trimmedTitle = (title || "").trim();
  const trimmedDescription = (description || "").trim();

  if (!trimmedTitle || !trimmedDescription) {
    res.status(400).json({ message: "Title and Descritpion is required" });
  }

  const allowedStatuses = ["pending", "in-progress", "done"];
  const finalStatus = allowedStatuses.includes(status) ? status : "pending";

  const newTask = {
    id: String(Date.now()),
    title: trimmedTitle,
    description: trimmedDescription,
    status: finalStatus,
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

//PUT ROUTE

app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params

    const task = tasks.find(task => task.id === id)

    if(!task){
        return res.status(404).json({message: "Task not found"})
    }

    const{ title, description, status} = req.body

    if(!req.body || req.body !== "object"){
        return res.status(400).json({message: "Invalid or Missing JSON body"})
    }

    if(title !== undefined){
        const trimmedTitle = String(title).trim()
        if(!trimmedTitle){
            return res.status(400).json({message: "Title is required"})
        }

        task.title = trimmedTitle
    }

    if(description !== undefined){
        const trimmedDescription = String(description).trim()
        if(!trimmedDescription){
            return res.status(400).json({message: "Descripiton is required"})
        }

        task.description = trimmedDescription
    }

    if(status !== undefined){
        const allowedStatuses = ["pending", "in-progress", "done"]
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({message: "Invalid status"})
        }

        task.status = status
    }

    return res.json(task)


})

//START SERVER

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
