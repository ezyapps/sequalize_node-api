import { Application } from "express";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/users.controller";
import {auth} from "../shared.module/middleware/auth";
export function UserRoutes (app: Application) {
    const userController = new UserController();
    const authController = new AuthController();

    app.route('/users').get(userController.index);
    app.route('/users').post(userController.create);
    app.route('/users/me').get(auth, userController.me);
    app.route('/auth').post(authController.login);
}