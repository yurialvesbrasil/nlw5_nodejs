import { io } from "../app";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messageService = new MessagesService();

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params;
        let user_id = null;

        const userExists = await usersService.findByEmail(email);

        
        //Salvar a conexão com o socket_id, user_id 
        if(!userExists){
            const user = await usersService.create(email);
            user_id = user.id;
            await connectionsService.create({
                socket_id,
                user_id,
            });
        }else{
            user_id = userExists.id;
            const connection = await connectionsService.findByUserId(user_id);
           
            if(!connection){
                await connectionsService.create({
                    socket_id,
                    user_id
                });
            }else{
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }
        }
        
        //Salvar mensagens
        await messageService.create({
            text,
            user_id
        })
    })
})