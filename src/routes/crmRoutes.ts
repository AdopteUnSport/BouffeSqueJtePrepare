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
        .post(authMiddleware,this.recipeController.addNewRecipe)

        // Contact detail
        app.route('/recipe/:recipeId')
        // get specific contact
        .get(this.recipeController.getRecipeById)
        .put(authMiddleware,this.recipeController.updateRecipe)
        .delete(authMiddleware,this.recipeController.deleteRecipe)
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
        .post(authMiddleware,this.authController.logout)
        // Contact detail
        app.route('/user/:userId')
        // get specific contact
        .get(authMiddleware,this.userController.getUser)
        .put(authMiddleware,this.userController.updateUser)
        .delete(authMiddleware,this.userController.deleteUser)
        app.route('/user/:userId/ingredients')
        // get specific contact
        .get(authMiddleware,this.userController.getListeIngredient)
        .post(authMiddleware,this.userController.addIngredient)
        .put(authMiddleware,this.userController.updateListeIngredient)
        .delete(authMiddleware,this.userController.deleteListeIngredient)
        app.route('/archive') 
        // GET endpoint 
        .get(authMiddleware,this.archiveController.getAllArchive)        
        // POST endpoint
        .post(authMiddleware,this.archiveController.addArchive)

        app.route('/user/:userId/archive')
        // get specific contact
        .get(authMiddleware,this.archiveController.getArchive)
        .put(authMiddleware,this.archiveController.updateArchive)
        .delete(authMiddleware,this.archiveController.deleteArchive)
    }
}