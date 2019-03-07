
import { ICategory } from './category.model';


export interface IIngredient {
    id?: number;
    quantity?: number;
    category?: ICategory;
    name: string;
    photoUrls?: Array<string>;
    tags?: Array<string>;
}