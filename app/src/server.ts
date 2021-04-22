import express from "express";
import "./database"; /** Importa arquivo index da pasta */
import { routes } from "./routes";

const app = express();
/** Para a aplicação entender json */
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Server running on port 3333"));