

import { IIngredient } from "./ingredient.model";

export interface IRecipe {
    _id: number;
    name:string;
    description: string;
    listIngredient: Array<IIngredient>;
    photo : [string];
    
}
