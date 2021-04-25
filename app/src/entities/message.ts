import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { User } from "./user";

@Entity("messages")
class Message {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    user_id: string;
    
    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)
    user: User;

    @Column()
    text: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Message }