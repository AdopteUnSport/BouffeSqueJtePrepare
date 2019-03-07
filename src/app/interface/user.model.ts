import { IIngredient } from './ingredient.model';

export interface IUser {
    id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    listIngredient?: Array<IIngredient>;
}

