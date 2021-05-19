import { Router, Request, Response } from 'express'
import CartController from '../controllers/CartController'
import UserAuth from '../helpers/authentication'

class Cart {
    router:Router
    constructor(){
        this.router = Router()
        this.cart()
    }
    public cart():void{
        this.router.post('/addcart', UserAuth.userAuth,CartController.addCart)
        this.router.post('/createcart', UserAuth.userAuth, CartController.createcart)
        this.router.get('/listcart', UserAuth.userAuth, CartController.listCart)
        this.router.get('/detailcart/:cartId', UserAuth.userAuth, CartController.getDetailCart)
        this.router.get('/addonecart/:productId', UserAuth.userAuth, CartController.addOneCart)
        this.router.delete('/deleteonecart/:productId', UserAuth.userAuth, CartController.deleteOneCart)
        this.router.delete('/deletecart/:cartId', UserAuth.userAuth, CartController.deleteCart)
    }
}
export default new Cart().router