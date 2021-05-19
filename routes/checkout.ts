import { Router, Request, Response } from 'express'
import CheckoutController from '../controllers/CheckoutController'
import UserAuth from '../helpers/authentication'

class Checkout {
    router:Router
    constructor(){
        this.router = Router()
        this.checkout()
    }
    public checkout():void{
        this.router.post('/checkout', UserAuth.userAuth, CheckoutController.userCheckout)
        this.router.get('/listcheckout', UserAuth.userAuth, CheckoutController.listCheckout )
        this.router.get('/detailcheckout/:checkoutId', UserAuth.userAuth, CheckoutController.detailCheckout)
        this.router.delete('/deletecheckout/:checkoutId', UserAuth.userAuth, CheckoutController.deleteCheckout)

    }
}
export default new Checkout().router