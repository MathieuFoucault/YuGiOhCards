import express from "express";
import { comparePassword, hashPassword } from "./middlewares/argon.middleware";
import { checkEmail, verifieEmail } from "./middlewares/checkEmail.middleware";
import { userRegister } from "./middlewares/register.middleware";
import { checkAdminRole, checkUserRole } from "./middlewares/role.middleware";
import { login, logout, verifyToken } from "./modules/auth/authActions";
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/item/user/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.post(
  "/api/userformregister",
  hashPassword,
  checkEmail,
  userRegister,
  userActions.add,
);

router.post(
  "/api/login/user",
  verifieEmail,
  comparePassword,
  checkUserRole,
  login,
);

router.post(
  "/api/login/admin",
  verifieEmail,
  comparePassword,
  checkAdminRole,
  login,
);

router.get("/api/logout", logout);

router.get("/api/items", itemActions.browse);
router.get("/api/items/detailsByCard", itemActions.getDetails);

router.delete("/api/items/:id", itemActions.deleteCard);
router.post("/api/items", itemActions.addCard);
// router.use(authenticateToken);

export default router;
