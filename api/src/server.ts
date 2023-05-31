import path from 'node:path';

import express from 'express';
import 'express-async-errors';

import mongoose from 'mongoose';

import { router } from './router';

import ErrorHandler from './app/middlewares/ErrorHandler';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);
    app.use(ErrorHandler);

    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('Error to connected to mongo'));

