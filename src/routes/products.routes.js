import express from "express";
import fs from "fs";

const router = express.Router();
const products = JSON.parse(fs.readFileSync("./datos/products.json", "utf-8"));

// Agregar un nuevo producto
router.post("/", (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } =
        req.body;
    const newId =
        products.length > 0 ? products[products.length - 1].id + 1 : 1;

    if (!title || !description || !code || !price || !stock || !category) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = {
        id: newId,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || [],
    };

    products.push(newProduct);
    fs.writeFileSync(
        "./datos/products.json",
        JSON.stringify(products, null, "\t")
    );
    res.json(products);
});

// Actualizar un producto por su id
router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, stock, category } = req.body;

    const productIndex = products.findIndex((product) => product.id == pid);

    if (productIndex === -1) {
        return res.status(404).json({
            error: "No se encuentra el producto con el id solicitado",
        });
    }

    if (!title || !description || !code || !price || !stock || !category) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios" });
    }

    products[productIndex] = {
        ...products[productIndex],
        title,
        description,
        code,
        price,
        stock,
        category,
    };

    fs.writeFileSync(
        "./datos/products.json",
        JSON.stringify(products, null, "\t")
    );
    res.json(products[productIndex]);
});

// Eliminar un producto por su id
router.delete("/:pid", (req, res) => {
    const { pid } = req.params;
    const productIndex = products.findIndex((product) => product.id == pid);

    if (productIndex === -1) {
        return res.status(404).json({
            error: "No se encuentra el producto con el id solicitado",
        });
    }

    const deletedProduct = products.splice(productIndex, 1);
    fs.writeFileSync(
        "./datos/products.json",
        JSON.stringify(products, null, "\t")
    );
    res.json(deletedProduct);
});
