import type { RequestHandler } from "express";
import userRepository from "../modules/item/user/userRepository";

const checkRole = (expectedRoleLabel: string): RequestHandler => {
  return async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userRepository.readByEmail(email);
      const role = await userRepository.getRoleByLabel(expectedRoleLabel);

      if (!role || user.role_id !== role.id) {
        res.sendStatus(403);
        return;
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const checkUserRole = checkRole("User");
export const checkAdminRole = checkRole("Admin");
