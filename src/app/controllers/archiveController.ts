
import { Request, Response } from 'express';
import { archiveService } from '../service/archiveService';



export class ArchiveController {

    public async getAllArchive(req: Request, res: Response) {
        res.status(200)
        res.json(await archiveService.getAllArchive())
    }
    public async getArchive(req: Request, res: Response) {
        res.status(200)
        res.json(await archiveService.getAllArchive())
         res.json(archiveService.getArchive(req))
    }
    public async updateArchive(req: Request, res: Response) {
       
        res.status(202)
        res.json(await archiveService.updateArchive(req))
    }
    public async deleteArchive(req: Request, res: Response) {
        res.status(202)
        res.json(await archiveService.deleteArchive(req))
    }
    public async getListeIngredient(req: Request, res: Response) {
        
        res.status(200)
        res.json(await archiveService.getListeIngredient(req))
    }
    
    public async updateListeIngredient(req: Request, res: Response) {
       
        res.status(202)
        res.json(await archiveService.updateListeIngredient(req))
    }
    public async addArchive(req: Request, res: Response) {
       
        res.status(201)
        res.json(await archiveService.addArchive(req))
    }
    

}