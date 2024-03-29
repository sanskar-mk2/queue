require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();

const task_routes = require("./routes/tasks");
const user_routes = require("./routes/users");
const block_routes = require("./routes/blocks");

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method, req.headers);
    next();
});

app.use("/api/tasks", task_routes);
app.use("/api/users", user_routes);
app.use("/api/blocks", block_routes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongodb connected");
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
