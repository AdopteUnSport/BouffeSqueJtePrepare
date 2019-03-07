

import { IIngredient } from "./ingredient.model";

export interface IRecipe {
    id: number;
    name:string;
    description: string;
    listIngredient: Array<IIngredient>;
  
}
