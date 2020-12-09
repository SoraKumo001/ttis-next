import { Request, Response } from 'express';
export default (req: Request, res: Response) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  if ((req?.session as any)?.graphqlToken) {
    delete (req.session as any).graphqlToken;
  }
  res.end('{result:"OK"}');
};
