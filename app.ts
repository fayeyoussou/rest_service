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
    code : String,
    categorie : String

});

let Product = mongoose.model('Produit', defProduit);

app.post('/produit', async (req, res) => {
    try {
        let newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(500).send({ error: 'Échec de la création du produit', description: err });
    }
});

app.get('/produit', async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ error: 'Échec de la récupération des produits', description: err });
    }
});
app.get('/', async (req, res) => {
    res.status(200).send("hello its working")
});
app.get('/produit/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send({ error: `Le produit n'a pas été trouvé` });
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch product', description: err });
    }
});

app.put('/produit/:id', async (req, res) => {
    try {
        let updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedProduct) return res.status(404).send({ error: `Le produit n'a pas été trouvé` });
        res.status(200).send(updatedProduct);
    } catch (err) {
        res.status(500).send({ error: 'Échec de la mise à jour du produit', description: err });
    }
});

app.delete('/produit/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send({ error: `Le produit n'a pas été trouvé` });

        await Product.deleteOne(product);
        res.status(200).send(true);
    } catch (err) {
        res.status(500).send({ error: 'Échec de la suppression du produit\'', description: err });
    }
});


app.listen(3000, () => console.log('Server listening on port 3000'));