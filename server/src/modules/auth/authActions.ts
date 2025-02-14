import type { RequestHandler } from "express";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { encodeJWT } from "../../helpers/jwt.helpers";
import UsersRepository from "../item/user/userRepository";

export const login: RequestHandler = async (req, res) => {
  const user = await UsersRepository.readByEmail(req.body.email);
  const userId = user.id;
  const token = await encodeJWT(user);

  res
    .status(200)
    .cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 86400,
    })
    .cookie("user_role", user.role_id === 2 ? "Admin" : "User", {
      httpOnly: false,
      maxAge: 86400,
    })
    .json({ userId: user.id, role: user.role_id });
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.auth_token;

    if (!token) {
      console.error("Aucun token trouvé");
      return res
        .status(401)
        .json({ authorized: false, message: "Token manquant." });
    }

    const decoded = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as JwtPayload;

    if (!decoded) {
      console.error("Le décodage du token a échoué");
      return res
        .status(401)
        .json({ authorized: false, message: "Token invalide." });
    }

    const verifiedUser = await UsersRepository.readByEmail(decoded.email);
    if (!verifiedUser) {
      console.error("Utilisateur non trouvé pour l'email :", decoded.email);
      return res
        .status(401)
        .json({ authorized: false, message: "Utilisateur non trouvé." });
    }
    req.user = verifiedUser;
    next();
  } catch (err) {
    console.error("Erreur lors de la vérification du token :", err);
    res.status(403).json({
      authorized: false,
      message: "Erreur lors de la vérification du token.",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  res.clearCookie("user_role");
  res.status(200).send({ message: "Déconnexion réussie." });
};
