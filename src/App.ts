// lib/app.ts

import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose"
class App {

  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost/Bouffe';  
  constructor() {
      this.app = express();
      this.config();        
      this.routePrv.routes(this.app);     
      this.mongoSetup();
  }

  private config(): void{
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private mongoSetup(): void{
   // (<any>mongoose.Promise )= global.Promise;
    mongoose.connect(this.mongoUrl,{useNewUrlParser: true} );    
}
}

export default new App().app;