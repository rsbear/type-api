import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rfs", token, {
    // domain: process.env.NODE_ENV !== 'production' ? "http://localhost:3000" : "https://typefeel.com",
    httpOnly: true,
  });
};