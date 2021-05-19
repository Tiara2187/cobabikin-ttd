import express, { Application } from "express"
import mongoDB from './config/connect'
import routes from './routes/index'
import { NextFunction, Request, Response } from 'express'
import cors from 'cors'

class Servers {
    public app:Application
    constructor(){
        this.app = express()
        this.plugin()
        this.route()
    }

    protected plugin():void{
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json())

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );
            res.setHeader(
              "Access-Control-Allow-Methods",
              "GET, POST, PATCH, PUT, DELETE, OPTIONS"
            );
            next();
          });
        this.app.use(cors())
        this.app.use('/uploadsProduct', express.static('uploadsProduct'));
        mongoDB()
    }

    protected route():void{
        this.app.use(routes);
    }
}

const port = 7000;
const app = new Servers().app
app.listen(port, () => {
    console.log(`App runs on http://localhost:${port}`);
})

export default app


