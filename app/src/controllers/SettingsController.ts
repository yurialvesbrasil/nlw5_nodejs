import { Request, Response } from "express";
import { SettingsRepository } from "../repositories/settingsRepository";
import { getCustomRepository } from "typeorm";

class SettingsController{
    async create(req: Request, res: Response) {
        const { chat, username } = req.body; 
        const settingsRepository = getCustomRepository(SettingsRepository);

        const settings = settingsRepository.create({
            chat,
            username
        })

        await settingsRepository.save(settings);

        return res.status(201).json(settings); 
    }
}

export { SettingsController }