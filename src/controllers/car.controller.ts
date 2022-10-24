import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const dataCar = req.body;
    const results = await this._service.create(dataCar);
    return res.status(201).json(results);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async read(
    _req: Request,
    res: Response<ICar[]>,
  ) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async update(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;
    const data = req.body as ICar;
    const result = await this._service.update(id, data);
    return res.status(200).json(result);
  }
}

export default CarController;