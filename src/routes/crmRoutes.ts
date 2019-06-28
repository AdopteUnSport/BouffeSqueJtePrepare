import * as express from "express";
import { UserController } from "../app/controllers/userController";
import { RecipeController } from "../app/controllers/recipeController";
import { ArchiveController } from "../app/controllers/archiveController";
import { AuthController } from "../app/controllers/authController";
import authMiddleware from "../app/middlewares/auth.middleware";

export class Routes {    
    public authController : AuthController = new AuthController()
    public userController : UserController = new UserController()
    public recipeController : RecipeController = new RecipeController()
    public archiveController : ArchiveController = new ArchiveController()
    public routes(app : express.Application): void {  
        app.route('/').get(this.recipeController.test) 
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
        .get(authMiddleware,this.userController.getAllUser)      
        // POST endpoint
        .post(this.authController.addNewContact)
        app.route('/user/login') 
        
        // POST endpoint
        .post(this.authController.login)
        app.route('/user/logout') 
        
        // POST endpoint
        .post(this.authController.logout)
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