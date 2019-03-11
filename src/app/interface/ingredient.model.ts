
import { ICategory } from './category.model';


export interface IIngredient {
    _id: number;
    category: ICategory;
    name: string;
    photoUrls: Array<string>;
    tags: Array<string>;
}