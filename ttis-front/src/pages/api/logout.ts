import { Request, Response } from "express";
export default (req: Request, res: Response) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (req?.session?.graphqlToken) {
    delete req.session.graphqlToken;
  }
  res.end('{result:"OK"}');
};
