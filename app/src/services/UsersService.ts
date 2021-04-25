import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/usersRepository";

interface IUsersCreate{
    email: string;
}

class UsersService{
    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository =  getCustomRepository(UsersRepository);
    }

    async findByEmail(email: string) {
        return await this.usersRepository.findOne({
            email
        }); 
    } 

    async create({ email } : IUsersCreate){
        // Verifica se usuário já existe no users
        // se sim retorna o usuário encontrado
        const userAlreadyExists = await this.usersRepository.findOne({
            email
        })

        if(userAlreadyExists)
            return userAlreadyExists;
            
        const newUser = this.usersRepository.create({
            email
        })

        //Salva no banco pq ainda não existe
        await this.usersRepository.save(newUser); 

        return newUser;
    }

}

export { UsersService }