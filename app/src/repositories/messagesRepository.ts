import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/message";

@EntityRepository(Message)
class MessagesRepository extends Repository<Message>{}

export { MessagesRepository }