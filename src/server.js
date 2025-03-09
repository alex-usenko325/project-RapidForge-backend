import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { initMongoDB } from './db/initMongoConnection.js';
import router from './routers/index.js';

import setupMiddleware from './middlewares/setupMiddleware.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

import waterRouter from './routers/water.js';

import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

export const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors({
  origin: '*', // Дозволяє доступ з усіх доменів
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Дозволяє певні HTTP методи
  allowedHeaders: ['Content-Type', 'Authorization'], // Дозволяє певні заголовки
  credentials: true, // Дозволяє передавати cookies та інші приватні дані
}));
  app.use(cookieParser());

  await initMongoDB();

  setupMiddleware(app);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('/', router);

  app.use('/water', waterRouter);

  app.get('/', (_, res) => {
    res.send('Welcome to the server!');
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
