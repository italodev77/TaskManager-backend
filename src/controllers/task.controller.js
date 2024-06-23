const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            res.status(200).send(tasks);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}
