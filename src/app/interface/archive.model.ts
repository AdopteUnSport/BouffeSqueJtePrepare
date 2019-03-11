import { IIngredient } from './ingredient.model';

export interface IArchive {
    _id: string;
    userId: string;
    archive: Array<Array<IIngredient>>;
}

