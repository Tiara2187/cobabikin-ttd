import { NextFunction, Request, Response } from 'express'
import { Cart } from '../models/Cart'
import { Checkout } from '../models/Checkout'


class CheckoutController{
    static async userCheckout(req: Request, res: Response, next: NextFunction){
        try{
            const cart = await Cart.find({user:(<any>req)._userId})
            .populate('product')
            if(cart.length >= 1){
                let totalprice = 0
                for(let i = 0; i < cart.length; i++){
                    totalprice += (cart[i].quantity * (cart[i].product.productprice))
                }
                const checkout = new Checkout({
                    user: (<any>req)._userId,
                    totalprice : totalprice
                })
                await Cart.deleteMany({user : (<any>req)._userId})
                checkout.save()
                res.status(200).json({success : true, data : checkout})
            }
            else { next({ name: 'PRODUCT_NOT_FOUND'})}
        }
        catch{ next({name: 'NOT_FOUND'})}
    }


    static async listCheckout(req: Request, res: Response, next: NextFunction){
        try{
            const dataCheckout = await Checkout.find({ user: (<any>req)._userId })
            .populate('user')
            res.status(200).json({success : true, data : dataCheckout})
        }
        catch (e) { next({name: 'PRODUCT_NOT_FOUND'})}
    }

    static async detailCheckout(req: Request, res: Response, next: NextFunction)
    {
        const {checkoutId} = req.params
        try{
            const checkout = await Checkout.find({checkout : checkoutId})
            res.status(200).json({success : true, checkout})

        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async deleteCheckout(req: Request,res: Response,next: NextFunction){
        const {checkoutId } =req.params
        try{
            await Checkout.findByIdAndDelete(checkoutId)
            res.status(200).json({success : true, message : 'Delete Checkout Success'})
        }
        catch {next({name : 'NOT_FOUND'})}
    }



}

export default CheckoutController