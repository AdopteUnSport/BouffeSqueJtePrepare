import { IIngredient } from './ingredient.model';

export interface ShoppingList {
    _id: string;
    name :string;
    archived : boolean;
    shoppingList: Array<IIngredient>;
    periode : string;
    reNew : boolean;
}

