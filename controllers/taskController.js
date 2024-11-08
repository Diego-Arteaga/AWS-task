const Task = require("../models/Task");

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({
            user: req.user,
            title,
            description,
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Obtener todas las tareas del usuario autenticado
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Actualizar una tarea por ID
const updateTask = async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        let task = await Task.findOne({ _id: req.params.id, user: req.user });
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Eliminar una tarea por ID
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: "Task deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
