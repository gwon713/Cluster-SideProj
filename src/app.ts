import express from "express";
import { connection } from "./config/database";
import logger from './config/logger';
import morganMiddleware from './config/morgan';
import { ClassData_Group, ClassData_User, ClassData_GrouLike } from './config/dataMapping';
import router from './config/route';
import UserRouter from './controller/userRoute';

export class App{
    public app;

    constructor(){
        this.app = express();
        this.setMiddleware();
        this.setExpress();
        this.setRouter();
        this.dataMap();
    }

    private setExpress() : void {
        try {
            
        } catch(err){
            logger.error(err);
        }
    }
    private dataMap() : void {
        ClassData_User();
        ClassData_Group();
        ClassData_GrouLike();
    }
    private setMiddleware() : void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:false }));
        this.app.use(morganMiddleware);
    }
    private setRouter(): void{
        this.app.use(router);
        this.app.use(UserRouter);
    }
}