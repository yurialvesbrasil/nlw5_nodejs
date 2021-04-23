import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { User }