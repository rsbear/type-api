import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rfs", token, {
    httpOnly: true,
  });
};