/**
 * Created by alex on 21.09.16.
 */
import Category from '../models/category';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';


export function getCategories(req, res) {
  Category.find().sort('name').then(categories => {
    res.json({ categories });
  }).catch(err=>{
    res.status(500).send(err);
  });
}

export function addCategory(req, res) {
  if (!req.body.category.name ) {
    res.status(403).end();
  } else {

    const newCategory = new Category(req.body.category);

    // Let's sanitize inputs
    newCategory.name = sanitizeHtml(newCategory.name);


    newCategory.cuid = cuid();

    newCategory.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ category: saved });
      }
    });
  }
}
