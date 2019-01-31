import { IIngredient } from './ingredient.model';

export interface IUser {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    userStatus?: number;
    listIngredient?: Array<IIngredient>;
}

