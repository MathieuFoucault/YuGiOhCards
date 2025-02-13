import type { User } from "./models/User";

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      user?: User;
      /* ************************************************************************* */
    }
  }
}
