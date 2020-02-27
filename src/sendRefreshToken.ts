import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rfs", token, {
    // domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'typefeel-server.herokuapp.com' || 'typefeel.com',
    httpOnly: true,
    sameSite: 'none',
    path: '/'
  });
};

export const sendRefreshToken2 = (res: Response, token: string) => {
  res.cookie("rfs", token, {
    domain: 'typefeel.com',
    sameSite: 'none',
    httpOnly: true,
    path: '/'
  });
};