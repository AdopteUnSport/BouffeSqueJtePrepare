import {Request, Response} from "express";
import { UserController } from "../app/controllers/userController";
import { RecipeController } from "../app/controllers/recipeController";
import { ArchiveController } from "../app/controllers/archiveController";

export class Routes {    
    public userController : UserController = new UserController()
    public recipeController : RecipeController = new RecipeController()
    public archiveController : ArchiveController = new ArchiveController()
    public routes(app): void {   
        app.route('/recipe') 
        // GET endpoint 
        .get(this.recipeController.getRecipe)        
        // POST endpoint
        .post(this.recipeController.addNewRecipe)

        // Contact detail
        app.route('/recipe/:recipeId')
        // get specific contact
        .get(this.recipeController.getRecipeById)
        .put(this.recipeController.updateRecipe)
        .delete(this.recipeController.deleteRecipe)
        // Contact 
        app.route('/user') 
        // GET endpoint 
        .get(this.userController.getAllUser)        
        // POST endpoint
        .post(this.userController.addNewContact)

        // Contact detail
        app.route('/user/:userId')
        // get specific contact
        .get(this.userController.getUser)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)
        app.route('/user/:userId/ingredients')
        // get specific contact
        .get(this.userController.getListeIngredient)
        .post(this.userController.addIngredient)
        .put(this.userController.updateListeIngredient)
        .delete(this.userController.deleteListeIngredient)
        app.route('/archive') 
        // GET endpoint 
        .get(this.archiveController.getAllArchive)        
        // POST endpoint
        .post(this.archiveController.addArchive)

        app.route('/user/:userId/archive')
        // get specific contact
        .get(this.archiveController.getArchive)
        .put(this.archiveController.updateArchive)
        .delete(this.archiveController.deleteArchive)
    }
}