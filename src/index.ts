import app from "./App";
import * as cors from "cors";
import * as express from "express";
//get router
const router = express.Router()
//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token","Access-Control-Allow-Origin"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));

//add your routes

//enable pre-flight
router.options("*", cors(options));
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})