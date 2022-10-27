import { Request, Response, NextFunction } from 'express';

function notFoundRouter(req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ message: `Route url: ${req.url}, does not exist.` });
}

export default notFoundRouter;