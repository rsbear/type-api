import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rfs", token, {
    domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'typefeel-server.herokuapp.com' || 'typefeel.com',
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'production' ? false : true,
    path: '/'
  });
};

