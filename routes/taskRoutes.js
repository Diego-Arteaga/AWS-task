const express = require("express");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Crear una nueva tarea
router.post("/", authMiddleware, createTask);

// Obtener todas las tareas del usuario autenticado
router.get("/", authMiddleware, getTasks);

// Actualizar una tarea por ID
router.put("/:id", authMiddleware, updateTask);

// Eliminar una tarea por ID
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
