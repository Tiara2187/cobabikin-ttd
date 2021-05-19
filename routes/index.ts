import { Router, Request, Response } from "express";
import errorHandler from '../helpers/errorHandlers'
import userRoutes  from './user'
import categoryRoutes from './category'
import productRoutes from './product'
import cartRoutes from './cart'
import checkoutRoutes from './checkout'
import addressRoutes from './address'


class Index {
    router:Router
    constructor(){
        this.router = Router()
        this.index()

    }
    public index():void{
        this.router.use('/users', userRoutes)
        this.router.use('/users', categoryRoutes)
        this.router.use('/users', productRoutes)
        this.router.use('/users', cartRoutes)
        this.router.use('/users', checkoutRoutes)
        this.router.use('/users', addressRoutes)
        this.router.use(errorHandler.errorhandler)
    }
}

export default new Index().router

