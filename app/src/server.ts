import express, { response } from "express";

const app = express();

/** Métodos basicos da api rest
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATH = Alterar informação especifica
 */

app.get("/", (req, res) => {
    return res.json({
        message: "Olá NLW 05"
    });
})

app.post("/users", (req, res) => {
    return res.json({
        message: "Usuário salvo com sucesso."
    });
})

app.listen(3333, () => console.log("Server running on port 3333"));