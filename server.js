const PORT = 5000;
const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", (req, res) => {
    res.json(tasks)
});

app.post("/api/tasks", (req, res) => {

    if(!req.body){
        return req.status(400).json({message: "Invalid or Missing JSON body"})
    }
    const { title, description, status} = req.body;

    const trimmedTitle = (title || "").trim();
    const trimmedDescription = (description || "").trim();

    if(!trimmedTitle || !trimmedDescription) {
        return res.status(400).json({message: "title and description are required"})
    }

    const allowedStatuses = ["pending", "in-progress", "done"];
    const finalStatus = allowedStatuses.includes(status) ? status : "pending";

    const newTask = {
        id: String(Date.now()),
        title: trimmedTitle,
        description: trimmedDescription, 
        status: finalStatus,
    };

    tasks.push(newTask)

    res.status(201).json(newTask)

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
