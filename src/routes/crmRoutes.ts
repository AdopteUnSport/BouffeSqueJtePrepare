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
        app.route('/api').get(this.recipeController.test) 
        app.route('/api/recipe') 
        // GET endpoint 
        .get(this.recipeController.getRecipe)        
        // POST endpoint
        .post(authMiddleware,this.recipeController.addNewRecipe)

        // Contact detail
        app.route('/api/recipe/:recipeId')
        // get specific contact
        .get(this.recipeController.getRecipeById)
        .put(authMiddleware,this.recipeController.updateRecipe)
        .delete(authMiddleware,this.recipeController.deleteRecipe)
        // Contact 
        app.route('/api/user')
        // GET endpoint 
        .get(authMiddleware,this.userController.getAllUser)      
        // POST endpoint
        .post(this.authController.addNewContact)
        app.route('/api/user/login') 
        
        // POST endpoint
        .get(this.authController.login)
        app.route('/api/user/logout') 
        
        // POST endpoint
        .get(authMiddleware,this.authController.logout)
        // Contact detail
        app.route('/api/user/:userId')
        // get specific contact
        .get(authMiddleware,this.userController.getUser)
        .put(authMiddleware,this.userController.updateUser)
        .delete(authMiddleware,this.userController.deleteUser)
        app.route('/api/user/:userId/ingredients')
        // get specific contact
        .get(authMiddleware,this.userController.getListeIngredient)
        .post(authMiddleware,this.userController.addIngredient)
        .put(authMiddleware,this.userController.updateListeIngredient)
        .delete(authMiddleware,this.userController.deleteListeIngredient)
        app.route('/api/archive') 
        // GET endpoint 
        .get(authMiddleware,this.archiveController.getAllArchive)        
        // POST endpoint
        .post(authMiddleware,this.archiveController.addArchive)

        app.route('/api/user/:userId/archive')
        // get specific contact
        .get(authMiddleware,this.archiveController.getArchive)
        .put(authMiddleware,this.archiveController.updateArchive)
        .delete(authMiddleware,this.archiveController.deleteArchive)
    }
}