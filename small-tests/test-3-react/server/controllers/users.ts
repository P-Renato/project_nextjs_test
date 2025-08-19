import { Request, Response, NextFunction } from "express";

export const addNewUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ msg: "new user added!" });
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ msg: "user logged in!" });
};
