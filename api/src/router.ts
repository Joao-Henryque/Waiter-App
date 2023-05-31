import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

import CategoryController from './app/controllers/CategoryController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';

router.get('/categories', CategoryController.index);

router.post('/categories', CategoryController.store);

router.get('/products', ProductController.index);

router.get('/categories/:categoryId/products', CategoryController.show);

router.post('/products', upload.single('image'),ProductController.store);

router.get('/orders', OrderController.index);

router.post('/orders', OrderController.store);

router.patch('/orders/:orderId', OrderController.update);

router.delete('/orders/:orderId', OrderController.delete);
