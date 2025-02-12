import express from "express";
import itemActions from "./modules/item/itemActions";
import { comparePassword, hashPassword } from "./middlewares/argon.middleware";
import { checkEmail, verifieEmail } from "./middlewares/checkEmail.middleware";
import { userRegister, adminRegister } from "./middlewares/register.middleware";
import { checkAdminRole, checkUserRole } from "./middlewares/role.middleware";
import { login, verifyToken } from "./modules/auth/authActions";
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

router.get("/api/items", itemActions.browse);
// router.use(authenticateToken);

export default router;
