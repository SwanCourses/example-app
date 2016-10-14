import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import serverConfig from '../config';
import { createDir } from  '../util/fs-helpers';

const shouldBeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).end();
  } else {
    next()
  }
}

export default function (router, protectedMiddleware) {

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

  router.get('/products', ProductController.getProducts);
  router.post('/products', protectedMiddleware, shouldBeAdmin, upload.array('product[photos]', 12), ProductController.addProduct);
  router.put('/products/:cuid', protectedMiddleware, shouldBeAdmin, upload.array('product[photos]', 12), ProductController.updateProduct);
  return router;
}
