import type { RequestHandler } from "express";

export const userRegister: RequestHandler = async (req, res, next) => {
  try {
    req.body.role_id = 1;
    next();
  } catch (err) {
    next(err);
  }
};

export const adminRegister: RequestHandler = async (req, res, next) => {
  try {
    req.body.role_id = 2;
    next();
  } catch (err) {
    next(err);
  }
};
