
import { status } from './enums';
import { IIngredient } from "./ingredient.model";

export interface IRecipe {
    id?: number;
    urlRecipe?: string;
    listIngredient?: Array<IIngredient>;
    status?: status;
    complete?: boolean;
}
