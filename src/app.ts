import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/cars', routes.car);
app.use('/motorcycles', routes.motorcycles);
app.use(errorHandler);

export default app;
