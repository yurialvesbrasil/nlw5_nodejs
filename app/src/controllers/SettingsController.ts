import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";


class SettingsController{

    async create(req: Request, res: Response): Promise<Response> {
        const { chat, username } = req.body; 

        const settingsService = new SettingsService();

        try{
            const settings = await settingsService.create({ chat, username });
            
            return res.status(201).json(settings);
        }catch(error){
            return res.status(400).json({mensagem: error.message});
        } 
    }

    async findByUserName(req: Request, res: Response){
        const { admin } = req.params;

        const settingsService = new SettingsService();

        const settings = await settingsService.findByUserName(admin);

        return res.json(settings);
    }

    async update(req: Request, res: Response){
        const { admin } = req.params;
        const { chat } = req.body;

        const settingsService = new SettingsService();

        const settings = await settingsService.update(admin, chat);

        return res.status(201).json(settings);
    }
}

export { SettingsController }