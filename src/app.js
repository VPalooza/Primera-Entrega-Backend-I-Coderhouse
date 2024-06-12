import express from "express";
import indexRoutes from "./routes/index.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas bajo /api
app.use('/api', indexRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
