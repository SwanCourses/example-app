/**
 * Created by alex on 23.09.16.
 */

import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import serverConfig from '../config';
import { createDir } from  '../util/fs-helpers';

const router = new Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const productUploadsPath = path.resolve(__dirname, `../../${serverConfig.UPLOADS_DIR}/products/`);
    const thisProductUploadsPath = productUploadsPath + `/art_${req.body.product.code || 'unknown'}/`
    createDir(productUploadsPath);
    createDir(thisProductUploadsPath);
    cb(null, thisProductUploadsPath)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});

var upload = multer({ storage: storage });

router.route('/products').get(ProductController.getProducts);
router.post('/products', upload.array('product[photo]', 12), ProductController.addProduct);

export default router;
