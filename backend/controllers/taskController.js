const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, project, dueDate } = req.body;

        console.log(req.body);

        const task = await Task.create({
            title,
            description,
            assignedTo,
            project,
            dueDate,
        });

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("assignedTo", "name email")
            .populate("project", "name");

        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTaskStatus,
};