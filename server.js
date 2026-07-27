const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3002;

const tasks = [{
        id: 1,
        title: "Learn Express",
        done: false
    },
    {
        id: 2,
        title: "Build API",
        done: false
    },
    {
        id: 3,
        title: "Push to GitHub",
        done: true
    }
];

app.get("/", (req, res) => {
    res.json({

        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});
app.get("/tasks", (req, res) => {
    res.json(tasks);
});


app.get("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});
app.post("/tasks", (req, res) => {
    console.log("POST route reached");
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }
    const newTask = {
        id: tasks.length + 1,
        title: title,
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});