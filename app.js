// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Rutas
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app; // Exportar la aplicación para que sea usada en server.js
