const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();

const app = express();
app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if (!task) {
            res.status(400).send("Essa tarefa não foi encontrada.");
        }

        res.status(200).send(tasks);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        // criar regra para alterar só uma das prop da entd
        const allowedUpdates = ["isCompleted"];

        const requestedUpdates = Object.keys(req.body);

        for (update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData;
            } else {
                return res
                    .status(500)
                    .send("Um ou mais campos inseridos não são editaveis!");
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taksId = req.params.id;

        const taskToDelete = await TaskModel.findById(taksId);

        if (!taskToDelete) {
            res.status(500).send("Essa tarefa não foi encontrada.");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taksId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(8000, () => console.log("start server"));
