const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

//criar model
//primeiro nome da entidade, depois o schema
const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
