import { config } from "dotenv";
config();
//config({path: "../.env"});

export const MONGODB_URI = process.env.MONGODB_URI ;
export const PORT = process.env.PORT || 4000;
export const SECRET = process.env.SECRETKEY ;


