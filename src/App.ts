// lib/app.ts

import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose"
class App {

  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost/Bouffe';
  constructor() {
      this.app = express();
      const options:cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token","Access-Control-Allow-Origin"],
        exposedHeaders :["Origin","Access-Control-Allow-Origin"],
        methods: ["GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"],
        origin:"*",
        preflightContinue: false
      };
      
      //use cors middleware
      this.app.use(cors(options));
    
      this.config();
      this.routePrv.routes(this.app);
      this.app.options("*", cors(options));
      this.mongoSetup();
  }

  private config(): void{
      this.app.use( '/api-docs/swagger', express.static( 'swagger' ) );
      this.app.use( '/api-docs/swagger/assets', express.static( 'node_modules/swagger-ui-dist' ) );
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private mongoSetup(): void{
   // (<any>mongoose.Promise )= global.Promise;
    mongoose.connect(this.mongoUrl,{useNewUrlParser: true} );
}
}

export default new App().app;
