
import { ArchiveRepository } from "../repository/archiveRepository";
import { Request } from 'express';
import { IArchive, IIngredient } from '../interface';

 class ArchiveService{
    private archiveRepository = new ArchiveRepository()
    public async addArchive (req: Request) {  
        const newArchive = req.body as IArchive      
        
        return this.archiveRepository.addNewArchive(newArchive)
    }
    public async getAllArchive() {
        
       return this.archiveRepository.getAllArchive()
    }
    public async getArchive(req: Request) {
        console.log(JSON.stringify(this))

        return this.archiveRepository.getArchiveById(req.params.archiveId)
    }
    public async getArchiveByUserId(req: Request) {
        console.log(JSON.stringify(this))

        return this.archiveRepository.getArchiveByUserId(req.params.userId)
    }
    public async updateArchive(req: Request) {
        const updatedArchive = req.body as IArchive
        return await this.archiveRepository.updateArchive(req.params.archiveId,updatedArchive)
    }
    public async deleteArchive(req: Request) {


        return await this.archiveRepository.deleteArchive(req.params.archiveId)
    }
    public async getListeIngredient(req: Request) {
        const archive : IArchive = await this.archiveRepository.getArchiveByUserId(req.params.userId)

        return archive.archive
    }
    
    public async updateListeIngredient(req: Request) {
        const newIngredients : IIngredient[] = req.body as IIngredient[]
        const archive :IArchive =await this.archiveRepository.getArchiveById(req.params.archiveId)
        archive.archive.push(newIngredients);
        return  await this.archiveRepository.updateArchive(archive._id,archive)
    }
    
}

export const archiveService= new ArchiveService()