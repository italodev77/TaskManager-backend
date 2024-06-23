const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
    async getById() {
        try {
            const taskId = this.req.params.id;

            const task = await TaskModel.findById(taskId);

            if (!task) {
                this.res.status(400).send("Essa tarefa não foi encontrada.");
            }

            this.res.status(200).send(tasks);
        } catch (error) {
            return this.res.status(404).send(error.message);
        }
    }
    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async update() {
        try {
            const taskId = this.req.params.id;

            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            // criar regra para alterar só uma das prop da entd
            const allowedUpdates = ["isCompleted"];

            const requestedUpdates = Object.keys(req.body);

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(500)
                        .send("Um ou mais campos inseridos não são editaveis!");
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
    async delete() {
        try {
            const taksId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taksId);

            if (!taskToDelete) {
                this.res.status(500).send("Essa tarefa não foi encontrada.");
            }
            const deletedTask = await TaskModel.findByIdAndDelete(taksId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
