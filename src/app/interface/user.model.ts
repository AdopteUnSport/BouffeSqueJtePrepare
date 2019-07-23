import { IIngredient } from './ingredient.model';
import { ShoppingList } from './shoppingList.model';

export interface IUser {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    fridge: Array<IIngredient>;
    shoppingList : Array<ShoppingList>
}

