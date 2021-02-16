import dotenv from "dotenv";
dotenv.config({ 
    silent: (process.env.NODE_ENV == "prod") ? true : false,
    path: `.env.${process.env.NODE_ENV}` 
 });