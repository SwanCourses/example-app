/**
 * Created by alex on 23.09.16.
 */

import Product from '../models/product';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';
/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getProducts(req, res) {
  Product.find().sort('name').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    } else{
    res.json({ products });
    }
  });
}

export function addProduct(req, res) {
  if (!req.body.product.name || !req.body.product.code || !req.body.product.price || !req.body.product.description) {
    res.status(403).end();
  } else {

    const newProduct = new Product(req.body.product);

    // Let's sanitize inputs
    newProduct.code = sanitizeHtml(newProduct.code);
    newProduct.name = sanitizeHtml(newProduct.name);
    newProduct.description = sanitizeHtml(newProduct.description);

    newProduct.cuid = cuid();
    for (let i = 0, file; file = req.files[i]; i++) {
      newProduct.photos.push({ fileName: file.filename })
    }

    newProduct.save().then((saved)=> {
      res.json({ product: saved })
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}

export function updateProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid })
    .then(document => {
      if (!document || !req.body.product.name || !req.body.product.price || !req.body.product.description) {
        res.status(403).end();
      } else {
        // Let's sanitize inputs
        document.name = sanitizeHtml(req.body.product.name);
        document.description = sanitizeHtml(req.body.product.description);
        document.price = req.body.product.price;

        for (let i = 0, file; file = req.files[i]; i++) {
          document.photos.push({ fileName: file.filename })
        }
        return document.save();
      }
    })
    .then(saved=> {
      res.json({ product: saved });
    })
    .catch(err=> {
      res.status(500).send(err);
    });
}

