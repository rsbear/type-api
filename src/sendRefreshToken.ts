import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("refresh", token, {
    domain:
      process.env.NODE_ENV !== "production" ? "localhost" : "typefeel.com",
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV !== "production" ? false : true,
    path: "/"
  });
};
