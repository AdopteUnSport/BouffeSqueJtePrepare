const { generateTSFiles } = require("swagger-ts-generator");

const config = {
  file: __dirname + "\\swagger.json"
};

generateTSFiles(
  config.file, // This can be either a file containing the Swagger json or the Swagger object itself
  {
    modelFolder: "./src/models",
    enumTSFile: "./path/models/enums.ts"
    // + optionally more configuration
  }
);
