import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { User } from "./user";

@Entity("connections")
class Connection {

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
    socket_id: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Connection }