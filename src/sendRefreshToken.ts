import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  const test = res.cookie("rfs", token, {
    httpOnly: true,
  });
  console.log(test)
};