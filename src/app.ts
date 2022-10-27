import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import notFoundRouter from './middlewares/notFoundRouter';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/cars', routes.car);
app.use('/motorcycles', routes.motorcycles);
app.use(notFoundRouter);
app.use(errorHandler);

export default app;
