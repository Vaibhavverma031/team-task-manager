const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        console.log("BODY RECEIVED:", req.body);
        console.log("NAME:", name);
        console.log("DESCRIPTION:", description);

        const project = await Project.create({
            name,
            description,
            createdBy: req.user.id,
        });

        res.status(201).json(project);
    } catch (error) {
        console.log("PROJECT ERROR:", error);
        res.status(500).json({
           message: error.message,
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createProject, getProjects };