const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "logs/app.log",
    }),
    new winston.transports.Console({ level: "info" }),
    new winston.transports.MongoDB({
      level: "error",
      collection: "logs",
      db: "mongodb://localhost:27017/error_logging",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      level: "error",
      collection: "logs",
      db: "mongodb://localhost:27017/error_logging",
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      level: "error",
      collection: "logs",
      db: "mongodb://localhost:27017/error_logging",
    }),
  ],
});
module.exports = logger;
