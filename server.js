// server.js
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = require("./app"); // Importar app desde app.js

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
