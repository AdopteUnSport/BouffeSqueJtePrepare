
import { ICategory } from './category.model';


export interface IIngredient {
    _id: string;
    category: ICategory;
    name: string;
    quantity : number;
    photoUrls: Array<string>;
    tags: Array<string>;
}