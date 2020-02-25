import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rfs", token, {
    domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'typefeel.com',
    httpOnly: true,
    path: '/'
  });
};