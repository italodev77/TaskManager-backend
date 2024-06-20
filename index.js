const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();

connectToDatabase();

app.get("/tasks", (req, res) => {
    const tasks = [
        {
            description: "estudar",
            isCompleted: false,
        },
    ];
    res.status(200).send(tasks);
});

app.listen(8000, () => console.log("start server"));
