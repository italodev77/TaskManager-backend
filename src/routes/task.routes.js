const express = require("express");
const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");
const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});
router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        // criar regra para alterar só uma das prop da entd
        const aUpdates = ["isCompleted"];

        const requestedUpdates = Object.keys(req.body);

        for (update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
