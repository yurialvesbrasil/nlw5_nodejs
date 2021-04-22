import { Router, json } from "express";
import { SettingsController } from "./controllers/SettingsController";

const routes = Router();

const settinsController = new SettingsController();

routes.post("/settings", settinsController.create);

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