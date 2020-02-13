import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  const test = res.cookie("rfs", token, {
    // domain: process.env.NODE_ENV !== 'production' ? "http://localhost:3000" : "https://typefeel.com",
    httpOnly: true,
  });
  console.log(test)
};