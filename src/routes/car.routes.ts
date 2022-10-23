import { Router } from 'express';
import CarController from '../controllers/car.controller';
import CarService from '../services/Car.service';
import CarModel from '../models/Car.model';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/', (req, res) => carController.create(req, res));

export default route;