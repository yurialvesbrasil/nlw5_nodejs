import { Router, json } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settinsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settinsController.create);
routes.get("/settings/:admin", settinsController.findByUserName);
routes.put("/settings/:admin", settinsController.update);

routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/user/:id", messagesController.showByUser);


export { routes }

/** Métodos basicos da api rest
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATH = Alterar informação especifica
 */

/** 
* Tipos de parametros
* Routers Params => Parametros de rotas
* ex: http://localhost:3333/setting/1
* Query Params => Filtros e buscas
* ex: http://localhost:3333/setting/1?search=algumacois
* Body Params => Parametros que vem no corpo da requisição
* ex: {
*    nome: "Yuri Brasil",
*    idade: 23
* }
*/