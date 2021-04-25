import express from "express";
import "./database"; /** Importa arquivo index da pasta */
import { routes } from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();

//Define caminho dos arquivos públicos
app.use(express.static(path.join(__dirname, "..","public")));
//Define local das views
app.set("views", path.join(__dirname, "..","public"));
//Define emgine html pq por padrão ele utiliza a extenção EJS
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
    return res.render("html/client.html");
})

app.get("/pages/admin", (req, res) => {
    return res.render("html/admin.html");
})

//Criando protocolo http
const http = createServer(app);

//Criando protocolo websocket
const io = new Server(http);

//Primeira conexão do usuário
io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id);
})


/** Para a aplicação entender json */
app.use(express.json());
app.use(routes);

export { http, io }