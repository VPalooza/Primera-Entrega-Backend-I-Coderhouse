import express from "express";
import fs from "fs";

const router = express.Router();
const carts = JSON.parse(fs.readFileSync("./datos/carts.json", "utf-8"));
const products = JSON.parse(fs.readFileSync("./datos/products.json", "utf-8"));

// Crear un nuevo carrito
router.post("/", (req, res) => {
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = {
        id: newId,
        products: [],
    };

    carts.push(newCart);
    fs.writeFileSync("./datos/carts.json", JSON.stringify(carts, null, "\t"));
    res.json(carts);
});

// Listar productos de un carrito por su id
router.get("/:cid", (req, res) => {
    const { cid } = req.params;
    const cart = carts.find((cart) => cart.id == cid);

    if (!cart) {
        return res
            .status(404)
            .json({ error: "No se encuentra el carrito con el id solicitado" });
    }

    res.json(cart.products);
});

// Agregar un producto a un carrito
router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
    const cart = carts.find((cart) => cart.id == cid);
    const product = products.find((product) => product.id == pid);

    if (!cart) {
        return res
            .status(404)
            .json({ error: "No se encuentra el carrito con el id solicitado" });
    }

    if (!product) {
        return res.status(404).json({
            error: "No se encuentra el producto con el id solicitado",
        });
    }

    const existingProductIndex = cart.products.findIndex(
        (item) => item.product == pid
    );

    if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    fs.writeFileSync("./datos/carts.json", JSON.stringify(carts, null, "\t"));
    res.json(cart.products);
});
