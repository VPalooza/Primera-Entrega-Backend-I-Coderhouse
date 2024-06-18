import { Router } from "express";
import Products from "../classes/Products.js";

const router = Router();
const productsInstance = new Products(); // Asumiendo que Products es una clase

router.get("/", (req, res) => {
    res.render("index", { products: productsInstance.getAllProducts() }); // Ejemplo de método getAllProducts() para obtener datos
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});

export default router;
