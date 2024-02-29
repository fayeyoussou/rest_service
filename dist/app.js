var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/produitDb', { useNewUrlParser: true, useUnifiedTopology: true });
let defProduit = new mongoose.Schema({
    libelle: String,
    stock: Number,
    stockLimite: Number,
    code: String,
    categorie: String
});
let Product = mongoose.model('Produit', defProduit);
app.post('/produit', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let newProduct = new Product(req.body);
        yield newProduct.save();
        res.status(201).send(newProduct);
    }
    catch (err) {
        res.status(500).send({ error: 'Échec de la création du produit', description: err });
    }
}));
app.get('/produit', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let products = yield Product.find();
        res.status(200).send(products);
    }
    catch (err) {
        res.status(500).send({ error: 'Échec de la récupération des produits', description: err });
    }
}));
app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(200).send("hello its working");
}));
app.get('/produit/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let product = yield Product.findById(req.params.id);
        if (!product)
            return res.status(404).send({ error: `Le produit n'a pas été trouvé` });
        res.status(200).send(product);
    }
    catch (err) {
        res.status(500).send({ error: 'Failed to fetch product', description: err });
    }
}));
app.put('/produit/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let updatedProduct = yield Product.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedProduct)
            return res.status(404).send({ error: `Le produit n'a pas été trouvé` });
        res.status(200).send(updatedProduct);
    }
    catch (err) {
        res.status(500).send({ error: 'Échec de la mise à jour du produit', description: err });
    }
}));
app.delete('/produit/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let product = yield Product.findById(req.params.id);
        if (!product)
            return res.status(404).send({ error: `Le produit n'a pas été trouvé` });
        yield Product.deleteOne(product);
        res.status(200).send(true);
    }
    catch (err) {
        res.status(500).send({ error: 'Échec de la suppression du produit\'', description: err });
    }
}));
app.listen(3000, () => console.log('Server listening on port 3000'));
