import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const htmlMiddleware = () => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const publicPath = path.join(__dirname, '/public');

  fs.readFile(`${publicPath}/app.html`, 'utf8', (error, html) => {
    if (!error) {
      req.html = html;
      next();
    } else {
      res.status(500).json({ error });
    }
  });
};

export default htmlMiddleware;
