import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const dataMotorcycle = req.body;
    const results = await this._service.create(dataMotorcycle);
    return res.status(201).json(results);
  }

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async read(
    _req: Request,
    res: Response<IMotorcycle[]>,
  ) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const data = req.body as IMotorcycle;
    const result = await this._service.update(id, data);
    return res.status(200).json(result);
  }

  public async delete(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }
}

export default MotorcycleController;