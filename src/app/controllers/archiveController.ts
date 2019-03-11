
import { Request, Response } from 'express';
import { archiveService } from '../service/archiveService';



export class ArchiveController {

    public getAllArchive(req: Request, res: Response) {
        res.json(archiveService.getAllArchive())
    }
    public getArchive(req: Request, res: Response) {

        res.json(archiveService.getArchive(req))
    }
    public updateArchive(req: Request, res: Response) {
       

        res.json(archiveService.updateArchive(req))
    }
    public deleteArchive(req: Request, res: Response) {
       
        res.json(archiveService.deleteArchive(req))
    }
    public getListeIngredient(req: Request, res: Response) {
        

        res.json(archiveService.getListeIngredient(req))
    }
    
    public updateListeIngredient(req: Request, res: Response) {
       

        res.json(archiveService.updateListeIngredient(req))
    }
    public addArchive(req: Request, res: Response) {
       

        res.json(archiveService.AddArchive(req))
    }
    

}