
import { ICategory } from './category.model';
import { ITag } from './tag.model';
import { status } from './enums';

export interface IIngredient {
    id?: number;
    quantity?: number;
    category?: ICategory;
    name: string;
    photoUrls?: Array<string>;
    tags?: Array<ITag>;
    status?: status;
}