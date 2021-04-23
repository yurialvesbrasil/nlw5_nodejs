import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/message";
import { MessagesRepository } from "../repositories/messagesRepository";

interface IMessagesCreate{
    admin_id?: string; //? = atributo não obrigatório
    text: string;
    user_id: string;
}

class MessagesService{
    private messagesRepository: Repository<Message>;
    
    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, text, user_id } : IMessagesCreate){
            
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        })

        //Salva no banco 
        await this.messagesRepository.save(message); 

        return message;
    }

    async listByUser( user_id: string ){

        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        })

        return list;
    }

}

export { MessagesService }