import { Request, Response } from "express";
import { ConnectionsService } from "../services/ConnectionsService";

class ConnectionsController{

    async create(req: Request, res: Response): Promise<Response>  {
        const { socket_id, user_id, admin_id, id } = req.body; 

        const connectionsService = new ConnectionsService();

        const connection = await connectionsService.create({  socket_id, user_id, admin_id, id });
            
        return res.status(201).json(connection);
       
    }

}

export { ConnectionsController }